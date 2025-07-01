# 🧪 Complete QA & Testing Guide - Azure DevOps MCP

## 📋 Usage examples for all testing tools

### 1. **Test Plans**

#### Create a new test plan:
```
"Create a test plan called 'Release 3.0 Testing' in project MyProject"
"Create test plan 'Sprint 45 QA' for project ProjectAlpha with area path ProjectAlpha\Frontend"
```

#### List existing plans:
```
"Show all test plans in project MyProject"
"List active test plans in project ProjectAlpha"
```

### 2. **Test Suites**

#### Create test suites:
```
"Create a test suite 'Login Tests' in test plan 123 for project MyProject"
"Add a static test suite 'API Tests' to plan 456 in project ProjectAlpha"
```

### 3. **Test Cases**

#### Create new test cases:
```
"Create a test case 'Verify user login with valid credentials' in project MyProject with priority 1"
"Create test case 'Check password reset flow' with steps 'Click forgot password, Enter email, Check inbox' and expected result 'Reset email received'"
```

#### Add test cases to suites:
```
"Add test cases 1001, 1002, 1003 to suite 500 in plan 123 for project MyProject"
"Add test case 5678 to the Login Tests suite"
```

#### List test cases:
```
"Show all test cases in suite 500 of plan 123 in project MyProject"
"List test cases from the regression suite"
```

### 4. **Test Execution**

#### Run test cases:
```
"Run test case 1001 in plan 123 suite 500 with outcome Passed"
"Execute test 5678 with result Failed and comment 'Button not visible on mobile'"
"Mark test case 999 as Blocked with comment 'Waiting for bug fix #12345'"
```

#### View results:
```
"Show test results for run 789"
"Get test results for build 5000 in project MyProject"
```

### 5. **Release Management**

#### List and create releases:
```
"List all release definitions in project MyProject"
"Show releases for project ProjectAlpha"
"Create a new release for definition 123 with description 'Hotfix 3.0.1'"
```

#### Deploy releases:
```
"Deploy release 456 to environment 2 in project MyProject"
"Start deployment of release 789 to production"
```

### 6. **Wiki Operations**

#### Work with wikis:
```
"List all wikis in project MyProject"
"Get wiki page /Testing/Guidelines from project wiki"
"Create wiki page /QA/TestPlan3.0 with content '# Test Plan for Release 3.0'"
"Update wiki page /Testing/Checklist with new test scenarios"
```

### 7. **Iterations & Areas**

#### Sprint management:
```
"List all iterations in project MyProject"
"Create iteration 'Sprint 46' from 2024-07-01 to 2024-07-14 in project ProjectAlpha"
"Show all areas in project MyProject"
"Create area 'QA\Automation' in project ProjectAlpha"
```

## 🎯 Complete Usage Scenarios

### Scenario 1: Release Preparation
```
1. "Create test plan 'Release 3.1 QA' in project MyProject"
2. "Create test suite 'Smoke Tests' in the new plan"
3. "Create test case 'Verify application starts' with priority 1"
4. "Add the test case to the Smoke Tests suite"
5. "Create area 'Release 3.1' in project MyProject"
```

### Scenario 2: Test Cycle Execution
```
1. "List test cases in suite 500 of plan 123"
2. "Run test case 1001 with outcome Passed"
3. "Run test case 1002 with outcome Failed and comment 'Login button missing'"
4. "Create work item bug 'Login button missing on home page' in project MyProject"
5. "Link work item [new bug ID] as related to test case 1002"
```

### Scenario 3: QA Reporting
```
1. "Get test results for build 5678"
2. "Search for work items 'failed test'"
3. "Create wiki page /QA/Reports/Build5678 with test results summary"
4. "Update wiki page /QA/Dashboard with latest test metrics"
```

## 📊 Metrics & Reports

### Get statistics:
```
"Show test results by build 5000 in project MyProject"
"List all failed test cases in the last sprint"
"Get test plan execution status for plan 123"
```

## 🔧 Tips & Tricks

### 1. **Efficient Organization:**
- Use areas to group tests by components
- Create iterations for each sprint/release
- Use test suites to logically organize tests

### 2. **Automation:**
- Link test cases with work items
- Use build IDs to track results
- Document testing processes in wiki

