import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { Phone } from 'lucide-react';
import { Toaster } from 'sonner';
import { Navbar } from '@/components/navigation/Navbar';
import { Footer } from '@/components/navigation/Footer';
import { OfferPopup } from '@/components/ui/OfferPopup';
import { Home } from '@/pages/Home';
import { Products } from '@/pages/Products';
import { ProductDetails } from '@/pages/ProductDetails';
import { Showrooms } from '@/pages/Showrooms';
import { About } from '@/pages/About';
import { Contact } from '@/pages/Contact';
import { AdminLayout } from '@/components/admin/AdminLayout';
import { AdminDashboard } from '@/pages/admin/Dashboard';
import { AdminProducts } from '@/pages/admin/Products';
import { CartProvider } from '@/context/CartContext';
import './App.css';

// Scroll to top on route change
function ScrollToTop() {
  useLocation(); // Trigger re-render on route change

  // Reset scroll position
  if (typeof window !== 'undefined') {
    window.scrollTo(0, 0);
  }

  return null;
}

// Layout with navbar and footer
function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-col min-h-screen relative">
      <Navbar />
      <main className="flex-grow">
        {children}
      </main>
      <OfferPopup />
      <Footer />

      {/* Floating WhatsApp Button */}
      <a 
        href="https://wa.me/918086674502?text=Hello,%20I%20would%20like%20to%20inquire%20about%20your%20products." 
        target="_blank" 
        rel="noopener noreferrer" 
        className="fixed bottom-6 right-6 bg-[#25D366] text-white p-4 rounded-full shadow-[0_4px_14px_0_rgba(37,211,102,0.39)] hover:scale-110 hover:shadow-[0_6px_20px_rgba(37,211,102,0.23)] transition-all z-50 flex items-center justify-center group"
        aria-label="Chat on WhatsApp"
      >
        <Phone className="w-6 h-6 fill-current" strokeWidth={1.5} />
      </a>
    </div>
  );
}

function App() {
  return (
    <Router>
      <CartProvider>
        <ScrollToTop />
        <div className="relative flex flex-col min-h-screen bg-background text-text">

          {/* Toast notifications */}
          <Toaster
            position="top-right"
            toastOptions={{
              style: {
                background: '#ffffff',
                color: '#0B0B0D',
                border: '1px solid #e5e7eb',
              },
            }}
          />

          <Routes>
            <Route
              path="/"
              element={
                <Layout>
                  <Home />
                </Layout>
              }
            />
            <Route
              path="/products"
              element={
                <Layout>
                  <Products />
                </Layout>
              }
            />
            <Route
              path="/showrooms"
              element={
                <Layout>
                  <Showrooms />
                </Layout>
              }
            />
            <Route
              path="/about"
              element={
                <Layout>
                  <About />
                </Layout>
              }
            />
            <Route
              path="/contact"
              element={
                <Layout>
                  <Contact />
                </Layout>
              }
            />
            <Route
              path="/products/:id"
              element={
                <Layout>
                  <ProductDetails />
                </Layout>
              }
            />
            <Route
              path="/admin"
              element={
                <AdminLayout>
                  <AdminDashboard />
                </AdminLayout>
              }
            />
            <Route
              path="/admin/products"
              element={
                <AdminLayout>
                  <AdminProducts />
                </AdminLayout>
              }
            />
          </Routes>
        </div>
      </CartProvider>
    </Router>
  );
}

export default App;
