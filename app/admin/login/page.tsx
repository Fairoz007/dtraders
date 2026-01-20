'use client'

import React from "react"

import { useState } from 'react'
import { createBrowserClient } from '@supabase/ssr'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

export default function AdminLogin() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [isSignUp, setIsSignUp] = useState(false)

  const supabase = createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL || '',
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ''
  )

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    try {
      if (isSignUp) {
        const { error } = await supabase.auth.signUp({
          email,
          password,
          options: {
            emailRedirectTo: `${window.location.origin}/admin`,
          },
        })
        if (error) throw error
        setEmail('')
        setPassword('')
        alert('Check your email for confirmation link')
      } else {
        const { error } = await supabase.auth.signInWithPassword({
          email,
          password,
        })
        if (error) throw error
        window.location.href = '/admin'
      }
    } catch (err: any) {
      setError(err.message || 'Authentication failed')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#0F1115] to-[#1A1D22]">
      <div className="bg-white rounded-2xl shadow-2xl p-8 w-full max-w-md luxury-card">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-serif font-bold text-[#C9A24D] mb-2">
            DTRADERS
          </h1>
          <h2 className="text-xl font-semibold text-[#0F1115]">
            Admin Portal
          </h2>
          <p className="text-[#7A7A7A] text-sm mt-2">Manage your collections</p>
        </div>

        {error && (
          <div className="mb-6 p-4 bg-red-50 border-l-4 border-red-400 text-red-700 rounded">
            <p className="font-medium">{error}</p>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-semibold text-[#0F1115] mb-2">
              Email Address
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="admin@dtraders.com"
              required
              className="w-full px-4 py-3 border border-[#E8DCC4] rounded-lg focus:outline-none focus:border-[#C9A24D] focus:ring-2 focus:ring-[#C9A24D]/20 transition-all gold-glow text-[#0F1115]"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-[#0F1115] mb-2">
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              required
              className="w-full px-4 py-3 border border-[#E8DCC4] rounded-lg focus:outline-none focus:border-[#C9A24D] focus:ring-2 focus:ring-[#C9A24D]/20 transition-all gold-glow text-[#0F1115]"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="luxury-btn w-full"
          >
            {loading ? 'Loading...' : isSignUp ? 'Create Account' : 'Login'}
          </button>
        </form>

        <div className="mt-8 text-center">
          <p className="text-sm text-[#7A7A7A]">
            {isSignUp ? 'Already have an account?' : "Don't have an account?"}{' '}
            <button
              onClick={() => {
                setIsSignUp(!isSignUp)
                setError('')
              }}
              className="text-[#C9A24D] font-semibold hover:text-[#0F1115] transition-colors"
            >
              {isSignUp ? 'Login' : 'Sign Up'}
            </button>
          </p>
        </div>

        <div className="mt-6 text-center">
          <Link href="/" className="text-sm text-[#7A7A7A] hover:text-[#C9A24D] transition-colors">
            Back to Store
          </Link>
        </div>
      </div>
    </div>
  )
}
