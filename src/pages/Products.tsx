import { useState, useMemo } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { ArrowLeft, Filter, X, ShoppingBag } from 'lucide-react';
import { categories } from '@/data/products';
import { toast } from 'sonner';
import { useQuery } from "convex/react";
import { api } from "../../convex/_generated/api";
import { useCart } from '@/context/CartContext';

export function Products() {
  const [searchParams, setSearchParams] = useSearchParams();
  const { addToCart } = useCart();
  const [selectedCategory, setSelectedCategory] = useState<string | null>(
    searchParams.get('category')
  );
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 100000]);

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

  const handleAddToCart = (product: any) => {
    addToCart(product);
    toast.success(`${product.name} added to cart!`);
  };

  return (
    <div className="min-h-screen bg-background pt-20 pb-16">
      {/* Header */}
      <div className="px-4 sm:px-6 lg:px-[6vw] mb-6">
        <div className="flex items-center gap-4 mb-4">
          <Link
            to="/"
            className="flex items-center gap-2 text-foreground/60 hover:text-gold transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span className="text-sm">Back to home</span>
          </Link>
        </div>

        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div>
            <h1 className="font-serif text-3xl sm:text-4xl text-foreground mb-1">
              Our Collection
            </h1>
            <p className="text-foreground/60 text-sm">
              {filteredProducts.length} products
              {selectedCategory && (
                <span> in {categories.find(c => c.id === selectedCategory)?.name}</span>
              )}
            </p>
          </div>

          <button
            onClick={() => setIsFilterOpen(!isFilterOpen)}
            className="flex items-center gap-2 text-foreground/80 hover:text-gold transition-colors lg:hidden"
          >
            <Filter className="w-4 h-4" />
            Filters
          </button>
        </div>
      </div>

      <div className="px-4 sm:px-6 lg:px-[6vw] flex flex-col lg:flex-row gap-6 lg:gap-8">
        {/* Sidebar Filters */}
        <aside
          className={`${isFilterOpen ? 'fixed inset-0 z-50 bg-background p-4 sm:p-6' : 'hidden'
            } lg:block lg:static lg:w-56 xl:w-64 lg:p-0 lg:bg-transparent flex-shrink-0`}
        >
          <div className="flex items-center justify-between mb-6 lg:hidden">
            <h2 className="font-serif text-xl text-foreground">Filters</h2>
            <button
              onClick={() => setIsFilterOpen(false)}
              className="text-foreground/60 hover:text-foreground p-2"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Categories */}
          <div className="mb-8">
            <h3 className="font-mono text-xs uppercase tracking-[0.12em] text-foreground/60 mb-3">
              Categories
            </h3>
            <div className="space-y-1">
              <button
                onClick={() => handleCategoryChange(null)}
                className={`block w-full text-left px-3 py-2 rounded-lg transition-colors text-sm ${!selectedCategory
                  ? 'bg-gold/20 text-gold'
                  : 'text-foreground/70 hover:text-foreground hover:bg-white/5'
                  }`}
              >
                All Products
                <span className="ml-2 text-foreground/40">({productsList.length})</span>
              </button>
              {categories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => handleCategoryChange(category.id)}
                  className={`block w-full text-left px-3 py-2 rounded-lg transition-colors text-sm ${selectedCategory === category.id
                    ? 'bg-gold/20 text-gold'
                    : 'text-foreground/70 hover:text-foreground hover:bg-white/5'
                    }`}
                >
                  {category.name}
                  <span className="ml-2 text-foreground/40">({categoryCounts[category.id.toLowerCase()] || 0})</span>
                </button>
              ))}
            </div>
          </div>

          {/* Price Range */}
          <div className="mb-8">
            <h3 className="font-mono text-xs uppercase tracking-[0.12em] text-foreground/60 mb-3">
              Price Range
            </h3>
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <span className="text-foreground/60 text-sm">₹</span>
                <input
                  type="number"
                  value={priceRange[0]}
                  onChange={(e) => setPriceRange([Number(e.target.value), priceRange[1]])}
                  className="w-20 bg-white/5 border border-cream/10 rounded px-2 py-1.5 text-foreground text-sm"
                  placeholder="Min"
                />
                <span className="text-foreground/40">-</span>
                <input
                  type="number"
                  value={priceRange[1]}
                  onChange={(e) => setPriceRange([priceRange[0], Number(e.target.value)])}
                  className="w-20 bg-white/5 border border-cream/10 rounded px-2 py-1.5 text-foreground text-sm"
                  placeholder="Max"
                />
              </div>
            </div>
          </div>

          {/* Mobile Apply Button */}
          <button
            onClick={() => setIsFilterOpen(false)}
            className="w-full btn-primary lg:hidden"
          >
            Apply Filters
          </button>
        </aside>

        {/* Product Grid */}
        <div className="flex-1">
          {filteredProducts.length === 0 ? (
            <div className="text-center py-16">
              <ShoppingBag className="w-10 h-10 text-foreground/20 mx-auto mb-3" />
              <p className="text-foreground/60">No products found</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4 sm:gap-6">
              {!convexProducts ? (
                Array.from({ length: 6 }).map((_, i) => (
                  <div key={i} className="bg-white/5 rounded-[10px] aspect-[4/3] animate-pulse" />
                ))
              ) : filteredProducts.map((product) => (
                <div
                  key={product._id}
                  className="group bg-white/5 rounded-[10px] overflow-hidden hover:bg-white/10 transition-colors"
                >
                  <div className="aspect-[4/3] overflow-hidden">
                    <img
                      src={product.imageUrl || "/featured_sofa_closeup.jpg"}
                      alt={product.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                  <div className="p-4 sm:p-5">
                    <span className="text-foreground/40 text-xs uppercase tracking-wide">
                      {product.category}
                    </span>
                    <h3 className="font-serif text-lg sm:text-xl text-foreground mt-1 mb-1">
                      {product.name}
                    </h3>
                    <p className="text-foreground/60 text-sm mb-3 line-clamp-2">
                      {product.description}
                    </p>
                    <div className="flex items-center justify-between">
                      <span className="font-mono text-gold text-sm">
                        ₹ {product.price.toLocaleString()}
                      </span>
                      <button
                        onClick={() => handleAddToCart(product)}
                        className="btn-primary py-2 px-4 text-xs flex items-center gap-2"
                      >
                        <ShoppingBag className="w-3.5 h-3.5" />
                        Add to Cart
                      </button>
                    </div>
                    {product.finishes && (
                      <div className="mt-3 pt-3 border-t border-cream/10">
                        <span className="text-foreground/40 text-xs">
                          {product.finishes.length} finishes available
                        </span>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
