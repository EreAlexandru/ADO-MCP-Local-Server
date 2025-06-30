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