# Azure DevOps MCP Server for Cursor

A custom MCP (Model Context Protocol) server for Azure DevOps that works perfectly with Cursor IDE, bypassing the limitations imposed by Microsoft on the official server.

## 🚀 Features

### 📁 **Project Management** (2 tools)
- ✅ **List Projects** - List all projects in the organization
- ✅ **Get Project** - Get details about a specific project

### 📋 **Work Items** (8 tools)
- ✅ **List Work Items** - List work items in a project
- ✅ **Create Work Item** - Create new work items (Task, Bug, User Story, etc.)
- ✅ **Get Work Item** - Get complete details about a work item
- ✅ **Update Work Item** - Update title, description, state, assignment
- ✅ **Search Work Items** - Search work items using Azure DevOps Search
- ✅ **Add Comment** - Add comments to work items
- ✅ **Link Work Items** - Create relationships between work items (Parent/Child, Related, etc.)
- ✅ **Custom WIQL Queries** - Run custom WIQL queries

### 🔀 **Pull Requests & Repos** (4 tools)
- ✅ **List Pull Requests** - View PRs in repository
- ✅ **Create Pull Request** - Create new PRs
- ✅ **Update PR Status** - Change status (complete, abandon, reactivate)
- ✅ **List Branches** - List all branches in a repository

### 🏗️ **Builds** (3 tools)
- ✅ **Run Build** - Trigger a build for a definition
- ✅ **Get Build Status** - Check the status of a build
- ✅ **List Build Definitions** - List all build definitions

### 🔍 **Search** (1 tool)
- ✅ **Search Code** - Search code across all repositories

### 🧪 **Test Plans & QA** (9 tools)
- ✅ **Create Test Plan** - Create test plans
- ✅ **List Test Plans** - List all test plans
- ✅ **Create Test Suite** - Create test suites
- ✅ **Create Test Case** - Create test cases with steps and expected results
- ✅ **Add Test Cases to Suite** - Add test cases to suites
- ✅ **List Test Cases** - List test cases in a suite
- ✅ **Run Test Case** - Execute test case and record results
- ✅ **Get Test Results** - Get results of a test run
- ✅ **Get Test Results by Build** - View test results for a build

### 🚀 **Release Management** (4 tools)
- ✅ **List Release Definitions** - List release definitions
- ✅ **List Releases** - List releases
- ✅ **Create Release** - Create a new release
- ✅ **Deploy Release** - Deploy release to an environment

### 📚 **Wiki** (4 tools)
- ✅ **List Wikis** - List all wikis
- ✅ **Get Wiki Page** - Read wiki page content
- ✅ **Create Wiki Page** - Create new wiki page
- ✅ **Update Wiki Page** - Update existing wiki page

### 📅 **Iterations & Areas** (4 tools)
- ✅ **List Iterations** - List all iterations/sprints
- ✅ **List Areas** - List all work areas
- ✅ **Create Iteration** - Create new iteration with dates
- ✅ **Create Area** - Create new area

### 🔑 **Authentication**
- ✅ **PAT Authentication** - Uses Personal Access Token
- ✅ **100% compatible with Cursor** - No artificial restrictions

## 📋 Requirements

- Node.js 18+ 
- NPM or Yarn
- An Azure DevOps Personal Access Token (PAT) with appropriate permissions
- Cursor IDE

## 🔧 Installation

See [INSTALL.md](INSTALL.md) for detailed installation instructions.

Quick start:
```bash
# Clone the repository
git clone https://github.com/YOUR_USERNAME/azure-devops-mcp-cursor.git
cd azure-devops-mcp-cursor

# Install dependencies
npm install

# Build the project
npm run build
```

## ⚙️ Configuration

### 1. Personal Access Token (PAT)

Create a PAT in Azure DevOps:
1. Go to Azure DevOps → User Settings → Personal Access Tokens
2. Click "New Token"
3. Select required permissions:
   - Work Items (Read, Write)
   - Code (Read)
   - Build (Read, Execute)
   - Release (Read, Write, Execute)
   - Test Management (Read, Write)
   - Wiki (Read, Write)
   - Project and Team (Read)
4. Copy the generated token

### 2. Set Environment Variables

**Windows (PowerShell):**
```powershell
[System.Environment]::SetEnvironmentVariable("AZURE_DEVOPS_ORG", "your-organization", "User")
[System.Environment]::SetEnvironmentVariable("AZURE_DEVOPS_PAT", "your-pat-token", "User")
```

**macOS/Linux:**
```bash
export AZURE_DEVOPS_ORG="your-organization"
export AZURE_DEVOPS_PAT="your-pat-token"
```

### 3. Configure Cursor MCP

Add to your Cursor settings:

```json
{
  "mcpServers": {
    "azure-devops": {
      "command": "node",
      "args": ["C:/path/to/azure-devops-mcp-cursor/dist/index.js"]
    }
  }
}
```

## 🎯 Usage in Cursor

