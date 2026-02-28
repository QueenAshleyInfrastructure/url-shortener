import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

export default function Navbar() {
  const [query, setQuery] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    const q = query.trim();
    if (q) navigate(`/search?query=${encodeURIComponent(q)}`);
  };

  return (
    <nav className="navbar">
      <div className="navbar-inner">
        <Link to="/" className="navbar-brand">
          Recipe Discovery
        </Link>
        <form className="navbar-search" onSubmit={handleSubmit}>
          <input
            type="search"
            placeholder="Search recipes..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            aria-label="Search recipes"
            className="navbar-search-input"
          />
          <button type="submit" className="btn btn-sm">
            Search
          </button>
        </form>
        <div className="navbar-links">
          <Link to="/">Home</Link>
          <Link to="/favorites">Favorites</Link>
        </div>
      </div>
    </nav>
  );
}
