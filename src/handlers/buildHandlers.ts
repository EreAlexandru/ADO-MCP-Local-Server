import { AzureDevOpsClient } from '../azureDevOpsClient.js';

/**
 * Build Pipeline Handlers
 * These functions handle the actual execution of build-related tools
 */

/**
 * Trigger a new build
 * @param adoClient - The Azure DevOps client instance
 * @param project - Project name
 * @param definitionId - Build definition ID
 * @param sourceBranch - Optional branch to build from
 * @returns MCP-formatted response with build details
 */
export async function handleRunBuild(
  adoClient: AzureDevOpsClient,
  project: string,
  definitionId: number,
  sourceBranch?: string
) {
  return await adoClient.runBuild(project, definitionId, sourceBranch);
}

/**
 * Get the status of a specific build
 * @param adoClient - The Azure DevOps client instance
 * @param project - Project name
 * @param buildId - Build ID
 * @returns MCP-formatted response with build status
 */
export async function handleGetBuildStatus(
  adoClient: AzureDevOpsClient,
  project: string,
  buildId: number
) {
  return await adoClient.getBuildStatus(project, buildId);
}

/**
 * List build definitions in a project
 * @param adoClient - The Azure DevOps client instance
 * @param project - Project name
 * @returns MCP-formatted response with build definitions
 */
export async function handleListBuildDefinitions(
  adoClient: AzureDevOpsClient,
  project: string
) {
  return await adoClient.listBuildDefinitions(project);
}

/**
 * List builds with optional filters
 * @param adoClient - The Azure DevOps client instance
 * @param project - Project name
 * @param definitionId - Optional build definition ID
 * @param branchName - Optional branch name
 * @param statusFilter - Optional status filter
 * @param top - Maximum number of builds to return
 * @returns MCP-formatted response with builds
 */
export async function handleListBuilds(
  adoClient: AzureDevOpsClient,
  project: string,
  definitionId?: number,
  branchName?: string,
  statusFilter?: string,
  top?: number
) {
  return await adoClient.listBuilds(project, definitionId, branchName, statusFilter, top);
}

/**
 * Get build logs
 * @param adoClient - The Azure DevOps client instance
 * @param project - Project name
 * @param buildId - Build ID
 * @returns MCP-formatted response with build logs
 */
export async function handleGetBuildLogs(
  adoClient: AzureDevOpsClient,
  project: string,
  buildId: number
) {
  return await adoClient.getBuildLogs(project, buildId);
}

/**
 * Get specific build log content
 * @param adoClient - The Azure DevOps client instance
 * @param project - Project name
 * @param buildId - Build ID
 * @param logId - Log ID
 * @param startLine - Optional start line
 * @param endLine - Optional end line
 * @returns MCP-formatted response with log content
 */
export async function handleGetBuildLogContent(
  adoClient: AzureDevOpsClient,
  project: string,
  buildId: number,
  logId: number,
  startLine?: number,
  endLine?: number
) {
  return await adoClient.getBuildLogContent(project, buildId, logId, startLine, endLine);
}

/**
 * Get build changes
 * @param adoClient - The Azure DevOps client instance
 * @param project - Project name
 * @param buildId - Build ID
 * @param top - Maximum number of changes to return
 * @returns MCP-formatted response with build changes
 */
export async function handleGetBuildChanges(
  adoClient: AzureDevOpsClient,
  project: string,
  buildId: number,
  top?: number
) {
  return await adoClient.getBuildChanges(project, buildId, top);
} 