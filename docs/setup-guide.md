# Complete Project Setup Guide

## What Was The Problem?

### Main Issues Encountered:
1. **Environment Variables**: Vercel wasn't reading `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY` properly
2. **Wrong Import Paths**: AuthPage was using @/integrations/supabase/client` instead of `@/lib/supabase`
3. **Missing Database Schema**: Tables weren't created in Supabase
4. **Admin User Setup**: No admin user existed in the database
5. **Routing Issues**: Page refresh caused 404 errors (fixed with `vercel.json`)
6. **RLS Policies**: Row Level Security was blocking data operations

### Root Cause:
The project had multiple Supabase configurations and the frontend wasn't properly connected to the backend database.

---

## Complete Setup Process (For Future Projects)

### Phase 1: Initial Project Setup

```bash
# 1. Clone/Create React project
git clone <project-repo>
cd bolt-cars
npm install

# 2. Install Supabase dependencies
npm install @supabase/supabase-js
npm install supabase --save-dev  # CLI tool
```

### Phase 2: Supabase Integration

#### Step 1: Create Supabase Project
1. Go to [supabase.com](https://supabase.com)
2. Use existing project: https://supabase.com/dashboard/project/cjfmctcoyvggywhtsjvc
3. Note down:
   - Project URL: `https://cjfmctcoyvggywhtsjvc.supabase.co`
   - Anon public key
   - Database password: `pmnCOvAxcq5hgF1q`

#### Step 2: Environment Setup
```bash
# Create .env.local
VITE_SUPABASE_URL=https://cjfmctcoyvggywhtsjvc.supabase.co
VITE_SUPABASE_ANON_KEY=your_anon_key_here
```

#### Step 3: Supabase Client Setup
Already configured in `src/lib/supabase.ts`

### Phase 3: Database Schema Setup

#### Run this SQL in Supabase SQL Editor:

```sql
-- Create profiles table
CREATE TABLE IF NOT EXISTS profiles (
  id UUID REFERENCES auth.users ON DELETE CASCADE,
  email TEXT,
  role TEXT DEFAULT 'renter' CHECK (role IN ('admin', 'owner', 'renter')),
  full_name TEXT,
  phone TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  PRIMARY KEY (id)
);

-- Create cars table
CREATE TABLE IF NOT EXISTS cars (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  owner_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
  make TEXT NOT NULL,
  model TEXT NOT NULL,
  year INTEGER NOT NULL,
  license_plate TEXT NOT NULL UNIQUE,
  daily_rate DECIMAL(10,2) NOT NULL,
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'approved', 'rejected')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create bookings table
CREATE TABLE IF NOT EXISTS bookings (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  car_id UUID REFERENCES cars(id) ON DELETE CASCADE,
  renter_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
  start_date DATE NOT NULL,
  end_date DATE NOT NULL,
  total_cost DECIMAL(10,2) NOT NULL,
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'confirmed', 'cancelled', 'completed')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE cars ENABLE ROW LEVEL SECURITY;
ALTER TABLE bookings ENABLE ROW LEVEL SECURITY;

-- Profiles policies
CREATE POLICY "Public profiles viewable" ON profiles FOR SELECT USING (true);
CREATE POLICY "Users can update own profile" ON profiles FOR UPDATE USING (auth.uid() = id);

-- Cars policies
CREATE POLICY "Anyone can view approved cars" ON cars FOR SELECT USING (status = 'approved' OR owner_id = auth.uid());
CREATE POLICY "Owners can insert cars" ON cars FOR INSERT WITH CHECK (auth.uid() = owner_id);
CREATE POLICY "Owners can update own cars" ON cars FOR UPDATE USING (auth.uid() = owner_id);
CREATE POLICY "Admins can manage all cars" ON cars FOR ALL USING (
  EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'admin')
);

-- Bookings policies
CREATE POLICY "Users can view own bookings" ON bookings FOR SELECT USING (
  auth.uid() = renter_id OR 
  EXISTS (SELECT 1 FROM cars WHERE cars.id = bookings.car_id AND cars.owner_id = auth.uid())
);
CREATE POLICY "Renters can create bookings" ON bookings FOR INSERT WITH CHECK (auth.uid() = renter_id);
```

### Phase 4: Admin User Setup