After configuration and restarting Cursor, you'll have access to **41 Azure DevOps tools**:

### 📌 **Natural Language Command Examples:**

#### Work Items:
- "List all active bugs in project MyProject"
- "Create a new task in project MyProject with title 'Update documentation'"
- "Search for work items containing 'login issue'"
- "Add comment 'Fixed in latest build' to work item 183633"
- "Link work item 12345 as parent of 12346"

#### Pull Requests & Git:
- "Create a pull request from feature/new-login to develop in Frontend repository"
- "List all active pull requests in project MyProject"
- "Complete pull request #456 in repository Backend"
- "Show all branches in repository API"

#### Builds:
- "Run build definition 123 in project MyProject"
- "Check status of build 5678"
- "List all build definitions in project TeamProject"

#### Tests:
- "Create a test plan for Q4 release"
- "Add test case 'Login validation' to test suite 789"
- "Run test case 456 and mark it as passed"
- "Show test results for the latest build"

#### Releases:
- "Create a release from definition 'Production Deploy'"
- "Deploy release 123 to staging environment"
- "List all releases for project MyProject"

#### Wiki:
- "Show wiki page '/Getting-Started' in project MyProject"
- "Create wiki page '/API/Authentication' with content..."
- "Update wiki page '/Deployment-Guide' in project TeamProject"

#### Search:
- "Search for 'authentication' in all code files"
- "Find code containing 'login method' in project MyProject"

## 🔒 Security

- PAT tokens are stored as environment variables only
- No credentials are logged or stored in files
- All API calls use HTTPS
- Runs locally on your machine - no cloud hosting needed

See [SECURITY.md](SECURITY.md) for detailed security information.

## 🏢 For Organizations

### Distribution Options

1. **Private Fork** (Recommended)
   - Fork to your organization's GitHub
   - Set repository to PRIVATE
   - Customize for your needs

2. **Internal Package**
   - Publish to your internal NPM registry
   - Distribute via your package manager

3. **Pre-configured Installer**
   - Use the provided PowerShell installer
   - Customize for your organization

See [HOSTING-AND-DISTRIBUTION.md](HOSTING-AND-DISTRIBUTION.md) for details.

## 🐛 Troubleshooting

### "Organization not provided" Error
- Check that environment variable AZURE_DEVOPS_ORG is set

### "PAT not found" Error
- Verify environment variable AZURE_DEVOPS_PAT is set
- Restart Cursor after setting variables

### Authentication Errors
- Verify PAT has required permissions
- Check PAT hasn't expired
- Ensure organization name is correct

### Module Not Found
- Run `npm run build`
- Check the path in Cursor settings
- Use forward slashes (/) even on Windows

## 🔧 Development

For development mode:
```bash
npm run dev
```

To watch for changes:
```bash
npm run watch
```

## 📊 Complete Tool Reference

| Category | Tool | Description |
|----------|------|-------------|
| **Projects** | `list_projects` | List all projects |
| | `get_project` | Get project details |
| **Work Items** | `list_work_items` | List work items |
| | `create_work_item` | Create new work item |
| | `get_work_item` | Get work item details |
| | `update_work_item` | Update work item |
| | `search_work_items` | Search work items |
| | `add_work_item_comment` | Add comment |
| | `link_work_items` | Link work items |
| | `run_query` | Custom WIQL query |
| **Repos** | `list_pull_requests` | List PRs |
| | `create_pull_request` | Create new PR |
| | `update_pull_request_status` | Change PR status |
| | `list_branches` | List branches |
| **Builds** | `run_build` | Trigger build |
| | `get_build_status` | Build status |
| | `list_build_definitions` | List definitions |
| **Search** | `search_code` | Search in code |
| **Test Plans** | `create_test_plan` | Create test plan |
| | `list_test_plans` | List plans |
| | `create_test_suite` | Create suite |
| | `create_test_case` | Create test case |
| | `add_test_cases_to_suite` | Add to suite |
| | `list_test_cases` | List test cases |
| | `run_test_case` | Execute test |
| | `get_test_results` | Test results |
| | `get_test_results_by_build` | Results by build |
| **Releases** | `list_release_definitions` | List definitions |
| | `list_releases` | List releases |
| | `create_release` | Create release |
| | `deploy_release` | Deploy release |
| **Wiki** | `list_wikis` | List wikis |
| | `get_wiki_page` | Read page |
| | `create_wiki_page` | Create page |
| | `update_wiki_page` | Update page |
| **Organization** | `list_iterations` | List iterations |
| | `list_areas` | List areas |
| | `create_iteration` | Create iteration |
| | `create_area` | Create area |

## 📝 License

MIT

## 🤝 Contributing

Contributions are welcome! Please open an issue or submit a pull request.

---

**Note:** This MCP server was created as an alternative to the official Microsoft Azure DevOps MCP server, which appears to have artificial restrictions for Cursor IDE. This implementation provides full functionality without any artificial limitations. 