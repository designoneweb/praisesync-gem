'use client';

import { useState } from 'react';
import { Song } from '@/types';

interface SetListBuilderProps {
  songs: Song[];
}

interface SelectedSong extends Song {
  arrangementKey: string;
}

export default function SetListBuilder({ songs }: SetListBuilderProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedSongs, setSelectedSongs] = useState<SelectedSong[]>([]);
  const [currentSetlistName, setCurrentSetlistName] = useState('New Setlist - May 11, 2025');

  const availableSongs = songs.filter(song => 
    song.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    song.artist.toLowerCase().includes(searchTerm.toLowerCase()) ||
    song.theme.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const addSongToSetlist = (song: Song) => {
    if (!selectedSongs.find(s => s.id === song.id)) {
      setSelectedSongs([...selectedSongs, { ...song, arrangementKey: song.key }]);
    }
  };

  const removeSongFromSetlist = (songId: string) => {
    setSelectedSongs(selectedSongs.filter(s => s.id !== songId));
  };
  
  const handleKeyChange = (songId: string, newKey: string) => {
    setSelectedSongs(selectedSongs.map(s => 
      s.id === songId ? { ...s, arrangementKey: newKey } : s
    ));
  };

  // Drag and Drop Handlers
  const onDragStart = (e: React.DragEvent, song: Song) => {
    e.dataTransfer.setData("song", JSON.stringify(song));
  };

  const onDrop = (e: React.DragEvent) => {
    e.preventDefault();
    const songData = e.dataTransfer.getData("song");
    if (songData) {
      const song = JSON.parse(songData);
      addSongToSetlist(song);
    }
  };
  
  const onDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  return (
    <div className="p-6 bg-off-white min-h-screen">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-semibold text-navy">Set List Builder</h2>
        <button className="bg-gold text-navy font-semibold py-2 px-4 rounded-lg shadow hover:bg-opacity-90 transition-colors">
          Save Set List
        </button>
      </div>

      <input 
        type="text"
        value={currentSetlistName}
        onChange={(e) => setCurrentSetlistName(e.target.value)}
        className="w-full p-2 mb-6 border border-gray-300 rounded-lg shadow-sm focus:ring-gold focus:border-gold"
        placeholder="Setlist Name (e.g., Sunday Morning Worship)"
      />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Left Pane: Song Library */}
        <div className="bg-white p-4 rounded-lg shadow">
          <h3 className="text-lg font-semibold text-navy mb-3">Song Library</h3>
          <input
            type="text"
            placeholder="Search songs by title, artist, theme..."
            className="w-full p-2 mb-4 border border-gray-300 rounded-lg focus:ring-gold focus:border-gold"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <div className="max-h-96 overflow-y-auto">
            {availableSongs.length > 0 ? availableSongs.map(song => (
              <div 
                key={song.id} 
                className="p-3 mb-2 border rounded-lg hover:bg-gray-100 cursor-pointer flex justify-between items-center"
                draggable
                onDragStart={(e) => onDragStart(e, song)}
              >
                <div>
                  <p className="font-medium text-navy">{song.title}</p>
                  <p className="text-sm text-gray-600">{song.artist} - Key: {song.key}</p>
                  <p className="text-xs text-gray-500">Theme: {song.theme} | Last Played: {song.lastPlayed || 'N/A'}</p>
                </div>
                <button 
                  onClick={() => addSongToSetlist(song)}
                  className="text-sm bg-gold text-navy px-3 py-1 rounded hover:bg-opacity-80"
                >
                  Add
                </button>
              </div>
            )) : <p className="text-gray-500">No songs found matching your search.</p>}
          </div>
          <button className="mt-4 text-sm text-gold hover:underline">
            Import from SongSelect CSV (Not Implemented)
          </button>
        </div>

        {/* Right Pane: Current Set List */}
        <div 
          className="bg-white p-4 rounded-lg shadow"
          onDrop={onDrop}
          onDragOver={onDragOver}
        >
          <h3 className="text-lg font-semibold text-navy mb-3">Current Set List ({selectedSongs.length} songs)</h3>
          {selectedSongs.length > 0 ? (
            <ul className="max-h-96 overflow-y-auto">
              {selectedSongs.map((song, index) => (
                <li key={song.id} className="p-3 mb-2 border rounded-lg flex justify-between items-start">
                  <div>
                    <span className="text-xs text-gray-500 mr-2">{index + 1}.</span>
                    <span className="font-medium text-navy">{song.title}</span>
                    <p className="text-sm text-gray-600 ml-5">{song.artist}</p>
                    <div className="ml-5 mt-1">
                      <label htmlFor={`key-${song.id}`} className="text-xs text-gray-500 mr-1">Key:</label>
                      <select 
                        id={`key-${song.id}`}
                        value={song.arrangementKey}
                        onChange={(e) => handleKeyChange(song.id, e.target.value)}
                        className="text-xs border border-gray-300 rounded p-1"
                      >
                        {['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B'].map(k => 
                          <option key={k} value={k}>{k}</option>
                        )}
                      </select>
                    </div>
                  </div>
                  <button 
                    onClick={() => removeSongFromSetlist(song.id)}
                    className="text-sm text-red-500 hover:text-red-700"
                  >
                    Remove
                  </button>
                </li>
              ))}
            </ul>
          ) : (
            <div className="text-center py-10 border-2 border-dashed border-gray-300 rounded-lg">
              <p className="text-gray-500">Drag songs here or click 'Add' from the library.</p>
            </div>
          )}
          <div className="mt-4">
            <button className="text-sm text-navy hover:underline mr-4">
              AI Song Suggestions (Not Implemented)
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
