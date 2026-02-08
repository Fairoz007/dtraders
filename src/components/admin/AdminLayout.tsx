import type { ReactNode } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { LayoutDashboard, Package, LogOut, ArrowLeft } from "lucide-react";
import { useClerk, SignInButton, useAuth } from "@clerk/clerk-react";

interface AdminLayoutProps {
    children: ReactNode;
}

export function AdminLayout({ children }: AdminLayoutProps) {
    const { signOut } = useClerk();
    const { isLoaded: isClerkLoaded, isSignedIn } = useAuth();
    const location = useLocation();
    const navigate = useNavigate();

    if (!isClerkLoaded) {
        return (
            <div className="min-h-screen bg-background flex items-center justify-center">
                <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-gold"></div>
            </div>
        );
    }

    if (!isSignedIn) {
        return (
            <div className="min-h-screen bg-background flex flex-col items-center justify-center px-6 text-center">
                <div className="w-20 h-20 bg-gold/10 rounded-full flex items-center justify-center mb-8">
                    <LogOut className="w-10 h-10 text-gold" />
                </div>
                <h1 className="font-serif text-4xl text-foreground mb-4">Admin Access</h1>
                <p className="text-foreground/60 mb-8 max-w-md"> Please sign in to access the dashboard.</p>
                <SignInButton mode="modal"><button className="btn-primary">Sign In</button></SignInButton>
            </div>
        );
    }

    const navItems = [
        { label: "Dashboard", icon: LayoutDashboard, path: "/admin" },
        { label: "Products", icon: Package, path: "/admin/products" },
    ];

    return (
        <div className="min-h-screen bg-background text-foreground flex">
            {/* Sidebar - always visible if signed in through Clerk */}
            <aside className="hidden lg:flex w-72 flex-col border-r border-border bg-card sticky top-0 h-screen">
                <div className="p-8">
                    <Link to="/" className="flex items-center gap-2 text-gold/60 hover:text-gold transition-colors">
                        <ArrowLeft className="w-4 h-4" />
                        <span className="text-[10px] font-bold uppercase tracking-widest">Back to Site</span>
                    </Link>
                    <h1 className="font-serif text-2xl text-foreground mt-8">Admin</h1>
                    <div className="h-0.5 w-8 bg-gold mt-2"></div>
                </div>

                <nav className="flex-1 px-4 space-y-1.5 mt-8">
                    {navItems.map((item) => {
                        const isActive = location.pathname === item.path;
                        return (
                            <Link
                                key={item.label}
                                to={item.path}
                                className={`flex items-center gap-3 px-6 py-3.5 rounded-xl transition-all duration-300 ${isActive
                                    ? "bg-gold/10 text-gold border border-gold/10 shadow-[0_0_20px_rgba(212,175,55,0.05)]"
                                    : "text-muted-foreground hover:text-foreground hover:bg-muted"
                                    }`}
                            >
                                <item.icon className={`w-5 h-5 ${isActive ? "text-gold" : "opacity-40"}`} />
                                <span className="font-medium tracking-tight text-sm">{item.label}</span>
                            </Link>
                        );
                    })}
                </nav>

                <div className="p-4 mt-auto border-t border-border">
                    <button
                        onClick={() => signOut().then(() => navigate("/"))}
                        className="flex items-center gap-3 w-full px-6 py-3.5 text-muted-foreground hover:text-red-500 hover:bg-red-50 rounded-xl transition-all duration-300 group"
                    >
                        <LogOut className="w-5 h-5 opacity-40 group-hover:opacity-100" />
                        <span className="font-medium text-sm">Sign Out</span>
                    </button>
                </div>
            </aside>

            {/* Main Content Area - Rendered immediately for signed-in users */}
            <main className="flex-1 min-w-0 pt-24 lg:pt-0">
                <div className="max-w-6xl mx-auto p-6 lg:p-12 min-h-screen">
                    {children}
                </div>
            </main>
        </div>
    );
}

