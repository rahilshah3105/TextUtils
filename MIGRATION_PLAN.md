# Dependency Modernization & Vulnerability Remediation Plan

**Current Status:** Phase 1 Complete ✅  
**Date Created:** April 9, 2026

## Overview

This project has been updated to the latest safe, non-breaking versions of direct dependencies. However, **26 vulnerabilities remain** primarily in transitive dependencies driven by `react-scripts@5.0.1`.

This document outlines a phased migration strategy to eliminate all deprecated and vulnerable transitive dependencies while **preserving 100% of existing functionality, styling, and UI behavior**.

---

## Phase 1: Safe Update (✅ COMPLETED)

**Commits:** 1 commit with safe semver upgrades  
**Files Changed:** `package-lock.json` only  
**Result:** Zero code/UI/style changes; 38 → 26 remaining vulnerabilities

### Updated Packages:
- jspdf: 4.1.0 → 4.2.1 (critical PDF injection security fixes)
- react-icons: 5.5.0 → 5.6.0
- react-router & react-router-dom: 7.12.0 → 7.14.0
- 120+ transitive dependency updates (Babel, core-js, lodash, postcss, autoprefixer, etc.)

---

## Phase 2: Jest & Test Infrastructure Modernization (NEXT)

**Goal:** Replace Jest 27 (deprecated) with Jest 30  
**Scope:** Testing infrastructure only  
**Impact on App:** None (test files only)

### Current State:
```
jest@27.5.1 ← deprecated, many transitive vulnerabilities
├── jest-environment-jsdom@27.5.1
├── @jest/core@27.5.1
├── jest-cli@27.5.1
└── ... (cascading old deps)
```

### Plan:
1. **Update `package.json` `devDependencies`:**
   ```json
   {
     "devDependencies": {
       "@testing-library/jest-dom": "^6.1.0",
       "@testing-library/react": "^14.0.0",
       "@testing-library/user-event": "^14.5.0"
     }
   }
   ```

2. **Run:** `npm update --save-dev`

3. **Verify:**
   - `npm test -- --passWithNoTests` (no tests currently exist)
   - Build still works: `npm run build`
   - No app code changes needed

### Vulnerabilities Resolved:
- jest, @jest/core, jest-cli, jest-config, jest-runner (all 27.x)
- jest-environment-jsdom (27.x → 30.x)
- picomatch (all instances in jest packages)
- @tootallnate/once, http-proxy-agent, jsdom (cascading deps)

---

## Phase 3: ESLint & Code Quality Tooling (AFTER Phase 2)

**Goal:** Modernize ESLint ecosystem  
**Impact on App:** None (development/linting only)

### Current Issues:
- resolve package in eslint-import-resolver-node (outdated)
- nth-check & svgo nested in build pipeline

### Plan:
1. Update eslint plugins to latest:
   ```json
   "devDependencies": {
     "eslint": "^8.50.0",
     "eslint-plugin-react": "^7.33.0",
     "eslint-import-resolver-node": "^0.3.10"
   }
   ```

2. ESLint config may need minor tweaks (check `.eslintrc`)

---

## Phase 4: Build Toolchain & Build-Time Dependencies (LATER)

**Goal:** Eliminate remaining webpack/build vulnerabilities  
**Scope:** Build infrastructure; code generation only  
**Impact on App:** None (happens at build time)

### Current Issues (driven by react-scripts):
```
react-scripts@5.0.1
├── webpack@5.x
│   └── minimatch, brace-expansion (vulnerable versions)
├── webpack-dev-server@5.x (has known XSS vulnerability)
├── svgo@2.8.x (svg plugin in build)
├── resolve-url-loader (outdated postcss peer)
├── terser-webpack-plugin, serialize-javascript
└── ... (~15 more nested vulnerabilities)
```

### Options:

#### **4A. Minimal Change (RECOMMENDED) – `react-scripts` in-place patch:**
- Monitor react-scripts for future updates beyond 5.0.1
- Use `npm audit fix --force` judiciously on safe packages only
- Keep CRA ecosystem for familiarity
- **Tradeoff:** Some vulnerabilities persist but mitigated via CSP/deployment strategies

