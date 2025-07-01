# ⚡ Quick Start Guide (2 minutes)

## Prerequisites
- ✅ [Cursor IDE](https://cursor.sh/) installed
- ✅ [Node.js](https://nodejs.org/) installed
- ✅ Access to Azure DevOps

## 3 Simple Steps

### 1️⃣ Clone & Build (in Cursor)
```bash
# In Cursor terminal (Ctrl+`)
git clone https://github.com/EreAlexandru/ADOMCPLocalServer.git
cd ADOMCPLocalServer
npm install
npm run build
```

### 2️⃣ Create .env file
Run `setup.bat` (Windows) or create `.env` file in root folder:
```
AZURE_DEVOPS_ORG=your-org-name
AZURE_DEVOPS_PAT=your-token
```

**⚠️ IMPORTANT:** The .env goes in the ROOT folder, not in src/ or dist/!

### 3️⃣ Add to Cursor
1. **File → Preferences → Cursor Settings → Tools & Integration**
2. Click **"New MCP Server"**
3. Paste (update the path!):
```json
{
  "mcpServers": {
    "azure-devops": {
      "command": "node",
      "args": ["C:/your/path/ADOMCPLocalServer/dist/index.js"]
    }
  }
}
```
4. **Restart Cursor**

## ✅ Test It!
In Cursor chat: *"List my Azure DevOps projects"*

---

**Having issues?** Run `check-env.bat` for diagnostics or see [full README](README.md). 