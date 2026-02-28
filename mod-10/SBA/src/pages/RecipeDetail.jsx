import { useParams, Link } from 'react-router-dom';
import { useFetch } from '../hooks/useFetch';
import { api } from '../lib/api';
import { useFavorites } from '../context/FavoritesContext';
import Spinner from '../components/Spinner';
import ErrorMessage from '../components/ErrorMessage';

function getIngredients(meal) {
  if (!meal) return [];
  const out = [];
  for (let i = 1; i <= 20; i++) {
    const ing = meal[`strIngredient${i}`];
    const measure = meal[`strMeasure${i}`];
    if (ing && ing.trim()) {
      out.push({ ingredient: ing.trim(), measure: (measure || '').trim() });
    }
  }
  return out;
}

export default function RecipeDetail() {
  const { recipeId } = useParams();
  const { data, loading, error, refetch } = useFetch(
    recipeId ? () => api.lookup(recipeId) : null,
    { enabled: Boolean(recipeId), deps: [recipeId] }
  );
  const { isFavorite, toggleFavorite } = useFavorites();

  if (loading) return <Spinner />;
  if (error) return <ErrorMessage message={error.message} onRetry={refetch} />;

  const meal = data?.meals?.[0];
  if (!meal) {
    return (
      <div className="container page">
        <p className="empty-state">Recipe not found.</p>
        <Link to="/">Back to Home</Link>
      </div>
    );
  }

  const ingredients = getIngredients(meal);
  const favorite = isFavorite(meal.idMeal);

  return (
    <div className="container page recipe-detail">
      <p className="breadcrumb">
        <Link to="/">Home</Link>
        {meal.strCategory && (
          <>
            <span className="breadcrumb-sep"> / </span>
            <Link to={`/category/${encodeURIComponent(meal.strCategory)}`}>
              {meal.strCategory}
            </Link>
          </>
        )}
        <span className="breadcrumb-sep"> / </span>
        <span>{meal.strMeal}</span>
      </p>
      <div className="recipe-detail-header">
        <h1 className="page-title">{meal.strMeal}</h1>
        <button
          type="button"
          className={`btn ${favorite ? 'btn-outline' : 'btn-primary'}`}
          onClick={() => toggleFavorite(meal.idMeal)}
        >
          {favorite ? 'Remove from Favorites' : 'Add to Favorites'}
        </button>
      </div>
      <div className="recipe-detail-body">
        <div className="recipe-detail-img">
          <img src={meal.strMealThumb || ''} alt="" />
        </div>
        <div className="recipe-detail-content">
          {meal.strArea && (
            <p className="meta">
              <strong>Area:</strong> {meal.strArea}
            </p>
          )}
          {meal.strCategory && (
            <p className="meta">
              <strong>Category:</strong> {meal.strCategory}
            </p>
          )}
          {ingredients.length > 0 && (
            <section>
              <h2>Ingredients</h2>
              <ul className="ingredient-list">
                {ingredients.map((item, i) => (
                  <li key={i}>
                    {item.measure && `${item.measure} `}
                    {item.ingredient}
                  </li>
                ))}
              </ul>
            </section>
          )}
          {meal.strInstructions && (
            <section>
              <h2>Instructions</h2>
              <div className="instructions">
                {meal.strInstructions.split(/\r?\n/).map((p, i) =>
                  p.trim() ? <p key={i}>{p.trim()}</p> : null
                )}
              </div>
            </section>
          )}
        </div>
      </div>
    </div>
  );
}
