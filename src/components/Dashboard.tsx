import { useEffect, useState } from 'react';
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
    <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-blue-900 to-pink-800 p-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold mb-8 text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-pink-500">Welcome Back!</h1>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          <StatCard icon={<Play className="h-8 w-8 mb-4" />} title="Recently Played" value={`${recentSongs.length} songs`} gradient="from-purple-400 to-pink-500" />
          <StatCard icon={<Disc className="h-8 w-8 mb-4" />} title="Your Library" value="142 songs" gradient="from-blue-400 to-indigo-500" />
          <StatCard icon={<Clock className="h-8 w-8 mb-4" />} title="Hours Listened" value="48 hours" gradient="from-green-400 to-blue-500" />
          <StatCard icon={<TrendingUp className="h-8 w-8 mb-4" />} title="Top Genre" value="Rock" gradient="from-pink-400 to-red-500" />
        </div>

        <div className="bg-white/10 backdrop-blur-md rounded-xl shadow-lg p-6">
          <h2 className="text-3xl font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-pink-500">Recently Played</h2>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="text-left border-b border-white/20">
                  <th className="pb-4 font-semibold text-blue-300">#</th>
                  <th className="pb-4 font-semibold text-blue-300">Title</th>
                  <th className="pb-4 font-semibold text-blue-300">Artist</th>
                  <th className="pb-4 font-semibold text-blue-300">Duration</th>
                </tr>
              </thead>
              <tbody>
                {recentSongs.map((song, index) => (
                  <tr key={song.id} className="border-b border-white/10 hover:bg-white/5 transition-colors">
                    <td className="py-4 text-pink-300">{index + 1}</td>
                    <td className="py-4 font-medium text-white">{song.title}</td>
                    <td className="py-4 text-blue-200">{song.artist}</td>
                    <td className="py-4 text-blue-200">{song.duration}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
interface StatCardProps {
  icon: React.ReactNode;
  title: string;
  value: string;
  gradient: string;
}
function StatCard({ icon, title, value, gradient }:StatCardProps) {
  return (
    <div className={`bg-gradient-to-br ${gradient} text-white rounded-xl p-6 shadow-lg backdrop-blur-md bg-opacity-30`}>
      {icon}
      <h3 className="text-xl font-semibold mb-2">{title}</h3>
      <p className="text-2xl font-bold">{value}</p>
    </div>
  );
}