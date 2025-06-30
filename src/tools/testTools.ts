import { Tool } from '@modelcontextprotocol/sdk/types.js';

/**
 * Test Plans and QA Management Tools
 * These tools handle test plans, test suites, test cases, and test execution
 */
export const testTools: Tool[] = [
  {
    name: 'create_test_plan',
    description: 'Create a new test plan in the project',
    inputSchema: {
      type: 'object',
      properties: {
        project: {
          type: 'string',
          description: 'Project name',
        },
        name: {
          type: 'string',
          description: 'Test plan name',
        },
        areaPath: {
          type: 'string',
          description: 'Area path for the test plan',
        },
        iteration: {
          type: 'string',
          description: 'Iteration path',
        },
      },
      required: ['project', 'name'],
    },
  },
  {
    name: 'list_test_plans',
    description: 'List all test plans in a project',
    inputSchema: {
      type: 'object',
      properties: {
        project: {
          type: 'string',
          description: 'Project name',
        },
        isActive: {
          type: 'boolean',
          description: 'Filter for active test plans only',
        },
      },
      required: ['project'],
    },
  },
  {
    name: 'create_test_suite',
    description: 'Create a test suite within a test plan',
    inputSchema: {
      type: 'object',
      properties: {
        project: {
          type: 'string',
          description: 'Project name',
        },
        planId: {
          type: 'number',
          description: 'Test plan ID',
        },
        name: {
          type: 'string',
          description: 'Test suite name',
        },
        suiteType: {
          type: 'string',
          description: 'Suite type',
          enum: ['StaticTestSuite', 'DynamicTestSuite', 'RequirementTestSuite'],
        },
      },
      required: ['project', 'planId', 'name'],
    },
  },
  {
    name: 'create_test_case',
    description: 'Create a new test case',
    inputSchema: {
      type: 'object',
      properties: {
        project: {
          type: 'string',
          description: 'Project name',
        },
        title: {
          type: 'string',
          description: 'Test case title',
        },
        steps: {
          type: 'string',
          description: 'Test steps (separated by newlines)',
        },
        expectedResult: {
          type: 'string',
          description: 'Expected results',
        },
        priority: {
          type: 'number',
          description: 'Priority (1-4)',
        },
      },
      required: ['project', 'title'],
    },
  },
  {
    name: 'add_test_cases_to_suite',
    description: 'Add test cases to a test suite',
    inputSchema: {
      type: 'object',
      properties: {
        project: {
          type: 'string',
          description: 'Project name',
        },
        planId: {
          type: 'number',
          description: 'Test plan ID',
        },
        suiteId: {
          type: 'number',
          description: 'Test suite ID',
        },
        testCaseIds: {
          type: 'array',
          items: {
            type: 'number',
          },
          description: 'Array of test case IDs',
        },
      },
      required: ['project', 'planId', 'suiteId', 'testCaseIds'],
    },
  },
  {
    name: 'list_test_cases',
    description: 'List test cases in a test suite',
    inputSchema: {
      type: 'object',
      properties: {
        project: {
          type: 'string',
          description: 'Project name',
        },
        planId: {
          type: 'number',
          description: 'Test plan ID',
        },
        suiteId: {
          type: 'number',
          description: 'Test suite ID',
        },
      },
      required: ['project', 'planId', 'suiteId'],
    },
  },
  {
    name: 'run_test_case',
    description: 'Execute a test case and record results',
    inputSchema: {
      type: 'object',
      properties: {
        project: {
          type: 'string',
          description: 'Project name',
        },
        planId: {
          type: 'number',
          description: 'Test plan ID',
        },
        suiteId: {
          type: 'number',
          description: 'Test suite ID',
        },
        testCaseId: {
          type: 'number',
          description: 'Test case ID',
        },
        outcome: {
          type: 'string',
          description: 'Test outcome',
          enum: ['Passed', 'Failed', 'Blocked', 'NotApplicable', 'None'],
        },
        comment: {
          type: 'string',
          description: 'Optional comment about the test run',
        },
      },
      required: ['project', 'planId', 'suiteId', 'testCaseId', 'outcome'],
    },
  },
  {
    name: 'get_test_results',
    description: 'Get test results for a test run',
    inputSchema: {
      type: 'object',
      properties: {
        project: {
          type: 'string',
          description: 'Project name',
        },
        runId: {
          type: 'number',
          description: 'Test run ID',
        },
      },
      required: ['project', 'runId'],
    },
  },
  {
    name: 'get_test_results_by_build',
    description: 'Get test results for a specific build',
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
]; 