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

        return records.map(record => ({
            id: record.id,
            name: (record.get('name') as string) || 'Untitled Product',
            category: (record.get('category') as ProductCategory) || 'Other',
            description: (record.get('description') as string) || '',
            price: (record.get('price') as number) || 0,
            images: record.get('images') ? (record.get('images') as any[]).map((img: any) => img.url) : ['📦'],
            creator: {
                id: (record.get('creator_id') as string) || 'unknown',
                name: (record.get('creator_name') as string) || 'Anonymous Maker',
                username: (record.get('creator_username') as string) || 'anonymous',
                bio: (record.get('creator_bio') as string) || '',
                location: (record.get('creator_location') as string) || '',
                badge: 'Maker',
                credibility_score: 100,
                products: [],
                contributions: [],
                posts: []
            },
            status: (record.get('status') as ProductStatus) || 'Available',
            upvotes: (record.get('upvotes') as number) || 0,
            privacy_verified: (record.get('privacy_verified') as boolean) || false,
            launch_date: (record.get('launch_date') as string) || '',
            slug: (record.get('slug') as string) || '',
            skill_level: (record.get('skill_level') as SkillLevel) || 'Beginner',
            external_link: (record.get('external_link') as string) || ''
        }));
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
