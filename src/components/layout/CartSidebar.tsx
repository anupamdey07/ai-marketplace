import { motion, AnimatePresence } from 'framer-motion';
import { Product } from '@/types';

interface CartSidebarProps {
    isOpen: boolean;
    onClose: () => void;
    items: Product[];
}

export default function CartSidebar({ isOpen, onClose, items }: CartSidebarProps) {
    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="fixed inset-0 bg-charcoal/20 backdrop-blur-sm z-[60]"
                    />
                    <motion.div
                        initial={{ x: '100%' }}
                        animate={{ x: 0 }}
                        exit={{ x: '100%' }}
                        transition={{ type: 'spring', damping: 25, stiffness: 200 }}
                        className="fixed right-0 top-0 h-full w-full max-w-md bg-white shadow-2xl z-[70] flex flex-col"
                    >
                        <div className="p-6 border-b border-background-light flex items-center justify-between">
                            <h2 className="font-heading text-2xl font-bold text-primary">Your Checkout</h2>
                            <button onClick={onClose} className="p-2 hover:bg-background-light rounded-full transition-colors">
                                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </button>
                        </div>

                        <div className="flex-1 overflow-y-auto p-6 custom-scrollbar">
                            {items.length === 0 ? (
                                <div className="text-center py-20">
                                    <span className="text-6xl block mb-4">🛒</span>
                                    <p className="text-charcoal/50 font-bold">Your cart is empty</p>
                                    <button
                                        onClick={onClose}
                                        className="mt-6 text-accent font-bold hover:underline"
                                    >
                                        Start Exploring →
                                    </button>
                                </div>
                            ) : (
                                <div className="space-y-6">
                                    {items.map((item) => (
                                        <div key={item.id} className="flex gap-4">
                                            <div className="w-20 h-20 rounded-xl bg-background-light flex items-center justify-center text-3xl overflow-hidden shrink-0">
                                                {item.images[0]?.startsWith('http') ? (
                                                    <img src={item.images[0]} alt={item.name} className="w-full h-full object-cover" />
                                                ) : (
                                                    item.images[0]
                                                )}
                                            </div>
                                            <div className="flex-1">
                                                <h3 className="font-bold text-primary">{item.name}</h3>
                                                <p className="text-xs text-charcoal/40 mb-2">{item.category}</p>
                                                <p className="font-bold text-accent">${item.price}</p>
                                            </div>
                                        </div>
                                    ))}

                                    <div className="mt-10 space-y-4 pt-10 border-t border-background-light">
                                        <div className="space-y-4">
                                            <label className="block">
                                                <span className="text-xs font-bold text-charcoal/40 uppercase tracking-widest block mb-2">Shipping Address</span>
                                                <textarea
                                                    className="w-full p-3 rounded-xl border border-background-light bg-secondary/30 focus:outline-none focus:ring-2 focus:ring-primary/20"
                                                    rows={3}
                                                    placeholder="Enter your address..."
                                                ></textarea>
                                            </label>
                                            <label className="block">
                                                <span className="text-xs font-bold text-charcoal/40 uppercase tracking-widest block mb-2">Phone Number</span>
                                                <input
                                                    type="tel"
                                                    className="w-full p-3 rounded-xl border border-background-light bg-secondary/30 focus:outline-none focus:ring-2 focus:ring-primary/20"
                                                    placeholder="+1 (555) 000-0000"
                                                />
                                            </label>
                                        </div>

                                        <div className="pt-6">
                                            <div className="flex justify-between mb-6">
                                                <span className="font-bold text-charcoal/60">Total</span>
                                                <span className="text-2xl font-black text-primary">
                                                    ${items.reduce((sum, item) => sum + item.price, 0)}
                                                </span>
                                            </div>

                                            <div className="grid grid-cols-2 gap-4">
                                                <button className="flex items-center justify-center gap-2 py-4 bg-[#0070ba] text-white rounded-xl font-bold hover:bg-[#005ea6] transition-colors shadow-lg">
                                                    <span className="text-lg">PayPal</span>
                                                </button>
                                                <button className="flex items-center justify-center gap-2 py-4 bg-black text-white rounded-xl font-bold hover:bg-neutral-800 transition-colors shadow-lg">
                                                    <span className="text-lg">Google Pay</span>
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>

                        <div className="p-6 border-t border-background-light bg-background-light/10">
                            <p className="text-[10px] text-center text-charcoal/40 font-mono">
                                ONE-STEP CHECKOUT • SECURE PAYMENTS • NO TRADITIONAL CART
                            </p>
                        </div>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
}
