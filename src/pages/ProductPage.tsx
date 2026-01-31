import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useProductStore } from '@/store/useProductStore';
import Badge from '@/components/common/Badge';
import TrustIndicator from '@/components/common/TrustIndicator';
import ComingSoonPage from './ComingSoonPage';
import { useUIStore } from '@/store/useUIStore';
import { useCartStore } from '@/store/useCartStore';

export default function ProductPage() {
    const { slug } = useParams();
    const { products, upvoteProduct } = useProductStore();
    const { openCart } = useUIStore();
    const { addItem, items: cartItems } = useCartStore();
    const product = products.find(p => p.slug === slug);
    const [isSparkling, setIsSparkling] = useState(false);
    const [upvotedId, setUpvotedId] = useState<string | null>(null);

    const isProductInCart = cartItems.some(item => item.id === product?.id);

    const handleAddToCart = () => {
        if (!product) return;
        setIsSparkling(true);
        addItem(product);
        setTimeout(() => {
            setIsSparkling(false);
            openCart();
        }, 800);
    };

    const handleUpvote = (id: string) => {
        setUpvotedId(id);
        upvoteProduct(id);
        setTimeout(() => setUpvotedId(null), 600);
    };

    if (!product || product.status === 'Coming Soon') {
        return <ComingSoonPage />;
    }

    return (
        <div className="bg-background min-h-screen pb-20">
            {/* Context Header */}
            <div className="bg-primary pt-24 pb-32 text-secondary">
                <div className="container-custom">
                    <div className="flex flex-col md:flex-row gap-12 items-center">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            className="w-48 h-48 sm:w-64 sm:h-64 bg-white/10 rounded-[40px] flex items-center justify-center text-8xl sm:text-9xl border border-white/10 backdrop-blur-md shadow-2xl"
                        >
                            {product.images[0]?.startsWith('http') || product.images[0]?.startsWith('/') ? (
                                <img
                                    src={product.images[0]}
                                    alt={product.name}
                                    className="w-full h-full object-cover rounded-[32px]"
                                />
                            ) : (
                                product.images[0]
                            )}
                        </motion.div>

                        <div className="flex-1 text-center md:text-left">
                            <div className="flex flex-wrap justify-center md:justify-start gap-3 mb-6">
                                <span className="px-3 py-1 bg-accent text-white rounded-lg text-xs font-bold uppercase tracking-widest">
                                    {product.category}
                                </span>
                                {product.subCategory && (
                                    <span className="px-3 py-1 bg-white/30 text-white rounded-lg text-xs font-bold uppercase tracking-widest backdrop-blur-sm border border-white/20">
                                        {product.subCategory}
                                    </span>
                                )}
                                <span className="px-3 py-1 bg-white/20 text-white rounded-lg text-xs font-bold uppercase tracking-widest">
                                    {product.skill_level || 'Beginner'}
                                </span>
                            </div>

                            <h1 className="font-heading text-5xl md:text-7xl font-bold mb-6 text-secondary">
                                {product.name}
                            </h1>

                            <div className="flex flex-col sm:flex-row items-center justify-center md:justify-start gap-6">
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 bg-secondary rounded-full flex items-center justify-center text-primary font-bold">
                                        {product.creator.name.charAt(0)}
                                    </div>
                                    <div className="text-left">
                                        <p className="text-xs text-secondary/60 uppercase tracking-widest font-bold">Creator</p>
                                        <Link to={`/profile/${product.creator.id}`}>
                                            <p className="font-bold underline decoration-accent underline-offset-4 cursor-pointer hover:text-accent transition-colors">{product.creator.name}</p>
                                        </Link>
                                    </div>
                                </div>

                                <div className="h-10 w-px bg-white/10 hidden sm:block" />

                                <div className="text-left">
                                    <p className="text-xs text-secondary/60 uppercase tracking-widest font-bold">Community Traction</p>
                                    <p className="font-bold text-accent text-xl">{product.upvotes} Upvotes</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Content Area */}
            <div className="container-custom -mt-16">
                <div className="grid lg:grid-cols-3 gap-12">
                    {/* Main Info */}
                    <div className="lg:col-span-2 space-y-12">
                        <section className="bg-white p-10 rounded-[40px] border border-background-light shadow-soft">
                            <h2 className="font-heading text-3xl font-bold mb-6">About this project</h2>
                            <p className="text-xl text-charcoal/80 leading-relaxed mb-8">
                                {product.description}
                                <br /><br />
                                This project is designed for {(product.skill_level || 'Beginner').toLowerCase()} makers who want to explore {product.category.toLowerCase()}.
                                It comes with a full interactive guide, pre-configured code, and a list of required physical components that are easily sourceable.
                            </p>

                            <div className="grid sm:grid-cols-3 gap-6">
                                <div className="p-4 bg-background-light/30 rounded-2xl border border-background-light">
                                    <p className="text-[10px] font-bold text-primary/40 uppercase mb-1">Time to build</p>
                                    <p className="font-bold text-primary">~2-4 Hours</p>
                                </div>
                                <div className="p-4 bg-background-light/30 rounded-2xl border border-background-light">
                                    <p className="text-[10px] font-bold text-primary/40 uppercase mb-1">Parts Cost</p>
                                    <p className="font-bold text-primary">€{product.price}</p>
                                </div>
                                <div className="p-4 bg-background-light/30 rounded-2xl border border-background-light">
                                    <p className="text-[10px] font-bold text-primary/40 uppercase mb-1">Complexity</p>
                                    <p className="font-bold text-primary">{product.skill_level || 'Beginner'}</p>
                                </div>
                            </div>
                        </section>

                        <section className="bg-white p-10 rounded-[40px] border border-background-light shadow-soft">
                            <h2 className="font-heading text-3xl font-bold mb-6">Prerequisites</h2>
                            <ul className="space-y-4">
                                {[
                                    'Basic understanding of smart connectors',
                                    'A computer with USB port',
                                    'Curiosity and 2 hours of free time',
                                    'No advanced soldering required'
                                ].map((item, i) => (
                                    <li key={i} className="flex items-center gap-4 text-charcoal/70">
                                        <div className="w-6 h-6 bg-mint/20 text-mint rounded-full flex items-center justify-center text-xs font-bold shrink-0">
                                            ✓
                                        </div>
                                        {item}
                                    </li>
                                ))}
                            </ul>
                        </section>

                        {/* Apps & Ecosystem Section */}
                        {product.apps && product.apps.length > 0 && (
                            <section className="bg-white p-10 rounded-[40px] border border-background-light shadow-soft mt-12">
                                <h2 className="font-heading text-3xl font-bold mb-8">Apps & Ecosystem</h2>

                                {/* Verified Apps */}
                                {product.apps.filter(a => a.certified).length > 0 && (
                                    <div className="mb-10">
                                        <h3 className="font-bold text-sm uppercase tracking-widest text-primary/60 mb-4 flex items-center gap-2">
                                            <span className="w-2 h-2 rounded-full bg-accent"></span>
                                            Verified {product.creator.name} Apps
                                        </h3>
                                        <div className="grid gap-4">
                                            {product.apps.filter(a => a.certified).map(app => (
                                                <div key={app.id} className="flex items-center gap-4 p-4 border border-background-light rounded-3xl bg-secondary/10 hover:bg-secondary/30 transition-colors cursor-pointer">
                                                    <div className="w-12 h-12 bg-primary text-secondary rounded-2xl flex items-center justify-center text-xl shadow-sm">
                                                        ⚡
                                                    </div>
                                                    <div className="flex-1">
                                                        <h4 className="font-heading font-bold text-primary text-lg">{app.name}</h4>
                                                        <p className="text-sm text-charcoal/70 leading-snug">{app.description}</p>
                                                    </div>
                                                    <div className="text-right hidden sm:block">
                                                        <span className="bg-white border border-background-light px-3 py-1 rounded-full text-xs font-bold text-primary shadow-sm">
                                                            ⬇ {app.downloads}
                                                        </span>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                )}

                                {/* Community Apps */}
                                {product.apps.filter(a => !a.certified).length > 0 && (
                                    <div>
                                        <h3 className="font-bold text-sm uppercase tracking-widest text-primary/60 mb-4 flex items-center gap-2">
                                            <span className="w-2 h-2 rounded-full bg-trust"></span>
                                            Community Contributions
                                        </h3>
                                        <div className="grid gap-4">
                                            {product.apps.filter(a => !a.certified).map(app => (
                                                <div key={app.id} className="flex items-center gap-4 p-4 border border-background-light rounded-3xl bg-white hover:shadow-md transition-all cursor-pointer">
                                                    <div className="w-12 h-12 bg-charcoal/5 text-charcoal rounded-2xl flex items-center justify-center text-xl">
                                                        🧩
                                                    </div>
                                                    <div className="flex-1">
                                                        <div className="flex items-center gap-2 mb-1">
                                                            <h4 className="font-heading font-bold text-primary">{app.name}</h4>
                                                            <Link
                                                                to={`/profile/${app.creator.id}`}
                                                                onClick={(e) => e.stopPropagation()} // Prevent parent div click
                                                                className="text-[10px] uppercase font-bold text-charcoal/40 bg-charcoal/5 px-2 py-0.5 rounded-full hover:bg-charcoal/10 hover:text-primary transition-colors"
                                                            >
                                                                by {app.creator.name}
                                                            </Link>
                                                        </div>
                                                        <p className="text-sm text-charcoal/70 leading-snug">{app.description}</p>
                                                    </div>
                                                    <div className="text-right hidden sm:block">
                                                        <span className="text-xs font-bold text-primary/40">
                                                            ⬇ {app.downloads}
                                                        </span>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                )}
                            </section>
                        )}
                    </div>

                    {/* Sidebar / Stats */}
                    <aside className="space-y-8">
                        <div className="bg-secondary p-8 rounded-[40px] shadow-soft border border-background-light sticky top-24">
                            <div className="mb-8">
                                <p className="text-xs font-bold text-primary/40 uppercase tracking-widest mb-2">Support the Maker</p>
                                <div className="flex items-center justify-between mb-6">
                                    <span className="text-4xl font-bold text-primary">€{product.price}</span>
                                    <Badge type="new" label="Digital Assets Included" />
                                </div>
                                <motion.button
                                    onClick={handleAddToCart}
                                    disabled={isSparkling}
                                    className="btn-primary w-full py-3 text-lg mb-4 relative overflow-hidden group"
                                >
                                    <span className="flex items-center justify-center gap-2">
                                        Get Project Kit
                                        {isProductInCart && (
                                            <motion.span
                                                initial={{ scale: 0, rotate: -45 }}
                                                animate={{ scale: 1, rotate: 0 }}
                                                className="text-xs bg-white text-primary rounded-full w-5 h-5 flex items-center justify-center font-black"
                                            >
                                                +
                                            </motion.span>
                                        )}
                                    </span>

                                    <AnimatePresence>
                                        {isSparkling && (
                                            <motion.span
                                                initial={{ opacity: 0, scale: 0, y: 10 }}
                                                animate={{ opacity: 1, scale: 1.1, y: -15, rotate: [0, 15, -15, 0] }}
                                                exit={{ opacity: 0, scale: 0 }}
                                                className="absolute inset-0 flex items-center justify-center pointer-events-none text-xl"
                                            >
                                                ✨
                                            </motion.span>
                                        )}
                                    </AnimatePresence>
                                </motion.button>
                                {product.external_link && (
                                    <a
                                        href={product.external_link}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="btn-accent w-full py-3 text-lg mb-4 text-center justify-center font-bold whitespace-nowrap flex items-center gap-1"
                                    >
                                        Visit Official Project <span>↗</span>
                                    </a>
                                ) || null}
                                <div className="relative">
                                    <motion.button
                                        onClick={() => handleUpvote(product.id)}
                                        whileTap={{ scale: 0.95 }}
                                        className="btn-outline w-full py-3 text-lg bg-white border-primary"
                                    >
                                        Upvote Project
                                    </motion.button>

                                    <AnimatePresence>
                                        {upvotedId === product.id && (
                                            <motion.div
                                                initial={{ opacity: 0, y: 0, scale: 0.5 }}
                                                animate={{ opacity: [0, 1, 1, 0], y: -40, scale: [0.5, 1.2, 1.2, 1.5] }}
                                                transition={{ duration: 0.8 }}
                                                className="absolute inset-0 flex items-center justify-center pointer-events-none text-2xl"
                                            >
                                                👍
                                            </motion.div>
                                        )}
                                    </AnimatePresence>
                                </div>
                            </div>

                            <div className="border-t border-background-light pt-8">
                                <TrustIndicator verified vetted gdpr className="flex-col !items-start gap-4" />
                            </div>
                        </div>
                    </aside>
                </div>
            </div>
        </div>
    );
}
