# 🚨 WHERE TO PUT YOUR .ENV FILE 🚨

## ✅ CORRECT Location:

```
ADOMCPLocalServer/
│
├── 📄 .env          ← ✅ YES! PUT IT HERE IN THE ROOT!
│
├── 📁 src/          ← ❌ NO! NOT HERE!
│   └── (source files)
│
├── 📁 dist/         ← ❌ NO! NOT HERE!
│   └── (compiled files)
│
├── 📄 package.json
├── 📄 README.md
├── 📄 install.bat
└── 📄 setup.bat
```

## 📝 What goes in the .env file:

```env
AZURE_DEVOPS_ORG=your-organization-name
AZURE_DEVOPS_PAT=your-personal-access-token
```

## ❌ Common Mistakes:

### Wrong Location 1:
```
ADOMCPLocalServer/
└── src/
    └── .env  ← ❌ WRONG! Too deep!
```

### Wrong Location 2:
```
ADOMCPLocalServer/
└── dist/
    └── .env  ← ❌ WRONG! This is for compiled files!
```

### Wrong Location 3:
```
C:/Users/YourName/.env  ← ❌ WRONG! Outside the project!
```

## 🔍 How to Check:

1. Open Cursor terminal (`` Ctrl+` ``)
2. Make sure you're in the ADOMCPLocalServer folder
3. Type:
   - Windows: `dir .env`
   - Mac/Linux: `ls -la .env`
4. You should see the .env file listed

## 💡 Quick Tips:

- The .env file starts with a dot (.)
- It has NO file extension after .env
- It should be in the SAME folder as package.json
- If you can't see it in Windows Explorer, enable "Show hidden files"

## 🆘 Still Confused?

Run this command in Cursor terminal:
```bash
node check-env.bat
```

It will tell you exactly where to put the .env file! 