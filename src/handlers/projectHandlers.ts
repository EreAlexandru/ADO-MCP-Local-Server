import { AzureDevOpsClient } from '../azureDevOpsClient.js';

/**
 * Project Handlers
 * These functions handle the actual execution of project-related tools
 */

/**
 * List all projects in the Azure DevOps organization
 * @param adoClient - The Azure DevOps client instance
 * @returns MCP-formatted response with project list
 */
export async function handleListProjects(adoClient: AzureDevOpsClient) {
  return await adoClient.listProjects();
}

/**
 * Get detailed information about a specific project
 * @param adoClient - The Azure DevOps client instance
 * @param projectId - The project name or ID
 * @returns MCP-formatted response with project details
 */
export async function handleGetProject(adoClient: AzureDevOpsClient, projectId: string) {
  return await adoClient.getProject(projectId);
} 