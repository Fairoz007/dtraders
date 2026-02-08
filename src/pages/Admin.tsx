import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, LogOut, Inbox, Package, Eye, Trash2, X } from 'lucide-react';
import { toast } from 'sonner';
import { products as initialProducts, categories } from '@/data/products';
import type { Product, Inquiry } from '@/types';

export function Admin() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [activeTab, setActiveTab] = useState<'inquiries' | 'products'>('inquiries');
  const [inquiries, setInquiries] = useState<Inquiry[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [selectedInquiry, setSelectedInquiry] = useState<Inquiry | null>(null);
  const [isAddingProduct, setIsAddingProduct] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);

  // Load data from localStorage on mount
  useEffect(() => {
    const storedInquiries = JSON.parse(localStorage.getItem('dtraders_inquiries') || '[]');
    setInquiries(storedInquiries);
    
    const storedProducts = JSON.parse(localStorage.getItem('dtraders_products') || '[]');
    if (storedProducts.length === 0) {
      localStorage.setItem('dtraders_products', JSON.stringify(initialProducts));
      setProducts(initialProducts);
    } else {
      setProducts(storedProducts);
    }

    // Check if already authenticated
    const auth = sessionStorage.getItem('dtraders_admin_auth');
    if (auth === 'true') {
      setIsAuthenticated(true);
    }
  }, []);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // Simple password protection (in production, use proper authentication)
    if (password === 'admin123') {
      setIsAuthenticated(true);
      sessionStorage.setItem('dtraders_admin_auth', 'true');
      toast.success('Welcome to Admin Panel');
    } else {
      toast.error('Invalid password');
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    sessionStorage.removeItem('dtraders_admin_auth');
    toast.success('Logged out successfully');
  };

  const handleDeleteInquiry = (id: string) => {
    const updated = inquiries.filter(i => i.id !== id);
    setInquiries(updated);
    localStorage.setItem('dtraders_inquiries', JSON.stringify(updated));
    toast.success('Inquiry deleted');
  };

  const handleDeleteProduct = (id: string) => {
    const updated = products.filter(p => p.id !== id);
    setProducts(updated);
    localStorage.setItem('dtraders_products', JSON.stringify(updated));
    toast.success('Product deleted');
  };

  const handleSaveProduct = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    
    const newProduct: Product = {
      id: editingProduct?.id || Date.now().toString(),
      name: formData.get('name') as string,
      category: formData.get('category') as string,
      price: Number(formData.get('price')),
      description: formData.get('description') as string,
      image: formData.get('image') as string || '/featured_sofa_closeup.jpg',
      featured: formData.get('featured') === 'on',
      finishes: (formData.get('finishes') as string).split(',').map(f => f.trim()).filter(Boolean),
    };

    let updated;
    if (editingProduct) {
      updated = products.map(p => p.id === editingProduct.id ? newProduct : p);
    } else {
      updated = [...products, newProduct];
    }
    
    setProducts(updated);
    localStorage.setItem('dtraders_products', JSON.stringify(updated));
    setIsAddingProduct(false);
    setEditingProduct(null);
    toast.success(editingProduct ? 'Product updated' : 'Product added');
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-dark flex items-center justify-center px-6">
        <div className="w-full max-w-md">
          <Link
            to="/"
            className="flex items-center gap-2 text-cream/60 hover:text-gold transition-colors mb-8"
          >
            <ArrowLeft className="w-4 h-4" />
            <span className="text-sm">Back to home</span>
          </Link>
          
          <div className="bg-white/5 rounded-[10px] p-8">
            <h1 className="font-serif text-3xl text-cream mb-2">Admin Login</h1>
            <p className="text-cream/60 mb-6">Enter your password to access the admin panel</p>
            
            <form onSubmit={handleLogin} className="space-y-4">
              <div>
                <label className="block text-cream/60 text-sm mb-2">Password</label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full bg-white/5 border border-cream/20 rounded-lg px-4 py-3 text-cream focus:outline-none focus:border-gold transition-colors"
                  placeholder="Enter password"
                />
              </div>
              <button type="submit" className="w-full btn-primary">
                Login
              </button>
            </form>
            
            <p className="text-cream/40 text-xs mt-4 text-center">
              Default password: admin123
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-dark pt-6 pb-16">
      {/* Header */}
      <div className="px-6 lg:px-8 mb-8">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link
              to="/"
              className="flex items-center gap-2 text-cream/60 hover:text-gold transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              <span className="text-sm">Back to home</span>
            </Link>
          </div>
          
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 text-cream/60 hover:text-gold transition-colors"
          >
            <LogOut className="w-4 h-4" />
            <span className="text-sm">Logout</span>
          </button>
        </div>
        
        <div className="mt-6">
          <h1 className="font-serif text-3xl lg:text-4xl text-cream">Admin Panel</h1>
          <p className="text-cream/60">Manage inquiries and products</p>
        </div>
      </div>

      {/* Tabs */}
      <div className="px-6 lg:px-8 mb-8">
        <div className="flex gap-4 border-b border-cream/10">
          <button
            onClick={() => setActiveTab('inquiries')}
            className={`flex items-center gap-2 pb-4 text-sm font-medium transition-colors ${
              activeTab === 'inquiries'
                ? 'text-gold border-b-2 border-gold'
                : 'text-cream/60 hover:text-cream'
            }`}
          >
            <Inbox className="w-4 h-4" />
            Inquiries
            {inquiries.length > 0 && (
              <span className="bg-gold/20 text-gold text-xs px-2 py-0.5 rounded-full">
                {inquiries.length}
              </span>
            )}
          </button>
          <button
            onClick={() => setActiveTab('products')}
            className={`flex items-center gap-2 pb-4 text-sm font-medium transition-colors ${
              activeTab === 'products'
                ? 'text-gold border-b-2 border-gold'
                : 'text-cream/60 hover:text-cream'
            }`}
          >
            <Package className="w-4 h-4" />
            Products
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="px-6 lg:px-8">
        {activeTab === 'inquiries' ? (
          <div>
            {inquiries.length === 0 ? (
              <div className="text-center py-20">
                <Inbox className="w-12 h-12 text-cream/20 mx-auto mb-4" />
                <p className="text-cream/60">No inquiries yet</p>
              </div>
            ) : (
              <div className="space-y-4">
                {inquiries.map((inquiry) => (
                  <div
                    key={inquiry.id}
                    className="bg-white/5 rounded-[10px] p-5 hover:bg-white/10 transition-colors"
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <h3 className="font-serif text-lg text-cream">{inquiry.name}</h3>
                          <span className="text-cream/40 text-sm">
                            {new Date(inquiry.createdAt).toLocaleDateString()}
                          </span>
                        </div>
                        <p className="text-cream/60 text-sm mb-2">{inquiry.email}</p>
                        <p className="text-cream/40 text-sm line-clamp-2">{inquiry.message}</p>
                      </div>
                      <div className="flex items-center gap-2 ml-4">
                        <button
                          onClick={() => setSelectedInquiry(inquiry)}
                          className="p-2 text-cream/60 hover:text-gold transition-colors"
                        >
                          <Eye className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleDeleteInquiry(inquiry.id)}
                          className="p-2 text-cream/60 hover:text-red-400 transition-colors"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        ) : (
          <div>
            <div className="flex justify-between items-center mb-6">
              <p className="text-cream/60">{products.length} products</p>
              <button
                onClick={() => {
                  setEditingProduct(null);
                  setIsAddingProduct(true);
                }}
                className="btn-primary text-sm"
              >
                Add Product
              </button>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {products.map((product) => (
                <div
                  key={product.id}
                  className="bg-white/5 rounded-[10px] overflow-hidden hover:bg-white/10 transition-colors"
                >
                  <div className="aspect-video overflow-hidden">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="p-4">
                    <div className="flex items-start justify-between">
                      <div>
                        <h3 className="font-serif text-lg text-cream">{product.name}</h3>
                        <p className="font-mono text-gold text-sm">
                          ₹ {product.price.toLocaleString()}
                        </p>
                      </div>
                      {product.featured && (
                        <span className="bg-gold/20 text-gold text-xs px-2 py-1 rounded">
                          Featured
                        </span>
                      )}
                    </div>
                    <div className="flex items-center gap-2 mt-4">
                      <button
                        onClick={() => {
                          setEditingProduct(product);
                          setIsAddingProduct(true);
                        }}
                        className="flex-1 text-sm text-cream/60 hover:text-gold transition-colors"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDeleteProduct(product.id)}
                        className="flex-1 text-sm text-cream/60 hover:text-red-400 transition-colors"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Inquiry Detail Modal */}
      {selectedInquiry && (
        <div className="fixed inset-0 z-50 bg-dark/90 backdrop-blur-sm flex items-center justify-center p-6">
          <div className="bg-dark-light rounded-[10px] p-6 w-full max-w-lg max-h-[80vh] overflow-auto">
            <div className="flex items-center justify-between mb-6">
              <h2 className="font-serif text-2xl text-cream">Inquiry Details</h2>
              <button
                onClick={() => setSelectedInquiry(null)}
                className="text-cream/60 hover:text-cream"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            
            <div className="space-y-4">
              <div>
                <label className="text-cream/40 text-sm">Name</label>
                <p className="text-cream">{selectedInquiry.name}</p>
              </div>
              <div>
                <label className="text-cream/40 text-sm">Email</label>
                <p className="text-cream">{selectedInquiry.email}</p>
              </div>
              <div>
                <label className="text-cream/40 text-sm">Phone</label>
                <p className="text-cream">{selectedInquiry.phone || 'Not provided'}</p>
              </div>
              <div>
                <label className="text-cream/40 text-sm">City</label>
                <p className="text-cream">{selectedInquiry.city || 'Not provided'}</p>
              </div>
              <div>
                <label className="text-cream/40 text-sm">Message</label>
                <p className="text-cream whitespace-pre-wrap">{selectedInquiry.message}</p>
              </div>
              <div>
                <label className="text-cream/40 text-sm">Received</label>
                <p className="text-cream">
                  {new Date(selectedInquiry.createdAt).toLocaleString()}
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Add/Edit Product Modal */}
      {(isAddingProduct || editingProduct) && (
        <div className="fixed inset-0 z-50 bg-dark/90 backdrop-blur-sm flex items-center justify-center p-6">
          <div className="bg-dark-light rounded-[10px] p-6 w-full max-w-lg max-h-[80vh] overflow-auto">
            <div className="flex items-center justify-between mb-6">
              <h2 className="font-serif text-2xl text-cream">
                {editingProduct ? 'Edit Product' : 'Add Product'}
              </h2>
              <button
                onClick={() => {
                  setIsAddingProduct(false);
                  setEditingProduct(null);
                }}
                className="text-cream/60 hover:text-cream"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            
            <form onSubmit={handleSaveProduct} className="space-y-4">
              <div>
                <label className="block text-cream/60 text-sm mb-2">Name</label>
                <input
                  type="text"
                  name="name"
                  defaultValue={editingProduct?.name}
                  required
                  className="w-full bg-white/5 border border-cream/20 rounded-lg px-4 py-3 text-cream focus:outline-none focus:border-gold"
                />
              </div>
              
              <div>
                <label className="block text-cream/60 text-sm mb-2">Category</label>
                <select
                  name="category"
                  defaultValue={editingProduct?.category || 'sofas'}
                  className="w-full bg-white/5 border border-cream/20 rounded-lg px-4 py-3 text-cream focus:outline-none focus:border-gold"
                >
                  {categories.map((cat) => (
                    <option key={cat.id} value={cat.id} className="bg-dark">
                      {cat.name}
                    </option>
                  ))}
                </select>
              </div>
              
              <div>
                <label className="block text-cream/60 text-sm mb-2">Price (₹)</label>
                <input
                  type="number"
                  name="price"
                  defaultValue={editingProduct?.price}
                  required
                  className="w-full bg-white/5 border border-cream/20 rounded-lg px-4 py-3 text-cream focus:outline-none focus:border-gold"
                />
              </div>
              
              <div>
                <label className="block text-cream/60 text-sm mb-2">Description</label>
                <textarea
                  name="description"
                  defaultValue={editingProduct?.description}
                  rows={3}
                  className="w-full bg-white/5 border border-cream/20 rounded-lg px-4 py-3 text-cream focus:outline-none focus:border-gold resize-none"
                />
              </div>
              
              <div>
                <label className="block text-cream/60 text-sm mb-2">Image URL</label>
                <input
                  type="text"
                  name="image"
                  defaultValue={editingProduct?.image}
                  className="w-full bg-white/5 border border-cream/20 rounded-lg px-4 py-3 text-cream focus:outline-none focus:border-gold"
                  placeholder="/image.jpg"
                />
              </div>
              
              <div>
                <label className="block text-cream/60 text-sm mb-2">
                  Finishes (comma-separated)
                </label>
                <input
                  type="text"
                  name="finishes"
                  defaultValue={editingProduct?.finishes?.join(', ')}
                  className="w-full bg-white/5 border border-cream/20 rounded-lg px-4 py-3 text-cream focus:outline-none focus:border-gold"
                  placeholder="Beige, Grey, Black"
                />
              </div>
              
              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  name="featured"
                  id="featured"
                  defaultChecked={editingProduct?.featured}
                  className="w-4 h-4 accent-gold"
                />
                <label htmlFor="featured" className="text-cream/60 text-sm">
                  Featured product
                </label>
              </div>
              
              <button type="submit" className="w-full btn-primary">
                {editingProduct ? 'Update Product' : 'Add Product'}
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
