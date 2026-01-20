import { createClient } from '@supabase/ssr'
import { NextRequest, NextResponse } from 'next/server'

/**
 * Promote existing user to admin endpoint
 * POST /api/admin/promote
 * Body: { email: string }
 * 
 * This promotes an existing authenticated user to admin role
 */

export async function POST(request: NextRequest) {
  try {
    const { email } = await request.json()

    if (!email) {
      return NextResponse.json(
        { error: 'Email is required' },
        { status: 400 }
      )
    }

    // Create Supabase client with service role key
    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL || '',
      process.env.SUPABASE_SERVICE_ROLE_KEY || '',
      {
        auth: {
          persistSession: false,
        },
      }
    )

    // Update user role to admin
    const { data, error } = await supabase
      .from('users')
      .update({ role: 'admin' })
      .eq('email', email)
      .select()

    if (error) {
      return NextResponse.json(
        { error: `Failed to promote user: ${error.message}` },
        { status: 400 }
      )
    }

    if (!data || data.length === 0) {
      return NextResponse.json(
        { error: `User with email ${email} not found` },
        { status: 404 }
      )
    }

    return NextResponse.json({
      success: true,
      message: `User ${email} promoted to admin successfully`,
      user: data[0],
    })
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    )
  }
}
