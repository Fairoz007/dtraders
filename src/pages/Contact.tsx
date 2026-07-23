import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

export function Contact() {
  return (
    <div className="min-h-screen bg-white">
      <div className="flex flex-col lg:flex-row min-h-screen">
        
        {/* Left Side: Image */}
        <div className="w-full lg:w-1/2 h-[50vh] lg:h-screen relative">
          <img 
            src="https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?q=80&w=2000&auto=format&fit=crop" 
            alt="Contact Us" 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/10" />
        </div>

        {/* Right Side: Form */}
        <div className="w-full lg:w-1/2 pt-24 pb-24 lg:pt-32 px-8 lg:px-24 flex flex-col justify-center">
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <span className="text-accent text-small uppercase tracking-[0.2em] mb-4 block">Get in Touch</span>
            <h1 className="font-serif text-h2 text-primary mb-12">Contact Us</h1>

            <form className="space-y-10" onSubmit={(e) => e.preventDefault()}>
              <div className="space-y-2 relative border-b border-gray-200 focus-within:border-primary transition-colors">
                <input 
                  type="text" 
                  id="name" 
                  className="w-full py-2 bg-transparent text-body focus:outline-none placeholder:text-gray-400 peer"
                  placeholder="Your Name"
                />
              </div>

              <div className="space-y-2 relative border-b border-gray-200 focus-within:border-primary transition-colors">
                <input 
                  type="email" 
                  id="email" 
                  className="w-full py-2 bg-transparent text-body focus:outline-none placeholder:text-gray-400 peer"
                  placeholder="Email Address"
                />
              </div>

              <div className="space-y-2 relative border-b border-gray-200 focus-within:border-primary transition-colors">
                <input 
                  type="tel" 
                  id="phone" 
                  className="w-full py-2 bg-transparent text-body focus:outline-none placeholder:text-gray-400 peer"
                  placeholder="Phone Number (Optional)"
                />
              </div>

              <div className="space-y-2 relative border-b border-gray-200 focus-within:border-primary transition-colors">
                <textarea 
                  id="message" 
                  rows={4}
                  className="w-full py-2 bg-transparent text-body focus:outline-none placeholder:text-gray-400 peer resize-none"
                  placeholder="How can we help you?"
                />
              </div>

              <button type="submit" className="btn-primary w-full flex justify-center items-center gap-3">
                Send Message <ArrowRight className="w-4 h-4" />
              </button>
            </form>

            <div className="mt-16 pt-16 border-t border-gray-100 grid grid-cols-2 gap-8">
              <div>
                <h3 className="text-small tracking-widest uppercase text-gray-400 mb-2">Email</h3>
                <a href="mailto:info@dtraders.com" className="text-primary hover:text-accent transition-colors">info@dtraders.com</a>
              </div>
              <div>
                <h3 className="text-small tracking-widest uppercase text-gray-400 mb-2">Phone</h3>
                <span className="text-primary">08086674502</span>
              </div>
            </div>
          </motion.div>
        </div>

      </div>
    </div>
  );
}
