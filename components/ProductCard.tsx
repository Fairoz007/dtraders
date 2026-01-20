'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Heart, ShoppingCart, Eye } from 'lucide-react'
import { Button } from '@/components/ui/button'

interface Product {
  id: string
  name: string
  description: string
  price: number
  image_url: string
  category_id: string
}

interface ProductCardProps {
  product: Product
  onAddToCart: (product: Product) => void
}

export default function ProductCard({ product, onAddToCart }: ProductCardProps) {
  const [isFavorite, setIsFavorite] = useState(false)
  const [isAdding, setIsAdding] = useState(false)
  const [isHovered, setIsHovered] = useState(false)

  const handleAddToCart = () => {
    setIsAdding(true)
    onAddToCart(product)
    setTimeout(() => setIsAdding(false), 500)
  }

  return (
    <div className="group premium-fade">
      <div 
        className="luxury-card"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {/* Image Container */}
        <div className="relative h-96 bg-gradient-to-br from-[#F6F3EE] to-[#E8DCC4] overflow-hidden">
          <img
            src={product.image_url || '/placeholder.jpg'}
            alt={product.name}
            className={`w-full h-full object-cover transition-transform duration-700 ${
              isHovered ? 'scale-110' : 'scale-100'
            }`}
          />
          
          {/* Overlay on Hover */}
          <div className={`absolute inset-0 bg-black/40 transition-opacity duration-300 flex items-center justify-center ${
            isHovered ? 'opacity-100' : 'opacity-0'
          }`}>
            <Link href={`/product/${product.id}`}>
              <button className="flex items-center gap-2 px-6 py-3 bg-[#C9A24D] hover:bg-[#B8942A] text-white font-semibold rounded transition-all duration-300 transform hover:scale-105">
                <Eye size={18} />
                Quick View
              </button>
            </Link>
          </div>

          {/* Favorite Button */}
          <button
            onClick={() => setIsFavorite(!isFavorite)}
            className="absolute top-6 right-6 p-3 bg-white/90 backdrop-blur-sm rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:bg-[#C9A24D] hover:text-white"
          >
            <Heart
              className={`w-5 h-5 transition-all ${
                isFavorite
                  ? 'fill-red-500 text-red-500'
                  : 'text-[#0F1115]'
              }`}
            />
          </button>
        </div>

        {/* Content */}
        <div className="p-6">
          <h3 className="text-lg font-serif font-semibold text-[#0F1115] mb-2 line-clamp-2 letter-spacing">
            {product.name}
          </h3>
          <p className="text-[#7A7A7A] text-sm mb-4 line-clamp-2 leading-relaxed">
            {product.description}
          </p>
          
          <div className="mb-6">
            <span className="text-3xl font-bold font-serif text-[#C9A24D]">
              ${product.price.toFixed(2)}
            </span>
          </div>

          <div className="flex gap-3">
            <button
              onClick={handleAddToCart}
              disabled={isAdding}
              className="flex-1 bg-[#0F1115] hover:bg-[#C9A24D] text-white hover:text-[#0F1115] py-3 rounded font-semibold flex items-center justify-center gap-2 transition-all duration-300 transform hover:shadow-lg disabled:opacity-50"
            >
              <ShoppingCart className="w-4 h-4" />
              {isAdding ? 'Adding...' : 'Add to Cart'}
            </button>
            
            <Link href={`/product/${product.id}`} className="flex-1">
              <button className="w-full border-2 border-[#0F1115] hover:bg-[#0F1115] text-[#0F1115] hover:text-[#F6F3EE] py-3 rounded font-semibold transition-all duration-300">
                Details
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
