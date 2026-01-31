import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';

export default function AboutPage() {
    const containerRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end start"]
    });

    const y = useTransform(scrollYProgress, [0, 1], ['0%', '50%']);
    const opacity = useTransform(scrollYProgress, [0, 0.5, 1], [1, 0.8, 0.3]);

    return (
        <div ref={containerRef} className="relative bg-background overflow-hidden">
            {/* Animated Background Elements */}
            <div className="fixed inset-0 pointer-events-none overflow-hidden">
                <motion.div
                    style={{ y, opacity }}
                    className="absolute top-20 right-10 w-96 h-96 bg-accent/5 rounded-full blur-3xl"
                />
                <motion.div
                    style={{ y: useTransform(scrollYProgress, [0, 1], ['0%', '-30%']), opacity }}
                    className="absolute bottom-20 left-10 w-80 h-80 bg-primary/5 rounded-full blur-3xl"
                />
                <motion.div
                    style={{ y: useTransform(scrollYProgress, [0, 1], ['0%', '70%']), opacity }}
                    className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-mint/5 rounded-full blur-3xl"
                />
            </div>

            {/* Hero Section */}
            <section className="relative min-h-[80vh] flex items-center justify-center pt-32 pb-20">
                <div className="container-custom relative z-10">
                    <motion.div
                        initial={{ opacity: 0, y: 40 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 1, ease: "easeOut" }}
                        className="text-center max-w-5xl mx-auto"
                    >
                        <motion.div
                            initial={{ scale: 0.9, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            transition={{ duration: 0.8, delay: 0.2 }}
                            className="mb-8"
                        >
                            <span className="inline-block px-6 py-2 bg-accent/10 border border-accent/20 rounded-full text-accent font-bold text-sm tracking-widest uppercase mb-8">
                                Beta v3.0 Philosophy
                            </span>
                        </motion.div>

                        <motion.h1
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, delay: 0.4 }}
                            className="font-heading text-6xl md:text-8xl lg:text-9xl font-black text-primary mb-8 lowercase tracking-tighter leading-[0.9]"
                        >
                            machbar<span className="text-accent">.</span>io
                        </motion.h1>

                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ duration: 1, delay: 0.6 }}
                            className="space-y-6 mb-12"
                        >
                            <p className="text-2xl md:text-3xl text-charcoal/90 font-light leading-relaxed max-w-3xl mx-auto">
                                The <span className="font-bold text-primary">community marketplace</span> built on transparency, not engagement.
                            </p>
                        </motion.div>
                    </motion.div>
                </div>
            </section>

            {/* Philosophy Statement - Inspired by PRD v3 */}
            <section className="relative py-32 bg-secondary/30">
                <div className="container-custom relative z-10">
                    <motion.div
                        initial={{ opacity: 0, y: 60 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                        className="max-w-4xl mx-auto text-center"
                    >
                        <div className="bg-white p-12 md:p-20 rounded-[60px] border border-background-light shadow-2xl relative overflow-hidden">
                            <div className="absolute top-0 right-0 w-64 h-64 bg-accent/5 rounded-full -mr-32 -mt-32 blur-3xl"></div>
                            <h2 className="font-heading text-4xl md:text-5xl font-black mb-10 text-primary">The Philosophy</h2>
                            <blockquote className="text-2xl md:text-3xl text-charcoal/80 font-light italic leading-relaxed mb-8">
                                "Our marketplace algorithms are <span className="text-accent font-bold">open source</span> and publicly documented. We do NOT optimize for engagement. We optimize for <span className="text-primary font-bold">community value</span> through federated governance."
                            </blockquote>
                            <p className="text-charcoal/50 font-bold uppercase tracking-widest text-xs">— Beta v3.0 Manifesto</p>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* The Three Pillars */}
            <section className="relative py-32">
                <div className="container-custom">
                    <motion.div
                        initial={{ opacity: 0, y: 40 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                        className="text-center mb-20"
                    >
                        <h2 className="font-heading text-5xl md:text-6xl font-black text-primary mb-6 tracking-tight">
                            The Three Pillars
                        </h2>
                        <p className="text-xl text-charcoal/60 max-w-2xl mx-auto">
                            Inspired by Bitcoin methodology and federated community values.
                        </p>
                    </motion.div>

                    <div className="grid md:grid-cols-3 gap-8 max-w-7xl mx-auto">
                        {[
                            {
                                title: 'Federated Governance',
                                description: 'A decentralized tier system where Observers, Contributors, Curators, and Guardians moderate the catalog.',
                                icon: '🗳️',
                                accent: 'text-primary',
                                bg: 'bg-primary/5'
                            },
                            {
                                title: 'Open Source Ethics',
                                description: 'No black-box ranking. Every algorithm weight and governance decision is logged and published for total transparency.',
                                icon: '📜',
                                accent: 'text-accent',
                                bg: 'bg-accent/5'
                            },
                            {
                                title: 'Human Curation',
                                description: 'A quality gate that filters out viral noise. We only surface consumer-ready hardware with real traction.',
                                icon: '✋',
                                accent: 'text-mint',
                                bg: 'bg-mint/5'
                            },
                        ].map((pillar, index) => (
                            <motion.div
                                key={pillar.title}
                                initial={{ opacity: 0, y: 40 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.6, delay: index * 0.1 }}
                                className={`p-10 rounded-[40px] border border-background-light ${pillar.bg} group hover:scale-[1.02] transition-all duration-300`}
                            >
                                <div className="text-6xl mb-8">{pillar.icon}</div>
                                <h3 className={`font-heading font-black text-2xl mb-4 ${pillar.accent}`}>{pillar.title}</h3>
                                <p className="text-charcoal/70 leading-relaxed font-medium">
                                    {pillar.description}
                                </p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Anti-Engagement Commitment */}
            <section className="py-32 bg-primary text-secondary overflow-hidden">
                <div className="container-custom relative z-10">
                    <div className="grid lg:grid-cols-2 gap-20 items-center">
                        <motion.div
                            initial={{ opacity: 0, x: -40 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                        >
                            <h2 className="font-heading text-5xl font-black mb-8">Anti-Engagement Optimization</h2>
                            <p className="text-xl text-secondary/80 leading-relaxed mb-10">
                                We explicitly reject engagement-maximizing patterns. We don't optimize for your time-on-site, clicks, or views.
                                <br /><br />
                                We optimize for the <span className="text-accent font-bold">tangible discovery</span> of products that actually improve your life.
                            </p>
                            <div className="flex flex-wrap gap-4">
                                <div className="px-4 py-2 border border-secondary/20 rounded-xl text-sm font-bold">No Dark Patterns</div>
                                <div className="px-4 py-2 border border-secondary/20 rounded-xl text-sm font-bold">No Surveillance</div>
                                <div className="px-4 py-2 border border-secondary/20 rounded-xl text-sm font-bold">Pure Quality</div>
                            </div>
                        </motion.div>
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            className="relative"
                        >
                            <div className="aspect-video bg-white/10 rounded-[40px] flex items-center justify-center text-8xl grayscale opacity-50 border border-white/10">
                                📵
                            </div>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* Closing CTA */}
            <section className="relative py-32 bg-gradient-to-br from-secondary via-background to-secondary">
                <div className="container-custom">
                    <motion.div
                        initial={{ opacity: 0, y: 40 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                        className="max-w-4xl mx-auto text-center"
                    >
                        <h2 className="font-heading text-4xl md:text-6xl font-black text-primary mb-8 tracking-tight">
                            Join the Movement
                        </h2>
                        <p className="text-xl md:text-2xl text-charcoal/70 mb-12 leading-relaxed">
                            We're building this for the love of creation. To inspire and be inspired.
                            <br />
                            <span className="text-primary font-bold">Your journey starts here.</span>
                        </p>
                        <motion.a
                            href="/explore"
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="inline-block btn-primary px-12 py-5 text-lg shadow-2xl shadow-primary/30"
                        >
                            Explore Products
                        </motion.a>
                    </motion.div>
                </div>
            </section>
        </div>
    );
}
