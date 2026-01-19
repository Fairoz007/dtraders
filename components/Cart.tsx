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
        <p className="text-gray-600 mb-4">Your cart is empty</p>
        <Link href="/" className="text-blue-600 hover:text-blue-800">
          Continue shopping
        </Link>
      </div>
    )
  }

  return (
    <div className="flex flex-col h-full">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">Shopping Cart</h2>

      {/* Items List */}
      <div className="flex-1 overflow-y-auto mb-6 space-y-4">
        {items.map(item => (
          <div key={item.id} className="flex gap-3 bg-white p-3 rounded-lg">
            <img
              src={item.image_url || '/placeholder.jpg'}
              alt={item.name}
              className="w-16 h-16 object-cover rounded"
            />
            <div className="flex-1">
              <h3 className="font-semibold text-gray-900 text-sm">{item.name}</h3>
              <p className="text-gray-600 text-xs mt-1">
                ${item.price.toFixed(2)} x {item.quantity}
              </p>
              <p className="text-gray-900 font-semibold text-sm mt-1">
                ${(item.price * item.quantity).toFixed(2)}
              </p>
            </div>
            <button
              onClick={() => onRemove(item.id)}
              className="p-2 text-gray-400 hover:text-red-600 transition-colors"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          </div>
        ))}
      </div>

      {/* Summary */}
      <div className="border-t border-gray-200 pt-4 space-y-2 mb-6">
        <div className="flex justify-between text-gray-600">
          <span>Subtotal:</span>
          <span>${subtotal.toFixed(2)}</span>
        </div>
        <div className="flex justify-between text-gray-600">
          <span>Tax (10%):</span>
          <span>${tax.toFixed(2)}</span>
        </div>
        <div className="flex justify-between text-lg font-bold text-gray-900">
          <span>Total:</span>
          <span>${total.toFixed(2)}</span>
        </div>
      </div>

      {/* Checkout Button */}
      <Button
        onClick={handleCheckout}
        className="w-full bg-green-600 hover:bg-green-700 text-white py-3 rounded-lg flex items-center justify-center gap-2"
      >
        <MessageCircle className="w-5 h-5" />
        Proceed to Checkout
      </Button>
    </div>
  )
}
