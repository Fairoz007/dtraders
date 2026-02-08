import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowRight, MapPin } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

export function Showroom() {
  const sectionRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const content = contentRef.current;
    if (!section || !content) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        content.children,
        { y: 40, opacity: 0 },
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
    }, section);

    return () => ctx.revert();
  }, []);

  const handleBookVisit = () => {
    const contactSection = document.getElementById('contact');
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section
      ref={sectionRef}
      id="showroom"
      className="relative w-full py-20 lg:py-32 bg-background"
    >
      <div className="px-6 lg:px-[6vw]">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">
          {/* Image */}
          <div className="relative rounded-[10px] overflow-hidden aspect-[4/3] order-1">
            <img
              src="/showroom_card.jpg"
              alt="Showroom"
              className="w-full h-full object-cover"
            />
          </div>

          {/* Content */}
          <div ref={contentRef} className="order-2">
            <span className="font-mono text-xs uppercase tracking-[0.12em] text-foreground/70 mb-4 block">
              Showroom
            </span>

            <h2 className="font-serif text-3xl sm:text-4xl lg:text-section text-foreground mb-6">
              Experience it in person
            </h2>

            <p className="text-base lg:text-lg text-foreground/80 mb-6 leading-relaxed">
              Sit, lie down, and feel the materials. Our team can help you configure the right piece for your space.
            </p>

            <div className="flex items-center gap-2 text-foreground/60 mb-8">
              <MapPin className="w-4 h-4" />
              <span className="text-sm">Bangalore • Mumbai • Delhi</span>
            </div>

            <button
              onClick={handleBookVisit}
              className="btn-primary flex items-center gap-2 group"
            >
              Book a visit
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
