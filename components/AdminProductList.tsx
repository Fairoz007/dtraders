'use client'

import { Edit, Trash2 } from 'lucide-react'
import { Button } from '@/components/ui/button'

interface Product {
  id: string
  name: string
  description: string
  price: number
  category_id: string
  image_url: string
  in_stock: boolean
  created_at?: string
}

interface AdminProductListProps {
  products: Product[]
  onEdit: (product: Product) => void
  onDelete: (productId: string) => void
}

const categoryNames: Record<string, string> = {
  '1': 'Sofas',
  '2': 'Chairs',
  '3': 'Tables',
  '4': 'Beds',
  '5': 'Storage',
}

export default function AdminProductList({
  products,
  onEdit,
  onDelete,
}: AdminProductListProps) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full">
        <thead className="bg-gray-50 border-b border-gray-200">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-900 uppercase tracking-wider">
              Product
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-900 uppercase tracking-wider">
              Category
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-900 uppercase tracking-wider">
              Price
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-900 uppercase tracking-wider">
              Stock
            </th>
            <th className="px-6 py-3 text-right text-xs font-medium text-gray-900 uppercase tracking-wider">
              Actions
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200">
          {products.map(product => (
            <tr key={product.id} className="hover:bg-gray-50 transition-colors">
              <td className="px-6 py-4">
                <div className="flex items-center gap-3">
                  {product.image_url && (
                    <img
                      src={product.image_url || "/placeholder.svg"}
                      alt={product.name}
                      className="w-10 h-10 object-cover rounded"
                    />
                  )}
                  <div>
                    <p className="text-sm font-medium text-gray-900">
                      {product.name}
                    </p>
                    <p className="text-xs text-gray-500 line-clamp-1">
                      {product.description}
                    </p>
                  </div>
                </div>
              </td>
              <td className="px-6 py-4 text-sm text-gray-600">
                {categoryNames[product.category_id] || 'Unknown'}
              </td>
              <td className="px-6 py-4 text-sm font-medium text-gray-900">
                ${product.price.toFixed(2)}
              </td>
              <td className="px-6 py-4">
                <span
                  className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                    product.in_stock
                      ? 'bg-green-100 text-green-800'
                      : 'bg-red-100 text-red-800'
                  }`}
                >
                  {product.in_stock ? 'In Stock' : 'Out of Stock'}
                </span>
              </td>
              <td className="px-6 py-4 text-right space-x-2">
                <button
                  onClick={() => onEdit(product)}
                  className="inline-flex items-center gap-2 px-3 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded hover:bg-gray-200 transition-colors"
                >
                  <Edit className="w-4 h-4" />
                  Edit
                </button>
                <button
                  onClick={() => onDelete(product.id)}
                  className="inline-flex items-center gap-2 px-3 py-2 text-sm font-medium text-red-700 bg-red-100 rounded hover:bg-red-200 transition-colors"
                >
                  <Trash2 className="w-4 h-4" />
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
