-- Migration: 002_update_existing_tables
-- Purpose: Add missing columns and update existing tables

-- Add missing columns to services table
ALTER TABLE public.services 
ADD COLUMN IF NOT EXISTS time text,
ADD COLUMN IF NOT EXISTS theme text,
ADD COLUMN IF NOT EXISTS created_at timestamptz DEFAULT now(),
ADD COLUMN IF NOT EXISTS updated_at timestamptz DEFAULT now();

-- Add missing columns to bulletins table  
ALTER TABLE public.bulletins
ADD COLUMN IF NOT EXISTS template_id text,
ADD COLUMN IF NOT EXISTS created_at timestamptz DEFAULT now();

-- Add missing columns to songs table
ALTER TABLE public.songs
ADD COLUMN IF NOT EXISTS tempo integer,
ADD COLUMN IF NOT EXISTS time_signature text,
ADD COLUMN IF NOT EXISTS duration interval,
ADD COLUMN IF NOT EXISTS last_played_at timestamptz;

-- Add missing columns to users table
ALTER TABLE public.users
ADD COLUMN IF NOT EXISTS name text,
ADD COLUMN IF NOT EXISTS email text,
ADD COLUMN IF NOT EXISTS created_at timestamptz DEFAULT now(),
ADD COLUMN IF NOT EXISTS updated_at timestamptz DEFAULT now();

-- Update setlist_items to use uuid for song_id (currently text)
-- First, we need to create a temporary column
ALTER TABLE public.setlist_items 
ADD COLUMN IF NOT EXISTS song_id_new uuid;

-- Update the temporary column with proper UUIDs
UPDATE public.setlist_items 
SET song_id_new = songs.id::uuid
FROM public.songs 
WHERE setlist_items.song_id = songs.id::text
AND songs.id IS NOT NULL;

-- Drop the old column and rename the new one (only if migration needed)
-- This step should be done carefully after verifying data
-- ALTER TABLE public.setlist_items DROP COLUMN song_id;
-- ALTER TABLE public.setlist_items RENAME COLUMN song_id_new TO song_id;
-- ALTER TABLE public.setlist_items ADD FOREIGN KEY (song_id) REFERENCES public.songs(id);

-- Add order column to services for sorting
ALTER TABLE public.services
ADD COLUMN IF NOT EXISTS service_order integer;

-- Create updated_at trigger function
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Add updated_at triggers to all tables
CREATE TRIGGER update_services_updated_at BEFORE UPDATE ON public.services
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_songs_updated_at BEFORE UPDATE ON public.songs
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_users_updated_at BEFORE UPDATE ON public.users
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_team_members_updated_at BEFORE UPDATE ON public.team_members
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_team_assignments_updated_at BEFORE UPDATE ON public.team_assignments
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Add indexes for better query performance
CREATE INDEX IF NOT EXISTS idx_services_church_id_date ON public.services(church_id, date DESC);
CREATE INDEX IF NOT EXISTS idx_songs_church_id ON public.songs(church_id);
CREATE INDEX IF NOT EXISTS idx_setlist_items_service_id ON public.setlist_items(service_id);
CREATE INDEX IF NOT EXISTS idx_bulletins_service_id ON public.bulletins(service_id);
CREATE INDEX IF NOT EXISTS idx_users_church_id ON public.users(church_id);
