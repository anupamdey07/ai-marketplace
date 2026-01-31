import { useNavigate } from 'react-router-dom';
import { useRef, useState, useEffect } from 'react';
import { CategoryInfo } from '@/types';

const categories: CategoryInfo[] = [
    {
        id: 'Programmable Robotics',
        name: 'Programmable Robotics',
        icon: '🤖',
        description: 'Arduino, Raspberry Pi, Jetson bots',
        slug: 'robotics',
    },
    {
        id: 'Prompt-to-Product',
        name: 'Prompt-to-Product',
        icon: '🎨',
        description: 'Describe it, AI makes it',
        slug: 'prompt-to-product',
    },
    {
        id: '3D Printing Innovation',
        name: '3D Printing Innovation',
        icon: '🖨️',
        description: 'Physical creations',
        slug: '3d-printed',
    },
    {
        id: 'Assistant Boxes',
        name: 'Assistant Boxes',
        icon: '📦',
        description: 'Voice assistants, home companions',
        slug: 'assistants',
    },
    {
        id: 'Kids Learning Tools',
        name: 'Kids Learning Tools',
        icon: '👶',
        description: 'STEM, coding toys',
        slug: 'kids-learning',
    },
    {
        id: 'Voice Assistants',
        name: 'Voice Assistants',
        icon: '🎙️',
        description: 'Smart speakers',
        slug: 'voice',
    },
];

export default function CategoryScroll() {
    const navigate = useNavigate();
    const scrollRef = useRef<HTMLDivElement>(null);
    const [isPaused, setIsPaused] = useState(false);

    const scrollPosRef = useRef(0);

    // Auto-scroll animation
    useEffect(() => {
        const scrollContainer = scrollRef.current;
        if (!scrollContainer) return;

        let animationFrameId: number;

        // Initialize scroll position from DOM
        scrollPosRef.current = scrollContainer.scrollLeft;

        const animateScroll = () => {
            if (!isPaused && scrollContainer) {
                // Determine the width of one full set of items
                // We have 4 identical sets. The seamless point is exactly at 1/4 of total scrollWidth
                const totalWidth = scrollContainer.scrollWidth;
                const oneSetWidth = totalWidth / 4;

                // Speed of the auto-scroll
                scrollPosRef.current += 0.4;

                // Infinite loop logic:
                // If we've scrolled past the first set, seamless reset
                // Instead of setting to 0, regarding precision, we subtract oneSetWidth
                if (scrollPosRef.current >= oneSetWidth) {
                    scrollPosRef.current -= oneSetWidth;
                }

                scrollContainer.scrollLeft = scrollPosRef.current;
            } else if (scrollContainer) {
                // If paused or stopped, sync ref back to actual DOM position 
                // in case user manually scrolled
                scrollPosRef.current = scrollContainer.scrollLeft;
            }
            animationFrameId = requestAnimationFrame(animateScroll);
        };

        animationFrameId = requestAnimationFrame(animateScroll);

        return () => cancelAnimationFrame(animationFrameId);
    }, [isPaused]);

    const scroll = (direction: 'left' | 'right') => {
        if (scrollRef.current) {
            const { scrollLeft } = scrollRef.current;
            const scrollAmount = 300;

            // For manual scroll
            const targetScroll = direction === 'left'
                ? scrollLeft - scrollAmount
                : scrollLeft + scrollAmount;

            scrollRef.current.scrollTo({
                left: targetScroll,
                behavior: 'smooth'
            });
        }
    };

    // Quadruple categories for seamless infinite scroll (Buffer-Real-Buffer-Buffer)
    const displayCategories = [...categories, ...categories, ...categories, ...categories];

    return (
        <section className="py-24 bg-background-light/30 relative">
            <div className="container-custom relative">
                <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
                    <div className="max-w-2xl">
                        <h2 className="font-heading text-4xl md:text-5xl font-bold mb-4 text-primary">
                            Discover Trending Topics
                        </h2>
                        <p className="text-charcoal/70 text-lg">
                            Explore curated AI hardware categories. From robots to voice assistants,
                            discover products vetted for traction and documentation.
                        </p>
                    </div>
                </div>

                {/* Main Scroll Container with Overlay Arrows */}
                <div
                    className="relative group/scroll"
                    onMouseEnter={() => setIsPaused(true)}
                    onMouseLeave={() => setIsPaused(false)}
                >
                    {/* Left Arrow - Floating */}
                    <button
                        onClick={() => scroll('left')}
                        className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-6 z-20 w-16 h-16 rounded-full bg-white text-primary border-4 border-background-light shadow-soft flex items-center justify-center hover:bg-primary hover:text-white transition-all hover:scale-110 active:scale-95 hidden lg:flex"
                        aria-label="Scroll Left"
                    >
                        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M15 19l-7-7 7-7" />
                        </svg>
                    </button>

                    <div
                        ref={scrollRef}
                        className="flex overflow-x-auto gap-6 pb-8 custom-scrollbar -mx-4 px-4 md:mx-0 md:px-0"
                    >
                        {displayCategories.map((category, index) => (
                            <button
                                key={`${category.id}-${index}`}
                                onClick={() => navigate(`/explore/${encodeURIComponent(category.name)}`)}
                                className="snap-start flex-shrink-0 w-[300px] group"
                            >
                                <div className="card h-full flex flex-col items-start text-left bg-white group-hover:border-primary transition-all group-hover:shadow-lg rounded-[32px] p-8">
                                    <div className="w-20 h-20 rounded-3xl bg-secondary flex items-center justify-center text-5xl mb-8 group-hover:scale-110 transition-transform">
                                        {category.icon}
                                    </div>
                                    <h3 className="font-heading font-bold text-2xl mb-3 text-primary">
                                        {category.name}
                                    </h3>
                                    <p className="text-charcoal/60 text-sm leading-relaxed mb-8 flex-1">
                                        {category.description}
                                    </p>
                                    <div className="flex items-center text-accent font-bold text-sm">
                                        <span>Explore Items</span>
                                        <svg className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                                        </svg>
                                    </div>
                                </div>
                            </button>
                        ))}
                    </div>

                    {/* Right Arrow - Floating */}
                    <button
                        onClick={() => scroll('right')}
                        className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-6 z-20 w-16 h-16 rounded-full bg-white text-primary border-4 border-background-light shadow-soft flex items-center justify-center hover:bg-primary hover:text-white transition-all hover:scale-110 active:scale-95 hidden lg:flex"
                        aria-label="Scroll Right"
                    >
                        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M9 5l7 7-7 7" />
                        </svg>
                    </button>
                </div>

                {/* Mobile/Tablet Bottom Navigation Buttons */}
                <div className="flex justify-center gap-6 mt-12 lg:hidden">
                    <button
                        onClick={() => scroll('left')}
                        className="w-20 py-4 rounded-2xl bg-white border-2 border-background-light text-primary flex items-center justify-center hover:bg-secondary transition-colors shadow-sm"
                    >
                        <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M15 19l-7-7 7-7" />
                        </svg>
                    </button>
                    <button
                        onClick={() => scroll('right')}
                        className="w-20 py-4 rounded-2xl bg-white border-2 border-background-light text-primary flex items-center justify-center hover:bg-secondary transition-colors shadow-sm"
                    >
                        <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M9 5l7 7-7 7" />
                        </svg>
                    </button>
                </div>
            </div>
        </section>
    );
}
