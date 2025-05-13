-- Migration: 003_update_rls_policies
-- Purpose: Update RLS policies to match the PRD role structure (admin, volunteer, viewer)

-- Update the get_my_role function to support the correct roles
CREATE OR REPLACE FUNCTION public.get_my_role()
RETURNS text AS $$
BEGIN
    RETURN COALESCE(
        (SELECT role FROM public.users WHERE id = auth.uid()),
        'viewer'
    );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Drop existing policies that use 'editor' role
DROP POLICY IF EXISTS "Allow admins/editors to create bulletins for their church" ON public.bulletins;
DROP POLICY IF EXISTS "Allow admins/editors to update bulletins for their church" ON public.bulletins;
DROP POLICY IF EXISTS "Allow admins/editors to create services for their church" ON public.services;
DROP POLICY IF EXISTS "Allow admins/editors to update services for their church" ON public.services;
DROP POLICY IF EXISTS "Allow admins/editors to create setlist items for their church" ON public.setlist_items;
DROP POLICY IF EXISTS "Allow admins/editors to update setlist items for their church" ON public.setlist_items;
DROP POLICY IF EXISTS "Allow admins/editors to create songs for their church" ON public.songs;
DROP POLICY IF EXISTS "Allow admins/editors to update songs for their church" ON public.songs;

-- Recreate policies with correct roles (admin, volunteer, viewer)
-- Bulletins policies
CREATE POLICY "Allow admins/volunteers to create bulletins" ON public.bulletins
    FOR INSERT WITH CHECK (
        EXISTS (
            SELECT 1 FROM public.services s
            WHERE s.id = service_id
            AND s.church_id = get_my_church_id()
            AND (get_my_role() IN ('admin', 'volunteer'))
        )
    );

CREATE POLICY "Allow admins/volunteers to update bulletins" ON public.bulletins
    FOR UPDATE USING (
        EXISTS (
            SELECT 1 FROM public.services s
            WHERE s.id = bulletins.service_id
            AND s.church_id = get_my_church_id()
            AND (get_my_role() IN ('admin', 'volunteer'))
        )
    );

-- Services policies
CREATE POLICY "Allow admins/volunteers to create services" ON public.services
    FOR INSERT WITH CHECK (
        church_id = get_my_church_id() AND 
        (get_my_role() IN ('admin', 'volunteer'))
    );

CREATE POLICY "Allow admins/volunteers to update services" ON public.services
    FOR UPDATE USING (
        church_id = get_my_church_id() AND 
        (get_my_role() IN ('admin', 'volunteer'))
    );

-- Setlist items policies
CREATE POLICY "Allow admins/volunteers to create setlist items" ON public.setlist_items
    FOR INSERT WITH CHECK (
        EXISTS (
            SELECT 1 FROM public.services s
            WHERE s.id = service_id
            AND s.church_id = get_my_church_id()
            AND (get_my_role() IN ('admin', 'volunteer'))
        )
    );

CREATE POLICY "Allow admins/volunteers to update setlist items" ON public.setlist_items
    FOR UPDATE USING (
        EXISTS (
            SELECT 1 FROM public.services s
            WHERE s.id = setlist_items.service_id
            AND s.church_id = get_my_church_id()
            AND (get_my_role() IN ('admin', 'volunteer'))
        )
    );

-- Songs policies
CREATE POLICY "Allow admins/volunteers to create songs" ON public.songs
    FOR INSERT WITH CHECK (
        church_id = get_my_church_id() AND 
        (get_my_role() IN ('admin', 'volunteer'))
    );

CREATE POLICY "Allow admins/volunteers to update songs" ON public.songs
    FOR UPDATE USING (
        church_id = get_my_church_id() AND 
        (get_my_role() IN ('admin', 'volunteer'))
    );

-- Update users policies for better role management
DROP POLICY IF EXISTS "Allow admins to insert users into their church" ON public.users;

CREATE POLICY "Allow admins to manage users in their church" ON public.users
    FOR ALL USING (
        (id = auth.uid()) OR 
        (church_id = get_my_church_id() AND get_my_role() = 'admin')
    );

-- Add policy to allow new users to create their profile
CREATE POLICY "Allow new users to create their profile" ON public.users
    FOR INSERT WITH CHECK (id = auth.uid());
