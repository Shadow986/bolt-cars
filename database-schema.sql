-- Bolt Cars Database Schema
-- Run this in Supabase SQL Editor

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

-- Create admin user (run after creating user in Supabase Auth)
-- INSERT INTO profiles (id, email, role) 
-- SELECT id, email, 'admin' 
-- FROM auth.users 
-- WHERE email = 'admin@boltcars.com';
