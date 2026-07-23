import { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Menu, X, Search, User, MapPin } from 'lucide-react';

const navLinks = [
  { label: 'Featured', href: '/#featured' },
  { label: 'Shop', href: '/products' },
  { label: 'Contact', href: '/contact' },
];

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40); // 40px is approx the height of the top bar
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

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
      <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? '-translate-y-[40px]' : 'translate-y-0'}`}>
        
        {/* Top Announcement Bar */}
        <div className="bg-primary text-white h-[40px] px-6 lg:px-12 flex items-center justify-between text-xs tracking-wide">
          <div className="hidden sm:block opacity-0">Spacer</div> {/* for centering */}
          <div className="flex-1 text-center text-white/80">
            Premium Furniture & Mattresses &nbsp;&bull;&nbsp; Designed for Modern Living &nbsp;&bull;&nbsp; Delivered Across India
          </div>
          <div className="flex items-center gap-2 text-white/80 hidden sm:flex">
            <MapPin className="w-3.5 h-3.5" />
            Kerala, India
          </div>
        </div>

        {/* Main Navigation */}
        <nav className={`bg-offwhite border-b border-gray-200/50 transition-all duration-300 ${isScrolled ? 'shadow-sm py-4' : 'py-6'}`}>
          <div className="px-6 lg:px-12 w-full flex items-center justify-between">
            
            {/* Logo */}
            <Link to="/" className="flex items-center gap-2 group z-50">
              <span className="font-serif text-2xl tracking-widest text-primary flex items-center">
                <span className="text-accent text-3xl font-medium mr-1.5">D</span> TRADERS
              </span>
            </Link>

            {/* Desktop Navigation - Center */}
            <div className="hidden lg:flex items-center gap-8 xl:gap-10 absolute left-1/2 -translate-x-1/2">
              {navLinks.map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  onClick={(e) => handleNavClick(e, item.href)}
                  className="text-sm font-medium text-primary/80 hover:text-primary transition-colors duration-300"
                >
                  {item.label}
                </a>
              ))}
            </div>

            {/* Desktop Navigation - Right Icons */}
            <div className="flex items-center gap-6 z-50">
              {/* Mobile Menu Button */}
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="lg:hidden p-2 -ml-2 text-primary"
                aria-label="Toggle menu"
              >
                {isMobileMenuOpen ? <X className="w-5 h-5 stroke-[1.5]" /> : <Menu className="w-5 h-5 stroke-[1.5]" />}
              </button>

              <button className="text-primary hover:text-accent transition-colors hidden sm:block">
                <Search className="w-5 h-5 stroke-[1.5]" />
              </button>
              
              {/* Added /admin link to User icon */}
              <Link to="/admin" className="text-primary hover:text-accent transition-colors hidden sm:block">
                <User className="w-5 h-5 stroke-[1.5]" />
              </Link>

            </div>
          </div>
        </nav>
      </header>

      {/* spacer to prevent content from hiding behind fixed header */}
      <div className="h-[100px]" />

      {/* Mobile Menu Overlay */}
      <div
        className={`fixed inset-0 z-40 bg-offwhite transition-all duration-300 lg:hidden ${
          isMobileMenuOpen
            ? 'opacity-100 pointer-events-auto'
            : 'opacity-0 pointer-events-none'
        }`}
      >
        <div className="flex flex-col h-full pt-32 px-8 overflow-y-auto pb-12">
          {navLinks.map((item) => (
            <a
              key={item.label}
              href={item.href}
              onClick={(e) => handleNavClick(e, item.href)}
              className="text-2xl font-serif text-primary hover:text-accent transition-colors duration-300 py-4 border-b border-gray-200"
            >
              {item.label}
            </a>
          ))}
          <Link
            to="/admin"
            onClick={() => setIsMobileMenuOpen(false)}
            className="text-2xl font-serif text-primary hover:text-accent transition-colors duration-300 py-4 border-b border-gray-200 flex items-center gap-3"
          >
            Admin Dashboard
          </Link>
        </div>
      </div>

    </>
  );
}
