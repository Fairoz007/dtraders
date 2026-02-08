import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowRight } from 'lucide-react';
import { products } from '@/data/products';

gsap.registerPlugin(ScrollTrigger);

export function Featured() {
  const sectionRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  const featuredProduct = products.find(p => p.id === '1');

  useEffect(() => {
    const section = sectionRef.current;
    const content = contentRef.current;
    if (!section || !content) return;

    const ctx = gsap.context(() => {
      // Simple fade-in on scroll
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
      id="featured"
      className="relative w-full py-20 lg:py-32 bg-dark"
    >
      <div className="px-6 lg:px-[6vw]">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">
          {/* Content */}
          <div ref={contentRef} className="order-2 lg:order-1">
            <span className="font-mono text-xs uppercase tracking-[0.12em] text-cream/70 mb-4 block">
              Featured
            </span>

            <h2 className="font-serif text-3xl sm:text-4xl lg:text-section text-cream mb-6">
              The Signature Sofa
            </h2>

            <p className="text-base lg:text-lg text-cream/80 mb-4 leading-relaxed">
              {featuredProduct?.description}
            </p>

            <p className="font-mono text-sm text-gold mb-8 tracking-wide">
              FROM ₹ {featuredProduct?.price.toLocaleString()}
            </p>

            <div className="flex flex-col sm:flex-row gap-4 items-start">
              <button
                onClick={handleRequestQuote}
                className="btn-primary flex items-center gap-2 group"
              >
                Request Quote
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>
              <button className="text-cream/80 hover:text-gold transition-colors text-sm tracking-wide underline underline-offset-4">
                View details
              </button>
            </div>
          </div>

          {/* Image */}
          <div className="order-1 lg:order-2">
            <div className="relative rounded-[10px] overflow-hidden aspect-[4/3]">
              <img
                src="/featured_sofa_closeup.jpg"
                alt="Signature sofa detail"
                className="w-full h-full object-cover"
              />
              <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-dark/80 to-transparent">
                <p className="text-cream/90 text-sm">
                  Available in {featuredProduct?.finishes?.length || 4} finishes
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
