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
      className="relative w-full py-20 lg:py-32 bg-background"
    >
      <div className="px-6 lg:px-[6vw]">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">
          {/* Left Content */}
          <div ref={leftRef}>
            <span className="font-mono text-xs uppercase tracking-[0.12em] text-foreground/70 mb-4 block">
              Contact
            </span>

            <h2 className="font-serif text-3xl sm:text-4xl lg:text-section text-foreground mb-6">
              Get in touch
            </h2>

            <p className="text-base lg:text-lg text-foreground/70 leading-relaxed mb-10">
              Tell us what you are looking for. We will reply with options, timelines, and a clear quote.
            </p>

            <div className="space-y-4">
              <a
                href="mailto:hello@dtraders.in"
                className="flex items-center gap-3 text-foreground/70 hover:text-gold transition-colors"
                aria-label="Email us"
              >
                <Mail className="w-5 h-5" />
                <span className="font-mono text-sm">hello@dtraders.in</span>
              </a>
              <a
                href="https://wa.me/919744271611"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 text-foreground/70 hover:text-gold transition-colors"
                aria-label="Chat on WhatsApp"
              >
                <svg
                  viewBox="0 0 24 24"
                  className="w-5 h-5 fill-current"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
                </svg>
                <span className="font-mono text-sm">WhatsApp Chat</span>
              </a>
              <a
                href="tel:+919800000000"
                className="flex items-center gap-3 text-foreground/70 hover:text-gold transition-colors"
                aria-label="Call us"
              >
                <Phone className="w-5 h-5" />
                <span className="font-mono text-sm">+91 9744271611</span>
              </a>
              <div className="flex items-center gap-3 text-foreground/70">
                <MapPin className="w-5 h-5" />
                <span className="font-mono text-sm">Kerala • India  </span>
              </div>
            </div>
          </div>

          {/* Form */}
          <form
            ref={formRef}
            onSubmit={handleSubmit}
            className="bg-muted rounded-[10px] p-6 lg:p-8 space-y-5 shadow-sm"
          >
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div>
                <label className="block text-foreground/60 text-sm mb-2">Name</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full bg-transparent border-b border-border text-foreground py-2 focus:outline-none focus:border-gold transition-colors text-sm"
                  placeholder="Your name"
                />
              </div>
              <div>
                <label className="block text-foreground/60 text-sm mb-2">Email</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full bg-transparent border-b border-border text-foreground py-2 focus:outline-none focus:border-gold transition-colors text-sm"
                  placeholder="your@email.com"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div>
                <label className="block text-foreground/60 text-sm mb-2">Phone</label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className="w-full bg-transparent border-b border-border text-foreground py-2 focus:outline-none focus:border-gold transition-colors text-sm"
                  placeholder="+91 00000 00000"
                />
              </div>
              <div>
                <label className="block text-foreground/60 text-sm mb-2">City</label>
                <input
                  type="text"
                  name="city"
                  value={formData.city}
                  onChange={handleChange}
                  className="w-full bg-transparent border-b border-border text-foreground py-2 focus:outline-none focus:border-gold transition-colors text-sm"
                  placeholder="Your city"
                />
              </div>
            </div>

            <div>
              <label className="block text-foreground/60 text-sm mb-2">Message</label>
              <textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                rows={4}
                className="w-full bg-transparent border-b border-cream/20 text-foreground py-2 focus:outline-none focus:border-gold transition-colors resize-none text-sm"
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
        <div className="mt-16 lg:mt-24 pt-8 border-t border-border flex flex-col sm:flex-row justify-between items-center gap-6">
          <p className="text-foreground/50 text-sm">
            © Dtraders — Premium Furniture & Mattresses
          </p>

          <div className="flex items-center gap-6">
            <a href="#" className="text-foreground/50 hover:text-gold transition-colors text-sm">
              Privacy
            </a>
            <a href="#" className="text-foreground/50 hover:text-gold transition-colors text-sm">
              Terms
            </a>
            <div className="flex items-center gap-4 ml-4">
              <a href="#" className="text-foreground/50 hover:text-gold transition-colors">
                <Instagram className="w-4 h-4" />
              </a>
              <a href="#" className="text-foreground/50 hover:text-gold transition-colors">
                <Linkedin className="w-4 h-4" />
              </a>
              <a href="#" className="text-foreground/50 hover:text-gold transition-colors">
                <Twitter className="w-4 h-4" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
