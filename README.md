# Azure DevOps MCP Server for Cursor 🚀

**Works with Cursor!** Unlike Microsoft's official server that blocks Cursor users, this one just works.

## What is this?

A tool that lets you control Azure DevOps directly from Cursor's AI chat. Just type what you want in plain English!

## 🎯 Examples of what you can say:

```
"Show my work items in project MyApp"
"Create a bug titled 'Login button broken' in project MyApp"
"List pull requests in the Frontend repository"
"Search for authentication code"
"Create a test plan for Q1 release"
```

## 📦 Super Easy Installation (5 minutes)

### Step 1: Get the files
```bash
git clone https://github.com/EreAlexandru/ADOMCPLocalServer.git
cd ADOMCPLocalServer
```

### Step 2: Install it

**Windows users:** Just double-click `install.bat`

**Mac/Linux users:** Run `./install.sh` or:
```bash
npm install
npm run build
```

### Step 3: Get your Azure DevOps token
1. Go to: https://dev.azure.com/YOUR-ORG-NAME/_usersSettings/tokens
2. Click **"+ New Token"**
3. Give it a name like "Cursor"
4. Under **Scopes**, select **"Custom defined"** and check these:
   - ✅ Work Items (Read, Write & Manage)
   - ✅ Code (Read)
   - ✅ Build (Read & Execute)
   - ✅ Release (Read, Write & Execute)
   - ✅ Test Management (Read & Write)
   - ✅ Wiki (Read & Write)
   
   **Note:** Don't worry - the token can only do what YOU have permission to do in Azure DevOps
   
   📖 [Why these permissions?](PERMISSIONS.md) (optional reading) 
5. Click **"Create"**
6. **COPY THE TOKEN NOW!** (you won't see it again)

### Step 4: Set up your credentials

**Windows users:** Just double-click `setup.bat` and enter your info

**Mac/Linux users:** Create a file called `.env` in the ADOMCPLocalServer folder:
```
AZURE_DEVOPS_ORG=your-organization-name
AZURE_DEVOPS_PAT=your-token-here
```

### Step 5: Tell Cursor where it is

1. Open Cursor
2. Go to **File → Preferences → Cursor Settings**
3. Find **"Tools & Integration"** in the left sidebar
4. Click **"New MCP Server"** button
5. Paste this JSON (change the path to match where you cloned it):

```json
{
  "mcpServers": {
    "azure-devops": {
      "command": "node",
      "args": ["C:/ADOMCPLocalServer/dist/index.js"]
    }
  }
}
```

**⚠️ PATH EXAMPLES:**
- **Windows:** `"C:/ADOMCPLocalServer/dist/index.js"` (use forward slashes!)
- **Mac:** `"/Users/yourname/ADOMCPLocalServer/dist/index.js"`
- **Wrong:** `"C:\ADOMCPLocalServer\dist\index.js"` ❌ (backslashes don't work)

### Step 6: Restart Cursor

Close and reopen Cursor. That's it! 🎉

## 🧪 Test it works

**Quick test (before opening Cursor):**
```bash
node test-connection.js
```
This will show your projects if everything is set up correctly.

**In Cursor:**
Open a new chat and type:
```
List my Azure DevOps projects
```

If you see your projects, it's working!

## 🆘 Troubleshooting

### "Command failed" or doesn't work
1. Did you run `npm run build`?
2. Is the path in settings.json correct?
3. Did you restart Cursor?

### "Authentication failed"
1. Is your organization name correct?
2. Is your PAT token correct?
3. Did the token expire?

### Still not working?
Check these files exist:
- `ADOMCPLocalServer/dist/index.js` 
- `ADOMCPLocalServer/.env`

## 💬 What you can ask Cursor to do

**Work Items:**
- "Show my active bugs"
- "Create a task called 'Fix homepage' in project MyApp"
- "Update work item 12345 to Done"
- "Add comment 'Fixed' to work item 12345"

**Code & PRs:**
- "Create a pull request from feature/login to main"
- "Show pull requests in MyApp"
- "Search for 'authentication' in code"

**Builds & Tests:**
- "Run build definition 123"
- "Show test results for latest build"
- "Create test plan for Sprint 5"

**And 30+ more commands!**

## 🔒 Is it safe?

Yes! 
- Runs only on YOUR computer
- Your token stays on YOUR computer
- No cloud servers involved
- Can only do what YOU already have permission to do in Azure DevOps
- Can't delete anything you don't have admin rights for
- Open source so you can check the code

## 📝 License

MIT - Do whatever you want with it!

---

**Not working?** Open an issue and I'll help: https://github.com/EreAlexandru/ADOMCPLocalServer/issues 