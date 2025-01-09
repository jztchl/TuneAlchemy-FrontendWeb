import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import * as authService from '../services/authService';
const API_URL = 'http://127.0.0.1:3001';
export default function UserProfile() {
  const [user, setUser] = useState<any>(null);
  const [error, setError] = useState('');
  const [profilePicture, setProfilePicture] = useState<File | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const currentUser = await authService.fetchUserProfile();
        if (!currentUser) {
          navigate('/login');
        } else {
            if(currentUser.profilePicture){ currentUser.profilePicture=`${API_URL}/${currentUser.profilePicture}`;}
          setUser(currentUser);
          console.log(currentUser)
        }
      } catch (err) {
        setError('Failed to fetch user profile.');
      }
    };

    fetchUserProfile();
  }, [navigate]);

  const handleUpdateProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('username', user.username);
    formData.append('email', user.email);
    if (profilePicture) {
      formData.append('profilePicture', profilePicture);
    }

    try {
      await authService.updateUserProfile(formData);
      alert('Profile updated successfully!');
      setIsEditing(false);
    } catch (err) {
      setError('Failed to update profile.');
    }
  };

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold text-gray-800 mb-8">User Profile</h1>
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          {error}
        </div>
      )}
      {user && (
        <form onSubmit={handleUpdateProfile} className="space-y-6">
          <div>
            <label className="block text-gray-700 text-sm font-bold mb-2">Username</label>
            {isEditing ? (
              <input
                type="text"
                value={user.username}
                onChange={(e) => setUser({ ...user, username: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                required
              />
            ) : (
              <p className="text-gray-800">{user.username}</p>
            )}
          </div>
          <div>
            <label className="block text-gray-700 text-sm font-bold mb-2">Email</label>
            {isEditing ? (
              <input
                type="email"
                value={user.email}
                onChange={(e) => setUser({ ...user, email: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                required
              />
            ) : (
              <p className="text-gray-800">{user.email}</p>
            )}
          </div>
          <div>
            <label className="block text-gray-700 text-sm font-bold mb-2">Profile Picture</label>
            {user.profilePicture && !isEditing ? (
              <img src={user.profilePicture} alt="Profile" className="w-32 h-32 rounded-full mb-4" />
            ) : (
              <input
                type="file"
                accept="image/*"
                onChange={(e) => setProfilePicture(e.target.files?.[0] || null)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            )}
          </div>
          {isEditing ? (
            <button
              type="submit"
              className="w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
              Update Profile
            </button>
          ) : (
            <button
              type="button"
              onClick={() => setIsEditing(true)}
              className="w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
              Edit Profile
            </button>
          )}
        </form>
      )}
    </div>
  );
}
