# 🔐 Azure DevOps Permissions Guide

## Why do I need a Personal Access Token (PAT)?

The PAT is like a password that lets the MCP server talk to Azure DevOps on your behalf. It runs **locally on your computer** and needs your permission to access Azure DevOps.

## 📋 Required Permissions (Step by Step)

When creating your PAT, select **"Custom defined"** and check these boxes:

### ✅ Work Items (Read, Write & Manage)
- **What it does:** View, create, update work items and comments
- **What it CAN'T do:** Delete work items you don't own

### ✅ Code (Read only)
- **What it does:** Search code, list branches and repositories
- **What it CAN'T do:** Push code or delete branches

### ✅ Build (Read & Execute)
- **What it does:** View builds and trigger new ones
- **What it CAN'T do:** Delete build definitions or change settings

### ✅ Release (Read, Write & Execute)
- **What it does:** Create and deploy releases
- **What it CAN'T do:** Delete pipelines or modify secured environments

### ✅ Test Management (Read & Write)
- **What it does:** Create test plans and run tests
- **What it CAN'T do:** Delete test configurations

### ✅ Wiki (Read & Write)
- **What it does:** Read and create wiki pages
- **What it CAN'T do:** Delete wikis or change permissions

## 🛡️ Security Facts

1. **The token respects YOUR permissions**
   - If you can't do something in Azure DevOps web, the token can't either
   - It's just like logging in as yourself

2. **100% Local**
   - Your token stays on YOUR computer
   - Never sent to any external servers
   - Only connects directly to Azure DevOps

3. **You control everything**
   - Revoke the token anytime from Azure DevOps
   - Set expiration (90 days recommended)
   - Each action still requires your command in Cursor

## ❓ Common Questions

**Q: Is it safe to put my token in the .env file?**
A: Yes! The .env file is:
- Only on your computer
- Ignored by Git (won't be uploaded)
- Standard practice for local development

**Q: What if someone gets my token?**
A: They can only do what YOU can do in Azure DevOps. Revoke it immediately if compromised.

**Q: Why not use "Full Access"?**
A: We follow the principle of least privilege - only request what's needed. Safer!

## 🧪 Test Your Permissions

After setup, run:
```bash
node test-connection.js
```

This will show exactly what projects you have access to! 