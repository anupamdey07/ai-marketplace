import { useState } from 'react';
import { motion, useMotionValue } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { CategoryInfo } from '@/types';

const categories: CategoryInfo[] = [
    {
        id: 'Programmable Robotics',
        name: 'Programmable Robotics',
        icon: '🤖',
        description: 'Build and program your own robots',
        slug: 'robotics',
    },
    {
        id: 'Prompt-to-Product',
        name: 'Prompt-to-Product',
        icon: '🎨',
        description: 'Create with AI-powered tools',
        slug: '3d-printed',
    },
    {
        id: '3D Printing Innovation',
        name: '3D Printing Innovation',
        icon: '🖨️',
        description: 'Custom 3D printed gadgets',
        slug: '3d-printed',
    },
    {
        id: 'Assistant Boxes',
        name: 'Assistant Boxes',
        icon: '📦',
        description: 'Smart assistant devices',
        slug: 'assistants',
    },
    {
        id: 'Kids Learning Tools',
        name: 'Kids Learning Tools',
        icon: '👶',
        description: 'Educational STEM products',
        slug: 'kids-learning',
    },
    {
        id: 'Voice Assistants',
        name: 'Voice Assistants',
        icon: '🎙️',
        description: 'Voice-enabled AI products',
        slug: 'voice',
    },
];

export default function CrystalBallDial() {
    const navigate = useNavigate();
    const [selectedIndex, setSelectedIndex] = useState(0);
    const rotation = useMotionValue(0);

    const handleCategoryClick = (category: CategoryInfo, index: number) => {
        setSelectedIndex(index);
        navigate(`/explore/${category.slug}`);
    };

    const handleDrag = (_: any, info: any) => {
        const newRotation = rotation.get() + info.offset.x * 0.5;
        rotation.set(newRotation);
    };

    return (
        <section className="py-20 bg-gradient-to-b from-background to-surface/30">
            <div className="container-custom">
                <div className="text-center mb-12">
                    <h2 className="font-heading text-4xl md:text-5xl font-bold mb-4">
                        Explore By{' '}
                        <span className="text-gradient">Category</span>
                    </h2>
                    <p className="text-primary/70 text-lg max-w-2xl mx-auto">
                        Discover innovative AI-powered products across different categories.
                        From robots to voice assistants, find your next creation.
                    </p>
                </div>

                {/* Crystal Ball Dial */}
                <div className="relative max-w-4xl mx-auto">
                    {/* Dial Container */}
                    <div className="relative h-96 flex items-center justify-center">
                        <motion.div
                            drag="x"
                            dragConstraints={{ left: 0, right: 0 }}
                            dragElastic={0.1}
                            onDrag={handleDrag}
                            className="relative w-full h-full flex items-center justify-center cursor-grab active:cursor-grabbing"
                        >
                            {/* Category Items in Circle */}
                            {categories.map((category, index) => {
                                const totalCategories = categories.length;
                                const angle = (index * 360) / totalCategories;
                                const radius = 180; // Distance from center

                                const x = Math.cos((angle * Math.PI) / 180) * radius;
                                const y = Math.sin((angle * Math.PI) / 180) * radius;

                                const isSelected = index === selectedIndex;

                                return (
                                    <motion.button
                                        key={category.id}
                                        onClick={() => handleCategoryClick(category, index)}
                                        className="absolute"
                                        style={{
                                            left: '50%',
                                            top: '50%',
                                            transform: `translate(calc(-50% + ${x}px), calc(-50% + ${y}px))`,
                                        }}
                                        whileHover={{ scale: 1.1 }}
                                        whileTap={{ scale: 0.95 }}
                                        initial={{ opacity: 0, scale: 0 }}
                                        animate={{
                                            opacity: 1,
                                            scale: isSelected ? 1.2 : 1,
                                        }}
                                        transition={{
                                            type: 'spring',
                                            stiffness: 300,
                                            damping: 20,
                                            delay: index * 0.1,
                                        }}
                                    >
                                        <div
                                            className={`
                        relative group
                        ${isSelected ? 'z-10' : 'z-0'}
                      `}
                                        >
                                            {/* Icon Circle */}
                                            <div
                                                className={`
                          w-20 h-20 rounded-full flex items-center justify-center text-4xl
                          transition-all duration-300
                          ${isSelected
                                                        ? 'bg-gradient-to-br from-secondary to-accent shadow-2xl shadow-secondary/50'
                                                        : 'bg-white border-2 border-surface shadow-lg hover:shadow-xl'
                                                    }
                        `}
                                            >
                                                <span className={isSelected ? 'filter drop-shadow-md' : ''}>
                                                    {category.icon}
                                                </span>
                                            </div>

                                            {/* Label */}
                                            <div
                                                className={`
                          absolute top-full mt-3 left-1/2 -translate-x-1/2 
                          whitespace-nowrap text-sm font-medium transition-all duration-200
                          ${isSelected ? 'text-secondary font-semibold' : 'text-primary/70'}
                        `}
                                            >
                                                {category.name}
                                            </div>

                                            {/* Hover Tooltip */}
                                            <div className="absolute bottom-full mb-3 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
                                                <div className="bg-primary text-white text-xs px-3 py-2 rounded-lg shadow-lg whitespace-nowrap">
                                                    {category.description}
                                                    <div className="absolute top-full left-1/2 -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-primary" />
                                                </div>
                                            </div>
                                        </div>
                                    </motion.button>
                                );
                            })}

                            {/* Center Info */}
                            <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-center pointer-events-none">
                                <motion.div
                                    key={selectedIndex}
                                    initial={{ opacity: 0, scale: 0.8 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    transition={{ duration: 0.3 }}
                                >
                                    <div className="text-6xl mb-2">{categories[selectedIndex].icon}</div>
                                    <h3 className="font-heading font-bold text-xl mb-1">
                                        {categories[selectedIndex].name}
                                    </h3>
                                    <p className="text-sm text-primary/60">
                                        {categories[selectedIndex].description}
                                    </p>
                                </motion.div>
                            </div>
                        </motion.div>
                    </div>

                    {/* Navigation Dots */}
                    <div className="flex justify-center gap-2 mt-8">
                        {categories.map((_, index) => (
                            <button
                                key={index}
                                onClick={() => setSelectedIndex(index)}
                                className={`
                  w-2 h-2 rounded-full transition-all duration-300
                  ${index === selectedIndex
                                        ? 'bg-secondary w-8'
                                        : 'bg-surface hover:bg-primary/20'
                                    }
                `}
                                aria-label={`Select ${categories[index].name}`}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
