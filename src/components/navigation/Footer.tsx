import { Link } from 'react-router-dom';
import { ArrowRight, Instagram, Facebook, Twitter, Youtube } from 'lucide-react';

export function Footer() {
  return (
    <footer className="bg-[#1A1A1A] text-white pt-20 pb-8 mt-auto">
      <div className="px-6 lg:px-12 w-full mx-auto max-w-luxury flex flex-col items-center">
        <div className="flex flex-col items-center text-center mb-16">
          
          {/* Brand Info */}
          <Link to="/" className="inline-block mb-6 group">
            <span className="font-serif text-2xl tracking-widest flex items-center">
              <span className="text-accent text-3xl font-medium mr-1.5">D</span> TRADERS
            </span>
          </Link>
          <div className="text-[#A3A3A3] text-sm space-y-1 mb-8 leading-relaxed">
            <p>Premium Furniture & Mattresses</p>
            <p>Designed for Modern Living</p>
            <p>Delivered Across India</p>
          </div>
          <div className="flex items-center gap-4 text-[#A3A3A3]">
            <a href="#" className="hover:text-white transition-colors"><Instagram className="w-5 h-5" /></a>
            <a href="#" className="hover:text-white transition-colors"><Facebook className="w-5 h-5" /></a>
            <a href="#" className="hover:text-white transition-colors"><Twitter className="w-5 h-5" /></a>
            <a href="#" className="hover:text-white transition-colors"><Youtube className="w-5 h-5" /></a>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="border-t border-[#333333] pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-[#A3A3A3] text-xs">
            &copy; DTRADERS — Premium Furniture & Mattresses. All Rights Reserved.
          </p>
          <div className="flex gap-6 text-[#A3A3A3] text-xs">
            <Link to="/privacy" className="hover:text-white transition-colors">Privacy Policy</Link>
            <span className="text-[#333333]">|</span>
            <Link to="/terms" className="hover:text-white transition-colors">Terms & Conditions</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
