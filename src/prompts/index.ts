/**
 * Prompt Templates for Azure DevOps MCP Server
 * These provide guided workflows for common Azure DevOps tasks
 */

import { Server } from '@modelcontextprotocol/sdk/server/index.js';
import { 
  ListPromptsRequestSchema, 
  GetPromptRequestSchema 
} from '@modelcontextprotocol/sdk/types.js';
import { z } from 'zod';

// Define our prompt templates
export const PROMPT_TEMPLATES = {
  daily_standup: {
    name: "daily_standup",
    description: "Prepare for daily standup meeting",
    arguments: [
      {
        name: "project",
        description: "Project name",
        required: true
      }
    ]
  },
  sprint_planning: {
    name: "sprint_planning",
    description: "Help with sprint planning tasks",
    arguments: [
      {
        name: "project",
        description: "Project name",
        required: true
      },
      {
        name: "iterationPath",
        description: "Iteration path (e.g., 'MyProject\\Sprint 23')",
        required: true
      }
    ]
  },
  code_review: {
    name: "code_review",
    description: "Find pull requests that need review",
    arguments: [
      {
        name: "project",
        description: "Project name",
        required: true
      }
    ]
  },
  my_work: {
    name: "my_work",
    description: "Get all my active work items",
    arguments: [
      {
        name: "project",
        description: "Project name",
        required: true
      }
    ]
  },
  release_status: {
    name: "release_status",
    description: "Check release pipeline status",
    arguments: [
      {
        name: "project",
        description: "Project name",
        required: true
      }
    ]
  },
  bug_triage: {
    name: "bug_triage",
    description: "Review and triage bugs",
    arguments: [
      {
        name: "project",
        description: "Project name",
        required: true
      },
      {
        name: "areaPath",
        description: "Area path to filter bugs (optional)",
        required: false
      }
    ]
  },
  sprint_retrospective: {
    name: "sprint_retrospective",
    description: "Gather data for sprint retrospective",
    arguments: [
      {
        name: "project",
        description: "Project name",
        required: true
      },
      {
        name: "iterationPath",
        description: "Completed sprint iteration path",
        required: true
      }
    ]
  },
  build_health: {
    name: "build_health",
    description: "Check build pipeline health and recent failures",
    arguments: [
      {
        name: "project",
        description: "Project name",
        required: true
      }
    ]
  },
  work_item_dependencies: {
    name: "work_item_dependencies",
    description: "Analyze work item dependencies and blockers",
    arguments: [
      {
        name: "project",
        description: "Project name",
        required: true
      },
      {
        name: "workItemId",
        description: "Parent work item ID to analyze",
        required: true
      }
    ]
  },
  team_velocity: {
    name: "team_velocity",
    description: "Calculate team velocity and capacity",
    arguments: [
      {
        name: "project",
        description: "Project name",
        required: true
      },
      {
        name: "teamName",
        description: "Team name",
        required: true
      },
      {
        name: "sprintCount",
        description: "Number of recent sprints to analyze (default: 3)",
        required: false
      }
    ]
  },
  // QA MANUAL TESTING PROMPTS
  test_execution_status: {
    name: "test_execution_status",
    description: "QA: Check test execution status and progress",
    arguments: [
      {
        name: "project",
        description: "Project name",
        required: true
      },
      {
        name: "testPlanId",
        description: "Test plan ID (optional - will show all if not provided)",
        required: false
      }
    ]
  },
  failed_tests_analysis: {
    name: "failed_tests_analysis",
    description: "QA: Analyze failed tests and common failure patterns",
    arguments: [
      {
        name: "project",
        description: "Project name",
        required: true
      },
      {
        name: "buildId",
        description: "Specific build ID to analyze (optional)",
        required: false
      }
    ]
  },
  test_coverage_report: {
    name: "test_coverage_report",
    description: "QA: Generate test coverage and execution report",
    arguments: [
      {
        name: "project",
        description: "Project name",
        required: true
      },
      {
        name: "iterationPath",
        description: "Sprint/iteration to analyze",
        required: true
      }
    ]
  },
  bug_quality_metrics: {
    name: "bug_quality_metrics",
    description: "QA: Analyze bug quality metrics and trends",
    arguments: [
      {
        name: "project",
        description: "Project name",
        required: true
      },
      {
        name: "areaPath",
        description: "Area path to filter (optional)",
        required: false
      },
      {
        name: "days",
        description: "Number of days to analyze (default: 30)",
        required: false
      }
    ]
  },
  regression_test_plan: {
    name: "regression_test_plan",
    description: "QA: Create regression test plan for release",
    arguments: [
      {
        name: "project",
        description: "Project name",
        required: true
      },
      {
        name: "releaseVersion",
        description: "Release version or tag",
        required: true
      }
    ]
  },
  test_environment_status: {
    name: "test_environment_status",
    description: "QA: Check test environment availability and health",
    arguments: [
      {
        name: "project",
        description: "Project name",
        required: true
      }
    ]
  },
  // QA AUTOMATION PROMPTS
  automation_test_results: {
    name: "automation_test_results",
    description: "QA Automation: Analyze automated test results and trends",
    arguments: [
      {
        name: "project",
        description: "Project name",
        required: true
      },
      {
        name: "buildDefinitionId",
        description: "Build definition ID for automation tests",
        required: false
      },
      {
        name: "days",
        description: "Number of days to analyze (default: 7)",
        required: false
      }
    ]
  },
  flaky_tests_detection: {
    name: "flaky_tests_detection",
    description: "QA Automation: Identify flaky/unstable automated tests",
    arguments: [
      {
        name: "project",
        description: "Project name",
        required: true
      },
      {
        name: "buildDefinitionId",
        description: "Build definition ID to analyze",
        required: false
      }
    ]
  },
  automation_coverage_gap: {
    name: "automation_coverage_gap",
    description: "QA Automation: Find manual tests that need automation",
    arguments: [
      {
        name: "project",
        description: "Project name",
        required: true
      },
      {
        name: "testSuiteId",
        description: "Test suite ID to analyze",
        required: false
      }
    ]
  },
  performance_test_analysis: {
    name: "performance_test_analysis",
    description: "QA Automation: Analyze performance test results and trends",
    arguments: [
      {
        name: "project",
        description: "Project name",
        required: true
      },
      {
        name: "buildId",
        description: "Specific build with performance tests",
        required: false
      }
    ]
  },
  test_maintenance_report: {
    name: "test_maintenance_report",
    description: "QA Automation: Generate test maintenance and health report",
    arguments: [
      {
        name: "project",
        description: "Project name",
        required: true
      }
    ]
  },
  // CROSS-FUNCTIONAL QA PROMPTS
  release_readiness_check: {
    name: "release_readiness_check",
    description: "QA: Complete release readiness assessment",
    arguments: [
      {
        name: "project",
        description: "Project name",
        required: true
      },
      {
        name: "releaseId",
        description: "Release ID to check",
        required: true
      }
    ]
  },
  defect_leakage_analysis: {
    name: "defect_leakage_analysis",
    description: "QA: Analyze defects found in production vs testing phases",
    arguments: [
      {
        name: "project",
        description: "Project name",
        required: true
      },
      {
        name: "iterationPath",
        description: "Sprint/iteration to analyze",
        required: true
      }
    ]
  },
  test_data_management: {
    name: "test_data_management",
    description: "QA: Review test data setup and requirements",
    arguments: [
      {
        name: "project",
        description: "Project name",
        required: true
      },
      {
        name: "testPlanId",
        description: "Test plan ID",
        required: true
      }
    ]
  },
  // QA AUTOMATION - PR & CI/CD INTEGRATION PROMPTS
  automation_pr_analysis: {
    name: "automation_pr_analysis",
    description: "QA Automation: Analyze PRs impact on test automation",
    arguments: [
      {
        name: "project",
        description: "Project name",
        required: true
      },
      {
        name: "repository",
        description: "Repository name (optional - will check all repos if not provided)",
        required: false
      },
      {
        name: "days",
        description: "Number of days to analyze (default: 7)",
        required: false
      }
    ]
  },
  test_automation_ci_health: {
    name: "test_automation_ci_health",
    description: "QA Automation: Monitor CI/CD pipeline health for automation tests",
    arguments: [
      {
        name: "project",
        description: "Project name",
        required: true
      },
      {
        name: "buildDefinitionId",
        description: "Build definition ID for automation pipeline",
        required: false
      }
    ]
  },
  pr_test_impact_analysis: {
    name: "pr_test_impact_analysis",
    description: "QA Automation: Analyze which tests should run for specific PRs",
    arguments: [
      {
        name: "project",
        description: "Project name",
        required: true
      },
      {
        name: "pullRequestId",
        description: "Specific PR ID to analyze",
        required: true
      },
      {
        name: "repository",
        description: "Repository name",
        required: true
      }
    ]
  },
  automation_code_coverage: {
    name: "automation_code_coverage",
    description: "QA Automation: Analyze code coverage from automation tests",
    arguments: [
      {
        name: "project",
        description: "Project name",
        required: true
      },
      {
        name: "buildId",
        description: "Specific build ID to analyze coverage",
        required: false
      }
    ]
  },
  test_automation_deployment: {
    name: "test_automation_deployment",
    description: "QA Automation: Monitor test automation deployment across environments",
    arguments: [
      {
        name: "project",
        description: "Project name",
        required: true
      },
      {
        name: "environment",
        description: "Target environment (dev, staging, prod)",
        required: false
      }
    ]
  },
  pr_quality_gate: {
    name: "pr_quality_gate",
    description: "QA Automation: Check if PR meets quality gates for merge",
    arguments: [
      {
        name: "project",
        description: "Project name",
        required: true
      },
      {
        name: "pullRequestId",
        description: "PR ID to check",
        required: true
      },
      {
        name: "repository",
        description: "Repository name",
        required: true
      }
    ]
  },
  automation_test_trends: {
    name: "automation_test_trends",
    description: "QA Automation: Analyze automation test trends across branches/PRs",
    arguments: [
      {
        name: "project",
        description: "Project name",
        required: true
      },
      {
        name: "branchName",
        description: "Specific branch to analyze (optional)",
        required: false
      },
      {
        name: "days",
        description: "Number of days to analyze (default: 14)",
        required: false
      }
    ]
  },
  test_automation_security: {
    name: "test_automation_security",
    description: "QA Automation: Security and compliance check for automation tests",
    arguments: [
      {
        name: "project",
        description: "Project name",
        required: true
      },
      {
        name: "testSuite",
        description: "Specific test suite to check (optional)",
        required: false
      }
    ]
  }
};

