# Reflection — Recipe Discovery App (SBA)

## Most challenging part

The most challenging part was keeping **data fetching and routing in sync** without unnecessary refetches. For dynamic routes like `/category/:categoryName` and `/recipe/:recipeId`, the `useFetch` hook needed to refetch when the URL parameter changed, but the fetcher function itself (e.g. `() => api.filterByCategory(categoryName)`) is recreated every render. If `useFetch` depended only on that function reference, it would either refetch on every render or not refetch when the param changed. Solving this required a small design change in `useFetch`: adding an optional **dependency array** (`deps`) so the effect runs when those values change while still calling the latest fetcher via a ref. That way each page can pass `deps: [categoryName]` or `deps: [recipeId]` and get correct, stable behavior.

## Design decision: FavoritesContext and useLocalStorage

Favorites had to be global (so the detail page and the Favorites page both see the same list) and persistent (so the list survives refresh). The instructions required a **FavoritesContext** that *internally* uses **useLocalStorage**.

The decision was to store only **recipe IDs** in `localStorage`, not full recipe objects. That keeps the context simple and avoids storing large or changing data. The Favorites page then fetches each recipe by ID with the existing `useFetch` hook to display cards. Alternative designs (e.g. storing minimal `{ id, strMeal, strMealThumb }` in localStorage) would reduce API calls but add complexity and risk of stale data. Storing IDs only keeps a single source of truth (the API) for recipe details and keeps the context focused on “which IDs are favored,” which matched the requirement that FavoritesContext provide a list of favorite recipe IDs plus add/remove/check (and I added toggle for convenience).