### 3. **Best Practices:**
- Always add comments to test failures
- Use priorities for critical test cases
- Update wiki with lessons learned

## 🚨 Common Troubleshooting

### Frequent issues:
1. **"Test plan not found"** - Verify the plan ID
2. **"Cannot add test case to suite"** - Verify that the test case exists
3. **"Release deployment failed"** - Check permissions and environment ID

### Debug commands:
```
"List all test plans to find the correct ID"
"Show test case details for ID 1234"
"Get release definition details for ID 789"
```

---

**💡 Pro Tip:** Use these tools together with others for a complete workflow:
- Create bugs directly from test failures
- Link test cases with requirements
- Generate release notes automatically from test results

# 🧪 QA Testing Examples with Azure DevOps MCP

This document provides practical examples of how QA Engineers can use the Azure DevOps MCP Server prompts.

## 📋 Manual Testing Examples

### Example 1: Daily Test Status Check
**Prompt:** `test_execution_status`
**Parameters:**
- project: "MyWebApp"
- testPlanId: "123" (optional)

**What it does:**
1. Lists all test plans in the project
2. Shows test case execution status (Passed/Failed/Blocked/Not Run)
3. Calculates completion percentages
4. Identifies testing bottlenecks

**Sample Output:**
```
Test Plan: Sprint 23 Regression (ID: 123)
├── Total Test Cases: 150
├── Executed: 120 (80%)
├── Passed: 95 (79%)
├── Failed: 15 (13%)
├── Blocked: 10 (8%)
└── Not Run: 30 (20%)

⚠️ Bottlenecks Identified:
- API Testing Suite: 5 blocked tests
- UI Regression: 3 days behind schedule
```

### Example 2: Bug Quality Analysis
**Prompt:** `bug_quality_metrics`
**Parameters:**
- project: "MyWebApp"
- days: 30
- areaPath: "MyWebApp/Frontend" (optional)

**What it does:**
1. Analyzes bugs created in the last 30 days
2. Calculates discovery rate and resolution time
3. Shows severity distribution
4. Identifies high-bug areas

**Sample Output:**
```
Bug Quality Metrics (Last 30 Days)
├── Total Bugs: 45
├── Discovery Rate: 1.5 bugs/day
├── Avg Resolution Time: 3.2 days
├── Severity Distribution:
│   ├── Critical: 2 (4%)
│   ├── High: 8 (18%)
│   ├── Medium: 25 (56%)
│   └── Low: 10 (22%)
└── Top Bug Areas:
    ├── Frontend/Login: 12 bugs
    ├── API/Authentication: 8 bugs
    └── Database/Queries: 6 bugs
```

## 🤖 Automation Testing Examples

### Example 3: Flaky Test Detection
**Prompt:** `flaky_tests_detection`
**Parameters:**
- project: "MyWebApp"
- buildDefinitionId: "456" (optional)

**What it does:**
1. Analyzes last 30 builds for test consistency
2. Identifies tests with inconsistent pass/fail rates
3. Ranks by flakiness score
4. Suggests common patterns and fixes

**Sample Output:**
```
Flaky Tests Report (Last 30 Builds)
├── Total Tests Analyzed: 1,250
├── Stable Tests: 1,180 (94.4%)
├── Flaky Tests: 70 (5.6%)

🎯 Top 5 Flaky Tests:
1. LoginTest.testPasswordReset (Flakiness: 35%)
   └── Pattern: Timeout issues, network dependency
2. CartTest.testCheckoutFlow (Flakiness: 28%)
   └── Pattern: Race conditions, async operations
3. SearchTest.testFilterResults (Flakiness: 22%)
   └── Pattern: Data dependency, test order
```

### Example 4: Automation Coverage Gap
**Prompt:** `automation_coverage_gap`
**Parameters:**
- project: "MyWebApp"
- testSuiteId: "789" (optional)

**What it does:**
1. Compares manual test cases with automated coverage
2. Identifies repetitive manual tests
3. Prioritizes automation candidates
4. Estimates effort and ROI

