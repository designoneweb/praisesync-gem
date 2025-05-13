import React, { useState } from 'react';

// Mock data - in a real app, this would come from an API
const initialServices = [
  { id: 1, date: '2025-05-11', time: '10:00 AM', theme: 'Mother\'s Day Service', bulletinReady: true, ccliStatus: 'Reported' },
  { id: 2, date: '2025-05-18', time: '10:00 AM', theme: 'Pentecost Sunday', bulletinReady: false, ccliStatus: 'Pending' },
  { id: 3, date: '2025-05-25', time: '10:00 AM', theme: 'Trinity Sunday', bulletinReady: true, ccliStatus: 'Reported' },
];

const initialSongs = [
    { id: 's1', title: 'Amazing Grace', artist: 'John Newton', key: 'G', theme: 'Grace', lastPlayed: '2025-04-20' },
    { id: 's2', title: 'How Great Thou Art', artist: 'Carl Boberg', key: 'Bb', theme: 'Majesty', lastPlayed: '2025-04-13' },
    { id: 's3', title: '10,000 Reasons (Bless the Lord)', artist: 'Matt Redman', key: 'C', theme: 'Blessing', lastPlayed: '2025-05-04' },
    { id: 's4', title: 'In Christ Alone', artist: 'Keith Getty, Stuart Townend', key: 'D', theme: 'Faith', lastPlayed: '2025-03-16' },
    { id: 's5', title: 'What A Beautiful Name', artist: 'Hillsong Worship', key: 'D', theme: 'Praise', lastPlayed: '2025-04-27' },
];

const initialTeamMembers = [
    { id: 'm1', name: 'Anna Williams', role: 'Worship Leader', status: 'Confirmed', photoUrl: 'https://placehold.co/100x100/E0E0E0/757575?text=AW' },
    { id: 'm2', name: 'Ben Carter', role: 'Guitarist', status: 'Pending', photoUrl: 'https://placehold.co/100x100/E0E0E0/757575?text=BC' },
    { id: 'm3', name: 'Carl Davis', role: 'Pianist', status: 'Declined', photoUrl: 'https://placehold.co/100x100/E0E0E0/757575?text=CD' },
    { id: 'm4', name: 'Sarah Miller', role: 'Vocals', status: 'Confirmed', photoUrl: 'https://placehold.co/100x100/E0E0E0/757575?text=SM' },
    { id: 'm5', name: 'David Wilson', role: 'Drums', status: 'Confirmed', photoUrl: 'https://placehold.co/100x100/E0E0E0/757575?text=DW' },
];

// Helper function to format date
const formatDate = (dateString) => {
  const options = { year: 'numeric', month: 'long', day: 'numeric' };
  return new Date(dateString).toLocaleDateString(undefined, options);
};

// Icons (simple SVGs for now, can be replaced with Lucide or other libraries)
const CalendarIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 mr-2">
    <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 7.5v11.25m-18 0A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75m-18 0v-7.5A2.25 2.25 0 0 1 5.25 9h13.5A2.25 2.25 0 0 1 21 11.25v7.5m-9-3.75h.008v.008H12v-.008ZM12 15h.008v.008H12V15Zm0 2.25h.008v.008H12v-.008ZM9.75 15h.008v.008H9.75V15Zm0 2.25h.008v.008H9.75v-.008ZM7.5 15h.008v.008H7.5V15Zm0 2.25h.008v.008H7.5v-.008Zm6.75-4.5h.008v.008h-.008v-.008Zm0 2.25h.008v.008h-.008V15Zm0 2.25h.008v.008h-.008v-.008Zm2.25-4.5h.008v.008H16.5v-.008Zm0 2.25h.008v.008H16.5V15Z" />
  </svg>
);

const MusicNoteIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 mr-2">
    <path strokeLinecap="round" strokeLinejoin="round" d="M9 9l10.5-3m0 6.553v3.75a2.25 2.25 0 0 1-1.632 2.163l-1.32.377a1.803 1.803 0 1 1-.99-3.467l2.31-.66a2.25 2.25 0 0 0 1.632-2.163Zm0 0V7.5A2.25 2.25 0 0 0 19.5 5.25S18 3 16.5 3S15 5.25 15 5.25v4.903Zm-9 0v9A2.25 2.25 0 0 0 7.5 21h9a2.25 2.25 0 0 0 2.25-2.25v-9" />
  </svg>
);

const DocumentTextIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 mr-2">
    <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9Z" />
  </svg>
);

const UsersIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 mr-2">
    <path strokeLinecap="round" strokeLinejoin="round" d="M15 19.128a9.38 9.38 0 0 0 2.625.372 9.337 9.337 0 0 0 4.121-.952 4.125 4.125 0 0 0-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 0 1 8.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0 1 11.964-3.07M12 6.375a3.375 3.375 0 1 1-6.75 0 3.375 3.375 0 0 1 6.75 0Zm8.25 2.25a2.625 2.625 0 1 1-5.25 0 2.625 2.625 0 0 1 5.25 0Z" />
  </svg>
);

const ChartBarIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 mr-2">
    <path strokeLinecap="round" strokeLinejoin="round" d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 0 1 3 19.875v-6.75ZM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 0 1-1.125-1.125V8.625ZM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 0 1-1.125-1.125V4.125Z" />
  </svg>
);

const CogIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 mr-2">
        <path strokeLinecap="round" strokeLinejoin="round" d="M10.343 3.94c.09-.542.56-.94 1.11-.94h1.093c.55 0 1.02.398 1.11.94l.149.894c.07.424.384.764.78.93s.844-.002 1.185-.185l.69-.342c.475-.236 1.023-.042 1.298.317l.734.98c.275.374.275.886 0 1.26l-.28.373c-.217.29-.335.65-.335.99v.342c0 .34.118.698.335.99l.28.373c.275.374.275.886 0 1.26l-.734.98c-.275.374-.823.553-1.298.317l-.69-.342c-.34-.183-.756-.217-1.185-.185s-.71.506-.78.93l-.149.894c-.09.542-.56.94-1.11.94h-1.093c-.55 0-1.02-.398-1.11-.94l-.149-.894c-.07-.424-.384-.764-.78-.93s-.844.002-1.185.185l-.69.342c-.475.236-1.023.042-1.298-.317l-.734-.98c-.275-.374-.275-.886 0-1.26l.28-.373c.217-.29.335-.65.335-.99v-.342c0-.34-.118-.698-.335-.99l-.28-.373c-.275-.374-.275-.886 0-1.26l.734-.98c.275-.374.823-.553-1.298.317l.69-.342c.34-.183.756-.217 1.185-.185s.71-.506.78-.93l.149-.894Z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
    </svg>
);

const CreditCardIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 mr-2">
        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 8.25h19.5M2.25 9h19.5m-16.5 5.25h6m-6 2.25h6m3-5.25H21m-9 5.25h5.25M6 18a2.25 2.25 0 0 0 2.25 2.25h3.75A2.25 2.25 0 0 0 14.25 18V6A2.25 2.25 0 0 0 12 3.75H8.25A2.25 2.25 0 0 0 6 6v12Z" />
    </svg>
);

const HomeIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 mr-2">
        <path strokeLinecap="round" strokeLinejoin="round" d="m2.25 12 8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h7.5" />
    </svg>
);


