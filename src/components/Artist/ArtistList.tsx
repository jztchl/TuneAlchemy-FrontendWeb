import { useEffect, useState, useRef, useCallback } from 'react';
import { Play, Pause, MoreHorizontal } from 'lucide-react';
import * as artistService from '../../services/artistService';
import * as songService from '../../services/songService';
import PlayerControls from '../Song/PlayerControls';
const API_URL_ROOT = 'http://127.0.0.1:3001/';
interface Artist {
  id: string;
  name: string;
}

interface Song {
  id: string;
  title: string;
  artistId: number;
}

export default function ArtistList() {
  const [artists, setArtists] = useState<Artist[]>([]);
  const [songs, setSongs] = useState<Song[]>([]);
  const [selectedArtist, setSelectedArtist] = useState<Artist | null>(null);
  const [loading, setLoading] = useState(true);
  const [currentSong, setCurrentSong] = useState<string | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(1);
  const [isShuffled, setIsShuffled] = useState(false);
  const [playQueue, setPlayQueue] = useState<string[]>([]);
  const audioRef = useRef<HTMLAudioElement>(new Audio());

  useEffect(() => {
    const fetchArtists = async () => {
      try {
        const data = await artistService.getAllArtists();
        setArtists(data);
      } catch (error) {
        console.error('Error fetching artists:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchArtists();

    return () => {
      audioRef.current.pause();
      audioRef.current.src = '';
    };
  }, []);

  useEffect(() => {
    if (selectedArtist) {
      const fetchSongsByArtist = async () => {
        try {
          const data = await artistService.getArtistSongs(selectedArtist.id);
          setSongs(data);
          setPlayQueue(data.map((song: Song) => song.id));
        } catch (error) {
          console.error('Error fetching songs:', error);
        }
      };

      fetchSongsByArtist();
    }
  }, [selectedArtist]);

  // Update audio volume when volume state changes
  useEffect(() => {
    audioRef.current.volume = volume;
  }, [volume]);

  const getCurrentSongIndex = useCallback(() => {
    return playQueue.findIndex(id => id === currentSong);
  }, [playQueue, currentSong]);

  const handlePlayPause = async (songId: string) => {
    try {
      if (currentSong === songId) {
        if (isPlaying) {
          audioRef.current.pause();
        } else {
          await audioRef.current.play();
        }
        setIsPlaying(!isPlaying);
      } else {
        const songUrl = await songService.getSongById(songId);
        audioRef.current.src = songUrl;
        await audioRef.current.play();
        setCurrentSong(songId);
        setIsPlaying(true);
      }
    } catch (error) {
      console.error('Error playing song:', error);
    }
  };

  const handleNext = async () => {
    const currentIndex = getCurrentSongIndex();
    if (currentIndex < playQueue.length - 1) {
      const nextSongId = playQueue[currentIndex + 1];
      await handlePlayPause(nextSongId);
    }
  };

  const handlePrevious = async () => {
    const currentIndex = getCurrentSongIndex();
    if (currentIndex > 0) {
      const previousSongId = playQueue[currentIndex - 1];
      await handlePlayPause(previousSongId);
    }
  };

  const handleShuffle = () => {
    setIsShuffled(!isShuffled);
    if (!isShuffled) {
      const shuffledQueue = [...playQueue].sort(() => Math.random() - 0.5);
      setPlayQueue(shuffledQueue);
    } else {
      setPlayQueue(songs.map(song => song.id));
    }
  };

  useEffect(() => {
    const audio = audioRef.current;

    const handleEnded = () => {
      handleNext();
    };

    const handleError = (e: ErrorEvent) => {
      console.error('Audio playback error:', e);
      setIsPlaying(false);
    };

    audio.addEventListener('ended', handleEnded);
    audio.addEventListener('error', handleError);

    return () => {
      audio.removeEventListener('ended', handleEnded);
      audio.removeEventListener('error', handleError);
    };
  }, [handleNext]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-full">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
      </div>
    );
  }

  const currentSongData = songs.find(song => song.id === currentSong) || null;

  return (
    <div className="flex p-8 pb-24">
      <div className="w-1/4 pr-4">
        <h1 className="text-3xl font-bold text-gray-800 mb-8">Artists</h1>
        <div className="grid grid-cols-1 gap-6">
          {artists.map((artist) => (
            <div
              key={artist.id}
              className={`bg-white rounded-xl shadow-lg overflow-hidden group ${
                selectedArtist?.id === artist.id ? 'ring-2 ring-indigo-600' : ''
              }`}
              onClick={() => setSelectedArtist(artist)}
            >
              <div className="relative">
                <img
                  src={`${API_URL_ROOT}${artist.image}`}
                  alt={artist.name}
                  className="w-full h-48 object-cover"
                />
              </div>
              <div className="p-4">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-semibold text-gray-800 mb-1">{artist.name}</h3>
                  </div>
                  <button className="text-gray-400 hover:text-gray-600">
                    <MoreHorizontal className="h-5 w-5" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="w-3/4 pl-4">
        {selectedArtist && (
          <div>
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Songs by {selectedArtist.name}</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {songs.map((song) => (
                <div
                  key={song.id}
                  className={`bg-white rounded-xl shadow-lg overflow-hidden group ${
                    currentSong === song.id ? 'ring-2 ring-indigo-600' : ''
                  }`}
                >
                  <div className="relative">
                    <img
                      src={`${API_URL_ROOT}${song.image}`}
                      alt={song.title}
                      className="w-full h-48 object-cover"
                    />
                    <button
                      onClick={() => handlePlayPause(song.id)}
                      className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      {currentSong === song.id && isPlaying ? (
                        <Pause className="h-12 w-12 text-white" />
                      ) : (
                        <Play className="h-12 w-12 text-white" />
                      )}
                    </button>
                  </div>
                  <div className="p-4">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="font-semibold text-gray-800 mb-1">{song.title}</h3>
                      </div>
                      <button className="text-gray-400 hover:text-gray-600">
                        <MoreHorizontal className="h-5 w-5" />
                      </button>
                    </div>
                    <div className={`mt-2 text-sm ${currentSong === song.id ? 'text-indigo-600' : 'text-gray-500'}`}>
                      {currentSong === song.id ? (isPlaying ? 'Now Playing' : 'Paused') : 'Click to play'}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
      <PlayerControls
        isPlaying={isPlaying}
        onPlayPause={() => currentSong && handlePlayPause(currentSong)}
        onNext={handleNext}
        onPrevious={handlePrevious}
        onShuffle={handleShuffle}
        isShuffled={isShuffled}
        currentSong={currentSongData}
        volume={volume}
        onVolumeChange={setVolume}
      />
    </div>
  );
}
