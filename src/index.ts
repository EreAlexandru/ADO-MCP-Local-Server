/**
 * Azure DevOps MCP Server for Cursor (PAT Auth, No CLI Required)
 * Enhanced with Microsoft parity - 60+ tools, no Azure CLI required
 */

import { Server } from '@modelcontextprotocol/sdk/server/index.js';
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js';
import {
  CallToolRequestSchema,
  ListToolsRequestSchema,
} from '@modelcontextprotocol/sdk/types.js';
import { AzureDevOpsClient } from './azureDevOpsClient.js';
import { ALL_TOOLS } from './tools/index.js';
import * as handlers from './handlers/index.js';
import { packageVersion } from './version.js';
import { configurePrompts } from './prompts/index.js';

// Get organization from command line args (like Microsoft)
const args = process.argv.slice(2);
if (args.length === 0) {
  console.error("Usage: mcp-server-azuredevops <organization_name>");
  process.exit(1);
}

export const orgName = args[0];

// Initialize Azure DevOps client
const adoClient = new AzureDevOpsClient();

// Create MCP server with enhanced capabilities
const server = new Server(
  {
    name: 'azure-devops-mcp-cursor',
    version: packageVersion,
  },
  {
    capabilities: {
      tools: {},
      prompts: {},
    },
  }
);

// Configure prompts for guided workflows
configurePrompts(server);

// Handle list tools request - return all available tools
server.setRequestHandler(ListToolsRequestSchema, async () => {
  return {
    tools: ALL_TOOLS,
  };
});

