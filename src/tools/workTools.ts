import { Tool } from '@modelcontextprotocol/sdk/types.js';

/**
 * Work Management Tools (Teams, Iterations, Areas)
 * Enhanced with Microsoft parity features
 */

export const workTools: Tool[] = [
  {
    name: 'work_list_iterations',
    description: 'List all iterations in a project',
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
    name: 'work_list_areas',
    description: 'List all areas in a project',
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
    name: 'work_create_iteration',
    description: 'Create a new iteration',
    inputSchema: {
      type: 'object',
      properties: {
        project: {
          type: 'string',
          description: 'Project name',
        },
        name: {
          type: 'string',
          description: 'Iteration name',
        },
        startDate: {
          type: 'string',
          description: 'Start date (YYYY-MM-DD)',
        },
        finishDate: {
          type: 'string',
          description: 'Finish date (YYYY-MM-DD)',
        },
        path: {
          type: 'string',
          description: 'Parent path (optional)',
        },
      },
      required: ['project', 'name'],
    },
  },
  {
    name: 'work_create_area',
    description: 'Create a new area',
    inputSchema: {
      type: 'object',
      properties: {
        project: {
          type: 'string',
          description: 'Project name',
        },
        name: {
          type: 'string',
          description: 'Area name',
        },
        path: {
          type: 'string',
          description: 'Parent path (optional)',
        },
      },
      required: ['project', 'name'],
    },
  },
]; 