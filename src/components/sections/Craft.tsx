import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowRight } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

export function Craft() {
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

  return (
    <section
      ref={sectionRef}
      id="craft"
      className="relative w-full py-20 lg:py-32 bg-background"
    >
      <div className="px-6 lg:px-[6vw]">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">
          {/* Image */}
          <div className="relative rounded-[10px] overflow-hidden aspect-[4/3] order-1">
            <img
              src="/craft_card.jpg"
              alt="Craftsmanship"
              className="w-full h-full object-cover"
            />
          </div>

          {/* Content */}
          <div ref={contentRef} className="order-2">
            <span className="font-mono text-xs uppercase tracking-[0.12em] text-foreground/70 mb-4 block">
              Craft
            </span>

            <h2 className="font-serif text-3xl sm:text-4xl lg:text-section text-foreground mb-6">
              Built to last
            </h2>

            <p className="text-base lg:text-lg text-foreground/80 mb-8 leading-relaxed">
              Kiln-dried hardwood frames, high-resilience foam, and fabrics tested for real life. Every piece is built to withstand years of daily use while maintaining its beauty.
            </p>

            <button className="btn-outline flex items-center gap-2 group">
              See our materials
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
