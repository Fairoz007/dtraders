import { motion } from 'framer-motion';

export function About() {
  return (
    <div className="min-h-screen bg-white pt-32 pb-24">
      {/* Header */}
      <div className="container-content mb-32">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center max-w-4xl mx-auto"
        >
          <span className="text-accent text-small uppercase tracking-[0.2em] mb-6 block">Our Story</span>
          <h1 className="font-serif text-hero text-primary mb-8 leading-tight">
            Crafting Timeless <br /> Sanctuaries.
          </h1>
          <p className="text-gray-500 text-body leading-relaxed max-w-2xl mx-auto">
            Founded on the principles of uncompromising quality and minimalist design, DTRADERS has been defining modern luxury living since its inception.
          </p>
        </motion.div>
      </div>

      {/* Main Image */}
      <div className="w-full h-[70vh] mb-32 overflow-hidden">
        <motion.img 
          initial={{ scale: 1.1 }}
          whileInView={{ scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.5 }}
          src="https://images.unsplash.com/photo-1542401886-65d6c61db217?q=80&w=2400&auto=format&fit=crop" 
          alt="Craftsmanship" 
          className="w-full h-full object-cover"
        />
      </div>

      {/* Philosophy */}
      <div className="container-content mb-32">
        <div className="flex flex-col md:flex-row gap-16 lg:gap-32">
          <div className="w-full md:w-1/3">
            <h2 className="font-serif text-h2 text-primary sticky top-32">Design Philosophy</h2>
          </div>
          <div className="w-full md:w-2/3 space-y-8">
            <p className="text-body text-gray-500 leading-relaxed text-balance">
              We believe that furniture should not just fill a space, but elevate it. Every curve, every joint, and every material is chosen with deliberate intention. Our approach strips away the unnecessary, leaving only what is essential, beautiful, and lasting.
            </p>
            <p className="text-body text-gray-500 leading-relaxed text-balance">
              Drawing inspiration from both Scandinavian minimalism and Italian luxury, our collections are designed to transcend passing trends. We create pieces that become the quiet protagonists of your daily life—objects that grow more beautiful with time and use.
            </p>
          </div>
        </div>
      </div>

      {/* Craftsmanship Image Grid */}
      <div className="container-content mb-32">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="aspect-[4/5] bg-gray-100"
          >
            <img src="https://images.unsplash.com/photo-1611269154421-4e27233ac5c7?q=80&w=1000&auto=format&fit=crop" alt="Woodworking" className="w-full h-full object-cover" />
          </motion.div>
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="aspect-[4/5] bg-gray-100 md:mt-24"
          >
            <img src="https://images.unsplash.com/photo-1581428982868-e410dd047a90?q=80&w=1000&auto=format&fit=crop" alt="Details" className="w-full h-full object-cover" />
          </motion.div>
        </div>
      </div>
    </div>
  );
}
