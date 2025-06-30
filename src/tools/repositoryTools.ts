import { Tool } from '@modelcontextprotocol/sdk/types.js';

/**
 * Repository and Pull Request Management Tools
 * These tools handle pull requests, branches, and repository operations
 */
export const repositoryTools: Tool[] = [
  {
    name: 'repo_list_pull_requests_by_repo',
    description: 'Retrieve a list of pull requests for a given repository.',
    inputSchema: {
      type: 'object',
      properties: {
        project: { type: 'string', description: 'Project name' },
        repository: { type: 'string', description: 'Repository name' },
        status: { type: 'string', description: 'PR status (active, completed, abandoned)' },
      },
      required: ['project', 'repository'],
    },
  },
  {
    name: 'repo_list_pull_requests_by_project',
    description: 'Retrieve a list of pull requests for a given project Id or Name.',
    inputSchema: {
      type: 'object',
      properties: {
        project: { type: 'string', description: 'Project name or ID' },
      },
      required: ['project'],
    },
  },
  {
    name: 'repo_create_pull_request',
    description: 'Create a new pull request.',
    inputSchema: {
      type: 'object',
      properties: {
        project: { type: 'string', description: 'Project name' },
        repository: { type: 'string', description: 'Repository name' },
        sourceBranch: { type: 'string', description: 'Source branch name' },
        targetBranch: { type: 'string', description: 'Target branch name' },
        title: { type: 'string', description: 'PR title' },
        description: { type: 'string', description: 'PR description' },
      },
      required: ['project', 'repository', 'sourceBranch', 'targetBranch', 'title'],
    },
  },
  {
    name: 'repo_update_pull_request_status',
    description: 'Update status of an existing pull request to active, abandoned or completed.',
    inputSchema: {
      type: 'object',
      properties: {
        project: { type: 'string', description: 'Project name' },
        repository: { type: 'string', description: 'Repository name' },
        pullRequestId: { type: 'number', description: 'Pull request ID' },
        status: { type: 'string', description: 'New status', enum: ['completed', 'abandoned', 'active'] },
      },
      required: ['project', 'repository', 'pullRequestId', 'status'],
    },
  },
  {
    name: 'repo_list_branches_by_repo',
    description: 'Retrieve a list of branches for a given repository.',
    inputSchema: {
      type: 'object',
      properties: {
        project: { type: 'string', description: 'Project name' },
        repository: { type: 'string', description: 'Repository name' },
      },
      required: ['project', 'repository'],
    },
  },
  {
    name: 'repo_get_pull_request_by_id',
    description: 'Get a pull request by its ID.',
    inputSchema: {
      type: 'object',
      properties: {
        project: { type: 'string', description: 'Project name' },
        repository: { type: 'string', description: 'Repository name' },
        pullRequestId: { type: 'number', description: 'Pull request ID' },
      },
      required: ['project', 'repository', 'pullRequestId'],
    },
  },
  {
    name: 'repo_list_repos_by_project',
    description: 'Retrieve a list of repositories for a given project.',
    inputSchema: {
      type: 'object',
      properties: {
        project: { type: 'string', description: 'Project name' },
      },
      required: ['project'],
    },
  },
  {
    name: 'repo_get_repo_by_name_or_id',
    description: 'Get the repository by project and repository name or ID.',
    inputSchema: {
      type: 'object',
      properties: {
        project: { type: 'string', description: 'Project name' },
        repoIdOrName: { type: 'string', description: 'Repository name or ID' },
      },
      required: ['project', 'repoIdOrName'],
    },
  },
  {
    name: 'repo_get_branch_by_name',
    description: 'Get a branch by its name.',
    inputSchema: {
      type: 'object',
      properties: {
        project: { type: 'string', description: 'Project name' },
        repository: { type: 'string', description: 'Repository name' },
        branchName: { type: 'string', description: 'Branch name to find' },
      },
      required: ['project', 'repository', 'branchName'],
    },
  },
  {
    name: 'repo_list_pull_request_threads',
    description: 'Retrieve a list of comment threads for a pull request.',
    inputSchema: {
      type: 'object',
      properties: {
        project: { type: 'string', description: 'Project name' },
        repository: { type: 'string', description: 'Repository name' },
        pullRequestId: { type: 'number', description: 'Pull request ID' },
      },
      required: ['project', 'repository', 'pullRequestId'],
    },
  },
  {
    name: 'repo_list_pull_request_thread_comments',
    description: 'Retrieve a list of comments in a pull request thread.',
    inputSchema: {
      type: 'object',
      properties: {
        project: { type: 'string', description: 'Project name' },
        repository: { type: 'string', description: 'Repository name' },
        pullRequestId: { type: 'number', description: 'Pull request ID' },
        threadId: { type: 'number', description: 'The ID of the comment thread' },
      },
      required: ['project', 'repository', 'pullRequestId', 'threadId'],
    },
  },
  {
    name: 'repo_reply_to_comment',
    description: 'Replies to a specific comment on a pull request.',
    inputSchema: {
      type: 'object',
      properties: {
        project: { type: 'string', description: 'Project name' },
        repository: { type: 'string', description: 'Repository name' },
        pullRequestId: { type: 'number', description: 'Pull request ID' },
        threadId: { type: 'number', description: 'The ID of the comment thread to reply to' },
        content: { type: 'string', description: 'The content of the reply' },
      },
      required: ['project', 'repository', 'pullRequestId', 'threadId', 'content'],
    },
  },
  {
    name: 'repo_resolve_comment',
    description: 'Resolves a specific comment thread on a pull request.',
    inputSchema: {
      type: 'object',
      properties: {
        project: { type: 'string', description: 'Project name' },
        repository: { type: 'string', description: 'Repository name' },
        pullRequestId: { type: 'number', description: 'Pull request ID' },
        threadId: { type: 'number', description: 'The ID of the comment thread to resolve' },
      },
      required: ['project', 'repository', 'pullRequestId', 'threadId'],
    },
  },
]; 