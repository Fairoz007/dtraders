-- SQL Script to promote a user to admin role
-- Run this directly in Supabase SQL Editor if needed
-- Replace 'admin@dtraders.in' with the actual admin email

-- Method 1: Update role in public.users table (if user already exists)
UPDATE public.users 
SET role = 'admin' 
WHERE email = 'admin@dtraders.in';

-- Method 2: If user doesn't exist in public.users yet, insert them
-- First, get the user ID from auth.users (you can see this in Supabase auth dashboard)
-- Then run this:
INSERT INTO public.users (id, email, role, full_name)
VALUES (
  'USER_ID_FROM_AUTH',  -- Replace with actual UUID from auth.users
  'admin@dtraders.in',
  'admin',
  'Admin User'
)
ON CONFLICT (id) 
DO UPDATE SET role = 'admin';

-- Verify the role was updated:
SELECT id, email, role, created_at FROM public.users WHERE email = 'admin@dtraders.in';
