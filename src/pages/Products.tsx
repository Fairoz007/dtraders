import { useState, useMemo } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { Filter, X } from 'lucide-react';
import { categories } from '@/data/products';
import { useQuery } from "convex/react";
import { api } from "../../convex/_generated/api";
import { motion } from 'framer-motion';

export function Products() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [selectedCategory, setSelectedCategory] = useState<string | null>(
    searchParams.get('category')
  );
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 500000]);

  const convexProducts = useQuery(api.products.list, { onlyActive: true });
  const productsList = convexProducts || [];

  const filteredProducts = useMemo(() => {
    return productsList.filter((product) => {
      const matchesCategory = !selectedCategory || product.category === selectedCategory;
      const matchesPrice = product.price >= priceRange[0] && product.price <= priceRange[1];
      return matchesCategory && matchesPrice;
    });
  }, [productsList, selectedCategory, priceRange]);

  const categoryCounts = useMemo(() => {
    const counts: Record<string, number> = {};
    productsList.forEach((product) => {
      const cat = product.category;
      counts[cat] = (counts[cat] || 0) + 1;
    });
    return counts;
  }, [productsList]);

  const handleCategoryChange = (categoryId: string | null) => {
    setSelectedCategory(categoryId);
    if (categoryId) {
      setSearchParams({ category: categoryId });
    } else {
      setSearchParams({});
    }
  };

  const handleWhatsAppBuy = (product: any, e: React.MouseEvent) => {
    e.preventDefault();
    const message = `Hello, I would like to buy: ${product.name} (Price: ₹${product.price.toLocaleString()}). Could you provide more details?`;
    window.open(`https://wa.me/918086674502?text=${encodeURIComponent(message)}`, '_blank');
  };

  return (
    <div className="min-h-screen bg-section pt-32 pb-24">
      {/* Header */}
      <div className="container-content mb-16">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="flex flex-col md:flex-row md:items-end justify-between gap-8"
        >
          <div>
            <span className="text-accent text-small uppercase tracking-[0.2em] mb-4 block">The Collection</span>
            <h1 className="font-serif text-h1 text-text mb-2">
              {selectedCategory ? categories.find(c => c.id === selectedCategory)?.name : 'All Products'}
            </h1>
            <p className="text-gray-500 text-body">
              {filteredProducts.length} curated {filteredProducts.length === 1 ? 'piece' : 'pieces'}
            </p>
          </div>

          <button
            onClick={() => setIsFilterOpen(!isFilterOpen)}
            className="flex items-center gap-3 text-small uppercase tracking-widest text-text hover:text-accent transition-colors lg:hidden self-start"
          >
            <Filter className="w-4 h-4 stroke-[1.5]" />
            Filters
          </button>
        </motion.div>
      </div>

      <div className="container-content flex flex-col lg:flex-row gap-12 lg:gap-16">
        {/* Sidebar Filters */}
        <aside
          className={`${
            isFilterOpen ? 'fixed inset-0 z-50 bg-white p-8 overflow-y-auto' : 'hidden'
          } lg:block lg:static lg:w-64 lg:p-0 lg:bg-transparent flex-shrink-0`}
        >
          <div className="flex items-center justify-between mb-10 lg:hidden">
            <h2 className="font-serif text-h3 text-primary">Filters</h2>
            <button
              onClick={() => setIsFilterOpen(false)}
              className="text-gray-400 hover:text-primary transition-colors"
            >
              <X className="w-6 h-6 stroke-[1.5]" />
            </button>
          </div>

          <div className="sticky top-32 space-y-12">
            {/* Categories */}
            <div>
              <h3 className="text-small tracking-[0.2em] uppercase text-gray-400 mb-6">
                Category
              </h3>
              <div className="space-y-4">
                <button
                  onClick={() => handleCategoryChange(null)}
                  className={`block w-full text-left text-body transition-colors ${
                    !selectedCategory ? 'text-primary font-medium' : 'text-gray-500 hover:text-primary'
                  }`}
                >
                  All Products <span className="text-gray-400 text-small ml-1">({productsList.length})</span>
                </button>
                {categories.map((category) => (
                  <button
                    key={category.id}
                    onClick={() => handleCategoryChange(category.id)}
                    className={`block w-full text-left text-body transition-colors ${
                      selectedCategory === category.id ? 'text-primary font-medium' : 'text-gray-500 hover:text-primary'
                    }`}
                  >
                    {category.name} <span className="text-gray-400 text-small ml-1">({categoryCounts[category.id.toLowerCase()] || 0})</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Price Range */}
            <div>
              <h3 className="text-small tracking-[0.2em] uppercase text-gray-400 mb-6">
                Price Range
              </h3>
              <div className="flex items-center gap-4">
                <input
                  type="number"
                  value={priceRange[0]}
                  onChange={(e) => setPriceRange([Number(e.target.value), priceRange[1]])}
                  className="w-full bg-white border border-gray-200 rounded-none px-4 py-3 text-body focus:outline-none focus:border-primary transition-colors"
                  placeholder="Min"
                />
                <span className="text-gray-400">-</span>
                <input
                  type="number"
                  value={priceRange[1]}
                  onChange={(e) => setPriceRange([priceRange[0], Number(e.target.value)])}
                  className="w-full bg-white border border-gray-200 rounded-none px-4 py-3 text-body focus:outline-none focus:border-primary transition-colors"
                  placeholder="Max"
                />
              </div>
            </div>

            <button
              onClick={() => setIsFilterOpen(false)}
              className="w-full btn-primary lg:hidden"
            >
              Apply Filters
            </button>
          </div>
        </aside>

        {/* Product Grid */}
        <div className="flex-1">
          {filteredProducts.length === 0 ? (
            <div className="text-center py-32 bg-white">
              <span className="text-small tracking-[0.2em] uppercase text-gray-400 block mb-4">No results</span>
              <p className="text-body text-gray-500">We couldn't find any pieces matching your criteria.</p>
              <button onClick={() => { handleCategoryChange(null); setPriceRange([0, 500000]); }} className="mt-8 text-primary underline underline-offset-4 tracking-widest uppercase text-small hover:text-accent transition-colors">
                Clear Filters
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-8 gap-y-16">
              {!convexProducts ? (
                Array.from({ length: 6 }).map((_, i) => (
                  <div key={i} className="animate-pulse">
                    <div className="bg-gray-200 aspect-[4/5] mb-6" />
                    <div className="h-6 bg-gray-200 w-3/4 mb-2" />
                    <div className="h-4 bg-gray-200 w-1/4" />
                  </div>
                ))
              ) : filteredProducts.map((product, index) => (
                <motion.div
                  key={product._id}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="group cursor-pointer"
                >
                  <Link to={`/products/${product._id}`} className="block">
                    <div className="aspect-[4/5] overflow-hidden bg-gray-100 mb-6 relative">
                      <img
                        src={product.imageUrl || "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?q=80&w=1000&auto=format&fit=crop"}
                        alt={product.name}
                        className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-black/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                      
                      {/* Quick Add Button overlay */}
                      <button 
                        onClick={(e) => handleWhatsAppBuy(product, e)}
                        className="absolute bottom-0 left-0 w-full bg-[#25D366] text-white py-4 translate-y-full opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300 flex justify-center items-center gap-2 uppercase tracking-widest text-small font-medium hover:bg-[#128C7E]"
                      >
                        Buy via WhatsApp
                      </button>
                    </div>
                    <div className="px-2">
                      <div className="flex justify-between items-start mb-2">
                        <h3 className="font-serif text-h3 text-primary group-hover:text-accent transition-colors">
                          {product.name}
                        </h3>
                        <span className="text-body text-primary whitespace-nowrap ml-4 mt-1">
                          ₹{product.price.toLocaleString()}
                        </span>
                      </div>
                      <span className="text-gray-400 text-small uppercase tracking-widest block mb-3">
                        {product.category}
                      </span>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
