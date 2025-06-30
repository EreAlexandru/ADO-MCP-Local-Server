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