permalink: /docs/eslint-9-upgrade-guide/
categories: development
nav_order: 20
toc: true
parent: Getting Started
title: "ESLint 9 Upgrade: Migration Guide and Benefits"
date: 2025-08-24
description: Comprehensive guide to upgrading from ESLint 8 to ESLint 9 in the MIJUG .NET Workspace, including migration steps, benefits, and official resources.
lastmod: 2025-08-24T14:43:50.079Z
---


# ESLint 9 Upgrade: Migration Guide and Benefits

## Overview

This document details the changes made to upgrade the MIJUG .NET Workspace from ESLint 8 to ESLint 9, the benefits of the new version, and generic migration steps for similar projects. It also covers the new ESM globals behavior in Node.js 20+ and how to handle them for maximum compatibility and clarity.

## Why Upgrade to ESLint 9?

- **Performance:** ESLint 9 introduces a new flat config system, improving linting speed and memory usage.
- **Modern Syntax:** Full ES module (ESM) support, aligning with modern JavaScript/TypeScript best practices.
- **Zero-Warning Enforcement:** Enhanced rule strictness and better error reporting.
- **Improved Plugin Ecosystem:** Updated plugin APIs and compatibility with the latest TypeScript and JavaScript features.
- **Better IDE Integration:** Faster and more accurate linting in VS Code and other editors.

## ESM Globals in Node.js 20+

With Node.js 20 and later, the ESM (ECMAScript Module) environment now provides `__dirname` and `__filename` as globals, just like CommonJS. This means:

- You no longer need to polyfill or manually define `__dirname` or `__filename` in most scripts.
- Redeclaring these globals will cause lint errors (e.g., `no-redeclare`).
- For maximum compatibility, always use the global `__dirname` and avoid any redeclaration or fallback logic unless you must support older Node.js versions.

**Example:**

```js
// Good (Node.js 20+ ESM)
const PROJECT_ROOT = path.resolve(__dirname, '..');

// Bad (causes redeclaration error)
const __dirname = path.dirname(new URL(import.meta.url).pathname);
```

If you must support older Node.js versions, use a conditional global assignment, but for modern projects, prefer the global.

## Key Changes Applied

- Upgraded `eslint` and related plugins to version 9.x in `package.json`.
- Migrated configuration to the new [flat config system](https://eslint.org/docs/latest/use/configure/configuration-files-new){rel="noopener noreferrer" target="_blank"} (`eslint.config.js`).
- Updated all custom scripts and code to use ESM import/export syntax.
- Removed all CommonJS `require()` and `module.exports` patterns.
- Fixed all lint errors and warnings, including ESM-specific issues (e.g., `__dirname`/`__filename` handling).
- Ensured all scripts in `scripts/` are ESM-compatible and pass lint checks.
- Updated precheckin and CI scripts to enforce zero-warning policy.

## Generic Migration Steps

1. **Upgrade ESLint and Plugins:**
   - Update `eslint` and all plugins to the latest 9.x versions in `package.json`.
2. **Migrate to Flat Config:**
   - Replace `.eslintrc.*` with `eslint.config.js` using the [flat config format](https://eslint.org/docs/latest/use/configure/configuration-files-new){rel="noopener noreferrer" target="_blank"}.
3. **Update ESM Syntax:**
   - Refactor all scripts and config files to use `import`/`export`.
   - Remove CommonJS patterns and use the new ESM globals for `__dirname`/`__filename`.
4. **Fix Lint Errors:**
   - Run `eslint . --fix` and resolve all errors and warnings.
5. **Update CI/Precommit:**
   - Ensure all linting steps in CI and precommit hooks use the new config and pass with zero warnings.

## Official Documentation

- [ESLint 9 Migration Guide](https://eslint.org/docs/latest/upgrade-guide){rel="noopener noreferrer" target="_blank"}
- [Flat Config Reference](https://eslint.org/docs/latest/use/configure/configuration-files-new){rel="noopener noreferrer" target="_blank"}
- [ESLint ESM Support](https://eslint.org/docs/latest/use/configure/ecmascript-modules){rel="noopener noreferrer" target="_blank"}
- [ESLint Plugin Migration](https://eslint.org/docs/latest/developer-guide/working-with-plugins){rel="noopener noreferrer" target="_blank"}

---

**Last updated:** August 24, 2025
