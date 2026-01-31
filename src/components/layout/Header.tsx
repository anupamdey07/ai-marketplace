import { Link, useNavigate } from 'react-router-dom';
import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useProductStore } from '@/store/useProductStore';

export default function Header() {
    const navigate = useNavigate();
    const { products } = useProductStore();
    const [searchQuery, setSearchQuery] = useState('');
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [showSuggestions, setShowSuggestions] = useState(false);
    const searchRef = useRef<HTMLDivElement>(null);

    const navItems = [
        { label: 'Explore', path: '/explore', icon: '🔍' },
        { label: 'Community', path: '/community', icon: '👥' },
        { label: 'Blog', path: '/blog', icon: '📝' },
        { label: 'Leaderboard', path: '/leaderboard', icon: '🏆' },
    ];

    const secondaryPages = [
        { label: 'About', path: '/about', icon: 'ℹ️' },
        { label: 'Trust', path: '/trust', icon: '🛡️' },
        { label: 'Cart', path: '/cart', icon: '🛒' },
        { label: 'Profile', path: '/profile/pollen', icon: '👤' },
    ];

    // Click outside search suggestions handler
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
                setShowSuggestions(false);
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
                <div className="flex items-center justify-between h-20">
                    {/* Logo + Primary Nav */}
                    <div className="flex items-center gap-10">
                        <Link to="/" className="flex items-start gap-4 group">
                            <div className="text-5xl group-hover:scale-110 transition-transform h-10 flex items-center shrink-0">
                                🤖
                            </div>
                            <div className="flex flex-col">
                                <span className="font-heading font-black text-3xl text-primary leading-[1.2] lowercase tracking-tighter">
                                    machbar.io
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
                        <button className="p-2 hover:bg-background-light rounded-lg transition-colors hidden md:block group">
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
                        </button>

                        {/* Cart */}
                        <button
                            onClick={() => navigate('/cart')}
                            className="p-2 hover:bg-background-light rounded-lg transition-colors hidden md:block group"
                        >
                            <svg className="w-5 h-5 text-charcoal/70 group-hover:text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                            </svg>
                        </button>

                        {/* Profile */}
                        <button
                            onClick={() => navigate('/profile/pollen')}
                            className="p-2 hover:bg-background-light rounded-lg transition-colors hidden md:block group"
                        >
                            <svg className="w-5 h-5 text-charcoal/70 group-hover:text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                            </svg>
                        </button>

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
                            <Link
                                to="/cart"
                                onClick={() => setIsMobileMenuOpen(false)}
                                className="text-sm font-medium text-charcoal/70 hover:text-primary transition-colors"
                            >
                                Cart
                            </Link>
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
