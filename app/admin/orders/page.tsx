'use client'

import { useEffect, useState } from 'react'
import { createBrowserClient } from '@supabase/ssr'
import { ChevronLeft, Clock, CheckCircle, AlertCircle } from 'lucide-react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'

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
        return <Clock className="w-4 h-4 text-yellow-500" />
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
        return 'bg-yellow-50 text-yellow-900'
      case 'confirmed':
        return 'bg-blue-50 text-blue-900'
      case 'completed':
        return 'bg-green-50 text-green-900'
      case 'cancelled':
        return 'bg-red-50 text-red-900'
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center gap-4">
          <Link href="/admin" className="text-gray-600 hover:text-gray-900">
            <ChevronLeft className="w-5 h-5" />
          </Link>
          <h1 className="text-2xl font-bold text-gray-900">Orders & Bookings</h1>
        </div>
      </header>

      {/* Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {loading ? (
          <div className="text-center py-12">
            <p className="text-gray-600">Loading orders...</p>
          </div>
        ) : orders.length === 0 ? (
          <div className="bg-white rounded-lg shadow p-12 text-center">
            <p className="text-gray-600 text-lg">No orders yet. When customers use WhatsApp checkout, they'll appear here.</p>
          </div>
        ) : (
          <div className="bg-white rounded-lg shadow overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-100 border-b border-gray-200">
                  <tr>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Customer</th>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Contact</th>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Amount</th>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Status</th>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Date</th>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {orders.map(order => (
                    <tr key={order.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 text-sm text-gray-900">{order.customer_name}</td>
                      <td className="px-6 py-4 text-sm text-gray-600">
                        <div>{order.customer_email}</div>
                        <div>{order.customer_phone}</div>
                      </td>
                      <td className="px-6 py-4 text-sm font-medium text-gray-900">${order.total_amount.toFixed(2)}</td>
                      <td className="px-6 py-4">
                        <span className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-sm font-medium ${getStatusBg(order.status)}`}>
                          {getStatusIcon(order.status)}
                          {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-600">
                        {new Date(order.created_at).toLocaleDateString()}
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex gap-2">
                          {order.status !== 'completed' && order.status !== 'cancelled' && (
                            <>
                              {order.status === 'pending' && (
                                <Button
                                  size="sm"
                                  onClick={() => updateOrderStatus(order.id, 'confirmed')}
                                  className="bg-blue-600 hover:bg-blue-700 text-white"
                                >
                                  Confirm
                                </Button>
                              )}
                              {order.status === 'confirmed' && (
                                <Button
                                  size="sm"
                                  onClick={() => updateOrderStatus(order.id, 'completed')}
                                  className="bg-green-600 hover:bg-green-700 text-white"
                                >
                                  Complete
                                </Button>
                              )}
                            </>
                          )}
                          {order.status !== 'cancelled' && (
                            <Button
                              size="sm"
                              onClick={() => updateOrderStatus(order.id, 'cancelled')}
                              className="bg-red-600 hover:bg-red-700 text-white"
                            >
                              Cancel
                            </Button>
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
    </div>
  )
}
