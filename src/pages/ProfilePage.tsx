
import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useProductStore } from '@/store/useProductStore';
import ProductCard from '@/components/common/ProductCard';
import Badge from '@/components/common/Badge';

export default function ProfilePage() {
    const { userId } = useParams(); // Should match route param
    const { products } = useProductStore();
    const [activeTab, setActiveTab] = useState<'products' | 'posts' | 'bookmarked'>('products');

    // Find the creator from the products list based on ID
    // In a real app, we'd fetch user data separately
    const creatorProduct = products.find(p => p.creator.id === userId);

    // If we can't find a product by this creator, we might not have their data in this simple store
    // Let's handle loading/not found gracefully
    if (!creatorProduct) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-background">
                <div className="text-center">
                    <h1 className="text-4xl font-bold text-primary mb-4">Creator Not Found</h1>
                    <p className="text-charcoal/60 mb-8">This user hasn't posted any products yet.</p>
                    <Link to="/" className="btn-primary">Return Home</Link>
                </div>
            </div>
        );
    }

    const { creator } = creatorProduct;

    // Filter all products by this creator
    const creatorProducts = products.filter(p => p.creator.id === userId);

    // Mock posts data since we don't have it in the store yet
    const mockPosts = Array.from({ length: 6 }).map((_, i) => ({
        id: `post-${i}`,
        image: 'https://source.unsplash.com/random/800x800?robot,tech&sig=' + i, // Placeholder
        likes: Math.floor(Math.random() * 500),
        comments: Math.floor(Math.random() * 50),
    }));

    return (
        <div className="bg-background min-h-screen">
            {/* Header / Cover Area - minimalist */}
            <div className="h-48 bg-gradient-to-r from-primary to-primary-light relative">
                <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>
            </div>

            <div className="container-custom px-4 sm:px-6 lg:px-8 pb-20">
                {/* Profile Info Card */}
                <div className="relative -mt-24 mb-12 flex flex-col items-center text-center">
                    <motion.div
                        initial={{ scale: 0.8, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        className="w-32 h-32 md:w-40 md:h-40 bg-white rounded-full p-2 shadow-xl mb-6 relative group"
                    >
                        <div className="w-full h-full bg-secondary rounded-full flex items-center justify-center text-6xl overflow-hidden border-4 border-white">
                            {/* Use mock avatar or first letter if no image */}
                            {creator.avatar ? (
                                <img src={creator.avatar} alt={creator.name} className="w-full h-full object-cover" />
                            ) : (
                                <span className="font-heading font-bold text-primary">{creator.name.charAt(0)}</span>
                            )}
                        </div>
                        <div className="absolute bottom-2 right-2 w-8 h-8 rounded-full bg-green-500 border-4 border-white" title="Online now"></div>
                    </motion.div>

                    <h1 className="text-3xl md:text-4xl font-bold font-heading text-primary mb-2 flex flex-col md:flex-row items-center gap-3">
                        <div className="flex items-center gap-3">
                            {creator.name}
                            <Badge
                                type={creator.badge}
                                label={creator.badge === 'Contributor' ? 'Contributed' : undefined}
                                className="text-xs py-1 px-3 uppercase tracking-wider"
                            />
                        </div>

                        {/* Governance Tier Badge */}
                        <div className={`px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-[0.2em] border-2 flex items-center gap-2 ${(creator.governance_tokens || 0) >= 1000 ? 'bg-indigo-50 border-indigo-200 text-indigo-600' :
                            (creator.governance_tokens || 0) >= 500 ? 'bg-amber-50 border-amber-200 text-amber-600' :
                                (creator.governance_tokens || 0) >= 100 ? 'bg-emerald-50 border-emerald-200 text-emerald-600' :
                                    'bg-slate-50 border-slate-200 text-slate-600'
                            }`}>
                            <span className="w-2 h-2 rounded-full animate-pulse bg-current"></span>
                            {(creator.governance_tokens || 0) >= 1000 ? 'Guardian' :
                                (creator.governance_tokens || 0) >= 500 ? 'Curator' :
                                    (creator.governance_tokens || 0) >= 100 ? 'Contributor' : 'Observer'} Tier
                        </div>
                    </h1>

                    <a
                        href={creator.instagram ? `https://instagram.com/${creator.instagram}` : creator.website || '#'}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-charcoal/60 font-mono text-sm mb-4 hover:text-accent transition-colors"
                    >
                        @{creator.instagram || creator.username || creator.id}
                    </a>

                    {creator.bio && (
                        <p className="max-w-xl text-charcoal/80 text-lg mb-6 leading-relaxed">
                            {creator.bio}
                        </p>
                    )}

                    <div className="flex flex-wrap justify-center gap-6 mb-8 text-sm text-charcoal/60">
                        {creator.location && (
                            <div className="flex items-center gap-2">
                                <span>📍</span> {creator.location}
                            </div>
                        )}
                        {creator.website && (
                            <a href={creator.website} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 hover:text-accent transition-colors">
                                <span>🔗</span> {new URL(creator.website).hostname}
                            </a>
                        )}
                        <div className="flex items-center gap-2">
                            <span>📅</span> Joined {creator.id.startsWith('real') ? (creator.id === 'pollen' ? 2023 : 2024) : 2026}
                        </div>
                    </div>

                    {/* Stats Row */}
                    <div className="flex items-center gap-8 md:gap-16 mb-8 py-4 px-8 bg-white/50 rounded-full backdrop-blur-sm border border-white/20">
                        <div className="text-center">
                            <div className="font-bold text-xl text-primary">{creatorProducts.length}</div>
                            <div className="text-xs text-charcoal/50 uppercase tracking-wider font-bold">Products</div>
                        </div>
                        <div className="text-center">
                            <div className="font-bold text-xl text-accent flex items-center justify-center gap-1">
                                <span>🪙</span>
                                {creator.governance_tokens || 0}
                            </div>
                            <div className="text-xs text-charcoal/50 uppercase tracking-wider font-bold">Tokens</div>
                        </div>
                        <div className="text-center">
                            <div className="font-bold text-xl text-primary">{Math.floor(creator.credibility_score * 12.5)}</div>
                            <div className="text-xs text-charcoal/50 uppercase tracking-wider font-bold">Followers</div>
                        </div>
                    </div>

                    {/* Actions */}
                    <div className="flex gap-4">
                        <button className="btn-primary py-3 px-8 text-sm">
                            Follow
                        </button>
                        <button className="btn-outline py-3 px-8 text-sm bg-white/50 backdrop-blur-md">
                            Message
                        </button>
                        <button className="w-12 h-12 rounded-full border border-primary/20 flex items-center justify-center hover:bg-primary/5 transition-colors">
                            <span className="text-xl">...</span>
                        </button>
                    </div>
                </div>

                {/* Content Tabs */}
                <div className="border-b border-charcoal/10 mb-8">
                    <div className="flex justify-center gap-8 -mb-px">
                        <button
                            onClick={() => setActiveTab('products')}
                            className={`pb-4 px-4 text-sm font-bold uppercase tracking-widest transition-all relative ${activeTab === 'products' ? 'text-primary border-b-2 border-primary' : 'text-charcoal/40 hover:text-primary/70 border-b-2 border-transparent'
                                }`}
                        >
                            <span className="flex items-center gap-2">
                                <span className="text-lg">🛍️</span> Marketplace
                            </span>
                        </button>
                        <button
                            onClick={() => setActiveTab('posts')}
                            className={`pb-4 px-4 text-sm font-bold uppercase tracking-widest transition-all relative ${activeTab === 'posts' ? 'text-primary border-b-2 border-primary' : 'text-charcoal/40 hover:text-primary/70 border-b-2 border-transparent'
                                }`}
                        >
                            <span className="flex items-center gap-2">
                                <span className="text-lg">📸</span> Community Posts
                            </span>
                        </button>
                        <button
                            onClick={() => setActiveTab('bookmarked')}
                            className={`pb-4 px-4 text-sm font-bold uppercase tracking-widest transition-all relative ${activeTab === 'bookmarked' ? 'text-primary border-b-2 border-primary' : 'text-charcoal/40 hover:text-primary/70 border-b-2 border-transparent'
                                }`}
                        >
                            <span className="flex items-center gap-2">
                                <span className="text-lg">🔖</span> Bookmarked
                            </span>
                        </button>
                    </div>
                </div>

                {/* Tab Content */}
                <AnimatePresence mode="wait">
                    {activeTab === 'products' && (
                        <motion.div
                            key="products"
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
                        >
                            {creatorProducts.map(product => (
                                <ProductCard key={product.id} product={product} />
                            ))}
                        </motion.div>
                    )}
                    {activeTab === 'posts' && (
                        <motion.div
                            key="posts"
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            className="grid grid-cols-2 md:grid-cols-3 gap-4"
                        >
                            {/* Instagram style grid */}
                            {mockPosts.map((post) => (
                                <div key={post.id} className="aspect-square bg-white rounded-2xl overflow-hidden relative group cursor-pointer shadow-sm hover:shadow-lg transition-transform hover:-translate-y-1">
                                    <div className="absolute inset-0 bg-secondary/20 flex items-center justify-center text-4xl text-primary/20">
                                        📷
                                    </div>
                                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-6 text-white font-bold">
                                        <div className="flex items-center gap-1">
                                            <span>❤️</span> {post.likes}
                                        </div>
                                        <div className="flex items-center gap-1">
                                            <span>💬</span> {post.comments}
                                        </div>
                                    </div>
                                </div>
                            ))}
                            <div className="aspect-square rounded-2xl border-2 border-dashed border-charcoal/10 flex flex-col items-center justify-center text-charcoal/40 hover:bg-white/50 hover:border-primary/30 hover:text-primary/60 transition-all cursor-pointer">
                                <span className="text-4xl mb-2">+</span>
                                <span className="text-sm font-bold uppercase">Add Post</span>
                            </div>
                        </motion.div>
                    )}
                    {activeTab === 'bookmarked' && (
                        <motion.div
                            key="bookmarked"
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
                        >
                            {products.slice(0, 2).map(product => (
                                <ProductCard key={`bookmark-${product.id}`} product={product} />
                            ))}
                            <div className="lg:col-span-3 text-center py-10 opacity-40">
                                <p className="font-bold italic">Curating your collection...</p>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </div>
    );
}
