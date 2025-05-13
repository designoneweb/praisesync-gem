-- Examine current database schema
-- Run this in Supabase SQL Editor to see existing tables and structure

-- List all tables in public schema
SELECT 
    schemaname,
    tablename,
    tableowner
FROM 
    pg_catalog.pg_tables
WHERE 
    schemaname = 'public'
ORDER BY 
    tablename;

-- List all columns for each table
SELECT 
    t.table_name,
    c.column_name,
    c.data_type,
    c.is_nullable,
    c.column_default,
    c.character_maximum_length
FROM 
    information_schema.tables t
    JOIN information_schema.columns c ON t.table_name = c.table_name
WHERE 
    t.table_schema = 'public'
    AND c.table_schema = 'public'
ORDER BY 
    t.table_name, 
    c.ordinal_position;

-- Check for existing RLS policies
SELECT 
    schemaname,
    tablename,
    policyname,
    permissive,
    roles,
    cmd,
    qual
FROM 
    pg_policies
WHERE 
    schemaname = 'public';

-- Check for existing functions
SELECT 
    routine_name,
    routine_type,
    data_type
FROM 
    information_schema.routines
WHERE 
    routine_schema = 'public';

-- Check for existing triggers
SELECT 
    trigger_name,
    event_manipulation,
    event_object_table,
    action_statement
FROM 
    information_schema.triggers
WHERE 
    trigger_schema = 'public';
