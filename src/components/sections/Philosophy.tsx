import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Award, Leaf, Headphones } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const values = [
  {
    icon: Award,
    title: 'Quality',
    description: 'We partner with skilled artisans who take pride in their work, ensuring every piece meets our exacting standards.',
  },
  {
    icon: Leaf,
    title: 'Sustainability',
    description: 'From responsibly sourced materials to eco-friendly packaging, we are committed to minimizing our environmental impact.',
  },
  {
    icon: Headphones,
    title: 'Service',
    description: 'Our dedicated team provides personalized support from selection to delivery and beyond.',
  },
];

export function Philosophy() {
  const sectionRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const content = contentRef.current;
    const cards = cardsRef.current;
    if (!section || !content || !cards) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        content.children,
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

      const cardElements = cards.querySelectorAll('.value-card');
      gsap.fromTo(
        cardElements,
        { y: 30, opacity: 0 },
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
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative w-full py-20 lg:py-32 bg-cream"
    >
      <div className="px-6 lg:px-[6vw]">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">
          {/* Left Content */}
          <div ref={contentRef}>
            <span className="font-mono text-xs uppercase tracking-[0.12em] text-dark/60 mb-4 block">
              Our Philosophy
            </span>

            <h2 className="font-serif text-3xl sm:text-4xl lg:text-section text-dark mb-6">
              Made for living.
            </h2>

            <p className="text-base lg:text-lg text-dark/70 leading-relaxed">
              We design furniture that lasts—clean lines, honest materials, and details that age beautifully. Each piece is thoughtfully crafted to become a cherished part of your home.
            </p>
          </div>

          {/* Right Cards */}
          <div ref={cardsRef} className="flex flex-col gap-4">
            {values.map((value) => (
              <div
                key={value.title}
                className="value-card bg-white rounded-[10px] p-6 shadow-sm hover:shadow-md transition-shadow"
              >
                <value.icon className="w-6 h-6 text-gold mb-4" />
                <h3 className="font-serif text-xl text-dark mb-2">{value.title}</h3>
                <p className="text-sm text-dark/60 leading-relaxed">{value.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Quote */}
        <blockquote className="mt-16 lg:mt-24 text-center">
          <p className="font-serif text-xl lg:text-2xl text-dark/80 italic max-w-2xl mx-auto leading-relaxed">
            "A sofa should work as hard as you do."
          </p>
        </blockquote>
      </div>
    </section>
  );
}