// Sidebar Component
const Sidebar = ({ setCurrentView }) => {
  const navItems = [
    { name: 'Dashboard', icon: <HomeIcon />, view: 'Dashboard' },
    { name: 'Schedule', icon: <CalendarIcon />, view: 'Schedule' },
    { name: 'Set Lists', icon: <MusicNoteIcon />, view: 'SetList' },
    { name: 'Bulletins', icon: <DocumentTextIcon />, view: 'Bulletins' },
    { name: 'Team', icon: <UsersIcon />, view: 'Team' },
    { name: 'Reports', icon: <ChartBarIcon />, view: 'Reports' },
    { name: 'CCLI Settings', icon: <CogIcon />, view: 'CCLISettings' },
    { name: 'Billing', icon: <CreditCardIcon />, view: 'Billing' },
  ];

  return (
    <div className="w-64 h-screen bg-[#1E2A52] text-white p-5 flex flex-col fixed" style={{ fontFamily: 'Inter, sans-serif' }}>
      <div className="text-2xl font-bold text-[#F4B860] mb-10">PraiseSync</div>
      <nav>
        <ul>
          {navItems.map((item) => (
            <li key={item.name} className="mb-2">
              <button
                onClick={() => setCurrentView(item.view)}
                className="flex items-center w-full py-2 px-3 rounded-lg hover:bg-[#2A3B70] hover:text-[#F4B860] transition-colors duration-200"
              >
                {item.icon}
                {item.name}
              </button>
            </li>
          ))}
        </ul>
      </nav>
      <div className="mt-auto text-xs text-gray-400">
        <p>&copy; 2025 PraiseSync</p>
        <p>Version 0.1.0</p>
      </div>
    </div>
  );
};

// Header Component
const Header = ({ title }) => {
  return (
    <header className="bg-[#FAF9F7] shadow-sm p-4 sticky top-0 z-10" style={{ fontFamily: 'Inter, sans-serif' }}>
      <h1 className="text-xl font-semibold text-[#1E2A52]">{title}</h1>
    </header>
  );
};

