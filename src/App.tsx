import { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import {jwtDecode} from 'jwt-decode';
import Login from './components/Auth/Login';
import Register from './components/Auth/Register';
import Dashboard from './components/Dashboard';
import SongList from './components/Song/SongList';
import Navbar from './components/Navbar';
import ArtistList from './components/Artist/ArtistList';
import PlayList from './components/PlayList/PlayList';
import * as authService from './services/authService';
import AdminRoute from './components/AdminRoute';
import AdminPanel from './components/AdminPanel';
import UserProfile from './components/UserProfile';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(!!localStorage.getItem('user'));
  const [isAdmin, setIsAdmin] = useState(false);

  const updateAuthStatus = () => {
    const token = localStorage.getItem('user');
    if (token) {
      const decodedToken: any = jwtDecode(token);
      setIsAuthenticated(true);
      setIsAdmin(decodedToken.role === 'admin');
    } else {
      setIsAuthenticated(false);
      setIsAdmin(false);
    }
  };

  useEffect(() => {
    const checkAuthStatus = async () => {
      try {
        await authService.checkTokenValidity();
        await authService.checkRefreshTokenValidity();
        updateAuthStatus();
      } catch (error) {
        console.error('Authentication error:', error);
        setIsAuthenticated(false);
        setIsAdmin(false);
      }
    };
    checkAuthStatus();
  }, []);

  console.log('isAuthenticated:', isAuthenticated);
  console.log('isAdmin:', isAdmin);

  return (
    <Router>
      <div className="min-h-screen bg-gray-100">
        {isAuthenticated && <Navbar updateAuthStatus={updateAuthStatus} isAdmin={isAdmin} />}
        <div className={`${isAuthenticated ? 'ml-64' : ''}`}>
          <Routes>
            <Route
              path="/login"
              element={!isAuthenticated ? <Login updateAuthStatus={updateAuthStatus} /> : <Navigate to="/dashboard" />}
            />
            <Route
              path="/register"
              element={!isAuthenticated ? <Register /> : <Navigate to="/dashboard" />}
            />
            <Route
              path="/dashboard"
              element={isAuthenticated ? <Dashboard /> : <Navigate to="/login" />}
            />
            <Route
              path="/songs"
              element={isAuthenticated ? <SongList /> : <Navigate to="/login" />}
            />
            <Route
              path="/artists"
              element={isAuthenticated ? <ArtistList /> : <Navigate to="/login" />}
            />
            <Route
              path="/playlists"
              element={isAuthenticated ? <PlayList /> : <Navigate to="/login" />}
            />
            <Route
              path="/admin"
              element={
                <AdminRoute isAdmin={isAdmin}>
                  <AdminPanel />
                </AdminRoute>
              }
            />
            <Route
              path="/profile"
              element={isAuthenticated ? <UserProfile /> : <Navigate to="/login" />}
            />
            <Route path="/" element={isAuthenticated ? <Navigate to="/dashboard" /> : <Navigate to="/login" />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;