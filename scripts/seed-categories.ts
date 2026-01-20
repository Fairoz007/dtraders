import { createClient } from '@supabase/supabase-js'
import * as dotenv from 'dotenv'
import path from 'path'

// Load environment variables from .env file
dotenv.config({ path: path.resolve(process.cwd(), '.env') })

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY

if (!supabaseUrl || !supabaseKey) {
  console.error('Missing environment variables: NEXT_PUBLIC_SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY')
  process.exit(1)
}

const supabase = createClient(supabaseUrl, supabaseKey)

const categories = [
  { name: 'Sofas', description: 'Luxurious and comfortable sofas for your living room' },
  { name: 'Chairs', description: 'Elegant chairs for every occasion' },
  { name: 'Tables', description: 'Exquisite dining and coffee tables' },
  { name: 'Beds', description: 'Premium beds for a restful sleep' },
  { name: 'Storage', description: 'Stylish storage solutions for your home' },
]

async function seedCategories() {
  console.log('Seeding categories...')

  for (const category of categories) {
    const { data, error } = await supabase
      .from('categories')
      .upsert(category, { onConflict: 'name' })
      .select()

    if (error) {
      console.error(`Error seeding category ${category.name}:`, error.message)
    } else {
      console.log(`Successfully seeded category: ${category.name}`)
    }
  }

  console.log('Seeding completed.')
}

seedCategories()
