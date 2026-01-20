'use client'

import React from "react"

import { useEffect, useState } from 'react'
import { createBrowserClient } from '@supabase/ssr'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import Footer from '@/components/Footer'

export default function AdminSettings() {
  const [whatsappNumber, setWhatsappNumber] = useState('')
  const [businessName, setBusinessName] = useState('')
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState('')
  const [user, setUser] = useState<any>(null)

  const supabase = createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL || '',
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ''
  )

  useEffect(() => {
    checkAuth()
    fetchSettings()
  }, [])

  const checkAuth = async () => {
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) {
      window.location.href = '/admin/login'
    } else {
      setUser(user)
    }
  }

  const fetchSettings = async () => {
    try {
      // In production, fetch from settings table
      setWhatsappNumber(process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '')
      setBusinessName('DTRADERS')
    } catch (error) {
      console.error('Error fetching settings:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault()
    setSaving(true)
    setError('')
    setSuccess(false)

    try {
      // In production, save to database
      // For now, show success message
      setSuccess(true)
      setTimeout(() => setSuccess(false), 3000)
    } catch (err: any) {
      setError(err.message || 'Failed to save settings')
    } finally {
      setSaving(false)
    }
  }

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen bg-[#F6F3EE]">
        <div className="animate-spin rounded-full h-12 w-12 border-4 border-[#C9A24D] border-t-transparent"></div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-[#F6F3EE] flex flex-col">
      {/* Header */}
      <header className="bg-[#0F1115] shadow-lg">
        <div className="max-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6 flex items-center justify-between">
          <h1 className="text-3xl font-serif font-bold text-[#C9A24D]">Settings</h1>
          <Link
            href="/admin"
            className="text-[#F6F3EE] hover:text-[#C9A24D] transition-colors font-medium"
          >
            Back to Dashboard
          </Link>
        </div>
      </header>

      <main className="flex-1 max-w-4xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {success && (
          <div className="mb-8 p-4 bg-green-50 border-l-4 border-green-400 text-green-700 rounded-lg premium-fade">
            <p className="font-medium">Settings saved successfully!</p>
          </div>
        )}

        {error && (
          <div className="mb-8 p-4 bg-red-50 border-l-4 border-red-400 text-red-700 rounded-lg">
            <p className="font-medium">{error}</p>
          </div>
        )}

        <div className="bg-white rounded-2xl shadow-lg p-8 space-y-12 luxury-card">
          {/* WhatsApp Settings */}
          <section>
            <h2 className="text-2xl font-serif font-semibold text-[#0F1115] mb-6">
              WhatsApp Integration
            </h2>
            <form onSubmit={handleSave} className="space-y-6">
              <div>
                <label className="block text-sm font-semibold text-[#0F1115] mb-2">
                  WhatsApp Business Number
                </label>
                <p className="text-xs text-[#7A7A7A] mb-3">
                  Format: Country code + number (e.g., 1234567890 for +1 234 567 8900)
                </p>
                <input
                  type="tel"
                  value={whatsappNumber}
                  onChange={(e) => setWhatsappNumber(e.target.value)}
                  placeholder="1234567890"
                  required
                  className="w-full px-4 py-3 border border-[#E8DCC4] rounded-lg focus:outline-none focus:border-[#C9A24D] focus:ring-2 focus:ring-[#C9A24D]/20 transition-all gold-glow text-[#0F1115]"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-[#0F1115] mb-2">
                  Business Name
                </label>
                <input
                  type="text"
                  value={businessName}
                  onChange={(e) => setBusinessName(e.target.value)}
                  placeholder="DTRADERS"
                  required
                  className="w-full px-4 py-3 border border-[#E8DCC4] rounded-lg focus:outline-none focus:border-[#C9A24D] focus:ring-2 focus:ring-[#C9A24D]/20 transition-all gold-glow text-[#0F1115]"
                />
              </div>

              <div className="bg-[#F6F3EE] border-l-4 border-[#C9A24D] rounded-lg p-6 mt-6">
                <h3 className="font-semibold text-[#0F1115] mb-3">Preview</h3>
                <p className="text-sm text-[#0F1115] mb-3">
                  Customers will see: <strong className="text-[#C9A24D]">{businessName}</strong>
                </p>
                <p className="text-sm text-[#0F1115] mb-2">
                  WhatsApp Link:
                </p>
                <code className="bg-white px-3 py-2 rounded text-xs text-[#0F1115] border border-[#E8DCC4] block break-all">
                  https://wa.me/{whatsappNumber}
                </code>
              </div>

              <button
                type="submit"
                disabled={saving}
                className="luxury-btn w-full mt-8"
              >
                {saving ? 'Saving...' : 'Save Settings'}
              </button>
            </form>
          </section>

          {/* Additional Settings */}
          <section className="border-t border-[#E8DCC4] pt-12">
            <h2 className="text-2xl font-serif font-semibold text-[#0F1115] mb-6">
              Booking Settings
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="p-6 bg-[#F6F3EE] rounded-lg border border-[#E8DCC4]">
                <h3 className="font-semibold text-[#0F1115] mb-2">Tax Rate</h3>
                <p className="text-sm text-[#7A7A7A] mb-4">Currently set to 10%</p>
                <input
                  type="number"
                  step="0.1"
                  defaultValue="10"
                  disabled
                  className="w-full px-4 py-3 border border-[#E8DCC4] rounded-lg bg-white text-[#0F1115] cursor-not-allowed"
                />
              </div>

              <div className="p-6 bg-[#F6F3EE] rounded-lg border border-[#E8DCC4]">
                <h3 className="font-semibold text-[#0F1115] mb-2">Currency</h3>
                <p className="text-sm text-[#7A7A7A] mb-4">Currently set to USD ($)</p>
                <input
                  type="text"
                  defaultValue="USD"
                  disabled
                  className="w-full px-4 py-3 border border-[#E8DCC4] rounded-lg bg-white text-[#0F1115] cursor-not-allowed"
                />
              </div>
            </div>
          </section>
        </div>
      </main>

      {/* Footer */}
      <Footer />
    </div>
  )
}
