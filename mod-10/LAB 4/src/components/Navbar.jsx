import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function Navbar() {
  const { isAuthenticated, logout } = useAuth();

  return (
    <nav className="nav">
      <Link to="/">Home</Link>
      <Link to="/blog">Blog</Link>
      {isAuthenticated ? (
        <>
          <Link to="/admin">Admin</Link>
          <button type="button" onClick={logout}>
            Log Out
          </button>
        </>
      ) : (
        <Link to="/login">Log In</Link>
      )}
    </nav>
  );
}
