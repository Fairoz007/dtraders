'use client'

import { useEffect, useState } from 'react'
import { createBrowserClient } from '@supabase/ssr'
import Link from 'next/link'
import { Plus, Edit, Trash2, LogOut, Settings, ShoppingBag } from 'lucide-react'
import { Button } from '@/components/ui/button'
import AdminProductForm from '@/components/AdminProductForm'
import AdminProductList from '@/components/AdminProductList'
import Footer from '@/components/Footer'

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
      const endpoint = '/api/products'
      const method = editingProduct ? 'PUT' : 'POST'
      const payload = editingProduct 
        ? { ...productData, id: editingProduct.id }
        : productData

      console.log(`Sending ${method} request to ${endpoint}`, payload)

      const response = await fetch(endpoint, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      }).catch(err => {
        console.error('Fetch error details:', err)
        throw new Error(`Network error: ${err.message}. Please check if the server is running and the API route exists.`)
      })

      const result = await response.json()

      if (!response.ok) {
        throw new Error(result.error || `Failed to ${editingProduct ? 'update' : 'create'} product`)
      }

      await fetchProducts()
      setShowForm(false)
      setEditingProduct(null)
    } catch (error) {
      console.error('Error saving product:', error)
      alert(`Error saving product: ${error instanceof Error ? error.message : 'Unknown error'}`)
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
      <div className="flex justify-center items-center h-screen bg-[#F6F3EE]">
        <div className="animate-spin rounded-full h-12 w-12 border-4 border-[#C9A24D] border-t-transparent"></div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-[#F6F3EE] flex flex-col">
      {/* Header */}
      <header className="bg-[#0F1115] shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 flex items-center justify-between">
          <h1 className="text-3xl font-serif font-bold text-[#C9A24D]">DTRADERS Admin</h1>
          <div className="flex items-center gap-6">
            <Link
              href="/admin/orders"
              className="flex items-center gap-2 text-[#F6F3EE] hover:text-[#C9A24D] transition-colors font-medium"
            >
              <ShoppingBag className="w-5 h-5" />
              Orders
            </Link>
            <Link
              href="/admin/settings"
              className="flex items-center gap-2 text-[#F6F3EE] hover:text-[#C9A24D] transition-colors font-medium"
            >
              <Settings className="w-5 h-5" />
              Settings
            </Link>
            <button
              onClick={handleLogout}
              className="flex items-center gap-2 text-[#F6F3EE] hover:text-[#C9A24D] transition-colors font-medium"
            >
              <LogOut className="w-5 h-5" />
              Logout
            </button>
          </div>
        </div>
      </header>

      <main className="flex-1 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-12">
        {/* Controls */}
        <div className="mb-12 flex items-center justify-between">
          <h2 className="text-4xl font-serif font-bold text-[#0F1115]">Products</h2>
          <button
            onClick={() => {
              setEditingProduct(null)
              setShowForm(true)
            }}
            className="luxury-btn flex items-center gap-2"
          >
            <Plus className="w-5 h-5" />
            Add Product
          </button>
        </div>

        {/* Form */}
        {showForm && (
          <div className="mb-12 bg-white rounded-2xl shadow-lg p-8 premium-fade luxury-card">
            <h3 className="text-2xl font-serif font-semibold text-[#0F1115] mb-6">
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
        <div className="bg-white rounded-2xl shadow-lg overflow-hidden luxury-card">
          {products.length === 0 ? (
            <div className="p-12 text-center text-[#7A7A7A]">
              <p className="text-lg font-light">No products yet. Add your first exquisite piece!</p>
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

      {/* Footer */}
      <Footer />
    </div>
  )
}
