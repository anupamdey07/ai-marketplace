import { motion, AnimatePresence } from 'framer-motion';
import { Product } from '@/types';
import { useNavigate } from 'react-router-dom';

interface CartSidebarProps {
    isOpen: boolean;
    onClose: () => void;
    items: Product[];
}

export default function CartSidebar({ isOpen, onClose, items }: CartSidebarProps) {
    const navigate = useNavigate();

    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="fixed inset-0 bg-charcoal/5 backdrop-blur-[2px] z-[999]"
                    />
                    <motion.div
                        initial={{ x: '100%' }}
                        animate={{ x: 0 }}
                        exit={{ x: '100%' }}
                        transition={{ type: 'spring', damping: 25, stiffness: 200 }}
                        className="fixed right-0 top-0 h-full w-full max-w-md bg-white shadow-2xl z-[1000] flex flex-col rounded-l-[3rem] overflow-hidden"
                    >
                        {/* Header */}
                        <div className="p-6 border-b border-background-light flex items-center justify-between flex-shrink-0 bg-white">
                            <h2 className="font-heading text-2xl font-bold text-primary">Get Your Project</h2>
                            <button onClick={onClose} className="p-2 hover:bg-background-light rounded-full transition-colors">
                                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </button>
                        </div>

                        {/* Scrollable Items Section */}
                        <div className="flex-1 overflow-y-auto p-6 custom-scrollbar min-h-0 bg-white">
                            {items.length === 0 ? (
                                <div className="text-center py-20">
                                    <span className="text-6xl block mb-4">🛒</span>
                                    <p className="text-charcoal/50 font-bold">Your list is empty</p>
                                    <button
                                        onClick={() => {
                                            onClose();
                                            navigate('/explore');
                                        }}
                                        className="mt-6 text-accent font-bold hover:underline"
                                    >
                                        Start Exploring →
                                    </button>
                                </div>
                            ) : (
                                <div className="space-y-6">
                                    {items.map((item) => (
                                        <div key={item.id} className="flex gap-4 group">
                                            <div className="w-20 h-20 rounded-2xl bg-secondary/30 flex items-center justify-center text-3xl overflow-hidden shrink-0 border border-background-light">
                                                {item.images[0]?.startsWith('http') ? (
                                                    <img src={item.images[0]} alt={item.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                                                ) : (
                                                    <span className="group-hover:scale-110 transition-transform duration-500 block">{item.images[0]}</span>
                                                )}
                                            </div>
                                            <div className="flex-1">
                                                <h3 className="font-bold text-primary leading-tight line-clamp-1 mb-0.5">{item.name}</h3>

                                                <div className="flex items-center gap-1.5 mb-2">
                                                    <span className="text-[10px] uppercase font-bold text-charcoal/40 tracking-wider">by</span>
                                                    <span className="text-[10px] uppercase font-bold text-primary underline decoration-primary/30 underline-offset-2">
                                                        {item.creator.name}
                                                    </span>
                                                </div>

                                                <div className="flex flex-wrap items-center gap-2 mb-3">
                                                    <span className="text-[9px] font-bold text-charcoal/50 bg-background px-1.5 py-0.5 rounded border border-background-light uppercase tracking-widest truncate max-w-[120px]">
                                                        {item.category}
                                                    </span>
                                                    <span className={`text-[9px] font-bold uppercase tracking-wider ${item.skill_level === 'Beginner' ? 'text-mint' :
                                                        item.skill_level === 'Intermediate' ? 'text-accent' : 'text-primary'
                                                        }`}>
                                                        {item.skill_level}
                                                    </span>
                                                </div>

                                                <p className="font-black text-accent text-lg">€{item.price}</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>

                        {/* Fixed Footer / Payment Section */}
                        {items.length > 0 && (
                            <div className="flex-shrink-0 p-6 border-t border-background-light bg-secondary/10 shadow-[0_-10px_20px_-15px_rgba(0,0,0,0.1)]">
                                <div className="space-y-4 mb-6">
                                    <label className="block">
                                        <span className="text-[10px] font-bold text-charcoal/40 uppercase tracking-[0.2em] block mb-2">Delivery Details</span>
                                        <textarea
                                            className="w-full p-4 rounded-2xl border border-background-light bg-white focus:outline-none focus:ring-4 focus:ring-primary/5 transition-all text-sm"
                                            rows={2}
                                            placeholder="Enter your shipping address..."
                                        ></textarea>
                                    </label>
                                    <label className="block">
                                        <span className="text-[10px] font-bold text-charcoal/40 uppercase tracking-[0.2em] block mb-2">Contact Number</span>
                                        <input
                                            type="tel"
                                            className="w-full p-4 rounded-2xl border border-background-light bg-white focus:outline-none focus:ring-4 focus:ring-primary/5 transition-all text-sm"
                                            placeholder="+1 (555) 000-0000"
                                        />
                                    </label>
                                </div>

                                <div className="pt-2">
                                    <div className="flex justify-between items-end mb-6">
                                        <div>
                                            <span className="text-[10px] font-bold text-charcoal/40 uppercase tracking-[0.2em] block mb-1">Total Project Cost</span>
                                            <span className="text-3xl font-black text-primary tracking-tighter">
                                                €{items.reduce((sum, item) => sum + item.price, 0)}
                                            </span>
                                        </div>
                                        <div className="text-right">
                                            <span className="text-[10px] font-bold text-green-500 uppercase tracking-widest bg-green-50 px-2 py-1 rounded-full">Secure Transaction</span>
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-2 gap-4">
                                        <button className="flex items-center justify-center gap-2 py-4 bg-[#0070ba] text-white rounded-2xl font-bold hover:bg-[#005ea6] hover:scale-[1.02] active:scale-95 transition-all shadow-lg">
                                            <span className="text-base">PayPal</span>
                                        </button>
                                        <button className="flex items-center justify-center gap-2 py-4 bg-black text-white rounded-2xl font-bold hover:bg-neutral-800 hover:scale-[1.02] active:scale-95 transition-all shadow-lg">
                                            <span className="text-base">G Pay</span>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        )}

                        <div className="p-4 border-t border-background-light bg-white flex-shrink-0">
                            <p className="text-[9px] text-center text-charcoal/30 font-bold uppercase tracking-[0.3em]">
                                DISRUPTIVE PRODUCTION • NO TRADITIONAL RETAIL
                            </p>
                        </div>

                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
}