**Sample Output:**
```
Automation Coverage Gap Analysis
├── Total Manual Tests: 300
├── Automated Tests: 180
├── Coverage: 60%
├── Gap: 120 manual tests

🔄 Top Automation Candidates:
1. Login Flow Tests (15 manual tests)
   ├── Frequency: Daily execution
   ├── Business Value: Critical
   ├── Effort: 2 weeks
   └── ROI: High
2. Form Validation Tests (12 manual tests)
   ├── Frequency: Every sprint
   ├── Business Value: High
   ├── Effort: 1 week
   └── ROI: Medium
```

## 🔄 CI/CD & PR Integration Examples

### Example 5: PR Impact Analysis
**Prompt:** `automation_pr_analysis`
**Parameters:**
- project: "MyWebApp"
- repository: "frontend-app" (optional)
- days: 7

**What it does:**
1. Analyzes PRs from the last 7 days
2. Identifies test changes and impact
3. Shows test coverage changes
4. Finds automation opportunities

**Sample Output:**
```
PR Impact Analysis (Last 7 Days)
├── Total PRs: 15
├── PRs with Test Changes: 8 (53%)
├── Test Coverage Impact:
│   ├── Increased: 5 PRs (+2.3% avg)
│   ├── Decreased: 2 PRs (-1.1% avg)
│   └── No Change: 8 PRs

🔍 High Impact PRs:
1. PR #234: "Add payment validation"
   ├── Test Files Changed: 3
   ├── New Tests Added: 12
   ├── Coverage Change: +5.2%
   └── Risk Level: Medium
2. PR #235: "Refactor user service"
   ├── Test Files Changed: 8
   ├── Tests Removed: 5
   ├── Coverage Change: -2.1%
   └── Risk Level: High ⚠️
```

### Example 6: PR Quality Gate Check
**Prompt:** `pr_quality_gate`
**Parameters:**
- project: "MyWebApp"
- pullRequestId: 234
- repository: "frontend-app"

**What it does:**
1. Checks if PR meets quality gates
2. Validates test coverage thresholds
3. Verifies security compliance
4. Provides merge recommendation

**Sample Output:**
```
PR #234 Quality Gate Assessment
├── PR Title: "Add payment validation"
├── Author: john.doe@company.com
├── Target Branch: main

✅ Quality Gates Status:
├── ✅ Test Coverage: 85.2% (>80% required)
├── ✅ All Tests Pass: 127/127 passed
├── ✅ Code Quality: A rating
├── ✅ Security Scan: No vulnerabilities
├── ❌ Code Review: 1/2 approvals
└── ⚠️ Merge Conflicts: 2 files

🚦 Recommendation: HOLD
└── Reason: Missing required approval, resolve conflicts
```

### Example 7: CI/CD Pipeline Health
**Prompt:** `test_automation_ci_health`
**Parameters:**
- project: "MyWebApp"
- buildDefinitionId: 456

**What it does:**
1. Monitors build success rates
2. Analyzes test execution times
3. Identifies pipeline bottlenecks
4. Shows resource utilization

**Sample Output:**
```
CI/CD Pipeline Health Report
├── Pipeline: "MyWebApp-CI" (ID: 456)
├── Timeframe: Last 30 builds
├── Success Rate: 87% (26/30 builds)

📊 Performance Metrics:
├── Avg Build Time: 12.5 minutes
├── Avg Test Time: 8.2 minutes (66% of build)
├── Queue Time: 2.1 minutes avg
└── Resource Usage: 75% capacity

🏗️ Build Trends:
├── Week 1: 90% success (9/10)
├── Week 2: 85% success (8.5/10)
├── Week 3: 86% success (8.6/10)

⚠️ Issues Identified:
1. Test execution time increasing (+15% vs last month)
2. 3 builds failed due to flaky tests
3. Peak hours causing queue delays
```

### Example 8: Test Impact for Specific PR
**Prompt:** `pr_test_impact_analysis`
**Parameters:**
- project: "MyWebApp"
- pullRequestId: 234
- repository: "frontend-app"

**What it does:**
1. Analyzes which tests should run for the PR
2. Smart test selection based on changes
3. Risk-based test prioritization
4. Execution time optimization

