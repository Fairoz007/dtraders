import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowRight, Truck, Package, Wrench } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const deliveryFeatures = [
  { icon: Truck, text: 'Pan-India delivery' },
  { icon: Package, text: 'White-glove service' },
  { icon: Wrench, text: 'Assembly included' },
];

export function Delivery() {
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
      id="delivery"
      className="relative w-full py-20 lg:py-32 bg-dark"
    >
      <div className="px-6 lg:px-[6vw]">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">
          {/* Content */}
          <div ref={contentRef}>
            <span className="font-mono text-xs uppercase tracking-[0.12em] text-cream/70 mb-4 block">
              Delivery
            </span>

            <h2 className="font-serif text-3xl sm:text-4xl lg:text-section text-cream mb-6">
              We deliver
            </h2>

            <p className="text-base lg:text-lg text-cream/80 mb-6 leading-relaxed">
              Across India. White-glove service. Assembly included. We handle everything so you can focus on enjoying your new furniture.
            </p>

            <div className="flex flex-col gap-3 mb-8">
              {deliveryFeatures.map((feature) => (
                <div key={feature.text} className="flex items-center gap-3 text-cream/70">
                  <feature.icon className="w-4 h-4 text-gold" />
                  <span className="text-sm">{feature.text}</span>
                </div>
              ))}
            </div>

            <button className="btn-outline flex items-center gap-2 group">
              Get a shipping estimate
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>

          {/* Image */}
          <div className="relative rounded-[10px] overflow-hidden aspect-[4/3]">
            <img
              src="/delivery_card.jpg"
              alt="Delivery service"
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
