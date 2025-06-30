import { AzureDevOpsClient } from '../azureDevOpsClient.js';

/**
 * Repository and Pull Request Handlers
 * These functions handle the actual execution of repository-related tools
 */

/**
 * List pull requests in a repository
 * @param adoClient - The Azure DevOps client instance
 * @param project - Project name
 * @param repository - Repository name
 * @param status - Optional PR status filter
 * @returns MCP-formatted response with pull requests
 */
export async function handleListPullRequests(
  adoClient: AzureDevOpsClient,
  project: string,
  repository: string,
  status?: string
) {
  return await adoClient.listPullRequests(project, repository, status);
}

/**
 * Create a new pull request
 * @param adoClient - The Azure DevOps client instance
 * @param project - Project name
 * @param repository - Repository name
 * @param sourceBranch - Source branch name
 * @param targetBranch - Target branch name
 * @param title - PR title
 * @param description - Optional PR description
 * @returns MCP-formatted response with created PR details
 */
export async function handleCreatePullRequest(
  adoClient: AzureDevOpsClient,
  project: string,
  repository: string,
  sourceBranch: string,
  targetBranch: string,
  title: string,
  description?: string
) {
  return await adoClient.createPullRequest(project, repository, sourceBranch, targetBranch, title, description);
}

/**
 * Update pull request status
 * @param adoClient - The Azure DevOps client instance
 * @param project - Project name
 * @param repository - Repository name
 * @param pullRequestId - Pull request ID
 * @param status - New status (completed, abandoned, active)
 * @returns MCP-formatted response with confirmation
 */
export async function handleUpdatePullRequestStatus(
  adoClient: AzureDevOpsClient,
  project: string,
  repository: string,
  pullRequestId: number,
  status: string
) {
  return await adoClient.updatePullRequestStatus(project, repository, pullRequestId, status);
}

/**
 * List branches in a repository
 * @param adoClient - The Azure DevOps client instance
 * @param project - Project name
 * @param repository - Repository name
 * @returns MCP-formatted response with branch list
 */
export async function handleListBranches(
  adoClient: AzureDevOpsClient,
  project: string,
  repository: string
) {
  return await adoClient.listBranches(project, repository);
}

/**
 * Get detailed information about a specific pull request
 * @param adoClient - The Azure DevOps client instance
 * @param project - Project name
 * @param repository - Repository name
 * @param pullRequestId - Pull request ID
 * @returns MCP-formatted response with PR details
 */
export async function handleGetPullRequest(
  adoClient: AzureDevOpsClient,
  project: string,
  repository: string,
  pullRequestId: number
) {
  return await adoClient.getPullRequest(project, repository, pullRequestId);
}

/**
 * List all repositories in a project
 * @param adoClient - The Azure DevOps client instance
 * @param project - Project name
 * @returns MCP-formatted response with repository list
 */
export async function handleListRepositories(
  adoClient: AzureDevOpsClient,
  project: string
) {
  return await adoClient.listRepositories(project);
}

/**
 * Get a specific repository by name or ID
 * @param adoClient - The Azure DevOps client instance
 * @param project - Project name
 * @param repoIdOrName - Repository name or ID
 * @returns MCP-formatted response with repository details
 */
export async function handleGetRepository(
  adoClient: AzureDevOpsClient,
  project: string,
  repoIdOrName: string
) {
  return await adoClient.getRepository(project, repoIdOrName);
}

/**
 * Get a specific branch by name
 * @param adoClient - The Azure DevOps client instance
 * @param project - Project name
 * @param repository - Repository name
 * @param branchName - Branch name
 * @returns MCP-formatted response with branch details
 */
export async function handleGetBranch(
  adoClient: AzureDevOpsClient,
  project: string,
  repository: string,
  branchName: string
) {
  return await adoClient.getBranch(project, repository, branchName);
}

/**
 * List all pull requests in a project
 * @param adoClient - The Azure DevOps client instance
 * @param project - Project name
 * @returns MCP-formatted response with pull request list
 */
export async function handleListPullRequestsByProject(
  adoClient: AzureDevOpsClient,
  project: string
) {
  return await adoClient.listPullRequestsByProject(project);
}

/**
 * List threads in a pull request
 * @param adoClient - The Azure DevOps client instance
 * @param project - Project name
 * @param repository - Repository name
 * @param pullRequestId - Pull request ID
 * @returns MCP-formatted response with thread list
 */
export async function handleListPullRequestThreads(
  adoClient: AzureDevOpsClient,
  project: string,
  repository: string,
  pullRequestId: number
) {
  return await adoClient.listPullRequestThreads(project, repository, pullRequestId);
}

/**
 * List comments in a pull request thread
 * @param adoClient - The Azure DevOps client instance
 * @param project - Project name
 * @param repository - Repository name
 * @param pullRequestId - Pull request ID
 * @param threadId - Thread ID
 * @returns MCP-formatted response with comment list
 */
export async function handleListPullRequestThreadComments(
  adoClient: AzureDevOpsClient,
  project: string,
  repository: string,
  pullRequestId: number,
  threadId: number
) {
  return await adoClient.listPullRequestThreadComments(project, repository, pullRequestId, threadId);
}

/**
 * Reply to a comment in a pull request thread
 * @param adoClient - The Azure DevOps client instance
 * @param project - Project name
 * @param repository - Repository name
 * @param pullRequestId - Pull request ID
 * @param threadId - Thread ID
 * @param content - Comment content
 * @returns MCP-formatted response with confirmation
 */
export async function handleReplyToPullRequestComment(
  adoClient: AzureDevOpsClient,
  project: string,
  repository: string,
  pullRequestId: number,
  threadId: number,
  content: string
) {
  return await adoClient.replyToPullRequestComment(project, repository, pullRequestId, threadId, content);
}

/**
 * Resolve a comment thread in a pull request
 * @param adoClient - The Azure DevOps client instance
 * @param project - Project name
 * @param repository - Repository name
 * @param pullRequestId - Pull request ID
 * @param threadId - Thread ID
 * @returns MCP-formatted response with confirmation
 */
export async function handleResolvePullRequestThread(
  adoClient: AzureDevOpsClient,
  project: string,
  repository: string,
  pullRequestId: number,
  threadId: number
) {
  return await adoClient.resolvePullRequestThread(project, repository, pullRequestId, threadId);
} 