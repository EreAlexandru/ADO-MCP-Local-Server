import { Tool } from '@modelcontextprotocol/sdk/types.js';

/**
 * Organization Structure Tools
 * These tools handle iterations (sprints) and areas (team organization)
 */
export const organizationTools: Tool[] = [
  {
    name: 'list_iterations',
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
    name: 'list_areas',
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
    name: 'create_iteration',
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
        path: {
          type: 'string',
          description: 'Parent path (optional)',
        },
        startDate: {
          type: 'string',
          description: 'Start date (YYYY-MM-DD)',
        },
        finishDate: {
          type: 'string',
          description: 'Finish date (YYYY-MM-DD)',
        },
      },
      required: ['project', 'name'],
    },
  },
  {
    name: 'create_area',
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