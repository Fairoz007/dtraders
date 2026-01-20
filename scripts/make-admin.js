#!/usr/bin/env node

/**
 * Script to promote a user to admin role
 * Usage: node scripts/make-admin.js <email>
 * Example: node scripts/make-admin.js admin@dtraders.in
 */

const fs = require('fs');
const path = require('path');
const { createClient } = require('@supabase/supabase-js');

// Load .env file manually
function loadEnv() {
  const envPath = path.join(__dirname, '..', '.env');
  const envContent = fs.readFileSync(envPath, 'utf8');
  const lines = envContent.split('\n');
  
  const env = {};
  lines.forEach(line => {
    if (line && !line.startsWith('#')) {
      const [key, ...valueParts] = line.split('=');
      if (key) {
        env[key.trim()] = valueParts.join('=').trim();
      }
    }
  });
  
  return env;
}

const env = loadEnv();

const supabaseUrl = env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseServiceKey = env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseServiceKey) {
  console.error('Error: Missing NEXT_PUBLIC_SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY in .env');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseServiceKey);

async function makeUserAdmin(email) {
  try {
    console.log(`\n🔄 Attempting to make ${email} an admin...\n`);

    // First, check if user exists in auth.users
    const { data: authUser, error: authError } = await supabase.auth.admin.listUsers();
    
    if (authError) {
      throw new Error(`Failed to list users: ${authError.message}`);
    }

    const user = authUser.users.find(u => u.email === email);
    
    if (!user) {
      console.error(`❌ User with email ${email} not found in authentication`);
      console.log('\n📋 Available users:');
      authUser.users.forEach(u => {
        console.log(`  - ${u.email} (ID: ${u.id})`);
      });
      process.exit(1);
    }

    console.log(`✅ Found user: ${user.email} (ID: ${user.id})`);

    // Update the user role in public.users table
    const { data, error } = await supabase
      .from('users')
      .update({ role: 'admin' })
      .eq('id', user.id)
      .select();

    if (error) {
      throw new Error(`Failed to update user role: ${error.message}`);
    }

    if (data && data.length > 0) {
      console.log(`\n✅ Successfully promoted ${email} to admin!`);
      console.log(`\n📝 User Details:`);
      console.log(`  Email: ${data[0].email}`);
      console.log(`  Role: ${data[0].role}`);
      console.log(`  Created: ${data[0].created_at}`);
    } else {
      console.error(`\n❌ User record not found in public.users table`);
      console.log(`Creating user record...`);
      
      const { data: newUser, error: createError } = await supabase
        .from('users')
        .insert([{
          id: user.id,
          email: user.email,
          role: 'admin',
          full_name: user.user_metadata?.full_name || 'Admin'
        }])
        .select();

      if (createError) {
        throw new Error(`Failed to create user record: ${createError.message}`);
      }

      console.log(`\n✅ Successfully created admin user!`);
      console.log(`\n📝 User Details:`);
      console.log(`  Email: ${newUser[0].email}`);
      console.log(`  Role: ${newUser[0].role}`);
    }

    console.log(`\n🎉 Admin setup complete!\n`);
    process.exit(0);

  } catch (error) {
    console.error(`\n❌ Error: ${error.message}\n`);
    process.exit(1);
  }
}

const email = process.argv[2];

if (!email) {
  console.error(`\n❌ Error: Email address is required\n`);
  console.log(`Usage: node scripts/make-admin.js <email>`);
  console.log(`Example: node scripts/make-admin.js admin@dtraders.in\n`);
  process.exit(1);
}

// Validate email format
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
if (!emailRegex.test(email)) {
  console.error(`\n❌ Error: Invalid email address format\n`);
  process.exit(1);
}

makeUserAdmin(email);
