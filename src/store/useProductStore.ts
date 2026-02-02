import { create } from 'zustand';
import { Product, User } from '@/types';
import { fetchAirtableProducts, upvoteAirtableProduct } from '@/services/airtable';

interface ProductStore {
    products: Product[];
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

// Initial mock data with updated categories and researched products
const initialProducts: Product[] = [
    {
        id: 'spiritual-001',
        name: 'Krishna Companion Box',
        category: 'Assistant Boxes',
        subCategory: 'Spiritual Companions',
        description: 'Krishna Companion Box brings ancient wisdom into your daily life through conversational AI. Ask questions about life, dharma, karma, and receive personalized guidance based on the Bhagavad Gita\'s 700 verses. Privacy-first edge AI ensures your spiritual journey stays personal.',
        price: 199,
        images: ['/images/krishna-companion-box.png'],
        creator: {
            id: 'openai-hardware',
            name: 'OpenAI Hardware',
            username: 'openai_hardware',
            badge: 'Maker',
            credibility_score: 95,
            products: [],
            contributions: [],
            posts: []
        },
        status: 'Coming Soon',
        upvotes: 112,
        privacy_verified: true,
        launch_date: '2026-07-01',
        slug: 'krishna-companion-box',
        skill_level: 'Beginner'
    },
    {
        id: 'spiritual-002',
        name: 'Vedanta Wisdom Box',
        category: 'Assistant Boxes',
        subCategory: 'Spiritual Companions',
        description: 'Vedanta Wisdom Box is your personal guide to Advaita Vedanta philosophy. Explore profound questions of consciousness, self, and reality through conversations with an AI trained on the Upanishads and teachings of great Vedantic masters. Perfect for deep meditation and philosophical inquiry.',
        price: 229,
        images: ['/images/vedanta-wisdom-box.png'],
        creator: {
            id: 'openai-hardware',
            name: 'OpenAI Hardware',
            username: 'openai_hardware',
            badge: 'Maker',
            credibility_score: 95,
            products: [],
            contributions: [],
            posts: []
        },
        status: 'Coming Soon',
        upvotes: 89,
        privacy_verified: true,
        launch_date: '2026-07-01',
        slug: 'vedanta-wisdom-box',
        skill_level: 'Advanced'
    },
    {
        id: 'real-1',
        name: 'Reachy Mini',
        category: 'Programmable Robotics',
        description: 'An open-source desktop robot designed for AI experimentation. Features 6 Degrees of Freedom, motorized antennas for expression, and deep Hugging Face integration. Powered by Raspberry Pi 5 (Wireless) or ESP32 (Lite).',
        price: 299,
        images: ['https://cdn-uploads.huggingface.co/production/uploads/671faa3a541a76b548647676/uEa13KsL5wtQREVZ1ixwc.png'],
        creator: {
            id: 'pollen',
            name: 'Pollen Robotics',
            username: 'pollen_robotics',
            bio: 'Building open-source robots for AI research and education.',
            location: 'Bordeaux, France',
            website: 'https://pollen-robotics.com',
            badge: 'Maker',
            instagram: 'PollenRobotics',
            credibility_score: 98,
            avatar: 'https://github.com/pollen-robotics.png',
            products: [],
            contributions: [],
            posts: [
                {
                    id: 'post-1',
                    author: { id: 'pollen', name: 'Pollen Robotics', username: 'pollen_robotics', instagram: 'PollenRobotics', badge: 'Maker', credibility_score: 98, avatar: 'https://github.com/pollen-robotics.png', products: [], contributions: [], posts: [] } as unknown as User,
                    content: "Reachy Mini is now shipping! Can't wait to see what you build. 🦾 #opensource #robotics",
                    images: ['https://www.pollen-robotics.com/wp-content/uploads/2025/06/Reachy_mini_website_stuff00558988-ezgif.com-video-to-gif-converter.gif'],
                    hashtags: ['opensource', 'robotics'],
                    timestamp: '2025-08-01T10:00:00Z',
                    likes: 124,
                    replies: 12
                }
            ]
        },
        status: 'Available',
        upvotes: 245,
        privacy_verified: true,
        launch_date: '2025-08-01',
        slug: 'reachy-mini',
        skill_level: 'Beginner',
        external_link: 'https://pollen-robotics-reachy-mini.hf.space/',
        apps: [
            {
                id: 'app-1',
                name: 'Reachy Control Center',
                description: 'Official dashboard to control your Reachy robot, manage updates, and monitor hardware status.',
                certified: true,
                downloads: 1205,
                creator: { id: 'pollen', name: 'Pollen Robotics', username: 'pollen_robotics', instagram: 'PollenRobotics', badge: 'Maker', credibility_score: 98, products: [], contributions: [], posts: [] },
                product: {} as unknown as Product
            }
        ]
    },
    {
        id: 'real-2',
        name: 'Sticker Box',
        category: 'Prompt-to-Product',
        subCategory: 'Physical prompt boxes',
        description: 'Voice-activated AI sticker printer for kids. Transform imaginative ideas into tangible stickers instantly using 203 DPI ink-free thermal technology. Features built-in content filters and high-privacy local processing.',
        price: 95,
        images: ['https://stickerbox.com/cdn/shop/files/stickerbox-landing-gif.gif?v=1762813714&width=1920'],
        creator: {
            id: 'hapiko',
            name: 'Hapiko',
            username: 'hapiko_labs',
            bio: 'Making magic tangible for kids through AI.',
            badge: 'Maker',
            credibility_score: 94,
            avatar: 'https://ui-avatars.com/api/?name=Hapiko&background=ff5264&color=fff',
            products: [],
            contributions: [],
            posts: [
                {
                    id: 'post-2',
                    author: { id: 'hapiko', name: 'Hapiko', username: 'hapiko_labs', badge: 'Maker', credibility_score: 94, avatar: 'https://ui-avatars.com/api/?name=Hapiko&background=ff5264&color=fff', products: [], contributions: [], posts: [] } as unknown as User,
                    content: "Our space collection is a hit with the early testers! 🚀 ✨ #stickerbox #ai",
                    images: ['https://stickerbox.com/cdn/shop/files/stickerbox-landing-gif.gif?v=1762813714&width=1920'],
                    hashtags: ['stickerbox', 'ai'],
                    timestamp: '2024-11-20T14:30:00Z',
                    likes: 89,
                    replies: 5
                }
            ]
        },
        status: 'Available',
        upvotes: 189,
        privacy_verified: true,
        launch_date: '2024-11-20',
        slug: 'sticker-box',
        skill_level: 'Beginner',
        external_link: 'https://stickerbox.com/'
    },
    {
        id: 'real-4',
        name: 'Bambu Lab A1 Mini',
        category: '3D Printing Innovation',
        subCategory: 'Consumer 3D Printers',
        description: 'The ultimate beginner-friendly 3D printer with AI active flow control and automatic bed leveling. Features spaghetti detection and remote monitoring via camera. Perfect for high-speed, reliable printing.',
        price: 249,
        images: ['https://portal.bblmw.com/a1/video/print-8bbbda52c0ea5/0.jpg'],
        creator: {
            id: 'bambulab',
            name: 'Bambu Lab',
            username: 'bambulab_official',
            badge: 'Maker',
            instagram: 'bambulab',
            credibility_score: 97,
            products: [], contributions: [], posts: []
        },
        status: 'Available',
        upvotes: 212,
        privacy_verified: true,
        launch_date: '2024-10-01',
        slug: 'bambu-a1-mini',
        skill_level: 'Beginner',
        external_link: 'https://bambulab.com/en-eu/a1-mini'
    },
    {
        id: 'real-5',
        name: 'Creality K1C',
        category: '3D Printing Innovation',
        subCategory: 'Consumer 3D Printers',
        description: 'Enclosed AI-powered 3D printer with an integrated AI camera for real-time monitoring and failure detection. Optimized for carbon fiber and other technical filaments. 600mm/s top speed.',
        price: 499,
        images: ['https://www.creality3dofficial.eu/files/html/20240516/k1-c-3d-printer-SAM.jpg'],
        creator: {
            id: 'creality',
            name: 'Creality',
            username: 'creality_3d',
            badge: 'Maker',
            instagram: 'creality3d',
            credibility_score: 92,
            products: [], contributions: [], posts: []
        },
        status: 'Available',
        upvotes: 195,
        privacy_verified: true,
        launch_date: '2024-05-15',
        slug: 'creality-k1c',
        skill_level: 'Intermediate',
        external_link: 'https://www.creality.com/products/creality-k1c-3d-printer'
    },

    {
        id: 'real-7',
        name: 'Vento Argo R1 Adaptive',
        category: '3D Printing Innovation',
        subCategory: '3D Printed Products',
        description: '3D-printed short-nosed racing saddle with a carbon-reinforced nylon shell and highly responsive zonal cushioning. Developed using Carbon® Digital Light Synthesis™ technology for ultimate pressure relief.',
        price: 299,
        images: ['https://www.fizik.com/cdn/shop/files/fizik-vento-argo-adaptive-r1-2-road-racing-3d-printed-padding-large-size_1.jpg?v=1751293585'],
        creator: {
            id: 'fizik',
            name: 'fizik',
            username: 'fizik_official',
            badge: 'Maker',
            instagram: 'fizikofficial',
            credibility_score: 95,
            products: [], contributions: [], posts: []
        },
        status: 'Available',
        upvotes: 142,
        privacy_verified: true,
        launch_date: '2024-03-20',
        slug: 'ai-lattice-saddle',
        skill_level: 'Advanced',
        external_link: 'https://www.fizik.com/en-de/products/saddles-vento-argo-r1-adaptive-black-vargor1aa0'
    },
    {
        id: 'real-8',
        name: 'Cloud Factory AI Jewelry',
        category: 'Prompt-to-Product',
        subCategory: 'Custom 3D Printed Dropship',
        description: 'Launch your personal branded jewelry merchandise with 3D-printed silver. Cloud Factory handles everything from AI-assisted design to sustainable production and drop-shipping fulfillment. Zero inventory, 100% professional jewelry quality.',
        price: 120,
        images: ['https://cdn.prod.website-files.com/631f177de10b3f511d17d488/631f177de10b3f2af217d4a6_AlanWalker-3-square.jpg'],
        creator: {
            id: 'cloudfactory',
            name: 'Cloud Factory',
            username: 'cloud_factory',
            website: 'https://www.cloudfactory.jewelry/',
            badge: 'Maker',
            credibility_score: 93,
            products: [], contributions: [], posts: []
        },
        status: 'Available',
        upvotes: 128,
        privacy_verified: true,
        launch_date: '2024-01-10',
        slug: 'cloud-factory-jewelry',
        skill_level: 'Beginner',
        external_link: 'https://www.cloudfactory.jewelry/'
    },
    {
        id: 'real-3',
        name: 'Nybble',
        category: 'Programmable Robotics',
        description: 'An open-source, palm-sized robotic cat that runs on Arduino. Nybble can explore its environment, learn tricks, and even fight with other Nybbles. A perfect STEM kit for coding and robotics.',
        price: 249,
        images: ['https://www.petoi.com/cdn/shop/files/nybblesayhi_800x.jpg?v=1712770915'],
        creator: {
            id: 'petoi',
            name: 'Petoi',
            username: 'petoi_robotics',
            bio: 'Open Source Robotic Pets for STEM Education.',
            badge: 'Maker',
            instagram: 'petoicamp',
            credibility_score: 96,
            avatar: 'https://ui-avatars.com/api/?name=Petoi&background=FFB5C2&color=fff',
            products: [],
            contributions: [],
            posts: [
                {
                    id: 'post-3',
                    author: { id: 'petoi', name: 'Petoi', username: 'petoi_robotics', instagram: 'petoicamp', badge: 'Maker', credibility_score: 96, avatar: 'https://ui-avatars.com/api/?name=Petoi&background=FFB5C2&color=fff', products: [], contributions: [], posts: [] } as unknown as User,
                    content: "Nybble 2.0 is purring perfectly. Open source mechanics make it fully hackable. 😺⚙️ #robotics #cat",
                    images: ['https://www.petoi.com/cdn/shop/files/nybblesayhi_800x.jpg?v=1712770915'],
                    hashtags: ['robotics', 'cat'],
                    timestamp: '2024-01-16T09:15:00Z',
                    likes: 210,
                    replies: 45
                }
            ]
        },
        status: 'Available',
        upvotes: 175,
        privacy_verified: true,
        launch_date: '2024-01-15',
        slug: 'nybble',
        skill_level: 'Intermediate',
        external_link: 'https://www.petoi.com/pages/nybble-open-source-robotic-cat'
    },
    {
        id: '1',
        name: 'OpenVibe Visualizer',
        category: 'Assistant Boxes',
        description: 'Real-time music visualization hardware using ESP32.',
        price: 89,
        images: ['🎨'],
        creator: { id: 'u1', name: 'Alex Maker', username: 'alex_maker', badge: 'Maker', credibility_score: 95, avatar: 'https://i.pravatar.cc/150?u=1', products: [], contributions: [], posts: [] },
        status: 'Coming Soon',
        upvotes: 142,
        privacy_verified: true,
        launch_date: '2024-01-15',
        slug: 'openvibe-visualizer',
        skill_level: 'Advanced'
    },
    {
        id: '2',
        name: 'Planted AI',
        category: '3D Printing Innovation',
        subCategory: '3D Printed Products',
        description: 'Smart soil monitoring and hydration system.',
        price: 45,
        images: ['🌿'],
        creator: { id: 'u2', name: 'Sarah Green', username: 'sarah_green', badge: 'Maker', credibility_score: 88, products: [], contributions: [], posts: [] },
        status: 'Coming Soon',
        upvotes: 128,
        privacy_verified: true,
        launch_date: '2024-01-10',
        slug: 'planted-ai',
        skill_level: 'Beginner'
    },
    {
        id: '3',
        name: 'SentiBot Mini',
        category: 'Programmable Robotics',
        description: 'Emotionally responsive desk companion robot.',
        price: 120,
        images: ['🤖'],
        creator: { id: 'u3', name: 'RoboTeam', username: 'roboteam', badge: 'Maker', credibility_score: 92, products: [], contributions: [], posts: [] },
        status: 'Coming Soon',
        upvotes: 115,
        privacy_verified: true,
        launch_date: '2024-02-01',
        slug: 'sentibot-mini',
        skill_level: 'Intermediate'
    },
    {
        id: '4',
        name: 'GazeDesk',
        category: 'Assistant Boxes',
        description: 'Eye-tracking productivity interface for deep work.',
        price: 199,
        images: ['眼镜'],
        creator: { id: 'u4', name: 'Visionary', username: 'visionary_tech', badge: 'Maker', credibility_score: 96, products: [], contributions: [], posts: [] },
        status: 'Coming Soon',
        upvotes: 98,
        privacy_verified: true,
        launch_date: '2023-12-20',
        slug: 'gazedesk',
        skill_level: 'Advanced'
    },
    {
        id: '5',
        name: 'Lumina Pad',
        category: 'Kids Learning Tools',
        description: 'Mood-synced smart lighting controller for kids.',
        price: 35,
        images: ['💡'],
        creator: { id: 'u5', name: 'BrightKids', username: 'brightkids', badge: 'Maker', credibility_score: 85, products: [], contributions: [], posts: [] },
        status: 'Coming Soon',
        upvotes: 84,
        privacy_verified: true,
        launch_date: '2024-01-05',
        slug: 'lumina-pad',
        skill_level: 'Beginner'
    },
    {
        id: '6',
        name: 'VoiceNote Box',
        category: 'Voice Assistants',
        description: 'Physical voice-to-text journal with e-ink display.',
        price: 150,
        images: ['🎙️'],
        creator: { id: 'u6', name: 'Journaler', username: 'journaler_pro', badge: 'Maker', credibility_score: 89, products: [], contributions: [], posts: [] },
        status: 'Coming Soon',
        upvotes: 76,
        privacy_verified: true,
        launch_date: '2024-03-01',
        slug: 'voicenote-box',
        skill_level: 'Intermediate'
    },
    {
        id: '7',
        name: 'Smart Chess Board',
        category: 'Kids Learning Tools',
        description: 'AI-powered chess trainer with physical pieces.',
        price: 299,
        images: ['♟️'],
        creator: { id: 'u7', name: 'ChessMaster', username: 'chessmaster_ai', badge: 'Maker', credibility_score: 94, products: [], contributions: [], posts: [] },
        status: 'Coming Soon',
        upvotes: 72,
        privacy_verified: true,
        launch_date: '2023-11-15',
        slug: 'smart-chess-board',
        skill_level: 'Beginner'
    },
    {
        id: '8',
        name: 'EcoMonitor 1',
        category: '3D Printing Innovation',
        subCategory: '3D Printed Products',
        description: 'Solar-powered air quality sensor node.',
        price: 55,
        images: ['🌬️'],
        creator: { id: 'u8', name: 'EcoMakers', username: 'ecomakers_org', badge: 'Maker', credibility_score: 82, products: [], contributions: [], posts: [] },
        status: 'Coming Soon',
        upvotes: 68,
        privacy_verified: true,
        launch_date: '2024-01-20',
        slug: 'ecomonitor-1',
        skill_level: 'Intermediate'
    },
    {
        id: '9',
        name: 'Braille Reader Pro',
        category: 'Kids Learning Tools',
        description: 'Portable braille refreshable display for students.',
        price: 450,
        images: ['🔡'],
        creator: { id: 'u9', name: 'AccessibilityLads', username: 'access_lads', badge: 'Maker', credibility_score: 98, products: [], contributions: [], posts: [] },
        status: 'Coming Soon',
        upvotes: 61,
        privacy_verified: true,
        launch_date: '2024-04-10',
        slug: 'braille-reader-pro',
        skill_level: 'Advanced'
    },
    {
        id: '10',
        name: 'PetFeed AI',
        category: '3D Printing Innovation',
        subCategory: '3D Printed Products',
        description: 'Facial recognition based automatic pet feeder.',
        price: 180,
        images: ['🐱'],
        creator: { id: 'u10', name: 'PetLovers', username: 'petlovers_official', badge: 'Maker', credibility_score: 90, products: [], contributions: [], posts: [] },
        status: 'Coming Soon',
        upvotes: 55,
        privacy_verified: true,
        launch_date: '2023-10-05',
        slug: 'petfeed-ai',
        skill_level: 'Intermediate'
    },
    {
        id: '11',
        name: 'FocusCube',
        category: 'Assistant Boxes',
        description: 'Physical timer that locks your phone during sessions.',
        price: 25,
        images: ['🧊'],
        creator: { id: 'u11', name: 'ProductiveDev', username: 'productive_dev', badge: 'Maker', credibility_score: 84, products: [], contributions: [], posts: [] },
        status: 'Coming Soon',
        upvotes: 49,
        privacy_verified: true,
        launch_date: '2024-01-25',
        slug: 'focuscube',
        skill_level: 'Beginner'
    },
    {
        id: '12',
        name: 'WeatherBox',
        category: 'Assistant Boxes',
        description: 'Mechanical weather station for your desk.',
        price: 110,
        images: ['☁️'],
        creator: { id: 'u12', name: 'DeskGears', username: 'desk_gears', badge: 'Maker', credibility_score: 87, products: [], contributions: [], posts: [] },
        status: 'Coming Soon',
        upvotes: 42,
        privacy_verified: true,
        launch_date: '2023-09-12',
        slug: 'weatherbox',
        skill_level: 'Beginner'
    },


];

export const useProductStore = create<ProductStore>((set, get) => ({
    products: initialProducts,
    isLoading: false,
    error: null,
    fetchProducts: async () => {
        set({ isLoading: true });
        try {
            const products = await fetchAirtableProducts();
            if (products.length > 0) {
                console.log(`🟢 Successfully loaded ${products.length} products from Airtable`);
                set({ products: products.sort(sortProducts), isLoading: false });
            } else {
                set({ isLoading: false });
            }
        } catch (error) {
            console.error('Failed to fetch from Airtable, using mock data:', error);
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
