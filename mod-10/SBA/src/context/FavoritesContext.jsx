import { createContext, useContext, useCallback, useMemo } from 'react';
import { useLocalStorage } from '../hooks/useLocalStorage';

const FavoritesContext = createContext(null);

const STORAGE_KEY = 'recipe-discovery-favorites';

export function FavoritesProvider({ children }) {
  const [favoriteIds, setFavoriteIds] = useLocalStorage(STORAGE_KEY, []);

  const addFavorite = useCallback((recipeId) => {
    const id = String(recipeId);
    setFavoriteIds((prev) => (prev.includes(id) ? prev : [...prev, id]));
  }, [setFavoriteIds]);

  const removeFavorite = useCallback((recipeId) => {
    const id = String(recipeId);
    setFavoriteIds((prev) => prev.filter((x) => x !== id));
  }, [setFavoriteIds]);

  const isFavorite = useCallback(
    (recipeId) => favoriteIds.includes(String(recipeId)),
    [favoriteIds]
  );

  const toggleFavorite = useCallback(
    (recipeId) => {
      const id = String(recipeId);
      setFavoriteIds((prev) =>
        prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
      );
    },
    [setFavoriteIds]
  );

  const value = useMemo(
    () => ({
      favoriteIds,
      addFavorite,
      removeFavorite,
      isFavorite,
      toggleFavorite,
    }),
    [favoriteIds, addFavorite, removeFavorite, isFavorite, toggleFavorite]
  );

  return (
    <FavoritesContext.Provider value={value}>
      {children}
    </FavoritesContext.Provider>
  );
}

export function useFavorites() {
  const ctx = useContext(FavoritesContext);
  if (!ctx) throw new Error('useFavorites must be used within FavoritesProvider');
  return ctx;
}
