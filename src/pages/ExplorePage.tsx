import { useState, useMemo, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLocation, useParams } from 'react-router-dom';
import { useProductStore } from '@/store/useProductStore';
import ProductCard from '@/components/common/ProductCard';

const FILTERS = ['All', 'Trending', 'New', 'Most Voted'];
const CATEGORIES = [
    'All',
    'Programmable Robotics',
    'Prompt-to-Product',
    '3D Printing Innovation',
    'Assistant Boxes',
    'Kids Learning Tools',
    'Voice Assistants'
];

const SUBCATEGORIES: Record<string, string[]> = {
    'Prompt-to-Product': ['All', 'Physical Boxes', 'Dropship'],
    '3D Printing Innovation': ['All', 'Consumer 3D Printers', '3D Printed Products']
};

export default function ExplorePage() {
    const { products } = useProductStore();
    const { search } = useLocation();
    const { category } = useParams();

    // Parse query params
    const queryParams = new URLSearchParams(search);
    const initialSearch = queryParams.get('search') || '';

    const [searchQuery, setSearchQuery] = useState(initialSearch);
    const [activeFilter, setActiveFilter] = useState('All');
    const [activeSubCategory, setActiveSubCategory] = useState('All');

    const initialCategory = useMemo(() => {
        if (!category) return 'All';
        const decoded = decodeURIComponent(category).replace(/-/g, ' ');
        // Find best match case-insensitive
        const match = CATEGORIES.find(c => c.toLowerCase() === decoded.toLowerCase());
        return match || 'All';
    }, [category]);

    const [activeCategory, setActiveCategory] = useState(initialCategory);

    // Update state if URL changes (e.g. back button)
    useEffect(() => {
        const params = new URLSearchParams(search);
        setSearchQuery(params.get('search') || '');
    }, [search]);

    useEffect(() => {
        if (!category) {
            setActiveCategory('All');
            return;
        }
        const decoded = decodeURIComponent(category).replace(/-/g, ' ');
        const match = CATEGORIES.find(c => c.toLowerCase() === decoded.toLowerCase());
        setActiveCategory(match || 'All');
    }, [category]);

    // Reset subcategory when category changes
    useEffect(() => {
        setActiveSubCategory('All');
    }, [activeCategory]);

    const filteredProducts = useMemo(() => {
        let result = [...products];

        // Search filter
        if (searchQuery) {
            const query = searchQuery.toLowerCase();
            result = result.filter(p =>
                p.name.toLowerCase().includes(query) ||
                p.description.toLowerCase().includes(query) ||
                p.category.toLowerCase().includes(query)
            );
        }

        // Category filter
        if (activeCategory !== 'All') {
            result = result.filter(p => p.category === activeCategory);
        }

        // Subcategory filter
        if (activeSubCategory !== 'All') {
            result = result.filter(p => p.subCategory === activeSubCategory);
        }

        // Sort/Filter logic
        if (activeFilter === 'Trending') {
            result.sort((a, b) => b.upvotes - a.upvotes);
        } else if (activeFilter === 'New') {
            // Sort by launch date (descending)
            result.sort((a, b) => new Date(b.launch_date).getTime() - new Date(a.launch_date).getTime());
        } else if (activeFilter === 'Most Voted') {
            result.sort((a, b) => b.upvotes - a.upvotes);
        }

        return result;
    }, [products, searchQuery, activeFilter, activeCategory, activeSubCategory]);

    return (
        <div className="bg-background min-h-screen py-12">
            <div className="container-custom">
                {/* Header Section - HF Style */}
                <div className="flex flex-col mb-12">
                    <div className="flex items-center gap-3 mb-4">
                        <div className="w-12 h-12 rounded-2xl bg-secondary flex items-center justify-center text-2xl shadow-sm border border-background-light">
                            🧭
                        </div>
                        <h1 className="font-heading text-4xl font-bold text-primary tracking-tight">
                            Explore <span className="text-accent">next-gen consumer products</span>
                            <span className="ml-4 text-lg font-mono text-charcoal/30 font-medium">{filteredProducts.length}</span>
                        </h1>
                    </div>

                    <p className="text-lg text-charcoal/60 max-w-2xl mb-10">
                        Discover the next generation of consumer hardware. Refined, vetted, and ready to inspire your next build.
                    </p>

                    {/* HF Style Command Bar */}
                    <div className="flex flex-col lg:flex-row gap-6 items-stretch lg:items-center">
                        <div className="relative flex-1">
                            <input
                                type="text"
                                placeholder={`Search ${products.length} gadgets...`}
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="w-full px-6 py-4 pl-14 rounded-2xl border border-background-light bg-white focus:outline-none focus:ring-4 focus:ring-primary/5 focus:border-primary transition-all text-charcoal shadow-soft"
                            />
                            <svg
                                className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-charcoal/30"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                            </svg>
                        </div>

                        <div className="flex items-center gap-2 overflow-x-auto pb-2 lg:pb-0 scrollbar-hide">
                            <div className="flex bg-white rounded-2xl border border-background-light p-1 shadow-soft">
                                {FILTERS.map(filter => (
                                    <button
                                        key={filter}
                                        onClick={() => setActiveFilter(filter)}
                                        className={`px-4 py-2 rounded-xl text-sm font-bold transition-all ${activeFilter === filter
                                            ? 'bg-primary text-white shadow-lg'
                                            : 'text-charcoal/40 hover:text-primary hover:bg-background-light'
                                            }`}
                                    >
                                        {filter}
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Category Filter Chips */}
                    <div className="flex flex-wrap gap-2 mt-8">
                        {CATEGORIES.map(cat => (
                            <button
                                key={cat}
                                onClick={() => setActiveCategory(cat)}
                                className={`px-4 py-2 rounded-full text-xs font-bold border transition-all ${activeCategory === cat
                                    ? 'bg-secondary border-primary/20 text-primary shadow-sm'
                                    : 'bg-white border-background-light text-charcoal/40 hover:border-primary/40'
                                    }`}
                            >
                                {cat}
                            </button>
                        ))}
                    </div>

                    {/* SubCategory Filter Chips (Conditional) */}
                    <AnimatePresence>
                        {SUBCATEGORIES[activeCategory] && (
                            <motion.div
                                initial={{ opacity: 0, y: -10 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -10 }}
                                className="flex flex-wrap gap-2 mt-4 pl-4 border-l-2 border-background-light"
                            >
                                {SUBCATEGORIES[activeCategory].map(sub => (
                                    <button
                                        key={sub}
                                        onClick={() => setActiveSubCategory(sub)}
                                        className={`px-3 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-wider border transition-all ${activeSubCategory === sub
                                            ? 'bg-primary text-white border-primary shadow-sm'
                                            : 'bg-white border-background-light text-charcoal/30 hover:text-charcoal hover:border-charcoal/20'
                                            }`}
                                    >
                                        {sub}
                                    </button>
                                ))}
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>

                {/* Product Grid */}
                <motion.div
                    layout
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
                >
                    <AnimatePresence mode="popLayout">
                        {filteredProducts.map((product) => (
                            <ProductCard key={product.id} product={product} />
                        ))}
                    </AnimatePresence>
                </motion.div>

                {filteredProducts.length === 0 && (
                    <div className="py-32 text-center">
                        <div className="text-6xl mb-6">🔍</div>
                        <h3 className="text-2xl font-bold text-primary mb-2">No gadgets found</h3>
                        <p className="text-charcoal/40">Try adjusting your filters or search terms</p>
                    </div>
                )}
            </div>
        </div>
    );
}
