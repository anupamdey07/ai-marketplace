import { create } from 'zustand';
import { Product } from '@/types';

interface CartStore {
    items: Product[];
    addItem: (product: Product) => void;
    removeItem: (productId: string) => void;
    clearCart: () => void;
}

export const useCartStore = create<CartStore>((set) => ({
    items: [],
    addItem: (product) => set((state) => {
        // Since the PRD says "no traditional cart" and "one-step checkout",
        // we might only support one item at a time or just append. 
        // For now, let's treat it as a standard cart but we will implement the 
        // one-step checkout UI.
        const exists = state.items.find(item => item.id === product.id);
        if (exists) return state;
        return { items: [...state.items, product] };
    }),
    removeItem: (productId) => set((state) => ({
        items: state.items.filter(item => item.id !== productId)
    })),
    clearCart: () => set({ items: [] }),
}));
