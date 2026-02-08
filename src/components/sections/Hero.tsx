import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowRight } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

export function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const content = contentRef.current;
    if (!section || !content) return;

    const ctx = gsap.context(() => {
      // Simple fade-in on load
      gsap.fromTo(
        content.children,
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          stagger: 0.15,
          duration: 0.8,
          ease: 'power2.out',
          delay: 0.3,
        }
      );
    }, section);

    return () => ctx.revert();
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section
      ref={sectionRef}
      className="relative w-full min-h-screen overflow-hidden bg-background"
    >
      {/* Background Image */}
      <div className="absolute inset-0 w-full h-full">
        <img
          src="/hero_living_room.jpg"
          alt="Premium furniture living room"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/40" />
      </div>

      {/* Content */}
      <div
        ref={contentRef}
        className="relative z-10 min-h-screen flex flex-col justify-center px-6 lg:px-[6vw] pt-24 pb-12"
      >
        <span className="font-mono text-xs uppercase tracking-[0.12em] text-[#F4F2EE]/70 mb-4">
          Premium Furniture
        </span>

        <h1 className="font-serif text-4xl sm:text-5xl lg:text-hero text-[#F4F2EE] max-w-2xl leading-[0.95] mb-6">
          Curated Living
        </h1>

        <p className="text-base lg:text-lg text-[#F4F2EE]/80 max-w-md mb-8 leading-relaxed">
          Timeless design, modern comfort—delivered across India.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 items-start">
          <button
            onClick={() => scrollToSection('featured')}
            className="btn-primary flex items-center gap-2 group"
          >
            Explore Collection
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>
          <button
            onClick={() => scrollToSection('showroom')}
            className="text-[#F4F2EE]/80 hover:text-gold transition-colors text-sm tracking-wide underline underline-offset-4"
          >
            Book a showroom visit
          </button>
        </div>
      </div>
    </section>
  );
}
