import { Tool } from '@modelcontextprotocol/sdk/types.js';

/**
 * Search Tools
 * These tools handle code search across repositories
 */
export const searchTools: Tool[] = [
  {
    name: 'search_code',
    description: 'Search for code across repositories',
    inputSchema: {
      type: 'object',
      properties: {
        searchText: {
          type: 'string',
          description: 'Code search query',
        },
        project: {
          type: 'string',
          description: 'Optional project name to scope the search',
        },
      },
      required: ['searchText'],
    },
  },
]; 