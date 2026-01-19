'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Heart, ShoppingCart } from 'lucide-react'
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

  const handleAddToCart = () => {
    setIsAdding(true)
    onAddToCart(product)
    setTimeout(() => setIsAdding(false), 500)
  }

  return (
    <div className="group">
      <div className="relative bg-white rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-shadow">
        {/* Image */}
        <div className="relative h-80 bg-gray-200 overflow-hidden">
          <img
            src={product.image_url || '/placeholder.jpg'}
            alt={product.name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
          <button
            onClick={() => setIsFavorite(!isFavorite)}
            className="absolute top-4 right-4 p-2 bg-white rounded-full shadow-md hover:shadow-lg transition-shadow"
          >
            <Heart
              className={`w-5 h-5 ${
                isFavorite
                  ? 'fill-red-500 text-red-500'
                  : 'text-gray-400'
              }`}
            />
          </button>
        </div>

        {/* Content */}
        <div className="p-4">
          <h3 className="text-lg font-semibold text-gray-900 mb-2 line-clamp-2">
            {product.name}
          </h3>
          <p className="text-gray-600 text-sm mb-4 line-clamp-2">
            {product.description}
          </p>
          
          <div className="flex items-center justify-between mb-4">
            <span className="text-2xl font-bold text-gray-900">
              ${product.price.toFixed(2)}
            </span>
          </div>

          <Button
            onClick={handleAddToCart}
            disabled={isAdding}
            className="w-full bg-gray-900 hover:bg-gray-800 text-white py-2 rounded-lg flex items-center justify-center gap-2 transition-colors"
          >
            <ShoppingCart className="w-4 h-4" />
            {isAdding ? 'Added!' : 'Add to Cart'}
          </Button>

          <Link
            href={`/product/${product.id}`}
            className="block mt-3 text-center text-gray-600 hover:text-gray-900 text-sm font-medium"
          >
            View Details
          </Link>
        </div>
      </div>
    </div>
  )
}
