import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { config } from '../../config/config';
import { X } from 'lucide-react';
const API_URL = config.API_URL;

const SongManagement: React.FC = () => {
  const [songs, setSongs] = useState<any[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newSong, setNewSong] = useState<any>({
    title: '',
    file: null,
    image: null,
    duration: '',
    genreId: '',
    artistId: '',
  });
  const [genres, setGenres] = useState<any[]>([]);
  const [artists, setArtists] = useState<any[]>([]);

  useEffect(() => {
    // Fetch songs
    axios.get(`${API_URL}/songs`)
      .then((response) => setSongs(response.data))
      .catch((error) => console.error('Error fetching songs:', error));

    // Fetch genres
    axios.get(`${API_URL}/genres`)
      .then((response) => setGenres(response.data))
      .catch((error) => console.error('Error fetching genres:', error));

    // Fetch artists
    axios.get(`${API_URL}/artists`)
      .then((response) => setArtists(response.data))
      .catch((error) => console.error('Error fetching artists:', error));
  }, []);

  const deleteSong = (songId: number) => {
    axios.delete(`${API_URL}/songs/delete/${songId}`)
      .then(() => setSongs(songs.filter(song => song.id !== songId)))
      .catch((error) => console.error('Error deleting song:', error));
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setNewSong({ ...newSong, [name]: value });
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, files } = e.target;
    setNewSong({ ...newSong, [name]: files?.[0] || null });
  };

  const handleAddSong = () => {
    const formData = new FormData();
    formData.append('title', newSong.title);
    formData.append('file', newSong.file);
    formData.append('image', newSong.image);
    formData.append('duration', newSong.duration);
    formData.append('genreId', newSong.genreId);
    formData.append('artistId', newSong.artistId);

    axios.post(`${API_URL}/songs/create`, formData)
      .then((response) => {
        setSongs([...songs, response.data]);
        setIsModalOpen(false);
        setNewSong({
          title: '',
          file: null,
          image: null,
          duration: '',
          genreId: '',
          artistId: '',
        });
      })
      .catch((error) => console.error('Error adding song:', error));
  };

  return (
    <div>
      <h2 className="text-3xl font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-pink-500">Song Management</h2>
      <button
        className="mb-6 bg-gradient-to-r from-blue-500 to-pink-500 text-white rounded-full px-6 py-2 hover:shadow-lg transition-all duration-300"
        onClick={() => setIsModalOpen(true)}
      >
        Add New Song
      </button>
      <div className="bg-white/10 backdrop-blur-md rounded-xl overflow-hidden">
        <table className="w-full">
          <thead>
            <tr className="border-b border-white/20">
              <th className="text-left p-3 text-white">Title</th>
              <th className="text-left p-3 text-white">Artist</th>
              <th className="text-left p-3 text-white">Genre</th>
              <th className="text-left p-3 text-white">Actions</th>
            </tr>
          </thead>
          <tbody>
            {songs.map((song) => (
              <tr key={song.id} className="border-b border-white/10 hover:bg-white/5 transition-colors">
                <td className="p-3 text-white">{song.title}</td>
                <td className="p-3 text-white">{song.artist.name}</td>
                <td className="p-3 text-white">{song.genre.name}</td>
                <td className="p-3">
                  <button className="mr-2 px-3 py-1 text-sm text-blue-400 border border-blue-400 rounded hover:bg-blue-400 hover:text-white transition-colors">Edit</button>
                  <button
                    className="px-3 py-1 text-sm bg-pink-500 text-white rounded hover:bg-pink-600 transition-colors"
                    onClick={() => deleteSong(song.id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 z-50">
          <div 
            className="fixed inset-0 bg-black/60 backdrop-blur-sm"
            onClick={() => setIsModalOpen(false)}
          />
          
          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4">
              <div className="relative bg-gradient-to-br from-gray-900 to-gray-800 rounded-2xl shadow-xl border border-white/10 w-full max-w-lg">
                <div className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-xl font-bold text-white">
                      Add New Song
                    </h3>
                    <button
                      onClick={() => setIsModalOpen(false)}
                      className="rounded-full p-1 text-gray-400 hover:bg-white/10 hover:text-white transition-colors"
                    >
                      <X size={20} />
                    </button>
                  </div>
                  
                  <div className="space-y-4">
                    <div>
                      <label className="block text-white text-sm mb-1">Title</label>
                      <input
                        type="text"
                        name="title"
                        value={newSong.title}
                        onChange={handleInputChange}
                        className="w-full border border-gray-600 bg-black/30 text-white rounded-lg p-2 focus:ring-2 focus:ring-blue-500"
                        placeholder="Enter song title"
                      />
                    </div>
                    <div>
                      <label className="block text-white text-sm mb-1">File</label>
                      <input
                        type="file"
                        name="file"
                        onChange={handleFileChange}
                        className="w-full border border-gray-600 bg-black/30 text-white rounded-lg p-2 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-500 file:text-white hover:file:bg-blue-600"
                      />
                    </div>
                    <div>
                      <label className="block text-white text-sm mb-1">Image</label>
                      <input
                        type="file"
                        name="image"
                        onChange={handleFileChange}
                        className="w-full border border-gray-600 bg-black/30 text-white rounded-lg p-2 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-500 file:text-white hover:file:bg-blue-600"
                      />
                    </div>
                    <div>
                      <label className="block text-white text-sm mb-1">Duration</label>
                      <input
                        type="text"
                        name="duration"
                        value={newSong.duration}
                        onChange={handleInputChange}
                        className="w-full border border-gray-600 bg-black/30 text-white rounded-lg p-2 focus:ring-2 focus:ring-blue-500"
                        placeholder="Enter duration (e.g., 3:45)"
                      />
                    </div>
                    <div>
                      <label className="block text-white text-sm mb-1">Genre</label>
                      <select
                        name="genreId"
                        value={newSong.genreId}
                        onChange={handleInputChange}
                        className="w-full border border-gray-600 bg-black/30 text-white rounded-lg p-2"
                      >
                        <option value="">Select Genre</option>
                        {genres.map((genre) => (
                          <option key={genre.id} value={genre.id}>
                            {genre.name}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label className="block text-white text-sm mb-1">Artist</label>
                      <select
                        name="artistId"
                        value={newSong.artistId}
                        onChange={handleInputChange}
                        className="w-full border border-gray-600 bg-black/30 text-white rounded-lg p-2"
                      >
                        <option value="">Select Artist</option>
                        {artists.map((artist) => (
                          <option key={artist.id} value={artist.id}>
                            {artist.name}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                  
                  <div className="flex justify-end gap-2 mt-6">
                    <button
                      className="px-4 py-2 text-white bg-gray-600 rounded-lg hover:bg-gray-500 transition-colors"
                      onClick={() => setIsModalOpen(false)}
                    >
                      Cancel
                    </button>
                    <button
                      className="px-4 py-2 text-white bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg hover:shadow-lg transition-all transform hover:scale-105"
                      onClick={handleAddSong}
                    >
                      Add Song
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SongManagement;