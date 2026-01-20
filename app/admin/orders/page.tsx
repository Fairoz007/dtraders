'use client'

import { useEffect, useState } from 'react'
import { createBrowserClient } from '@supabase/ssr'
import { ChevronLeft, Clock, CheckCircle, AlertCircle } from 'lucide-react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import Footer from '@/components/Footer'

interface Order {
  id: string
  customer_name: string
  customer_email: string
  customer_phone: string
  total_amount: number
  status: 'pending' | 'confirmed' | 'completed' | 'cancelled'
  created_at: string
  updated_at: string
}

export default function OrdersPage() {
  const [orders, setOrders] = useState<Order[]>([])
  const [loading, setLoading] = useState(true)
  const supabase = createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
  )

  useEffect(() => {
    const fetchOrders = async () => {
      const { data, error } = await supabase
        .from('orders')
        .select('*')
        .order('created_at', { ascending: false })

      if (error) {
        console.error('Error fetching orders:', error)
      } else {
        setOrders(data || [])
      }
      setLoading(false)
    }

    fetchOrders()
  }, [supabase])

  const updateOrderStatus = async (orderId: string, newStatus: Order['status']) => {
    const { error } = await supabase
      .from('orders')
      .update({ status: newStatus, updated_at: new Date().toISOString() })
      .eq('id', orderId)

    if (error) {
      console.error('Error updating order:', error)
    } else {
      setOrders(orders.map(order => 
        order.id === orderId ? { ...order, status: newStatus } : order
      ))
    }
  }

  const getStatusIcon = (status: Order['status']) => {
    switch (status) {
      case 'pending':
        return <Clock className="w-4 h-4 text-[#C9A24D]" />
      case 'confirmed':
        return <CheckCircle className="w-4 h-4 text-blue-500" />
      case 'completed':
        return <CheckCircle className="w-4 h-4 text-green-500" />
      case 'cancelled':
        return <AlertCircle className="w-4 h-4 text-red-500" />
    }
  }

  const getStatusBg = (status: Order['status']) => {
    switch (status) {
      case 'pending':
        return 'bg-[#E8DCC4]/30 text-[#C9A24D]'
      case 'confirmed':
        return 'bg-blue-50 text-blue-900'
      case 'completed':
        return 'bg-green-50 text-green-900'
      case 'cancelled':
        return 'bg-red-50 text-red-900'
    }
  }

  return (
    <div className="min-h-screen bg-[#F6F3EE] flex flex-col">
      {/* Header */}
      <header className="bg-[#0F1115] shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 flex items-center gap-4">
          <Link href="/admin" className="text-[#F6F3EE] hover:text-[#C9A24D] transition-colors">
            <ChevronLeft className="w-5 h-5" />
          </Link>
          <h1 className="text-3xl font-serif font-bold text-[#C9A24D]">Orders & Bookings</h1>
        </div>
      </header>

      {/* Content */}
      <main className="flex-1 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-12">
        {loading ? (
          <div className="text-center py-24">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-4 border-[#C9A24D] border-t-transparent mb-4"></div>
            <p className="text-[#7A7A7A]">Loading orders...</p>
          </div>
        ) : orders.length === 0 ? (
          <div className="bg-white rounded-2xl shadow-lg p-16 text-center luxury-card">
            <p className="text-[#7A7A7A] text-lg font-light">No orders yet. When customers use WhatsApp checkout, they'll appear here.</p>
          </div>
        ) : (
          <div className="bg-white rounded-2xl shadow-lg overflow-hidden luxury-card">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-[#0F1115] border-b border-[#E8DCC4]">
                  <tr>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-[#C9A24D]">Customer</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-[#C9A24D]">Contact</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-[#C9A24D]">Amount</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-[#C9A24D]">Status</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-[#C9A24D]">Date</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-[#C9A24D]">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#E8DCC4]">
                  {orders.map(order => (
                    <tr key={order.id} className="hover:bg-[#F6F3EE]/50 transition-colors">
                      <td className="px-6 py-4 text-sm text-[#0F1115] font-medium">{order.customer_name}</td>
                      <td className="px-6 py-4 text-sm text-[#7A7A7A]">
                        <div>{order.customer_email}</div>
                        <div>{order.customer_phone}</div>
                      </td>
                      <td className="px-6 py-4 text-sm font-semibold text-[#C9A24D]">${order.total_amount.toFixed(2)}</td>
                      <td className="px-6 py-4">
                        <span className={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium ${getStatusBg(order.status)}`}>
                          {getStatusIcon(order.status)}
                          {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-sm text-[#7A7A7A]">
                        {new Date(order.created_at).toLocaleDateString()}
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex gap-2">
                          {order.status !== 'completed' && order.status !== 'cancelled' && (
                            <>
                              {order.status === 'pending' && (
                                <button
                                  onClick={() => updateOrderStatus(order.id, 'confirmed')}
                                  className="px-3 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded text-sm font-medium transition-colors"
                                >
                                  Confirm
                                </button>
                              )}
                              {order.status === 'confirmed' && (
                                <button
                                  onClick={() => updateOrderStatus(order.id, 'completed')}
                                  className="px-3 py-2 bg-green-600 hover:bg-green-700 text-white rounded text-sm font-medium transition-colors"
                                >
                                  Complete
                                </button>
                              )}
                            </>
                          )}
                          {order.status !== 'cancelled' && (
                            <button
                              onClick={() => updateOrderStatus(order.id, 'cancelled')}
                              className="px-3 py-2 bg-red-600 hover:bg-red-700 text-white rounded text-sm font-medium transition-colors"
                            >
                              Cancel
                            </button>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </main>

      {/* Footer */}
      <Footer />
    </div>
  )
}
