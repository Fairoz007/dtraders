'use client'

import React from "react"

import { useState } from 'react'
import { X, Loader } from 'lucide-react'
import { Button } from '@/components/ui/button'

interface CartItem {
  id: string
  name: string
  price: number
  quantity: number
  image_url: string
}

interface CheckoutModalProps {
  isOpen: boolean
  items: CartItem[]
  onClose: () => void
  subtotal: number
  tax: number
  total: number
}

export default function CheckoutModal({
  isOpen,
  items,
  onClose,
  subtotal,
  tax,
  total,
}: CheckoutModalProps) {
  const [customerName, setCustomerName] = useState('')
  const [customerEmail, setCustomerEmail] = useState('')
  const [customerPhone, setCustomerPhone] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleCheckout = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    try {
      // Save order to database
      const response = await fetch('/api/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          items,
          customerName,
          customerEmail,
          customerPhone,
          totalAmount: total,
        }),
      })

      if (!response.ok) {
        throw new Error('Failed to create order')
      }

      const { orderId } = await response.json()

      // Generate WhatsApp message with order ID
      const itemsList = items
        .map(item => `${item.name} x${item.quantity} - $${(item.price * item.quantity).toFixed(2)}`)
        .join('\n')

      const message = `Hi dtraders!\n\nOrder ID: ${orderId}\nCustomer: ${customerName}\nEmail: ${customerEmail}\nPhone: ${customerPhone}\n\nItems:\n${itemsList}\n\nSubtotal: $${subtotal.toFixed(2)}\nTax (10%): $${tax.toFixed(2)}\nTotal: $${total.toFixed(2)}\n\nPlease confirm availability and provide delivery options.`

      const encodedMessage = encodeURIComponent(message)
      
      // Get WhatsApp number from environment or use default
      const whatsappNumber = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '1234567890'
      window.open(`https://wa.me/${whatsappNumber}?text=${encodedMessage}`, '_blank')

      onClose()
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Something went wrong')
    } finally {
      setLoading(false)
    }
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-xl max-w-md w-full mx-4">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <h2 className="text-xl font-bold text-gray-900">Checkout</h2>
          <button
            onClick={onClose}
            disabled={loading}
            className="text-gray-400 hover:text-gray-600 disabled:opacity-50"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <form onSubmit={handleCheckout} className="p-6 space-y-4">
          {error && (
            <div className="bg-red-50 text-red-700 p-3 rounded-lg text-sm">{error}</div>
          )}

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Full Name
            </label>
            <input
              type="text"
              required
              value={customerName}
              onChange={e => setCustomerName(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="John Doe"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Email
            </label>
            <input
              type="email"
              required
              value={customerEmail}
              onChange={e => setCustomerEmail(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="john@example.com"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Phone Number
            </label>
            <input
              type="tel"
              required
              value={customerPhone}
              onChange={e => setCustomerPhone(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="+1 (555) 123-4567"
            />
          </div>

          {/* Order Summary */}
          <div className="bg-gray-50 p-4 rounded-lg space-y-2 text-sm">
            <div className="flex justify-between text-gray-600">
              <span>Subtotal:</span>
              <span>${subtotal.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-gray-600">
              <span>Tax (10%):</span>
              <span>${tax.toFixed(2)}</span>
            </div>
            <div className="flex justify-between font-bold text-gray-900 text-base border-t border-gray-200 pt-2">
              <span>Total:</span>
              <span>${total.toFixed(2)}</span>
            </div>
          </div>

          <Button
            type="submit"
            disabled={loading}
            className="w-full bg-green-600 hover:bg-green-700 text-white py-2 rounded-lg flex items-center justify-center gap-2 disabled:opacity-50"
          >
            {loading && <Loader className="w-4 h-4 animate-spin" />}
            {loading ? 'Processing...' : 'Continue to WhatsApp'}
          </Button>
        </form>
      </div>
    </div>
  )
}
