import { Routes, Route, Link, useNavigate  } from 'react-router-dom';
import UsersPage from './pages/UsersPage';
import AboutPage from './pages/AboutPage';
import LoginPage from './pages/LoginPage';
import UserDetailsPage from './pages/UserDetailsPage';
import PrivateRoute from './components/PrivateRoute';
import { useAuth } from './context/AuthContext';

function App() {
  const { currentUser, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };
  return (
    <div>
     <nav style={{ padding: '10px', backgroundColor: '#eee' }}>
  {currentUser ? (
    <>
      <span style={{ marginRight: '15px' }}>
        Welcome, <strong>{currentUser.name}</strong>
      </span>
      <Link to="/" style={{ marginRight: '15px' }}>Home</Link>
      <Link to="/about" style={{ marginRight: '15px' }}>About Us</Link>
      <button onClick={handleLogout}>Logout</button>
    </>
  ) : (
    <Link to="/login">Login</Link>
  )}
</nav>

      <Routes>
        <Route
          path="/"
          element={
            <PrivateRoute>
              <UsersPage />
            </PrivateRoute>
          }
        />
        <Route
          path="/about"
          element={
            <PrivateRoute>
              <AboutPage />
            </PrivateRoute>
          }
        />
		<Route path="/user/:id" element={<UserDetailsPage />} />
        <Route path="/login" element={<LoginPage />} />
      </Routes>
    </div>
  );
}

export default App;