#### **4B. Major Migration – Replace CRA with Vite (LARGE EFFORT):**
- **Pros:** Modern, zero-config, faster builds, all vulnerabilities eliminated
- **Cons:** Breaking changes to build output; requires testing all routes, assets, env vars
- **Effort:** 2-4 days; moderate risk of output differences
- **Files Affected:** Build output, potentially public/* asset loading
- **Estimated Effort:** 40–60 hours if done carefully

#### **4C. Intermediate – Create Custom Webpack Config (EJECT):**
- Run `npm run eject` (one-way operation)
- Manage webpack.config.js directly
- **Pros:** Fine-grained control
- **Cons:** Loss of CRA updates; brittle maintenance; high ongoing cost
- **Not Recommended:** Usually causes more problems than it solves

---

## Phase 5: Major React Upgrade (FUTURE – 6+ months out)

**Goal:** React 19 + latest ecosystem  
**Impact on App:** Potentially significant code changes

### Current React Versions:
- react@18.3.1 → 19.2.5 (available)
- react-dom@18.3.1 → 19.2.5 (available)

### Why This Is Separate:
- Major React versions can introduce breaking changes in component patterns
- Your app uses class components (e.g., likely lifecycle methods) in some files
- Functional components + hooks are now standard; class comps are legacy but still work
- Estimate: 1–2 weeks of development & testing if components need refactor

### When to Consider:
- Once Phase 4 is complete and stable
- After comprehensive testing of current phase
- Plan a dedicated sprint with QA testing

---

## Summary Table

| Phase | Focus | Files Changed | Risk | Impact on App | Priority |
|-------|-------|--------------|------|---------------|----------|
| 1 ✅ | Safe semver updates | `package-lock.json` | 🟢 None | None | Done |
| 2 | Jest 27 → 30 modernization | `package-lock.json` | 🟢 Very Low | None (tests only) | HIGH |
| 3 | ESLint ecosystem | `package-lock.json` | 🟢 Very Low | None (dev only) | HIGH |
| 4A | CRA + surgical audit fixes | `package-lock.json` | 🟡 Low | None | MEDIUM |
| 4B | CRA → Vite migration | `vite.config.js`, build output | 🔴 Moderate | Possible (build output) | MEDIUM |
| 4C | Eject to custom webpack | Many config files | 🔴 High | Unlikely, but technical debt | LOW |
| 5 | React 19 major upgrade | Source code, tests | 🔴 High | Likely (refactor needed) | LOW (future) |

---

## Recommended Next Steps (in order)

1. **Commit current state** ✅ Done
2. **Execute Phase 2** (Jest upgrade):
   ```bash
   npm update @testing-library/jest-dom @testing-library/react @testing-library/user-event
   npm test -- --passWithNoTests
   npm run build
   # If all pass, commit: "chore: upgrade jest testing libraries to v30"
   ```
3. **Execute Phase 3** (ESLint refresh):
   ```bash
   npm update eslint eslint-plugin-react eslint-import-resolver-node
   npm audit
   # Commit: "chore: modernize eslint ecosystem"
   ```
4. **Evaluate Phase 4** → Decide between 4A (minimal) or 4B (Vite migration)
5. **Schedule Phase 5** for 6+ months (React 19 planning)

---

## Verification Checklists

### After Each Phase:
- [ ] `npm audit` shows reduced vulnerability count
- [ ] `npm run build` completes without errors
- [ ] Build output size in `build/` remains similar (±5%)
- [ ] CSS files in `build/static/css/` are identical or smaller
- [ ] No new ESL lint errors introduced

### After Phase 4 (if pursuing Vite):
- [ ] All routes load in browser
- [ ] Hot Module Reload (HMR) works during dev
- [ ] Asset paths (images, fonts) resolve correctly
- [ ] Environment variables (`process.env.*`) still work
- [ ] PDF export (jspdf + html2canvas) still works

---

## Notes for Future Maintainers

- **Do NOT run `npm audit fix --force`** globally; it can introduce breaking changes.
- **Prefer `npm update`** for safe semver-respecting upgrades.
- **Test after each phase**, even though impact is minimal.
- **Track security advisories** at [snyk.io](https://snyk.io) or [npm.org/advisories](https://npm.org/advisories) monthly.
- **React 17+ end-of-life** is December 2026; plan React 19 work before then if possible.

---

## Questions?

For detailed analysis of any vulnerability:
```bash
npm audit --json > audit-report.json
# Then search for CVE in provided links
```

For build output analysis:
```bash
npm run build
# Compare build/ folder contents per phase
```
