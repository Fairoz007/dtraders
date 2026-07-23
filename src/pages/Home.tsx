import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight, ArrowLeft, Gem, Armchair, Cloud, Truck, CreditCard, ShieldCheck, RefreshCw, HeadphonesIcon, Mail, Phone, MapPin } from 'lucide-react';

const topTrustItems = [
  { icon: Gem, title: 'Premium Quality', desc: 'Finest materials & exceptional craftsmanship' },
  { icon: Armchair, title: 'Timeless Design', desc: 'Elegant pieces that never go out of style' },
  { icon: Cloud, title: 'Made for Comfort', desc: 'Thoughtful ergonomics for everyday living' },
  { icon: Truck, title: 'Delivered Across India', desc: 'Safe, reliable & on-time delivery' },
];

const bottomTrustItems = [
  { icon: CreditCard, title: '0% EMI Options', desc: 'Easy financing on leading banks' },
  { icon: ShieldCheck, title: 'Secure Payments', desc: '100% safe & encrypted transactions' },
  { icon: RefreshCw, title: 'Easy Returns', desc: 'Hassle-free returns within 7 days' },
  { icon: HeadphonesIcon, title: 'Dedicated Support', desc: "We're here to help you before & after purchase" },
];

const categories = [
  { id: 'living', name: 'Living Room', desc: 'Sofas, Coffee Tables & More', image: 'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?q=80&w=800&auto=format&fit=crop' },
  { id: 'bedroom', name: 'Bedroom', desc: 'Beds, Wardrobes & More', image: 'https://images.unsplash.com/photo-1616594039964-ae9021a400a0?q=80&w=800&auto=format&fit=crop' },
  { id: 'dining', name: 'Dining Room', desc: 'Dining Tables & Chairs', image: '/dining_image.png' },
  { id: 'mattress', name: 'Mattresses', desc: 'Premium Comfort for Better Sleep', image: 'https://images.unsplash.com/photo-1631679706909-1844bbd07221?q=80&w=800&auto=format&fit=crop' },
  { id: 'decor', name: 'Decor & Lighting', desc: 'Decor, Mirrors & Lighting', image: 'https://images.unsplash.com/photo-1507652313519-d4e9174996dd?q=80&w=800&auto=format&fit=crop' },
];