// Dashboard Component
const Dashboard = ({ setCurrentView }) => {
    const nextService = initialServices.length > 0 ? initialServices.sort((a,b) => new Date(a.date) - new Date(b.date)).find(s => new Date(s.date) >= new Date()) : null;
    const upcomingServices = initialServices.filter(s => new Date(s.date) >= new Date()).slice(0, 3);

  return (
    <div className="p-6 bg-[#FAF9F7]" style={{ fontFamily: 'Inter, sans-serif' }}>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
        {/* KPI: Next Service Date */}
        <div className="bg-white p-6 rounded-lg shadow hover:shadow-lg transition-shadow">
          <h3 className="text-sm font-medium text-gray-500">Next Service</h3>
          {nextService ? (
            <>
              <p className="text-2xl font-semibold text-[#1E2A52]">{formatDate(nextService.date)}</p>
              <p className="text-sm text-gray-600">{nextService.theme}</p>
            </>
          ) : (
            <p className="text-2xl font-semibold text-[#1E2A52]">No upcoming services</p>
          )}
        </div>

        {/* KPI: Bulletin Ready? */}
        <div className="bg-white p-6 rounded-lg shadow hover:shadow-lg transition-shadow">
          <h3 className="text-sm font-medium text-gray-500">Next Bulletin Status</h3>
          {nextService ? (
            <p className={`text-2xl font-semibold ${nextService.bulletinReady ? 'text-green-500' : 'text-yellow-500'}`}>
              {nextService.bulletinReady ? 'Ready' : 'Pending'}
            </p>
          ) : (
             <p className="text-2xl font-semibold text-gray-400">N/A</p>
          )}
           <button
                onClick={() => setCurrentView('Bulletins')}
                className="mt-2 text-sm text-[#F4B860] hover:underline"
            >
                View Bulletins
            </button>
        </div>

        {/* KPI: CCLI Status */}
        <div className="bg-white p-6 rounded-lg shadow hover:shadow-lg transition-shadow">
          <h3 className="text-sm font-medium text-gray-500">CCLI Reporting</h3>
           {nextService ? (
            <p className={`text-2xl font-semibold ${nextService.ccliStatus === 'Reported' ? 'text-green-500' : 'text-orange-500'}`}>
              {nextService.ccliStatus}
            </p>
          ) : (
             <p className="text-2xl font-semibold text-gray-400">N/A</p>
          )}
          <button
                onClick={() => setCurrentView('CCLISettings')}
                className="mt-2 text-sm text-[#F4B860] hover:underline"
            >
                Manage CCLI
            </button>
        </div>
      </div>

      {/* Prepare Sunday Button */}
      <div className="mb-8 text-center">
        <button 
          onClick={() => alert('Prepare Sunday Wizard (not implemented yet)')} // Placeholder action
          className="bg-[#F4B860] text-[#1E2A52] font-semibold py-3 px-8 rounded-lg shadow-md hover:bg-opacity-90 transition-colors text-lg"
        >
          Prepare Sunday
        </button>
      </div>
      
      {/* Upcoming Services Section */}
      <div className="mb-8">
        <h2 className="text-xl font-semibold text-[#1E2A52] mb-4">Upcoming Services</h2>
        {upcomingServices.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {upcomingServices.map(service => (
                <div key={service.id} className="bg-white p-4 rounded-lg shadow hover:shadow-md transition-shadow">
                <h3 className="font-semibold text-[#1E2A52]">{formatDate(service.date)} - {service.time}</h3>
                <p className="text-sm text-gray-700">{service.theme}</p>
                <div className="mt-2">
                    <span className={`text-xs font-semibold px-2 py-1 rounded-full ${service.bulletinReady ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'}`}>
                    Bulletin: {service.bulletinReady ? 'Ready' : 'Pending'}
                    </span>
                </div>
                 <button 
                    onClick={() => setCurrentView('Schedule')} // Navigate to schedule or specific service plan
                    className="mt-3 text-sm text-[#F4B860] hover:underline"
                >
                    View Plan
                </button>
                </div>
            ))}
            </div>
        ) : (
            <p className="text-gray-600">No upcoming services scheduled.</p>
        )}
      </div>

      {/* Quick Actions Section */}
      <div className="mb-8">
        <h2 className="text-xl font-semibold text-[#1E2A52] mb-4">Quick Actions</h2>
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-4">
          <button 
            onClick={() => setCurrentView('SetList')}
            className="bg-white p-4 rounded-lg shadow hover:shadow-md transition-shadow text-[#1E2A52] hover:bg-gray-50 flex flex-col items-center justify-center"
          >
            <MusicNoteIcon />
            <span className="mt-1 text-sm font-medium">New Set List</span>
          </button>
          <button 
            onClick={() => setCurrentView('Schedule')}
            className="bg-white p-4 rounded-lg shadow hover:shadow-md transition-shadow text-[#1E2A52] hover:bg-gray-50 flex flex-col items-center justify-center"
          >
            <CalendarIcon />
            <span className="mt-1 text-sm font-medium">Schedule Team</span>
          </button>
          <button 
            onClick={() => setCurrentView('Bulletins')}
            className="bg-white p-4 rounded-lg shadow hover:shadow-md transition-shadow text-[#1E2A52] hover:bg-gray-50 flex flex-col items-center justify-center"
          >
            <DocumentTextIcon />
            <span className="mt-1 text-sm font-medium">Create Bulletin</span>
          </button>
           <button 
            onClick={() => setCurrentView('Team')}
            className="bg-white p-4 rounded-lg shadow hover:shadow-md transition-shadow text-[#1E2A52] hover:bg-gray-50 flex flex-col items-center justify-center"
          >
            <UsersIcon />
            <span className="mt-1 text-sm font-medium">Manage Team</span>
          </button>
        </div>
      </div>
      
      {/* Wilbur's Wing Tips - Placeholder */}
      <div className="bg-[#e9e4dd] p-4 rounded-lg shadow">
        <h3 className="text-lg font-semibold text-[#1E2A52] mb-2">Wilbur's Wing Tips ✨</h3>
        <p className="text-sm text-gray-700">
          Tip: You can quickly add songs to a set list by dragging them from your song library!
          Need help? Check out our <a href="#" className="text-[#F4B860] hover:underline">support docs</a>.
        </p>
      </div>
    </div>
  );
};

