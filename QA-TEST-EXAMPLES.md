# 🧪 Ghid Complet QA & Testing - Azure DevOps MCP

## 📋 Exemple de utilizare pentru toate tool-urile de testare

### 1. **Test Plans**

#### Creează un plan de testare nou:
```
"Create a test plan called 'Release 3.0 Testing' in project Ecrion"
"Create test plan 'Sprint 45 QA' for project MHC with area path MHC\Frontend"
```

#### Listează planurile existente:
```
"Show all test plans in project Ecrion"
"List active test plans in project MHC"
```

### 2. **Test Suites**

#### Creează suite de teste:
```
"Create a test suite 'Login Tests' in test plan 123 for project Ecrion"
"Add a static test suite 'API Tests' to plan 456 in project MHC"
```

### 3. **Test Cases**

#### Creează test case-uri noi:
```
"Create a test case 'Verify user login with valid credentials' in project Ecrion with priority 1"
"Create test case 'Check password reset flow' with steps 'Click forgot password, Enter email, Check inbox' and expected result 'Reset email received'"
```

#### Adaugă test cases în suite:
```
"Add test cases 1001, 1002, 1003 to suite 500 in plan 123 for project Ecrion"
"Add test case 5678 to the Login Tests suite"
```

#### Listează test cases:
```
"Show all test cases in suite 500 of plan 123 in project Ecrion"
"List test cases from the regression suite"
```

### 4. **Execuție Teste**

#### Rulează test cases:
```
"Run test case 1001 in plan 123 suite 500 with outcome Passed"
"Execute test 5678 with result Failed and comment 'Button not visible on mobile'"
"Mark test case 999 as Blocked with comment 'Waiting for bug fix #12345'"
```

#### Vezi rezultate:
```
"Show test results for run 789"
"Get test results for build 5000 in project Ecrion"
```

### 5. **Release Management**

#### Listează și creează release-uri:
```
"List all release definitions in project Ecrion"
"Show releases for project MHC"
"Create a new release for definition 123 with description 'Hotfix 3.0.1'"
```

#### Deploy releases:
```
"Deploy release 456 to environment 2 in project Ecrion"
"Start deployment of release 789 to production"
```

### 6. **Wiki Operations**

#### Lucrează cu wiki:
```
"List all wikis in project Ecrion"
"Get wiki page /Testing/Guidelines from project wiki"
"Create wiki page /QA/TestPlan3.0 with content '# Test Plan for Release 3.0'"
"Update wiki page /Testing/Checklist with new test scenarios"
```

### 7. **Iterations & Areas**

#### Management sprint-uri:
```
"List all iterations in project Ecrion"
"Create iteration 'Sprint 46' from 2025-07-01 to 2025-07-14 in project MHC"
"Show all areas in project Ecrion"
"Create area 'QA\Automation' in project MHC"
```

## 🎯 Scenarii Complete de Utilizare

### Scenario 1: Pregătire pentru Release
```
1. "Create test plan 'Release 3.1 QA' in project Ecrion"
2. "Create test suite 'Smoke Tests' in the new plan"
3. "Create test case 'Verify application starts' with priority 1"
4. "Add the test case to the Smoke Tests suite"
5. "Create area 'Release 3.1' in project Ecrion"
```

### Scenario 2: Execuție Test Cycle
```
1. "List test cases in suite 500 of plan 123"
2. "Run test case 1001 with outcome Passed"
3. "Run test case 1002 with outcome Failed and comment 'Login button missing'"
4. "Create work item bug 'Login button missing on home page' in project Ecrion"
5. "Link work item [new bug ID] as related to test case 1002"
```

### Scenario 3: Raportare QA
```
1. "Get test results for build 5678"
2. "Search for work items 'failed test'"
3. "Create wiki page /QA/Reports/Build5678 with test results summary"
4. "Update wiki page /QA/Dashboard with latest test metrics"
```

## 📊 Metrici și Rapoarte

### Obține statistici:
```
"Show test results by build 5000 in project Ecrion"
"List all failed test cases in the last sprint"
"Get test plan execution status for plan 123"
```

## 🔧 Tips & Tricks

### 1. **Organizare eficientă:**
- Folosește areas pentru a grupa teste pe componente
- Creează iterations pentru fiecare sprint/release
- Folosește test suites pentru a organiza logic testele

### 2. **Automatizare:**
- Link-uiește test cases cu work items
- Folosește build IDs pentru a urmări rezultatele
- Documentează în wiki procesele de testare

### 3. **Best Practices:**
- Adaugă întotdeauna comentarii la test failures
- Folosește priorități pentru test cases critice
- Actualizează wiki-ul cu lecții învățate

## 🚨 Troubleshooting Comun

### Probleme frecvente:
1. **"Test plan not found"** - Verifică ID-ul planului
2. **"Cannot add test case to suite"** - Verifică că test case-ul există
3. **"Release deployment failed"** - Verifică permisiunile și environment ID

### Debug commands:
```
"List all test plans to find the correct ID"
"Show test case details for ID 1234"
"Get release definition details for ID 789"
```

---

**💡 Pro Tip:** Folosește aceste tool-uri împreună cu celelalte pentru un workflow complet:
- Creează bug-uri direct din test failures
- Link-uiește test cases cu requirements
- Generează release notes automat din test results 