import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowRight } from 'lucide-react';
import { categories } from '@/data/products';
import { Link } from 'react-router-dom';

gsap.registerPlugin(ScrollTrigger);

export function Categories() {
  const sectionRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const content = contentRef.current;
    const grid = gridRef.current;
    if (!section || !content || !grid) return;

    const ctx = gsap.context(() => {
      // Content fade-in
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

      // Grid items fade-in
      gsap.fromTo(
        grid.children,
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          stagger: 0.08,
          duration: 0.5,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: grid,
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
      id="categories"
      className="relative w-full py-20 lg:py-32 bg-dark"
    >
      <div className="px-6 lg:px-[6vw]">
        {/* Header */}
        <div ref={contentRef} className="mb-12">
          <span className="font-mono text-xs uppercase tracking-[0.12em] text-cream/70 mb-4 block">
            Categories
          </span>

          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6">
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-section text-cream">
              Shop by Category
            </h2>

            <Link
              to="/products"
              className="btn-primary inline-flex items-center gap-2 group w-fit"
            >
              Browse all
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>

        {/* Category Grid */}
        <div
          ref={gridRef}
          className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4"
        >
          {categories.map((category) => (
            <Link
              key={category.id}
              to={`/products?category=${category.id}`}
              className="group relative rounded-[10px] overflow-hidden aspect-square"
            >
              <img
                src={category.image}
                alt={category.name}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-dark/40 group-hover:bg-dark/20 transition-colors" />
              <div className="absolute bottom-4 left-4">
                <span className="font-serif text-lg text-cream">{category.name}</span>
                <span className="block text-cream/60 text-xs">{category.count} items</span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