export function Home() {

  return (
    <div className="bg-offwhite min-h-screen">
      
      {/* 1. Padded Hero Section */}
      <section className="px-4 lg:px-6 pt-4 pb-12">
        <div className="relative w-full h-[85vh] overflow-hidden rounded-[4px]">
          <div className="absolute inset-0 w-full h-full">
            <img 
              src="/hero_image.png" 
              alt="Premium Furniture Living Room" 
              className="w-full h-full object-cover object-center"
            />
          </div>
          {/* Strong dark gradient overlay on the left for maximum text visibility */}
          <div className="absolute inset-0 bg-gradient-to-r from-black via-black/70 to-transparent w-full sm:w-3/4" />
          <div className="absolute inset-0 bg-black/20" />
          
          <div className="absolute inset-0 flex flex-col justify-center px-8 lg:px-20 text-white drop-shadow-md">
            <span className="text-[10px] tracking-widest uppercase mb-4 text-white/90 font-medium">Premium Furniture Living Room</span>
            <h1 className="font-serif text-hero mb-4 leading-tight drop-shadow-lg text-white">
              Premium <br /> Furniture
            </h1>
            <h2 className="text-xl lg:text-2xl font-medium mb-4 text-white drop-shadow-md">Curated Living</h2>
            <p className="text-sm lg:text-base text-white/90 max-w-sm mb-10 leading-relaxed font-medium">
              Timeless design, modern comfort—<br /> delivered across India.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 items-start">
              <Link to="/products" className="bg-white text-primary px-6 py-3.5 text-sm font-medium flex items-center gap-3 hover:bg-gray-100 transition-colors">
                Explore Collection <ArrowRight className="w-4 h-4" />
              </Link>
              <Link to="/showrooms" className="border border-white/30 bg-black/20 backdrop-blur-sm text-white px-6 py-3.5 text-sm font-medium hover:bg-black/40 transition-colors">
                Book a showroom visit
              </Link>
            </div>
          </div>

          {/* Carousel Controls */}
          <div className="absolute bottom-10 left-8 lg:left-20 flex items-center gap-4 text-white/80 text-sm font-mono">
            <span>01</span>
            <div className="w-12 h-[1px] bg-white/40" />
            <span>03</span>
          </div>

          <div className="absolute bottom-10 right-8 lg:right-20 flex items-center gap-3">
            <button className="w-10 h-10 rounded-full bg-black/20 backdrop-blur-sm border border-white/20 flex items-center justify-center text-white hover:bg-black/40 transition-colors">
              <ArrowLeft className="w-4 h-4" />
            </button>
            <button className="w-10 h-10 rounded-full bg-black/20 backdrop-blur-sm border border-white/20 flex items-center justify-center text-white hover:bg-black/40 transition-colors">
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </section>

      {/* 2. Top Trust Section */}
      <section className="border-y border-gray-200 bg-offwhite">
        <div className="container-content py-10">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 divide-y sm:divide-y-0 sm:divide-x divide-gray-200">
            {topTrustItems.map((item, index) => (
              <div key={index} className={`flex items-start gap-4 ${index !== 0 ? 'sm:pl-8 pt-6 sm:pt-0' : ''}`}>
                <item.icon className="w-8 h-8 stroke-[1.2] text-primary flex-shrink-0" />
                <div>
                  <h4 className="font-medium text-sm text-primary mb-1">{item.title}</h4>
                  <p className="text-xs text-text-muted leading-relaxed max-w-[200px]">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 3. Shop by Category */}
      <section className="py-24 bg-[#F8F8F5]">
        <div className="container-content">
          <div className="flex justify-between items-end mb-12">
            <h2 className="font-serif text-h2 text-primary">Shop by Category</h2>
            <div className="flex items-center gap-6">
              <Link to="/products" className="text-sm font-medium hover:text-accent transition-colors hidden sm:block">View all categories</Link>
              <div className="flex items-center gap-2">
                <button className="w-10 h-10 rounded-full border border-gray-300 flex items-center justify-center text-primary hover:bg-white transition-colors">
                  <ArrowLeft className="w-4 h-4" />
                </button>
                <button className="w-10 h-10 rounded-full border border-gray-300 flex items-center justify-center text-primary hover:bg-white transition-colors">
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-5 gap-4">
            {categories.map((cat) => (
              <Link key={cat.id} to={`/products?category=${cat.id}`} className="group bg-offwhite block overflow-hidden rounded-[4px] border border-gray-100 hover:shadow-soft transition-all duration-300">
                <div className="aspect-[4/3] overflow-hidden">
                  <img src={cat.image} alt="" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                </div>
                <div className="p-5 flex flex-col h-full relative">
                  <h3 className="font-serif text-lg text-primary mb-1">{cat.name}</h3>
                  <p className="text-xs text-text-muted">{cat.desc}</p>
                  <div className="mt-4 flex justify-end">
                    <ArrowRight className="w-4 h-4 text-gray-400 group-hover:text-primary transition-colors" />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* 4. Contact / Inquiry Section */}
      <section className="bg-offwhite py-16">
        <div className="container-content">
          <div className="flex flex-col lg:flex-row shadow-soft rounded-[4px] overflow-hidden">
            
            {/* Left Dark Side */}
            <div className="w-full lg:w-5/12 bg-[#1A1A1A] relative p-12 lg:p-16 text-white flex flex-col justify-center overflow-hidden">
              <div className="absolute inset-0 opacity-40 mix-blend-overlay pointer-events-none">
                <img src="https://images.unsplash.com/photo-1555041469-a586c61ea9bc?q=80&w=1200&auto=format&fit=crop" alt="Background Texture" className="w-full h-full object-cover" />
              </div>
              <div className="relative z-10">
                <span className="text-sm text-white/80 mb-4 block">Get in touch</span>
                <h2 className="font-serif text-3xl lg:text-4xl leading-tight mb-4 text-white">
                  Tell us what you are <br /> looking for.
                </h2>
                <p className="text-sm text-white/70 mb-12 max-w-xs leading-relaxed">
                  We will reply with options, timelines, and a clear quote.
                </p>

                <div className="space-y-6">
                  <div className="flex items-center gap-4">
                    <Mail className="w-5 h-5 text-white/80" strokeWidth={1.5} />
                    <span className="text-sm">hello@dtraders.in</span>
                  </div>
                  <a href="https://wa.me/918086674502?text=Hello,%20I%20would%20like%20to%20inquire%20about%20a%20product%20from%20your%20website." target="_blank" rel="noopener noreferrer" className="flex items-center gap-4 hover:text-accent transition-colors">
                    <div className="w-5 h-5 rounded-full border border-white/80 flex items-center justify-center">
                      <Phone className="w-2.5 h-2.5 text-white/80" strokeWidth={2} />
                    </div>
                    <span className="text-sm text-white/80">WhatsApp Chat</span>
                  </a>
                  <div className="flex items-center gap-4">
                    <Phone className="w-5 h-5 text-white/80" strokeWidth={1.5} />
                    <span className="text-sm">+91 8086674502</span>
                  </div>
                  <div className="flex items-center gap-4">
                    <MapPin className="w-5 h-5 text-white/80" strokeWidth={1.5} />
                    <span className="text-sm">Kerala • India</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Light Side (Form) */}
            <div className="w-full lg:w-7/12 bg-offwhite p-12 lg:p-16 border border-gray-200 lg:border-l-0">
              <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-xs font-medium text-primary mb-2">Name</label>
                    <input type="text" placeholder="Your name" className="w-full bg-transparent border border-gray-200 rounded px-4 py-3 text-sm focus:outline-none focus:border-accent transition-colors" />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-primary mb-2">Email</label>
                    <input type="email" placeholder="your@email.com" className="w-full bg-transparent border border-gray-200 rounded px-4 py-3 text-sm focus:outline-none focus:border-accent transition-colors" />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-primary mb-2">Phone</label>
                    <input type="tel" placeholder="+91 00000 00000" className="w-full bg-transparent border border-gray-200 rounded px-4 py-3 text-sm focus:outline-none focus:border-accent transition-colors" />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-primary mb-2">City</label>
                    <input type="text" placeholder="Your city" className="w-full bg-transparent border border-gray-200 rounded px-4 py-3 text-sm focus:outline-none focus:border-accent transition-colors" />
                  </div>
                </div>
                <div>
                  <label className="block text-xs font-medium text-primary mb-2">Message</label>
                  <textarea rows={4} placeholder="Tell us what you are looking for..." className="w-full bg-transparent border border-gray-200 rounded px-4 py-3 text-sm focus:outline-none focus:border-accent transition-colors resize-none" />
                </div>
                <button type="submit" className="w-full bg-primary text-white py-4 rounded text-sm font-medium hover:bg-black transition-colors flex items-center justify-center gap-2 mt-4">
                  Send Inquiry <ArrowRight className="w-4 h-4" />
                </button>
              </form>
            </div>

          </div>
        </div>
      </section>



    </div>
  );
}
