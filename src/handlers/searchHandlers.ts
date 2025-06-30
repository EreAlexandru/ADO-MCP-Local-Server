import { AzureDevOpsClient } from '../azureDevOpsClient.js';

/**
 * Search Handlers
 * These functions handle the actual execution of search-related tools
 */

/**
 * Search for code across repositories
 * @param adoClient - The Azure DevOps client instance
 * @param searchText - Code search query
 * @param project - Optional project name to scope the search
 * @returns MCP-formatted response with search results
 */
export async function handleSearchCode(
  adoClient: AzureDevOpsClient,
  searchText: string,
  project?: string
) {
  return await adoClient.searchCode(searchText, project);
} 