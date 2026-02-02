import { motion } from 'framer-motion';
import { useProductStore } from '@/store/useProductStore';
import { Link } from 'react-router-dom';
import Badge from '@/components/common/Badge';

export default function CommunityPage() {
    const { posts } = useProductStore();

    // Sort by timestamp descending
    const sortedPosts = [...posts].sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());

    return (
        <div className="bg-background min-h-screen pt-24 pb-20">
            <div className="container-custom max-w-2xl">
                <div className="text-center mb-12">
                    <h1 className="font-heading text-4xl md:text-5xl font-bold mb-4 text-primary">
                        Community Feed
                    </h1>
                    <p className="text-charcoal/70 text-lg">
                        See what the best hardware makers are building right now.
                    </p>
                </div>

                <div className="space-y-8">
                    {sortedPosts.length > 0 ? (
                        sortedPosts.map((post, index) => (
                            <motion.div
                                key={post.id}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: index * 0.1 }}
                                className="bg-white rounded-3xl border border-background-light shadow-soft overflow-hidden"
                            >
                                {/* Header */}
                                <div className="p-4 flex items-center gap-3">
                                    <Link to={`/profile/${post.author.id}`} className="block relative group">
                                        <div className="w-10 h-10 rounded-full overflow-hidden border border-background-light">
                                            {post.author.avatar ? (
                                                <img src={post.author.avatar} alt={post.author.name} className="w-full h-full object-cover" />
                                            ) : (
                                                <div className="w-full h-full bg-secondary flex items-center justify-center text-primary font-bold">
                                                    {post.author.name.charAt(0)}
                                                </div>
                                            )}
                                        </div>
                                    </Link>
                                    <div>
                                        <div className="flex items-center gap-2">
                                            <Link to={`/profile/${post.author.id}`} className="font-bold text-primary hover:text-accent transition-colors">
                                                {post.author.name}
                                            </Link>
                                            <Badge type={post.author.badge} className="!py-0 !px-1.5 !text-[9px]" />
                                        </div>
                                        <div className="text-xs text-charcoal/40">
                                            {new Date(post.timestamp).toLocaleDateString(undefined, { month: 'short', day: 'numeric' })}
                                        </div>
                                    </div>
                                    <div className="ml-auto">
                                        <button className="text-charcoal/30 hover:text-primary transition-colors">
                                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 12h.01M12 12h.01M12 12h.01M19 12h.01M6 12a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0z" />
                                            </svg>
                                        </button>
                                    </div>
                                </div>

                                {/* Link to Product if present */}
                                {post.product && (
                                    <div className="px-4 pb-2">
                                        <Link
                                            to={`/products/${post.product.slug}`}
                                            className="inline-flex items-center gap-1.5 text-xs font-medium text-accent hover:underline bg-accent/5 px-2 py-1 rounded-full"
                                        >
                                            <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                                            </svg>
                                            {post.product.name}
                                        </Link>
                                    </div>
                                )}

                                {/* Image */}
                                {post.images && post.images.length > 0 && (
                                    <div className="aspect-video bg-background-light relative">
                                        <img
                                            src={post.images[0]}
                                            alt="Post content"
                                            className="w-full h-full object-cover"
                                        />
                                    </div>
                                )}

                                {/* Actions */}
                                <div className="p-4 pb-2 flex items-center gap-4 text-primary">
                                    <button className="hover:text-red-500 transition-colors group">
                                        <svg className="w-7 h-7 group-hover:fill-current transition-all" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                                        </svg>
                                    </button>
                                    <button className="hover:text-accent transition-colors">
                                        <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                                        </svg>
                                    </button>
                                    <button className="hover:text-primary/70 transition-colors ml-auto">
                                        <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
                                        </svg>
                                    </button>
                                </div>

                                {/* Caption & Stats */}
                                <div className="px-4 pb-6">
                                    <div className="font-bold text-sm mb-2">{post.likes} likes</div>
                                    <div className="text-sm leading-relaxed">
                                        <Link to={`/profile/${post.author.id}`} className="font-bold mr-2 hover:underline">
                                            {post.author.username}
                                        </Link>
                                        <span className="text-charcoal/80">
                                            {post.content}
                                        </span>
                                    </div>
                                    <div className="mt-2 flex flex-wrap gap-2">
                                        {post.hashtags.map((tag, i) => (
                                            <span key={i} className="text-xs text-accent font-medium">#{tag}</span>
                                        ))}
                                    </div>
                                    <button className="mt-3 text-xs text-charcoal/40 font-medium hover:text-primary transition-colors">
                                        View all {post.replies} comments
                                    </button>
                                </div>
                            </motion.div>
                        ))
                    ) : (
                        <div className="text-center py-20 bg-white rounded-3xl border border-background-light">
                            <div className="text-6xl mb-4">📭</div>
                            <h3 className="font-bold text-xl text-primary mb-2">No posts yet</h3>
                            <p className="text-charcoal/60">Be the first to share your build!</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
