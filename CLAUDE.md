# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm start          # Start dev server at http://localhost:4200
npm run build      # Production build to dist/preggio/
npm test           # Run unit tests with Karma/Jasmine
ng generate component features/<name>/<name>  # Scaffold a new feature component
ng deploy --base-href=/preggio/               # Deploy to GitHub Pages
```

## Architecture

This is an Angular 19 standalone-components application (no NgModules). All components use `standalone: true` (implicit in Angular 19) with direct `imports` arrays.

**Directory structure:**
- `src/app/features/` — Page-level components, one folder per route: `home`, `casa-pepe`, `casa-scuola`, `property`, `location`, `discoveries`, `atmosphere`, `contact`
- `src/app/shared/` — Reusable UI components (`nav-bar`, `card`, `slider`, `fade-slider`, `full-screen-slider`) and services
- `src/app/core/layout/` — Root layout shell wrapping the router outlet

**Key patterns:**

- **Layout shell** (`core/layout/layout.component.ts`): Wraps `<router-outlet>` and manages global scroll-based navbar visibility using a `@ViewChild` on the page container. It hides the navbar after scrolling past 75% of the viewport height.
- **NavBarService** (`shared/nav-bar.service.ts`): Uses Angular `signal()` to share navbar visibility state. Feature pages inject this service and read `navBarState` as a readonly signal.
- **DiscoveriesService** (`services/discoveries.service.ts`): In-memory data store for discovery items (no HTTP calls). Each item has a `link` slug used for routing to `discoveries/:link`.
- **Slider components**: Three variants exist — `SliderComponent` (basic), `FadeSliderComponent` (cross-fade transitions), and `FullScreenSliderComponent` (overlay lightbox with autoplay, opened programmatically via `open(images, startIndex)`).
- **Image assets**: Stored in `src/assets/img/` organized by section (e.g., `ACCUEIL/`, `PROPRIETE/`, `DECOUVERTES/`). Image paths are hardcoded in component TypeScript files.
- **FontAwesome**: Used for icons via `@fortawesome/angular-fontawesome`. Import the module in individual components as needed.
- **Animations**: Angular `@angular/animations` is used in `FullScreenSliderComponent`. `provideAnimations()` is registered in `app.config.ts`.
- **Deployment**: GitHub Pages via `angular-cli-ghpages`. Build output goes to `dist/preggio/`.

## Code Style

Use comments sparingly — only for complex or non-obvious logic.

Always use straight single quotes (`'`) in Angular templates — never curly/smart quotes (`'` `'`). Angular's template parser will reject them.
