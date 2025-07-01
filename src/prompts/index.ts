/**
 * Prompt Templates for Azure DevOps MCP Server
 * These provide guided workflows for common Azure DevOps tasks
 */

import { Server } from '@modelcontextprotocol/sdk/server/index.js';
import { 
  ListPromptsRequestSchema, 
  GetPromptRequestSchema 
} from '@modelcontextprotocol/sdk/types.js';
import { z } from 'zod';

// Define our prompt templates
export const PROMPT_TEMPLATES = {
  daily_standup: {
    name: "daily_standup",
    description: "Prepare for daily standup meeting",
    arguments: [
      {
        name: "project",
        description: "Project name",
        required: true
      }
    ]
  },
  sprint_planning: {
    name: "sprint_planning",
    description: "Help with sprint planning tasks",
    arguments: [
      {
        name: "project",
        description: "Project name",
        required: true
      },
      {
        name: "iterationPath",
        description: "Iteration path (e.g., 'MyProject\\Sprint 23')",
        required: true
      }
    ]
  },
  code_review: {
    name: "code_review",
    description: "Find pull requests that need review",
    arguments: [
      {
        name: "project",
        description: "Project name",
        required: true
      }
    ]
  },
  my_work: {
    name: "my_work",
    description: "Get all my active work items",
    arguments: [
      {
        name: "project",
        description: "Project name",
        required: true
      }
    ]
  },
  release_status: {
    name: "release_status",
    description: "Check release pipeline status",
    arguments: [
      {
        name: "project",
        description: "Project name",
        required: true
      }
    ]
  },
  bug_triage: {
    name: "bug_triage",
    description: "Review and triage bugs",
    arguments: [
      {
        name: "project",
        description: "Project name",
        required: true
      },
      {
        name: "areaPath",
        description: "Area path to filter bugs (optional)",
        required: false
      }
    ]
  },
  sprint_retrospective: {
    name: "sprint_retrospective",
    description: "Gather data for sprint retrospective",
    arguments: [
      {
        name: "project",
        description: "Project name",
        required: true
      },
      {
        name: "iterationPath",
        description: "Completed sprint iteration path",
        required: true
      }
    ]
  },
  build_health: {
    name: "build_health",
    description: "Check build pipeline health and recent failures",
    arguments: [
      {
        name: "project",
        description: "Project name",
        required: true
      }
    ]
  },
  work_item_dependencies: {
    name: "work_item_dependencies",
    description: "Analyze work item dependencies and blockers",
    arguments: [
      {
        name: "project",
        description: "Project name",
        required: true
      },
      {
        name: "workItemId",
        description: "Parent work item ID to analyze",
        required: true
      }
    ]
  },
  team_velocity: {
    name: "team_velocity",
    description: "Calculate team velocity and capacity",
    arguments: [
      {
        name: "project",
        description: "Project name",
        required: true
      },
      {
        name: "teamName",
        description: "Team name",
        required: true
      },
      {
        name: "sprintCount",
        description: "Number of recent sprints to analyze (default: 3)",
        required: false
      }
    ]
  }
};

