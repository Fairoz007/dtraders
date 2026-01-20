# Admin User Setup Guide

## Overview
This guide explains how to create and manage admin users for the DTRADERS furniture e-commerce platform.

## Methods

### Method 1: Using Supabase Dashboard (Recommended)

1. **Create the auth user:**
   - Go to [Supabase Dashboard](https://supabase.com)
   - Navigate to your project
   - Go to **Auth** > **Users**
   - Click **Add user** button
   - Enter email: `admin@dtraders.in`
   - Set a strong password
   - Click **Create user**

2. **Promote to admin:**
   - Go to **SQL Editor**
   - Run the following query:
   ```sql
   UPDATE public.users 
   SET role = 'admin' 
   WHERE email = 'admin@dtraders.in';
   ```
   - Or insert if user doesn't exist in public.users:
   ```sql
   INSERT INTO public.users (id, email, role, full_name)
   SELECT id, email, 'admin', COALESCE(raw_user_meta_data->>'full_name', 'Admin User')
   FROM auth.users
   WHERE email = 'admin@dtraders.in'
   ON CONFLICT (email) DO UPDATE SET role = 'admin';
   ```

### Method 2: Using API Endpoint

#### Create New Admin User
```bash
curl -X POST http://localhost:3000/api/admin/create \
  -H "Content-Type: application/json" \
  -d '{
    "email": "admin@dtraders.in",
    "password": "SecurePassword123!@#"
  }'
```

#### Promote Existing User to Admin
```bash
curl -X POST http://localhost:3000/api/admin/promote \
  -H "Content-Type: application/json" \
  -d '{
    "email": "admin@dtraders.in"
  }'
```

### Method 3: Using Node.js Script

```bash
# Make sure you're in the project root
cd /path/to/dtraders

# Run the script
node scripts/make-admin.js admin@dtraders.in
```

**Note:** Ensure the user exists in the authentication system first using Method 1.

### Method 4: Direct SQL (Advanced)

1. Open Supabase SQL Editor
2. Find the user's ID from `auth.users`:
```sql
SELECT id, email FROM auth.users WHERE email = 'admin@dtraders.in';
```

3. Insert or update in `public.users`:
```sql
INSERT INTO public.users (id, email, role, full_name)
VALUES ('USER_ID_HERE', 'admin@dtraders.in', 'admin', 'Admin User')
ON CONFLICT (id) DO UPDATE SET role = 'admin';
```

## Verification

After setup, verify the user has admin privileges:

```sql
SELECT id, email, role, created_at FROM public.users WHERE email = 'admin@dtraders.in';
```

Should return: `role = 'admin'`

## Login

1. Visit the admin panel: `http://localhost:3000/admin/login`
2. Enter your admin credentials:
   - Email: `admin@dtraders.in`
   - Password: (the password you set)
3. You'll be logged in and can manage products, orders, and settings

## Troubleshooting

### "User not found" error
- Ensure the user was created in Supabase Auth first
- Check the email spelling matches exactly

### "Invalid API key" error
- Verify `SUPABASE_SERVICE_ROLE_KEY` in `.env` is correct
- Copy it directly from Supabase project settings

### Can't login to admin panel
- Verify the user role is set to 'admin' in the database
- Clear browser cookies and try again
- Check that `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_ANON_KEY` are correct in `.env`

## Security Notes

1. **Never share your Service Role Key** - keep it in `.env` only
2. **Use strong passwords** - admin accounts have full access
3. **Limit admin accounts** - only create as many as needed
4. **Review permissions regularly** - check who has admin access
5. **Change default credentials** - update password after first login

## Additional Admin Emails

To add more admin users, repeat any of the methods above with different email addresses:
- `superadmin@dtraders.in`
- `manager@dtraders.in`
- `support@dtraders.in`

## Support

For issues with Supabase authentication:
- [Supabase Docs](https://supabase.com/docs)
- [Supabase Discord Community](https://discord.supabase.com)
