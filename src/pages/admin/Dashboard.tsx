import { useQuery } from "convex/react";
import { api } from "../../../convex/_generated/api";
import { Package, Inbox, TrendingUp, Users } from "lucide-react";

export function AdminDashboard() {
    const products = useQuery(api.products.list, {});
    const inquiries = useQuery(api.inquiries.list);

    const stats = [
        { label: "Total Products", value: products?.length || 0, icon: Package, color: "text-blue-400", bg: "bg-blue-400/10" },
        { label: "New Inquiries", value: inquiries?.length || 0, icon: Inbox, color: "text-gold", bg: "bg-gold/10" },
        { label: "Revenue", value: "₹ 4.5L", icon: TrendingUp, color: "text-green-400", bg: "bg-green-400/10" },
        { label: "Customers", value: 128, icon: Users, color: "text-purple-400", bg: "bg-purple-400/10" },
    ];

    return (
        <div className="space-y-12">
            <header>
                <h1 className="font-serif text-4xl lg:text-5xl text-foreground mb-2">Overview</h1>
                <p className="text-foreground/40">Welcome back. Here's what's happening with D-Traders today.</p>
            </header>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {stats.map((stat) => (
                    <div key={stat.label} className="bg-white border border-border shadow-sm rounded-2xl p-6 hover:shadow-md transition-all group">
                        <div className={`w-12 h-12 rounded-xl ${stat.bg} ${stat.color} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}>
                            <stat.icon className="w-6 h-6" />
                        </div>
                        <p className="text-muted-foreground text-sm font-medium uppercase tracking-wider mb-1">{stat.label}</p>
                        <p className="text-3xl font-serif text-foreground">{stat.value}</p>
                    </div>
                ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Recent Inquiries Preview */}
                <div className="bg-white border border-border shadow-sm rounded-2xl p-8">
                    <div className="flex items-center justify-between mb-8">
                        <h2 className="font-serif text-2xl text-foreground">Recent Inquiries</h2>
                        <button className="text-gold text-sm font-medium hover:underline">View All</button>
                    </div>
                    <div className="space-y-6">
                        {!inquiries ? (
                            <div className="animate-pulse space-y-4">
                                {[1, 2, 3].map(i => <div key={i} className="h-20 bg-muted rounded-xl" />)}
                            </div>
                        ) : inquiries.length === 0 ? (
                            <p className="text-muted-foreground text-center py-10 italic">No inquiries yet.</p>
                        ) : (
                            inquiries.slice(0, 5).map((inquiry) => (
                                <div key={inquiry._id} className="flex items-start gap-4 p-4 rounded-xl hover:bg-muted transition-colors border border-transparent hover:border-border">
                                    <div className="w-10 h-10 rounded-full bg-gold/10 flex items-center justify-center text-gold font-bold">
                                        {inquiry.name?.[0] || 'I'}
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <p className="text-foreground font-medium truncate">{inquiry.name}</p>
                                        <p className="text-muted-foreground text-sm truncate mb-2">{inquiry.message}</p>
                                        <p className="text-[10px] text-muted-foreground/60 uppercase tracking-widest">
                                            {new Date(inquiry.createdAt).toLocaleDateString()}
                                        </p>
                                    </div>
                                </div>
                            ))
                        )}
                    </div>
                </div>

                {/* System Health / Quick Actions */}
                <div className="bg-white border border-border shadow-sm rounded-2xl p-8">
                    <h2 className="font-serif text-2xl text-foreground mb-8">Quick Actions</h2>
                    <div className="grid grid-cols-2 gap-4">
                        <button className="p-6 rounded-xl bg-white border border-border text-left hover:bg-gold/5 hover:border-gold/20 transition-all group shadow-sm">
                            <Package className="w-6 h-6 text-gold mb-3 group-hover:scale-110 transition-transform" />
                            <p className="text-foreground font-medium">Add Product</p>
                            <p className="text-xs text-muted-foreground mt-1">Upload new inventory</p>
                        </button>
                        <button className="p-6 rounded-xl bg-white border border-border text-left hover:bg-blue-50 hover:border-blue-200 transition-all group shadow-sm">
                            <Inbox className="w-6 h-6 text-blue-400 mb-3 group-hover:scale-110 transition-transform" />
                            <p className="text-foreground font-medium">Messages</p>
                            <p className="text-xs text-muted-foreground mt-1">Check notifications</p>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
