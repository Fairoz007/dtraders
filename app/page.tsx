'use client'

import { useEffect, useState } from 'react'
import { createBrowserClient } from '@supabase/ssr'
import Link from 'next/link'
import { useSearchParams } from 'next/navigation'
import { ShoppingCart, Search, Menu, X, Filter, Heart, ChevronRight } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import ProductCard from '@/components/ProductCard'
import Cart from '@/components/Cart'
import SearchBar from '@/components/SearchBar'
import CategoryFilter from '@/components/CategoryFilter'
import CheckoutModal from '@/components/CheckoutModal'
import Footer from '@/components/Footer'
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
  const [scrolled, setScrolled] = useState(false)
  const searchParams = useSearchParams()

  const supabase = createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL || '',
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ''
  )

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

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
    <div className="min-h-screen bg-[#F6F3EE]">
      {/* Navigation */}
      <header className={`sticky top-0 z-40 transition-all duration-300 ${
        scrolled 
          ? 'bg-[#0F1115]/95 backdrop-blur-md shadow-lg' 
          : 'bg-transparent'
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            {/* Logo */}
            <div className="flex-shrink-0">
              <h1 className={`text-2xl font-serif font-bold transition-colors ${
                scrolled ? 'text-[#C9A24D]' : 'text-[#0F1115]'
              }`}>
                DTRADERS
              </h1>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center space-x-8">
              <button
                onClick={() => setSelectedCategory(null)}
                className={`font-medium transition-colors duration-300 ${
                  scrolled 
                    ? 'text-[#F6F3EE] hover:text-[#C9A24D]' 
                    : 'text-[#0F1115] hover:text-[#C9A24D]'
                }`}
              >
                All Products
              </button>
              {categories.map(cat => (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`font-medium transition-colors duration-300 ${
                    selectedCategory === cat.id
                      ? scrolled ? 'text-[#C9A24D]' : 'text-[#C9A24D]'
                      : scrolled 
                        ? 'text-[#F6F3EE] hover:text-[#C9A24D]' 
                        : 'text-[#0F1115] hover:text-[#C9A24D]'
                  }`}
                >
                  {cat.name}
                </button>
              ))}
            </nav>

            {/* Right Icons */}
            <div className="flex items-center space-x-4">
              <div className="hidden lg:flex items-center">
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Search..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="px-4 py-2 bg-white/10 text-[#0F1115] placeholder-[#7A7A7A] rounded border border-[#C9A24D]/30 focus:outline-none focus:border-[#C9A24D] transition-all gold-glow"
                  />
                  <Search className={`absolute right-3 top-2.5 w-5 h-5 ${scrolled ? 'text-[#C9A24D]' : 'text-[#0F1115]'}`} />
                </div>
              </div>
              <button
                onClick={() => setCartOpen(!cartOpen)}
                className={`relative p-2 transition-colors ${
                  scrolled 
                    ? 'text-[#F6F3EE] hover:text-[#C9A24D]' 
                    : 'text-[#0F1115] hover:text-[#C9A24D]'
                }`}
              >
                <ShoppingCart className="w-6 h-6" />
                {cartItems.length > 0 && (
                  <span className="absolute top-0 right-0 inline-flex items-center justify-center px-2 py-1 text-xs font-bold text-[#0F1115] bg-[#C9A24D] rounded-full">
                    {cartItems.length}
                  </span>
                )}
              </button>
              <button
                onClick={() => setMenuOpen(!menuOpen)}
                className={`md:hidden p-2 transition-colors ${
                  scrolled 
                    ? 'text-[#F6F3EE]' 
                    : 'text-[#0F1115]'
                }`}
              >
                {menuOpen ? (
                  <X className="w-6 h-6" />
                ) : (
                  <Menu className="w-6 h-6" />
                )}
              </button>
            </div>
          </div>

          {/* Mobile Menu */}
          {menuOpen && (
            <nav className="md:hidden pb-4 space-y-2 border-t border-[#E8DCC4]/20">
              <button
                onClick={() => {
                  setSelectedCategory(null)
                  setMenuOpen(false)
                }}
                className="block w-full text-left text-[#0F1115] hover:text-[#C9A24D] font-medium py-2"
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
                  className="block w-full text-left text-[#0F1115] hover:text-[#C9A24D] font-medium py-2"
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
          <aside className="w-96 bg-white border-l border-[#E8DCC4] p-6 overflow-y-auto luxury-shadow">
            <Cart items={cartItems} onRemove={removeFromCart} onCheckout={() => setCheckoutOpen(true)} />
          </aside>
        )}

        {/* Main Content */}
        <main className="flex-1">
          {/* Hero Section */}
          <section className="relative h-screen bg-gradient-to-br from-[#0F1115] via-[#1A1D22] to-[#0F1115] flex items-center justify-center text-center overflow-hidden">
            <div className="absolute inset-0 opacity-20">
              <div className="absolute w-96 h-96 bg-[#C9A24D]/20 rounded-full blur-3xl top-10 left-10"></div>
              <div className="absolute w-96 h-96 bg-[#2D5F4F]/20 rounded-full blur-3xl bottom-10 right-10"></div>
            </div>
            
            <div className="relative max-w-5xl mx-auto px-4 z-10 premium-fade">
              <h1 className="text-6xl md:text-7xl lg:text-8xl font-serif font-bold text-[#F6F3EE] mb-6 leading-tight">
                Luxury Reimagined
              </h1>
              <p className="text-xl md:text-2xl text-[#E8DCC4] mb-8 max-w-2xl mx-auto font-light">
                Discover meticulously curated furniture that transforms your space into a sanctuary of elegance and comfort
              </p>
              <button
                onClick={() => {
                  setSelectedCategory(null)
                  window.scrollTo({ top: document.body.scrollHeight * 0.4, behavior: 'smooth' })
                }}
                className="luxury-btn group inline-flex items-center gap-3"
              >
                Explore Collection
                <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </section>

          {/* Category Showcase */}
          <section className="py-20 px-4 bg-[#F6F3EE]">
            <div className="max-w-7xl mx-auto">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
                {categories.map((cat, idx) => (
                  <button
                    key={cat.id}
                    onClick={() => {
                      setSelectedCategory(cat.id)
                      window.scrollTo({ top: document.body.scrollHeight * 0.5, behavior: 'smooth' })
                    }}
                    className="group luxury-card p-6 text-center hover:border-[#C9A24D] transition-all duration-300"
                  >
                    <div className="text-4xl mb-4 group-hover:scale-110 transition-transform duration-300">
                      {idx === 0 ? '🛋️' : idx === 1 ? '🪑' : idx === 2 ? '🛏️' : idx === 3 ? '🛏️' : '📦'}
                    </div>
                    <h3 className="font-serif text-xl font-semibold text-[#0F1115] group-hover:text-[#C9A24D] transition-colors">
                      {cat.name}
                    </h3>
                  </button>
                ))}
              </div>
            </div>
          </section>

          {/* Filters Section */}
          <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <div className="space-y-8">
              <div>
                <h2 className="text-4xl font-serif font-bold text-[#0F1115] mb-8 text-center">
                  {selectedCategory 
                    ? categories.find(c => c.id === selectedCategory)?.name 
                    : 'All Collections'}
                </h2>
              </div>
              <div className="flex flex-col md:flex-row gap-4">
                <div className="flex-1">
                  <SearchBar
                    value={searchQuery}
                    onChange={setSearchQuery}
                    onClear={() => setSearchQuery('')}
                  />
                </div>
              </div>
            </div>
          </section>

          {/* Products Grid */}
          <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 pb-24">
            {loading ? (
              <div className="flex justify-center items-center h-64">
                <div className="animate-spin rounded-full h-12 w-12 border-4 border-[#C9A24D] border-t-transparent"></div>
              </div>
            ) : filteredProducts.length === 0 ? (
              <div className="text-center py-24">
                <p className="text-[#7A7A7A] text-lg font-light">No exquisite pieces found in this collection</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
                {filteredProducts.map((product, idx) => (
                  <div key={product.id} style={{ animationDelay: `${idx * 0.1}s` }} className="premium-fade">
                    <ProductCard
                      product={product}
                      onAddToCart={addToCart}
                    />
                  </div>
                ))}
              </div>
            )}
          </section>
        </main>
      </div>

      {/* Footer */}
      <Footer />

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
