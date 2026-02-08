import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Mail, Phone, MapPin, Send, Instagram, Linkedin, Twitter } from 'lucide-react';
import { toast } from 'sonner';

gsap.registerPlugin(ScrollTrigger);

export function Contact() {
  const sectionRef = useRef<HTMLElement>(null);
  const leftRef = useRef<HTMLDivElement>(null);
  const formRef = useRef<HTMLFormElement>(null);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    city: '',
    message: '',
  });

  useEffect(() => {
    const section = sectionRef.current;
    const left = leftRef.current;
    const form = formRef.current;

    if (!section || !left || !form) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        left.children,
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          stagger: 0.1,
          duration: 0.6,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: section,
            start: 'top 70%',
            toggleActions: 'play none none reverse',
          },
        }
      );

      gsap.fromTo(
        form,
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.6,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: form,
            start: 'top 80%',
            toggleActions: 'play none none reverse',
          },
        }
      );
    }, section);

    return () => ctx.revert();
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const inquiries = JSON.parse(localStorage.getItem('dtraders_inquiries') || '[]');
    inquiries.push({
      ...formData,
      id: Date.now().toString(),
      createdAt: new Date().toISOString(),
    });
    localStorage.setItem('dtraders_inquiries', JSON.stringify(inquiries));

    toast.success('Inquiry sent successfully! We will get back to you soon.');

    setFormData({
      name: '',
      email: '',
      phone: '',
      city: '',
      message: '',
    });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  return (
    <section
      ref={sectionRef}
      id="contact"
      className="relative w-full py-20 lg:py-32 bg-dark"
    >
      <div className="px-6 lg:px-[6vw]">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">
          {/* Left Content */}
          <div ref={leftRef}>
            <span className="font-mono text-xs uppercase tracking-[0.12em] text-cream/70 mb-4 block">
              Contact
            </span>

            <h2 className="font-serif text-3xl sm:text-4xl lg:text-section text-cream mb-6">
              Get in touch
            </h2>

            <p className="text-base lg:text-lg text-cream/70 leading-relaxed mb-10">
              Tell us what you are looking for. We will reply with options, timelines, and a clear quote.
            </p>

            <div className="space-y-4">
              <a
                href="mailto:hello@dtraders.in"
                className="flex items-center gap-3 text-cream/70 hover:text-gold transition-colors"
              >
                <Mail className="w-4 h-4" />
                <span className="font-mono text-sm">hello@dtraders.in</span>
              </a>
              <a
                href="tel:+919800000000"
                className="flex items-center gap-3 text-cream/70 hover:text-gold transition-colors"
              >
                <Phone className="w-4 h-4" />
                <span className="font-mono text-sm">+91 98000 00000</span>
              </a>
              <div className="flex items-center gap-3 text-cream/70">
                <MapPin className="w-4 h-4" />
                <span className="font-mono text-sm">Bangalore • Mumbai • Delhi</span>
              </div>
            </div>
          </div>

          {/* Form */}
          <form
            ref={formRef}
            onSubmit={handleSubmit}
            className="bg-white/5 rounded-[10px] p-6 lg:p-8 space-y-5"
          >
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div>
                <label className="block text-cream/60 text-sm mb-2">Name</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full bg-transparent border-b border-cream/20 text-cream py-2 focus:outline-none focus:border-gold transition-colors text-sm"
                  placeholder="Your name"
                />
              </div>
              <div>
                <label className="block text-cream/60 text-sm mb-2">Email</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full bg-transparent border-b border-cream/20 text-cream py-2 focus:outline-none focus:border-gold transition-colors text-sm"
                  placeholder="your@email.com"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div>
                <label className="block text-cream/60 text-sm mb-2">Phone</label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className="w-full bg-transparent border-b border-cream/20 text-cream py-2 focus:outline-none focus:border-gold transition-colors text-sm"
                  placeholder="+91 00000 00000"
                />
              </div>
              <div>
                <label className="block text-cream/60 text-sm mb-2">City</label>
                <input
                  type="text"
                  name="city"
                  value={formData.city}
                  onChange={handleChange}
                  className="w-full bg-transparent border-b border-cream/20 text-cream py-2 focus:outline-none focus:border-gold transition-colors text-sm"
                  placeholder="Your city"
                />
              </div>
            </div>

            <div>
              <label className="block text-cream/60 text-sm mb-2">Message</label>
              <textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                rows={4}
                className="w-full bg-transparent border-b border-cream/20 text-cream py-2 focus:outline-none focus:border-gold transition-colors resize-none text-sm"
                placeholder="Tell us what you are looking for..."
              />
            </div>

            <button
              type="submit"
              className="btn-primary w-full flex items-center justify-center gap-2 group"
            >
              Send Inquiry
              <Send className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
          </form>
        </div>

        {/* Footer */}
        <div className="mt-16 lg:mt-24 pt-8 border-t border-cream/10 flex flex-col sm:flex-row justify-between items-center gap-6">
          <p className="text-cream/50 text-sm">
            © Dtraders — Premium Furniture & Mattresses
          </p>

          <div className="flex items-center gap-6">
            <a href="#" className="text-cream/50 hover:text-gold transition-colors text-sm">
              Privacy
            </a>
            <a href="#" className="text-cream/50 hover:text-gold transition-colors text-sm">
              Terms
            </a>
            <div className="flex items-center gap-4 ml-4">
              <a href="#" className="text-cream/50 hover:text-gold transition-colors">
                <Instagram className="w-4 h-4" />
              </a>
              <a href="#" className="text-cream/50 hover:text-gold transition-colors">
                <Linkedin className="w-4 h-4" />
              </a>
              <a href="#" className="text-cream/50 hover:text-gold transition-colors">
                <Twitter className="w-4 h-4" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
