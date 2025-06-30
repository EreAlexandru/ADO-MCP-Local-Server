import axios, { AxiosInstance } from 'axios';
import { config } from 'dotenv';

// Load environment variables
config();

interface WorkItemUpdate {
  title?: string;
  description?: string;
  state?: string;
  assignedTo?: string;
}

export class AzureDevOpsClient {
  private api: AxiosInstance;
  private organization: string;
  private pat: string;
  private requestCount: number = 0;
  private requestResetTime: number = Date.now();

  constructor() {
    this.organization = process.argv[2] || process.env.AZURE_DEVOPS_ORG || '';
    this.pat = process.env.AZURE_DEVOPS_PAT || process.env.AZURE_DEVOPS_EXT_PAT || '';

    if (!this.organization) {
      throw new Error('Azure DevOps organization not provided. Pass it as argument or set AZURE_DEVOPS_ORG');
    }

    if (!this.pat) {
      throw new Error('Azure DevOps PAT not found. Set AZURE_DEVOPS_PAT or AZURE_DEVOPS_EXT_PAT environment variable');
    }

    // Security: Validate organization name format
    if (!/^[a-zA-Z0-9][a-zA-Z0-9-]*[a-zA-Z0-9]$/.test(this.organization)) {
      throw new Error('Invalid organization name format. Must contain only alphanumeric characters and hyphens.');
    }

    // Create axios instance with authentication
    this.api = axios.create({
      baseURL: `https://dev.azure.com/${this.organization}`,
      headers: {
        'Authorization': `Basic ${Buffer.from(`:${this.pat}`).toString('base64')}`,
        'Content-Type': 'application/json',
      },
    });
  }

  async listProjects() {
    try {
      this.checkRateLimit();
      const response = await this.api.get('/_apis/projects?api-version=7.0');
      const projects = response.data.value.map((p: any) => ({
        id: p.id,
        name: p.name,
        description: p.description,
        state: p.state,
        url: p.url,
      }));

      return {
        content: [
          {
            type: 'text',
            text: `Found ${projects.length} projects:\n${projects
              .map((p: any) => `- ${p.name}: ${p.description || 'No description'}`)
              .join('\n')}`,
          },
        ],
      };
    } catch (error) {
      throw new Error(`Failed to list projects: ${this.getErrorMessage(error)}`);
    }
  }

