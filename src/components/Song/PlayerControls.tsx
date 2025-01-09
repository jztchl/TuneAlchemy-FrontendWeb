import { Play, Pause, SkipBack, SkipForward, Shuffle, Volume2 } from 'lucide-react';

interface PlayerControlsProps {
  isPlaying: boolean;
  onPlayPause: () => void;
  onNext: () => void;
  onPrevious: () => void;
  onShuffle: () => void;
  isShuffled: boolean;
  currentSong: { title: string; artistId: number } | null;
  volume: number;
  onVolumeChange: (value: number) => void;
}

export default function PlayerControls({
  isPlaying,
  onPlayPause,
  onNext,
  onPrevious,
  onShuffle,
  isShuffled,
  currentSong,
  volume,
  onVolumeChange,
}: PlayerControlsProps) {
  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 px-4 py-3 shadow-lg">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Song Info */}
        <div className="w-1/4">
          {currentSong && (
            <div>
              <h4 className="font-semibold text-gray-800 truncate">{currentSong.title}</h4>
              <p className="text-sm text-gray-600">Artist {currentSong.artistId}</p>
            </div>
          )}
        </div>

        {/* Controls */}
        <div className="flex items-center space-x-6">
          <button
            onClick={onShuffle}
            className={`p-2 rounded-full hover:bg-gray-100 ${
              isShuffled ? 'text-indigo-600' : 'text-gray-600'
            }`}
          >
            <Shuffle className="h-5 w-5" />
          </button>
          <button
            onClick={onPrevious}
            className="p-2 rounded-full hover:bg-gray-100 text-gray-600"
          >
            <SkipBack className="h-5 w-5" />
          </button>
          <button
            onClick={onPlayPause}
            className="p-3 rounded-full bg-indigo-600 text-white hover:bg-indigo-700"
          >
            {isPlaying ? (
              <Pause className="h-6 w-6" />
            ) : (
              <Play className="h-6 w-6" />
            )}
          </button>
          <button
            onClick={onNext}
            className="p-2 rounded-full hover:bg-gray-100 text-gray-600"
          >
            <SkipForward className="h-5 w-5" />
          </button>
        </div>

        {/* Volume Control */}
        <div className="w-1/4 flex items-center justify-end space-x-2">
          <Volume2 className="h-5 w-5 text-gray-600" />
          <input
            type="range"
            min="0"
            max="1"
            step="0.01"
            value={volume}
            onChange={(e) => onVolumeChange(parseFloat(e.target.value))}
            className="w-24 accent-indigo-600"
          />
        </div>
      </div>
    </div>
  );
}