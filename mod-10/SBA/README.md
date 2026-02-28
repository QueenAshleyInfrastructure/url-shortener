# SBA: Recipe Discovery App

A client-side React single-page application for browsing recipes using **TheMealDB API** (free, no API key required). Users can browse recipes by category, search by name, view full recipe details (image, ingredients, instructions), and manage a persistent list of favorite recipes.

## Features

- **Home** — Grid of recipe categories; each links to a category page.
- **Category** — Dynamic route `/category/[categoryName]` listing all recipes in that category; each recipe links to its detail page.
- **Recipe detail** — Dynamic route `/recipe/[recipeId]` with full recipe (image, ingredients, instructions) and an “Add to Favorites” / “Remove from Favorites” button.
- **Favorites** — Page listing all favorited recipes (persisted in `localStorage`). Empty state when none are saved.
- **Search** — Search bar in the navbar; submitting navigates to `/search?query=...` and shows matching recipes.

## Tech stack

- React 18, React Router 6, Vite
- Custom hooks: `useFetch` (data, loading, error), `useLocalStorage` (state synced with `localStorage`)
- `FavoritesContext` for global favorites state, using `useLocalStorage` internally for persistence
- TheMealDB API for categories, filter by category, lookup by ID, and search by name

## Install and run

```bash
cd "mod-10/SBA"
npm install
npm run dev
```

Then open the URL shown (e.g. http://localhost:5173).

Build for production:

```bash
npm run build
npm run preview
```

## Project structure

- `src/lib/api.js` — TheMealDB API helpers
- `src/hooks/useFetch.js` — Generic data-fetching hook (data, loading, error, refetch)
- `src/hooks/useLocalStorage.js` — State synced with `localStorage`
- `src/context/FavoritesContext.jsx` — Favorites state (uses `useLocalStorage`), add/remove/check/toggle
- `src/components/` — Navbar, RecipeCard, Spinner, ErrorMessage
- `src/pages/` — Home, CategoryPage, RecipeDetail, Favorites, SearchResults

## Reflection

See [REFLECTION.md](./REFLECTION.md) for the most challenging part of the project and a design decision.
