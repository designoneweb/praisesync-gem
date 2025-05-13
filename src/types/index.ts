export interface Church {
  id: string;
  name: string;
  plan_tier: 'essential' | 'complete';
  created_at?: string;
  updated_at?: string;
}

export interface User {
  id: string;
  email: string;
  role: 'admin' | 'volunteer' | 'viewer';
  church_id: string;
  name?: string;
  created_at?: string;
  updated_at?: string;
}

export interface Service {
  id: number;
  church_id: string;
  date: string;
  time: string;
  theme: string;
  sermon_title?: string;
  bulletinReady: boolean;
  ccliStatus: 'Pending' | 'Reported';
  created_at?: string;
  updated_at?: string;
}

export interface Song {
  id: string;
  title: string;
  artist: string;
  key: string;
  theme: string;
  lastPlayed?: string;
  ccli_number?: string;
  created_at?: string;
  updated_at?: string;
}

export interface SetlistItem {
  id?: string;
  service_id: number;
  song_id: string;
  key: string;
  order: number;
  arrangementKey?: string;
  created_at?: string;
  updated_at?: string;
}

export interface TeamMember {
  id: string;
  name: string;
  role: string;
  status: 'Confirmed' | 'Pending' | 'Declined';
  photoUrl?: string;
  email?: string;
  phone?: string;
  created_at?: string;
  updated_at?: string;
}

export interface Bulletin {
  id?: string;
  service_id: number;
  pdf_url?: string;
  html_url?: string;
  template_id?: string;
  created_at?: string;
  updated_at?: string;
}

export interface TeamAssignment {
  [serviceId: string]: {
    [memberId: string]: string;
  };
}