// Handle tool execution with comprehensive error handling
server.setRequestHandler(CallToolRequestSchema, async (request) => {
  const { name, arguments: args } = request.params;

  try {
    switch (name) {
      // Project tools
      case 'list_projects':
        return await handlers.handleListProjects(adoClient);
      
      case 'get_project': {
        const { projectId } = args as { projectId: string };
        return await handlers.handleGetProject(adoClient, projectId);
      }

      // Work item tools (enhanced)
      case 'list_work_items': {
        const { project, query } = args as { project: string; query?: string };
        return await handlers.handleListWorkItems(adoClient, project, query);
      }
      
      case 'wit_my_work_items': {
        const { project } = args as { project: string };
        return await handlers.handleWitMyWorkItems(adoClient, project);
      }
      
      case 'wit_get_work_item': {
        const { id } = args as { id: number };
        return await handlers.handleWitGetWorkItem(adoClient, id);
      }
      
      case 'wit_update_work_item': {
        const { id, title, description, state, assignedTo } = args as { id: number; title?: string; description?: string; state?: string; assignedTo?: string; };
        return await handlers.handleWitUpdateWorkItem(adoClient, id, { title, description, state, assignedTo });
      }
      
      case 'wit_create_work_item': {
        const { project, type, fields } = args as { project: string; type: string; fields: { [key: string]: any; } };
        return await handlers.handleWitCreateWorkItem(adoClient, project, type, fields);
      }
      
      case 'wit_list_work_item_comments': {
        const { id } = args as { id: number };
        return await handlers.handleWitListWorkItemComments(adoClient, id);
      }
      
      case 'wit_get_work_items_for_iteration': {
        const { project, iterationPath } = args as { project: string; iterationPath: string; };
        return await handlers.handleWitGetWorkItemsForIteration(adoClient, project, iterationPath);
      }
      
      case 'wit_add_work_item_comment': {
        const { id, comment } = args as { id: number; comment: string };
        return await handlers.handleWitAddWorkItemComment(adoClient, id, comment);
      }
      
      case 'wit_work_items_link': {
        const { sourceId, targetId, linkType } = args as { sourceId: number; targetId: number; linkType: string; };
        return await handlers.handleWitLinkWorkItems(adoClient, sourceId, targetId, linkType);
      }
      
      case 'wit_run_query': {
        const { query } = args as { query: string };
        return await handlers.handleWitRunQuery(adoClient, query);
      }
      
      case 'wit_search_work_items': {
        const { searchText, project } = args as { searchText: string; project?: string };
        return await handlers.handleWitSearchWorkItems(adoClient, searchText, project);
      }

      // Work tools (Teams, Iterations, Areas)
      case 'work_list_iterations': {
        const { project } = args as { project: string };
        return await handlers.handleListIterations(adoClient, project);
      }

      case 'work_list_areas': {
        const { project } = args as { project: string };
        return await handlers.handleListAreas(adoClient, project);
      }

      case 'work_create_iteration': {
        const { project, name, startDate, finishDate, path } = args as {
          project: string;
          name: string;
          startDate?: string;
          finishDate?: string;
          path?: string;
        };
        return await handlers.handleCreateIteration(adoClient, project, name, startDate, finishDate, path);
      }

      case 'work_create_area': {
        const { project, name, path } = args as {
          project: string;
          name: string;
          path?: string;
        };
        return await handlers.handleCreateArea(adoClient, project, name, path);
      }

      // Repository tools
      case 'repo_list_pull_requests_by_repo': {
        const { project, repository, status } = args as { project: string; repository: string; status?: string; };
        return await handlers.handleListPullRequests(adoClient, project, repository, status);
      }
      
      case 'repo_list_pull_requests_by_project': {
        const { project } = args as { project: string };
        return await handlers.handleListPullRequestsByProject(adoClient, project);
      }
      
      case 'repo_create_pull_request': {
        const { project, repository, sourceBranch, targetBranch, title, description } = args as { project: string; repository: string; sourceBranch: string; targetBranch: string; title: string; description?: string; };
        return await handlers.handleCreatePullRequest(adoClient, project, repository, sourceBranch, targetBranch, title, description);
      }
      
      case 'repo_update_pull_request_status': {
        const { project, repository, pullRequestId, status } = args as { project: string; repository: string; pullRequestId: number; status: string; };
        return await handlers.handleUpdatePullRequestStatus(adoClient, project, repository, pullRequestId, status);
      }
      
      case 'repo_list_branches_by_repo': {
        const { project, repository } = args as { project: string; repository: string; };
        return await handlers.handleListBranches(adoClient, project, repository);
      }
      
      case 'repo_get_pull_request_by_id': {
        const { project, repository, pullRequestId } = args as { project: string; repository: string; pullRequestId: number; };
        return await handlers.handleGetPullRequest(adoClient, project, repository, pullRequestId);
      }
      
      case 'repo_list_repos_by_project': {
        const { project } = args as { project: string };
        return await handlers.handleListRepositories(adoClient, project);
      }
      
      case 'repo_get_repo_by_name_or_id': {
        const { project, repoIdOrName } = args as { project: string; repoIdOrName: string; };
        return await handlers.handleGetRepository(adoClient, project, repoIdOrName);
      }
      
      case 'repo_get_branch_by_name': {
        const { project, repository, branchName } = args as { project: string; repository: string; branchName: string; };
        return await handlers.handleGetBranch(adoClient, project, repository, branchName);
      }
      
      case 'repo_list_pull_request_threads': {
        const { project, repository, pullRequestId } = args as { project: string; repository: string; pullRequestId: number; };
        return await handlers.handleListPullRequestThreads(adoClient, project, repository, pullRequestId);
      }
      
      case 'repo_reply_to_comment': {
        const { project, repository, pullRequestId, threadId, content } = args as { project: string; repository: string; pullRequestId: number; threadId: number; content: string; };
        return await handlers.handleReplyToPullRequestComment(adoClient, project, repository, pullRequestId, threadId, content);
      }
      
      case 'repo_resolve_comment': {
        const { project, repository, pullRequestId, threadId } = args as { project: string; repository: string; pullRequestId: number; threadId: number; };
        return await handlers.handleResolvePullRequestThread(adoClient, project, repository, pullRequestId, threadId);
      }

      // Build tools
      case 'run_build': {
        const { project, definitionId, sourceBranch } = args as {
          project: string;
          definitionId: number;
          sourceBranch?: string;
        };
        return await handlers.handleRunBuild(adoClient, project, definitionId, sourceBranch);
      }

      case 'get_build_status': {
        const { project, buildId } = args as {
          project: string;
          buildId: number;
        };
        return await handlers.handleGetBuildStatus(adoClient, project, buildId);
      }

      case 'list_build_definitions': {
        const { project } = args as { project: string };
        return await handlers.handleListBuildDefinitions(adoClient, project);
      }

      // Search tools
      case 'search_code': {
        const { searchText, project } = args as {
          searchText: string;
          project?: string;
        };
        return await handlers.handleSearchCode(adoClient, searchText, project);
      }

      // Test tools
      case 'create_test_plan': {
        const { project, name, areaPath, iteration } = args as {
          project: string;
          name: string;
          areaPath?: string;
          iteration?: string;
        };
        return await handlers.handleCreateTestPlan(adoClient, project, name, areaPath, iteration);
      }

      case 'list_test_plans': {
        const { project, isActive } = args as {
          project: string;
          isActive?: boolean;
        };
        return await handlers.handleListTestPlans(adoClient, project, isActive);
      }

      case 'create_test_suite': {
        const { project, planId, name, suiteType } = args as {
          project: string;
          planId: number;
          name: string;
          suiteType?: string;
        };
        return await handlers.handleCreateTestSuite(adoClient, project, planId, name, suiteType);
      }

      case 'create_test_case': {
        const { project, title, steps, expectedResult, priority } = args as {
          project: string;
          title: string;
          steps?: string;
          expectedResult?: string;
          priority?: number;
        };
        return await handlers.handleCreateTestCase(adoClient, project, title, steps, expectedResult, priority);
      }

      case 'add_test_cases_to_suite': {
        const { project, planId, suiteId, testCaseIds } = args as {
          project: string;
          planId: number;
          suiteId: number;
          testCaseIds: number[];
        };
        return await handlers.handleAddTestCasesToSuite(adoClient, project, planId, suiteId, testCaseIds);
      }

      case 'list_test_cases': {
        const { project, planId, suiteId } = args as {
          project: string;
          planId: number;
          suiteId: number;
        };
        return await handlers.handleListTestCases(adoClient, project, planId, suiteId);
      }

      case 'run_test_case': {
        const { project, planId, suiteId, testCaseId, outcome, comment } = args as {
          project: string;
          planId: number;
          suiteId: number;
          testCaseId: number;
          outcome: string;
          comment?: string;
        };
        return await handlers.handleRunTestCase(adoClient, project, planId, suiteId, testCaseId, outcome, comment);
      }

      case 'get_test_results': {
        const { project, runId } = args as {
          project: string;
          runId: number;
        };
        return await handlers.handleGetTestResults(adoClient, project, runId);
      }

      case 'get_test_results_by_build': {
        const { project, buildId } = args as {
          project: string;
          buildId: number;
        };
        return await handlers.handleGetTestResultsByBuild(adoClient, project, buildId);
      }

      // Release tools
      case 'list_release_definitions': {
        const { project } = args as { project: string };
        return await handlers.handleListReleaseDefinitions(adoClient, project);
      }

      case 'list_releases': {
        const { project, definitionId } = args as {
          project: string;
          definitionId?: number;
        };
        return await handlers.handleListReleases(adoClient, project, definitionId);
      }

      case 'create_release': {
        const { project, definitionId, description } = args as {
          project: string;
          definitionId: number;
          description?: string;
        };
        return await handlers.handleCreateRelease(adoClient, project, definitionId, description);
      }

      case 'deploy_release': {
        const { project, releaseId, environmentId } = args as {
          project: string;
          releaseId: number;
          environmentId: number;
        };
        return await handlers.handleDeployRelease(adoClient, project, releaseId, environmentId);
      }

      // Wiki tools
      case 'list_wikis': {
        const { project } = args as { project: string };
        return await handlers.handleListWikis(adoClient, project);
      }

      case 'get_wiki_page': {
        const { project, wikiIdentifier, path } = args as {
          project: string;
          wikiIdentifier: string;
          path: string;
        };
        return await handlers.handleGetWikiPage(adoClient, project, wikiIdentifier, path);
      }

      case 'create_wiki_page': {
        const { project, wikiIdentifier, path, content } = args as {
          project: string;
          wikiIdentifier: string;
          path: string;
          content: string;
        };
        return await handlers.handleCreateWikiPage(adoClient, project, wikiIdentifier, path, content);
      }

      case 'update_wiki_page': {
        const { project, wikiIdentifier, path, content, version } = args as {
          project: string;
          wikiIdentifier: string;
          path: string;
          content: string;
          version: string;
        };
        return await handlers.handleUpdateWikiPage(adoClient, project, wikiIdentifier, path, content, version);
      }

      // Organization tools (renamed to work tools)
      case 'list_iterations': {
        const { project } = args as { project: string };
        return await handlers.handleListIterations(adoClient, project);
      }

      case 'list_areas': {
        const { project } = args as { project: string };
        return await handlers.handleListAreas(adoClient, project);
      }

      case 'create_iteration': {
        const { project, name, startDate, finishDate, path } = args as {
          project: string;
          name: string;
          startDate?: string;
          finishDate?: string;
          path?: string;
        };
        return await handlers.handleCreateIteration(adoClient, project, name, startDate, finishDate, path);
      }

      case 'create_area': {
        const { project, name, path } = args as {
          project: string;
          name: string;
          path?: string;
        };
        return await handlers.handleCreateArea(adoClient, project, name, path);
      }

      default:
        throw new Error(`Unknown tool: ${name}`);
    }
  } catch (error) {
    // Enhanced error handling with context
    return {
      content: [
        {
          type: 'text',
          text: `Error in ${name}: ${error instanceof Error ? error.message : 'Unknown error occurred'}`,
        },
      ],
      isError: true,
    };
  }
});

/**
 * Start the enhanced MCP server
 * Uses stdio transport for secure local communication
 */
async function main() {
  const transport = new StdioServerTransport();
  await server.connect(transport);
  console.error(`Azure DevOps MCP Server version: ${packageVersion}`);
  console.error(`Organization: ${orgName}`);
  console.error(`Available tools: ${ALL_TOOLS.length}`);
  console.error('Enhanced with Microsoft parity - PAT auth, no CLI required');
}

// Handle startup errors gracefully
main().catch((error) => {
  console.error('Server startup error:', error);
  process.exit(1);
});