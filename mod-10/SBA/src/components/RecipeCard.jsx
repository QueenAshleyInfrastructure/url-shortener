import { Link } from 'react-router-dom';

export default function RecipeCard({ meal }) {
  if (!meal) return null;
  const { idMeal, strMeal, strMealThumb } = meal;
  return (
    <Link to={`/recipe/${idMeal}`} className="recipe-card">
      <div className="recipe-card-img-wrap">
        <img src={strMealThumb || ''} alt="" loading="lazy" />
      </div>
      <div className="recipe-card-title">{strMeal}</div>
    </Link>
  );
}
