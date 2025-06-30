/**
 * Central export file for all tool definitions
 * This consolidates all tool arrays from individual modules
 */

export { projectTools } from './projectTools.js';
export { workItemTools } from './workItemTools.js';
export { repositoryTools } from './repositoryTools.js';
export { buildTools } from './buildTools.js';
export { searchTools } from './searchTools.js';
export { testTools } from './testTools.js';
export { releaseTools } from './releaseTools.js';
export { wikiTools } from './wikiTools.js';
export { organizationTools } from './organizationTools.js';

// Aggregate all tools into a single array for easy access
import { projectTools } from './projectTools.js';
import { workItemTools } from './workItemTools.js';
import { repositoryTools } from './repositoryTools.js';
import { buildTools } from './buildTools.js';
import { searchTools } from './searchTools.js';
import { testTools } from './testTools.js';
import { releaseTools } from './releaseTools.js';
import { wikiTools } from './wikiTools.js';
import { organizationTools } from './organizationTools.js';

export const ALL_TOOLS = [
  ...projectTools,
  ...workItemTools,
  ...repositoryTools,
  ...buildTools,
  ...searchTools,
  ...testTools,
  ...releaseTools,
  ...wikiTools,
  ...organizationTools,
]; 