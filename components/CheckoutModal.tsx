'use client'

import React from "react"

import { useState } from 'react'
import { X, Loader, MessageCircle } from 'lucide-react'
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

      const message = `Hi DTRADERS!\n\nOrder ID: ${orderId}\nCustomer: ${customerName}\nEmail: ${customerEmail}\nPhone: ${customerPhone}\n\nItems:\n${itemsList}\n\nSubtotal: $${subtotal.toFixed(2)}\nTax (10%): $${tax.toFixed(2)}\nTotal: $${total.toFixed(2)}\n\nPlease confirm availability and provide delivery options.`

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
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full mx-4 premium-fade luxury-card">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-[#E8DCC4]">
          <h2 className="text-2xl font-serif font-bold text-[#0F1115]">Checkout</h2>
          <button
            onClick={onClose}
            disabled={loading}
            className="text-[#7A7A7A] hover:text-[#C9A24D] disabled:opacity-50 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <form onSubmit={handleCheckout} className="p-6 space-y-5">
          {error && (
            <div className="bg-red-50 border-l-4 border-red-400 text-red-700 p-4 rounded-lg text-sm">
              {error}
            </div>
          )}

          <div>
            <label className="block text-sm font-semibold text-[#0F1115] mb-2">
              Full Name
            </label>
            <input
              type="text"
              required
              value={customerName}
              onChange={e => setCustomerName(e.target.value)}
              className="w-full px-4 py-3 border border-[#E8DCC4] rounded-lg focus:outline-none focus:border-[#C9A24D] focus:ring-2 focus:ring-[#C9A24D]/20 transition-all gold-glow text-[#0F1115]"
              placeholder="John Doe"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-[#0F1115] mb-2">
              Email
            </label>
            <input
              type="email"
              required
              value={customerEmail}
              onChange={e => setCustomerEmail(e.target.value)}
              className="w-full px-4 py-3 border border-[#E8DCC4] rounded-lg focus:outline-none focus:border-[#C9A24D] focus:ring-2 focus:ring-[#C9A24D]/20 transition-all gold-glow text-[#0F1115]"
              placeholder="john@example.com"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-[#0F1115] mb-2">
              Phone Number
            </label>
            <input
              type="tel"
              required
              value={customerPhone}
              onChange={e => setCustomerPhone(e.target.value)}
              className="w-full px-4 py-3 border border-[#E8DCC4] rounded-lg focus:outline-none focus:border-[#C9A24D] focus:ring-2 focus:ring-[#C9A24D]/20 transition-all gold-glow text-[#0F1115]"
              placeholder="+1 (555) 123-4567"
            />
          </div>

          {/* Order Summary */}
          <div className="bg-[#F6F3EE] p-5 rounded-lg space-y-3 text-sm border border-[#E8DCC4]">
            <div className="flex justify-between text-[#7A7A7A]">
              <span>Subtotal:</span>
              <span>${subtotal.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-[#7A7A7A]">
              <span>Tax (10%):</span>
              <span>${tax.toFixed(2)}</span>
            </div>
            <div className="flex justify-between font-bold text-[#C9A24D] text-base border-t border-[#E8DCC4] pt-3">
              <span>Total:</span>
              <span>${total.toFixed(2)}</span>
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="luxury-btn w-full flex items-center justify-center gap-2 disabled:opacity-50"
          >
            {loading && <Loader className="w-4 h-4 animate-spin" />}
            {loading ? 'Processing...' : (
              <>
                <MessageCircle className="w-5 h-5" />
                Continue to WhatsApp
              </>
            )}
          </button>
        </form>
      </div>
    </div>
  )
}
