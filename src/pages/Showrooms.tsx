import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Link } from 'react-router-dom';
import { ArrowLeft, MapPin, Phone, Clock, Mail, ExternalLink } from 'lucide-react';
import { toast } from 'sonner';

gsap.registerPlugin(ScrollTrigger);

const showrooms = [
  {
    id: 'royal-wood',
    name: 'Royal Wood Gallery',
    address: 'Aroma Hospital, Opposite Rapha, Chengamanad, Melila, Kerala 691557',
    phone: '09744271611',
    hours: 'Monday - Sunday: 9am - 9pm',
    mapUrl: 'https://maps.google.com/?q=Royal+Wood+Gallery+Chengamanad+Kerala',
  },
  {
    id: 'fortune-furniture',
    name: 'Fortune Furniture',
    address: 'Karunagappally, Kerala',
    phone: '09744271611',
    hours: 'Monday - Sunday: 9am - 9pm',
    mapUrl: 'https://maps.google.com/?q=Fortune+Furniture+Karunagappally+Kerala',
  },
  {
    id: 'fortune-outlet',
    name: 'Fortune Furniture Factory Outlet',
    address: 'കൊട്ടാരക്കര, Inchakkad, Kerala 691560',
    phone: '09744271611',
    hours: 'Monday - Sunday: 9am - 9pm',
    mapUrl: 'https://maps.google.com/?q=Fortune+Furniture+Factory+Outlet+Kottarakkara+Kerala',
  },
];

export function Showrooms() {
  const headerRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);
  const contactRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const header = headerRef.current;
    const cards = cardsRef.current;
    const contact = contactRef.current;

    if (!header || !cards || !contact) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        header.children,
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          stagger: 0.1,
          duration: 0.6,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: header,
            start: 'top 80%',
            toggleActions: 'play none none reverse',
          },
        }
      );

      const cardElements = cards.querySelectorAll('.showroom-card');
      gsap.fromTo(
        cardElements,
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          stagger: 0.1,
          duration: 0.5,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: cards,
            start: 'top 80%',
            toggleActions: 'play none none reverse',
          },
        }
      );

      gsap.fromTo(
        contact.children,
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          stagger: 0.1,
          duration: 0.5,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: contact,
            start: 'top 85%',
            toggleActions: 'play none none reverse',
          },
        }
      );
    });

    return () => ctx.revert();
  }, []);

  const handleCopyPhone = (phone: string) => {
    navigator.clipboard.writeText(phone);
    toast.success('Phone number copied to clipboard');
  };

  return (
    <div className="min-h-screen bg-dark pt-20 pb-16">
      {/* Header */}
      <div className="px-4 sm:px-6 lg:px-[6vw] mb-10">
        <div className="flex items-center gap-4 mb-6">
          <Link
            to="/"
            className="flex items-center gap-2 text-cream/60 hover:text-gold transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span className="text-sm">Back to home</span>
          </Link>
        </div>

        <div ref={headerRef}>
          <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-cream mb-4">
            Our Showrooms
          </h1>
          <p className="text-cream/70 max-w-2xl leading-relaxed">
            Visit one of our elegant showrooms to experience our premium furniture collections in person. 
            Our knowledgeable staff will be happy to assist you in finding the perfect pieces for your home.
          </p>
        </div>
      </div>

      {/* Showroom Cards */}
      <div ref={cardsRef} className="px-4 sm:px-6 lg:px-[6vw] mb-16">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {showrooms.map((showroom) => (
            <div
              key={showroom.id}
              className="showroom-card bg-white/5 rounded-[10px] p-6 hover:bg-white/10 transition-colors"
            >
              <h2 className="font-serif text-xl text-cream mb-4">{showroom.name}</h2>
              
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <MapPin className="w-4 h-4 text-gold mt-1 flex-shrink-0" />
                  <div>
                    <span className="text-cream/40 text-xs uppercase tracking-wide block mb-1">Address</span>
                    <p className="text-cream/80 text-sm">{showroom.address}</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Phone className="w-4 h-4 text-gold mt-1 flex-shrink-0" />
                  <div>
                    <span className="text-cream/40 text-xs uppercase tracking-wide block mb-1">Phone</span>
                    <button
                      onClick={() => handleCopyPhone(showroom.phone)}
                      className="text-cream/80 text-sm hover:text-gold transition-colors"
                    >
                      {showroom.phone}
                    </button>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Clock className="w-4 h-4 text-gold mt-1 flex-shrink-0" />
                  <div>
                    <span className="text-cream/40 text-xs uppercase tracking-wide block mb-1">Hours</span>
                    <p className="text-cream/80 text-sm">{showroom.hours}</p>
                  </div>
                </div>
              </div>

              <a
                href={showroom.mapUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-6 flex items-center justify-center gap-2 w-full py-3 border border-cream/20 rounded-full text-cream/80 hover:text-gold hover:border-gold transition-colors text-sm"
              >
                <ExternalLink className="w-4 h-4" />
                View on Map
              </a>
            </div>
          ))}
        </div>
      </div>

      {/* Map Section */}
      <div className="px-4 sm:px-6 lg:px-[6vw] mb-16">
        <div className="bg-white/5 rounded-[10px] overflow-hidden">
          <div className="aspect-[16/9] lg:aspect-[21/9] w-full">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3938.1234567890123!2d76.12345678901234!3d9.123456789012345!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zOcKwMDcnMjQuNCJOIDc2wrAwNycyNC40IkU!5e0!3m2!1sen!2sin!4v1234567890123!5m2!1sen!2sin"
              width="100%"
              height="100%"
              style={{ border: 0, filter: 'grayscale(100%) invert(92%) contrast(83%)' }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Dtraders Showrooms Location"
            />
          </div>
        </div>
      </div>

      {/* Contact Section */}
      <div ref={contactRef} className="px-4 sm:px-6 lg:px-[6vw]">
        <div className="bg-white/5 rounded-[10px] p-6 lg:p-10">
          <h2 className="font-serif text-2xl lg:text-3xl text-cream mb-8">Contact Us</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Call Us */}
            <div>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-full bg-gold/20 flex items-center justify-center">
                  <Phone className="w-4 h-4 text-gold" />
                </div>
                <h3 className="font-serif text-lg text-cream">Call Us</h3>
              </div>
              <button
                onClick={() => handleCopyPhone('09744271611')}
                className="text-cream/80 hover:text-gold transition-colors font-mono text-lg"
              >
                09744271611
              </button>
            </div>

            {/* Email Us */}
            <div>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-full bg-gold/20 flex items-center justify-center">
                  <Mail className="w-4 h-4 text-gold" />
                </div>
                <h3 className="font-serif text-lg text-cream">Email Us</h3>
              </div>
              <div className="space-y-2">
                <a
                  href="mailto:info@dtraders.com"
                  className="block text-cream/80 hover:text-gold transition-colors text-sm"
                >
                  info@dtraders.com
                </a>
                <a
                  href="mailto:sales@dtraders.com"
                  className="block text-cream/80 hover:text-gold transition-colors text-sm"
                >
                  sales@dtraders.com
                </a>
              </div>
            </div>

            {/* Send Message */}
            <div>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-full bg-gold/20 flex items-center justify-center">
                  <ExternalLink className="w-4 h-4 text-gold" />
                </div>
                <h3 className="font-serif text-lg text-cream">Send Us a Message</h3>
              </div>
              <Link
                to="/#contact"
                className="inline-flex items-center gap-2 text-cream/80 hover:text-gold transition-colors text-sm"
              >
                Go to contact form
                <ArrowLeft className="w-3 h-3 rotate-180" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
