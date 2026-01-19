'use client'

import { useEffect, useState } from 'react'
import { createBrowserClient } from '@supabase/ssr'
import Link from 'next/link'
import { Plus, Edit, Trash2, LogOut, Settings, ShoppingBag } from 'lucide-react'
import { Button } from '@/components/ui/button'
import AdminProductForm from '@/components/AdminProductForm'
import AdminProductList from '@/components/AdminProductList'

export default function AdminDashboard() {
  const [products, setProducts] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [showForm, setShowForm] = useState(false)
  const [editingProduct, setEditingProduct] = useState<any>(null)
  const [user, setUser] = useState<any>(null)

  const supabase = createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL || '',
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ''
  )

  useEffect(() => {
    checkAuth()
    fetchProducts()
  }, [])

  const checkAuth = async () => {
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) {
      window.location.href = '/admin/login'
    } else {
      setUser(user)
    }
  }

  const fetchProducts = async () => {
    try {
      const { data, error } = await supabase.from('products').select('*')
      if (error) throw error
      setProducts(data || [])
    } catch (error) {
      console.error('Error fetching products:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleSaveProduct = async (productData: any) => {
    try {
      if (editingProduct) {
        const { error } = await supabase
          .from('products')
          .update(productData)
          .eq('id', editingProduct.id)
        if (error) throw error
      } else {
        const { error } = await supabase
          .from('products')
          .insert([productData])
        if (error) throw error
      }
      fetchProducts()
      setShowForm(false)
      setEditingProduct(null)
    } catch (error) {
      console.error('Error saving product:', error)
    }
  }

  const handleDeleteProduct = async (productId: string) => {
    if (confirm('Are you sure you want to delete this product?')) {
      try {
        const { error } = await supabase
          .from('products')
          .delete()
          .eq('id', productId)
        if (error) throw error
        fetchProducts()
      } catch (error) {
        console.error('Error deleting product:', error)
      }
    }
  }

  const handleLogout = async () => {
    await supabase.auth.signOut()
    window.location.href = '/admin/login'
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
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
          <h1 className="text-2xl font-bold text-gray-900">dtraders Admin</h1>
          <div className="flex items-center gap-4">
            <Link
              href="/admin/orders"
              className="flex items-center gap-2 text-gray-600 hover:text-gray-900"
            >
              <ShoppingBag className="w-5 h-5" />
              Orders
            </Link>
            <Link
              href="/admin/settings"
              className="flex items-center gap-2 text-gray-600 hover:text-gray-900"
            >
              <Settings className="w-5 h-5" />
              Settings
            </Link>
            <button
              onClick={handleLogout}
              className="flex items-center gap-2 text-gray-600 hover:text-gray-900"
            >
              <LogOut className="w-5 h-5" />
              Logout
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Controls */}
        <div className="mb-8 flex items-center justify-between">
          <h2 className="text-3xl font-bold text-gray-900">Products</h2>
          <Button
            onClick={() => {
              setEditingProduct(null)
              setShowForm(true)
            }}
            className="bg-gray-900 hover:bg-gray-800 text-white flex items-center gap-2"
          >
            <Plus className="w-5 h-5" />
            Add Product
          </Button>
        </div>

        {/* Form */}
        {showForm && (
          <div className="mb-8 bg-white rounded-lg shadow p-6">
            <h3 className="text-xl font-semibold text-gray-900 mb-4">
              {editingProduct ? 'Edit Product' : 'Add New Product'}
            </h3>
            <AdminProductForm
              product={editingProduct}
              onSave={handleSaveProduct}
              onCancel={() => {
                setShowForm(false)
                setEditingProduct(null)
              }}
            />
          </div>
        )}

        {/* Products Table */}
        <div className="bg-white rounded-lg shadow overflow-hidden">
          {products.length === 0 ? (
            <div className="p-6 text-center text-gray-600">
              No products yet. Add your first product!
            </div>
          ) : (
            <AdminProductList
              products={products}
              onEdit={(product) => {
                setEditingProduct(product)
                setShowForm(true)
              }}
              onDelete={handleDeleteProduct}
            />
          )}
        </div>
      </main>
    </div>
  )
}
