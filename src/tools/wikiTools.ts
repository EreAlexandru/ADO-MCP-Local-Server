import { Tool } from '@modelcontextprotocol/sdk/types.js';

/**
 * Wiki Management Tools
 * These tools handle wiki pages - listing, reading, creating, and updating
 */
export const wikiTools: Tool[] = [
  {
    name: 'list_wikis',
    description: 'List all wikis in a project',
    inputSchema: {
      type: 'object',
      properties: {
        project: {
          type: 'string',
          description: 'Project name',
        },
      },
      required: ['project'],
    },
  },
  {
    name: 'get_wiki_page',
    description: 'Get a wiki page content',
    inputSchema: {
      type: 'object',
      properties: {
        project: {
          type: 'string',
          description: 'Project name',
        },
        wikiIdentifier: {
          type: 'string',
          description: 'Wiki name or ID',
        },
        path: {
          type: 'string',
          description: 'Page path (e.g., /Overview/Getting-Started)',
        },
      },
      required: ['project', 'wikiIdentifier', 'path'],
    },
  },
  {
    name: 'create_wiki_page',
    description: 'Create a new wiki page',
    inputSchema: {
      type: 'object',
      properties: {
        project: {
          type: 'string',
          description: 'Project name',
        },
        wikiIdentifier: {
          type: 'string',
          description: 'Wiki name or ID',
        },
        path: {
          type: 'string',
          description: 'Page path',
        },
        content: {
          type: 'string',
          description: 'Page content in Markdown',
        },
      },
      required: ['project', 'wikiIdentifier', 'path', 'content'],
    },
  },
  {
    name: 'update_wiki_page',
    description: 'Update an existing wiki page',
    inputSchema: {
      type: 'object',
      properties: {
        project: {
          type: 'string',
          description: 'Project name',
        },
        wikiIdentifier: {
          type: 'string',
          description: 'Wiki name or ID',
        },
        path: {
          type: 'string',
          description: 'Page path',
        },
        content: {
          type: 'string',
          description: 'New page content in Markdown',
        },
        version: {
          type: 'string',
          description: 'Current version (ETag) for conflict resolution',
        },
      },
      required: ['project', 'wikiIdentifier', 'path', 'content', 'version'],
    },
  },
]; 