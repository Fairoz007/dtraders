import { X, Trash2, Plus, Minus, MessageCircle } from 'lucide-react';
import { useCart } from '@/context/CartContext';
import { toast } from 'sonner';

interface CartSheetProps {
    isOpen: boolean;
    onClose: () => void;
}

export function CartSheet({ isOpen, onClose }: CartSheetProps) {
    const { cart, removeFromCart, updateQuantity, totalPrice, totalItems } = useCart();

    const handleCheckout = () => {
        if (cart.length === 0) return;

        const phoneNumber = '918086674502';
        const message = `Halo, I would like to order the following items from Dtraders:\n\n${cart
            .map(
                (item) =>
                    `* ${item.name} (${item.code})\n  Qty: ${item.quantity}\n  Price: ₹${(
                        item.price * item.quantity
                    ).toLocaleString()}`
            )
            .join('\n\n')}\n\n*Total Amount: ₹${totalPrice.toLocaleString()}*`;

        const encodedMessage = encodeURIComponent(message);
        const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;

        window.open(whatsappUrl, '_blank');
        toast.success('Redirecting to WhatsApp...');
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-[100] overflow-hidden">
            <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose} />
            <div className="absolute inset-y-0 right-0 max-w-full flex">
                <div className="w-screen max-w-md bg-white shadow-2xl flex flex-col">
                    <div className="flex items-center justify-between px-6 py-6 border-b border-border">
                        <h2 className="font-serif text-2xl text-foreground">Your Cart ({totalItems})</h2>
                        <button onClick={onClose} className="p-2 text-muted-foreground hover:text-foreground">
                            <X className="w-6 h-6" />
                        </button>
                    </div>

                    <div className="flex-1 overflow-y-auto p-6 space-y-6">
                        {cart.length === 0 ? (
                            <div className="h-full flex flex-col items-center justify-center text-center space-y-4">
                                <div className="w-16 h-16 rounded-full bg-muted flex items-center justify-center text-muted-foreground">
                                    <MessageCircle className="w-8 h-8" />
                                </div>
                                <div>
                                    <h3 className="text-lg font-medium text-foreground">Your cart is empty</h3>
                                    <p className="text-muted-foreground">Browse our collection to add items.</p>
                                </div>
                            </div>
                        ) : (
                            cart.map((item) => (
                                <div key={item.id} className="flex gap-4 group">
                                    <div className="w-24 h-24 rounded-xl overflow-hidden bg-muted flex-shrink-0">
                                        <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <div className="flex items-start justify-between mb-1">
                                            <div>
                                                <h4 className="font-serif text-lg text-foreground truncate">{item.name}</h4>
                                                <p className="text-[10px] font-mono text-muted-foreground uppercase">{item.code}</p>
                                            </div>
                                            <button
                                                onClick={() => removeFromCart(item.id)}
                                                className="p-1 text-muted-foreground hover:text-red-500 transition-colors"
                                            >
                                                <Trash2 className="w-4 h-4" />
                                            </button>
                                        </div>
                                        <p className="text-gold font-mono text-sm mb-3">₹ {item.price.toLocaleString()}</p>
                                        <div className="flex items-center gap-3">
                                            <div className="flex items-center border border-border rounded-lg px-2 py-1">
                                                <button
                                                    onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                                    className="p-1 text-muted-foreground hover:text-foreground"
                                                >
                                                    <Minus className="w-3 h-3" />
                                                </button>
                                                <span className="w-8 text-center text-sm font-medium">{item.quantity}</span>
                                                <button
                                                    onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                                    className="p-1 text-muted-foreground hover:text-foreground"
                                                >
                                                    <Plus className="w-3 h-3" />
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))
                        )}
                    </div>

                    {cart.length > 0 && (
                        <div className="p-6 border-t border-border bg-muted/30">
                            <div className="flex items-center justify-between mb-6">
                                <span className="text-muted-foreground">Total Amount</span>
                                <span className="text-2xl font-serif text-foreground">₹ {totalPrice.toLocaleString()}</span>
                            </div>
                            <button
                                onClick={handleCheckout}
                                className="w-full btn-primary h-14 flex items-center justify-center gap-3 text-lg"
                            >
                                <MessageCircle className="w-6 h-6" />
                                Order via WhatsApp
                            </button>
                            <p className="mt-4 text-center text-xs text-muted-foreground">
                                Clicking will redirect you to WhatsApp with your order details.
                            </p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
