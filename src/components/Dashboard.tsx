import  { useEffect, useState } from 'react';
import { Play, Disc, Clock, TrendingUp } from 'lucide-react';
import recentlyPlayedService from '../services/recentlyPlayedService';

export default function Dashboard() {
  const [recentSongs, setRecentSongs] = useState([]);

  useEffect(() => {
    const fetchRecentlyPlayed = async () => {
      const data = await recentlyPlayedService.getRecentlyPlayed();
      setRecentSongs(data);
    };
    fetchRecentlyPlayed();
  }, []);

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold text-gray-800 mb-8">Welcome Back!</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
        <div className="bg-purple-600 text-white rounded-xl p-6 shadow-lg">
          <Play className="h-8 w-8 mb-4" />
          <h3 className="text-xl font-semibold mb-2">Recently Played</h3>
          <p className="text-2xl font-bold">{recentSongs.length} songs</p>
        </div>

        <div className="bg-indigo-600 text-white rounded-xl p-6 shadow-lg">
          <Disc className="h-8 w-8 mb-4" />
          <h3 className="text-xl font-semibold mb-2">Your Library</h3>
          <p className="text-2xl font-bold">142 songs</p>
        </div>

        <div className="bg-blue-600 text-white rounded-xl p-6 shadow-lg">
          <Clock className="h-8 w-8 mb-4" />
          <h3 className="text-xl font-semibold mb-2">Hours Listened</h3>
          <p className="text-2xl font-bold">48 hours</p>
        </div>

        <div className="bg-pink-600 text-white rounded-xl p-6 shadow-lg">
          <TrendingUp className="h-8 w-8 mb-4" />
          <h3 className="text-xl font-semibold mb-2">Top Genre</h3>
          <p className="text-2xl font-bold">Rock</p>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-lg p-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">Recently Played</h2>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="text-left border-b border-gray-200">
                <th className="pb-4 font-semibold text-gray-600">#</th>
                <th className="pb-4 font-semibold text-gray-600">Title</th>
                <th className="pb-4 font-semibold text-gray-600">Artist</th>
                <th className="pb-4 font-semibold text-gray-600">Duration</th>
              </tr>
            </thead>
            <tbody>
              {recentSongs.map((song, index) => (
                <tr key={song.id} className="hover:bg-gray-50">
                  <td className="py-4 text-gray-500">{index + 1}</td>
                  <td className="py-4 font-medium">{song.title}</td>
                  <td className="py-4 text-gray-600">{song.artist.name}</td>
                  <td className="py-4 text-gray-600">{song.duration}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
