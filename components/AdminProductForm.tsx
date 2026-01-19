'use client'

import React from "react"

import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

interface AdminProductFormProps {
  product?: any
  onSave: (productData: any) => void
  onCancel: () => void
}

export default function AdminProductForm({
  product,
  onSave,
  onCancel,
}: AdminProductFormProps) {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    category_id: '1',
    image_url: '',
    in_stock: true,
  })

  const [isSubmitting, setIsSubmitting] = useState(false)

  useEffect(() => {
    if (product) {
      setFormData({
        name: product.name,
        description: product.description,
        price: product.price.toString(),
        category_id: product.category_id,
        image_url: product.image_url || '',
        in_stock: product.in_stock,
      })
    }
  }, [product])

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value, type } = e.target
    const checked = (e.target as HTMLInputElement).checked

    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      const submitData = {
        ...formData,
        price: parseFloat(formData.price),
      }
      onSave(submitData)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Product Name
        </label>
        <Input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
          placeholder="Enter product name"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Description
        </label>
        <textarea
          name="description"
          value={formData.description}
          onChange={handleChange}
          required
          rows={4}
          placeholder="Enter product description"
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-900"
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Price ($)
          </label>
          <Input
            type="number"
            name="price"
            value={formData.price}
            onChange={handleChange}
            required
            step="0.01"
            placeholder="0.00"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Category
          </label>
          <select
            name="category_id"
            value={formData.category_id}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-900"
          >
            <option value="1">Sofas</option>
            <option value="2">Chairs</option>
            <option value="3">Tables</option>
            <option value="4">Beds</option>
            <option value="5">Storage</option>
          </select>
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Image URL
        </label>
        <Input
          type="url"
          name="image_url"
          value={formData.image_url}
          onChange={handleChange}
          placeholder="https://example.com/image.jpg"
        />
      </div>

      <div className="flex items-center">
        <input
          type="checkbox"
          name="in_stock"
          checked={formData.in_stock}
          onChange={handleChange}
          className="rounded border-gray-300"
        />
        <label className="ml-2 text-sm font-medium text-gray-700">
          In Stock
        </label>
      </div>

      <div className="flex gap-3 pt-4">
        <Button
          type="submit"
          disabled={isSubmitting}
          className="flex-1 bg-gray-900 hover:bg-gray-800 text-white"
        >
          {isSubmitting ? 'Saving...' : 'Save Product'}
        </Button>
        <Button
          type="button"
          onClick={onCancel}
          className="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-900"
        >
          Cancel
        </Button>
      </div>
    </form>
  )
}
