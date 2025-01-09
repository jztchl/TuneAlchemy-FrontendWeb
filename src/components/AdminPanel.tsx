import React, { useState } from 'react';
import { Users, Music, Tag, ChevronRight } from 'lucide-react';
import UserManagement from './Admin/UserManagement';
import SongManagement from './Admin/SongManagement';
import GenreManagement from './Admin/GenreManagement';
import ArtistsManagement from './Admin/ArtistsManagement';


const AdminPanel: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'users' | 'songs' | 'genres' | 'artists'>('users');

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-blue-900 to-pink-800 p-6">
      <div className="max-w-6xl mx-auto bg-white/10 backdrop-blur-lg rounded-2xl shadow-2xl overflow-hidden">
        <div className="p-6">
          <h1 className="text-4xl font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-pink-500">TuneAlchemy Admin Hub</h1>
          
          <div className="flex space-x-4 mb-6">
            <TabButton 
              icon={<Users size={20} />} 
              label="Users" 
              isActive={activeTab === 'users'} 
              onClick={() => setActiveTab('users')} 
            />
            <TabButton 
              icon={<Music size={20} />} 
              label="Songs" 
              isActive={activeTab === 'songs'} 
              onClick={() => setActiveTab('songs')} 
            />
            <TabButton 
              icon={<Tag size={20} />} 
              label="Genres" 
              isActive={activeTab === 'genres'} 
              onClick={() => setActiveTab('genres')} 
            />
            <TabButton 
              icon={<Tag size={20} />} 
              label="Artists" 
              isActive={activeTab === 'artists'} 
              onClick={() => setActiveTab('artists')} 
            />
          </div>
          
          <div className="bg-white/20 backdrop-blur-md rounded-xl p-6 shadow-inner">
            {activeTab === 'users' && <UserManagement />}
            {activeTab === 'songs' && <SongManagement />}
            {activeTab === 'genres' && <GenreManagement />}
            {activeTab === 'artists' && <ArtistsManagement />}
          </div>
        </div>
      </div>
    </div>
  );
};

interface TabButtonProps {
  icon: React.ReactNode;
  label: string;
  isActive: boolean;
  onClick: () => void;
}

const TabButton: React.FC<TabButtonProps> = ({ icon, label, isActive, onClick }) => {
  return (
    <button
      className={`flex items-center space-x-2 px-6 py-3 rounded-full transition-all duration-300 ${
        isActive 
          ? 'bg-gradient-to-r from-blue-500 to-pink-500 text-white shadow-lg' 
          : 'bg-white/20 text-white/80 hover:bg-white/30'
      }`}
      onClick={onClick}
    >
      {icon}
      <span>{label}</span>
      {isActive && <ChevronRight size={16} className="ml-2" />}
    </button>
  );
};

export default AdminPanel;