// Generate prompt content based on template
function generatePromptContent(promptName: string, args: Record<string, any>): string {
  switch (promptName) {
    case 'daily_standup':
      return `Help me prepare for daily standup in project "${args.project}".
1. First, use wit_my_work_items to get my active work items
2. Show what I worked on yesterday (recently updated items)
3. Show what I'm working on today (active items)
4. Identify any blockers (items in blocked state or with blocking comments)
5. List any PRs I have open using repo_list_pull_requests_by_project`;

    case 'sprint_planning':
      return `Help me with sprint planning for iteration "${args.iterationPath}" in project "${args.project}".
1. Use wit_get_work_items_for_iteration to get current items in the sprint
2. Show unassigned items that need attention
3. List items by priority and state
4. Identify any items that might be at risk (no recent updates, blocked state)
5. Show the sprint capacity if available`;

    case 'code_review':
      return `Find all pull requests that need my review in project "${args.project}".
1. Use repo_list_pull_requests_by_project with status "active"
2. Highlight any PRs that are older than 3 days
3. Show PRs where I'm explicitly listed as a reviewer
4. List any PRs with unresolved comments using repo_list_pull_request_threads
5. Sort by age (oldest first)`;

    case 'my_work':
      return `Show all my active work items in project "${args.project}".
1. Use wit_my_work_items to get items assigned to me
2. Group them by state (Active, New, Resolved)
3. Show priority for each item
4. Include any recent comments using wit_list_work_item_comments
5. Highlight items updated in the last 24 hours`;

    case 'release_status':
      return `Check the release pipeline status for project "${args.project}".
1. Use list_release_definitions to get all release pipelines
2. Use list_releases to get recent releases
3. Show the status of the last 5 releases
4. Highlight any failed releases
5. Show which environments each release has been deployed to`;

    case 'bug_triage':
      const areaFilter = args.areaPath ? ` AND [System.AreaPath] UNDER '${args.areaPath}'` : '';
      return `Help me triage bugs in project "${args.project}".
1. Use wit_run_query with: SELECT [System.Id], [System.Title], [System.Priority], [System.Severity], [System.State], [System.CreatedDate] FROM WorkItems WHERE [System.WorkItemType] = 'Bug' AND [System.State] = 'New'${areaFilter} ORDER BY [System.Priority], [System.CreatedDate]
2. Group bugs by priority and severity
3. Show bugs older than 7 days that haven't been triaged
4. List bugs without assigned priority or severity
5. Highlight any bugs with recent customer impact comments`;

    case 'sprint_retrospective':
      return `Gather data for sprint retrospective for "${args.iterationPath}" in project "${args.project}".
1. Use wit_get_work_items_for_iteration to get all items from the sprint
2. Calculate completion rate (completed vs planned)
3. List items that were added mid-sprint
4. Show items that were moved to next sprint
5. Use list_builds and get_build_status to show build success rate during sprint
6. List any production incidents or bugs created during the sprint`;

    case 'build_health':
      return `Check build pipeline health for project "${args.project}".
1. Use list_build_definitions to get all build pipelines
2. Use list_builds with statusFilter for failed builds in last 7 days
3. Calculate success rate for each pipeline
4. Show pipelines with success rate below 80%
5. For failed builds, use get_build_logs to identify common failure patterns
6. List the top 3 most frequently failing pipelines`;

    case 'work_item_dependencies':
      return `Analyze dependencies for work item ${args.workItemId} in project "${args.project}".
1. Use wit_get_work_item to get the parent item details
2. Find all linked items (child, related, predecessor/successor)
3. Check the state of each dependency
4. Identify blocking dependencies (items not in Done state)
5. Show the dependency chain visually if possible
6. Highlight any circular dependencies`;

    case 'team_velocity':
      const sprintCount = args.sprintCount || 3;
      return `Calculate velocity for team "${args.teamName}" in project "${args.project}".
1. Use work_list_iterations to get the last ${sprintCount} completed sprints
2. For each sprint, use wit_get_work_items_for_iteration to get completed items
3. Sum story points or effort for completed items per sprint
4. Calculate average velocity across sprints
5. Show velocity trend (increasing/decreasing/stable)
6. Compare planned vs actual capacity for each sprint`;

    default:
      return `Unknown prompt template: ${promptName}`;
  }
}

/**
 * Configure prompts for the MCP server
 * @param server - The MCP server instance
 */
export function configurePrompts(server: Server) {
  // Handle list prompts request
  server.setRequestHandler(ListPromptsRequestSchema, async () => {
    return {
      prompts: Object.values(PROMPT_TEMPLATES).map(template => ({
        name: template.name,
        description: template.description,
        arguments: template.arguments
      }))
    };
  });

  // Handle get prompt request
  server.setRequestHandler(GetPromptRequestSchema, async (request) => {
    const { name, arguments: args = {} } = request.params;
    
    const template = Object.values(PROMPT_TEMPLATES).find(t => t.name === name);
    if (!template) {
      throw new Error(`Prompt '${name}' not found`);
    }

    // Validate required arguments
    for (const arg of template.arguments) {
      if (arg.required && !args[arg.name]) {
        throw new Error(`Missing required argument: ${arg.name}`);
      }
    }

    const content = generatePromptContent(name, args);

    return {
      description: template.description,
      messages: [
        {
          role: "user",
          content: {
            type: "text",
            text: content
          }
        }
      ]
    };
  });
} 