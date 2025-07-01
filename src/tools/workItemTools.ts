import { Tool } from '@modelcontextprotocol/sdk/types.js';

/**
 * Work Item Management Tools
 * Enhanced with Microsoft parity features - PAT auth, no CLI required
 */

export const workItemTools: Tool[] = [
  {
    name: 'list_work_items',
    description: 'List work items in a project with optional WIQL query',
    inputSchema: {
      type: 'object',
      properties: {
        project: {
          type: 'string',
          description: 'Project name',
        },
        query: {
          type: 'string',
          description: 'Optional WIQL query',
        },
      },
      required: ['project'],
    },
  },
  {
    name: 'wit_my_work_items',
    description: 'Retrieve work items assigned to me',
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
    name: 'wit_get_work_item',
    description: 'Get a single work item by ID',
    inputSchema: {
      type: 'object',
      properties: {
        id: {
          type: 'number',
          description: 'Work item ID',
        },
      },
      required: ['id'],
    },
  },
  {
    name: 'wit_update_work_item',
    description: 'Update a work item with new field values',
    inputSchema: {
      type: 'object',
      properties: {
        id: {
          type: 'number',
          description: 'Work item ID',
        },
        title: {
          type: 'string',
          description: 'New title',
        },
        description: {
          type: 'string',
          description: 'New description',
        },
        state: {
          type: 'string',
          description: 'New state',
        },
        assignedTo: {
          type: 'string',
          description: 'New assignee',
        },
      },
      required: ['id'],
    },
  },
  {
    name: 'wit_create_work_item',
    description: 'Create a new work item',
    inputSchema: {
      type: 'object',
      properties: {
        project: {
          type: 'string',
          description: 'Project name',
        },
        type: {
          type: 'string',
          description: 'Work item type (e.g., Task, Bug, User Story)',
        },
        fields: {
          type: 'object',
          description: 'Work item fields as key-value pairs',
        },
      },
      required: ['project', 'type', 'fields'],
    },
  },
  {
    name: 'wit_list_work_item_comments',
    description: 'List comments for a work item',
    inputSchema: {
      type: 'object',
      properties: {
        id: {
          type: 'number',
          description: 'Work item ID',
        },
      },
      required: ['id'],
    },
  },
  {
    name: 'wit_get_work_items_for_iteration',
    description: 'Get work items for a specific iteration',
    inputSchema: {
      type: 'object',
      properties: {
        project: {
          type: 'string',
          description: 'Project name',
        },
        iterationPath: {
          type: 'string',
          description: 'Iteration path',
        },
      },
      required: ['project', 'iterationPath'],
    },
  },
  {
    name: 'wit_add_work_item_comment',
    description: 'Add a comment to a work item',
    inputSchema: {
      type: 'object',
      properties: {
        id: {
          type: 'number',
          description: 'Work item ID',
        },
        comment: {
          type: 'string',
          description: 'Comment text',
        },
      },
      required: ['id', 'comment'],
    },
  },
  {
    name: 'wit_work_items_link',
    description: 'Link two work items together',
    inputSchema: {
      type: 'object',
      properties: {
        sourceId: {
          type: 'number',
          description: 'Source work item ID',
        },
        targetId: {
          type: 'number',
          description: 'Target work item ID',
        },
        linkType: {
          type: 'string',
          description: 'Link type (e.g., Related, Parent, Child)',
        },
      },
      required: ['sourceId', 'targetId', 'linkType'],
    },
  },
  {
    name: 'wit_run_query',
    description: 'Run a custom WIQL query',
    inputSchema: {
      type: 'object',
      properties: {
        query: {
          type: 'string',
          description: 'WIQL query string',
        },
      },
      required: ['query'],
    },
  },
  {
    name: 'wit_search_work_items',
    description: 'Search work items using text search',
    inputSchema: {
      type: 'object',
      properties: {
        searchText: {
          type: 'string',
          description: 'Search text',
        },
        project: {
          type: 'string',
          description: 'Optional project to scope search',
        },
      },
      required: ['searchText'],
    },
  },
]; 