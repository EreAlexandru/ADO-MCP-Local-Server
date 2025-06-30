import { Tool } from '@modelcontextprotocol/sdk/types.js';

export const projectTools: Tool[] = [
  {
    name: 'list_projects',
    description: 'List all projects in the Azure DevOps organization',
    inputSchema: {
      type: 'object',
      properties: {},
    },
  },
  {
    name: 'get_project',
    description: 'Get detailed information about a specific project',
    inputSchema: {
      type: 'object',
      properties: {
        projectId: {
          type: 'string',
          description: 'Project name or ID',
        },
      },
      required: ['projectId'],
    },
  },
]; 