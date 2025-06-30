import { AzureDevOpsClient } from '../azureDevOpsClient.js';

/**
 * Organization Structure Handlers
 * These functions handle the actual execution of iterations and areas tools
 */

/**
 * List all iterations in a project
 * @param adoClient - The Azure DevOps client instance
 * @param project - Project name
 * @returns MCP-formatted response with iterations
 */
export async function handleListIterations(
  adoClient: AzureDevOpsClient,
  project: string
) {
  return await adoClient.listIterations(project);
}

/**
 * List all areas in a project
 * @param adoClient - The Azure DevOps client instance
 * @param project - Project name
 * @returns MCP-formatted response with areas
 */
export async function handleListAreas(
  adoClient: AzureDevOpsClient,
  project: string
) {
  return await adoClient.listAreas(project);
}

/**
 * Create a new iteration
 * @param adoClient - The Azure DevOps client instance
 * @param project - Project name
 * @param name - Iteration name
 * @param startDate - Optional start date (YYYY-MM-DD)
 * @param finishDate - Optional finish date (YYYY-MM-DD)
 * @param path - Optional parent path
 * @returns MCP-formatted response with iteration details
 */
export async function handleCreateIteration(
  adoClient: AzureDevOpsClient,
  project: string,
  name: string,
  startDate?: string,
  finishDate?: string,
  path?: string
) {
  return await adoClient.createIteration(project, name, startDate, finishDate, path);
}

/**
 * Create a new area
 * @param adoClient - The Azure DevOps client instance
 * @param project - Project name
 * @param name - Area name
 * @param path - Optional parent path
 * @returns MCP-formatted response with area details
 */
export async function handleCreateArea(
  adoClient: AzureDevOpsClient,
  project: string,
  name: string,
  path?: string
) {
  return await adoClient.createArea(project, name, path);
} 