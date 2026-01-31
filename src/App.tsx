import { Routes, Route } from 'react-router-dom'
import Layout from '@/components/layout/Layout'
import HomePage from '@/pages/HomePage'
import ExplorePage from '@/pages/ExplorePage'
import ProductPage from '@/pages/ProductPage'
import ProfilePage from '@/pages/ProfilePage'
import LeaderboardPage from '@/pages/LeaderboardPage'
import CommunityPage from '@/pages/CommunityPage'
import AboutPage from '@/pages/AboutPage'
import TrustPage from '@/pages/TrustPage'
import ComingSoonPage from '@/pages/ComingSoonPage'

import { useEffect } from 'react'
import { useProductStore } from '@/store/useProductStore'
import ScrollToTop from '@/components/common/ScrollToTop'

function App() {
    const fetchProducts = useProductStore((state) => state.fetchProducts)

    useEffect(() => {
        fetchProducts()
    }, [fetchProducts])

    return (
        <Layout>
            <ScrollToTop />
            <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/explore" element={<ExplorePage />} />
                <Route path="/explore/:category" element={<ExplorePage />} />
                <Route path="/products/:slug" element={<ProductPage />} />
                <Route path="/profile/:userId" element={<ProfilePage />} />
                <Route path="/leaderboard" element={<LeaderboardPage />} />

                {/* Secondary Pages */}
                <Route path="/about" element={<AboutPage />} />
                <Route path="/trust" element={<TrustPage />} />

                {/* Coming Soon / Placeholders */}
                <Route path="/community" element={<CommunityPage />} />
                <Route path="/blog" element={<ComingSoonPage />} />
                <Route path="/governance" element={<ComingSoonPage />} />
                <Route path="/docs" element={<ComingSoonPage />} />
                <Route path="/help" element={<ComingSoonPage />} />
                <Route path="/contact" element={<ComingSoonPage />} />
                <Route path="/privacy" element={<ComingSoonPage />} />
                <Route path="/terms" element={<ComingSoonPage />} />
                <Route path="/login" element={<ComingSoonPage />} />
                <Route path="/cart" element={<ComingSoonPage />} />

                {/* Catch-all */}
                <Route path="*" element={<ComingSoonPage />} />
            </Routes>
        </Layout>
    )
}

export default App
