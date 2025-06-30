#!/bin/bash

echo "========================================"
echo "Azure DevOps MCP Server - Easy Installer"
echo "========================================"
echo ""

# Check if npm is installed
if ! command -v npm &> /dev/null; then
    echo "ERROR: Node.js/npm is not installed!"
    echo "Please install Node.js from https://nodejs.org first"
    exit 1
fi

echo "Installing Azure DevOps MCP Server..."
echo ""

# Install dependencies
echo "Step 1: Installing dependencies..."
npm install
if [ $? -ne 0 ]; then
    echo "ERROR: Failed to install dependencies"
    exit 1
fi

echo ""
echo "Step 2: Building the project..."
npm run build
if [ $? -ne 0 ]; then
    echo "ERROR: Failed to build project"
    exit 1
fi

echo ""
echo "========================================"
echo "INSTALLATION COMPLETE!"
echo "========================================"
echo ""
echo "Now you need to:"
echo ""
echo "1. Create a .env file in this folder with:"
echo "   AZURE_DEVOPS_ORG=your-org-name"
echo "   AZURE_DEVOPS_PAT=your-token"
echo ""
echo "2. In Cursor: Tools & Integration > New MCP Server > Paste this:"
echo "   {"
echo '     "mcpServers": {'
echo '       "azure-devops": {'
echo '         "command": "node",'
echo "         \"args\": [\"$PWD/dist/index.js\"]"
echo "       }"
echo "     }"
echo "   }"
echo ""
echo "3. Restart Cursor"
echo ""
echo "Press Enter to exit..."
read 