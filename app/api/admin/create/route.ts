import { createClient } from '@supabase/ssr'
import { NextRequest, NextResponse } from 'next/server'

/**
 * Admin creation endpoint
 * POST /api/admin/create
 * Body: { email: string, password: string }
 * 
 * This creates a new user and assigns them admin role
 */

export async function POST(request: NextRequest) {
  try {
    const { email, password } = await request.json()

    if (!email || !password) {
      return NextResponse.json(
        { error: 'Email and password are required' },
        { status: 400 }
      )
    }

    // Create Supabase client with service role key
    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL || '',
      process.env.SUPABASE_SERVICE_ROLE_KEY || ''
    )

    // Create the user in auth
    const { data: authData, error: authError } = await supabase.auth.admin.createUser({
      email,
      password,
      email_confirm: true,
    })

    if (authError) {
      return NextResponse.json(
        { error: `Failed to create user: ${authError.message}` },
        { status: 400 }
      )
    }

    // Create user record with admin role
    const { data: userData, error: userError } = await supabase
      .from('users')
      .insert([
        {
          id: authData.user.id,
          email: authData.user.email,
          role: 'admin',
          full_name: 'Admin User',
        },
      ])
      .select()

    if (userError) {
      return NextResponse.json(
        { error: `Failed to create user record: ${userError.message}` },
        { status: 400 }
      )
    }

    return NextResponse.json({
      success: true,
      message: `Admin user created successfully`,
      user: userData[0],
    })
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    )
  }
}
