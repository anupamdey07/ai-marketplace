// Types based on Airtable schema from PRD

export type ProductStatus = 'Coming Soon' | 'Available' | 'Sold Out';

export type ProductCategory =
    | 'Programmable Robotics'
    | 'Prompt-to-Product'
    | '3D Printed Innovations'
    | 'Assistant Boxes'
    | 'Kids Learning Tools'
    | 'Voice Assistants';

// Subcategories for specific categories
export type PromptToProductSubcategory = 'Physical Boxes' | 'Dropship';
export type ThreeDPrintedSubcategory = 'Consumer 3D Printers' | '3D Printed Products';

export type ProductSubcategory = PromptToProductSubcategory | ThreeDPrintedSubcategory;

export type UserBadge = 'Member' | 'Contributor' | 'Maker';
export type SkillLevel = 'Beginner' | 'Intermediate' | 'Advanced';

export interface Product {
    id: string;
    name: string;
    category: ProductCategory;
    subCategory?: ProductSubcategory;
    description: string;
    price: number;
    images: string[];
    creator: User;
    status: ProductStatus;
    upvotes: number;
    privacy_verified: boolean;
    launch_date: string;
    slug: string;
    skill_level?: SkillLevel;
    external_link?: string;
    apps?: App[];
}

export interface User {
    id: string;
    name: string;
    username: string; // Handle for URL (e.g., @pollen)
    bio?: string;
    location?: string;
    website?: string;
    avatar?: string;
    badge: UserBadge;
    governance_tokens?: number;
    credibility_score: number;
    products: Product[];
    contributions: App[];
    posts: CommunityPost[];
}

export interface App {
    id: string;
    name: string;
    product: Product;
    creator: User;
    certified: boolean;
    downloads: number;
    description: string;
}

export interface CategoryInfo {
    id: ProductCategory;
    name: string;
    icon: string;
    description: string;
    slug: string;
}

export interface LeaderboardItem {
    product: Product;
    rank: number;
    trend: 'up' | 'down' | 'same';
}

export interface CommunityPost {
    id: string;
    author: User;
    content: string;
    images?: string[];
    product?: Product;
    hashtags: string[];
    timestamp: string;
    likes: number;
    replies: number;
}
