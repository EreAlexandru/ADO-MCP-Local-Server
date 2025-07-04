/**
 * Central export file for all handler functions
 * This consolidates all handlers from individual modules
 */

// Project handlers
export {
  handleListProjects,
  handleGetProject,
} from './projectHandlers.js';

// Work item handlers
export {
  handleListWorkItems,
  handleWitCreateWorkItem,
  handleWitGetWorkItem,
  handleWitUpdateWorkItem,
  handleWitRunQuery,
  handleWitSearchWorkItems,
  handleWitAddWorkItemComment,
  handleWitLinkWorkItems,
  handleWitMyWorkItems,
  handleWitListWorkItemComments,
  handleWitGetWorkItemsForIteration,
} from './workItemHandlers.js';

// Repository handlers
export {
  handleListPullRequests,
  handleCreatePullRequest,
  handleUpdatePullRequestStatus,
  handleListBranches,
  handleGetPullRequest,
  handleListRepositories,
  handleGetRepository,
  handleGetBranch,
  handleListPullRequestsByProject,
  handleListPullRequestThreads,
  handleListPullRequestThreadComments,
  handleReplyToPullRequestComment,
  handleResolvePullRequestThread,
} from './repositoryHandlers.js';

// Build handlers
export {
  handleRunBuild,
  handleGetBuildStatus,
  handleListBuildDefinitions,
} from './buildHandlers.js';

// Search handlers
export {
  handleSearchCode,
} from './searchHandlers.js';

// Test handlers
export {
  handleCreateTestPlan,
  handleListTestPlans,
  handleCreateTestSuite,
  handleCreateTestCase,
  handleAddTestCasesToSuite,
  handleListTestCases,
  handleRunTestCase,
  handleGetTestResults,
  handleGetTestResultsByBuild,
} from './testHandlers.js';

// Release handlers
export {
  handleListReleaseDefinitions,
  handleListReleases,
  handleCreateRelease,
  handleDeployRelease,
} from './releaseHandlers.js';

// Wiki handlers
export {
  handleListWikis,
  handleGetWikiPage,
  handleCreateWikiPage,
  handleUpdateWikiPage,
} from './wikiHandlers.js';

// Organization handlers
export {
  handleListIterations,
  handleListAreas,
  handleCreateIteration,
  handleCreateArea,
} from './organizationHandlers.js'; 