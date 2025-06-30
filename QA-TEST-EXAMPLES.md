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