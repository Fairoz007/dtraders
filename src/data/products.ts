import type { Product, Category } from '@/types';

export const products: Product[] = [
  {
    id: '1',
    name: 'The Signature Sofa',
    code: 'SF-001',
    category: 'sofas',
    price: 42000,
    description: 'A deep-seat silhouette in performance linen, built for everyday luxury.',
    image: '/featured_sofa_closeup.jpg',
    featured: true,
    finishes: ['Linen Beige', 'Charcoal Grey', 'Warm Taupe', 'Midnight Blue']
  },
  {
    id: '2',
    name: 'Modern Comfort Sofa',
    code: 'SF-002',
    category: 'sofas',
    price: 38500,
    description: 'Deep cushions, crisp upholstery, and a frame engineered for daily comfort.',
    image: '/spotlight_sofa_card.jpg',
    featured: false,
    finishes: ['Cream', 'Stone Grey', 'Sage Green']
  },
  {
    id: '3',
    name: 'Designer Platform Bed',
    code: 'BD-001',
    category: 'beds',
    price: 55000,
    description: 'A quiet statement in the bedroom—solid wood, soft upholstery, and refined proportions.',
    image: '/spotlight_bed_card.jpg',
    featured: true,
    finishes: ['Oak', 'Walnut', 'Upholstered Beige']
  },
  {
    id: '4',
    name: 'Accent Lounge Chair',
    code: 'CH-001',
    category: 'chairs',
    price: 18000,
    description: 'Sculptural support for reading, working, or simply pausing.',
    image: '/spotlight_chair_card.jpg',
    featured: true,
    finishes: ['Boucle Cream', 'Leather Tan', 'Velvet Moss']
  },
  {
    id: '5',
    name: 'Premium Sleep Mattress',
    code: 'MT-001',
    category: 'mattresses',
    price: 22000,
    description: 'Supportive layers, breathable covers, and sizes for every room.',
    image: '/mattress_card.jpg',
    featured: false,
    finishes: ['Standard', 'Premium Pillow Top']
  },
  {
    id: '6',
    name: 'Modular Sectional',
    code: 'SX-001',
    category: 'sectionals',
    price: 68000,
    description: 'Configurable comfort for modern living spaces.',
    image: '/category_sectional.jpg',
    featured: false,
    finishes: ['Linen Natural', 'Performance Grey']
  },
  {
    id: '7',
    name: 'Oak Dining Table',
    code: 'TB-001',
    category: 'tables',
    price: 35000,
    description: 'Solid oak craftsmanship for memorable gatherings.',
    image: '/category_table.jpg',
    featured: false,
    finishes: ['Natural Oak', 'Smoked Oak', 'Black Oak']
  },
  {
    id: '8',
    name: 'Upholstered Bed Frame',
    code: 'BD-002',
    category: 'beds',
    price: 48000,
    description: 'Soft, padded elegance for restful nights.',
    image: '/category_bed_card.jpg',
    featured: false,
    finishes: ['Ivory', 'Dove Grey', 'Blush Pink']
  },
  {
    id: '9',
    name: 'Dining Chair Set',
    code: 'CH-002',
    category: 'chairs',
    price: 24000,
    description: 'Elegant seating for your dining experience.',
    image: '/category_chair.jpg',
    featured: false,
    finishes: ['Natural Wood', 'Black Ash', 'White Oak']
  },
  {
    id: '10',
    name: 'Cloud Sectional',
    code: 'SX-002',
    category: 'sectionals',
    price: 75000,
    description: 'Sink-in comfort with modular flexibility.',
    image: '/category_sofa.jpg',
    featured: false,
    finishes: ['Snow White', 'Sand Beige', 'Slate Grey']
  }
];

export const categories: Category[] = [
  {
    id: 'beds',
    name: 'Beds',
    image: '/category_bed_card.jpg',
    count: 12
  },
  {
    id: 'chairs',
    name: 'Chairs',
    image: '/category_chair.jpg',
    count: 18
  },
  {
    id: 'mattresses',
    name: 'Mattresses',
    image: '/mattress_card.jpg',
    count: 8
  },
  {
    id: 'sectionals',
    name: 'Sectionals',
    image: '/category_sectional.jpg',
    count: 6
  },
  {
    id: 'sofas',
    name: 'Sofas',
    image: '/category_sofa.jpg',
    count: 14
  },
  {
    id: 'tables',
    name: 'Tables',
    image: '/category_table.jpg',
    count: 10
  }
];

export const featuredProducts = products.filter(p => p.featured);

export const getProductsByCategory = (categoryId: string): Product[] => {
  return products.filter(p => p.category === categoryId);
};

export const getProductById = (id: string): Product | undefined => {
  return products.find(p => p.id === id);
};
