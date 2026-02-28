import { useParams, Link } from 'react-router-dom';
import { useFetch } from '../hooks/useFetch';
import { api } from '../lib/api';
import RecipeCard from '../components/RecipeCard';
import Spinner from '../components/Spinner';
import ErrorMessage from '../components/ErrorMessage';

export default function CategoryPage() {
  const { categoryName } = useParams();
  const { data, loading, error, refetch } = useFetch(
    categoryName ? () => api.filterByCategory(categoryName) : null,
    { enabled: Boolean(categoryName), deps: [categoryName] }
  );

  if (loading) return <Spinner />;
  if (error) return <ErrorMessage message={error.message} onRetry={refetch} />;

  const meals = data?.meals ?? [];
  const isEmpty = !meals || meals.length === 0;

  return (
    <div className="container page">
      <p className="breadcrumb">
        <Link to="/">Home</Link>
        <span className="breadcrumb-sep"> / </span>
        <span>{categoryName}</span>
      </p>
      <h1 className="page-title">{categoryName}</h1>
      {isEmpty ? (
        <p className="empty-state">No recipes in this category.</p>
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
