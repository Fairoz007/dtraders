import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowRight } from 'lucide-react';
import { products } from '@/data/products';

gsap.registerPlugin(ScrollTrigger);

export function Mattress() {
  const sectionRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  const mattressProduct = products.find(p => p.category === 'mattresses');

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

  const handleRequestQuote = () => {
    const contactSection = document.getElementById('contact');
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section
      ref={sectionRef}
      className="relative w-full py-20 lg:py-32 bg-background"
    >
      <div className="px-6 lg:px-[6vw]">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">
          {/* Content */}
          <div ref={contentRef}>
            <span className="font-mono text-xs uppercase tracking-[0.12em] text-foreground/70 mb-4 block">
              Mattress Collection
            </span>

            <h2 className="font-serif text-3xl sm:text-4xl lg:text-section text-foreground mb-6">
              Sleep better
            </h2>

            <p className="text-base lg:text-lg text-foreground/80 mb-6 leading-relaxed">
              Supportive layers, breathable covers, and sizes for every room. Wake up refreshed with our premium mattress collection.
            </p>

            <p className="font-mono text-sm text-gold mb-8 tracking-wide">
              FROM ₹ {mattressProduct?.price.toLocaleString()}
            </p>

            <button
              onClick={handleRequestQuote}
              className="btn-primary flex items-center gap-2 group"
            >
              Request Quote
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>

          {/* Image */}
          <div className="relative rounded-[10px] overflow-hidden aspect-[4/3]">
            <img
              src="/mattress_card.jpg"
              alt="Mattress detail"
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
