import { Tool } from '@modelcontextprotocol/sdk/types.js';

/**
 * Repository and Pull Request Management Tools
 * These tools handle pull requests, branches, and repository operations
 */
export const repositoryTools: Tool[] = [
  {
    name: 'list_pull_requests',
    description: 'List pull requests in a repository',
    inputSchema: {
      type: 'object',
      properties: {
        project: {
          type: 'string',
          description: 'Project name',
        },
        repository: {
          type: 'string',
          description: 'Repository name',
        },
        status: {
          type: 'string',
          description: 'PR status (active, completed, abandoned)',
        },
      },
      required: ['project', 'repository'],
    },
  },
  {
    name: 'create_pull_request',
    description: 'Create a new pull request',
    inputSchema: {
      type: 'object',
      properties: {
        project: {
          type: 'string',
          description: 'Project name',
        },
        repository: {
          type: 'string',
          description: 'Repository name',
        },
        sourceBranch: {
          type: 'string',
          description: 'Source branch name',
        },
        targetBranch: {
          type: 'string',
          description: 'Target branch name',
        },
        title: {
          type: 'string',
          description: 'PR title',
        },
        description: {
          type: 'string',
          description: 'PR description',
        },
      },
      required: ['project', 'repository', 'sourceBranch', 'targetBranch', 'title'],
    },
  },
  {
    name: 'update_pull_request_status',
    description: 'Update pull request status (complete, abandon, reactivate)',
    inputSchema: {
      type: 'object',
      properties: {
        project: {
          type: 'string',
          description: 'Project name',
        },
        repository: {
          type: 'string',
          description: 'Repository name',
        },
        pullRequestId: {
          type: 'number',
          description: 'Pull request ID',
        },
        status: {
          type: 'string',
          description: 'New status',
          enum: ['completed', 'abandoned', 'active'],
        },
      },
      required: ['project', 'repository', 'pullRequestId', 'status'],
    },
  },
  {
    name: 'list_branches',
    description: 'List branches in a repository',
    inputSchema: {
      type: 'object',
      properties: {
        project: {
          type: 'string',
          description: 'Project name',
        },
        repository: {
          type: 'string',
          description: 'Repository name',
        },
      },
      required: ['project', 'repository'],
    },
  },
]; 