  async listWorkItems(project: string, query?: string) {
    try {
      // Security: Validate inputs
      this.validateProjectName(project);
      if (query) {
        this.validateStringInput(query, 'WIQL query', 32000); // WIQL max length
      }
      
      let workItems;
      
      if (query) {
        // Run custom WIQL query
        const response = await this.api.post(
          `/${project}/_apis/wit/wiql?api-version=7.0`,
          { query }
        );
        const ids = response.data.workItems.map((wi: any) => wi.id);
        
        if (ids.length > 0) {
          const itemsResponse = await this.api.get(
            `/_apis/wit/workitems?ids=${ids.join(',')}&api-version=7.0`
          );
          workItems = itemsResponse.data.value;
        } else {
          workItems = [];
        }
      } else {
        // Get recent work items
        // Azure DevOps doesn't support parameterized queries in WIQL
        // So we need to escape the project name properly to prevent SQL injection
        const safeProject = project.replace(/'/g, "''");
        const defaultQuery = `SELECT [System.Id], [System.Title], [System.State] 
                             FROM WorkItems 
                             WHERE [System.TeamProject] = '${safeProject}' 
                             ORDER BY [System.ChangedDate] DESC`;
        const response = await this.api.post(
          `/${project}/_apis/wit/wiql?api-version=7.0&$top=20`,
          { query: defaultQuery }
        );
        const ids = response.data.workItems.map((wi: any) => wi.id).slice(0, 20);
        
        if (ids.length > 0) {
          const itemsResponse = await this.api.get(
            `/_apis/wit/workitems?ids=${ids.join(',')}&api-version=7.0`
          );
          workItems = itemsResponse.data.value;
        } else {
          workItems = [];
        }
      }

      const items = workItems.map((wi: any) => ({
        id: wi.id,
        title: wi.fields['System.Title'],
        state: wi.fields['System.State'],
        type: wi.fields['System.WorkItemType'],
        assignedTo: wi.fields['System.AssignedTo']?.displayName || 'Unassigned',
      }));

      return {
        content: [
          {
            type: 'text',
            text: `Found ${items.length} work items:\n${items
              .map((i: any) => `- [${i.id}] ${i.title} (${i.type}, ${i.state}, ${i.assignedTo})`)
              .join('\n')}`,
          },
        ],
      };
    } catch (error) {
      throw new Error(`Failed to list work items: ${this.getErrorMessage(error)}`);
    }
  }

  async createWorkItem(
    project: string,
    type: string,
    title: string,
    description?: string,
    assignedTo?: string
  ) {
    try {
      // Security: Validate all inputs
      this.validateProjectName(project);
      this.validateStringInput(type, 'Work item type', 255);
      this.validateStringInput(title, 'Title', 255);
      if (description) {
        this.validateStringInput(description, 'Description', 32000);
      }
      if (assignedTo) {
        this.validateStringInput(assignedTo, 'Assigned to', 255);
      }
      
      const operations = [
        {
          op: 'add',
          path: '/fields/System.Title',
          value: title,
        },
      ];

      if (description) {
        operations.push({
          op: 'add',
          path: '/fields/System.Description',
          value: description,
        });
      }

      if (assignedTo) {
        operations.push({
          op: 'add',
          path: '/fields/System.AssignedTo',
          value: assignedTo,
        });
      }

      const response = await this.api.post(
        `/${project}/_apis/wit/workitems/$${type}?api-version=7.0`,
        operations,
        {
          headers: {
            'Content-Type': 'application/json-patch+json',
          },
        }
      );

      const workItem = response.data;
      return {
        content: [
          {
            type: 'text',
            text: `Created work item #${workItem.id}: ${workItem.fields['System.Title']}`,
          },
        ],
      };
    } catch (error) {
      throw new Error(`Failed to create work item: ${this.getErrorMessage(error)}`);
    }
  }

  async getWorkItem(id: number) {
    try {
      // Security: Validate input
      this.validateWorkItemId(id);
      
      const response = await this.api.get(
        `/_apis/wit/workitems/${id}?api-version=7.0&$expand=all`
      );
      const wi = response.data;

      const details = {
        id: wi.id,
        title: wi.fields['System.Title'],
        description: wi.fields['System.Description'] || 'No description',
        state: wi.fields['System.State'],
        type: wi.fields['System.WorkItemType'],
        assignedTo: wi.fields['System.AssignedTo']?.displayName || 'Unassigned',
        createdBy: wi.fields['System.CreatedBy']?.displayName,
        createdDate: wi.fields['System.CreatedDate'],
        changedDate: wi.fields['System.ChangedDate'],
        tags: wi.fields['System.Tags'] || 'No tags',
      };

      return {
        content: [
          {
            type: 'text',
            text: `Work Item #${details.id}:
Title: ${details.title}
Type: ${details.type}
State: ${details.state}
Assigned To: ${details.assignedTo}
Created By: ${details.createdBy}
Created: ${new Date(details.createdDate).toLocaleString()}
Last Updated: ${new Date(details.changedDate).toLocaleString()}
Tags: ${details.tags}

Description:
${details.description}`,
          },
        ],
      };
    } catch (error) {
      throw new Error(`Failed to get work item: ${this.getErrorMessage(error)}`);
    }
  }

  async updateWorkItem(id: number, updates: WorkItemUpdate) {
    try {
      const operations = [];

      if (updates.title) {
        operations.push({
          op: 'replace',
          path: '/fields/System.Title',
          value: updates.title,
        });
      }

      if (updates.description) {
        operations.push({
          op: 'replace',
          path: '/fields/System.Description',
          value: updates.description,
        });
      }

      if (updates.state) {
        operations.push({
          op: 'replace',
          path: '/fields/System.State',
          value: updates.state,
        });
      }

      if (updates.assignedTo) {
        operations.push({
          op: 'replace',
          path: '/fields/System.AssignedTo',
          value: updates.assignedTo,
        });
      }

      if (operations.length === 0) {
        return {
          content: [
            {
              type: 'text',
              text: 'No updates provided',
            },
          ],
        };
      }

      const response = await this.api.patch(
        `/_apis/wit/workitems/${id}?api-version=7.0`,
        operations,
        {
          headers: {
            'Content-Type': 'application/json-patch+json',
          },
        }
      );

      const workItem = response.data;
      return {
        content: [
          {
            type: 'text',
            text: `Updated work item #${workItem.id}: ${workItem.fields['System.Title']}`,
          },
        ],
      };
    } catch (error) {
      throw new Error(`Failed to update work item: ${this.getErrorMessage(error)}`);
    }
  }

  async listPullRequests(project: string, repository: string, status?: string) {
    try {
      const params: any = { 'api-version': '7.0' };
      if (status) {
        params.status = status;
      }

      const response = await this.api.get(
        `/${project}/_apis/git/repositories/${repository}/pullrequests`,
        { params }
      );

      const prs = response.data.value.map((pr: any) => ({
        id: pr.pullRequestId,
        title: pr.title,
        status: pr.status,
        createdBy: pr.createdBy.displayName,
        creationDate: pr.creationDate,
        sourceRefName: pr.sourceRefName,
        targetRefName: pr.targetRefName,
      }));

      return {
        content: [
          {
            type: 'text',
            text: `Found ${prs.length} pull requests:\n${prs
              .map(
                (pr: any) =>
                  `- PR #${pr.id}: ${pr.title} (${pr.status}) by ${pr.createdBy}\n  ${pr.sourceRefName} → ${pr.targetRefName}`
              )
              .join('\n')}`,
          },
        ],
      };
    } catch (error) {
      throw new Error(`Failed to list pull requests: ${this.getErrorMessage(error)}`);
    }
  }

  async runQuery(query: string) {
    try {
      const response = await this.api.post(
        `/_apis/wit/wiql?api-version=7.0`,
        { query }
      );
      
      const ids = response.data.workItems.map((wi: any) => wi.id);
      
      if (ids.length === 0) {
        return {
          content: [
            {
              type: 'text',
              text: 'Query returned no results',
            },
          ],
        };
      }

      const itemsResponse = await this.api.get(
        `/_apis/wit/workitems?ids=${ids.join(',')}&api-version=7.0`
      );
      
      const workItems = itemsResponse.data.value.map((wi: any) => ({
        id: wi.id,
        title: wi.fields['System.Title'],
        state: wi.fields['System.State'],
        type: wi.fields['System.WorkItemType'],
        assignedTo: wi.fields['System.AssignedTo']?.displayName || 'Unassigned',
      }));

      return {
        content: [
          {
            type: 'text',
            text: `Query returned ${workItems.length} items:\n${workItems
              .map((i: any) => `- [${i.id}] ${i.title} (${i.type}, ${i.state}, ${i.assignedTo})`)
              .join('\n')}`,
          },
        ],
      };
    } catch (error) {
      throw new Error(`Failed to run query: ${this.getErrorMessage(error)}`);
    }
  }

  private getErrorMessage(error: any): string {
    if (axios.isAxiosError(error)) {
      if (error.response) {
        return `${error.response.status}: ${error.response.data?.message || error.response.statusText}`;
      } else if (error.request) {
        return 'No response from server';
      }
    }
    return error.message || 'Unknown error';
  }

  // Security: Input validation helpers
  private validateProjectName(project: string): void {
    if (!project || typeof project !== 'string') {
      throw new Error('Project name is required');
    }
    if (project.length > 255) {
      throw new Error('Project name too long (max 255 characters)');
    }
    // Allow spaces in project names but prevent path traversal
    if (project.includes('..') || project.includes('\\\\') || project.includes('//')) {
      throw new Error('Invalid project name');
    }
  }

  private validateWorkItemId(id: number): void {
    if (!Number.isInteger(id) || id <= 0) {
      throw new Error('Invalid work item ID');
    }
    if (id > 2147483647) { // Max int32
      throw new Error('Work item ID too large');
    }
  }

  private validateStringInput(input: string, fieldName: string, maxLength: number = 1000): void {
    if (typeof input !== 'string') {
      throw new Error(`${fieldName} must be a string`);
    }
    if (input.length > maxLength) {
      throw new Error(`${fieldName} too long (max ${maxLength} characters)`);
    }
  }

  private escapeWiqlString(value: string): string {
    // Escape single quotes for WIQL
    return value.replace(/'/g, "''");
  }

  private checkRateLimit(): void {
    // Reset counter every minute
    const now = Date.now();
    if (now - this.requestResetTime > 60000) {
      this.requestCount = 0;
      this.requestResetTime = now;
    }
    
    // Allow max 100 requests per minute
    this.requestCount++;
    if (this.requestCount > 100) {
      throw new Error('Rate limit exceeded. Please wait before making more requests.');
    }
  }

  // === NEW METHODS ===

  async getProject(projectId: string) {
    try {
      const response = await this.api.get(`/_apis/projects/${projectId}?api-version=7.0`);
      const project = response.data;

      return {
        content: [
          {
            type: 'text',
            text: `Project: ${project.name}
ID: ${project.id}
Description: ${project.description || 'No description'}
State: ${project.state}
URL: ${project.url}
Visibility: ${project.visibility}`,
          },
        ],
      };
    } catch (error) {
      throw new Error(`Failed to get project: ${this.getErrorMessage(error)}`);
    }
  }

  async searchWorkItems(searchText: string, project?: string) {
    try {
      const searchBody = {
        searchText,
        $skip: 0,
        $top: 50,
        ...(project && { 
          filters: {
            "System.TeamProject": [project]
          }
        })
      };

      const response = await this.api.post(
        `/_apis/search/workitemsearchresults?api-version=7.0-preview.1`,
        searchBody
      );

      const results = response.data.results || [];
      if (results.length === 0) {
        return {
          content: [
            {
              type: 'text',
              text: 'No work items found matching the search criteria',
            },
          ],
        };
      }

      const items = results.map((r: any) => ({
        id: r.fields['system.id'],
        title: r.fields['system.title'],
        type: r.fields['system.workitemtype'],
        state: r.fields['system.state'],
        project: r.project.name,
      }));

      return {
        content: [
          {
            type: 'text',
            text: `Found ${items.length} work items:\n${items
              .map((i: any) => `- [${i.id}] ${i.title} (${i.type}, ${i.state}, ${i.project})`)
              .join('\n')}`,
          },
        ],
      };
    } catch (error) {
      throw new Error(`Failed to search work items: ${this.getErrorMessage(error)}`);
    }
  }

  async addWorkItemComment(id: number, comment: string) {
    try {
      const response = await this.api.post(
        `/_apis/wit/workItems/${id}/comments?api-version=7.0-preview.3`,
        { text: comment }
      );

      return {
        content: [
          {
            type: 'text',
            text: `Comment added to work item #${id}`,
          },
        ],
      };
    } catch (error) {
      throw new Error(`Failed to add comment: ${this.getErrorMessage(error)}`);
    }
  }

  async linkWorkItems(sourceId: number, targetId: number, linkType: string) {
    try {
      const linkTypeMap: any = {
        'Related': 'System.LinkTypes.Related',
        'Parent': 'System.LinkTypes.Hierarchy-Reverse',
        'Child': 'System.LinkTypes.Hierarchy-Forward',
        'Predecessor': 'System.LinkTypes.Dependency-Reverse',
        'Successor': 'System.LinkTypes.Dependency-Forward',
      };

      const operations = [
        {
          op: 'add',
          path: '/relations/-',
          value: {
            rel: linkTypeMap[linkType] || 'System.LinkTypes.Related',
            url: `${this.api.defaults.baseURL}/_apis/wit/workItems/${targetId}`,
          },
        },
      ];

      await this.api.patch(
        `/_apis/wit/workitems/${sourceId}?api-version=7.0`,
        operations,
        {
          headers: {
            'Content-Type': 'application/json-patch+json',
          },
        }
      );

      return {
        content: [
          {
            type: 'text',
            text: `Linked work item #${sourceId} to #${targetId} with ${linkType} relationship`,
          },
        ],
      };
    } catch (error) {
      throw new Error(`Failed to link work items: ${this.getErrorMessage(error)}`);
    }
  }

  async createPullRequest(
    project: string,
    repository: string,
    sourceBranch: string,
    targetBranch: string,
    title: string,
    description?: string
  ) {
    try {
      // Security: Validate all inputs
      this.validateProjectName(project);
      this.validateStringInput(repository, 'Repository name', 255);
      this.validateStringInput(sourceBranch, 'Source branch', 255);
      this.validateStringInput(targetBranch, 'Target branch', 255);
      this.validateStringInput(title, 'PR title', 500);
      if (description) {
        this.validateStringInput(description, 'PR description', 4000);
      }
      
      // Additional validation for branch names to prevent injection
      const branchRegex = /^[a-zA-Z0-9._\-\/]+$/;
      if (!branchRegex.test(sourceBranch) || !branchRegex.test(targetBranch)) {
        throw new Error('Invalid branch name format');
      }
      
      const prData = {
        sourceRefName: `refs/heads/${sourceBranch}`,
        targetRefName: `refs/heads/${targetBranch}`,
        title,
        description: description || '',
      };

      const response = await this.api.post(
        `/${project}/_apis/git/repositories/${repository}/pullrequests?api-version=7.0`,
        prData
      );

      const pr = response.data;
      return {
        content: [
          {
            type: 'text',
            text: `Created PR #${pr.pullRequestId}: ${pr.title}
Source: ${sourceBranch} → Target: ${targetBranch}
Status: ${pr.status}
URL: ${pr.url}`,
          },
        ],
      };
    } catch (error) {
      throw new Error(`Failed to create pull request: ${this.getErrorMessage(error)}`);
    }
  }

  async updatePullRequestStatus(
    project: string,
    repository: string,
    pullRequestId: number,
    status: string
  ) {
    try {
      const statusMap: any = {
        'completed': { status: 'completed', lastMergeSourceCommit: {} },
        'abandoned': { status: 'abandoned' },
        'active': { status: 'active' },
      };

      const response = await this.api.patch(
        `/${project}/_apis/git/repositories/${repository}/pullrequests/${pullRequestId}?api-version=7.0`,
        statusMap[status] || { status }
      );

      const pr = response.data;
      return {
        content: [
          {
            type: 'text',
            text: `Updated PR #${pr.pullRequestId} status to: ${pr.status}`,
          },
        ],
      };
    } catch (error) {
      throw new Error(`Failed to update pull request status: ${this.getErrorMessage(error)}`);
    }
  }

  async listBranches(project: string, repository: string) {
    try {
      const response = await this.api.get(
        `/${project}/_apis/git/repositories/${repository}/refs?filter=heads&api-version=7.0`
      );

      const branches = response.data.value.map((ref: any) => ({
        name: ref.name.replace('refs/heads/', ''),
        objectId: ref.objectId,
        creator: ref.creator?.displayName,
      }));

      return {
        content: [
          {
            type: 'text',
            text: `Found ${branches.length} branches:\n${branches
              .map((b: any) => `- ${b.name} (${b.objectId.substring(0, 8)}${b.creator ? ` by ${b.creator}` : ''})`)
              .join('\n')}`,
          },
        ],
      };
    } catch (error) {
      throw new Error(`Failed to list branches: ${this.getErrorMessage(error)}`);
    }
  }

  async runBuild(project: string, definitionId: number, sourceBranch?: string) {
    try {
      // Security: Validate inputs
      this.validateProjectName(project);
      if (!Number.isInteger(definitionId) || definitionId <= 0) {
        throw new Error('Invalid build definition ID');
      }
      if (sourceBranch) {
        this.validateStringInput(sourceBranch, 'Source branch', 255);
        // Validate branch name format
        if (!/^[a-zA-Z0-9._\-\/]+$/.test(sourceBranch)) {
          throw new Error('Invalid branch name format');
        }
      }
      
      const buildData: any = {
        definition: { id: definitionId },
      };

      if (sourceBranch) {
        buildData.sourceBranch = `refs/heads/${sourceBranch}`;
      }

      const response = await this.api.post(
        `/${project}/_apis/build/builds?api-version=7.0`,
        buildData
      );

      const build = response.data;
      return {
        content: [
          {
            type: 'text',
            text: `Started build #${build.id}
Definition: ${build.definition.name}
Status: ${build.status}
Queue Time: ${new Date(build.queueTime).toLocaleString()}
URL: ${build._links.web.href}`,
          },
        ],
      };
    } catch (error) {
      throw new Error(`Failed to run build: ${this.getErrorMessage(error)}`);
    }
  }

  async getBuildStatus(project: string, buildId: number) {
    try {
      const response = await this.api.get(
        `/${project}/_apis/build/builds/${buildId}?api-version=7.0`
      );

      const build = response.data;
      return {
        content: [
          {
            type: 'text',
            text: `Build #${build.id}:
Definition: ${build.definition.name}
Status: ${build.status}
Result: ${build.result || 'In Progress'}
Start Time: ${build.startTime ? new Date(build.startTime).toLocaleString() : 'Not started'}
Finish Time: ${build.finishTime ? new Date(build.finishTime).toLocaleString() : 'Not finished'}
Requested By: ${build.requestedBy.displayName}`,
          },
        ],
      };
    } catch (error) {
      throw new Error(`Failed to get build status: ${this.getErrorMessage(error)}`);
    }
  }

  async listBuildDefinitions(project: string) {
    try {
      const response = await this.api.get(
        `/${project}/_apis/build/definitions?api-version=7.0`
      );

      const definitions = response.data.value.map((def: any) => ({
        id: def.id,
        name: def.name,
        path: def.path,
        type: def.type,
      }));

      return {
        content: [
          {
            type: 'text',
            text: `Found ${definitions.length} build definitions:\n${definitions
              .map((d: any) => `- [${d.id}] ${d.name} (${d.type})${d.path !== '\\' ? ` in ${d.path}` : ''}`)
              .join('\n')}`,
          },
        ],
      };
    } catch (error) {
      throw new Error(`Failed to list build definitions: ${this.getErrorMessage(error)}`);
    }
  }

  async searchCode(searchText: string, project?: string) {
    try {
      const searchBody = {
        searchText,
        $skip: 0,
        $top: 25,
        ...(project && { 
          filters: {
            Project: [project]
          }
        })
      };

      const response = await this.api.post(
        `/_apis/search/codesearchresults?api-version=7.0-preview.1`,
        searchBody
      );

      const results = response.data.results || [];
      if (results.length === 0) {
        return {
          content: [
            {
              type: 'text',
              text: 'No code results found matching the search criteria',
            },
          ],
        };
      }

      const items = results.map((r: any) => ({
        file: r.path,
        project: r.project.name,
        repository: r.repository.name,
        matches: r.matches?.length || 0,
      }));

      return {
        content: [
          {
            type: 'text',
            text: `Found ${items.length} code results:\n${items
              .map((i: any) => `- ${i.file} (${i.project}/${i.repository}) - ${i.matches} matches`)
              .join('\n')}`,
          },
        ],
      };
    } catch (error) {
      throw new Error(`Failed to search code: ${this.getErrorMessage(error)}`);
    }
  }

  // === TEST PLANS & QA METHODS ===

  async createTestPlan(project: string, name: string, areaPath?: string, iteration?: string) {
    try {
      const planData: any = {
        name,
        area: { name: areaPath || project },
        iteration: iteration || `${project}\\Iteration 1`,
      };

      const response = await this.api.post(
        `/${project}/_apis/test/plans?api-version=7.0`,
        planData
      );

      const plan = response.data;
      return {
        content: [
          {
            type: 'text',
            text: `Created test plan: ${plan.name} (ID: ${plan.id})`,
          },
        ],
      };
    } catch (error) {
      throw new Error(`Failed to create test plan: ${this.getErrorMessage(error)}`);
    }
  }

  async listTestPlans(project: string, isActive?: boolean) {
    try {
      const response = await this.api.get(
        `/${project}/_apis/test/plans?api-version=7.0`
      );

      let plans = response.data.value;
      if (isActive !== undefined) {
        plans = plans.filter((p: any) => p.state === (isActive ? 'Active' : 'Inactive'));
      }

      return {
        content: [
          {
            type: 'text',
            text: `Found ${plans.length} test plans:\n${plans
              .map((p: any) => `- [${p.id}] ${p.name} (${p.state})`)
              .join('\n')}`,
          },
        ],
      };
    } catch (error) {
      throw new Error(`Failed to list test plans: ${this.getErrorMessage(error)}`);
    }
  }

  async createTestSuite(project: string, planId: number, name: string, suiteType?: string) {
    try {
      const suiteData: any = {
        suiteType: suiteType || 'StaticTestSuite',
        name,
      };

      const response = await this.api.post(
        `/${project}/_apis/test/Plans/${planId}/suites?api-version=7.0`,
        suiteData
      );

      const suite = response.data;
      return {
        content: [
          {
            type: 'text',
            text: `Created test suite: ${suite.name} (ID: ${suite.id}) in plan ${planId}`,
          },
        ],
      };
    } catch (error) {
      throw new Error(`Failed to create test suite: ${this.getErrorMessage(error)}`);
    }
  }

  async createTestCase(
    project: string,
    title: string,
    steps?: string,
    expectedResult?: string,
    priority?: number
  ) {
    try {
      const operations = [
        {
          op: 'add',
          path: '/fields/System.Title',
          value: title,
        },
        {
          op: 'add',
          path: '/fields/Microsoft.VSTS.Common.Priority',
          value: priority || 2,
        },
      ];

      if (steps) {
        operations.push({
          op: 'add',
          path: '/fields/Microsoft.VSTS.TCM.Steps',
          value: `<steps><step id="1"><action>${steps}</action><expectedresult>${expectedResult || ''}</expectedresult></step></steps>`,
        });
      }

      const response = await this.api.post(
        `/${project}/_apis/wit/workitems/$Test Case?api-version=7.0`,
        operations,
        {
          headers: {
            'Content-Type': 'application/json-patch+json',
          },
        }
      );

      const testCase = response.data;
      return {
        content: [
          {
            type: 'text',
            text: `Created test case #${testCase.id}: ${testCase.fields['System.Title']}`,
          },
        ],
      };
    } catch (error) {
      throw new Error(`Failed to create test case: ${this.getErrorMessage(error)}`);
    }
  }

  async addTestCasesToSuite(
    project: string,
    planId: number,
    suiteId: number,
    testCaseIds: number[]
  ) {
    try {
      const response = await this.api.post(
        `/${project}/_apis/test/Plans/${planId}/suites/${suiteId}/testcases?api-version=7.0`,
        testCaseIds.map(id => ({ testCase: { id } }))
      );

      return {
        content: [
          {
            type: 'text',
            text: `Added ${testCaseIds.length} test cases to suite ${suiteId}`,
          },
        ],
      };
    } catch (error) {
      throw new Error(`Failed to add test cases to suite: ${this.getErrorMessage(error)}`);
    }
  }

  async listTestCases(project: string, planId: number, suiteId: number) {
    try {
      const response = await this.api.get(
        `/${project}/_apis/test/Plans/${planId}/suites/${suiteId}/testcases?api-version=7.0`
      );

      const testCases = response.data.value.map((tc: any) => ({
        id: tc.testCase.id,
        name: tc.testCase.name,
        state: tc.testCase.state,
        priority: tc.testCase.priority,
      }));

      return {
        content: [
          {
            type: 'text',
            text: `Found ${testCases.length} test cases in suite:\n${testCases
              .map((tc: any) => `- [${tc.id}] ${tc.name} (Priority: ${tc.priority})`)
              .join('\n')}`,
          },
        ],
      };
    } catch (error) {
      throw new Error(`Failed to list test cases: ${this.getErrorMessage(error)}`);
    }
  }

  async runTestCase(
    project: string,
    planId: number,
    suiteId: number,
    testCaseId: number,
    outcome: string,
    comment?: string
  ) {
    try {
      const runData = {
        name: `Test Run - ${new Date().toISOString()}`,
        plan: { id: planId },
        pointIds: [`${suiteId}.${testCaseId}`],
      };

      const runResponse = await this.api.post(
        `/${project}/_apis/test/runs?api-version=7.0`,
        runData
      );

      const runId = runResponse.data.id;

      // Update test result
      const resultData = [{
        id: 100000,
        outcome,
        comment: comment || '',
        state: 'Completed',
      }];

      await this.api.patch(
        `/${project}/_apis/test/runs/${runId}/results?api-version=7.0`,
        resultData
      );

      return {
        content: [
          {
            type: 'text',
            text: `Test case ${testCaseId} executed with outcome: ${outcome}`,
          },
        ],
      };
    } catch (error) {
      throw new Error(`Failed to run test case: ${this.getErrorMessage(error)}`);
    }
  }

  async getTestResults(project: string, runId: number) {
    try {
      const response = await this.api.get(
        `/${project}/_apis/test/runs/${runId}/results?api-version=7.0`
      );

      const results = response.data.value.map((r: any) => ({
        id: r.id,
        testCase: r.testCase?.name || 'Unknown',
        outcome: r.outcome,
        duration: r.durationInMs,
        errorMessage: r.errorMessage,
      }));

      return {
        content: [
          {
            type: 'text',
            text: `Test results for run ${runId}:\n${results
              .map((r: any) => `- ${r.testCase}: ${r.outcome}${r.errorMessage ? ` - ${r.errorMessage}` : ''}`)
              .join('\n')}`,
          },
        ],
      };
    } catch (error) {
      throw new Error(`Failed to get test results: ${this.getErrorMessage(error)}`);
    }
  }

  async getTestResultsByBuild(project: string, buildId: number) {
    try {
      const response = await this.api.get(
        `/${project}/_apis/test/Results/results?buildId=${buildId}&api-version=7.0-preview.1`
      );

      const results = response.data.value || [];
      const summary = {
        total: results.length,
        passed: results.filter((r: any) => r.outcome === 'Passed').length,
        failed: results.filter((r: any) => r.outcome === 'Failed').length,
        other: results.filter((r: any) => !['Passed', 'Failed'].includes(r.outcome)).length,
      };

      return {
        content: [
          {
            type: 'text',
            text: `Test results for build ${buildId}:
Total: ${summary.total}
Passed: ${summary.passed}
Failed: ${summary.failed}
Other: ${summary.other}

Details:
${results.slice(0, 10).map((r: any) => `- ${r.testCaseTitle}: ${r.outcome}`).join('\n')}
${results.length > 10 ? `\n... and ${results.length - 10} more` : ''}`,
          },
        ],
      };
    } catch (error) {
      throw new Error(`Failed to get test results by build: ${this.getErrorMessage(error)}`);
    }
  }

  // === RELEASE MANAGEMENT METHODS ===

  async listReleaseDefinitions(project: string) {
    try {
      const response = await this.api.get(
        `/${project}/_apis/release/definitions?api-version=7.0`,
        {
          baseURL: this.api.defaults.baseURL?.replace('dev.azure.com', 'vsrm.dev.azure.com'),
        }
      );

      const definitions = response.data.value.map((def: any) => ({
        id: def.id,
        name: def.name,
        path: def.path,
        releaseNameFormat: def.releaseNameFormat,
      }));

      return {
        content: [
          {
            type: 'text',
            text: `Found ${definitions.length} release definitions:\n${definitions
              .map((d: any) => `- [${d.id}] ${d.name}${d.path !== '\\' ? ` in ${d.path}` : ''}`)
              .join('\n')}`,
          },
        ],
      };
    } catch (error) {
      throw new Error(`Failed to list release definitions: ${this.getErrorMessage(error)}`);
    }
  }

  async listReleases(project: string, definitionId?: number) {
    try {
      const params: any = { 'api-version': '7.0' };
      if (definitionId) {
        params.definitionId = definitionId;
      }

      const response = await this.api.get(
        `/${project}/_apis/release/releases`,
        {
          params,
          baseURL: this.api.defaults.baseURL?.replace('dev.azure.com', 'vsrm.dev.azure.com'),
        }
      );

      const releases = response.data.value.map((rel: any) => ({
        id: rel.id,
        name: rel.name,
        status: rel.status,
        createdOn: rel.createdOn,
        definitionName: rel.releaseDefinition.name,
      }));

      return {
        content: [
          {
            type: 'text',
            text: `Found ${releases.length} releases:\n${releases
              .map((r: any) => `- [${r.id}] ${r.name} - ${r.definitionName} (${r.status})`)
              .join('\n')}`,
          },
        ],
      };
    } catch (error) {
      throw new Error(`Failed to list releases: ${this.getErrorMessage(error)}`);
    }
  }

  async createRelease(project: string, definitionId: number, description?: string) {
    try {
      const releaseData = {
        definitionId,
        description: description || `Release created at ${new Date().toISOString()}`,
        isDraft: false,
        manualEnvironments: [],
      };

      const response = await this.api.post(
        `/${project}/_apis/release/releases?api-version=7.0`,
        releaseData,
        {
          baseURL: this.api.defaults.baseURL?.replace('dev.azure.com', 'vsrm.dev.azure.com'),
        }
      );

      const release = response.data;
      return {
        content: [
          {
            type: 'text',
            text: `Created release: ${release.name} (ID: ${release.id})
Status: ${release.status}
URL: ${release._links.web.href}`,
          },
        ],
      };
    } catch (error) {
      throw new Error(`Failed to create release: ${this.getErrorMessage(error)}`);
    }
  }

  async deployRelease(project: string, releaseId: number, environmentId: number) {
    try {
      const deployData = {
        status: 'InProgress',
        scheduledDeploymentTime: new Date().toISOString(),
        comment: 'Deployment triggered via MCP',
      };

      const response = await this.api.patch(
        `/${project}/_apis/release/releases/${releaseId}/environments/${environmentId}?api-version=7.0-preview.7`,
        deployData,
        {
          baseURL: this.api.defaults.baseURL?.replace('dev.azure.com', 'vsrm.dev.azure.com'),
        }
      );

      return {
        content: [
          {
            type: 'text',
            text: `Started deployment of release ${releaseId} to environment ${environmentId}`,
          },
        ],
      };
    } catch (error) {
      throw new Error(`Failed to deploy release: ${this.getErrorMessage(error)}`);
    }
  }

  // === WIKI METHODS ===

  async listWikis(project: string) {
    try {
      const response = await this.api.get(
        `/${project}/_apis/wiki/wikis?api-version=7.0`
      );

      const wikis = response.data.value.map((wiki: any) => ({
        id: wiki.id,
        name: wiki.name,
        type: wiki.type,
        url: wiki.remoteUrl,
      }));

      return {
        content: [
          {
            type: 'text',
            text: `Found ${wikis.length} wikis:\n${wikis
              .map((w: any) => `- ${w.name} (${w.type})`)
              .join('\n')}`,
          },
        ],
      };
    } catch (error) {
      throw new Error(`Failed to list wikis: ${this.getErrorMessage(error)}`);
    }
  }

  async getWikiPage(project: string, wikiIdentifier: string, path: string) {
    try {
      const response = await this.api.get(
        `/${project}/_apis/wiki/wikis/${wikiIdentifier}/pages?path=${encodeURIComponent(path)}&api-version=7.0`
      );

      const page = response.data;
      return {
        content: [
          {
            type: 'text',
            text: `Wiki Page: ${page.path}
Version: ${page.gitItemPath}

Content:
${page.content}`,
          },
        ],
      };
    } catch (error) {
      throw new Error(`Failed to get wiki page: ${this.getErrorMessage(error)}`);
    }
  }

  async createWikiPage(
    project: string,
    wikiIdentifier: string,
    path: string,
    content: string
  ) {
    try {
      const response = await this.api.put(
        `/${project}/_apis/wiki/wikis/${wikiIdentifier}/pages?path=${encodeURIComponent(path)}&api-version=7.0`,
        { content },
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );

      const page = response.data;
      return {
        content: [
          {
            type: 'text',
            text: `Created wiki page: ${page.path}`,
          },
        ],
      };
    } catch (error) {
      throw new Error(`Failed to create wiki page: ${this.getErrorMessage(error)}`);
    }
  }

  async updateWikiPage(
    project: string,
    wikiIdentifier: string,
    path: string,
    content: string,
    version: string
  ) {
    try {
      const response = await this.api.put(
        `/${project}/_apis/wiki/wikis/${wikiIdentifier}/pages?path=${encodeURIComponent(path)}&api-version=7.0`,
        { content },
        {
          headers: {
            'Content-Type': 'application/json',
            'If-Match': version,
          },
        }
      );

      const page = response.data;
      return {
        content: [
          {
            type: 'text',
            text: `Updated wiki page: ${page.path}`,
          },
        ],
      };
    } catch (error) {
      throw new Error(`Failed to update wiki page: ${this.getErrorMessage(error)}`);
    }
  }

  // === ITERATIONS & AREAS METHODS ===

  async listIterations(project: string) {
    try {
      const response = await this.api.get(
        `/${project}/_apis/work/teamsettings/iterations?api-version=7.0`
      );

      const iterations = response.data.value.map((iter: any) => ({
        id: iter.id,
        name: iter.name,
        path: iter.path,
        startDate: iter.attributes?.startDate,
        finishDate: iter.attributes?.finishDate,
      }));

      return {
        content: [
          {
            type: 'text',
            text: `Found ${iterations.length} iterations:\n${iterations
              .map((i: any) => `- ${i.name}${i.startDate ? ` (${new Date(i.startDate).toLocaleDateString()} - ${new Date(i.finishDate).toLocaleDateString()})` : ''}`)
              .join('\n')}`,
          },
        ],
      };
    } catch (error) {
      throw new Error(`Failed to list iterations: ${this.getErrorMessage(error)}`);
    }
  }

  async listAreas(project: string) {
    try {
      const response = await this.api.get(
        `/${project}/_apis/wit/classificationnodes/areas?$depth=10&api-version=7.0`
      );

      const areas: any[] = [];
      const traverse = (node: any, prefix = '') => {
        areas.push({
          id: node.id,
          name: node.name,
          path: prefix + node.name,
        });
        if (node.children) {
          node.children.forEach((child: any) => traverse(child, prefix + node.name + '\\'));
        }
      };
      traverse(response.data);

      return {
        content: [
          {
            type: 'text',
            text: `Found ${areas.length} areas:\n${areas
              .map((a: any) => `- ${a.path}`)
              .join('\n')}`,
          },
        ],
      };
    } catch (error) {
      throw new Error(`Failed to list areas: ${this.getErrorMessage(error)}`);
    }
  }

  async createIteration(
    project: string,
    name: string,
    startDate?: string,
    finishDate?: string,
    path?: string
  ) {
    try {
      const iterationData: any = { name };
      if (startDate && finishDate) {
        iterationData.attributes = {
          startDate: new Date(startDate).toISOString(),
          finishDate: new Date(finishDate).toISOString(),
        };
      }

      const basePath = path || '';
      const response = await this.api.post(
        `/${project}/_apis/wit/classificationnodes/iterations/${basePath}?api-version=7.0`,
        iterationData
      );

      const iteration = response.data;
      return {
        content: [
          {
            type: 'text',
            text: `Created iteration: ${iteration.name}${startDate ? ` (${startDate} to ${finishDate})` : ''}`,
          },
        ],
      };
    } catch (error) {
      throw new Error(`Failed to create iteration: ${this.getErrorMessage(error)}`);
    }
  }

  async createArea(project: string, name: string, path?: string) {
    try {
      const areaData = { name };
      const basePath = path || '';

      const response = await this.api.post(
        `/${project}/_apis/wit/classificationnodes/areas/${basePath}?api-version=7.0`,
        areaData
      );

      const area = response.data;
      return {
        content: [
          {
            type: 'text',
            text: `Created area: ${area.name} at path: ${area.path}`,
          },
        ],
      };
    } catch (error) {
      throw new Error(`Failed to create area: ${this.getErrorMessage(error)}`);
    }
  }

  /**
   * Get detailed information about a specific pull request
   * @param project - Project name
   * @param repository - Repository name
   * @param pullRequestId - Pull request ID
   * @returns MCP-formatted response with PR details
   */
  async getPullRequest(project: string, repository: string, pullRequestId: number) {
    try {
      this.checkRateLimit();
      this.validateProjectName(project);
      this.validateStringInput(repository, 'Repository name', 255);
      if (!Number.isInteger(pullRequestId) || pullRequestId <= 0) {
        throw new Error('Invalid pull request ID');
      }
      const response = await this.api.get(
        `/${project}/_apis/git/repositories/${repository}/pullrequests/${pullRequestId}?api-version=7.0`
      );
      const pr = response.data;
      return {
        content: [
          {
            type: 'text',
            text: `Pull Request #${pr.pullRequestId}: ${pr.title}\n` +
              `Status: ${pr.status}\n` +
              `Created By: ${pr.createdBy?.displayName || 'Unknown'}\n` +
              `Source Branch: ${pr.sourceRefName}\n` +
              `Target Branch: ${pr.targetRefName}\n` +
              `Created: ${pr.creationDate}\n` +
              `Description: ${pr.description || 'No description'}\n` +
              `Reviewers: ${(pr.reviewers || []).map((r: any) => r.displayName).join(', ') || 'None'}`
          },
        ],
      };
    } catch (error) {
      throw new Error(`Failed to get pull request details: ${this.getErrorMessage(error)}`);
    }
  }

  /**
   * List all repositories in a project
   * @param project - Project name
   * @returns MCP-formatted response with repository list
   */
  async listRepositories(project: string) {
    try {
      this.checkRateLimit();
      this.validateProjectName(project);
      const response = await this.api.get(`/${project}/_apis/git/repositories?api-version=7.0`);
      const repos = response.data.value || [];
      return {
        content: [
          {
            type: 'text',
            text: `Found ${repos.length} repositories in project '${project}':\n` +
              repos.map((r: any) => `- ${r.name}${r.isDisabled ? ' (disabled)' : ''}`).join('\n'),
          },
        ],
      };
    } catch (error) {
      throw new Error(`Failed to list repositories: ${this.getErrorMessage(error)}`);
    }
  }

  /**
   * Get a specific repository by name or ID
   * @param project - Project name
   * @param repoIdOrName - Repository name or ID
   * @returns MCP-formatted response with repository details
   */
  async getRepository(project: string, repoIdOrName: string) {
    try {
      this.checkRateLimit();
      this.validateProjectName(project);
      this.validateStringInput(repoIdOrName, 'Repository name or ID', 255);
      const response = await this.api.get(`/${project}/_apis/git/repositories/${repoIdOrName}?api-version=7.0`);
      const repo = response.data;
      return {
        content: [
          {
            type: 'text',
            text: `Repository: ${repo.name}\nID: ${repo.id}\nDefault Branch: ${repo.defaultBranch}\nURL: ${repo.webUrl}`,
          },
        ],
      };
    } catch (error) {
      throw new Error(`Failed to get repository: ${this.getErrorMessage(error)}`);
    }
  }

  /**
   * Get a specific branch by name
   * @param project - Project name
   * @param repository - Repository name
   * @param branchName - Branch name
   * @returns MCP-formatted response with branch details
   */
  async getBranch(project: string, repository: string, branchName: string) {
    try {
      this.checkRateLimit();
      this.validateProjectName(project);
      this.validateStringInput(repository, 'Repository name', 255);
      this.validateStringInput(branchName, 'Branch name', 255);
      // The branch name in the API doesn't include 'refs/heads/'
      const formattedBranchName = branchName.startsWith('refs/heads/') ? branchName.substring(11) : branchName;
      const response = await this.api.get(`/${project}/_apis/git/repositories/${repository}/refs?filter=heads/${formattedBranchName}&api-version=7.0`);
      const branch = response.data.value[0];
      if (!branch) {
        return { content: [{ type: 'text', text: `Branch '${branchName}' not found.` }] };
      }
      return {
        content: [
          {
            type: 'text',
            text: `Branch: ${branch.name}\nCommit: ${branch.objectId}`,
          },
        ],
      };
    } catch (error) {
      throw new Error(`Failed to get branch: ${this.getErrorMessage(error)}`);
    }
  }

  /**
   * List all pull requests in a project
   * @param project - Project name
   * @returns MCP-formatted response with pull request list
   */
  async listPullRequestsByProject(project: string) {
    try {
      this.checkRateLimit();
      this.validateProjectName(project);
      const response = await this.api.get(`/${project}/_apis/git/pullrequests?api-version=7.0`);
      const prs = response.data.value || [];
      return {
        content: [
          {
            type: 'text',
            text: `Found ${prs.length} pull requests in project '${project}':\n` +
              prs.map((p: any) => `- #${p.pullRequestId}: ${p.title} (in ${p.repository.name})`).join('\n'),
          },
        ],
      };
    } catch (error) {
      throw new Error(`Failed to list pull requests by project: ${this.getErrorMessage(error)}`);
    }
  }

  /**
   * List threads in a pull request
   * @param project - Project name
   * @param repository - Repository name
   * @param pullRequestId - Pull request ID
   * @returns MCP-formatted response with thread list
   */
  async listPullRequestThreads(project: string, repository: string, pullRequestId: number) {
    try {
      this.checkRateLimit();
      const response = await this.api.get(`/${project}/_apis/git/repositories/${repository}/pullrequests/${pullRequestId}/threads?api-version=7.0`);
      const threads = response.data.value || [];
      return {
        content: [
          {
            type: 'text',
            text: `Found ${threads.length} threads in PR #${pullRequestId}:\n` +
              threads.map((t: any) => `- Thread ${t.id} (Status: ${t.status})`).join('\n'),
          },
        ],
      };
    } catch (error) {
      throw new Error(`Failed to list pull request threads: ${this.getErrorMessage(error)}`);
    }
  }

  /**
   * List comments in a pull request thread
   * @param project - Project name
   * @param repository - Repository name
   * @param pullRequestId - Pull request ID
   * @param threadId - Thread ID
   * @returns MCP-formatted response with comment list
   */
  async listPullRequestThreadComments(project: string, repository: string, pullRequestId: number, threadId: number) {
    try {
      this.checkRateLimit();
      const response = await this.api.get(`/${project}/_apis/git/repositories/${repository}/pullrequests/${pullRequestId}/threads/${threadId}/comments?api-version=7.0`);
      const comments = response.data.value || [];
      return {
        content: [
          {
            type: 'text',
            text: `Found ${comments.length} comments in thread #${threadId}:\n` +
              comments.map((c: any) => `- [${c.id}] ${c.author.displayName}: ${c.content}`).join('\n'),
          },
        ],
      };
    } catch (error) {
      throw new Error(`Failed to list pull request thread comments: ${this.getErrorMessage(error)}`);
    }
  }

  /**
   * Reply to a comment in a pull request thread
   * @param project - Project name
   * @param repository - Repository name
   * @param pullRequestId - Pull request ID
   * @param threadId - Thread ID
   * @param content - Comment content
   * @returns MCP-formatted response with confirmation
   */
  async replyToPullRequestComment(project: string, repository: string, pullRequestId: number, threadId: number, content: string) {
    try {
      this.checkRateLimit();
      const payload = { content, commentType: 1 }; // 1 for Text
      const response = await this.api.post(
        `/${project}/_apis/git/repositories/${repository}/pullrequests/${pullRequestId}/threads/${threadId}/comments?api-version=7.0`,
        payload
      );
      return { content: [{ type: 'text', text: `Successfully replied to thread #${threadId}.` }] };
    } catch (error) {
      throw new Error(`Failed to reply to comment: ${this.getErrorMessage(error)}`);
    }
  }

  /**
   * Resolve a comment thread in a pull request
   * @param project - Project name
   * @param repository - Repository name
   * @param pullRequestId - Pull request ID
   * @param threadId - Thread ID
   * @returns MCP-formatted response with confirmation
   */
  async resolvePullRequestThread(project: string, repository: string, pullRequestId: number, threadId: number) {
    try {
      this.checkRateLimit();
      const payload = { status: 'closed' }; // Or 'fixed', 'wontFix'
      await this.api.patch(
        `/${project}/_apis/git/repositories/${repository}/pullrequests/${pullRequestId}/threads/${threadId}?api-version=7.0`,
        payload
      );
      return { content: [{ type: 'text', text: `Successfully resolved thread #${threadId}.` }] };
    } catch (error) {
      throw new Error(`Failed to resolve comment thread: ${this.getErrorMessage(error)}`);
    }
  }
} 