import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import CategoryScroll from '@/components/navigation/CategoryScroll';
import Badge from '@/components/common/Badge';
import TrustIndicator from '@/components/common/TrustIndicator';
import { useProductStore } from '@/store/useProductStore';
import HeroCircle from '@/components/common/HeroCircle';
import { useState } from 'react';

export default function HomePage() {
    const navigate = useNavigate();
    const { products, upvoteProduct } = useProductStore();
    const [upvotedId, setUpvotedId] = useState<string | null>(null);

    const handleUpvote = (id: string) => {
        setUpvotedId(id);
        upvoteProduct(id);
        setTimeout(() => setUpvotedId(null), 600);
    };

    const leaderboardProducts = products.slice(0, 12);
    const reachyMini = products.find(p => p.slug === 'reachy-mini');

    return (
        <div>
            {/* Hero Section */}
            <section className="relative overflow-hidden bg-background pt-0 pb-32 transition-all">
                <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAxMCAwIEwgMCAwIDAgMTAiIGZpbGw9Im5vbmUiIHN0cm9rZT0iIzJkNGEzZSIgc3Ryb2tlLXdpZHRoPSIwLjUiIG9wYWNpdHk9IjAuMDUiLz48L3BhdHRlcm4+PC9kZWZzPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9InVybCgjZ3JpZCkiLz48L3N2Zz4=')] opacity-50" />

                <div className="container-custom relative z-10 pt-1">
                    <div className="block lg:flow-root">
                        {/* The Large Visual Engine - Floated on Desktop with Text Wrap Shape */}
                        <motion.div
                            initial={{ opacity: 0, scale: 0.8, x: 30 }}
                            animate={{ opacity: 1, scale: 1, x: 0 }}
                            transition={{ duration: 0.8, delay: 0.1 }}
                            className="lg:float-right lg:ml-12 lg:mb-4 relative z-30 w-full lg:w-[650px] flex justify-center lg:block"
                            style={{
                                shapeOutside: "circle(50% at 50% 50%)",
                            }}
                        >
                            <div className="lg:-mt-12 overflow-visible">
                                <HeroCircle />
                            </div>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, x: -30 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.8 }}
                            className="text-center lg:text-left relative z-20"
                        >
                            <div className="flex items-center justify-center lg:justify-start gap-4 mb-6">
                                <Badge type="new" label="Beta V3.0" />
                                <span className="text-primary/60 text-sm font-bold tracking-widest uppercase">The Community Marketplace</span>
                            </div>

                            <motion.h1
                                className="font-heading text-4xl md:text-7xl font-medium text-charcoal mb-8 leading-[1.05] lowercase tracking-tighter"
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.6, delay: 0.2 }}
                            >
                                <span className="font-black text-primary">smart consumer hardware products</span>,
                                <br />
                                by <span className="text-accent font-black">new-generation</span>
                                <br />
                                makers, <span className="text-primary/70">ai-powered coders</span>, <span className="font-black text-primary">innovators.</span>
                            </motion.h1>

                            <motion.p
                                className="text-xl md:text-2xl text-charcoal/80 mb-10 leading-relaxed w-full lg:w-full lg:max-w-none mx-auto lg:mx-0 pr-4"
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.6, delay: 0.4 }}
                            >
                                We <span className="font-bold">handpick & curate</span> consumer-ready smart hardware products with real traction.
                                Start your journey from a curious beginner to creator.
                            </motion.p>

                            <motion.div
                                className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start items-center pb-12"
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.6, delay: 0.5 }}
                            >
                                <button
                                    onClick={() => navigate('/explore')}
                                    className="btn-primary px-10 py-5 text-lg shadow-xl shadow-primary/20"
                                >
                                    Explore Products
                                </button>
                            </motion.div>
                        </motion.div>
                    </div>
                </div>
            </section>

            <div id="explore">
                <CategoryScroll />
            </div>

            {/* Featured: Beginner-Friendly Picks */}
            <section className="py-20 bg-secondary">
                <div className="container-custom">
                    <div className="text-center mb-16">
                        <h2 className="font-heading text-4xl md:text-5xl font-bold mb-4 text-primary">
                            Featured: Exclusive Pick(s) January 2026
                        </h2>
                        <p className="text-charcoal/70 text-lg max-w-2xl mx-auto">
                            Our most-vetted picks for first-time makers. No degree required.
                        </p>
                    </div>

                    <div className="max-w-6xl mx-auto">
                        <div className="grid md:grid-cols-2 gap-12 items-center">
                            <motion.div
                                initial={{ opacity: 0, x: -50 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.6 }}
                            >
                                <div className="aspect-square bg-secondary/30 rounded-3xl shadow-soft flex items-center justify-center border border-background-light overflow-hidden group relative">
                                    {reachyMini?.images[0]?.startsWith('http') ? (
                                        <img
                                            src={reachyMini.images[0]}
                                            alt={reachyMini.name}
                                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                                        />
                                    ) : (
                                        <div className="text-[200px] group-hover:scale-110 transition-transform duration-500">🤖</div>
                                    )}
                                </div>
                            </motion.div>

                            <motion.div
                                initial={{ opacity: 0, x: 50 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.6 }}
                            >
                                <div className="flex gap-2 mb-4">
                                    <span className="px-3 py-1 bg-accent/10 border border-accent/20 rounded-full text-accent text-xs font-bold uppercase tracking-widest">
                                        Featured
                                    </span>
                                    <span className="px-3 py-1 bg-primary/10 border border-primary/20 text-primary rounded-full text-xs font-bold uppercase tracking-widest">
                                        {reachyMini?.skill_level || 'Beginner'}
                                    </span>
                                </div>

                                <h2 className="font-heading text-4xl md:text-5xl font-bold mb-4 text-primary leading-tight">
                                    {reachyMini?.name || 'Reachy Mini Companion'}
                                </h2>

                                <p className="text-lg text-charcoal/80 mb-6 leading-relaxed">
                                    {reachyMini?.description || 'The ultimate first step into machbar hardware. Build, code, and bring your first pet-like companion to life.'}
                                </p>

                                <div className="mb-6 space-y-3">
                                    <p className="text-sm font-bold text-sage-dark uppercase tracking-widest">Perfect for:</p>
                                    <div className="flex flex-wrap gap-2">
                                        <span className="px-3 py-1 bg-background-light text-primary rounded-lg text-xs font-bold">First-time coders</span>
                                        <span className="px-3 py-1 bg-background-light text-primary rounded-lg text-xs font-bold">Parents/Educators</span>
                                        <span className="px-3 py-1 bg-background-light text-primary rounded-lg text-xs font-bold">STEM Tinkering</span>
                                    </div>
                                </div>

                                <TrustIndicator verified vetted gdpr className="mb-8" />

                                <div className="flex flex-wrap gap-4">
                                    <button
                                        onClick={() => navigate(`/products/${reachyMini?.slug || 'reachy-mini'}`)}
                                        className="btn-accent px-8 py-3 text-white"
                                    >
                                        Get {reachyMini?.name || 'Reachy Mini'}
                                    </button>
                                    <button
                                        onClick={() => navigate(`/products/${reachyMini?.slug || 'reachy-mini'}`)}
                                        className="btn-outline px-8 py-3"
                                    >
                                        Go to Project
                                    </button>
                                </div>
                            </motion.div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Hacker News Style Leaderboard */}
            <section className="py-20 bg-background/20">
                <div className="container-custom">
                    <div className="text-center mb-12">
                        <h2 className="font-heading text-4xl md:text-5xl font-bold mb-4 text-primary">
                            Trending Products Leaderboard
                        </h2>
                        <p className="text-charcoal/70 text-lg">
                            The community's favorite physical builds right now.
                        </p>
                    </div>

                    <div className="max-w-3xl mx-auto bg-white rounded-3xl shadow-soft border border-background-light overflow-hidden">
                        <div className="divide-y divide-background-light">
                            {leaderboardProducts.map((product, index) => (
                                <motion.div
                                    key={product.id}
                                    layout
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    className="p-4 sm:p-6 hover:bg-background/5 transition-colors flex items-start gap-4 sm:gap-6 group"
                                >
                                    <div className="flex flex-col items-center gap-1 pt-1 min-w-[2.5rem]">
                                        <span className="text-sm font-bold text-charcoal/30">{index + 1}.</span>
                                        <motion.button
                                            onClick={() => handleUpvote(product.id)}
                                            whileTap={{ scale: 0.8 }}
                                            animate={upvotedId === product.id ? {
                                                scale: [1, 1.4, 1],
                                                transition: { duration: 0.3 }
                                            } : {}}
                                            className="p-1.5 hover:bg-secondary rounded-lg transition-colors group/upvote"
                                            aria-label="Upvote"
                                        >
                                            <svg
                                                className={`w-4 h-4 transition-all ${upvotedId === product.id ? 'text-accent scale-125' : 'text-charcoal/40 group-hover/upvote:text-accent group-hover/upvote:scale-125'}`}
                                                fill="currentColor"
                                                viewBox="0 0 24 24"
                                            >
                                                <path d="M12 4l-8 8h16l-8-8z" />
                                            </svg>
                                        </motion.button>
                                    </div>

                                    <div className="flex-1">
                                        <div className="flex items-center gap-3 mb-1">
                                            <h3 className="font-heading font-bold text-lg text-primary group-hover:text-accent transition-colors">
                                                {product.name}
                                            </h3>
                                            <span className="text-xs font-bold text-charcoal/40 bg-background-light px-2 py-0.5 rounded uppercase tracking-wider">
                                                {product.category}
                                            </span>
                                        </div>

                                        <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-charcoal/60">
                                            <span className="font-bold text-accent">{product.upvotes} points</span>
                                            <span>by <span className="underline decoration-secondary underline-offset-2 cursor-pointer">{product.creator.name}</span></span>
                                            <span className={`font-bold ${product.skill_level === 'Beginner' ? 'text-mint' :
                                                product.skill_level === 'Intermediate' ? 'text-accent' :
                                                    'text-primary'
                                                }`}>
                                                {product.skill_level}
                                            </span>
                                            <span className="hidden sm:inline">| {product.launch_date}</span>
                                        </div>
                                    </div>

                                    <div className="hidden sm:flex flex-col items-end gap-2 pr-2">
                                        <div className="h-10 w-10 rounded-lg overflow-hidden bg-background-light flex items-center justify-center text-xl">
                                            {product.images[0]?.startsWith('http') || product.images[0]?.startsWith('/') ? (
                                                <img src={product.images[0]} alt={product.name} className="w-full h-full object-cover" />
                                            ) : (
                                                product.images[0] || '📦'
                                            )}
                                        </div>
                                        {product.status === 'Coming Soon' ? (
                                            <span className="status-pill bg-yellow-400/10 border-yellow-400/20 text-yellow-600 text-[9px] px-2 py-0.5 whitespace-nowrap">
                                                Coming Soon
                                            </span>
                                        ) : (
                                            <span className="status-pill bg-emerald-500/10 border-emerald-500/20 text-emerald-600 text-[9px] px-2 py-0.5 whitespace-nowrap">
                                                Available
                                            </span>
                                        )}
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                        <div className="p-6 bg-background/5 text-center border-t border-background-light">
                            <button
                                onClick={() => navigate('/leaderboard')}
                                className="text-primary font-bold hover:text-accent transition-colors"
                            >
                                View Full Archive →
                            </button>
                        </div>
                    </div>
                </div>
            </section>



            {/* Why We Built This */}
            <section className="py-12 bg-primary text-secondary overflow-hidden relative">
                <div className="absolute top-0 right-0 w-96 h-96 bg-accent opacity-5 rounded-full blur-3xl -mr-48 -mt-48" />
                <div className="absolute bottom-0 left-0 w-64 h-64 bg-secondary opacity-5 rounded-full blur-3xl -ml-32 -mb-32" />

                <div className="container-custom relative z-10">
                    <div className="max-w-3xl mx-auto text-center">
                        <h2 className="font-heading text-4xl md:text-5xl font-bold mb-8">
                            Why We Built This
                        </h2>
                        <p className="text-secondary/80 text-xl mb-12 leading-relaxed italic">
                            "The next generation of innovation isn't just code on a screen—it's technology you can touch, build, and hold. We're here to make that transition easy."
                        </p>

                        <div className="flex flex-col sm:flex-row gap-6 justify-center">
                            <div className="bg-white/5 p-6 rounded-2xl border border-white/10 flex-1">
                                <span className="text-accent font-bold text-2xl block mb-1">1.5k+</span>
                                <span className="text-secondary/60 text-sm uppercase tracking-widest font-bold">Vetted Products</span>
                            </div>
                            <div className="bg-white/5 p-6 rounded-2xl border border-white/10 flex-1">
                                <span className="text-accent font-bold text-2xl block mb-1">100%</span>
                                <span className="text-secondary/60 text-sm uppercase tracking-widest font-bold">Discover & Learn</span>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Newsletter Section */}
            <section className="py-20 bg-background">
                <div className="container-custom">
                    <div className="max-w-3xl mx-auto text-center">
                        <h2 className="font-heading text-4xl md:text-5xl font-bold mb-6 text-primary">
                            Stay in the Loop
                        </h2>
                        <p className="text-charcoal/70 text-lg mb-8">
                            Get weekly updates on new products, community highlights, and maker stories.
                            No spam, just smart hardware.
                        </p>

                        <form className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
                            <input
                                type="email"
                                placeholder="Enter your email"
                                className="flex-1 px-6 py-4 rounded-xl bg-white border border-background-light text-charcoal placeholder:text-charcoal/40 focus:outline-none focus:ring-2 focus:ring-primary/20"
                            />
                            <button className="btn-primary px-8 py-4">
                                Subscribe
                            </button>
                        </form>

                        <p className="text-charcoal/40 text-sm mt-4">
                            Powered by Substack. Unsubscribe anytime.
                        </p>
                    </div>
                </div>
            </section>
        </div >
    );
}
