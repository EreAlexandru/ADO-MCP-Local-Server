# Security Guide for Azure DevOps MCP Server

## Overview
This document outlines the security measures and best practices for using the Azure DevOps MCP Server with Cursor IDE.

## Security Architecture

### 1. Local-Only Execution
- **No Cloud Hosting**: The server runs entirely on your local machine
- **No Network Exposure**: Uses stdio (standard input/output) instead of network ports
- **Process Isolation**: Runs as a child process of Cursor IDE

### 2. Authentication Security

#### PAT Token Protection
- **Environment Variable Storage**: PAT tokens are stored in environment variables, not in code
- **Never Logged**: The server never logs or displays your PAT token
- **Scoped Access**: Use PAT tokens with minimal required permissions

#### Recommended PAT Token Scopes
For full functionality, your PAT should have:
- **Work Items**: Read & Write
- **Code**: Read
- **Build**: Read & Execute
- **Release**: Read, Write & Execute
- **Test Management**: Read & Write
- **Wiki**: Read & Write
- **Project and Team**: Read

### 3. Data Security

#### No Data Storage
- The server doesn't store any data locally
- All operations are pass-through to Azure DevOps APIs
- No caching of sensitive information

#### Secure Communication
- All API calls use HTTPS
- TLS encryption for all Azure DevOps communications
- No plain-text transmission of credentials

### 4. Code Security

#### Input Validation
- All user inputs are validated before processing
- Prevents injection attacks
- Type-safe parameter handling

#### Error Handling
- Sensitive information is stripped from error messages
- No stack traces exposed to users
- Graceful failure modes

## Best Practices for Organizations

### 1. PAT Token Management
```bash
# Create a dedicated PAT for this tool
# Set expiration dates (recommended: 90 days)
# Use minimal required permissions

# Windows (PowerShell)
$env:AZURE_DEVOPS_PAT = "your-pat-token"
$env:AZURE_DEVOPS_ORG = "your-organization"

# Linux/Mac
export AZURE_DEVOPS_PAT="your-pat-token"
export AZURE_DEVOPS_ORG="your-organization"
```

### 2. Access Control
- Only install on authorized developer machines
- Use Azure DevOps project-level permissions
- Regular audit of PAT token usage

### 3. Network Security
- Ensure your machine has proper firewall rules
- Use VPN when accessing from outside corporate network
- Keep your OS and Node.js updated

## Security Checklist

Before using in your organization:

- [ ] Review PAT token permissions (use minimal required)
- [ ] Set PAT token expiration date
- [ ] Store PAT in environment variables (never in code)
- [ ] Review firewall and network policies
- [ ] Ensure Node.js is up to date
- [ ] Review Azure DevOps organization security policies
- [ ] Train users on secure usage

## Vulnerability Reporting

If you discover a security vulnerability:
1. Do NOT post it publicly
2. Email details to your organization's security team
3. Include steps to reproduce
4. Wait for confirmation before disclosure

## Compliance

This tool is designed to work within standard enterprise security policies:
- **SOC 2 Compliant**: When used with proper PAT management
- **GDPR Compliant**: No personal data is stored
- **ISO 27001 Compatible**: Follows security best practices

## Regular Security Tasks

### Weekly
- Review active PAT tokens
- Check for unusual API activity in Azure DevOps audit logs

### Monthly
- Update Node.js and dependencies
- Review and rotate PAT tokens
- Audit user access

### Quarterly
- Security assessment of deployment
- Update security documentation
- User security training

## Emergency Response

If a PAT token is compromised:
1. Immediately revoke the token in Azure DevOps
2. Generate a new token with minimal permissions
3. Update environment variables on all machines
4. Review Azure DevOps audit logs for suspicious activity
5. Notify your security team

## Additional Security Layers

### For High-Security Environments
1. Use dedicated service accounts for PAT tokens
2. Implement additional logging at OS level
3. Use application whitelisting
4. Deploy only on managed devices
5. Implement network segmentation

### Monitoring
- Enable Azure DevOps audit logging
- Monitor API usage patterns
- Set up alerts for unusual activity
- Regular security reviews

## Conclusion

The Azure DevOps MCP Server is designed with security as a priority. By following these guidelines and best practices, you can safely use it within your organization while maintaining compliance with security policies. 