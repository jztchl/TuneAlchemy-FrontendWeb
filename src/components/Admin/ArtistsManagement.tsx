import React from 'react';

const ArtistManagement: React.FC = () => {
  const artists = [
    { id: 1, name: 'Cyber Synth', genre: 'Synthwave', bio: 'Pioneering the sound of the future with retro vibes' },
    { id: 2, name: 'Pixel Pulse', genre: 'Electronic', bio: 'Shaping the electronic landscape with infectious beats' },
    { id: 3, name: 'Neural Noise', genre: 'Techno', bio: 'Exploring the depths of digital sound and rhythm' },
  ];

  return (
    <div>
      <h2 className="text-3xl font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-pink-500">Artist Management</h2>
      <button className="mb-6 bg-gradient-to-r from-blue-500 to-pink-500 text-white rounded-full px-6 py-2 hover:shadow-lg transition-all duration-300">
        Add New Artist
      </button>
      <div className="bg-white/10 backdrop-blur-md rounded-xl overflow-hidden">
        <table className="w-full">
          <thead>
            <tr className="border-b border-white/20">
              <th className="text-left p-3 text-white">Name</th>
              <th className="text-left p-3 text-white">Genre</th>
              <th className="text-left p-3 text-white">Bio</th>
              <th className="text-left p-3 text-white">Actions</th>
            </tr>
          </thead>
          <tbody>
            {artists.map((artist) => (
              <tr key={artist.id} className="border-b border-white/10 hover:bg-white/5 transition-colors">
                <td className="p-3 text-white">{artist.name}</td>
                <td className="p-3 text-white">{artist.genre}</td>
                <td className="p-3 text-white">{artist.bio}</td>
                <td className="p-3">
                  <button className="mr-2 px-3 py-1 text-sm text-blue-400 border border-blue-400 rounded hover:bg-blue-400 hover:text-white transition-colors">Edit</button>
                  <button className="px-3 py-1 text-sm bg-pink-500 text-white rounded hover:bg-pink-600 transition-colors">Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ArtistManagement;
