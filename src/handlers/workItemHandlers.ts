import { AzureDevOpsClient } from '../azureDevOpsClient.js';

/**
 * Work Item Handlers
 * These functions handle the actual execution of work item-related tools
 */

/**
 * List work items in a project
 * @param adoClient - The Azure DevOps client instance
 * @param project - Project name
 * @param query - Optional WIQL query
 * @returns MCP-formatted response with work items
 */
export async function handleListWorkItems(adoClient: AzureDevOpsClient, project: string, query?: string) {
  return await adoClient.listWorkItems(project, query);
}

/**
 * Create a new work item
 * @param adoClient - The Azure DevOps client instance
 * @param project - Project name
 * @param type - Work item type (e.g., Task, Bug, User Story)
 * @param fields - Object containing work item fields
 * @returns MCP-formatted response with created work item details
 */
export async function handleWitCreateWorkItem(
  adoClient: AzureDevOpsClient,
  project: string,
  type: string,
  fields: { [key: string]: any }
) {
  return await adoClient.createWorkItem(project, type, fields);
}

/**
 * Get details of a specific work item
 * @param adoClient - The Azure DevOps client instance
 * @param id - Work item ID
 * @returns MCP-formatted response with work item details
 */
export async function handleWitGetWorkItem(adoClient: AzureDevOpsClient, id: number) {
  return await adoClient.getWorkItem(id);
}

/**
 * Update an existing work item
 * @param adoClient - The Azure DevOps client instance
 * @param id - Work item ID
 * @param updates - Object containing fields to update
 * @returns MCP-formatted response with update confirmation
 */
export async function handleWitUpdateWorkItem(
  adoClient: AzureDevOpsClient,
  id: number,
  updates: {
    title?: string;
    description?: string;
    state?: string;
    assignedTo?: string;
  }
) {
  return await adoClient.updateWorkItem(id, updates);
}

/**
 * Run a custom WIQL query
 * @param adoClient - The Azure DevOps client instance
 * @param query - WIQL query string
 * @returns MCP-formatted response with query results
 */
export async function handleWitRunQuery(adoClient: AzureDevOpsClient, query: string) {
  return await adoClient.runQuery(query);
}

/**
 * Search work items using Azure DevOps search
 * @param adoClient - The Azure DevOps client instance
 * @param searchText - Search text
 * @param project - Optional project name to scope the search
 * @returns MCP-formatted response with search results
 */
export async function handleWitSearchWorkItems(adoClient: AzureDevOpsClient, searchText: string, project?: string) {
  return await adoClient.searchWorkItems(searchText, project);
}

/**
 * Add a comment to a work item
 * @param adoClient - The Azure DevOps client instance
 * @param id - Work item ID
 * @param comment - Comment text
 * @returns MCP-formatted response with confirmation
 */
export async function handleWitAddWorkItemComment(adoClient: AzureDevOpsClient, id: number, comment: string) {
  return await adoClient.addWorkItemComment(id, comment);
}

/**
 * Link two work items together
 * @param adoClient - The Azure DevOps client instance
 * @param sourceId - Source work item ID
 * @param targetId - Target work item ID
 * @param linkType - Link type (Related, Parent, Child, etc.)
 * @returns MCP-formatted response with confirmation
 */
export async function handleWitLinkWorkItems(
  adoClient: AzureDevOpsClient,
  sourceId: number,
  targetId: number,
  linkType: string
) {
  return await adoClient.linkWorkItems(sourceId, targetId, linkType);
}

export async function handleWitMyWorkItems(adoClient: AzureDevOpsClient, project: string) {
  return await adoClient.getMyWorkItems(project);
}

export async function handleWitListWorkItemComments(adoClient: AzureDevOpsClient, id: number) {
  return await adoClient.listWorkItemComments(id);
}

export async function handleWitGetWorkItemsForIteration(adoClient: AzureDevOpsClient, project: string, iterationPath: string) {
  return await adoClient.getWorkItemsForIteration(project, iterationPath);
} 