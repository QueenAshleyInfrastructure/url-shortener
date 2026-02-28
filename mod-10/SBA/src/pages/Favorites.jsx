import { useFetch } from '../hooks/useFetch';
import { api } from '../lib/api';
import { useFavorites } from '../context/FavoritesContext';
import RecipeCard from '../components/RecipeCard';
import Spinner from '../components/Spinner';

export default function Favorites() {
  const { favoriteIds } = useFavorites();

  if (favoriteIds.length === 0) {
    return (
      <div className="container page">
        <h1 className="page-title">Favorites</h1>
        <p className="empty-state">
          You haven&apos;t added any favorites yet. Browse recipes and add some to your list!
        </p>
      </div>
    );
  }

  return (
    <div className="container page">
      <h1 className="page-title">Favorites</h1>
      <FavoritesGrid ids={favoriteIds} />
    </div>
  );
}

function FavoritesGrid({ ids }) {
  return (
    <div className="recipe-grid">
      {ids.map((id) => (
        <FavoriteCard key={id} mealId={id} />
      ))}
    </div>
  );
}

function FavoriteCard({ mealId }) {
  const { data, loading } = useFetch(() => api.lookup(mealId), {
    enabled: true,
    deps: [mealId],
  });
  const meal = data?.meals?.[0];
  if (loading) return <div className="recipe-card recipe-card-skeleton" />;
  if (!meal) return null;
  return <RecipeCard meal={meal} />;
}
