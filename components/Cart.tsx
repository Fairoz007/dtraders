'use client'

import Link from 'next/link'
import { Trash2, MessageCircle } from 'lucide-react'
import { Button } from '@/components/ui/button'

interface CartItem {
  id: string
  name: string
  price: number
  quantity: number
  image_url: string
}

interface CartProps {
  items: CartItem[]
  onRemove: (productId: string) => void
  onCheckout?: () => void
}

export default function Cart({ items, onRemove, onCheckout }: CartProps) {
  const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0)
  const tax = subtotal * 0.1
  const total = subtotal + tax

  const handleCheckout = () => {
    if (onCheckout) {
      onCheckout()
    }
  }

  const handleWhatsAppCheckout = () => {
    // Placeholder for WhatsApp checkout logic
    console.log('WhatsApp checkout initiated');
  }

  if (items.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-full text-center">
        <p className="text-[#7A7A7A] mb-4">Your cart is empty</p>
        <Link href="/" className="text-[#C9A24D] hover:text-[#B8942A] font-medium">
          Continue shopping
        </Link>
      </div>
    )
  }

  return (
    <div className="flex flex-col h-full">
      <h2 className="text-2xl font-serif font-bold text-[#0F1115] mb-6">Shopping Cart</h2>

      {/* Items List */}
      <div className="flex-1 overflow-y-auto mb-6 space-y-4">
        {items.map(item => (
          <div key={item.id} className="flex gap-4 bg-[#F6F3EE] p-4 rounded-lg border border-[#E8DCC4] hover:border-[#C9A24D] transition-colors">
            <img
              src={item.image_url || '/placeholder.jpg'}
              alt={item.name}
              className="w-20 h-20 object-cover rounded-lg"
            />
            <div className="flex-1">
              <h3 className="font-semibold text-[#0F1115] text-sm">{item.name}</h3>
              <p className="text-[#7A7A7A] text-xs mt-1">
                ${item.price.toFixed(2)} x {item.quantity}
              </p>
              <p className="text-[#C9A24D] font-semibold text-sm mt-2">
                ${(item.price * item.quantity).toFixed(2)}
              </p>
            </div>
            <button
              onClick={() => onRemove(item.id)}
              className="p-2 text-[#7A7A7A] hover:text-red-600 transition-colors"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          </div>
        ))}
      </div>

      {/* Summary */}
      <div className="border-t border-[#E8DCC4] pt-4 space-y-3 mb-6 bg-[#F6F3EE] p-4 rounded-lg">
        <div className="flex justify-between text-[#7A7A7A] text-sm">
          <span>Subtotal:</span>
          <span>${subtotal.toFixed(2)}</span>
        </div>
        <div className="flex justify-between text-[#7A7A7A] text-sm">
          <span>Tax (10%):</span>
          <span>${tax.toFixed(2)}</span>
        </div>
        <div className="flex justify-between text-lg font-bold text-[#C9A24D] pt-2 border-t border-[#E8DCC4]">
          <span>Total:</span>
          <span>${total.toFixed(2)}</span>
        </div>
      </div>

      {/* Checkout Button */}
      <button
        onClick={handleCheckout}
        className="luxury-btn w-full flex items-center justify-center gap-2"
      >
        <MessageCircle className="w-5 h-5" />
        Proceed to Checkout
      </button>
    </div>
  )
}
