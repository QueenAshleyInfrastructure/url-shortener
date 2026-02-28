import { Link } from 'react-router-dom';

export default function Home() {
  return (
    <div className="container">
      <h1 className="page-title">Lab 4 — Dynamic Routing</h1>
      <p style={{ color: 'var(--muted)' }}>
        A simple blog with dynamic routes and a protected admin area.
      </p>
      <p>
        <Link to="/blog">View all posts →</Link>
      </p>
    </div>
  );
}
