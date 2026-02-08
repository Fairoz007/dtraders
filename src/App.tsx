import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { Toaster } from 'sonner';
import { Navbar } from '@/components/navigation/Navbar';
import { Hero } from '@/components/sections/Hero';
import { Contact } from '@/components/sections/Contact';
import { FeaturedProducts } from '@/components/sections/FeaturedProducts';
import { Products } from '@/pages/Products';
import { Showrooms } from '@/pages/Showrooms';
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

// Home page with all sections
function Home() {
  return (
    <main className="relative">
      <Hero />
      <FeaturedProducts />
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
      <CartProvider>
        <ScrollToTop />
        <div className="relative">
          {/* Grain overlay */}
          <div className="grain-overlay" />

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
