import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useProductStore } from '@/store/useProductStore';
import { useUIStore } from '@/store/useUIStore';
import { useCartStore } from '@/store/useCartStore';

export default function Header() {
    const navigate = useNavigate();
    const location = useLocation();
    const { products } = useProductStore();
    const [searchQuery, setSearchQuery] = useState('');
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [showSuggestions, setShowSuggestions] = useState(false);
    const [isNotificationOpen, setIsNotificationOpen] = useState(false);
    const { openCart } = useUIStore();
    const { items: cartItems } = useCartStore();
    const [isProfileOpen, setIsProfileOpen] = useState(false);
    const [isSparkling, setIsSparkling] = useState(false);
    const searchRef = useRef<HTMLDivElement>(null);
    const profileRef = useRef<HTMLDivElement>(null);

    // Watch for cart changes to trigger spark
    useEffect(() => {
        if (cartItems.length > 0) {
            setIsSparkling(true);
            const timer = setTimeout(() => setIsSparkling(false), 800);
            return () => clearTimeout(timer);
        }
    }, [cartItems.length]);

    const navItems = [
        { label: 'Explore', path: '/explore', icon: '🔍' },
        { label: 'Community', path: '/community', icon: '👥' },
        { label: 'Blog', path: '/blog', icon: '📝' },
        { label: 'Leaderboard', path: '/leaderboard', icon: '🏆' },
    ];

    const secondaryPages = [
        { label: 'About', path: '/about', icon: 'ℹ️' },
        { label: 'Trust', path: '/trust', icon: '🛡️' },
        { label: 'Profile', path: '/profile/pollen', icon: '👤' },
    ];

    // Click outside search and profile suggestions handler
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
                setShowSuggestions(false);
            }
            if (profileRef.current && !profileRef.current.contains(event.target as Node)) {
                setIsProfileOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const getSuggestions = () => {
        const query = searchQuery.trim().toLowerCase();
        if (query.length < 2) return { pages: [], products: [] };

        const matchedPages = [...navItems, ...secondaryPages].filter(page =>
            page.label.toLowerCase().includes(query) ||
            page.path.toLowerCase().includes(query)
        );

        const matchedProducts = products.filter(product =>
            product.name.toLowerCase().includes(query) ||
            product.category.toLowerCase().includes(query) ||
            product.description.toLowerCase().includes(query)
        ).slice(0, 5);

        return { pages: matchedPages, products: matchedProducts };
    };

    const suggestions = getSuggestions();

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        const query = searchQuery.trim().toLowerCase();
        if (!query) return;

        // Check for direct page matches
        const pageMatch = [...navItems, ...secondaryPages].find(item =>
            item.label.toLowerCase() === query ||
            item.path.slice(1).toLowerCase() === query
        );

        if (pageMatch) {
            navigate(pageMatch.path);
            setSearchQuery('');
            setShowSuggestions(false);
            return;
        }

        navigate(`/explore?search=${encodeURIComponent(searchQuery)}`);
        setSearchQuery('');
        setShowSuggestions(false);
    };

    const handleExploreClick = () => {
        // Simple navigation is handled by Link, we just close menu if mobile
        setIsMobileMenuOpen(false);
    };

    return (
        <header className="sticky top-0 z-50 glass border-b border-background-light">
            <div className="container-custom">
                <div className="flex items-center justify-between h-12">
                    {/* Logo + Primary Nav */}
                    <div className="flex items-center gap-10">
                        <Link to="/" className="flex items-start gap-4 group">
                            <div className="text-5xl group-hover:scale-110 transition-transform h-10 flex items-center shrink-0">
                                🤖
                            </div>
                            <div className="flex flex-col">
                                <span className="font-heading font-black text-3xl text-primary leading-[1.2] lowercase tracking-tighter">
                                    machbar<span className="text-[0.5em] tracking-wide ml-0.5 align-baseline">.io</span>
                                </span>
                                <span className="text-[9px] font-mono text-trust-dark font-bold tracking-[0.2em] animate-pulse opacity-40 uppercase -mt-1 ml-0.5">
                                    ... launching soon
                                </span>
                            </div>
                        </Link>

                        <nav className="hidden md:flex items-center gap-6">
                            {navItems.map((item) => (
                                <Link
                                    key={item.path}
                                    to={item.path}
                                    className="text-sm font-medium text-charcoal/70 hover:text-primary transition-colors"
                                >
                                    {item.label}
                                </Link>
                            ))}
                        </nav>
                    </div>

                    {/* Center Search Bar */}
                    <div className="hidden lg:block flex-1 max-w-2xl mx-8 relative" ref={searchRef}>
                        <form onSubmit={handleSearch}>
                            <div className="relative">
                                <input
                                    type="text"
                                    value={searchQuery}
                                    onChange={(e) => {
                                        setSearchQuery(e.target.value);
                                        setShowSuggestions(true);
                                    }}
                                    onFocus={() => setShowSuggestions(true)}
                                    placeholder="Ask anything you want to do with smart products..."
                                    className="w-full px-4 py-2 pl-10 pr-4 rounded-xl border border-background-light bg-secondary/50 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary text-sm text-charcoal transition-all"
                                />
                                <svg
                                    className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-charcoal/40"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                                    />
                                </svg>
                            </div>
                        </form>

                        {/* Search Suggestions Dropdown */}
                        <AnimatePresence>
                            {showSuggestions && (searchQuery.length >= 2) && (suggestions.pages.length > 0 || suggestions.products.length > 0) && (
                                <motion.div
                                    initial={{ opacity: 0, y: 10, scale: 0.98 }}
                                    animate={{ opacity: 1, y: 0, scale: 1 }}
                                    exit={{ opacity: 0, y: 10, scale: 0.98 }}
                                    className="absolute top-full left-0 right-0 mt-2 bg-white/95 backdrop-blur-md rounded-2xl border border-background-light shadow-2xl overflow-hidden z-[100] max-h-[70vh] flex flex-col"
                                >
                                    <div className="p-2 overflow-y-auto custom-scrollbar">
                                        {suggestions.pages.length > 0 && (
                                            <div className="mb-4">
                                                <div className="px-3 py-1.5 text-[10px] font-bold text-charcoal/40 uppercase tracking-widest">Pages</div>
                                                {suggestions.pages.map((page) => (
                                                    <button
                                                        key={page.path}
                                                        onClick={() => {
                                                            navigate(page.path);
                                                            setShowSuggestions(false);
                                                            setSearchQuery('');
                                                        }}
                                                        className="w-full text-left px-3 py-2.5 hover:bg-background-light rounded-xl transition-all flex items-center gap-3 group"
                                                    >
                                                        <span className="w-8 h-8 rounded-lg bg-secondary/50 flex items-center justify-center text-sm group-hover:scale-110 transition-transform">
                                                            {page.icon}
                                                        </span>
                                                        <div>
                                                            <div className="text-sm font-bold text-primary">{page.label}</div>
                                                            <div className="text-[10px] text-charcoal/40 font-mono tracking-tight">{page.path}</div>
                                                        </div>
                                                    </button>
                                                ))}
                                            </div>
                                        )}

                                        {suggestions.products.length > 0 && (
                                            <div>
                                                <div className="px-3 py-1.5 text-[10px] font-bold text-charcoal/40 uppercase tracking-widest">Products</div>
                                                {suggestions.products.map((product) => (
                                                    <button
                                                        key={product.id}
                                                        onClick={() => {
                                                            navigate(`/products/${product.slug}`);
                                                            setShowSuggestions(false);
                                                            setSearchQuery('');
                                                        }}
                                                        className="w-full text-left px-3 py-2.5 hover:bg-background-light rounded-xl transition-all flex items-center gap-3 group"
                                                    >
                                                        <div className="w-10 h-10 rounded-lg bg-background border border-background-light flex items-center justify-center overflow-hidden shrink-0">
                                                            {product.images[0]?.startsWith('http') || product.images[0]?.startsWith('/') ? (
                                                                <img src={product.images[0]} alt={product.name} className="w-full h-full object-cover" />
                                                            ) : (
                                                                <span className="text-xl">{product.images[0] || '📦'}</span>
                                                            )}
                                                        </div>
                                                        <div className="min-w-0 flex-1">
                                                            <div className="text-sm font-bold text-primary truncate group-hover:text-accent transition-colors">{product.name}</div>
                                                            <div className="flex items-center gap-2">
                                                                <span className="text-[10px] text-charcoal/40 font-bold uppercase tracking-wider">{product.category}</span>
                                                                <span className="w-1 h-1 rounded-full bg-charcoal/10"></span>
                                                                <span className="text-[10px] text-accent font-bold">{product.upvotes} pts</span>
                                                            </div>
                                                        </div>
                                                    </button>
                                                ))}
                                            </div>
                                        )}
                                    </div>

                                    <button
                                        onClick={handleSearch}
                                        className="p-3 bg-secondary/30 hover:bg-secondary/50 border-t border-background-light text-xs font-bold text-primary flex items-center justify-center gap-2 group transition-colors"
                                    >
                                        Search all results for "{searchQuery}"
                                        <span className="group-hover:translate-x-1 transition-transform">→</span>
                                    </button>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>

                    {/* Right Section */}
                    <div className="flex items-center gap-4">
                        {/* Notifications */}
                        <div className="relative">
                            <button
                                onClick={() => setIsNotificationOpen(!isNotificationOpen)}
                                className="p-2 hover:bg-background-light rounded-lg transition-colors hidden md:block group"
                            >
                                <svg
                                    className="w-5 h-5 text-charcoal/70 group-hover:text-primary"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
                                    />
                                </svg>
                                <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-accent rounded-full border-2 border-white"></span>
                            </button>

                            <AnimatePresence>
                                {isNotificationOpen && (
                                    <>
                                        <div
                                            className="fixed inset-0 z-10"
                                            onClick={() => setIsNotificationOpen(false)}
                                        />
                                        <motion.div
                                            initial={{ opacity: 0, y: 10, scale: 0.95 }}
                                            animate={{ opacity: 1, y: 0, scale: 1 }}
                                            exit={{ opacity: 0, y: 10, scale: 0.95 }}
                                            className="absolute right-0 mt-2 w-80 bg-white rounded-3xl shadow-2xl border border-background-light overflow-hidden z-20"
                                        >
                                            <div className="p-4 border-b border-background-light flex items-center justify-between">
                                                <h3 className="font-bold text-primary">Notifications</h3>
                                                <span className="text-[10px] font-bold text-accent uppercase">2 New</span>
                                            </div>
                                            <div className="max-h-96 overflow-y-auto custom-scrollbar">
                                                {[
                                                    { id: 1, text: 'ZynthAI just launched "Neural Synth V2"', time: '2m ago', icon: '🚀', type: 'launch' },
                                                    { id: 2, text: 'New update available for "Smart Desk" kit.', time: '1h ago', icon: '📦', type: 'update' },
                                                    { id: 3, text: 'Creator "Pollen" bookmarked your contribution!', time: '5h ago', icon: '⭐', type: 'bookmark' },
                                                ].map((notif) => (
                                                    <div key={notif.id} className="p-4 hover:bg-secondary/20 transition-colors cursor-pointer border-b border-background-light last:border-0">
                                                        <div className="flex gap-3">
                                                            <span className="text-xl shrink-0">{notif.icon}</span>
                                                            <div className="min-w-0">
                                                                <p className="text-sm text-charcoal/80 leading-snug">{notif.text}</p>
                                                                <p className="text-[10px] text-charcoal/40 font-bold mt-1 uppercase">{notif.time}</p>
                                                            </div>
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>
                                            <button className="w-full py-3 text-xs font-bold text-primary/40 hover:text-primary transition-colors bg-background-light/30">
                                                View all notifications
                                            </button>
                                        </motion.div>
                                    </>
                                )}
                            </AnimatePresence>
                        </div>

                        {/* Cart */}
                        <motion.button
                            onClick={openCart}
                            animate={isSparkling ? {
                                scale: [1, 1.2, 1],
                                transition: { duration: 0.3 }
                            } : {}}
                            className="p-3 hover:bg-background-light rounded-xl transition-colors hidden md:block group relative border border-transparent hover:border-background-light"
                        >
                            <svg className="w-5 h-5 text-charcoal/70 group-hover:text-primary transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                            </svg>
                            {cartItems.length > 0 && (
                                <span className="absolute top-1.5 right-1.5 w-4 h-4 bg-accent text-white text-[9px] font-black rounded-full flex items-center justify-center shadow-lg border-2 border-white">
                                    {cartItems.length}
                                </span>
                            )}
                            {isSparkling && (
                                <motion.span
                                    initial={{ opacity: 0, scale: 0 }}
                                    animate={{ opacity: 1, scale: 1.5, rotate: 45 }}
                                    exit={{ opacity: 0, scale: 0 }}
                                    className="absolute -top-1 -right-1 text-xs"
                                >
                                    ✨
                                </motion.span>
                            )}
                        </motion.button>

                        {/* Profile/Login Combined */}
                        <div className="relative hidden md:block" ref={profileRef}>
                            <button
                                onClick={() => setIsProfileOpen(!isProfileOpen)}
                                className="p-2 hover:bg-background-light rounded-xl transition-colors group border border-transparent hover:border-background-light"
                            >
                                <svg className="w-5 h-5 text-charcoal/70 group-hover:text-primary transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                </svg>
                            </button>

                            <AnimatePresence>
                                {isProfileOpen && (
                                    <motion.div
                                        initial={{ opacity: 0, y: 10, scale: 0.95 }}
                                        animate={{ opacity: 1, y: 0, scale: 1 }}
                                        exit={{ opacity: 0, y: 10, scale: 0.95 }}
                                        className="absolute right-0 mt-2 w-32 bg-white rounded-2xl shadow-2xl border border-background-light overflow-hidden z-50 p-1"
                                    >
                                        <div className="space-y-0.5">
                                            {location.pathname.startsWith('/profile/') ? (
                                                <button
                                                    onClick={() => {
                                                        navigate('/');
                                                        setIsProfileOpen(false);
                                                    }}
                                                    className="w-full flex items-center justify-center gap-2 px-3 py-2 hover:bg-black hover:text-white rounded-xl transition-all group font-bold text-xs"
                                                >
                                                    <span className="text-xs">🚪</span>
                                                    Log Out
                                                </button>
                                            ) : (
                                                <>
                                                    <div className="px-3 py-1.5 border-b border-background-light mb-1">
                                                        <p className="text-[9px] font-bold text-charcoal/40 uppercase tracking-widest">Login</p>
                                                    </div>
                                                    <button className="w-full flex items-center gap-2 px-3 py-2 hover:bg-black hover:text-white rounded-xl transition-all group font-bold text-xs">
                                                        <div className="w-6 h-6 rounded-md bg-secondary flex items-center justify-center group-hover:scale-110 transition-transform shrink-0">
                                                            <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24">
                                                                <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
                                                            </svg>
                                                        </div>
                                                        GitHub
                                                    </button>
                                                    <button className="w-full flex items-center gap-2 px-3 py-2 hover:bg-secondary rounded-xl transition-all group font-bold text-xs">
                                                        <div className="w-6 h-6 rounded-md bg-white border border-background-light flex items-center justify-center group-hover:scale-110 transition-transform shrink-0">
                                                            <svg className="w-3.5 h-3.5" viewBox="0 0 24 24">
                                                                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                                                                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                                                                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z" />
                                                                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
                                                            </svg>
                                                        </div>
                                                        Google
                                                    </button>
                                                    <div className="mt-2 pt-1 border-t border-background-light">
                                                        <button
                                                            onClick={() => {
                                                                navigate('/profile/pollen');
                                                                setIsProfileOpen(false);
                                                            }}
                                                            className="w-full text-center py-1.5 text-[8px] font-bold text-charcoal/40 hover:text-primary uppercase tracking-widest"
                                                        >
                                                            Public Profile
                                                        </button>
                                                    </div>
                                                </>
                                            )}
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>

                        {/* Mobile Menu Toggle */}
                        <button
                            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                            className="md:hidden p-2 hover:bg-background-light rounded-lg"
                        >
                            <svg
                                className="w-6 h-6 text-charcoal"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                {isMobileMenuOpen ? (
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M6 18L18 6M6 6l12 12"
                                    />
                                ) : (
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M4 6h16M4 12h16M4 18h16"
                                    />
                                )}
                            </svg>
                        </button>
                    </div>
                </div>

                {/* Mobile Menu */}
                <motion.div
                    initial={false}
                    animate={{ height: isMobileMenuOpen ? 'auto' : 0 }}
                    className="md:hidden overflow-hidden overflow-y-auto"
                >
                    <div className="py-4 border-t border-background-light">
                        <nav className="flex flex-col gap-4">
                            {navItems.map((item) => (
                                <Link
                                    key={item.path}
                                    to={item.path}
                                    onClick={handleExploreClick}
                                    className="text-sm font-medium text-charcoal/70 hover:text-primary transition-colors"
                                >
                                    {item.label}
                                </Link>
                            ))}
                            <button
                                onClick={() => {
                                    openCart();
                                    setIsMobileMenuOpen(false);
                                }}
                                className="text-left text-sm font-medium text-charcoal/70 hover:text-primary transition-colors"
                            >
                                Cart
                            </button>
                            <Link
                                to="/login"
                                onClick={() => setIsMobileMenuOpen(false)}
                                className="text-sm font-medium text-charcoal/70 hover:text-primary transition-colors"
                            >
                                Profile
                            </Link>
                        </nav>
                    </div>
                </motion.div>
            </div>
        </header>
    );
}