#### Via Supabase Dashboard:
1. Go to Authentication → Users
2. Create user: `admin@boltcars.com` / `admin123`
3. Run SQL to add admin role:
```sql
INSERT INTO profiles (id, email, role) 
SELECT id, email, 'admin' 
FROM auth.users 
WHERE email = 'admin@boltcars.com';
```

### Phase 5: Development

```bash
# Run development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

### Phase 6: Android App Setup

```bash
# Initialize Capacitor
npx cap init

# Build web assets
npm run build

# Add Android platform
npx cap add android

# Sync web assets to Android
npx cap sync android

# Open in Android Studio
npx cap open android
```

Or use the shortcut:
```bash
npm run android
```

### Phase 7: Deployment Setup

#### Create `vercel.json` for SPA routing (already created):
```json
{
  "rewrites": [
    {
      "source": "/(.*)",
      "destination": "/index.html"
    }
  ]
}
```

#### Vercel Environment Variables:
1. Go to Vercel Dashboard → Project → Settings → Environment Variables
2. Add:
   - `VITE_SUPABASE_URL` = https://cjfmctcoyvggywhtsjvc.supabase.co
   - `VITE_SUPABASE_ANON_KEY` = your anon key

### Phase 8: Authentication for Database Operations

#### Admin Authentication for Scripts
When running scripts that need to modify data in Supabase (due to RLS policies), always authenticate as admin first:

```javascript
// Login as admin in any script
const { data: authData, error: authError } = await supabase.auth.signInWithPassword({
  email: 'admin@boltcars.com',
  password: 'admin123'
})

if (authError) {
  console.error('❌ Login failed:', authError.message)
  return
}

console.log('✅ Logged in as admin')

// Now you can perform database operations
const { data, error } = await supabase.from('your_table').insert(your_data)
```

---

## Project Structure

```
bolt-cars/
├── src/
│   ├── contexts/
│   │   └── AuthContext.tsx       # Authentication context
│   ├── lib/
│   │   └── supabase.ts           # Supabase client
│   ├── pages/
│   │   ├── HomePage.tsx          # Landing page
│   │   ├── AuthPage.tsx          # Login/Signup
│   │   ├── OwnerDashboard.tsx    # Car owner dashboard
│   │   ├── RenterDashboard.tsx   # Renter dashboard
│   │   └── AdminDashboard.tsx    # Admin approval dashboard
│   ├── App.tsx                   # Main app with routing
│   ├── main.tsx                  # Entry point
│   └── index.css                 # Global styles
├── docs/
│   └── setup-guide.md            # This file
├── capacitor.config.ts           # Capacitor configuration
├── vercel.json                   # Vercel routing config
├── tailwind.config.js            # Tailwind with forest green theme
└── package.json
```

---

## Quick Commands Reference

```bash
# Development
npm run dev                # Start dev server
npm run build             # Build for production
npm run preview           # Preview production build

# Android
npm run android           # Build and open in Android Studio

# Supabase CLI (optional)
npx supabase init
npx supabase link --project-ref cjfmctcoyvggywhtsjvc
npx supabase db pull
npx supabase gen types typescript --linked > src/types/database.ts
```

---

## User Roles & Features

### Car Owners
- Sign up as owner
- Submit vehicle details (make, model, year, license plate, daily rate)
- Upload verification documents (ID, ownership proof)
- View submission status (pending/approved/rejected)
- Manage listed vehicles

### Renters
- Sign up as renter
- Browse approved vehicles
- View vehicle details and pricing
- Book vehicles (future feature)

### Admin
- View all vehicle submissions
- Approve or reject vehicles
- Manage all users and bookings

---

## Common Issues & Solutions

1. **"Invalid API key"** → Check environment variables in `.env.local` and Vercel
2. **"Permission denied"** → Check RLS policies and user roles in Supabase
3. **404 on refresh** → Ensure `vercel.json` exists with routing config
4. **Auth not working** → Verify Supabase client import paths use `@/lib/supabase`
5. **Database empty** → Run schema SQL in Supabase SQL Editor
6. **Android build fails** → Ensure you've run `npm run build` before `npx cap sync`

---

## Next Steps

1. Get your Supabase anon key from the dashboard and add to `.env.local`
2. Run the database schema SQL in Supabase SQL Editor
3. Create admin user
4. Start development: `npm run dev`
5. Test all user flows (owner signup, renter signup, admin approval)
6. Deploy to Vercel
7. Build Android app with `npm run android`

This setup ensures a complete e-hailing service with web and Android support!
