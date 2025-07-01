# Azure DevOps MCP Server for Cursor 🚀

**Built specifically for Cursor IDE** - Control Azure DevOps with natural language!

## ⚡ What is this?

A tool that lets you talk to Azure DevOps in plain English, right from Cursor's chat. No commands to memorize!

**Examples:**
- *"Show my work items"*
- *"Create a bug for the login issue"*
- *"What PRs need my review?"*
- *"Run the main build"*

---

## 🚨 IMPORTANT: Do Everything in Cursor When Possible! 🚨

This guide assumes you're using **Cursor IDE**. If you don't have it yet, [download Cursor here](https://cursor.sh/).

---

## 📦 Installation Guide (5 minutes)

### 🎯 Step 1: Clone the Project **IN CURSOR**

1. Open **Cursor IDE**
2. Press `Ctrl+Shift+P` (or `Cmd+Shift+P` on Mac)
3. Type "Git: Clone" and select it
4. Paste: `https://github.com/EreAlexandru/ADOMCPLocalServer.git`
5. Choose where to save it (remember this location!)
6. Click "Open" when Cursor asks

**You're now in the project folder in Cursor!** ✅

### 🔨 Step 2: Install Dependencies **IN CURSOR**

1. In Cursor, press `` Ctrl+` `` to open the terminal
2. You should see something like `C:\...\ADOMCPLocalServer>`
3. Type these commands:
   ```bash
   npm install
   npm run build
   ```
4. Wait for it to finish (about 30 seconds)

**Alternative for Windows:** You can also double-click `install.bat` in the file explorer

### 🔑 Step 3: Get Your Azure DevOps Token

1. Open your browser and go to:
   ```
   https://dev.azure.com/YOUR-ORG-NAME/_usersSettings/tokens
   ```
   **Replace `YOUR-ORG-NAME` with your organization!**
   
   📍 **How to find your organization name:**
   - Look at your Azure DevOps URL
   - If it's `https://dev.azure.com/contoso/MyProject` → org is `contoso`
   - If it's `https://contoso.visualstudio.com/` → org is `contoso`

2. Click **"+ New Token"**
3. Name it: "Cursor MCP"
4. Expiration: 90 days (recommended)
5. Scopes: Click **"Custom defined"** then check:
   - ✅ Work Items (Read, Write & Manage)
   - ✅ Code (Read)
   - ✅ Build (Read & Execute)
   - ✅ Release (Read, Write & Execute)
   - ✅ Test Management (Read & Write)
   - ✅ Wiki (Read & Write)
6. Click **"Create"**
7. **COPY THE TOKEN NOW!** You won't see it again!

### 🔐 Step 4: Create .env File **IN THE RIGHT PLACE!**

#### ⚠️ CRITICAL: The .env file goes in the ROOT folder, NOT in src/ or dist/! ⚠️

**Option A: Using Cursor (Recommended)** 👈
1. In Cursor, right-click on the **root folder** (ADOMCPLocalServer)
2. Select "New File"
3. Name it exactly: `.env` (yes, starting with a dot!)
4. Paste this (replace with your values):
   ```
   AZURE_DEVOPS_ORG=your-organization-name
   AZURE_DEVOPS_PAT=your-token-from-step-3
   ```
5. Save with `Ctrl+S`

**Option B: Using setup.bat (Windows only)**
1. Double-click `setup.bat` in the root folder
2. Enter your organization name when asked
3. Paste your token when asked
4. It creates the .env file for you!

**Option C: Manual (if above doesn't work)**
1. Open Notepad
2. Paste:
   ```
   AZURE_DEVOPS_ORG=your-organization-name
   AZURE_DEVOPS_PAT=your-token-here
   ```
3. File → Save As
4. Navigate to the ADOMCPLocalServer folder (NOT src or dist!)
5. File name: `.env` (with the dot!)
6. Save as type: **All Files (*.*)**
7. Click Save

#### 📁 Correct File Structure:
```
ADOMCPLocalServer/
├── .env              ← YOUR .ENV FILE GOES HERE!
├── src/              ← NOT HERE!
├── dist/             ← NOT HERE!
├── package.json
├── install.bat
└── README.md
```

### 🔌 Step 5: Connect to Cursor

1. In Cursor, go to **File → Preferences → Cursor Settings**
2. In the left sidebar, find **"Tools & Integration"**
3. Click **"New MCP Server"**
4. **DELETE EVERYTHING** in the box and paste this:

```json
{
  "mcpServers": {
    "azure-devops": {
      "command": "node",
      "args": ["C:/PATH/TO/YOUR/ADOMCPLocalServer/dist/index.js"]
    }
  }
}
```

5. **IMPORTANT:** Replace `C:/PATH/TO/YOUR/` with your actual path!
   
   **How to find your path:**
   - In Cursor, look at the top of the window
   - Or right-click on any file → "Copy Path"
   - Use FORWARD SLASHES (/) not backslashes (\)
   
   **Examples:**
   - ✅ Windows: `"C:/Users/John/Projects/ADOMCPLocalServer/dist/index.js"`
   - ✅ Mac: `"/Users/john/Projects/ADOMCPLocalServer/dist/index.js"`
   - ❌ WRONG: `"C:\Users\John\..."` (backslashes don't work!)

6. Click outside the box to save

### 🔄 Step 6: Restart Cursor

**THIS IS REQUIRED!** Close Cursor completely and open it again.

### ✅ Step 7: Verify It Works

1. After restarting, go to **File → Preferences → Cursor Settings → Tools & Integration**
2. Find "azure-devops" in the list
3. **You should see a green dot ✅** = Connected!
4. Click on it to see all 60+ available tools

**No green dot?** See [Troubleshooting](#-troubleshooting)

### 🎉 Step 8: Test It!

1. Open a new chat in Cursor (Ctrl+L)
2. Type: "List my Azure DevOps projects"
3. You should see your projects!

---

## 🆘 Troubleshooting

### 🔍 Quick Diagnostic (Windows)
Double-click `check-env.bat` to automatically check your setup!

### ❌ Common Issues

**"No green dot / Not connected"**
1. Did you restart Cursor after adding the server?
2. Is your path correct in settings? (forward slashes!)
3. Did you run `npm run build`?
4. Is the .env file in the ROOT folder?

**"Authentication failed"**
1. Check your .env file location (must be in root folder!)
2. Is your organization name spelled correctly?
3. Did you copy the ENTIRE token?
4. Has your token expired?

**"Can't find .env file"**
- The .env file should be in the ROOT folder:
  ```
  ADOMCPLocalServer/.env ← HERE!
  NOT in:
  - ADOMCPLocalServer/src/.env ❌
  - ADOMCPLocalServer/dist/.env ❌
  ```

**To verify your .env location:**
1. In Cursor terminal, type: `dir .env` (Windows) or `ls -la .env` (Mac/Linux)
2. You should see the file listed

### 🧪 Test Your Connection
Run this in the Cursor terminal:
```bash
node test-connection.js
```

This will show:
- ✅ If your credentials work
- 📁 What projects you have access to
- ❌ Any connection errors

---

## 💬 What You Can Ask

Just type naturally in Cursor's chat:

**Daily Tasks:**
- "Show my active work items"
- "What did I work on yesterday?"
- "Create a bug for the login issue"

**Code Reviews:**
- "Show PRs waiting for my review"
- "Create a PR from feature/login to main"
- "What PRs are older than 3 days?"

**Builds & Releases:**
- "Run the CI build"
- "Show failed builds from today"
- "Deploy release to staging"

**Sprint Management:**
- "Show sprint 23 progress"
- "What items are blocked?"
- "Calculate team velocity"

---

## 🎪 Advanced: Guided Workflows

Ask for help with complex tasks:

### 👥 **For Development Teams:**
- "Help me prepare for standup"
- "Guide me through sprint planning"
- "Show sprint retrospective data"
- "Analyze build health"

### 🧪 **For QA Manual Testers:**
- "Show test execution status"
- "Analyze failed tests patterns"
- "Generate test coverage report"
- "Check test environment health"

### 🤖 **For QA Automation Engineers:**
- "Find flaky tests in automation"
- "Analyze automation test results"
- "Identify tests needing automation"
- "Show performance test trends"

### 🚀 **For Release Management:**
- "Check release readiness"
- "Analyze defect leakage"
- "Review test data requirements"

**Total: 24 guided workflows** covering development, manual testing, automation, and release management!

The AI will guide you step-by-step through each process!

---

## 🔒 Security

- ✅ Runs 100% locally on YOUR computer
- ✅ Your token never leaves your machine
- ✅ Can only do what YOU have permission for
- ✅ Open source - check the code yourself!

---

## 📝 For Developers

**Made changes?** Rebuild with:
```bash
npm run build
```

Then restart the server in Cursor settings (disable/enable).

---

## 🐛 Still Having Issues?

1. Make sure you're using **Cursor IDE** (not VS Code)
2. Check the .env file is in the **root folder**
3. Use **forward slashes** in the path
4. **Restart Cursor** after any changes

**Need help?** Open an issue: https://github.com/EreAlexandru/ADOMCPLocalServer/issues

---

**License:** MIT - Use it however you want! 🎉 