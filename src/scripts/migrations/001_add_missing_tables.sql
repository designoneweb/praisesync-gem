-- Migration: 001_add_missing_tables
-- Purpose: Add team_members and team_assignments tables

-- Create team_members table
CREATE TABLE IF NOT EXISTS public.team_members (
    id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
    church_id uuid REFERENCES public.churches(id) ON DELETE CASCADE,
    name text NOT NULL,
    email text,
    phone text,
    role text NOT NULL DEFAULT 'Volunteer',
    status text NOT NULL DEFAULT 'active' CHECK (status IN ('active', 'inactive')),
    photo_url text,
    created_at timestamptz DEFAULT now(),
    updated_at timestamptz DEFAULT now()
);

-- Create team_assignments table
CREATE TABLE IF NOT EXISTS public.team_assignments (
    id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
    service_id uuid REFERENCES public.services(id) ON DELETE CASCADE,
    team_member_id uuid REFERENCES public.team_members(id) ON DELETE CASCADE,
    assigned_role text NOT NULL,
    status text NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'confirmed', 'declined')),
    created_at timestamptz DEFAULT now(),
    updated_at timestamptz DEFAULT now(),
    UNIQUE(service_id, team_member_id)
);

-- Add RLS to team_members
ALTER TABLE public.team_members ENABLE ROW LEVEL SECURITY;

-- Add RLS to team_assignments
ALTER TABLE public.team_assignments ENABLE ROW LEVEL SECURITY;

-- RLS Policies for team_members
CREATE POLICY "Allow users to view team members in their church" ON public.team_members
    FOR SELECT USING (church_id = get_my_church_id());

CREATE POLICY "Allow admins/volunteers to create team members" ON public.team_members
    FOR INSERT WITH CHECK (
        church_id = get_my_church_id() AND 
        (get_my_role() IN ('admin', 'volunteer'))
    );

CREATE POLICY "Allow admins/volunteers to update team members" ON public.team_members
    FOR UPDATE USING (
        church_id = get_my_church_id() AND 
        (get_my_role() IN ('admin', 'volunteer'))
    );

CREATE POLICY "Allow admins to delete team members" ON public.team_members
    FOR DELETE USING (
        church_id = get_my_church_id() AND 
        get_my_role() = 'admin'
    );

-- RLS Policies for team_assignments
CREATE POLICY "Allow users to view assignments in their church" ON public.team_assignments
    FOR SELECT USING (
        EXISTS (
            SELECT 1 FROM public.services s
            WHERE s.id = team_assignments.service_id
            AND s.church_id = get_my_church_id()
        )
    );

CREATE POLICY "Allow admins/volunteers to create assignments" ON public.team_assignments
    FOR INSERT WITH CHECK (
        EXISTS (
            SELECT 1 FROM public.services s
            WHERE s.id = service_id
            AND s.church_id = get_my_church_id()
            AND (get_my_role() IN ('admin', 'volunteer'))
        )
    );

CREATE POLICY "Allow admins/volunteers to update assignments" ON public.team_assignments
    FOR UPDATE USING (
        EXISTS (
            SELECT 1 FROM public.services s
            WHERE s.id = service_id
            AND s.church_id = get_my_church_id()
            AND (get_my_role() IN ('admin', 'volunteer'))
        )
    );

CREATE POLICY "Allow admins to delete assignments" ON public.team_assignments
    FOR DELETE USING (
        EXISTS (
            SELECT 1 FROM public.services s
            WHERE s.id = service_id
            AND s.church_id = get_my_church_id()
            AND get_my_role() = 'admin'
        )
    );

-- Create indexes for performance
CREATE INDEX IF NOT EXISTS idx_team_members_church_id ON public.team_members(church_id);
CREATE INDEX IF NOT EXISTS idx_team_assignments_service_id ON public.team_assignments(service_id);
CREATE INDEX IF NOT EXISTS idx_team_assignments_member_id ON public.team_assignments(team_member_id);
