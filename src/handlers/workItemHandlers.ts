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
 * @param title - Work item title
 * @param description - Optional description
 * @param assignedTo - Optional assignee
 * @returns MCP-formatted response with created work item details
 */
export async function handleCreateWorkItem(
  adoClient: AzureDevOpsClient,
  project: string,
  type: string,
  title: string,
  description?: string,
  assignedTo?: string
) {
  return await adoClient.createWorkItem(project, type, title, description, assignedTo);
}

/**
 * Get details of a specific work item
 * @param adoClient - The Azure DevOps client instance
 * @param id - Work item ID
 * @returns MCP-formatted response with work item details
 */
export async function handleGetWorkItem(adoClient: AzureDevOpsClient, id: number) {
  return await adoClient.getWorkItem(id);
}

/**
 * Update an existing work item
 * @param adoClient - The Azure DevOps client instance
 * @param id - Work item ID
 * @param updates - Object containing fields to update
 * @returns MCP-formatted response with update confirmation
 */
export async function handleUpdateWorkItem(
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
export async function handleRunQuery(adoClient: AzureDevOpsClient, query: string) {
  return await adoClient.runQuery(query);
}

/**
 * Search work items using Azure DevOps search
 * @param adoClient - The Azure DevOps client instance
 * @param searchText - Search text
 * @param project - Optional project name to scope the search
 * @returns MCP-formatted response with search results
 */
export async function handleSearchWorkItems(adoClient: AzureDevOpsClient, searchText: string, project?: string) {
  return await adoClient.searchWorkItems(searchText, project);
}

/**
 * Add a comment to a work item
 * @param adoClient - The Azure DevOps client instance
 * @param id - Work item ID
 * @param comment - Comment text
 * @returns MCP-formatted response with confirmation
 */
export async function handleAddWorkItemComment(adoClient: AzureDevOpsClient, id: number, comment: string) {
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
export async function handleLinkWorkItems(
  adoClient: AzureDevOpsClient,
  sourceId: number,
  targetId: number,
  linkType: string
) {
  return await adoClient.linkWorkItems(sourceId, targetId, linkType);
} 