// Placeholder components for other views
const PlaceholderComponent = ({ title }) => (
  <div className="p-6 bg-[#FAF9F7] min-h-screen" style={{ fontFamily: 'Inter, sans-serif' }}>
    <h2 className="text-2xl font-semibold text-[#1E2A52] mb-4">{title}</h2>
    <div className="bg-white p-8 rounded-lg shadow">
      <p className="text-gray-600">This is a placeholder for the {title} page. Content and functionality will be added here.</p>
      <p className="text-gray-500 mt-2 text-sm">Refer to the PRD and Spec documents for feature details.</p>
    </div>
  </div>
);

const SetListComponent = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedSongs, setSelectedSongs] = useState([]);
    const [currentSetlistName, setCurrentSetlistName] = useState('New Setlist - May 11, 2025'); // Example

    const availableSongs = initialSongs.filter(song => 
        song.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        song.artist.toLowerCase().includes(searchTerm.toLowerCase()) ||
        song.theme.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const addSongToSetlist = (song) => {
        if (!selectedSongs.find(s => s.id === song.id)) {
            setSelectedSongs([...selectedSongs, {...song, arrangementKey: song.key}]); // Add with default key
        }
    };

    const removeSongFromSetlist = (songId) => {
        setSelectedSongs(selectedSongs.filter(s => s.id !== songId));
    };
    
    const handleKeyChange = (songId, newKey) => {
        setSelectedSongs(selectedSongs.map(s => s.id === songId ? {...s, arrangementKey: newKey } : s));
    };

    // Drag and Drop Handlers (basic implementation)
    const onDragStart = (e, song) => {
        e.dataTransfer.setData("song", JSON.stringify(song));
    };

    const onDrop = (e) => {
        e.preventDefault();
        const songData = e.dataTransfer.getData("song");
        if (songData) {
            const song = JSON.parse(songData);
            addSongToSetlist(song);
        }
    };
    
    const onDragOver = (e) => {
        e.preventDefault(); // Necessary to allow dropping
    };


    return (
        <div className="p-6 bg-[#FAF9F7] min-h-screen" style={{ fontFamily: 'Inter, sans-serif' }}>
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-semibold text-[#1E2A52]">Set List Builder</h2>
                <button className="bg-[#F4B860] text-[#1E2A52] font-semibold py-2 px-4 rounded-lg shadow hover:bg-opacity-90 transition-colors">
                    Save Set List
                </button>
            </div>

            <input 
                type="text"
                value={currentSetlistName}
                onChange={(e) => setCurrentSetlistName(e.target.value)}
                className="w-full p-2 mb-6 border border-gray-300 rounded-lg shadow-sm focus:ring-[#F4B860] focus:border-[#F4B860]"
                placeholder="Setlist Name (e.g., Sunday Morning Worship)"
            />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Left Pane: Song Library / Search */}
                <div className="bg-white p-4 rounded-lg shadow">
                    <h3 className="text-lg font-semibold text-[#1E2A52] mb-3">Song Library</h3>
                    <input
                        type="text"
                        placeholder="Search songs by title, artist, theme..."
                        className="w-full p-2 mb-4 border border-gray-300 rounded-lg focus:ring-[#F4B860] focus:border-[#F4B860]"
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
                                    <p className="font-medium text-[#1E2A52]">{song.title}</p>
                                    <p className="text-sm text-gray-600">{song.artist} - Key: {song.key}</p>
                                    <p className="text-xs text-gray-500">Theme: {song.theme} | Last Played: {song.lastPlayed || 'N/A'}</p>
                                </div>
                                <button 
                                    onClick={() => addSongToSetlist(song)}
                                    className="text-sm bg-[#F4B860] text-[#1E2A52] px-3 py-1 rounded hover:bg-opacity-80"
                                >
                                    Add
                                </button>
                            </div>
                        )) : <p className="text-gray-500">No songs found matching your search.</p>}
                    </div>
                     <button className="mt-4 text-sm text-[#F4B860] hover:underline">
                        Import from SongSelect CSV (Not Implemented)
                    </button>
                </div>

                {/* Right Pane: Current Set List (Drag & Drop Target) */}
                <div 
                    className="bg-white p-4 rounded-lg shadow"
                    onDrop={onDrop}
                    onDragOver={onDragOver}
                >
                    <h3 className="text-lg font-semibold text-[#1E2A52] mb-3">Current Set List ({selectedSongs.length} songs)</h3>
                    {selectedSongs.length > 0 ? (
                        <ul className="max-h-96 overflow-y-auto">
                            {selectedSongs.map((song, index) => (
                                <li key={song.id} className="p-3 mb-2 border rounded-lg flex justify-between items-start">
                                    <div>
                                        <span className="text-xs text-gray-500 mr-2">{index + 1}.</span>
                                        <span className="font-medium text-[#1E2A52]">{song.title}</span>
                                        <p className="text-sm text-gray-600 ml-5">{song.artist}</p>
                                        <div className="ml-5 mt-1">
                                            <label htmlFor={`key-${song.id}`} className="text-xs text-gray-500 mr-1">Key:</label>
                                            <select 
                                                id={`key-${song.id}`}
                                                value={song.arrangementKey}
                                                onChange={(e) => handleKeyChange(song.id, e.target.value)}
                                                className="text-xs border-gray-300 rounded p-1"
                                            >
                                                {['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B'].map(k => <option key={k} value={k}>{k}</option>)}
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
                        <button className="text-sm text-[#1E2A52] hover:underline mr-4">AI Song Suggestions (Not Implemented)</button>
                    </div>
                </div>
            </div>
        </div>
    );
};


const ScheduleComponent = () => {
    const [selectedServiceId, setSelectedServiceId] = useState(initialServices.length > 0 ? initialServices[0].id : null);
    const [teamAssignments, setTeamAssignments] = useState({}); // { serviceId: { memberId: role } }

    const currentService = initialServices.find(s => s.id === selectedServiceId);

    const assignMember = (serviceId, memberId, role) => {
        setTeamAssignments(prev => ({
            ...prev,
            [serviceId]: {
                ...(prev[serviceId] || {}),
                [memberId]: role
            }
        }));
        // In a real app, send Twilio SMS reminder here
        alert(`Assigned ${initialTeamMembers.find(m=>m.id === memberId).name} as ${role} for service on ${formatDate(currentService.date)}. SMS reminder sent (simulated).`);
    };
    
    const getAssignedRole = (serviceId, memberId) => {
        return teamAssignments[serviceId]?.[memberId] || 'Unassigned';
    }

    return (
        <div className="p-6 bg-[#FAF9F7] min-h-screen" style={{ fontFamily: 'Inter, sans-serif' }}>
            <h2 className="text-2xl font-semibold text-[#1E2A52] mb-6">Volunteer Scheduler</h2>

            <div className="mb-6">
                <label htmlFor="service-select" className="block text-sm font-medium text-gray-700 mb-1">Select Service:</label>
                <select
                    id="service-select"
                    className="w-full md:w-1/2 p-2 border border-gray-300 rounded-lg shadow-sm focus:ring-[#F4B860] focus:border-[#F4B860]"
                    value={selectedServiceId}
                    onChange={(e) => setSelectedServiceId(Number(e.target.value))}
                >
                    {initialServices.map(service => (
                        <option key={service.id} value={service.id}>
                            {formatDate(service.date)} - {service.theme}
                        </option>
                    ))}
                </select>
            </div>

            {currentService && (
                <div className="bg-white p-6 rounded-lg shadow">
                    <h3 className="text-xl font-semibold text-[#1E2A52] mb-4">
                        Schedule for: {formatDate(currentService.date)} - {currentService.theme}
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {initialTeamMembers.map(member => (
                            <div key={member.id} className="p-4 border rounded-lg bg-gray-50">
                                <div className="flex items-center mb-2">
                                    <img src={member.photoUrl} alt={member.name} className="w-12 h-12 rounded-full mr-3" onError={(e) => e.target.src='https://placehold.co/100x100/E0E0E0/757575?text=User'}/>
                                    <div>
                                        <p className="font-medium text-[#1E2A52]">{member.name}</p>
                                        <p className="text-sm text-gray-600">{member.role} (Default)</p>
                                    </div>
                                </div>
                                <p className="text-sm mb-1">Status: 
                                    <span className={`ml-1 font-semibold ${
                                        member.status === 'Confirmed' ? 'text-green-600' :
                                        member.status === 'Pending' ? 'text-yellow-600' : 'text-red-600'
                                    }`}>
                                        {member.status}
                                    </span>
                                </p>
                                <p className="text-sm mb-2">Assigned as: <span className="font-semibold">{getAssignedRole(currentService.id, member.id)}</span></p>
                                
                                <select 
                                    className="w-full p-1.5 border border-gray-300 rounded-md text-sm mb-2"
                                    onChange={(e) => {
                                        if (e.target.value) {
                                           assignMember(currentService.id, member.id, e.target.value);
                                        }
                                    }}
                                    value={getAssignedRole(currentService.id, member.id) === 'Unassigned' ? '' : getAssignedRole(currentService.id, member.id)}
                                >
                                    <option value="">Assign Role...</option>
                                    <option value="Worship Leader">Worship Leader</option>
                                    <option value="Vocals">Vocals</option>
                                    <option value="Guitarist">Guitarist</option>
                                    <option value="Pianist">Pianist</option>
                                    <option value="Drums">Drums</option>
                                    <option value="Bass">Bass</option>
                                    <option value="Tech/Slides">Tech/Slides</option>
                                    <option value="Greeter">Greeter</option>
                                    <option value="Not Scheduled">Not Scheduled for this service</option>
                                </select>
                                <button className="text-xs text-[#F4B860] hover:underline">Send Reminder (Simulated)</button>
                            </div>
                        ))}
                    </div>
                    <div className="mt-6 text-right">
                        <button className="bg-[#F4B860] text-[#1E2A52] font-semibold py-2 px-4 rounded-lg shadow hover:bg-opacity-90 transition-colors">
                            Confirm & Notify Team
                        </button>
                    </div>
                </div>
            )}
             {!currentService && <p className="text-gray-600">Please select a service to view or manage its schedule.</p>}
        </div>
    );
};


// Main App Component
const App = () => {
  const [currentView, setCurrentView] = useState('Dashboard'); // Default view

  const renderView = () => {
    switch (currentView) {
      case 'Dashboard':
        return <Dashboard setCurrentView={setCurrentView} />;
      case 'Schedule':
        return <ScheduleComponent />;
      case 'SetList':
        return <SetListComponent />;
      case 'Bulletins':
        return <PlaceholderComponent title="Bulletin Generator" />;
      case 'Team':
        return <PlaceholderComponent title="Team Management" />;
      case 'Reports':
        return <PlaceholderComponent title="Reports & Analytics" />;
      case 'CCLISettings':
        return <PlaceholderComponent title="CCLI Settings & Reporting" />;
      case 'Billing':
        return <PlaceholderComponent title="Billing & Subscription" />;
      default:
        return <Dashboard setCurrentView={setCurrentView} />;
    }
  };

  // Determine header title based on current view
  let headerTitle = "Dashboard";
  if (currentView === 'Schedule') headerTitle = "Volunteer Scheduler";
  else if (currentView === 'SetList') headerTitle = "Set List Builder";
  else if (currentView === 'Bulletins') headerTitle = "Bulletin Generator";
  else if (currentView === 'Team') headerTitle = "Team Management";
  else if (currentView === 'Reports') headerTitle = "Reports";
  else if (currentView === 'CCLISettings') headerTitle = "CCLI Settings";
  else if (currentView === 'Billing') headerTitle = "Billing";


  return (
    <div className="flex h-screen bg-[#FAF9F7]">
      <Sidebar setCurrentView={setCurrentView} />
      <div className="flex-1 flex flex-col ml-64"> {/* ml-64 to offset fixed sidebar */}
        <Header title={headerTitle} />
        <main className="flex-1 overflow-y-auto">
          {renderView()}
        </main>
      </div>
    </div>
  );
};

export default App;

