# Bolt Cars - E-Hailing Service

A TypeScript-based e-hailing service platform where car owners can list their vehicles and renters can browse and book available cars. Built with React, Vite, Supabase, and Capacitor for Android support.

## Features

- **Car Owners**: List vehicles, submit verification documents, track approval status
- **Renters**: Browse approved vehicles, view pricing, book cars
- **Admin**: Approve/reject vehicle submissions, manage platform
- **Dark Forest Green Theme**: Professional and modern UI
- **Android App**: Native Android app using Capacitor
- **Authentication**: Secure auth with Supabase
- **Real-time Updates**: Live data synchronization

## Tech Stack

- **Frontend**: React 18, TypeScript, Vite
- **Styling**: Tailwind CSS (custom forest green theme)
- **Backend**: Supabase (PostgreSQL, Auth, Storage)
- **Mobile**: Capacitor for Android
- **Routing**: React Router v6
- **Deployment**: Vercel (web), Android Studio (mobile)

## Quick Start

```bash
# Install dependencies
npm install

# Set up environment variables
# Create .env.local and add your Supabase credentials

# Run development server
npm run dev

# Build for production
npm run build

# Build Android app
npm run android
```

## Documentation

See [docs/setup-guide.md](./docs/setup-guide.md) for complete setup instructions including:
- Database schema setup
- Supabase configuration
- Admin user creation
- Android app build process
- Deployment guide

## Database Setup

Run the SQL schema in `database-schema.sql` in your Supabase SQL Editor to create all necessary tables and policies.

## Project Structure

```
src/
├── contexts/       # React contexts (Auth)
├── lib/           # Utilities (Supabase client)
├── pages/         # Page components
├── App.tsx        # Main app with routing
└── main.tsx       # Entry point
```

## Environment Variables

```env
VITE_SUPABASE_URL=https://cjfmctcoyvggywhtsjvc.supabase.co
VITE_SUPABASE_ANON_KEY=your_anon_key_here
```

## License

MIT
