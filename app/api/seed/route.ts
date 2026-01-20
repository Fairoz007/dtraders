import { createServerClient } from '@supabase/ssr'
import { cookies } from 'next/headers'

export async function POST() {
  const cookieStore = await cookies()
  
  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL || '',
    process.env.SUPABASE_SERVICE_ROLE_KEY || '',
    {
      cookies: {
        getAll() {
          return cookieStore.getAll()
        },
        setAll(cookiesToSet) {
          try {
            cookiesToSet.forEach(({ name, value, options }) =>
              cookieStore.set(name, value, options)
            )
          } catch {
            // Handle cookie setting errors
          }
        },
      },
    }
  )

  try {
    // First, create categories
    const categories = [
      { name: 'Sofas', description: 'Luxury seating for your living space' },
      { name: 'Chairs', description: 'Premium chairs for comfort and style' },
      { name: 'Tables', description: 'Elegant dining and coffee tables' },
      { name: 'Beds', description: 'Luxurious bedroom furniture' },
      { name: 'Storage', description: 'Sophisticated storage solutions' },
    ]

    const { data: categoryData, error: categoryError } = await supabase
      .from('categories')
      .insert(categories)
      .select()

    if (categoryError) {
      return Response.json({ error: `Category creation failed: ${categoryError.message}` }, { status: 400 })
    }

    // Create a map of category names to IDs
    const categoryMap: Record<string, string> = {}
    categoryData?.forEach((cat: any) => {
      categoryMap[cat.name] = cat.id
    })

    // Now create products with correct category UUIDs
    const products = [
      {
        name: 'Modern Leather Sofa',
        description: 'Premium leather sofa with adjustable headrests and storage compartments',
        price: 2499.99,
        category_id: categoryMap['Sofas'],
        image_url: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=500&h=500&fit=crop',
        stock_quantity: 1,
      },
      {
        name: 'Scandinavian Accent Chair',
        description: 'Minimalist design with comfortable seating and elegant legs',
        price: 449.99,
        category_id: categoryMap['Chairs'],
        image_url: 'https://images.unsplash.com/photo-1592078615290-033ee584e267?w=500&h=500&fit=crop',
        stock_quantity: 1,
      },
      {
        name: 'Marble Dining Table',
        description: 'Contemporary marble table with stainless steel base, seats 6',
        price: 1899.99,
        category_id: categoryMap['Tables'],
        image_url: 'https://images.unsplash.com/photo-1538439907460-ebc6f91d5725?w=500&h=500&fit=crop',
        stock_quantity: 1,
      },
      {
        name: 'Platform Bed Frame',
        description: 'Sturdy platform bed with integrated storage drawers',
        price: 899.99,
        category_id: categoryMap['Beds'],
        image_url: 'https://images.unsplash.com/photo-1505693314967-acfd40532aad?w=500&h=500&fit=crop',
        stock_quantity: 1,
      },
      {
        name: 'Wall Shelving Unit',
        description: 'Modular shelving system with adjustable shelves',
        price: 599.99,
        category_id: categoryMap['Storage'],
        image_url: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=500&h=500&fit=crop',
        stock_quantity: 1,
      },
      {
        name: 'Ergonomic Office Chair',
        description: 'Premium office chair with lumbar support and mesh backing',
        price: 799.99,
        category_id: categoryMap['Chairs'],
        image_url: 'https://images.unsplash.com/photo-1592078615290-033ee584e267?w=500&h=500&fit=crop',
        stock_quantity: 1,
      },
      {
        name: 'Mid-Century Coffee Table',
        description: 'Classic mid-century design with walnut wood top',
        price: 399.99,
        category_id: categoryMap['Tables'],
        image_url: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=500&h=500&fit=crop',
        stock_quantity: 1,
      },
      {
        name: 'Luxury Bed Headboard',
        description: 'Upholstered headboard with integrated lighting',
        price: 1299.99,
        category_id: categoryMap['Beds'],
        image_url: 'https://images.unsplash.com/photo-1505693314967-acfd40532aad?w=500&h=500&fit=crop',
        stock_quantity: 1,
      },
      {
        name: 'Sectional Modular Sofa',
        description: 'Customizable sectional with interchangeable pieces',
        price: 3299.99,
        category_id: categoryMap['Sofas'],
        image_url: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=500&h=500&fit=crop',
        stock_quantity: 1,
      },
    ]

    const { data: productData, error: productError } = await supabase
      .from('products')
      .insert(products)
      .select()

    if (productError) {
      return Response.json({ error: `Product creation failed: ${productError.message}` }, { status: 400 })
    }

    return Response.json({
      message: 'Database seeded successfully',
      categories: categoryData?.length || 0,
      products: productData?.length || 0,
    })
  } catch (error) {
    console.error('Seeding error:', error)
    return Response.json({ error: error instanceof Error ? error.message : 'Failed to seed database' }, { status: 500 })
  }
}
