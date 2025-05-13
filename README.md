# PraiseSync

PraiseSync is a Sunday-service toolkit designed for small to medium-sized congregations. It enables worship leaders and church administrators to plan set-lists, sync CCLI usage, schedule volunteers, and produce print-ready or mobile bulletins.

## Features

- **Set-List Builder**: AI-powered song suggestions with drag-and-drop interface
- **Volunteer Scheduler**: Easy team management with SMS reminders
- **Bulletin Generator**: Create professional bulletins with multiple templates
- **CCLI Auto-Report**: Automatic reporting for copyright compliance
- **Multi-tier Pricing**: Essential ($19/mo) and Complete ($29/mo) plans

## Tech Stack

- **Frontend**: Next.js 14 (App Router), TypeScript, Tailwind CSS
- **Edge Functions**: Netlify Edge
- **Database**: Supabase (PostgreSQL with Row-Level Security)
- **PDF Generation**: AWS Lambda
- **Integrations**: CCLI API, Twilio SMS, Stripe Billing

## Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn
- Supabase account (for database)
- Netlify account (for deployment)

### Installation

1. Clone the repository:
```bash
git clone [repository-url]
cd praisesync-gem
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
```bash
cp .env.example .env.local
```

4. Run the development server:
```bash
npm run dev
```

5. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

```
src/
├── app/              # Next.js app router pages
├── components/       # React components
│   ├── dashboard/    # Dashboard components
│   ├── setlist/      # Set-list builder components
│   ├── schedule/     # Scheduler components
│   ├── layout/       # Layout components (Sidebar, Header)
│   ├── ui/           # Generic UI components
│   └── icons/        # Icon components
├── lib/              # Utility functions and mock data
├── types/            # TypeScript type definitions
└── styles/           # Global styles
```

## Development

### Code Style

- TypeScript for type safety
- Tailwind CSS for styling
- Component-based architecture
- Server-side rendering where possible

### Testing

```bash
npm run test
npm run test:watch
```

### Building

```bash
npm run build
```

## Deployment

This project is designed to be deployed on Netlify with Supabase as the backend.

1. Connect your GitHub repository to Netlify
2. Set environment variables in Netlify dashboard
3. Deploy with automatic builds on push

## License

Copyright © 2025 PraiseSync. All rights reserved.
