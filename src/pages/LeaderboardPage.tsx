import { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useProductStore } from '@/store/useProductStore';

export default function LeaderboardPage() {
    const navigate = useNavigate();
    const { products, upvoteProduct } = useProductStore();
    const [timeframe, setTimeframe] = useState<'This Week' | 'All Time'>('This Week');
    const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
    const [isTimeDropdownOpen, setIsTimeDropdownOpen] = useState(false);
    const [isCategoryDropdownOpen, setIsCategoryDropdownOpen] = useState(false);
    const timeDropdownRef = useRef<HTMLDivElement>(null);
    const categoryDropdownRef = useRef<HTMLDivElement>(null);

    // Close dropdowns when clicking outside
    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (timeDropdownRef.current && !timeDropdownRef.current.contains(event.target as Node)) {
                setIsTimeDropdownOpen(false);
            }
            if (categoryDropdownRef.current && !categoryDropdownRef.current.contains(event.target as Node)) {
                setIsCategoryDropdownOpen(false);
            }
        }

        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const filterOptions: string[] = [
        'All Categories',
        'Programmable Robotics',
        'Physical prompt boxes',
        'Custom 3D Printed Dropship',
        'Consumer 3D Printers',
        '3D Printed Products',
        'Assistant Boxes',
        'Spiritual Companions',
        'Kids Learning Tools',
        'Voice Assistants'
    ];

    const toggleCategory = (cat: string) => {
        if (cat === 'All Categories') {
            setSelectedCategories([]);
        } else {
            setSelectedCategories(prev => {
                const newSelection = prev.includes(cat)
                    ? prev.filter(c => c !== cat)
                    : [...prev, cat];
                return newSelection;
            });
        }
    };

    const filteredProducts = products.filter(p =>
        selectedCategories.length === 0 ||
        selectedCategories.includes(p.category) ||
        (p.subCategory && selectedCategories.includes(p.subCategory))
    );

    return (
        <div className="bg-background min-h-screen py-20">
            <div className="container-custom">
                <div className="flex flex-col md:flex-row justify-between items-end gap-6 mb-12">
                    <div className="max-w-2xl">
                        <span className="text-accent font-bold tracking-widest uppercase text-sm mb-4 block">Community Rankings</span>
                        <h1 className="font-heading text-5xl font-bold text-primary mb-6">
                            Smart Product Leaderboard
                        </h1>
                        <p className="text-xl text-charcoal/70">
                            The definitive list of hardware projects with real traction, ranked by the community.
                            New products are reset every Monday.
                        </p>
                    </div>

                    <div className="flex gap-4">
                        {/* Timeframe Dropdown */}
                        <div className="relative" ref={timeDropdownRef}>
                            <button
                                onClick={() => {
                                    setIsTimeDropdownOpen(!isTimeDropdownOpen);
                                    setIsCategoryDropdownOpen(false);
                                }}
                                className="flex items-center gap-2 px-6 py-3 bg-white rounded-2xl border border-background-light text-sm font-bold text-primary hover:border-primary/20 transition-all shadow-sm active:scale-95"
                            >
                                {timeframe}
                                <svg className={`w-4 h-4 transition-transform ${isTimeDropdownOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M19 9l-7 7-7-7" />
                                </svg>
                            </button>

                            <AnimatePresence>
                                {isTimeDropdownOpen && (
                                    <motion.div
                                        initial={{ opacity: 0, y: 10, scale: 0.95 }}
                                        animate={{ opacity: 1, y: 0, scale: 1 }}
                                        exit={{ opacity: 0, y: 10, scale: 0.95 }}
                                        className="absolute right-0 mt-2 w-48 bg-white rounded-2xl shadow-xl border border-background-light overflow-hidden z-50 p-2"
                                    >
                                        {['This Week', 'All Time'].map((option) => (
                                            <button
                                                key={option}
                                                onClick={() => {
                                                    setTimeframe(option as any);
                                                    setIsTimeDropdownOpen(false);
                                                }}
                                                className={`w-full text-left px-4 py-2.5 rounded-xl text-sm font-bold transition-colors ${timeframe === option ? 'bg-primary text-secondary' : 'text-charcoal/60 hover:bg-background-light'}`}
                                            >
                                                {option}
                                            </button>
                                        ))}
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>

                        {/* Category Dropdown */}
                        <div className="relative" ref={categoryDropdownRef}>
                            <button
                                onClick={() => {
                                    setIsCategoryDropdownOpen(!isCategoryDropdownOpen);
                                    setIsTimeDropdownOpen(false);
                                }}
                                className="flex items-center gap-2 px-6 py-3 bg-white rounded-2xl border border-background-light text-sm font-bold text-primary hover:border-primary/20 transition-all shadow-sm active:scale-95"
                            >
                                {selectedCategories.length === 0
                                    ? 'All Categories'
                                    : selectedCategories.length === 1
                                        ? selectedCategories[0]
                                        : `${selectedCategories.length} Categories`}
                                <svg className={`w-4 h-4 transition-transform ${isCategoryDropdownOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M19 9l-7 7-7-7" />
                                </svg>
                            </button>

                            <AnimatePresence>
                                {isCategoryDropdownOpen && (
                                    <motion.div
                                        initial={{ opacity: 0, y: 10, scale: 0.95 }}
                                        animate={{ opacity: 1, y: 0, scale: 1 }}
                                        exit={{ opacity: 0, y: 10, scale: 0.95 }}
                                        className="absolute right-0 mt-2 w-56 bg-white rounded-2xl shadow-xl border border-background-light overflow-hidden z-50 p-2"
                                    >
                                        <div className="max-h-64 overflow-y-auto custom-scrollbar">
                                            {filterOptions.map((cat) => {
                                                const isSelected = cat === 'All Categories'
                                                    ? selectedCategories.length === 0
                                                    : selectedCategories.includes(cat);

                                                return (
                                                    <button
                                                        key={cat}
                                                        onClick={() => toggleCategory(cat)}
                                                        className={`w-full text-left px-4 py-2.5 rounded-xl text-sm font-bold transition-colors mb-1 last:mb-0 flex items-center justify-between ${isSelected ? 'bg-primary text-secondary' : 'text-charcoal/60 hover:bg-background-light'}`}
                                                    >
                                                        <span>{cat}</span>
                                                        {isSelected && (
                                                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                                                            </svg>
                                                        )}
                                                    </button>
                                                );
                                            })}
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>
                    </div>
                </div>

                <div className="bg-white rounded-[40px] shadow-soft border border-background-light overflow-hidden">
                    <div className="hidden md:grid grid-cols-[80px_1fr_150px_100px] gap-4 px-6 py-3 bg-secondary/30 border-b border-background-light text-[10px] font-bold text-primary/60 uppercase tracking-widest">
                        <div className="text-center">Rank</div>
                        <div>Product</div>
                        <div className="text-center">Points</div>
                        <div className="text-center">Status</div>
                    </div>

                    <div className="divide-y divide-background-light">
                        {filteredProducts.map((product, index) => (
                            <motion.div
                                key={product.id}
                                layout
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                className="hover:bg-background/5 transition-colors group"
                            >
                                <Link
                                    to={`/products/${product.slug}`}
                                    className="px-4 py-2 md:px-6 md:py-3 grid grid-cols-[40px_1fr_70px] md:grid-cols-[80px_1fr_150px_100px] items-center gap-x-3 md:gap-x-4"
                                >
                                    <div className="flex flex-col items-center gap-0.5 md:gap-1">
                                        <span className="text-xs md:text-lg font-bold text-charcoal/20">#{index + 1}</span>
                                        <button
                                            onClick={(e) => {
                                                e.preventDefault();
                                                e.stopPropagation();
                                                upvoteProduct(product.id);
                                            }}
                                            className="p-1 md:p-1.5 hover:bg-secondary rounded-lg transition-colors group/upvote"
                                            aria-label="Upvote"
                                        >
                                            <svg
                                                className="w-3.5 h-3.5 md:w-4 md:h-4 text-charcoal/40 group-hover/upvote:text-accent group-hover/upvote:scale-125 transition-all"
                                                fill="currentColor"
                                                viewBox="0 0 24 24"
                                            >
                                                <path d="M12 4l-8 8h16l-8-8z" />
                                            </svg>
                                        </button>
                                    </div>

                                    <div className="flex gap-2.5 md:gap-4 items-center overflow-hidden">
                                        <div className="w-10 h-10 md:w-14 md:h-14 bg-background rounded-lg md:rounded-xl flex items-center justify-center text-lg md:text-2xl border border-background-light shrink-0 group-hover:scale-105 transition-transform overflow-hidden">
                                            {product.images[0]?.startsWith('http') || product.images[0]?.startsWith('/') ? (
                                                <img src={product.images[0]} alt={product.name} className="w-full h-full object-cover" />
                                            ) : (
                                                product.images[0] || '📦'
                                            )}
                                        </div>
                                        <div className="min-w-0">
                                            <div className="flex flex-col md:flex-row md:items-center gap-0.5 md:gap-2 mb-0.5">
                                                <h3 className="font-heading font-bold text-sm md:text-base text-primary group-hover:text-accent transition-colors truncate">
                                                    {product.name}
                                                </h3>
                                                <span className="inline-block w-fit text-[8px] md:text-[10px] font-bold text-charcoal/40 bg-background-light px-1.5 md:px-2 py-0.5 rounded uppercase tracking-wider">
                                                    {product.category}
                                                </span>
                                            </div>
                                            <div className="flex flex-wrap items-center gap-x-3 gap-y-0.5 text-[10px] md:text-sm text-charcoal/60">
                                                <span className="truncate">by <span className="underline decoration-secondary underline-offset-2 cursor-pointer font-medium hover:text-accent transition-colors">{product.creator.name}</span></span>
                                                <span className={`font-bold ${product.skill_level === 'Beginner' ? 'text-mint' :
                                                    product.skill_level === 'Intermediate' ? 'text-accent' :
                                                        'text-primary'
                                                    }`}>
                                                    {product.skill_level}
                                                </span>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="flex flex-col items-center gap-0">
                                        <span className="text-base md:text-xl font-bold text-primary">{product.upvotes}</span>
                                        <span className="text-[7px] md:text-[9px] font-bold text-charcoal/30 uppercase tracking-widest">Points</span>
                                    </div>

                                    <div className="hidden md:flex justify-center">
                                        {product.status === 'Coming Soon' ? (
                                            <span className="flex items-center gap-1 px-2 py-0.5 bg-yellow-400/10 rounded-full border border-yellow-400/20 whitespace-nowrap">
                                                <span className="w-1 h-1 rounded-full bg-yellow-400"></span>
                                                <span className="text-[9px] font-bold text-yellow-600 uppercase tracking-widest">Coming Soon</span>
                                            </span>
                                        ) : (
                                            <span className="flex items-center gap-1 px-2 py-0.5 bg-emerald-500/10 rounded-full border border-emerald-500/20 whitespace-nowrap">
                                                <span className="w-1 h-1 rounded-full bg-emerald-500 animate-pulse"></span>
                                                <span className="text-[9px] font-bold text-emerald-600 uppercase tracking-widest">Available</span>
                                            </span>
                                        )}
                                    </div>
                                </Link>

                            </motion.div>
                        ))}
                    </div>
                </div>

                <div className="mt-20 text-center">
                    <p className="text-charcoal/40 text-sm mb-6">
                        Want to see your product here? Submit it for verification.
                    </p>
                    <button
                        onClick={() => navigate('/contact')}
                        className="btn-primary px-10 py-4"
                    >
                        Submit a Product
                    </button>
                </div>
            </div >
        </div >
    );
}
