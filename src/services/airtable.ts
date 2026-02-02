import Airtable from 'airtable';
import { Product, ProductCategory, ProductStatus, SkillLevel, UserBadge } from '@/types';

const API_KEY = import.meta.env.VITE_AIRTABLE_API_KEY;
const BASE_ID = import.meta.env.VITE_AIRTABLE_BASE_ID;

if (!API_KEY || !BASE_ID) {
    console.warn('Airtable API Key or Base ID is missing. Using mock data.');
}

const base = new Airtable({ apiKey: API_KEY }).base(BASE_ID);

const fetchTableSafely = async (tableName: string) => {
    try {
        // Try the name as provided
        return await base(tableName).select({}).all();
    } catch (e: any) {
        // If it fails, try the other casing
        const alternative = tableName.charAt(0) === tableName.charAt(0).toUpperCase()
            ? tableName.toLowerCase()
            : tableName.charAt(0).toUpperCase() + tableName.slice(1);
        try {
            return await base(alternative).select({}).all();
        } catch (e2) {
            console.warn(`Could not find table "${tableName}" or "${alternative}"`);
            return [];
        }
    }
};

export const fetchAirtableProducts = async (): Promise<Product[]> => {
    try {
        // Fetch Makers and Posts
        const makersRecords = await fetchTableSafely('Makers');
        const postsRecords = await fetchTableSafely('Posts');

        const makersMap = new Map();
        makersRecords.forEach(m => {
            // Map by internal Record ID (for Linked Records)
            makersMap.set(m.id, m);
            // Also map by custom 'id' field (for text matching)
            const customId = m.get('id') as string || m.get('ID') as string;
            if (customId) makersMap.set(customId, m);
        });

        // Map posts by Author ID
        const postsByAuthor = new Map<string, any[]>();

        console.log(`📡 Airtable: Found ${makersRecords.length} makers and ${postsRecords.length} posts`);

        postsRecords.forEach((record: any) => {
            const authorIdRaw = record.get('creator_id') || record.get('ID') || record.get('author_id');
            const authorId = Array.isArray(authorIdRaw) ? authorIdRaw[0] : (authorIdRaw as string);

            if (authorId) {
                const current = postsByAuthor.get(authorId) || [];
                // We'll construct the full post object later when we have the User object
                current.push({
                    id: record.id,
                    content: (record.get('content') as string) || (record.get('Content') as string) || '',
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
        const productRecords = await fetchTableSafely('Products');
        console.log(`📡 Airtable: Found ${productRecords.length} products`);

        return productRecords.map(record => {
            // Resolve Creator
            const creatorIdRaw = record.get('creator_id') || record.get('Creator_ID');
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
