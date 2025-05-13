# PraiseSync Database Migration Plan

## Current State Analysis

The database already has a partial implementation with:
1. Core tables: churches, services, songs, setlist_items, bulletins, users
2. RLS policies for multi-tenancy
3. Helper functions: get_my_church_id(), get_my_role()
4. An events table for analytics
5. Foreign key relationships

## Missing Components

Based on the PRD and spec, we need to add:
1. **team_members** table
2. **team_assignments** table
3. Additional columns to existing tables
4. Updated RLS policies
5. Triggers for updated_at timestamps
6. Indexes for performance

## Migration Strategy

We'll create incremental migrations to:
1. Add missing tables (team_members, team_assignments)
2. Add missing columns to existing tables
3. Update data types and constraints
4. Add indexes for performance
5. Update RLS policies for the new role structure (admin, volunteer, viewer)