// Generate prompt content based on template
function generatePromptContent(promptName: string, args: Record<string, any>): string {
  switch (promptName) {
    case 'daily_standup':
      return `Help me prepare for daily standup in project "${args.project}".
1. First, use wit_my_work_items to get my active work items
2. Show what I worked on yesterday (recently updated items)
3. Show what I'm working on today (active items)
4. Identify any blockers (items in blocked state or with blocking comments)
5. List any PRs I have open using repo_list_pull_requests_by_project`;

    case 'sprint_planning':
      return `Help me with sprint planning for iteration "${args.iterationPath}" in project "${args.project}".
1. Use wit_get_work_items_for_iteration to get current items in the sprint
2. Show unassigned items that need attention
3. List items by priority and state
4. Identify any items that might be at risk (no recent updates, blocked state)
5. Show the sprint capacity if available`;

    case 'code_review':
      return `Find all pull requests that need my review in project "${args.project}".
1. Use repo_list_pull_requests_by_project with status "active"
2. Highlight any PRs that are older than 3 days
3. Show PRs where I'm explicitly listed as a reviewer
4. List any PRs with unresolved comments using repo_list_pull_request_threads
5. Sort by age (oldest first)`;

    case 'my_work':
      return `Show all my active work items in project "${args.project}".
1. Use wit_my_work_items to get items assigned to me
2. Group them by state (Active, New, Resolved)
3. Show priority for each item
4. Include any recent comments using wit_list_work_item_comments
5. Highlight items updated in the last 24 hours`;

    case 'release_status':
      return `Check the release pipeline status for project "${args.project}".
1. Use list_release_definitions to get all release pipelines
2. Use list_releases to get recent releases
3. Show the status of the last 5 releases
4. Highlight any failed releases
5. Show which environments each release has been deployed to`;

    case 'bug_triage':
      const areaFilter = args.areaPath ? ` AND [System.AreaPath] UNDER '${args.areaPath}'` : '';
      return `Help me triage bugs in project "${args.project}".
1. Use wit_run_query with: SELECT [System.Id], [System.Title], [System.Priority], [System.Severity], [System.State], [System.CreatedDate] FROM WorkItems WHERE [System.WorkItemType] = 'Bug' AND [System.State] = 'New'${areaFilter} ORDER BY [System.Priority], [System.CreatedDate]
2. Group bugs by priority and severity
3. Show bugs older than 7 days that haven't been triaged
4. List bugs without assigned priority or severity
5. Highlight any bugs with recent customer impact comments`;

    case 'sprint_retrospective':
      return `Gather data for sprint retrospective for "${args.iterationPath}" in project "${args.project}".
1. Use wit_get_work_items_for_iteration to get all items from the sprint
2. Calculate completion rate (completed vs planned)
3. List items that were added mid-sprint
4. Show items that were moved to next sprint
5. Use list_builds and get_build_status to show build success rate during sprint
6. List any production incidents or bugs created during the sprint`;

    case 'build_health':
      return `Check build pipeline health for project "${args.project}".
1. Use list_build_definitions to get all build pipelines
2. Use list_builds with statusFilter for failed builds in last 7 days
3. Calculate success rate for each pipeline
4. Show pipelines with success rate below 80%
5. For failed builds, use get_build_logs to identify common failure patterns
6. List the top 3 most frequently failing pipelines`;

    case 'work_item_dependencies':
      return `Analyze dependencies for work item ${args.workItemId} in project "${args.project}".
1. Use wit_get_work_item to get the parent item details
2. Find all linked items (child, related, predecessor/successor)
3. Check the state of each dependency
4. Identify blocking dependencies (items not in Done state)
5. Show the dependency chain visually if possible
6. Highlight any circular dependencies`;

    case 'team_velocity':
      const sprintCount = args.sprintCount || 3;
      return `Calculate velocity for team "${args.teamName}" in project "${args.project}".
1. Use work_list_iterations to get the last ${sprintCount} completed sprints
2. For each sprint, use wit_get_work_items_for_iteration to get completed items
3. Sum story points or effort for completed items per sprint
4. Calculate average velocity across sprints
5. Show velocity trend (increasing/decreasing/stable)
6. Compare planned vs actual capacity for each sprint`;

    case 'test_execution_status':
      const testPlanFilter = args.testPlanId ? ` for test plan ${args.testPlanId}` : '';
      return `Check test execution status and progress in project "${args.project}"${testPlanFilter}.
1. Use list_test_plans to get all test plans${args.testPlanId ? ` or get specific plan ${args.testPlanId}` : ''}
2. For each test plan, use list_test_cases to get test cases
3. Use get_test_results to check execution status
4. Group results by: Passed, Failed, Blocked, Not Run
5. Calculate completion percentage and identify bottlenecks
6. Show test execution trends over the last 7 days`;

    case 'failed_tests_analysis':
      const buildFilter = args.buildId ? ` for build ${args.buildId}` : ' for recent builds';
      return `Analyze failed tests and identify patterns in project "${args.project}"${buildFilter}.
1. Use get_test_results_by_build${args.buildId ? ` with buildId ${args.buildId}` : ' for latest builds'}
2. Filter for failed test results only
3. Group failures by:
   - Test suite/area
   - Failure reason/error message
   - Frequency of failure
4. Use list_builds to correlate with build changes
5. Identify the top 5 most frequent failure patterns
6. Suggest potential root causes and remediation steps`;

    case 'test_coverage_report':
      return `Generate comprehensive test coverage report for "${args.iterationPath}" in project "${args.project}".
1. Use wit_get_work_items_for_iteration to get all user stories/features
2. Use list_test_plans to get test plans for this iteration
3. For each test plan, use list_test_cases to get test coverage
4. Map test cases to user stories/requirements
5. Calculate coverage metrics:
   - Requirements coverage %
   - Test execution rate
   - Pass/fail ratios
6. Identify uncovered or under-tested areas
7. Show test execution velocity and trends`;

         case 'bug_quality_metrics':
       const days = args.days || 30;
       const bugAreaFilter = args.areaPath ? ` in area "${args.areaPath}"` : '';
       return `Analyze bug quality metrics for the last ${days} days in project "${args.project}"${bugAreaFilter}.
1. Use wit_run_query to get bugs created in the last ${days} days:
   SELECT [System.Id], [System.Title], [System.Priority], [System.Severity], [System.State], [System.CreatedDate], [System.ResolvedDate] 
   FROM WorkItems WHERE [System.WorkItemType] = 'Bug' AND [System.CreatedDate] >= @Today-${days}${args.areaPath ? ` AND [System.AreaPath] UNDER '${args.areaPath}'` : ''}
2. Calculate key metrics:
   - Bug discovery rate (bugs/day)
   - Bug resolution time (average)
   - Bug severity distribution
   - Bug escape rate (production bugs)
3. Show trends and compare with previous periods
4. Identify areas with highest bug density`;

    case 'regression_test_plan':
      return `Create regression test plan for release "${args.releaseVersion}" in project "${args.project}".
1. Use repo_list_pull_requests_by_project to get PRs included in release
2. For each PR, analyze changed files and components
3. Use search_code to find related test cases
4. Use list_test_plans to identify existing regression suites
5. Create test execution plan covering:
   - Core functionality tests
   - Integration tests for changed components
   - Performance regression tests
   - Security and compliance tests
6. Estimate test execution time and resource requirements
7. Prioritize tests based on risk and impact`;

    case 'test_environment_status':
      return `Check test environment status and health in project "${args.project}".
1. Use list_releases to get recent deployments to test environments
2. Use list_builds to check latest deployment status
3. For each environment, verify:
   - Deployment status and version
   - Service health and availability
   - Database connectivity and data integrity
   - External dependencies status
4. Use get_test_results to check recent test execution success
5. Identify any environment issues or outages
6. Show environment utilization and capacity`;

    case 'automation_test_results':
      const analysisDays = args.days || 7;
      const buildDefFilter = args.buildDefinitionId ? ` for build definition ${args.buildDefinitionId}` : '';
      return `Analyze automated test results and trends for the last ${analysisDays} days in project "${args.project}"${buildDefFilter}.
1. Use list_builds${args.buildDefinitionId ? ` with definitionId ${args.buildDefinitionId}` : ''} for the last ${analysisDays} days
2. For each build, use get_test_results_by_build to get automation results
3. Calculate automation metrics:
   - Test pass rate trend
   - Test execution time trends
   - Test stability (consistent results)
   - Coverage of automated vs manual tests
4. Identify top failing tests and failure reasons
5. Show automation ROI metrics (time saved, bugs caught)
6. Recommend improvements for test automation strategy`;

    case 'flaky_tests_detection':
      return `Identify flaky and unstable automated tests in project "${args.project}".
1. Use list_builds${args.buildDefinitionId ? ` with definitionId ${args.buildDefinitionId}` : ''} for the last 30 builds
2. For each build, use get_test_results_by_build to get test results
3. Analyze test stability by calculating:
   - Pass rate for each test (should be >95% or <5% to be stable)
   - Tests that pass/fail inconsistently on same code
   - Tests with intermittent timeouts or errors
4. Rank tests by flakiness score (inconsistency frequency)
5. Identify common patterns in flaky tests:
   - Environment dependencies
   - Timing issues
   - Data dependencies
6. Recommend fixes for top 10 flaky tests`;

         case 'automation_coverage_gap':
       return `Find manual tests that need automation in project "${args.project}".
1. Use list_test_plans to get all test plans
2. Use list_test_cases${args.testSuiteId ? ` for suite ${args.testSuiteId}` : ''} to get manual test cases
3. Use list_builds and get_test_results_by_build to get automated test coverage
4. Compare manual test cases with automated test coverage:
   - Identify manual tests without automation
   - Find repetitive manual tests (good automation candidates)
   - Locate high-value/high-risk manual tests
5. Prioritize automation candidates by:
   - Execution frequency
   - Business criticality
   - Regression risk
6. Estimate automation effort and ROI for top candidates`;

     case 'performance_test_analysis':
       return `Analyze performance test results and trends in project "${args.project}".
1. Use list_builds to get builds with performance tests
2. Use get_test_results${args.buildId ? ` for build ${args.buildId}` : ' for recent builds'} to get performance results
3. Analyze performance metrics:
   - Response time trends
   - Throughput and load capacity
   - Resource utilization (CPU, memory)
   - Error rates under load
4. Compare against performance baselines and SLAs
5. Identify performance regressions or improvements
6. Show performance test coverage across different scenarios
7. Recommend performance optimization opportunities`;

     case 'test_maintenance_report':
       return `Generate test maintenance and health report for project "${args.project}".
1. Use list_test_plans to get all test plans and suites
2. Use list_test_cases to analyze test case health:
   - Last execution date
   - Pass/fail history
   - Test case complexity and maintainability
3. Use get_test_results to identify:
   - Outdated or obsolete tests
   - Tests requiring frequent updates
   - Tests with poor documentation
4. Calculate test maintenance metrics:
   - Test execution coverage
   - Test update frequency
   - Test failure investigation time
5. Identify test debt and cleanup opportunities
6. Recommend test optimization and consolidation`;

     case 'release_readiness_check':
       return `Complete release readiness assessment for release ${args.releaseId} in project "${args.project}".
1. Use list_releases and get release details for release ${args.releaseId}
2. Check test execution completeness:
   - All planned test cases executed
   - Critical/high priority tests passed
   - No blocking defects remain open
3. Verify deployment readiness:
   - All environments tested successfully
   - Database migration scripts validated
   - Rollback procedures verified
4. Use wit_run_query to check for open issues:
   SELECT * FROM WorkItems WHERE [System.State] NOT IN ('Closed', 'Done') AND [System.Tags] CONTAINS 'Release-${args.releaseId}'
5. Generate go/no-go recommendation with risk assessment`;

     case 'defect_leakage_analysis':
       return `Analyze defect leakage between testing phases and production in project "${args.project}" for "${args.iterationPath}".
1. Use wit_get_work_items_for_iteration to get all work items from the iteration
2. Use wit_run_query to get defects by discovery phase:
   - Unit testing phase bugs
   - Integration testing phase bugs
   - System testing phase bugs
   - UAT phase bugs
   - Production bugs (found after release)
3. Calculate defect leakage metrics:
   - % of defects found in each phase
   - Defect detection efficiency
   - Cost of defect by discovery phase
4. Analyze root causes of production defects
5. Recommend process improvements to reduce leakage
6. Show trends compared to previous iterations`;

     case 'test_data_management':
       return `Review test data setup and requirements for test plan ${args.testPlanId} in project "${args.project}".
1. Use list_test_cases for test plan ${args.testPlanId} to identify data requirements
2. Analyze test data needs:
   - Data volume and variety requirements
   - Data refresh and cleanup procedures
   - Data privacy and security compliance
   - Environment-specific data requirements
3. Check test data health:
   - Data freshness and accuracy
   - Data consistency across environments
   - Data availability and access
4. Identify test data challenges:
   - Data setup complexity
   - Data dependencies between tests
   - Data maintenance overhead
5. Recommend test data strategy improvements
6. Suggest data virtualization or synthetic data opportunities`;

    case 'automation_pr_analysis':
      return `Analyze PRs impact on test automation in project "${args.project}".
1. Use repo_list_pull_requests_by_project to get PRs in the project
2. For each PR, analyze changes and identify test impact
3. Use list_test_cases to get test cases affected by PR
4. Use get_test_results to check test execution status
5. Calculate test impact metrics:
   - Test case changes
   - Test execution time
   - Test coverage
6. Identify test gaps and opportunities for automation`;

    case 'test_automation_ci_health':
      return `Check CI/CD pipeline health for automation tests in project "${args.project}".
1. Use list_builds to get builds with automation tests
2. Use get_test_results to check test execution status
3. Analyze pipeline health:
   - Build success rate
   - Test execution time
   - Resource utilization
4. Identify bottlenecks and areas for improvement
5. Show CI/CD integration health metrics`;

    case 'pr_test_impact_analysis':
      return `Analyze which tests should run for specific PR ${args.pullRequestId} in project "${args.project}" and repository "${args.repository}".
1. Use repo_list_pull_requests_by_project to get PR details
2. Use list_test_cases to get test cases affected by PR
3. Use get_test_results to check test execution status
4. Calculate test impact metrics:
   - Test case changes
   - Test execution time
   - Test coverage
5. Identify test gaps and opportunities for automation`;

    case 'automation_code_coverage':
      return `Analyze code coverage from automation tests in project "${args.project}" for build ${args.buildId}.
1. Use list_builds to get builds with automation tests
2. Use get_test_results to get test coverage
3. Calculate code coverage metrics:
   - Line coverage
   - Method coverage
   - Branch coverage
4. Compare against baseline coverage
5. Identify uncovered or under-tested areas
6. Show code coverage trends`;

    case 'test_automation_deployment':
      return `Check test automation deployment in project "${args.project}" for target environment "${args.environment}".
1. Use list_builds to get builds with test automation
2. Use get_test_results to check test execution status
3. Analyze deployment health:
   - Deployment status
   - Test execution time
   - Resource utilization
4. Identify deployment issues or bottlenecks
5. Show test automation utilization and capacity`;

    case 'pr_quality_gate':
      return `Check if PR ${args.pullRequestId} in project "${args.project}" and repository "${args.repository}" meets quality gates for merge.
1. Use repo_list_pull_requests_by_project to get PR details
2. Use list_test_cases to get test cases covered by PR
3. Use get_test_results to check test execution status
4. Analyze quality metrics:
   - Test coverage
   - Code quality
   - Security compliance
5. Compare against quality gate thresholds
6. Generate go/no-go recommendation`;

    case 'automation_test_trends':
      const branchFilter = args.branchName ? ` for branch "${args.branchName}"` : '';
      return `Analyze automation test trends across branches/PRs in project "${args.project}"${branchFilter}.
1. Use list_builds to get builds with automation tests
2. Use get_test_results to get test execution status
3. Calculate test execution time trends
4. Analyze test coverage trends
5. Identify top performing and underperforming branches/PRs
6. Show test automation ROI metrics`;

    case 'test_automation_security':
      const suiteFilter = args.testSuite ? ` for suite "${args.testSuite}"` : '';
      return `Check security and compliance for automation tests in project "${args.project}"${suiteFilter}.
1. Use list_builds to get builds with automation tests
2. Use get_test_results to check test execution status
3. Analyze security metrics:
   - Code security
   - Test security
   - Environment security
4. Compare against security gate thresholds
5. Identify security issues or bottlenecks
6. Show test automation security health metrics`;

    default:
      return `Unknown prompt template: ${promptName}`;
  }
}

/**
 * Configure prompts for the MCP server
 * @param server - The MCP server instance
 */
export function configurePrompts(server: Server) {
  // Handle list prompts request
  server.setRequestHandler(ListPromptsRequestSchema, async () => {
    return {
      prompts: Object.values(PROMPT_TEMPLATES).map(template => ({
        name: template.name,
        description: template.description,
        arguments: template.arguments
      }))
    };
  });

  // Handle get prompt request
  server.setRequestHandler(GetPromptRequestSchema, async (request) => {
    const { name, arguments: args = {} } = request.params;
    
    const template = Object.values(PROMPT_TEMPLATES).find(t => t.name === name);
    if (!template) {
      throw new Error(`Prompt '${name}' not found`);
    }

    // Validate required arguments
    for (const arg of template.arguments) {
      if (arg.required && !args[arg.name]) {
        throw new Error(`Missing required argument: ${arg.name}`);
      }
    }

    const content = generatePromptContent(name, args);

    return {
      description: template.description,
      messages: [
        {
          role: "user",
          content: {
            type: "text",
            text: content
          }
        }
      ]
    };
  });
} 