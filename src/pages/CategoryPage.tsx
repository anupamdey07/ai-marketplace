import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useProductStore } from '@/store/useProductStore';

export default function CategoryPage() {
    const { category } = useParams();
    const { products, upvoteProduct } = useProductStore();

    // Map URL slug back to Category Name
    const slugMap: Record<string, string> = {
        'robotics': 'Programmable Robotics',
        'prompt-to-product': 'Prompt-to-Product',
        '3d-printed': '3D Printing Innovation',
        'assistants': 'Assistant Boxes',
        'kids-learning': 'Kids Learning Tools',
        'voice': 'Voice Assistants'
    };

    const categoryName = slugMap[category || ''] || 'Products';
    const filteredProducts = products.filter(p => p.category === categoryName);

    return (
        <div className="bg-background min-h-screen py-20">
            <div className="container-custom">
                <div className="flex flex-col md:flex-row justify-between items-end gap-6 mb-12">
                    <div className="max-w-2xl">
                        <Link to="/" className="text-primary/60 hover:text-primary transition-colors flex items-center gap-2 mb-4 text-sm font-bold uppercase tracking-widest">
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                            </svg>
                            Back to Library
                        </Link>
                        <h1 className="font-heading text-5xl font-bold text-primary mb-6">
                            {categoryName}
                        </h1>
                        <p className="text-xl text-charcoal/70">
                            Discover {filteredProducts.length} curated projects in {categoryName.toLowerCase()}.
                            From beginner-friendly kits to advanced developer tools.
                        </p>
                    </div>
                </div>

                {filteredProducts.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {filteredProducts.map((product) => (
                            <motion.div
                                key={product.id}
                                whileHover={{ y: -4 }}
                                className="bg-white rounded-2xl border border-background-light shadow-sm hover:shadow-md transition-all overflow-hidden group flex flex-col h-full"
                            >
                                <Link to={`/products/${product.slug}`} className="p-6 flex-1">
                                    <div className="flex justify-between items-start mb-6">
                                        <div className="w-14 h-14 bg-background-light/50 rounded-xl flex items-center justify-center text-3xl group-hover:scale-110 transition-transform">
                                            {product.images[0]}
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <button
                                                onClick={(e) => {
                                                    e.preventDefault();
                                                    upvoteProduct(product.id);
                                                }}
                                                className="flex items-center gap-1.5 px-3 py-1.5 bg-secondary hover:bg-trust/10 rounded-lg transition-colors group/vote"
                                            >
                                                <svg className="w-3.5 h-3.5 text-charcoal/40 group-hover/vote:text-trust transition-colors" fill="currentColor" viewBox="0 0 24 24">
                                                    <path d="M12 4l-8 8h16l-8-8z" />
                                                </svg>
                                                <span className="text-xs font-bold text-charcoal/60 group-hover/vote:text-trust">{product.upvotes}</span>
                                            </button>
                                        </div>
                                    </div>

                                    <h3 className="font-heading font-bold text-xl text-primary mb-2 group-hover:text-accent transition-colors truncate">
                                        {product.name}
                                    </h3>

                                    <div className="flex items-center gap-2 mb-4">
                                        <span className="text-xs text-charcoal/40">by</span>
                                        <span className="text-xs font-bold text-primary underline decoration-secondary underline-offset-2 hover:decoration-accent transition-colors">{product.creator.name}</span>
                                        <span className="text-xs text-charcoal/20">•</span>
                                        <span className="text-[10px] font-bold uppercase tracking-widest text-charcoal/40">{product.launch_date}</span>
                                    </div>

                                    <p className="text-charcoal/60 text-sm line-clamp-2 leading-relaxed mb-6">
                                        {product.description}
                                    </p>
                                </Link>

                                <div className="p-4 bg-background-light/20 border-t border-background-light flex items-center justify-between mt-auto">
                                    <div className="flex gap-2">
                                        <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider ${product.skill_level === 'Beginner' ? 'bg-mint/20 text-mint' :
                                            product.skill_level === 'Intermediate' ? 'bg-accent/10 text-accent' :
                                                'bg-primary/10 text-primary'
                                            }`}>
                                            {product.skill_level}
                                        </span>
                                        {product.privacy_verified && (
                                            <span className="bg-trust/10 text-trust px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider">
                                                Privacy ✓
                                            </span>
                                        )}
                                    </div>
                                    <span className="text-xs font-bold text-primary/40">€{product.price}</span>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-20 bg-white rounded-[40px] border border-background-light">
                        <div className="text-6xl mb-6">🏜️</div>
                        <h2 className="font-heading text-2xl font-bold text-primary mb-2">No projects found yet</h2>
                        <p className="text-charcoal/60 mb-8">We haven't added any projects to this category yet. Want to submit one?</p>
                        <button className="btn-primary">Submit Project</button>
                    </div>
                )}
            </div>
        </div>
    );
}
