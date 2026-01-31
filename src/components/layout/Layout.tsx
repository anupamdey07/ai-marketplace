import { ReactNode } from 'react';
import Header from './Header';
import Footer from './Footer';
import AnnouncementBar from './AnnouncementBar';
import CartSidebar from './CartSidebar';
import { useUIStore } from '@/store/useUIStore';
import { useCartStore } from '@/store/useCartStore';

interface LayoutProps {
    children: ReactNode;
}

export default function Layout({ children }: LayoutProps) {
    const { isCartOpen, closeCart } = useUIStore();
    const { items: cartItems } = useCartStore();

    return (
        <div className="min-h-screen flex flex-col smooth-scroll relative">
            <AnnouncementBar />
            <Header />
            <main className="flex-1">{children}</main>
            <Footer />

            <CartSidebar
                isOpen={isCartOpen}
                onClose={closeCart}
                items={cartItems}
            />
        </div>
    );
}
