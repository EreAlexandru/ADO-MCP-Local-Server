# Azure DevOps MCP Server - Copilot Instructions

## Overview
This project provides a Model Context Protocol (MCP) server for Azure DevOps integration with Cursor IDE. It enables natural language interactions with Azure DevOps services.

## Available Prompts (Guided Workflows)

The server includes pre-configured prompts for common workflows:

### 🏃‍♂️ Development & Team Management
1. **Daily Standup** (`daily_standup`) - Prepare for your daily standup meeting
2. **Sprint Planning** (`sprint_planning`) - Help with sprint planning activities
3. **Code Review** (`code_review`) - Find pull requests that need your review
4. **My Work** (`my_work`) - Get all your active work items
5. **Release Status** (`release_status`) - Check release pipeline status
6. **Bug Triage** (`bug_triage`) - Review and triage bugs
7. **Sprint Retrospective** (`sprint_retrospective`) - Gather data for sprint retrospective
8. **Build Health** (`build_health`) - Check build pipeline health and recent failures
9. **Work Item Dependencies** (`work_item_dependencies`) - Analyze work item dependencies and blockers
10. **Team Velocity** (`team_velocity`) - Calculate team velocity and capacity

### 🧪 QA Manual Testing
11. **Test Execution Status** (`test_execution_status`) - Check test execution status and progress
12. **Failed Tests Analysis** (`failed_tests_analysis`) - Analyze failed tests and common failure patterns
13. **Test Coverage Report** (`test_coverage_report`) - Generate test coverage and execution report
14. **Bug Quality Metrics** (`bug_quality_metrics`) - Analyze bug quality metrics and trends
15. **Regression Test Plan** (`regression_test_plan`) - Create regression test plan for release
16. **Test Environment Status** (`test_environment_status`) - Check test environment availability and health

### 🤖 QA Automation Testing
17. **Automation Test Results** (`automation_test_results`) - Analyze automated test results and trends
18. **Flaky Tests Detection** (`flaky_tests_detection`) - Identify flaky/unstable automated tests
19. **Automation Coverage Gap** (`automation_coverage_gap`) - Find manual tests that need automation
20. **Performance Test Analysis** (`performance_test_analysis`) - Analyze performance test results and trends
21. **Test Maintenance Report** (`test_maintenance_report`) - Generate test maintenance and health report

### 🚀 Cross-Functional QA
22. **Release Readiness Check** (`release_readiness_check`) - Complete release readiness assessment
23. **Defect Leakage Analysis** (`defect_leakage_analysis`) - Analyze defects found in production vs testing phases
24. **Test Data Management** (`test_data_management`) - Review test data setup and requirements

### Using Prompts in Cursor
Simply ask naturally:
- **For Developers:** "Help me prepare for standup in project Contoso"
- **For QA Manual:** "Show test execution status for our current sprint"
- **For QA Automation:** "Find flaky tests in our automation suite"
- **For Release Management:** "Check if we're ready for release"

The AI will automatically use the appropriate prompt template and guide you through the process.

## Available Tools

### Work Items (13 tools)
- `list_work_items` - List work items with optional WIQL query
- `wit_my_work_items` - Get work items assigned to me
- `wit_get_work_item` - Get a single work item by ID
- `wit_update_work_item` - Update work item fields
- `wit_create_work_item` - Create new work items
- `wit_add_work_item_comment` - Add comments to work items
- `wit_work_items_link` - Link work items together
- `wit_search_work_items` - Search work items by text
- `wit_run_query` - Run custom WIQL queries
- `wit_list_work_item_comments` - List comments on a work item
- `wit_get_work_items_for_iteration` - Get work items for a specific iteration

### Pull Requests & Repositories (12 tools)
- `repo_list_pull_requests_by_repo` - List PRs for a repository
- `repo_list_pull_requests_by_project` - List all PRs in a project
- `repo_create_pull_request` - Create new pull requests
- `repo_update_pull_request_status` - Update PR status
- `repo_get_pull_request_by_id` - Get PR details
- `repo_list_repos_by_project` - List repositories
- `repo_list_branches_by_repo` - List branches
- `repo_list_pull_request_threads` - List PR comment threads
- `repo_reply_to_comment` - Reply to PR comments
- `repo_resolve_comment` - Resolve PR comment threads

### Builds & Releases (7 tools)
- `run_build` - Trigger a new build
- `get_build_status` - Check build status
- `list_build_definitions` - List build definitions
- `list_release_definitions` - List release definitions
- `list_releases` - List releases
- `create_release` - Create a new release
- `deploy_release` - Deploy a release

### Test Management (9 tools)
- `create_test_plan` - Create test plans
- `list_test_plans` - List test plans
- `create_test_suite` - Create test suites
- `create_test_case` - Create test cases
- `add_test_cases_to_suite` - Add test cases to suites
- `list_test_cases` - List test cases in a suite
- `run_test_case` - Execute test cases
- `get_test_results` - Get test results
- `get_test_results_by_build` - Get test results for a build

### Other Tools
- `list_projects` - List all projects
- `get_project` - Get project details
- `search_code` - Search in code repositories
- `list_wikis` - List project wikis
- `get_wiki_page` - Read wiki pages
- `create_wiki_page` - Create wiki pages
- `update_wiki_page` - Update wiki pages
- `work_list_iterations` - List iterations
- `work_list_areas` - List areas
- `work_create_iteration` - Create iterations
- `work_create_area` - Create areas

## Common Workflows

### Daily Standup
```
1. "Show my active work items in project X"
2. "List work items I updated yesterday"
3. "Show blocked items assigned to me"
```

### Sprint Planning
```
1. "List unassigned items in the backlog for project X"
2. "Show all items for iteration 'Sprint 23'"
3. "Create tasks for user story #1234"
```

### Code Review
```
1. "Show active pull requests in project X"
2. "List PRs waiting for my review"
3. "Show PRs older than 3 days"
```

### Release Management
```
1. "Show latest builds for project X"
2. "Create a release from build #123"
3. "Deploy release to staging environment"
```

## Best Practices

1. **Always specify the project name** - Most commands need a project context
2. **Use work item IDs when available** - More precise than titles
3. **For searches, be specific** - Include relevant keywords
4. **Check permissions** - The tool respects your Azure DevOps permissions

## Error Handling

If you encounter errors:
- "Authentication failed" - Check your PAT token in .env file
- "Project not found" - Verify the project name spelling
- "Permission denied" - You don't have access to that resource
- "Rate limit" - Wait a moment, the server has built-in rate limiting

## Tips for Natural Language

Instead of memorizing tool names, use natural language:
- ✅ "Show my bugs in the Contoso project"
- ✅ "Create a task called 'Fix login issue'"
- ✅ "What pull requests need review?"
- ✅ "Run the CI build for main branch"

The AI will map your request to the appropriate tool automatically. 