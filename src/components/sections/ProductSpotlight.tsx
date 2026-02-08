import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowRight } from 'lucide-react';
import type { Product } from '@/types';

gsap.registerPlugin(ScrollTrigger);

interface ProductSpotlightProps {
  product: Product;
  cardImage: string;
}

export function ProductSpotlight({
  product,
  cardImage,
}: ProductSpotlightProps) {
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

  const handleRequestQuote = () => {
    const contactSection = document.getElementById('contact');
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section
      ref={sectionRef}
      className="relative w-full py-20 lg:py-32 bg-dark"
    >
      <div className="px-6 lg:px-[6vw]">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">
          {/* Content */}
          <div ref={contentRef}>
            <span className="font-mono text-xs uppercase tracking-[0.12em] text-cream/70 mb-4 block">
              Spotlight
            </span>

            <h2 className="font-serif text-3xl sm:text-4xl lg:text-section text-cream mb-6">
              {product.name}
            </h2>

            <p className="text-base lg:text-lg text-cream/80 mb-6 leading-relaxed">
              {product.description}
            </p>

            <p className="font-mono text-sm text-gold mb-8 tracking-wide">
              FROM ₹ {product.price.toLocaleString()}
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
              src={cardImage}
              alt={`${product.name} detail`}
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
