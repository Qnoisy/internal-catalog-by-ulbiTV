# Project Setup

```bash
npm install — install dependencies
npm run start:dev or npm run start:dev:vite — start the server + frontend project in development mode
```

---

# Scripts

- `npm run start` — Start the frontend project using webpack dev server
- `npm run start:vite` — Start the frontend project using Vite
- `npm run start:dev` — Start the frontend project with webpack dev server + backend
- `npm run start:dev:vite` — Start the frontend project with Vite + backend
- `npm run start:dev:server` — Start the backend server
- `npm run build:prod` — Production build
- `npm run build:dev` — Development build (not minified)
- `npm run lint:ts` — Lint TypeScript files
- `npm run lint:ts:fix` — Fix TypeScript linting issues
- `npm run lint:scss` — Lint SCSS files
- `npm run lint:scss:fix` — Fix SCSS linting issues
- `npm run test:unit` — Run unit tests with Jest
- `npm run test:ui` — Run screenshot tests with Loki
- `npm run test:ui:ok` — Approve new screenshots
- `npm run test:ui:ci` — Run screenshot tests in CI
- `npm run test:ui:report` — Generate a full report for screenshot tests
- `npm run test:ui:json` — Generate a JSON report for screenshot tests
- `npm run test:ui:html` — Generate an HTML report for screenshot tests
- `npm run prepare` — Pre-commit hooks
- `npm run generate:slice` — Script for generating FSD slices

---

# Project Architecture

The project is written according to the Feature-Sliced Design methodology.

Documentation link — [Feature-Sliced Design](https://feature-sliced.design/docs/get-started/tutorial)

---

# Working with Translations

The project uses the i18next library for translations.
Translation files are stored in `public/locales`.

For a more convenient workflow, it is recommended to install a plugin for WebStorm or VSCode.

i18next documentation — [https://react.i18next.com/](https://react.i18next.com/)

---

# Testing

The project uses 4 types of tests:

1. Standard unit tests with Jest — `npm run test:unit`
2. Component tests with React Testing Library — `npm run test:unit`
3. Screenshot testing with Loki — `npm run test:ui`
4. End-to-end testing with Cypress — `npm run test:e2e`

More details — `/docs/tests.md`

---

# Linting

The project uses ESLint for checking TypeScript code and Stylelint for checking style files.

Additionally, for strict enforcement of core architectural principles, a custom ESLint plugin called `_eslint-plugin-ulbi-tv-plugin_` is used. It contains 3 rules:

1. `path-checker` — prohibits absolute imports within the same module
2. `layer-imports` — validates correct layer usage according to FSD
   (for example, widgets cannot be used inside features and entities)
3. `public-api-imports` — allows imports from other modules only through the public API. Supports auto-fix.

### Running Linters

- `npm run lint:ts` — Lint TypeScript files
- `npm run lint:ts:fix` — Fix TypeScript linting issues
- `npm run lint:scss` — Lint SCSS files
- `npm run lint:scss:fix` — Fix SCSS linting issues

---

# Project Configuration

The project contains 2 configurations for development:

1. Webpack — `./config/build`
2. Vite — `vite.config.ts`

Both bundlers are adapted to support the main application features.

All configuration files are stored in `/config`:

- `/config/babel` — Babel configuration
- `/config/build` — Webpack configuration
- `/config/jest` — Test environment configuration

The `scripts` folder contains various scripts for refactoring, simplifying development, generating reports, etc.

---

# CI Pipeline and Pre-Commit Hooks

GitHub Actions configuration is located in `/.github/workflows`.

CI runs all types of tests, project builds, and linting.

Pre-commit hooks run linters before commits. Configuration is stored in `/.husky`.

---

# Working with Data

Data interaction is implemented using Redux Toolkit.

Reusable entities should be normalized with `EntityAdapter` whenever possible.

Server requests are handled via RTK Query (`/src/shared/api/rtkApi.ts`).

For asynchronous reducer loading (to avoid adding them to the global bundle), the project uses `DynamicModuleLoader`.

---

# Entities

- [Article](/src/entities/Article)
- [Comment](/src/entities/Comment)
- [Counter](/src/entities/Counter)
- [Country](/src/entities/Country)
- [Currency](/src/entities/Currency)
- [Notification](/src/entities/Notification)
- [Profile](/src/entities/Profile)
- [Rating](/src/entities/Rating)
- [User](/src/entities/User)

# Features

- [addCommentForm](/src/features/addCommentForm)
- [articleEditForm](/src/features/articleEditForm)
- [articleRating](/src/features/articleRating)
- [articleRecommendationsList](/src/features/articleRecommendationsList)
- [AuthByUsername](/src/features/AuthByUsername)
- [avatarDropdown](/src/features/avatarDropdown)
- [editableProfileCard](/src/features/editableProfileCard)
- [LangSwitcher](/src/features/LanguageSwitcher)
- [notificationButton](/src/features/notificationButton)
- [profileRating](/src/features/profileRating)
- [ThemeSwitcher](/src/features/ThemeSwitcher)
- [UI](/src/features/UI)
