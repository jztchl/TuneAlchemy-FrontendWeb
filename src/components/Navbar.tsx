import { Link, useNavigate } from 'react-router-dom';
import { Home, Music, Users, PlaySquare, LogOut, User } from 'lucide-react';
import * as authService from '../services/authService';

interface NavbarProps {
  updateAuthStatus: () => void;
  isAdmin: boolean;
}

export default function Navbar({ updateAuthStatus, isAdmin }: NavbarProps) {
  const navigate = useNavigate();

  const handleLogout = () => {
    authService.logout();
    updateAuthStatus();
    navigate('/login');
  };

  return (
    <nav className="bg-gray-900 text-white h-screen w-64 fixed left-0 top-0 p-4">
      <div className="flex items-center mb-8">
        <Music className="h-8 w-8 text-indigo-500" />
        <span className="text-xl font-bold ml-2">TuneAlchemy</span>
      </div>
      
      <div className="space-y-4">
        <Link to="/profile" className="flex items-center space-x-3 p-2 rounded-lg hover:bg-gray-800">
          <User className="h-5 w-5" />
          <span>Profile</span>
        </Link>

        <Link to="/dashboard" className="flex items-center space-x-3 p-2 rounded-lg hover:bg-gray-800">
          <Home className="h-5 w-5" />
          <span>Home</span>
        </Link>
        
        <Link to="/songs" className="flex items-center space-x-3 p-2 rounded-lg hover:bg-gray-800">
          <Music className="h-5 w-5" />
          <span>Songs</span>
        </Link>
        
        <Link to="/artists" className="flex items-center space-x-3 p-2 rounded-lg hover:bg-gray-800">
          <Users className="h-5 w-5" />
          <span>Artists</span>
        </Link>
        
        <Link to="/playlists" className="flex items-center space-x-3 p-2 rounded-lg hover:bg-gray-800">
          <PlaySquare className="h-5 w-5" />
          <span>Playlists</span>
        </Link>
        
        {isAdmin && (
          <Link to="/admin" className="flex items-center space-x-3 p-2 rounded-lg hover:bg-gray-800">
            <span>Admin Panel</span>
          </Link>
        )}
        
        <button
          onClick={handleLogout}
          className="flex items-center space-x-3 p-2 rounded-lg hover:bg-gray-800 w-full text-left text-red-400"
        >
          <LogOut className="h-5 w-5" />
          <span>Logout</span>
        </button>
      </div>
    </nav>
  );
}