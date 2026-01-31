import { create } from 'zustand';

interface UIStore {
    isCartOpen: boolean;
    isLoginModalOpen: boolean;
    openCart: () => void;
    closeCart: () => void;
    openLoginModal: () => void;
    closeLoginModal: () => void;
}

export const useUIStore = create<UIStore>((set) => ({
    isCartOpen: false,
    isLoginModalOpen: false,
    openCart: () => set({ isCartOpen: true }),
    closeCart: () => set({ isCartOpen: false }),
    openLoginModal: () => set({ isLoginModalOpen: true }),
    closeLoginModal: () => set({ isLoginModalOpen: false }),
}));
