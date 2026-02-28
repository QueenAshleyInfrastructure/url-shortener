import { useSearchParams, Link } from 'react-router-dom';
import { useFetch } from '../hooks/useFetch';
import { api } from '../lib/api';
import RecipeCard from '../components/RecipeCard';
import Spinner from '../components/Spinner';
import ErrorMessage from '../components/ErrorMessage';

export default function SearchResults() {
  const [searchParams] = useSearchParams();
  const query = searchParams.get('query') || '';

  const { data, loading, error, refetch } = useFetch(
    query ? () => api.search(query) : null,
    { enabled: Boolean(query), deps: [query] }
  );

  if (!query) {
    return (
      <div className="container page">
        <h1 className="page-title">Search</h1>
        <p className="empty-state">Enter a search term in the navbar.</p>
      </div>
    );
  }

  if (loading) return <Spinner />;
  if (error) return <ErrorMessage message={error.message} onRetry={refetch} />;

  const meals = data?.meals ?? [];
  const isEmpty = !meals || meals.length === 0;

  return (
    <div className="container page">
      <h1 className="page-title">Search: &ldquo;{query}&rdquo;</h1>
      {isEmpty ? (
        <p className="empty-state">No recipes found. Try another search.</p>
      ) : (
        <div className="recipe-grid">
          {meals.map((meal) => (
            <RecipeCard key={meal.idMeal} meal={meal} />
          ))}
        </div>
      )}
    </div>
  );
}
