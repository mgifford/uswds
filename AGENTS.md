# USWDS Coding Agent Guide

## Project Overview

The **U.S. Web Design System (USWDS)** is an open-source UI component library and visual style guide for U.S. federal government websites. It provides accessible, mobile-friendly HTML, CSS, and JavaScript components that teams can use to build consistent government digital services.

- **Website:** https://designsystem.digital.gov
- **npm package:** `@uswds/uswds`
- **Documentation site repo:** https://github.com/uswds/uswds-site

## Repository Structure

```
uswds/
├── .github/          # GitHub Actions workflows, issue/PR templates
├── .storybook/       # Storybook configuration
├── config/           # Project configuration files
├── dist/             # Compiled output (generated, do not edit manually)
├── packages/         # Source packages — one directory per component or bundle
│   ├── usa-accordion/  # Example component package
│   │   ├── _index.scss          # Sass entry point
│   │   └── src/
│   │       ├── index.js         # JavaScript entry point
│   │       ├── styles/          # Component Sass files
│   │       ├── test/            # Unit tests (.spec.js) and HTML fixtures
│   │       ├── content/         # Template content partials
│   │       └── usa-accordion.twig  # Component template
│   ├── uswds-core/   # Core utilities, tokens, functions (shared by all components)
│   └── uswds*/       # Non-component bundles (e.g. uswds-form-controls)
├── src/              # Legacy/backwards-compat stylesheets (avoid editing)
├── tasks/            # Internal Gulp build tasks
├── gulpfile.js       # Main build orchestration
├── eslint.config.mjs # JavaScript lint configuration
└── .stylelintrc.json # Sass/CSS lint configuration
```

Each component package follows the naming convention `usa-[component]` (e.g. `usa-accordion`, `usa-button`). Bundle packages use the `uswds-` prefix.

## Tech Stack

| Concern       | Tool                          |
|---------------|-------------------------------|
| Runtime       | Node.js ≥ 22 (see `.nvmrc`)   |
| Package mgr   | npm                           |
| Build         | Gulp 5, Vite, Webpack         |
| Styles        | Sass (compiled via gulp-sass) |
| JavaScript    | ES modules + Lit (web components) |
| Testing       | Mocha, jsdom                  |
| Linting (JS)  | ESLint (flat config)          |
| Linting (CSS) | Stylelint                     |
| Component docs| Storybook                     |
| A11y testing  | axe-core, axe-storybook       |
| Security      | Snyk, GitHub CodeQL           |
| CI            | CircleCI + GitHub Actions     |

## Getting Started

```sh
# Install dependencies
npm install

# Start Storybook dev server (http://localhost:6006)
npm start

# Build all compiled assets
npm run build

# Run full test suite (lint + typecheck + unit tests)
npm test

# Run CI test suite (no Snyk)
npm run test:ci
```

## Common Commands

```sh
# Lint JavaScript and Sass
npm run lint

# Run only unit tests
npm run test:unit          # or: gulp unitTests

# Run only Sass tests
npm run test:sass          # or: gulp sassTests

# Run accessibility tests (requires built Storybook)
npm run test:a11y

# Format code with Prettier
npm run prettier

# Watch for file changes and rebuild
npm run watch
```

## Development Guidelines

### Adding or Modifying a Component

1. **Source files** live in `packages/usa-[component]/src/`.
2. **Styles** go in `packages/usa-[component]/src/styles/`. The entry point is `_index.scss`.
3. **JavaScript** goes in `packages/usa-[component]/src/index.js`.
4. **Tests** go in `packages/usa-[component]/src/test/`. Test files are named `*.spec.js` and accompany an HTML template fixture (e.g. `template.html`).
5. **Storybook stories** live at `packages/usa-[component]/src/usa-[component].stories.js`.
6. **Twig templates** live at `packages/usa-[component]/src/usa-[component].twig`.

### Accessibility (A11y)

Accessibility is a **first-class concern** in USWDS. All components must:

- Meet [WCAG 2.1 AA](https://www.w3.org/WAI/WCAG21/quickref/) requirements.
- Use semantic HTML.
- Support keyboard navigation.
- Provide appropriate ARIA roles, labels, and live regions where needed.
- Be tested with `axe-core` via `npm run test:a11y`.

The project runs a weekly automated accessibility scan against the live documentation site. See `.github/workflows/a11y-scan.yml`.

### Code Style

- **JavaScript:** Follow the ESLint configuration in `eslint.config.mjs` (Airbnb base + Prettier). Run `npm run lint:js` to check.
- **Sass:** Follow the Stylelint rules in `.stylelintrc.json`. Run `npm run lint:sass` to check.
- **Formatting:** Prettier is configured in `.prettierrc.json`. Run `npm run prettier` to auto-format.
- **Editor settings:** See `.editorconfig` for whitespace/indentation rules.

### Branching and PRs

- Branch from `develop` for all changes.
- Submit pull requests against `develop`.
- All commits must have a verified signature (GPG or SSH).
- Every PR must be linked to an issue.
- All PRs run Snyk (dependency vulnerability scan) and CodeQL (static analysis).

### Writing Tests

Unit tests use Mocha and jsdom. A typical test file in `packages/usa-[component]/src/test/`:

```js
const assert = require("assert");
const fs = require("fs");
const path = require("path");
const { JSDOM } = require("jsdom");

// Load the HTML fixture
const template = fs.readFileSync(
  path.join(__dirname, "template.html")
);

describe("usa-[component]", () => {
  let dom, document;

  beforeEach(() => {
    dom = new JSDOM(template, { runScripts: "dangerously" });
    document = dom.window.document;
  });

  it("should do something", () => {
    const el = document.querySelector(".usa-[component]");
    assert.ok(el, "element exists");
  });
});
```

Run tests for a specific component with:

```sh
# From repo root
npx mocha packages/usa-[component]/src/test/*.spec.js
```

## Security

- USWDS uses [Snyk](https://snyk.io) for dependency vulnerability monitoring.
- Static analysis via [GitHub CodeQL](https://securitylab.github.com/tools/codeql) runs on every PR.
- To report a security issue, email [uswds@gsa.gov](mailto:uswds@gsa.gov).
- See [SECURITY.md](./SECURITY.md) for the full security policy.

## Contributing

See [CONTRIBUTING.md](./CONTRIBUTING.md) for a full contributing guide including:

- How to report bugs and request features
- How to set up the project locally
- Pull request requirements (verified commits, linking to issues)
- Code of conduct and community guidelines

## Key Files for Agents

| File | Purpose |
|------|---------|
| `package.json` | npm scripts, dependencies, engine requirements |
| `gulpfile.js` | Build pipeline definition |
| `eslint.config.mjs` | JavaScript lint rules |
| `.stylelintrc.json` | Sass/CSS lint rules |
| `.prettierrc.json` | Code formatting rules |
| `tsconfig.json` | TypeScript configuration |
| `.nvmrc` / `.tool-versions` | Required Node.js version |
| `CONTRIBUTING.md` | Full contributor guide |
| `SECURITY.md` | Security policy |
| `CODE_OF_CONDUCT.md` | Community standards |
