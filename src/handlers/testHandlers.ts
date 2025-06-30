import { AzureDevOpsClient } from '../azureDevOpsClient.js';

/**
 * Test Plans and QA Handlers
 * These functions handle the actual execution of test-related tools
 */

/**
 * Create a new test plan
 * @param adoClient - The Azure DevOps client instance
 * @param project - Project name
 * @param name - Test plan name
 * @param areaPath - Optional area path
 * @param iteration - Optional iteration path
 * @returns MCP-formatted response with test plan details
 */
export async function handleCreateTestPlan(
  adoClient: AzureDevOpsClient,
  project: string,
  name: string,
  areaPath?: string,
  iteration?: string
) {
  return await adoClient.createTestPlan(project, name, areaPath, iteration);
}

/**
 * List all test plans in a project
 * @param adoClient - The Azure DevOps client instance
 * @param project - Project name
 * @param isActive - Optional filter for active test plans
 * @returns MCP-formatted response with test plans
 */
export async function handleListTestPlans(
  adoClient: AzureDevOpsClient,
  project: string,
  isActive?: boolean
) {
  return await adoClient.listTestPlans(project, isActive);
}

/**
 * Create a test suite within a test plan
 * @param adoClient - The Azure DevOps client instance
 * @param project - Project name
 * @param planId - Test plan ID
 * @param name - Test suite name
 * @param suiteType - Optional suite type
 * @returns MCP-formatted response with test suite details
 */
export async function handleCreateTestSuite(
  adoClient: AzureDevOpsClient,
  project: string,
  planId: number,
  name: string,
  suiteType?: string
) {
  return await adoClient.createTestSuite(project, planId, name, suiteType);
}

/**
 * Create a new test case
 * @param adoClient - The Azure DevOps client instance
 * @param project - Project name
 * @param title - Test case title
 * @param steps - Optional test steps
 * @param expectedResult - Optional expected results
 * @param priority - Optional priority (1-4)
 * @returns MCP-formatted response with test case details
 */
export async function handleCreateTestCase(
  adoClient: AzureDevOpsClient,
  project: string,
  title: string,
  steps?: string,
  expectedResult?: string,
  priority?: number
) {
  return await adoClient.createTestCase(project, title, steps, expectedResult, priority);
}

/**
 * Add test cases to a test suite
 * @param adoClient - The Azure DevOps client instance
 * @param project - Project name
 * @param planId - Test plan ID
 * @param suiteId - Test suite ID
 * @param testCaseIds - Array of test case IDs
 * @returns MCP-formatted response with confirmation
 */
export async function handleAddTestCasesToSuite(
  adoClient: AzureDevOpsClient,
  project: string,
  planId: number,
  suiteId: number,
  testCaseIds: number[]
) {
  return await adoClient.addTestCasesToSuite(project, planId, suiteId, testCaseIds);
}

/**
 * List test cases in a test suite
 * @param adoClient - The Azure DevOps client instance
 * @param project - Project name
 * @param planId - Test plan ID
 * @param suiteId - Test suite ID
 * @returns MCP-formatted response with test cases
 */
export async function handleListTestCases(
  adoClient: AzureDevOpsClient,
  project: string,
  planId: number,
  suiteId: number
) {
  return await adoClient.listTestCases(project, planId, suiteId);
}

/**
 * Execute a test case and record results
 * @param adoClient - The Azure DevOps client instance
 * @param project - Project name
 * @param planId - Test plan ID
 * @param suiteId - Test suite ID
 * @param testCaseId - Test case ID
 * @param outcome - Test outcome
 * @param comment - Optional comment
 * @returns MCP-formatted response with test run details
 */
export async function handleRunTestCase(
  adoClient: AzureDevOpsClient,
  project: string,
  planId: number,
  suiteId: number,
  testCaseId: number,
  outcome: string,
  comment?: string
) {
  return await adoClient.runTestCase(project, planId, suiteId, testCaseId, outcome, comment);
}

/**
 * Get test results for a test run
 * @param adoClient - The Azure DevOps client instance
 * @param project - Project name
 * @param runId - Test run ID
 * @returns MCP-formatted response with test results
 */
export async function handleGetTestResults(
  adoClient: AzureDevOpsClient,
  project: string,
  runId: number
) {
  return await adoClient.getTestResults(project, runId);
}

/**
 * Get test results for a specific build
 * @param adoClient - The Azure DevOps client instance
 * @param project - Project name
 * @param buildId - Build ID
 * @returns MCP-formatted response with test results
 */
export async function handleGetTestResultsByBuild(
  adoClient: AzureDevOpsClient,
  project: string,
  buildId: number
) {
  return await adoClient.getTestResultsByBuild(project, buildId);
} 