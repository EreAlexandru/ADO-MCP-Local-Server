import { Tool } from '@modelcontextprotocol/sdk/types.js';

/**
 * Build Pipeline Management Tools
 * These tools handle build triggers, status checks, and build definitions
 */
export const buildTools: Tool[] = [
  {
    name: 'run_build',
    description: 'Trigger a new build',
    inputSchema: {
      type: 'object',
      properties: {
        project: {
          type: 'string',
          description: 'Project name',
        },
        definitionId: {
          type: 'number',
          description: 'Build definition ID',
        },
        sourceBranch: {
          type: 'string',
          description: 'Branch to build from (optional)',
        },
      },
      required: ['project', 'definitionId'],
    },
  },
  {
    name: 'get_build_status',
    description: 'Get the status of a specific build',
    inputSchema: {
      type: 'object',
      properties: {
        project: {
          type: 'string',
          description: 'Project name',
        },
        buildId: {
          type: 'number',
          description: 'Build ID',
        },
      },
      required: ['project', 'buildId'],
    },
  },
  {
    name: 'list_build_definitions',
    description: 'List build definitions in a project',
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
]; 