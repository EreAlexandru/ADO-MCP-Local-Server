# Installation Guide - Azure DevOps MCP Server for Cursor

## 🚀 Quick Start for Non-Technical Users

### Option 1: One-Click Install (Windows)
1. Download `install-windows.ps1` from this repository
2. Right-click and select "Run with PowerShell"
3. Follow the prompts to enter your Azure DevOps organization and PAT token
4. The installer will handle everything automatically!

### Option 2: Manual Installation

## Prerequisites
- Node.js 18+ (download from https://nodejs.org)
- Cursor IDE installed
- Azure DevOps account with a Personal Access Token (PAT)

## Step-by-Step Installation

### 1. Download the Server
You have two options:

**For Public Use (Recommended for individuals):**
```bash
git clone https://github.com/YOUR_USERNAME/azure-devops-mcp-cursor.git
cd azure-devops-mcp-cursor
```

**For Private Organization Use:**
- Fork the repository to your organization's GitHub
- Set repository to PRIVATE
- Clone from your private fork

### 2. Install Dependencies
Open a terminal in the project folder and run:
```bash
npm install
```

### 3. Build the Project
```bash
npm run build
```

### 4. Create Your Personal Access Token (PAT)

1. Go to: https://dev.azure.com/YOUR_ORGANIZATION/_usersSettings/tokens
2. Click "New Token"
3. Configure your token:
   - **Name**: "Cursor MCP Server"
   - **Expiration**: 90 days (recommended)
   - **Scopes**: Select "Custom defined" and check:
     - ✅ Work Items (Read & Write)
     - ✅ Code (Read)
     - ✅ Build (Read & Execute)
     - ✅ Release (Read, Write & Execute)
     - ✅ Test Management (Read & Write)
     - ✅ Wiki (Read & Write)
     - ✅ Project and Team (Read)
4. Click "Create" and **COPY THE TOKEN** (you won't see it again!)

### 5. Configure Environment Variables

**Windows (PowerShell):**
```powershell
[System.Environment]::SetEnvironmentVariable("AZURE_DEVOPS_ORG", "your-org-name", "User")
[System.Environment]::SetEnvironmentVariable("AZURE_DEVOPS_PAT", "your-pat-token", "User")
```

**macOS/Linux:**
Add to your `~/.bashrc` or `~/.zshrc`:
```bash
export AZURE_DEVOPS_ORG="your-org-name"
export AZURE_DEVOPS_PAT="your-pat-token"
```

### 6. Configure Cursor IDE

1. Open Cursor IDE
2. Go to Settings (Ctrl/Cmd + ,)
3. Search for "MCP"
4. Add this configuration:

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

**Important**: Replace `C:/path/to/azure-devops-mcp-cursor` with the actual path where you installed the server.

## 📝 Available Commands in Cursor

Once installed, you can use natural language commands like:
- "List all my Azure DevOps projects"
- "Show work items in project MyProject"
- "Create a bug in project MyProject with title 'Login button not working'"
- "Show pull requests in MyProject repository"
- "Create a test plan for the new feature"
- "Show wiki pages in project MyProject"

## ✅ Verification

To verify installation:
1. Restart Cursor IDE
2. Open a new chat
3. Type: "list my Azure DevOps projects"
4. You should see your projects listed!

## 🔧 Troubleshooting

### Common Issues

**"Command not found" or "Module not found"**
- Make sure you ran `npm run build`
- Verify the path in Cursor settings is correct
- Use forward slashes (/) even on Windows

## Cursor available commands:
- "List all Azure DevOps projects"
- "Show work items in project [ProjectName]"
- "Create a task in project [ProjectName] with title '[Title]'"
- "Get work item [ID]"
- "Update work item [ID] with state Done"
- "List pull requests in project [ProjectName] repository [RepoName]"

## Troubleshooting:
**"Token invalid?"** - Check PAT permissions
**"Not showing in Cursor?"** - Check the path in settings
**"Authentication errors?"** - Verify organization name 