import { createServerClient } from '@supabase/ssr'
import { NextRequest, NextResponse } from 'next/server'

/**
 * Product management endpoints
 * POST /api/products - Create a new product
 * PUT /api/products - Update a product
 */

export async function POST(request: NextRequest) {
  try {
    const supabase = createServerClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL || '',
      process.env.SUPABASE_SERVICE_ROLE_KEY || '',
      {
        cookies: {
          getAll() { return [] },
          setAll() {},
        },
      }
    )

    const body = await request.json()
    
    const {
      name,
      description,
      price,
      category_id,
      image_url,
      in_stock,
    } = body

    // Validate required fields
    if (!name || !description || price === undefined || price === null || !category_id) {
      return NextResponse.json(
        { error: 'Missing required fields: name, description, price, category_id' },
        { status: 400 }
      )
    }

    // Insert product
    const { data, error } = await supabase
      .from('products')
      .insert([
        {
          name,
          description,
          price: parseFloat(price),
          category_id,
          image_url: image_url || null,
          stock_quantity: in_stock ? 1 : 0,
        },
      ])
      .select()

    if (error) {
      console.error('Product creation error:', error)
      return NextResponse.json(
        { error: `Failed to create product: ${error.message}` },
        { status: 400 }
      )
    }

    return NextResponse.json({
      success: true,
      message: 'Product created successfully',
      product: data[0],
    })
  } catch (error) {
    console.error('Product endpoint error:', error)
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    )
  }
}

export async function PUT(request: NextRequest) {
  try {
    const supabase = createServerClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL || '',
      process.env.SUPABASE_SERVICE_ROLE_KEY || '',
      {
        cookies: {
          getAll() { return [] },
          setAll() {},
        },
      }
    )

    const body = await request.json()
    
    const {
      id,
      name,
      description,
      price,
      category_id,
      image_url,
      in_stock,
    } = body

    // Validate required fields
    if (!id) {
      return NextResponse.json(
        { error: 'Product ID is required' },
        { status: 400 }
      )
    }

    // Update product
    const { data, error } = await supabase
      .from('products')
      .update({
        ...(name && { name }),
        ...(description && { description }),
        ...(price && { price: parseFloat(price) }),
        ...(category_id && { category_id }),
        ...(image_url !== undefined && { image_url: image_url || null }),
        ...(in_stock !== undefined && { stock_quantity: in_stock ? 1 : 0 }),
        updated_at: new Date().toISOString(),
      })
      .eq('id', id)
      .select()

    if (error) {
      console.error('Product update error:', error)
      return NextResponse.json(
        { error: `Failed to update product: ${error.message}` },
        { status: 400 }
      )
    }

    if (!data || data.length === 0) {
      return NextResponse.json(
        { error: 'Product not found' },
        { status: 404 }
      )
    }

    return NextResponse.json({
      success: true,
      message: 'Product updated successfully',
      product: data[0],
    })
  } catch (error) {
    console.error('Product endpoint error:', error)
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    )
  }
}
