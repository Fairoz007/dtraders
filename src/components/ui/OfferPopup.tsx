import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Tag, Phone, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

export function OfferPopup() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Show popup after 3 seconds
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, x: 300 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: 300 }}
          transition={{ type: 'spring', stiffness: 260, damping: 20 }}
          className="fixed bottom-28 right-6 w-80 bg-white border border-gray-100 shadow-xl z-40 overflow-hidden"
        >
          {/* Header */}
          <div className="bg-[#1A1A1A] text-white px-4 py-3 flex justify-between items-center">
            <div className="flex items-center gap-2">
              <Tag className="w-4 h-4 text-accent" />
              <span className="text-sm font-medium tracking-wide uppercase text-white">Exclusive Offers</span>
            </div>
            <button 
              onClick={() => setIsVisible(false)}
              className="text-white/70 hover:text-white transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
          
          {/* Body */}
          <div className="p-5">
            <h3 className="font-serif text-lg text-primary mb-2">Looking for a deal?</h3>
            <p className="text-sm text-gray-500 mb-6 leading-relaxed">
              Contact us directly on WhatsApp for special discounts and exclusive seasonal offers on premium furniture.
            </p>
            
            <div className="space-y-3">
              <a 
                href="https://wa.me/918086674502?text=Hello,%20I%20would%20like%20to%20know%20more%20about%20your%20current%20offers." 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-full btn-primary flex justify-center items-center gap-2 py-2.5 text-sm bg-[#25D366] hover:bg-[#128C7E] text-white border-none"
              >
                <Phone className="w-4 h-4" /> Contact for Offers
              </a>
              <Link 
                to="/products"
                onClick={() => setIsVisible(false)}
                className="w-full flex justify-center items-center gap-2 py-2.5 text-sm border border-[#1A1A1A] text-[#1A1A1A] hover:bg-[#1A1A1A] hover:text-white transition-colors"
              >
                View More Products <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
