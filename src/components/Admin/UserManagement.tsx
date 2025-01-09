import React ,{useEffect,useState}from 'react';
import { config } from '../../config/config';
import axios from 'axios';

const getAuthHeader = () => {
  const user = JSON.parse(localStorage.getItem('user') || '{}');
  return {
    headers: { Authorization: `Bearer ${user.token}` }
  };
};

const API_URL = config.API_URL;
const UserManagement: React.FC = () => {
  const [users, setUsers] = useState<any[]>([]);

  useEffect(() => {
    axios.get(`${API_URL}/users/list`,getAuthHeader())
      .then((response) => setUsers(response.data))
      .catch((error) => console.error('Error fetching songs:', error));
  }, []);

  return (
    <div>
      <h2 className="text-3xl font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-pink-500">User Management</h2>
      <button className="mb-6 bg-gradient-to-r from-blue-500 to-pink-500 text-white rounded-full px-6 py-2 hover:shadow-lg transition-all duration-300">
        Add New User
      </button>
      <div className="bg-white/10 backdrop-blur-md rounded-xl overflow-hidden">
        <table className="w-full">
          <thead>
            <tr className="border-b border-white/20">
              <th className="text-left p-3 text-white">Username</th>
              <th className="text-left p-3 text-white">Email</th>
              <th className="text-left p-3 text-white">Role</th>
              <th className="text-left p-3 text-white">Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.id} className="border-b border-white/10 hover:bg-white/5 transition-colors">
                <td className="p-3 text-white">{user.username}</td>
                <td className="p-3 text-white">{user.email}</td>
                <td className="p-3 text-white">{user.role}</td>
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

export default UserManagement;

