# Azure DevOps Permissions Guide

## Why these specific permissions?

We ask for these permissions to make the MCP server work, but **nothing more**:

### ✅ Work Items (Read, Write & Manage)
- **Why:** To list, create, update work items and add comments
- **Can't:** Delete work items you don't own or change project settings

### ✅ Code (Read only)
- **Why:** To search code and list branches
- **Can't:** Push code, delete branches, or modify repositories

### ✅ Build (Read & Execute)
- **Why:** To run builds and check their status
- **Can't:** Delete build definitions or modify build settings

### ✅ Release (Read, Write & Execute)
- **Why:** To create and deploy releases
- **Can't:** Delete release definitions or modify environments you don't have access to

### ✅ Test Management (Read & Write)
- **Why:** To create test plans and run tests
- **Can't:** Delete test configurations or modify test settings

### ✅ Wiki (Read & Write)
- **Why:** To read and create wiki pages
- **Can't:** Delete wikis or change wiki permissions

## Important Safety Notes

1. **The token respects your Azure DevOps permissions**
   - If you can't delete something in the Azure DevOps web interface, the token can't either
   - If you only have read access to a project, the token only has read access

2. **You're always in control**
   - You can revoke the token anytime from Azure DevOps
   - The token expires (recommended: 90 days)
   - Each action still requires your command in Cursor

3. **What about "Full Access"?**
   - We don't recommend it - too many permissions
   - Custom defined is safer and follows principle of least privilege
   - Full access won't let you do anything you can't already do, but why risk it?

## Quick Permission Check

Run this after setup to see what you can access:
```
node test-connection.js
```

This will list your projects, confirming the token works and showing what you have access to. 