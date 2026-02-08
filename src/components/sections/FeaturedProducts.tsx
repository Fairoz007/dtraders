import { useQuery } from "convex/react";
import { api } from "../../../convex/_generated/api";
import { ShoppingBag, ArrowRight } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { toast } from "sonner";
import { Link } from "react-router-dom";

export function FeaturedProducts() {
    const products = useQuery(api.products.list, { onlyActive: true, onlyFeatured: true });
    const { addToCart } = useCart();

    const handleAddToCart = (product: any) => {
        addToCart({
            ...product,
            _id: product._id,
            id: product._id, // Add id for backward compatibility
            image: product.imageUrl
        });
        toast.success(`${product.name} added to cart!`);
    };

    if (!products || products.length === 0) {
        return null;
    }

    return (
        <section id="featured" className="py-20 lg:py-32 bg-white">
            <div className="px-6 lg:px-[6vw]">
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
                    <div>
                        <span className="font-mono text-xs uppercase tracking-[0.2em] text-gold mb-4 block">
                            Curated Selection
                        </span>
                        <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl text-foreground max-w-2xl leading-tight">
                            Featured Pieces
                        </h2>
                    </div>
                    <Link
                        to="/products"
                        className="group flex items-center gap-2 text-sm uppercase tracking-widest font-medium text-foreground hover:text-gold transition-colors"
                    >
                        View All Collection
                        <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </Link>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
                    {products.map((product) => (
                        <div key={product._id} className="group">
                            <div className="relative aspect-[4/5] overflow-hidden bg-muted rounded-2xl mb-6">
                                {product.imageUrl ? (
                                    <img
                                        src={product.imageUrl}
                                        alt={product.name}
                                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                                    />
                                ) : (
                                    <div className="w-full h-full flex items-center justify-center text-foreground/10 uppercase tracking-widest text-xs font-medium">
                                        No Image
                                    </div>
                                )}

                                <div className="absolute inset-0 bg-black/5 opacity-0 group-hover:opacity-100 transition-opacity" />

                                <button
                                    onClick={() => handleAddToCart(product)}
                                    className="absolute bottom-6 right-6 w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-xl opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300 hover:bg-gold hover:text-white"
                                >
                                    <ShoppingBag className="w-5 h-5" />
                                </button>
                            </div>

                            <div>
                                <div className="flex items-start justify-between mb-2">
                                    <h3 className="font-serif text-2xl text-foreground">{product.name}</h3>
                                    <p className="font-mono text-sm text-gold mt-1">₹ {product.price.toLocaleString()}</p>
                                </div>
                                <p className="text-foreground/50 text-sm line-clamp-2 leading-relaxed max-w-[90%]">
                                    {product.description}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
