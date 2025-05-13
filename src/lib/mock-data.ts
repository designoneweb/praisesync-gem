import { Service, Song, TeamMember } from '@/types';

export const initialServices: Service[] = [
  { 
    id: 1, 
    church_id: '1',
    date: '2025-05-11', 
    time: '10:00 AM', 
    theme: 'Mother\'s Day Service', 
    bulletinReady: true, 
    ccliStatus: 'Reported' 
  },
  { 
    id: 2, 
    church_id: '1',
    date: '2025-05-18', 
    time: '10:00 AM', 
    theme: 'Pentecost Sunday', 
    bulletinReady: false, 
    ccliStatus: 'Pending' 
  },
  { 
    id: 3, 
    church_id: '1',
    date: '2025-05-25', 
    time: '10:00 AM', 
    theme: 'Trinity Sunday', 
    bulletinReady: true, 
    ccliStatus: 'Reported' 
  },
];

export const initialSongs: Song[] = [
  { 
    id: 's1', 
    title: 'Amazing Grace', 
    artist: 'John Newton', 
    key: 'G', 
    theme: 'Grace', 
    lastPlayed: '2025-04-20' 
  },
  { 
    id: 's2', 
    title: 'How Great Thou Art', 
    artist: 'Carl Boberg', 
    key: 'Bb', 
    theme: 'Majesty', 
    lastPlayed: '2025-04-13' 
  },
  { 
    id: 's3', 
    title: '10,000 Reasons (Bless the Lord)', 
    artist: 'Matt Redman', 
    key: 'C', 
    theme: 'Blessing', 
    lastPlayed: '2025-05-04' 
  },
  { 
    id: 's4', 
    title: 'In Christ Alone', 
    artist: 'Keith Getty, Stuart Townend', 
    key: 'D', 
    theme: 'Faith', 
    lastPlayed: '2025-03-16' 
  },
  { 
    id: 's5', 
    title: 'What A Beautiful Name', 
    artist: 'Hillsong Worship', 
    key: 'D', 
    theme: 'Praise', 
    lastPlayed: '2025-04-27' 
  },
];

export const initialTeamMembers: TeamMember[] = [
  { 
    id: 'm1', 
    name: 'Anna Williams', 
    role: 'Worship Leader', 
    status: 'Confirmed', 
    photoUrl: 'https://placehold.co/100x100/E0E0E0/757575?text=AW' 
  },
  { 
    id: 'm2', 
    name: 'Ben Carter', 
    role: 'Guitarist', 
    status: 'Pending', 
    photoUrl: 'https://placehold.co/100x100/E0E0E0/757575?text=BC' 
  },
  { 
    id: 'm3', 
    name: 'Carl Davis', 
    role: 'Pianist', 
    status: 'Declined', 
    photoUrl: 'https://placehold.co/100x100/E0E0E0/757575?text=CD' 
  },
  { 
    id: 'm4', 
    name: 'Sarah Miller', 
    role: 'Vocals', 
    status: 'Confirmed', 
    photoUrl: 'https://placehold.co/100x100/E0E0E0/757575?text=SM' 
  },
  { 
    id: 'm5', 
    name: 'David Wilson', 
    role: 'Drums', 
    status: 'Confirmed', 
    photoUrl: 'https://placehold.co/100x100/E0E0E0/757575?text=DW' 
  },
];
