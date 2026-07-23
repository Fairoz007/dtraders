import { MapPin, Phone, Clock, Mail, ArrowRight } from 'lucide-react';
import { toast } from 'sonner';
import { motion } from 'framer-motion';

const showrooms = [
  {
    id: 'royal-wood',
    name: 'Royal Wood Gallery',
    address: 'Aroma Hospital, Opposite Rapha, Chengamanad, Melila, Kerala 691557',
    phone: '08086674502',
    hours: 'Monday - Sunday: 9am - 9pm',
    mapUrl: 'https://maps.google.com/?q=Royal+Wood+Gallery+Chengamanad+Kerala',
    image: 'https://images.unsplash.com/photo-1542401886-65d6c61db217?q=80&w=2000&auto=format&fit=crop'
  },
  {
    id: 'fortune-furniture',
    name: 'Fortune Furniture',
    address: 'Karunagappally, Kerala',
    phone: '08086674502',
    hours: 'Monday - Sunday: 9am - 9pm',
    mapUrl: 'https://maps.google.com/?q=Fortune+Furniture+Karunagappally+Kerala',
    image: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?q=80&w=2000&auto=format&fit=crop'
  },
  {
    id: 'fortune-outlet',
    name: 'Fortune Furniture Factory Outlet',
    address: 'കൊട്ടാരക്കര, Inchakkad, Kerala 691560',
    phone: '08086674502',
    hours: 'Monday - Sunday: 9am - 9pm',
    mapUrl: 'https://maps.google.com/?q=Fortune+Furniture+Factory+Outlet+Kottarakkara+Kerala',
    image: 'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?q=80&w=2000&auto=format&fit=crop'
  },
];

export function Showrooms() {
  const handleCopyPhone = (phone: string) => {
    navigator.clipboard.writeText(phone);
    toast.success('Phone number copied to clipboard', {
      style: { background: '#222222', color: '#fff', border: 'none' }
    });
  };

  return (
    <div className="min-h-screen bg-section pt-32 pb-24">
      {/* Header */}
      <div className="container-content mb-24">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center max-w-4xl mx-auto"
        >
          <span className="text-accent text-small uppercase tracking-[0.2em] mb-6 block">Experience the Craft</span>
          <h1 className="font-serif text-hero text-primary mb-8 leading-tight">
            Our Showrooms
          </h1>
          <p className="text-gray-500 text-body leading-relaxed max-w-2xl mx-auto">
            Visit one of our elegant showrooms to experience our premium furniture collections in person. 
            Our knowledgeable staff will be happy to assist you in finding the perfect pieces for your home.
          </p>
        </motion.div>
      </div>

      {/* Showroom Locations */}
      <div className="container-content space-y-32 mb-32">
        {showrooms.map((showroom, index) => (
          <motion.div 
            key={showroom.id}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1 }}
            className={`flex flex-col ${index % 2 === 1 ? 'lg:flex-row-reverse' : 'lg:flex-row'} items-stretch bg-white shadow-soft`}
          >
            <div className="w-full lg:w-1/2">
              <img 
                src={showroom.image} 
                alt={showroom.name} 
                className="w-full h-full object-cover aspect-[4/3] lg:aspect-auto"
              />
            </div>
            
            <div className="w-full lg:w-1/2 p-10 lg:p-20 flex flex-col justify-center">
              <span className="text-gray-400 text-small uppercase tracking-[0.2em] mb-4 block">
                0{index + 1}
              </span>
              <h2 className="font-serif text-h2 text-primary mb-10">{showroom.name}</h2>
              
              <div className="space-y-8 mb-12">
                <div className="flex items-start gap-6">
                  <MapPin className="w-6 h-6 text-accent flex-shrink-0" strokeWidth={1.5} />
                  <div>
                    <span className="text-gray-400 text-small uppercase tracking-widest block mb-2">Address</span>
                    <p className="text-primary text-body">{showroom.address}</p>
                  </div>
                </div>

                <div className="flex items-start gap-6">
                  <Phone className="w-6 h-6 text-accent flex-shrink-0" strokeWidth={1.5} />
                  <div>
                    <span className="text-gray-400 text-small uppercase tracking-widest block mb-2">Phone</span>
                    <button
                      onClick={() => handleCopyPhone(showroom.phone)}
                      className="text-primary text-body hover:text-accent transition-colors"
                    >
                      {showroom.phone}
                    </button>
                  </div>
                </div>

                <div className="flex items-start gap-6">
                  <Clock className="w-6 h-6 text-accent flex-shrink-0" strokeWidth={1.5} />
                  <div>
                    <span className="text-gray-400 text-small uppercase tracking-widest block mb-2">Hours</span>
                    <p className="text-primary text-body">{showroom.hours}</p>
                  </div>
                </div>
              </div>

              <a
                href={showroom.mapUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-outline self-start flex items-center gap-4 group"
              >
                Get Directions
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-2" />
              </a>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Map Section */}
      <div className="container-content mb-32">
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
          className="bg-white p-4 shadow-lift"
        >
          <div className="aspect-[21/9] w-full bg-gray-100">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3938.1234567890123!2d76.12345678901234!3d9.123456789012345!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zOcKwMDcnMjQuNCJOIDc2wrAwNycyNC40IkU!5e0!3m2!1sen!2sin!4v1234567890123!5m2!1sen!2sin"
              width="100%"
              height="100%"
              style={{ border: 0, filter: 'grayscale(100%) opacity(80%)' }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Dtraders Showrooms Location"
            />
          </div>
        </motion.div>
      </div>

      {/* General Contact */}
      <div className="container-content">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="bg-white p-12 lg:p-24 text-center border border-gray-100 shadow-soft"
        >
          <h2 className="font-serif text-h2 text-primary mb-6">Need Assistance?</h2>
          <p className="text-gray-500 text-body max-w-xl mx-auto mb-12">
            Our luxury concierges are available to assist you with any inquiries regarding our collections or custom pieces.
          </p>
          
          <div className="flex flex-col md:flex-row justify-center gap-12 lg:gap-24">
            <div>
              <Mail className="w-8 h-8 text-accent mx-auto mb-6" strokeWidth={1} />
              <h3 className="text-small tracking-widest uppercase text-gray-400 mb-2">Email Us</h3>
              <a href="mailto:info@dtraders.com" className="text-primary text-body hover:text-accent transition-colors block">info@dtraders.com</a>
            </div>
            
            <div>
              <Phone className="w-8 h-8 text-accent mx-auto mb-6" strokeWidth={1} />
              <h3 className="text-small tracking-widest uppercase text-gray-400 mb-2">Call Us</h3>
              <button onClick={() => handleCopyPhone('08086674502')} className="text-primary text-body hover:text-accent transition-colors">
                08086674502
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