**Sample Output:**
```
Test Impact Analysis for PR #234
├── Files Changed: 8
├── Lines Changed: +156, -43
├── Components Affected: Payment, Validation, UI

🎯 Recommended Test Execution:
├── Critical Tests (Must Run): 25 tests
│   ├── PaymentServiceTests: 12 tests (6 min)
│   ├── ValidationTests: 8 tests (3 min)
│   └── IntegrationTests: 5 tests (8 min)
├── High Priority: 45 tests (15 min)
├── Medium Priority: 78 tests (25 min)
└── Low Priority: 120 tests (35 min)

⚡ Optimization Suggestions:
├── Run Critical + High Priority: 70 tests (32 min)
├── Parallel execution: Reduce to 18 min
├── Risk Coverage: 95% with 28% of full suite
└── Estimated Time Saved: 67 minutes
```

## 🚀 Release Management Examples

### Example 9: Release Readiness Check
**Prompt:** `release_readiness_check`
**Parameters:**
- project: "MyWebApp"
- releaseId: 123

**What it does:**
1. Comprehensive release assessment
2. Test execution completeness check
3. Defect analysis
4. Go/no-go recommendation

**Sample Output:**
```
Release Readiness Assessment - v2.1.0
├── Release ID: 123
├── Target Date: 2024-01-15
├── Current Status: In Progress

✅ Test Execution Status:
├── ✅ Regression Tests: 145/145 (100%)
├── ✅ Performance Tests: 25/25 (100%)
├── ✅ Security Tests: 18/18 (100%)
├── ⚠️ UAT Tests: 28/35 (80%)

🐛 Defect Analysis:
├── Total Open: 8
├── Critical: 0 ✅
├── High: 1 ⚠️ (blocking)
├── Medium: 4
└── Low: 3

🌐 Environment Status:
├── ✅ Staging: Deployed v2.1.0-rc3
├── ✅ Pre-prod: Deployed v2.1.0-rc3
├── ✅ Performance: Tests passed

🚦 Recommendation: NO-GO
└── Blockers: 1 high priority defect, UAT incomplete
```

### Example 10: Security & Compliance Check
**Prompt:** `test_automation_security`
**Parameters:**
- project: "MyWebApp"
- testSuite: "SecurityTests"

**What it does:**
1. Security gate validation
2. Compliance requirement checks
3. Vulnerability scanning results
4. Security test coverage analysis

**Sample Output:**
```
Security & Compliance Report
├── Test Suite: SecurityTests
├── Last Scan: 2024-01-10 14:30 UTC
├── Compliance Framework: SOC2, GDPR

🔒 Security Tests Status:
├── ✅ Authentication Tests: 15/15 passed
├── ✅ Authorization Tests: 12/12 passed
├── ✅ Input Validation: 28/28 passed
├── ✅ SQL Injection: 8/8 passed
├── ⚠️ XSS Protection: 9/10 passed (1 warning)

🛡️ Vulnerability Scan:
├── Critical: 0 ✅
├── High: 0 ✅
├── Medium: 2 ⚠️
├── Low: 5
└── Info: 12

📋 Compliance Status:
├── ✅ Data Encryption: Compliant
├── ✅ Access Controls: Compliant
├── ✅ Audit Logging: Compliant
├── ⚠️ Data Retention: 1 policy violation

🎯 Action Items:
1. Fix XSS warning in user profile form
2. Address 2 medium vulnerabilities
3. Update data retention policy for user logs
```

---

## 💡 Tips for Using These Examples

### 🎯 Customize Parameters
- Replace "MyWebApp" with your actual project name
- Use real test plan IDs, PR numbers, and build definitions
- Adjust timeframes (days) based on your needs

### 🔄 Chain Workflows
1. Start with broad analysis (test_execution_status)
2. Drill down into specific issues (failed_tests_analysis)
3. Take action based on findings

### 📊 Regular Monitoring
- Set up daily: test execution status
- Weekly: automation results, flaky tests
- Per PR: quality gates, test impact
- Per release: readiness checks

### 🚀 Integration with CI/CD
- Use PR quality gates in your merge policies
- Automate test impact analysis in PR workflows
- Monitor pipeline health continuously
- Set up alerts for quality metric thresholds

**Need more examples?** Just ask in natural language and the AI will guide you! 🎉 