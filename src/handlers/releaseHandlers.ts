import { AzureDevOpsClient } from '../azureDevOpsClient.js';

/**
 * Release Management Handlers
 * These functions handle the actual execution of release-related tools
 */

/**
 * List all release definitions in a project
 * @param adoClient - The Azure DevOps client instance
 * @param project - Project name
 * @returns MCP-formatted response with release definitions
 */
export async function handleListReleaseDefinitions(
  adoClient: AzureDevOpsClient,
  project: string
) {
  return await adoClient.listReleaseDefinitions(project);
}

/**
 * List releases for a project
 * @param adoClient - The Azure DevOps client instance
 * @param project - Project name
 * @param definitionId - Optional release definition ID to filter
 * @returns MCP-formatted response with releases
 */
export async function handleListReleases(
  adoClient: AzureDevOpsClient,
  project: string,
  definitionId?: number
) {
  return await adoClient.listReleases(project, definitionId);
}

/**
 * Create a new release
 * @param adoClient - The Azure DevOps client instance
 * @param project - Project name
 * @param definitionId - Release definition ID
 * @param description - Optional release description
 * @returns MCP-formatted response with release details
 */
export async function handleCreateRelease(
  adoClient: AzureDevOpsClient,
  project: string,
  definitionId: number,
  description?: string
) {
  return await adoClient.createRelease(project, definitionId, description);
}

/**
 * Deploy a release to an environment
 * @param adoClient - The Azure DevOps client instance
 * @param project - Project name
 * @param releaseId - Release ID
 * @param environmentId - Environment ID
 * @returns MCP-formatted response with deployment details
 */
export async function handleDeployRelease(
  adoClient: AzureDevOpsClient,
  project: string,
  releaseId: number,
  environmentId: number
) {
  return await adoClient.deployRelease(project, releaseId, environmentId);
} 