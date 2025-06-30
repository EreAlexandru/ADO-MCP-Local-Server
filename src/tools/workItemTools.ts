import { Tool } from '@modelcontextprotocol/sdk/types.js';

/**
 * Work Item Management Tools
 * These tools handle creation, updating, searching, and linking of work items in Azure DevOps
 */
export const workItemTools: Tool[] = [
  {
    name: 'list_work_items',
    description: 'List work items in a project',
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
    name: 'create_work_item',
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
        title: {
          type: 'string',
          description: 'Work item title',
        },
        description: {
          type: 'string',
          description: 'Work item description',
        },
        assignedTo: {
          type: 'string',
          description: 'Assigned to (email or display name)',
        },
      },
      required: ['project', 'type', 'title'],
    },
  },
  {
    name: 'get_work_item',
    description: 'Get details of a specific work item',
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
    name: 'update_work_item',
    description: 'Update an existing work item',
    inputSchema: {
      type: 'object',
      properties: {
        id: {
          type: 'number',
          description: 'Work item ID',
        },
        title: {
          type: 'string',
          description: 'New title (optional)',
        },
        description: {
          type: 'string',
          description: 'New description (optional)',
        },
        state: {
          type: 'string',
          description: 'New state (optional)',
        },
        assignedTo: {
          type: 'string',
          description: 'New assignee (optional)',
        },
      },
      required: ['id'],
    },
  },
  {
    name: 'run_query',
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
    name: 'search_work_items',
    description: 'Search work items using Azure DevOps search',
    inputSchema: {
      type: 'object',
      properties: {
        searchText: {
          type: 'string',
          description: 'Search text',
        },
        project: {
          type: 'string',
          description: 'Optional project name to scope the search',
        },
      },
      required: ['searchText'],
    },
  },
  {
    name: 'add_work_item_comment',
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
    name: 'link_work_items',
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
          enum: ['Related', 'Parent', 'Child', 'Predecessor', 'Successor'],
        },
      },
      required: ['sourceId', 'targetId', 'linkType'],
    },
  },
]; 