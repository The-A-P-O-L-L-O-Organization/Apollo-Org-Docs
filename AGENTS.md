# Apollo Org Docs - Agent Guidelines

## Build Commands

- `pnpm start` - Start development server
- `pnpm build` - Build for production
- `pnpm typecheck` - Run TypeScript type checking

## Code Style Guidelines

### TypeScript & React

- Use TypeScript with explicit type annotations
- Functional components with hooks preferred
- PascalCase for component names, camelCase for variables/functions
- Return type annotations for component functions: `(): ReactNode`

### Imports

- Type imports first: `import type {ReactNode} from 'react';`
- Then regular imports, grouped by external libraries then internal
- Use absolute imports with `@site/` prefix for internal modules

### Formatting

- No semicolons at end of statements
- Single quotes for strings
- 2-space indentation
- JSX attributes on separate lines when multiple

### Naming Conventions

- Components: PascalCase (e.g., `HomepageFeatures`)
- Files: PascalCase for components, camelCase for utilities
- CSS modules: camelCase (e.g., `styles.heroBanner`)

### Error Handling

- Use Docusaurus error boundaries and broken link detection
- `onBrokenLinks: 'throw'` in config for strict link checking

### Dependencies

- Use pnpm as package manager
- Node.js 20+ required
- Follow existing dependency versions in package.json</content>
  <parameter name="filePath">/home/archmaster/code/Apollo-Org-Docs/AGENTS.md
