import Airtable from 'airtable';
import { Product, ProductCategory, ProductStatus, SkillLevel, UserBadge } from '@/types';

const API_KEY = import.meta.env.VITE_AIRTABLE_API_KEY;
const BASE_ID = import.meta.env.VITE_AIRTABLE_BASE_ID;

if (!API_KEY || !BASE_ID) {
    console.warn('Airtable API Key or Base ID is missing. Using mock data.');
}

const base = new Airtable({ apiKey: API_KEY }).base(BASE_ID);

export const fetchAirtableProducts = async (): Promise<Product[]> => {
    try {
        // Fetch Makers first
        const makersRecords = await base('Makers').select({
            view: 'Grid view'
        }).all();

        const makersMap = new Map();
        makersRecords.forEach(m => {
            // Map by internal Record ID (for Linked Records)
            makersMap.set(m.id, m);
            // Also map by custom 'id' field (for text matching)
            const customId = m.get('id') as string;
            if (customId) makersMap.set(customId, m);
        });

        // Fetch Posts (safely)
        let postsRecords: any = [];
        try {
            postsRecords = await base('Posts').select({ view: 'Grid view' }).all();
        } catch (e) {
            console.warn('Could not fetch Posts table. Community feed will be empty.', e);
        }

        // Map posts by Author ID
        const postsByAuthor = new Map<string, any[]>();

        postsRecords.forEach((record: any) => {
            const authorIdRaw = record.get('author_id');
            const authorId = Array.isArray(authorIdRaw) ? authorIdRaw[0] : (authorIdRaw as string);

            if (authorId) {
                const current = postsByAuthor.get(authorId) || [];
                // We'll construct the full post object later when we have the User object
                current.push({
                    id: record.id,
                    content: (record.get('content') as string) || '',
                    images: record.get('images') ? (record.get('images') as any[]).map((img: any) => img.url) : [],
                    hashtags: (record.get('hashtags') as string)?.split(' ') || [],
                    timestamp: (record.get('timestamp') as string) || new Date().toISOString(),
                    likes: (record.get('likes') as number) || 0,
                    replies: (record.get('replies') as number) || 0,
                    // Author will be injected
                });
                postsByAuthor.set(authorId, current);
            }
        });

        // Fetch Products
        const productRecords = await base('Products').select({
            view: 'Grid view'
        }).all();

        return productRecords.map(record => {
            // Resolve Creator
            const creatorIdRaw = record.get('creator_id');
            let makerRecord;

            if (Array.isArray(creatorIdRaw) && creatorIdRaw.length > 0) {
                makerRecord = makersMap.get(creatorIdRaw[0]);
            } else if (typeof creatorIdRaw === 'string') {
                makerRecord = makersMap.get(creatorIdRaw);
            }

            // Construct Creator Object
            const creatorId = makerRecord ? ((makerRecord.get('id') as string) || makerRecord.id) : 'unknown';

            // Get posts for this creator
            const rawPosts = postsByAuthor.get(creatorId) || [];
            // We need to inject the author object into the posts now that we are creating it
            // To avoid circular issues during creation, we create 'authorRef'

            const creatorObj = makerRecord ? {
                id: creatorId,
                name: (makerRecord.get('name') as string) || 'Anonymous Maker',
                username: (makerRecord.get('username') as string) || 'anonymous',
                bio: (makerRecord.get('bio') as string) || '',
                location: (makerRecord.get('location') as string) || '',
                badge: (makerRecord.get('badge') as UserBadge) || 'Maker',
                credibility_score: (makerRecord.get('credibility_score') as number) || 100,
                avatar: makerRecord.get('avatar') ? (makerRecord.get('avatar') as any[])[0]?.url : undefined,
                products: [],
                contributions: [],
                posts: [] as any[] // Will populate below
            } : {
                id: 'unknown',
                name: 'Anonymous Maker',
                username: 'anonymous',
                bio: '',
                location: '',
                badge: 'Maker' as UserBadge,
                credibility_score: 100,
                products: [],
                contributions: [],
                posts: []
            };

            // Link posts to creator and inject author
            if (rawPosts.length > 0) {
                creatorObj.posts = rawPosts.map(p => ({
                    ...p,
                    author: creatorObj // Circular reference, but valid in JS
                }));
            }

            return {
                id: record.id,
                name: (record.get('name') as string) || 'Untitled Product',
                category: (record.get('category') as ProductCategory) || 'Other',
                description: (record.get('description') as string) || '',
                price: (record.get('price') as number) || 0,
                images: record.get('images') ? (record.get('images') as any[]).map((img: any) => img.url) : ['📦'],
                creator: creatorObj,
                status: (record.get('status') as ProductStatus) || 'Available',
                upvotes: (record.get('upvotes') as number) || 0,
                privacy_verified: (record.get('privacy_verified') as boolean) || false,
                launch_date: (record.get('launch_date') as string) || '',
                slug: (record.get('slug') as string) || '',
                skill_level: (record.get('skill_level') as SkillLevel) || 'Beginner',
                external_link: (record.get('external_link') as string) || ''
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
            'upvotes': currentUpvotes + 1
        });
    } catch (error) {
        console.error('Error upvoting in Airtable:', error);
        throw error;
    }
};
