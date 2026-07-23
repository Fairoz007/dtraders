import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Truck, ShieldCheck, RefreshCw } from 'lucide-react';
import { useQuery } from "convex/react";
import { api } from "../../convex/_generated/api";
import type { Id } from '../../convex/_generated/dataModel';
export function ProductDetails() {
  const { id } = useParams<{ id: string }>();
  
  // Need to cast the ID to match Convex's generated Id type
  const product = useQuery(api.products.get, { 
    id: id as Id<"products"> 
  });

  if (product === undefined) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="animate-pulse flex flex-col items-center">
          <div className="w-12 h-12 border-t-2 border-primary rounded-full animate-spin mb-4" />
          <span className="text-small tracking-[0.2em] uppercase text-gray-400">Loading</span>
        </div>
      </div>
    );
  }

  if (product === null) {
    return (
      <div className="min-h-screen bg-white pt-32 pb-24 text-center flex flex-col items-center justify-center">
        <span className="text-small tracking-[0.2em] uppercase text-gray-400 mb-4 block">Error</span>
        <h1 className="font-serif text-h2 text-primary mb-6">Product not found.</h1>
        <Link to="/products" className="btn-outline">Return to Collection</Link>
      </div>
    );
  }

  const handleWhatsAppBuy = () => {
    const message = `Hello, I would like to buy: ${product.name} (Price: ₹${product.price.toLocaleString()}). Could you provide more details?`;
    window.open(`https://wa.me/918086674502?text=${encodeURIComponent(message)}`, '_blank');
  };

  return (
    <div className="min-h-screen bg-white pt-32 pb-24">
      <div className="container-content">
        <Link to="/products" className="inline-flex items-center gap-2 text-small uppercase tracking-widest text-gray-400 hover:text-primary transition-colors mb-12">
          <ArrowLeft className="w-4 h-4" /> Back to Collection
        </Link>

        <div className="flex flex-col lg:flex-row gap-16 lg:gap-24">
          {/* Image Gallery */}
          <div className="w-full lg:w-1/2">
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8 }}
              className="aspect-[4/5] bg-section overflow-hidden mb-6 cursor-crosshair"
            >
              <img 
                src={product.imageUrl || "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?q=80&w=2000&auto=format&fit=crop"} 
                alt={product.name} 
                className="w-full h-full object-cover"
              />
            </motion.div>
          </div>

          {/* Product Info */}
          <div className="w-full lg:w-1/2 flex flex-col pt-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <span className="text-small tracking-[0.2em] uppercase text-gray-400 mb-4 block">
                {product.category}
              </span>
              <h1 className="font-serif text-h2 text-primary mb-4 leading-tight">{product.name}</h1>
              <p className="text-h3 text-primary mb-10">₹{product.price.toLocaleString()}</p>
              
              <div className="prose prose-gray max-w-none mb-12">
                <p className="text-body text-gray-500 leading-relaxed">
                  {product.description}
                </p>
              </div>

              {product.finishes && product.finishes.length > 0 && (
                <div className="mb-12">
                  <h3 className="text-small tracking-widest uppercase text-gray-400 mb-4">Available Finishes</h3>
                  <div className="flex gap-4">
                    {product.finishes.map((finish: string, i: number) => (
                      <div key={i} className="px-4 py-2 border border-gray-200 text-small text-primary hover:border-primary cursor-pointer transition-colors">
                        {finish}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              <div className="mb-16">
                <button 
                  onClick={handleWhatsAppBuy}
                  className="w-full btn-primary flex justify-center items-center gap-3 py-5 text-base bg-[#25D366] hover:bg-[#128C7E] text-white"
                >
                  Buy via WhatsApp
                </button>
              </div>

              {/* Accordions / Info */}
              <div className="border-t border-gray-200">
                <div className="py-6 border-b border-gray-200 flex items-start gap-4">
                  <Truck className="w-5 h-5 text-accent flex-shrink-0 mt-0.5" strokeWidth={1.5} />
                  <div>
                    <h4 className="text-small font-medium tracking-widest uppercase text-primary mb-2">Delivery</h4>
                    <p className="text-body text-gray-500">White glove delivery available within 10-14 business days.</p>
                  </div>
                </div>
                <div className="py-6 border-b border-gray-200 flex items-start gap-4">
                  <ShieldCheck className="w-5 h-5 text-accent flex-shrink-0 mt-0.5" strokeWidth={1.5} />
                  <div>
                    <h4 className="text-small font-medium tracking-widest uppercase text-primary mb-2">Warranty</h4>
                    <p className="text-body text-gray-500">Includes a comprehensive 5-year warranty on craftsmanship and materials.</p>
                  </div>
                </div>
                <div className="py-6 border-b border-gray-200 flex items-start gap-4">
                  <RefreshCw className="w-5 h-5 text-accent flex-shrink-0 mt-0.5" strokeWidth={1.5} />
                  <div>
                    <h4 className="text-small font-medium tracking-widest uppercase text-primary mb-2">Returns</h4>
                    <p className="text-body text-gray-500">30-day return policy for unused items in original packaging.</p>
                  </div>
                </div>
              </div>

            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}
