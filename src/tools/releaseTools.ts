import { Tool } from '@modelcontextprotocol/sdk/types.js';

/**
 * Release Management Tools
 * These tools handle release definitions, creating releases, and deployments
 */
export const releaseTools: Tool[] = [
  {
    name: 'list_release_definitions',
    description: 'List all release definitions in a project',
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
    name: 'list_releases',
    description: 'List releases for a project',
    inputSchema: {
      type: 'object',
      properties: {
        project: {
          type: 'string',
          description: 'Project name',
        },
        definitionId: {
          type: 'number',
          description: 'Optional release definition ID to filter',
        },
      },
      required: ['project'],
    },
  },
  {
    name: 'create_release',
    description: 'Create a new release',
    inputSchema: {
      type: 'object',
      properties: {
        project: {
          type: 'string',
          description: 'Project name',
        },
        definitionId: {
          type: 'number',
          description: 'Release definition ID',
        },
        description: {
          type: 'string',
          description: 'Release description',
        },
      },
      required: ['project', 'definitionId'],
    },
  },
  {
    name: 'deploy_release',
    description: 'Deploy a release to an environment',
    inputSchema: {
      type: 'object',
      properties: {
        project: {
          type: 'string',
          description: 'Project name',
        },
        releaseId: {
          type: 'number',
          description: 'Release ID',
        },
        environmentId: {
          type: 'number',
          description: 'Environment ID',
        },
      },
      required: ['project', 'releaseId', 'environmentId'],
    },
  },
]; 