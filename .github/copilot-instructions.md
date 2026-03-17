# GitHub Copilot Instructions for USWDS

This file provides guidance for GitHub Copilot and other AI coding agents working in the **U.S. Web Design System (USWDS)** repository.

## Start Here

Read **[AGENTS.md](../AGENTS.md)** in the repository root. It is the primary reference for coding agents and covers:

- Repository structure and directory layout
- Tech stack (Node.js ≥ 22, Gulp, Sass, Mocha, Storybook, ESLint, Stylelint)
- Getting started commands (`npm install`, `npm start`, `npm test`)
- Component authoring conventions
- Testing patterns
- Accessibility requirements
- Security policies
- Branching and PR rules

## Quick Reference

| Task | Command |
|------|---------|
| Install deps | `npm install` |
| Start dev server | `npm start` (Storybook on port 6006) |
| Build | `npm run build` |
| Lint | `npm run lint` |
| Unit tests | `npm run test:unit` |
| Full test suite | `npm run test:ci` |
| Format code | `npm run prettier` |

## Accessibility

Accessibility is a **first-class requirement** in USWDS. All components must meet WCAG 2.1 AA. Refer to the Accessibility section of [AGENTS.md](../AGENTS.md) before making any UI changes.

## Additional References

- [CONTRIBUTING.md](../CONTRIBUTING.md) — contribution workflow, PR requirements, verified commits
- [SECURITY.md](../SECURITY.md) — security policy and vulnerability reporting
- [CODE_OF_CONDUCT.md](../CODE_OF_CONDUCT.md) — community standards
- [README.md](../README.md) — project overview and installation guide
