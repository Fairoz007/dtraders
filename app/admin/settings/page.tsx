'use client'

import React from "react"

import { useEffect, useState } from 'react'
import { createBrowserClient } from '@supabase/ssr'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

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
      setBusinessName('dtraders')
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
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900"></div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <header className="bg-white shadow">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
          <h1 className="text-2xl font-bold text-gray-900">Settings</h1>
          <Link
            href="/admin"
            className="text-gray-600 hover:text-gray-900 font-medium"
          >
            Back to Dashboard
          </Link>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {success && (
          <div className="mb-6 p-4 bg-green-100 border border-green-400 text-green-700 rounded-lg">
            Settings saved successfully!
          </div>
        )}

        {error && (
          <div className="mb-6 p-4 bg-red-100 border border-red-400 text-red-700 rounded-lg">
            {error}
          </div>
        )}

        <div className="bg-white rounded-lg shadow p-6 space-y-8">
          {/* WhatsApp Settings */}
          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-4">
              WhatsApp Integration
            </h2>
            <form onSubmit={handleSave} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  WhatsApp Business Number
                </label>
                <p className="text-xs text-gray-600 mb-2">
                  Format: Country code + number (e.g., 1234567890 for +1 234 567 8900)
                </p>
                <Input
                  type="tel"
                  value={whatsappNumber}
                  onChange={(e) => setWhatsappNumber(e.target.value)}
                  placeholder="1234567890"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Business Name
                </label>
                <Input
                  type="text"
                  value={businessName}
                  onChange={(e) => setBusinessName(e.target.value)}
                  placeholder="dtraders"
                  required
                />
              </div>

              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mt-4">
                <h3 className="font-semibold text-blue-900 mb-2">Preview</h3>
                <p className="text-sm text-blue-800">
                  Customers will see: <strong>{businessName}</strong>
                </p>
                <p className="text-sm text-blue-800 mt-1">
                  WhatsApp Link: <code className="bg-white px-2 py-1 rounded text-xs">
                    https://wa.me/{whatsappNumber}
                  </code>
                </p>
              </div>

              <Button
                type="submit"
                disabled={saving}
                className="bg-gray-900 hover:bg-gray-800 text-white w-full mt-6"
              >
                {saving ? 'Saving...' : 'Save Settings'}
              </Button>
            </form>
          </section>

          {/* Additional Settings */}
          <section className="border-t pt-8">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">
              Booking Settings
            </h2>
            <div className="space-y-4">
              <div className="p-4 bg-gray-50 rounded-lg">
                <h3 className="font-medium text-gray-900 mb-2">Tax Rate</h3>
                <p className="text-sm text-gray-600 mb-3">Currently set to 10%</p>
                <Input
                  type="number"
                  step="0.1"
                  defaultValue="10"
                  disabled
                  placeholder="10"
                />
              </div>

              <div className="p-4 bg-gray-50 rounded-lg">
                <h3 className="font-medium text-gray-900 mb-2">Currency</h3>
                <p className="text-sm text-gray-600 mb-3">Currently set to USD ($)</p>
                <Input
                  type="text"
                  defaultValue="USD"
                  disabled
                  placeholder="USD"
                />
              </div>
            </div>
          </section>
        </div>
      </main>
    </div>
  )
}
