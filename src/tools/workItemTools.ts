import { Tool } from '@modelcontextprotocol/sdk/types.js';

/**
 * Work Item Management Tools
 * These tools handle creating, updating, and querying work items
 */
export const workItemTools: Tool[] = [
  {
    name: 'wit_my_work_items',
    description: 'Retrieve a list of work items relevant to the authenticated user.',
    inputSchema: {
      type: 'object',
      properties: {
        project: { type: 'string', description: 'Project name' },
      },
      required: ['project'],
    },
  },
  {
    name: 'wit_get_work_item',
    description: 'Get a single work item by ID.',
    inputSchema: {
      type: 'object',
      properties: {
        id: { type: 'number', description: 'Work item ID' },
      },
      required: ['id'],
    },
  },
  {
    name: 'wit_update_work_item',
    description: 'Update a work item by ID with specified fields.',
    inputSchema: {
      type: 'object',
      properties: {
        id: { type: 'number', description: 'Work item ID' },
        title: { type: 'string', description: 'New title' },
        description: { type: 'string', description: 'New description' },
        state: { type: 'string', description: 'New state' },
        assignedTo: { type: 'string', description: 'New assignee' },
      },
      required: ['id'],
    },
  },
  {
    name: 'wit_create_work_item',
    description: 'Create a new work item in a specified project and work item type.',
    inputSchema: {
      type: 'object',
      properties: {
        project: { type: 'string', description: 'Project name' },
        type: { type: 'string', description: 'Work item type (e.g., Task, Bug)' },
        fields: {
          type: 'object',
          description: 'Fields for the work item. Keys are field reference names. "System.Title" is required.',
          properties: { 'System.Title': { type: 'string' } },
          required: ['System.Title'],
          additionalProperties: true
        }
      },
      required: ['project', 'type', 'fields'],
    },
  },
  {
    name: 'wit_list_work_item_comments',
    description: 'Retrieve list of comments for a work item by ID.',
    inputSchema: {
      type: 'object',
      properties: {
        id: { type: 'number', description: 'Work item ID' },
      },
      required: ['id'],
    },
  },
  {
    name: 'wit_get_work_items_for_iteration',
    description: 'Retrieve a list of work items for a specified iteration.',
    inputSchema: {
      type: 'object',
      properties: {
        project: { type: 'string', description: 'Project name' },
        iterationPath: { type: 'string', description: 'The iteration path (e.g., MyProject\\Sprint 1)' },
      },
      required: ['project', 'iterationPath'],
    },
  },
  {
    name: 'wit_add_work_item_comment',
    description: 'Add comment to a work item by ID.',
    inputSchema: {
      type: 'object',
      properties: {
        id: { type: 'number', description: 'Work item ID' },
        comment: { type: 'string', description: 'Comment text' },
      },
      required: ['id', 'comment'],
    },
  },
  {
    name: 'wit_work_items_link',
    description: 'Link work items together.',
    inputSchema: {
      type: 'object',
      properties: {
        sourceId: { type: 'number', description: 'Source work item ID' },
        targetId: { type: 'number', description: 'Target work item ID' },
        linkType: { type: 'string', description: 'Link type (e.g., Related, Parent, Child)' },
      },
      required: ['sourceId', 'targetId', 'linkType'],
    },
  },
  {
    name: 'wit_run_query',
    description: 'Run a custom WIQL query.',
    inputSchema: {
      type: 'object',
      properties: {
        query: { type: 'string', description: 'WIQL query string' },
      },
      required: ['query'],
    },
  },
  {
    name: 'wit_search_work_items',
    description: 'Search work items using Azure DevOps search.',
    inputSchema: {
      type: 'object',
      properties: {
        searchText: { type: 'string', description: 'Search text' },
        project: { type: 'string', description: 'Optional project name to scope the search' },
      },
      required: ['searchText'],
    },
  },
  {
    name: 'list_work_items',
    description: 'List recent work items in a project or run a WIQL query.',
    inputSchema: {
      type: 'object',
      properties: {
        project: { type: 'string', description: 'Project name' },
        query: { type: 'string', description: 'Optional WIQL query' },
      },
      required: ['project'],
    },
  },
]; 