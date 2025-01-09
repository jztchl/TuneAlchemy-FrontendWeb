import React from 'react';

const GenreManagement: React.FC = () => {
  const genres = [
    { id: 1, name: 'Synthwave', description: 'Retro-futuristic electronic music' },
    { id: 2, name: 'Cyberpunk', description: 'Dystopian electronic soundscapes' },
    { id: 3, name: 'Neo-Soul', description: 'Modern take on classic soul music' },
  ];

  return (
    <div>
      <h2 className="text-3xl font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-pink-500">Genre Management</h2>
      <button className="mb-6 bg-gradient-to-r from-blue-500 to-pink-500 text-white rounded-full px-6 py-2 hover:shadow-lg transition-all duration-300">
        Add New Genre
      </button>
      <div className="bg-white/10 backdrop-blur-md rounded-xl overflow-hidden">
        <table className="w-full">
          <thead>
            <tr className="border-b border-white/20">
              <th className="text-left p-3 text-white">Name</th>
              <th className="text-left p-3 text-white">Description</th>
              <th className="text-left p-3 text-white">Actions</th>
            </tr>
          </thead>
          <tbody>
            {genres.map((genre) => (
              <tr key={genre.id} className="border-b border-white/10 hover:bg-white/5 transition-colors">
                <td className="p-3 text-white">{genre.name}</td>
                <td className="p-3 text-white">{genre.description}</td>
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

export default GenreManagement;

