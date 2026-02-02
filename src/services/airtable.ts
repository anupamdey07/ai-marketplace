import Airtable from 'airtable';
import { CommunityPost, Product, ProductCategory, ProductStatus, SkillLevel, User, UserBadge } from '@/types';

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

export const fetchAirtableData = async (): Promise<{ products: Product[], posts: CommunityPost[] }> => {
    try {
        // 1. Fetch all raw data
        const makersRecords = await fetchTableSafely('Makers');
        const postsRecords = await fetchTableSafely('Posts');
        const productRecords = await fetchTableSafely('Products');

        console.log(`📡 Airtable: Found ${makersRecords.length} makers, ${postsRecords.length} posts, ${productRecords.length} products`);

        // 2. Pre-process Makers into a Map of Creator objects (initially empty products/posts)
        const makersMap = new Map<string, User>();
        const internalMakersRecords = new Map<string, any>();

        makersRecords.forEach(m => {
            const id = (m.get('id') as string || m.get('ID') as string) || m.id;
            const creatorObj: User = {
                id,
                name: (m.get('name') as string) || (m.get('Name') as string) || 'Anonymous Maker',
                username: (m.get('username') as string) || (m.get('Username') as string) || 'anonymous',
                bio: (m.get('bio') as string) || (m.get('Bio') as string) || '',
                location: (m.get('location') as string) || '',
                badge: (m.get('badge') as UserBadge) || 'Maker',
                credibility_score: (m.get('credibility_score') as number) || 100,
                avatar: m.get('avatar') ? (m.get('avatar') as any[])[0]?.url : undefined,
                products: [],
                contributions: [],
                posts: []
            };
            makersMap.set(id, creatorObj);
            makersMap.set(m.id, creatorObj); // Also map by internal Airtable ID
            internalMakersRecords.set(id, m);
        });

        // 3. Process Products
        const products: Product[] = productRecords.map(record => {
            const creatorIdRaw = record.get('creator_id') || record.get('Creator_ID');
            const creatorId = Array.isArray(creatorIdRaw) ? creatorIdRaw[0] : (creatorIdRaw as string);

            let creator = makersMap.get(creatorId);
            if (!creator) {
                // Create a placeholder if maker not found
                creator = {
                    id: creatorId || 'unknown',
                    name: 'Anonymous Maker',
                    username: 'anonymous',
                    badge: 'Maker',
                    credibility_score: 100,
                    products: [],
                    contributions: [],
                    posts: []
                };
            }

            const product: Product = {
                id: record.id,
                name: (record.get('name') as string) || (record.get('Name') as string) || 'Untitled Product',
                category: (record.get('category') as ProductCategory) || 'Other' as any,
                description: (record.get('description') as string) || '',
                price: (record.get('price') as number) || 0,
                images: record.get('images') ? (record.get('images') as any[]).map((img: any) => img.url) : ['📦'],
                creator: creator,
                status: (record.get('status') as ProductStatus) || 'Available',
                upvotes: (record.get('upvotes') as number) || 0,
                privacy_verified: (record.get('privacy_verified') as boolean) || false,
                launch_date: (record.get('launch_date') as string) || '',
                slug: (record.get('slug') as string) || '',
                skill_level: (record.get('skill_level') as SkillLevel) || 'Beginner',
                external_link: (record.get('external_link') as string) || ''
            };

            // Link product to creator
            creator.products.push(product);
            return product;
        });

        // Create a quick lookup for products by ID
        const productsMap = new Map(products.map(p => [p.id, p]));

        // 4. Process Posts
        const posts: CommunityPost[] = postsRecords.map(record => {
            const creatorIdRaw = record.get('creator_id') || record.get('author_id') || record.get('ID');
            const creatorId = Array.isArray(creatorIdRaw) ? creatorIdRaw[0] : (creatorIdRaw as string);

            let author = makersMap.get(creatorId);
            if (!author) {
                author = {
                    id: creatorId || 'unknown',
                    name: 'Anonymous Maker',
                    username: 'anonymous',
                    badge: 'Maker',
                    credibility_score: 100,
                    products: [],
                    contributions: [],
                    posts: []
                };
            }

            const productIdRaw = record.get('product_id') || record.get('Product_ID');
            const productId = Array.isArray(productIdRaw) ? productIdRaw[0] : (productIdRaw as string);
            const linkedProduct = productId ? productsMap.get(productId) : undefined;

            const post: CommunityPost = {
                id: record.id,
                author: author,
                content: (record.get('content') as string) || (record.get('Content') as string) || '',
                images: record.get('images') ? (record.get('images') as any[]).map((img: any) => img.url) : [],
                product: linkedProduct,
                hashtags: (record.get('hashtags') as string)?.split(' ') || [],
                timestamp: (record.get('timestamp') as string) || (record.get('Timestamp') as string) || new Date().toISOString(),
                likes: (record.get('likes') as number) || 0,
                replies: (record.get('replies') as number) || 0,
            };

            // Link post to author
            author.posts.push(post);
            return post;
        });

        return { products, posts };
    } catch (error) {
        console.error('Error fetching from Airtable:', error);
        throw error;
    }
};

// Keep deprecated export for compatibility during transition
export const fetchAirtableProducts = async (): Promise<Product[]> => {
    const { products } = await fetchAirtableData();
    return products;
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
