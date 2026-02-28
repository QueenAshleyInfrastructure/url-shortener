import { Link } from 'react-router-dom';
import { useFetch } from '../hooks/useFetch';
import { api } from '../lib/api';
import Spinner from '../components/Spinner';
import ErrorMessage from '../components/ErrorMessage';

export default function Home() {
  const { data, loading, error, refetch } = useFetch(api.categories);

  if (loading) return <Spinner />;
  if (error) return <ErrorMessage message={error.message} onRetry={refetch} />;

  const categories = data?.categories ?? [];

  return (
    <div className="container page">
      <h1 className="page-title">Recipe categories</h1>
      <p className="page-subtitle">Choose a category to browse recipes.</p>
      <div className="category-grid">
        {categories.map((cat) => (
          <Link
            key={cat.idCategory}
            to={`/category/${encodeURIComponent(cat.strCategory)}`}
            className="category-card"
          >
            <div className="category-card-img">
              <img src={cat.strCategoryThumb || ''} alt="" loading="lazy" />
            </div>
            <span className="category-card-name">{cat.strCategory}</span>
          </Link>
        ))}
      </div>
    </div>
  );
}
