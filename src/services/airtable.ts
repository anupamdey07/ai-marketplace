import Airtable from 'airtable';
import { Product, ProductCategory, ProductStatus, SkillLevel } from '@/types';

const API_KEY = import.meta.env.VITE_AIRTABLE_API_KEY;
const BASE_ID = import.meta.env.VITE_AIRTABLE_BASE_ID;

if (!API_KEY || !BASE_ID) {
    console.warn('Airtable API Key or Base ID is missing. Using mock data.');
}

const base = new Airtable({ apiKey: API_KEY }).base(BASE_ID);

export const fetchAirtableProducts = async (): Promise<Product[]> => {
    try {
        const records = await base('Products').select({
            view: 'Grid view' // Ensure this matches the view name in Airtable
        }).all();

        return records.map(record => {
            // Helper to get field case-insensitively or with common variations
            const getField = (keys: string[]) => {
                for (const key of keys) {
                    const val = record.get(key);
                    if (val !== undefined) return val;
                }
                return undefined;
            };

            return {
                id: record.id,
                name: (getField(['Name', 'name']) as string) || 'Untitled Product',
                category: (getField(['Category', 'category']) as ProductCategory) || 'Other',
                description: (getField(['Description', 'description']) as string) || '',
                price: (getField(['Price', 'price']) as number) || 0,
                images: getField(['Images', 'images']) ? (getField(['Images', 'images']) as any[]).map((img: any) => img.url) : ['📦'],
                creator: {
                    id: (getField(['Creator', 'creator', 'creator_id']) as any)?.[0] || getField(['Creator', 'creator', 'creator_id']) || 'unknown',
                    name: (getField(['CreatorName', 'creator_name']) as string) || 'Anonymous Maker',
                    username: (getField(['CreatorUsername', 'creator_username']) as string) || 'anonymous',
                    bio: (getField(['CreatorBio', 'creator_bio']) as string) || '',
                    location: (getField(['CreatorLocation', 'creator_location']) as string) || '',
                    badge: 'Maker',
                    credibility_score: 100,
                    products: [],
                    contributions: [],
                    posts: []
                },
                status: (getField(['Status', 'status']) as ProductStatus) || 'Available',
                upvotes: (getField(['Upvotes', 'upvotes']) as number) || 0,
                privacy_verified: (getField(['Privacy Verified', 'privacy_verified']) as boolean) || false,
                launch_date: (getField(['Launch Date', 'launch_date']) as string) || '',
                slug: (getField(['Slug', 'slug']) as string) || '',
                skill_level: (getField(['Skill Level', 'skill_level']) as SkillLevel) || 'Beginner',
                external_link: (getField(['External Link', 'external_link']) as string) || ''
            };
        });
    } catch (error) {
        console.error('Error fetching from Airtable:', error);
        throw error;
    }
};

export const upvoteAirtableProduct = async (id: string, currentUpvotes: number) => {
    try {
        await base('Products').update(id, {
            'Upvotes': currentUpvotes + 1
        });
    } catch (error) {
        console.error('Error upvoting in Airtable:', error);
        throw error;
    }
};
