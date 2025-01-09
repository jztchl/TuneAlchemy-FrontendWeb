import  { useEffect,useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './components/Auth/Login';
import Dashboard from './components/Dashboard';
import SongList from './components/Song/SongList';
import Navbar from './components/Navbar';
import ArtistList from './components/Artist/ArtistList';
import PlayList from './components/PlayList/PlayList';
import * as authService from './services/authService';


function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(!!localStorage.getItem('user'));

  useEffect(() => {
    const checkAuthStatus = async () => {
      try {
        await authService.checkTokenValidity();
        await authService.checkRefreshTokenValidity();
        setIsAuthenticated(!!localStorage.getItem('user'));
      } catch (error) {
        console.error('Authentication error:', error);
        setIsAuthenticated(false);
      }
    };
    checkAuthStatus();
  }, []);
  const updateAuthStatus = () => setIsAuthenticated(!!localStorage.getItem('user'));


  return (
    <Router>
      <div className="min-h-screen bg-gray-100">
        {isAuthenticated && <Navbar  updateAuthStatus={updateAuthStatus} />}
        <div className={`${isAuthenticated ? 'ml-64' : ''}`}>
          <Routes>
          <Route
  path="/login"
  element={!isAuthenticated ? <Login updateAuthStatus={updateAuthStatus} /> : <Navigate to="/dashboard" />}
/>
<Route
  path="/register"
  element={!isAuthenticated ? <Login updateAuthStatus={updateAuthStatus} /> : <Navigate to="/dashboard" />}
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
            
            <Route path="/" element={isAuthenticated ? <Navigate to="/dashboard" /> : <Navigate to="/login" />} />

          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;