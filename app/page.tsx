'use client'

import { useEffect, useState } from 'react'
import { createBrowserClient } from '@supabase/ssr'
import Link from 'next/link'
import { useSearchParams } from 'next/navigation'
import { ShoppingCart, Search, Menu, X, Filter, Heart } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import ProductCard from '@/components/ProductCard'
import Cart from '@/components/Cart'
import SearchBar from '@/components/SearchBar'
import CategoryFilter from '@/components/CategoryFilter'
import CheckoutModal from '@/components/CheckoutModal'
import Loading from './loading'

export default function Home() {
  const [products, setProducts] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [cartOpen, setCartOpen] = useState(false)
  const [cartItems, setCartItems] = useState<any[]>([])
  const [menuOpen, setMenuOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)
  const [filteredProducts, setFilteredProducts] = useState<any[]>([])
  const [checkoutOpen, setCheckoutOpen] = useState(false)
  const searchParams = useSearchParams()

  const supabase = createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL || '',
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ''
  )

  useEffect(() => {
    fetchProducts()
  }, [])

  useEffect(() => {
    filterProducts()
  }, [products, searchQuery, selectedCategory])

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

  const filterProducts = () => {
    let filtered = products
    if (searchQuery) {
      filtered = filtered.filter(p =>
        p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.description.toLowerCase().includes(searchQuery.toLowerCase())
      )
    }
    if (selectedCategory) {
      filtered = filtered.filter(p => p.category_id === selectedCategory)
    }
    setFilteredProducts(filtered)
  }

  const categories = [
    { id: '1', name: 'Sofas' },
    { id: '2', name: 'Chairs' },
    { id: '3', name: 'Tables' },
    { id: '4', name: 'Beds' },
    { id: '5', name: 'Storage' }
  ]

  const addToCart = (product: any) => {
    const existingItem = cartItems.find(item => item.id === product.id)
    if (existingItem) {
      setCartItems(cartItems.map(item =>
        item.id === product.id
          ? { ...item, quantity: item.quantity + 1 }
          : item
      ))
    } else {
      setCartItems([...cartItems, { ...product, quantity: 1 }])
    }
  }

  const removeFromCart = (productId: string) => {
    setCartItems(cartItems.filter(item => item.id !== productId))
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <header className="sticky top-0 z-40 bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <div className="flex-shrink-0">
              <h1 className="text-2xl font-bold text-gray-900">dtraders</h1>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center space-x-8">
              <button
                onClick={() => setSelectedCategory(null)}
                className="text-gray-700 hover:text-gray-900 font-medium"
              >
                All Products
              </button>
              {categories.map(cat => (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`font-medium ${
                    selectedCategory === cat.id
                      ? 'text-gray-900'
                      : 'text-gray-700 hover:text-gray-900'
                  }`}
                >
                  {cat.name}
                </button>
              ))}
            </nav>

            {/* Right Icons */}
            <div className="flex items-center space-x-4">
              <div className="hidden md:flex items-center flex-1 max-w-xs mx-4">
                <Input
                  type="text"
                  placeholder="Search furniture..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full"
                />
              </div>
              <button
                onClick={() => setCartOpen(!cartOpen)}
                className="relative p-2 text-gray-700 hover:text-gray-900"
              >
                <ShoppingCart className="w-6 h-6" />
                {cartItems.length > 0 && (
                  <span className="absolute top-0 right-0 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-white transform translate-x-1/2 -translate-y-1/2 bg-red-600 rounded-full">
                    {cartItems.length}
                  </span>
                )}
              </button>
              <button
                onClick={() => setMenuOpen(!menuOpen)}
                className="md:hidden p-2 text-gray-700"
              >
                {menuOpen ? (
                  <X className="w-6 h-6" />
                ) : (
                  <Menu className="w-6 h-6" />
                )}
              </button>
            </div>
          </div>

          {/* Mobile Search */}
          <div className="md:hidden pb-4">
            <Input
              type="text"
              placeholder="Search furniture..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full"
            />
          </div>

          {/* Mobile Menu */}
          {menuOpen && (
            <nav className="md:hidden pb-4 space-y-2">
              <button
                onClick={() => {
                  setSelectedCategory(null)
                  setMenuOpen(false)
                }}
                className="block w-full text-left text-gray-700 hover:text-gray-900 font-medium py-2"
              >
                All Products
              </button>
              {categories.map(cat => (
                <button
                  key={cat.id}
                  onClick={() => {
                    setSelectedCategory(cat.id)
                    setMenuOpen(false)
                  }}
                  className="block w-full text-left text-gray-700 hover:text-gray-900 font-medium py-2"
                >
                  {cat.name}
                </button>
              ))}
            </nav>
          )}
        </div>
      </header>

      <div className="flex flex-1">
        {/* Cart Sidebar */}
        {cartOpen && (
          <aside className="w-96 bg-gray-50 border-l border-gray-200 p-6 overflow-y-auto">
            <Cart items={cartItems} onRemove={removeFromCart} onCheckout={() => setCheckoutOpen(true)} />
          </aside>
        )}

        {/* Main Content */}
        <main className="flex-1">
          {/* Hero Section */}
          <section className="bg-gray-100 py-16">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
              <h2 className="text-4xl font-bold text-gray-900 mb-4">
                Discover Premium Furniture
              </h2>
              <p className="text-xl text-gray-600">
                Curated collections of luxury furniture for your home
              </p>
            </div>
          </section>

          {/* Filters Section */}
          <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 border-b border-gray-200">
            <div className="space-y-6">
              <SearchBar
                value={searchQuery}
                onChange={setSearchQuery}
                onClear={() => setSearchQuery('')}
              />
              <CategoryFilter
                categories={categories.map(cat => cat.name.toLowerCase())}
                selectedCategory={selectedCategory ? categories.find(cat => cat.id === selectedCategory)?.name.toLowerCase() || '' : ''}
                onCategoryChange={(cat) => {
                  if (cat === '') {
                    setSelectedCategory(null)
                  } else {
                    const catId = categories.find(c => c.name.toLowerCase() === cat)?.id || null
                    setSelectedCategory(catId)
                  }
                }}
              />
            </div>
          </section>

          {/* Products Grid */}
          <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            {loading ? (
              <div className="flex justify-center items-center h-64">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900"></div>
              </div>
            ) : filteredProducts.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-gray-600 text-lg">No products found</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredProducts.map(product => (
                  <ProductCard
                    key={product.id}
                    product={product}
                    onAddToCart={addToCart}
                  />
                ))}
              </div>
            )}
          </section>
        </main>
      </div>

      {/* Checkout Modal */}
      <CheckoutModal
        isOpen={checkoutOpen}
        items={cartItems}
        onClose={() => setCheckoutOpen(false)}
        subtotal={cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0)}
        tax={cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0) * 0.1}
        total={cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0) * 1.1}
      />
    </div>
  )
}
