# PraiseSync Development Task List

## Project Overview
Building a Sunday-service toolkit for micro-congregations with features for worship planning, CCLI sync, volunteer scheduling, and bulletin generation.

**Target**: 140 paying churches (110 Complete + 30 Essential) with $3k MRR in 18 months

---

## Phase 1: Foundation & Infrastructure (Sprint 1)
### ✅ 1.1 Project Setup
- [x] Initialize Next.js 14 with App Router
- [x] Set up TypeScript
- [x] Configure Tailwind CSS with custom theme
- [x] Set up ESLint and development tools
- [x] Create basic project structure

### ✅ 1.2 Design System
- [x] Implement color palette (Navy #1E2A52, Gold #F4B860, Off-white #FAF9F7)
- [x] Configure typography (Inter for UI, Spectral for headings)
- [x] Create icon system with Lucide React
- [x] Set up responsive grid system

### ✅ 1.3 Database Setup (Supabase) - COMPLETED
- [x] Design database schema per spec
  - [x] churches table (id, name, plan_tier) - EXISTS
  - [x] users table (id, church_id, role) - EXISTS
  - [x] services table (id, church_id, date, sermon_title) - EXISTS
  - [x] setlist_items table (service_id, song_id, key, order) - EXISTS
  - [x] bulletins table (service_id, pdf_url, html_url, updated_at) - EXISTS
  - [x] songs table (id, title, artist, ccli_number, key, theme) - EXISTS
  - [x] team_members table (id, church_id, name, role, email, phone) - CREATED
  - [x] team_assignments table (service_id, member_id, assigned_role) - CREATED
- [x] Implement Row-Level Security (RLS) policies - COMPLETED
- [x] Create database migrations - COMPLETED (3 migration files)
- [x] Update existing tables with missing columns - COMPLETED
  - [x] Added time, theme, created_at, updated_at to services
  - [x] Added template_id, created_at to bulletins
  - [x] Added tempo, time_signature, duration, last_played_at to songs
  - [x] Added name, email, created_at, updated_at to users
  - [x] Converted setlist_items.song_id from text to uuid
  - [x] Added updated_at triggers to all tables
  - [x] Added performance indexes
- [x] Run third migration (update RLS policies for correct roles) - COMPLETED
  - [x] Updated all policies to use 'admin', 'volunteer', 'viewer' roles
  - [x] Removed all 'editor' role references
  - [x] Updated get_my_role() function
  - [x] Improved users table policies
- [ ] Set up database types and client
- [ ] Create TypeScript interfaces matching DB schema

### ⬜ 1.4 Authentication System
- [ ] Implement Supabase Auth
- [ ] Create login/signup pages
- [ ] Implement password reset flow
- [ ] Add session management
- [ ] Create auth context/provider
- [ ] Implement role-based access (admin, volunteer, viewer)
- [ ] Add church tenant isolation

### ⬜ 1.5 Core Layout Components
- [ ] Finalize sidebar navigation
- [ ] Create header component with church context
- [ ] Implement responsive mobile navigation
- [ ] Add loading states
- [ ] Create error boundaries
- [ ] Implement 404 and error pages

---

## Phase 2: Core Features - Set-List Builder (Sprint 2)
### ✅ 2.1 Basic Set-List UI
- [x] Create set-list builder interface
- [x] Implement drag-and-drop functionality
- [x] Add song search/filter
- [x] Create key transposition selector

### ⬜ 2.2 Song Database Integration
- [ ] Connect to Supabase songs table
- [ ] Implement CRUD operations for songs
- [ ] Add song import from CSV
- [ ] Create SongSelect API integration (partner key required)
- [ ] Implement song metadata (theme, tempo, time signature)

### ⬜ 2.3 AI Song Suggestions
- [ ] Integrate OpenAI/Claude API for theme-based suggestions
- [ ] Create suggestion algorithm based on:
  - [ ] Service theme
  - [ ] Song key compatibility
  - [ ] Recent usage history
  - [ ] Congregational preferences
- [ ] Add manual override options

### ⬜ 2.4 Set-List Persistence
- [ ] Save set-lists to database
- [ ] Implement version history
- [ ] Add duplicate/template functionality
- [ ] Create print view for musicians

---

## Phase 3: Bulletin Generator (Sprint 3)
### ⬜ 3.1 Template System
- [ ] Create 3 default bulletin templates
- [ ] Implement template preview
- [ ] Add template selection UI
- [ ] Create template customization options

### ⬜ 3.2 Bulletin Content Management
- [ ] Create bulletin editor interface
- [ ] Add order of service builder
- [ ] Implement scripture auto-layout
- [ ] Add announcements section
- [ ] Create prayer requests module

### ⬜ 3.3 PDF Generation (AWS Lambda)
- [ ] Set up AWS Lambda with Puppeteer
- [ ] Implement PDF render endpoint
- [ ] Add presigned URL generation
- [ ] Create progress indicators
- [ ] Implement error handling
- [ ] Optimize for < 10s generation

### ⬜ 3.4 Bulletin Distribution
- [ ] Generate shareable HTML links
- [ ] Create mobile-responsive bulletin view
- [ ] Add email distribution option
- [ ] Implement QR code generation

---

## Phase 4: Volunteer Scheduler (Sprint 4)
### ✅ 4.1 Basic Scheduler UI
- [x] Create calendar grid interface
- [x] Implement team member cards
- [x] Add role assignment dropdowns

### ⬜ 4.2 Team Management
- [ ] CRUD operations for team members
- [ ] Role definition system
- [ ] Availability tracking
- [ ] Conflict detection
- [ ] Auto-assignment suggestions

### ⬜ 4.3 Communication System
- [ ] Twilio SMS integration
- [ ] Schedule reminders
- [ ] Confirmation tracking
- [ ] Declined shift handling
- [ ] Substitute finder

### ⬜ 4.4 Reporting
- [ ] Attendance tracking
- [ ] Service history
- [ ] Team member participation stats
- [ ] Export to CSV

---

## Phase 5: Billing & Subscription (Sprint 5)
### ⬜ 5.1 Stripe Integration
- [ ] Set up Stripe webhook handlers
- [ ] Implement subscription management
- [ ] Create pricing page
- [ ] Add payment method management
- [ ] Implement Smart Retries

### ⬜ 5.2 Plan Management
- [ ] Essential plan ($19) implementation
- [ ] Complete plan ($29) implementation
- [ ] Seat-based pricing logic
- [ ] Plan upgrade/downgrade flow
- [ ] Usage tracking and limits

### ⬜ 5.3 Billing Portal
- [ ] Invoice history
- [ ] Payment method update
- [ ] Plan change interface
- [ ] Usage dashboard

---

## Phase 6: CCLI Integration (Sprint 6)
### ⬜ 6.1 CCLI Settings
- [ ] Church license number storage
- [ ] Auto-report configuration
- [ ] Manual report generation
- [ ] Report history tracking

### ⬜ 6.2 Auto-Reporting
- [ ] Implement nightly cron job
- [ ] Create CCLI API integration
- [ ] Build report JSON formatter
- [ ] Add retry logic
- [ ] Implement error notifications

### ⬜ 6.3 Compliance Features
- [ ] Song usage tracking
- [ ] License verification
- [ ] Compliance dashboard
- [ ] Export for manual filing

---

## Phase 7: Performance & Polish (Sprint 7)
### ⬜ 7.1 Performance Optimization
- [ ] Implement React Server Components where applicable
- [ ] Add image optimization
- [ ] Implement code splitting
- [ ] Cache static assets
- [ ] Optimize bundle size (< 150kB initial JS)
- [ ] Achieve p95 < 400ms page loads

### ⬜ 7.2 Accessibility
- [ ] WCAG 2.1 AA compliance audit
- [ ] Keyboard navigation
- [ ] Screen reader testing
- [ ] Color contrast verification
- [ ] Focus indicators
- [ ] ARIA labels

### ⬜ 7.3 Error Handling
- [ ] Comprehensive error boundaries
- [ ] User-friendly error messages
- [ ] Retry mechanisms
- [ ] Offline support
- [ ] Data recovery options

### ⬜ 7.4 UI Polish
- [ ] Loading states
- [ ] Empty states
- [ ] Transitions and animations
- [ ] Responsive design testing
- [ ] Cross-browser compatibility

---

## Phase 8: Testing & Deployment (Sprint 8)
### ⬜ 8.1 Testing
- [ ] Unit tests for utilities
- [ ] Integration tests for API routes
- [ ] E2E tests for critical flows
- [ ] Performance testing
- [ ] Load testing

### ⬜ 8.2 Documentation
- [ ] API documentation
- [ ] User guides
- [ ] Video tutorials
- [ ] FAQ section
- [ ] Support documentation

### ⬜ 8.3 Deployment
- [ ] Set up CI/CD pipeline
- [ ] Configure production environment
- [ ] Set up monitoring (Sentry/LogRocket)
- [ ] Implement analytics
- [ ] Create backup strategy

### ⬜ 8.4 Launch Preparation
- [ ] Marketing website
- [ ] Onboarding flow
- [ ] Email templates
- [ ] Support system
- [ ] Beta user program

---

## User Testing Checkpoints
### ⬜ Testing Phase 1: Core Features (After Sprint 3)
- [ ] 5 beta churches test set-list builder
- [ ] Bulletin generation feedback
- [ ] UI/UX review with target users
- [ ] Performance baseline testing

### ⬜ Testing Phase 2: Full Features (After Sprint 6)
- [ ] 15 beta churches full platform test
- [ ] Volunteer scheduler real-world usage
- [ ] CCLI reporting validation
- [ ] Billing flow testing

### ⬜ Testing Phase 3: Pre-Launch (After Sprint 7)
- [ ] 25 churches production test
- [ ] Load testing with concurrent users
- [ ] Mobile responsiveness validation
- [ ] Accessibility audit

---

## Success Metrics to Track
- [ ] Bulletin generation time < 10s
- [ ] p95 page load < 400ms
- [ ] Activation rate > 70% (first bulletin or CCLI export within 7 days)
- [ ] Weekly engagement > 65%
- [ ] Monthly churn < 4%
- [ ] Infrastructure cost < $0.50/church/month

---

## Risk Mitigations
- [ ] CCLI API backup plan (CSV export)
- [ ] Netlify function quota monitoring
- [ ] Cost tracking dashboard
- [ ] Automated scaling alerts
- [ ] Data backup automation

---

## Next Immediate Steps
1. Complete database schema setup in Supabase
2. Implement authentication system
3. Create first real data models
4. Begin connecting mock data to real database
5. Start first user testing checkpoint planning

---

**Note**: This task list should be updated as development progresses. Mark items with [x] when complete, and add new tasks as discovered.
