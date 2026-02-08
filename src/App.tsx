import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { Toaster } from 'sonner';
import { Navbar } from '@/components/navigation/Navbar';
import { Hero } from '@/components/sections/Hero';
import { Featured } from '@/components/sections/Featured';
import { Categories } from '@/components/sections/Categories';
import { Philosophy } from '@/components/sections/Philosophy';
import { ProductSpotlight } from '@/components/sections/ProductSpotlight';
import { Craft } from '@/components/sections/Craft';
import { Mattress } from '@/components/sections/Mattress';
import { Showroom } from '@/components/sections/Showroom';
import { Delivery } from '@/components/sections/Delivery';
import { Contact } from '@/components/sections/Contact';
import { Products } from '@/pages/Products';
import { Showrooms } from '@/pages/Showrooms';
import { Admin } from '@/pages/Admin';
import { products } from '@/data/products';
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

// Home page with all sections
function Home() {
  const sofaProduct = products.find(p => p.id === '2');
  const bedProduct = products.find(p => p.id === '3');
  const chairProduct = products.find(p => p.id === '4');

  return (
    <main className="relative">
      <Hero />
      <Featured />
      <Categories />
      <Philosophy />
      {sofaProduct && (
        <ProductSpotlight
          product={sofaProduct}
          cardImage="/spotlight_sofa_card.jpg"
        />
      )}
      {bedProduct && (
        <ProductSpotlight
          product={bedProduct}
          cardImage="/spotlight_bed_card.jpg"
        />
      )}
      {chairProduct && (
        <ProductSpotlight
          product={chairProduct}
          cardImage="/spotlight_chair_card.jpg"
        />
      )}
      <Craft />
      <Mattress />
      <Showroom />
      <Delivery />
      <Contact />
    </main>
  );
}

// Layout with navbar
function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Navbar />
      {children}
    </>
  );
}

function App() {
  return (
    <Router>
      <ScrollToTop />
      <div className="relative">
        {/* Grain overlay */}
        <div className="grain-overlay" />

        {/* Toast notifications */}
        <Toaster
          position="top-right"
          toastOptions={{
            style: {
              background: '#141416',
              color: '#F4F2EE',
              border: '1px solid rgba(244, 242, 238, 0.1)',
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
          <Route path="/admin" element={<Admin />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
