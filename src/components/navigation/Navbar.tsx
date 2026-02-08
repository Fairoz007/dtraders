import { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Menu, X, ShoppingBag } from 'lucide-react';

const navItems = [
  { label: 'Collection', href: '/#featured' },
  { label: 'Categories', href: '/#categories' },
  { label: 'Craft', href: '/#craft' },
  { label: 'Delivery', href: '/#delivery' },
];

const rightNavItems = [
  { label: 'Contact', href: '/#contact' },
];

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location.pathname]);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setIsMobileMenuOpen(false);

    if (href.startsWith('/#')) {
      const targetId = href.replace('/#', '');
      if (location.pathname !== '/') {
        navigate('/');
        setTimeout(() => {
          const element = document.getElementById(targetId);
          if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
          }
        }, 100);
      } else {
        const element = document.getElementById(targetId);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }
    } else {
      navigate(href);
    }
  };

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled
            ? 'bg-dark/95 backdrop-blur-md py-3'
            : 'bg-transparent py-4 lg:py-6'
        }`}
      >
        <div className="w-full px-4 sm:px-6 lg:px-12 flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 group">
            <span className="font-serif text-xl sm:text-2xl lg:text-3xl text-cream font-semibold tracking-tight group-hover:text-gold transition-colors">
              Dtraders
            </span>
          </Link>

          {/* Desktop Navigation - Center */}
          <div className="hidden lg:flex items-center gap-8 xl:gap-10">
            {navItems.map((item) => (
              <a
                key={item.label}
                href={item.href}
                onClick={(e) => handleNavClick(e, item.href)}
                className="text-sm text-cream/80 hover:text-gold transition-colors duration-300 tracking-wide"
              >
                {item.label}
              </a>
            ))}
          </div>

          {/* Desktop Navigation - Right */}
          <div className="hidden lg:flex items-center gap-6 xl:gap-8">
            <Link
              to="/showrooms"
              className="text-sm text-cream/80 hover:text-gold transition-colors duration-300 tracking-wide"
            >
              Showrooms
            </Link>
            {rightNavItems.map((item) => (
              <a
                key={item.label}
                href={item.href}
                onClick={(e) => handleNavClick(e, item.href)}
                className="text-sm text-cream/80 hover:text-gold transition-colors duration-300 tracking-wide"
              >
                {item.label}
              </a>
            ))}
            <Link
              to="/products"
              className="flex items-center gap-2 text-sm text-cream/80 hover:text-gold transition-colors duration-300"
            >
              <ShoppingBag className="w-4 h-4" />
              <span>Shop</span>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="lg:hidden text-cream p-2 -mr-2"
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? (
              <X className="w-5 h-5" />
            ) : (
              <Menu className="w-5 h-5" />
            )}
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      <div
        className={`fixed inset-0 z-40 bg-dark/98 backdrop-blur-lg transition-all duration-300 lg:hidden ${
          isMobileMenuOpen
            ? 'opacity-100 pointer-events-auto'
            : 'opacity-0 pointer-events-none'
        }`}
      >
        <div className="flex flex-col items-center justify-center h-full gap-6 pt-20">
          {[...navItems, ...rightNavItems].map((item) => (
            <a
              key={item.label}
              href={item.href}
              onClick={(e) => handleNavClick(e, item.href)}
              className="text-xl font-serif text-cream hover:text-gold transition-colors duration-300"
            >
              {item.label}
            </a>
          ))}
          <Link
            to="/showrooms"
            onClick={() => setIsMobileMenuOpen(false)}
            className="text-xl font-serif text-cream hover:text-gold transition-colors duration-300"
          >
            Showrooms
          </Link>
          <Link
            to="/products"
            onClick={() => setIsMobileMenuOpen(false)}
            className="text-xl font-serif text-cream hover:text-gold transition-colors duration-300 flex items-center gap-3 mt-4"
          >
            <ShoppingBag className="w-5 h-5" />
            Shop
          </Link>
        </div>
      </div>
    </>
  );
}
