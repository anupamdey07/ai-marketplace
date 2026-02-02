import { create } from 'zustand';
import { fetchAirtableData, upvoteAirtableProduct } from '@/services/airtable';
import { CommunityPost, Product } from '@/types';

interface ProductStore {
    products: Product[];
    posts: CommunityPost[];
    isLoading: boolean;
    error: string | null;
    fetchProducts: () => Promise<void>;
    upvoteProduct: (id: string) => Promise<void>;
}

// Helper to sort products: Real images first, then by upvotes
const sortProducts = (a: Product, b: Product) => {
    const aIsPlaceholder = !a.images || a.images.length === 0 || a.images[0] === '📦';
    const bIsPlaceholder = !b.images || b.images.length === 0 || b.images[0] === '📦';

    if (!aIsPlaceholder && bIsPlaceholder) return -1;
    if (aIsPlaceholder && !bIsPlaceholder) return 1;

    return b.upvotes - a.upvotes;
};

export const useProductStore = create<ProductStore>((set, get) => ({
    products: [],
    posts: [],
    isLoading: false,
    error: null,
    fetchProducts: async () => {
        set({ isLoading: true });
        try {
            const { products, posts } = await fetchAirtableData();
            if (products.length > 0 || posts.length > 0) {
                console.log(`🟢 Successfully loaded ${products.length} products and ${posts.length} posts from Airtable`);
                set({
                    products: products.sort(sortProducts),
                    posts: posts,
                    isLoading: false
                });
            } else {
                set({ isLoading: false });
            }
        } catch (error) {
            console.error('Failed to fetch from Airtable:', error);
            set({ error: 'Failed to fetch products', isLoading: false });
        }
    },
    upvoteProduct: async (id) => {
        const product = get().products.find(p => p.id === id);
        if (!product) return;

        // Optimistic update
        set((state) => ({
            products: [...state.products]
                .map((p) => (p.id === id ? { ...p, upvotes: p.upvotes + 1 } : p))
                .sort(sortProducts),
        }));

        // Persist to Airtable if it's an Airtable record
        if (id.startsWith('rec')) {
            try {
                await upvoteAirtableProduct(id, product.upvotes);
            } catch (error) {
                console.error('Failed to persist upvote to Airtable:', error);
            }
        }
    },
}));
