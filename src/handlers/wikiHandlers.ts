import { AzureDevOpsClient } from '../azureDevOpsClient.js';

/**
 * Wiki Management Handlers
 * These functions handle the actual execution of wiki-related tools
 */

/**
 * List all wikis in a project
 * @param adoClient - The Azure DevOps client instance
 * @param project - Project name
 * @returns MCP-formatted response with wiki list
 */
export async function handleListWikis(
  adoClient: AzureDevOpsClient,
  project: string
) {
  return await adoClient.listWikis(project);
}

/**
 * Get a wiki page content
 * @param adoClient - The Azure DevOps client instance
 * @param project - Project name
 * @param wikiIdentifier - Wiki name or ID
 * @param path - Page path (e.g., /Overview/Getting-Started)
 * @returns MCP-formatted response with page content
 */
export async function handleGetWikiPage(
  adoClient: AzureDevOpsClient,
  project: string,
  wikiIdentifier: string,
  path: string
) {
  return await adoClient.getWikiPage(project, wikiIdentifier, path);
}

/**
 * Create a new wiki page
 * @param adoClient - The Azure DevOps client instance
 * @param project - Project name
 * @param wikiIdentifier - Wiki name or ID
 * @param path - Page path
 * @param content - Page content in Markdown
 * @returns MCP-formatted response with creation confirmation
 */
export async function handleCreateWikiPage(
  adoClient: AzureDevOpsClient,
  project: string,
  wikiIdentifier: string,
  path: string,
  content: string
) {
  return await adoClient.createWikiPage(project, wikiIdentifier, path, content);
}

/**
 * Update an existing wiki page
 * @param adoClient - The Azure DevOps client instance
 * @param project - Project name
 * @param wikiIdentifier - Wiki name or ID
 * @param path - Page path
 * @param content - New page content in Markdown
 * @param version - Current version (ETag) for conflict resolution
 * @returns MCP-formatted response with update confirmation
 */
export async function handleUpdateWikiPage(
  adoClient: AzureDevOpsClient,
  project: string,
  wikiIdentifier: string,
  path: string,
  content: string,
  version: string
) {
  return await adoClient.updateWikiPage(project, wikiIdentifier, path, content, version);
} 