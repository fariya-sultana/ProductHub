import { MongoClient, ObjectId } from 'mongodb';

const uri = process.env.MONGODB_URI;

export async function GET(_request, { params }) {
    try {
        const { id } = params;

        if (!ObjectId.isValid(id)) {
            return new Response(JSON.stringify({ error: 'Invalid id' }), {
                status: 400,
                headers: { 'Content-Type': 'application/json' },
            });
        }

        const client = new MongoClient(uri);
        await client.connect();
        const db = client.db('product-management-app');
        const collection = db.collection('products');

        const product = await collection.findOne({ _id: new ObjectId(id) });

        await client.close();

        if (!product) {
            return new Response(JSON.stringify({ error: 'Product not found' }), {
                status: 404,
                headers: { 'Content-Type': 'application/json' },
            });
        }

        return new Response(JSON.stringify(product), {
            status: 200,
            headers: { 'Content-Type': 'application/json' },
        });
    } catch (error) {
        console.error('GET /api/products/[id] error:', error);
        return new Response(JSON.stringify({ error: 'Failed to fetch product' }), {
            status: 500,
            headers: { 'Content-Type': 'application/json' },
        });
    }
}