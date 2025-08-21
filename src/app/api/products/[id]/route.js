import { NextResponse } from 'next/server';

export async function GET(
    request,
    { params }
) {
    try {
        const product = await prisma.product.findUnique({
            where: {
                id: params.id,
            },
        });

        if (!product) {
            return NextResponse.json(
                { message: 'Product not found' },
                { status: 404 }
            );
        }

        return NextResponse.json(product);
    } catch (error) {
        console.error('Error fetching product:', error);
        return NextResponse.json(
            { message: 'Internal server error' },
            { status: 500 }
        );
    }
}