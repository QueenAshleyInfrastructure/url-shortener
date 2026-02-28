import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleLogin = () => {
    login();
    navigate('/admin', { replace: true });
  };

  return (
    <div className="container">
      <div className="login-box">
        <h1>Log In</h1>
        <p style={{ color: 'var(--muted)', marginBottom: '1.5rem' }}>
          Simulated login. Click the button to sign in.
        </p>
        <button type="button" className="btn" onClick={handleLogin}>
          Log In
        </button>
      </div>
    </div>
  );
}
