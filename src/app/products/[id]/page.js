import Link from 'next/link';
import { ArrowLeft, ShoppingCart } from 'lucide-react';

async function getProduct(id) {
    try {
        const res = await fetch(`${process.env.NEXTAUTH_URL}/api/products/${id}`, {
            cache: 'no-store',
        });

        if (!res.ok) {
            throw new Error('Product not found');
        }

        return res.json();
    } catch (error) {
        console.error('Error fetching product:', error);
        return null;
    }
}

export default async function ProductDetails({ params }) {
    const product = await getProduct(params.id);

    if (!product) {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center">
                <div className="text-center">
                    <h1 className="text-2xl font-bold text-gray-900 mb-4">Product Not Found</h1>
                    <p className="text-gray-600 mb-6">The product you are looking for does not exist.</p>
                    <Link
                        href="/products"
                        className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                    >
                        <ArrowLeft className="w-4 h-4 mr-2" />
                        Back to Products
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                {/* Back Button */}
                <Link
                    href="/products"
                    className="inline-flex items-center text-blue-600 hover:text-blue-700 mb-8 transition-colors"
                >
                    <ArrowLeft className="w-4 h-4 mr-2" />
                    Back to Products
                </Link>

                <div className="bg-white rounded-xl shadow-lg overflow-hidden">
                    <div className="md:flex">
                        {/* Product Image */}
                        <div className="md:w-1/2 bg-gray-200 flex items-center justify-center p-12">
                            {product.image ? (
                                <img
                                    src={product.image}
                                    alt={product.name}
                                    className="max-w-full h-auto rounded-lg"
                                />
                            ) : (
                                <div className="w-64 h-64 bg-gray-300 rounded-lg flex items-center justify-center">
                                    <svg className="w-16 h-16 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                    </svg>
                                </div>
                            )}
                        </div>

                        {/* Product Info */}
                        <div className="md:w-1/2 p-12">
                            <div className="mb-4">
                                <span className="text-sm text-blue-600 font-semibold">PRODUCT</span>
                            </div>

                            <h1 className="text-3xl font-bold text-gray-900 mb-4">
                                {product.name}
                            </h1>

                            <p className="text-2xl font-bold text-green-600 mb-6">
                                ${product.price.toFixed(2)}
                            </p>

                            <div className="mb-8">
                                <h3 className="text-lg font-semibold text-gray-900 mb-3">Description</h3>
                                <p className="text-gray-600 leading-relaxed">
                                    {product.description}
                                </p>
                            </div>

                            {/* Product Features */}
                            <div className="mb-8">
                                <h3 className="text-lg font-semibold text-gray-900 mb-3">Features</h3>
                                <ul className="space-y-2">
                                    <li className="flex items-center text-gray-600">
                                        <span className="w-2 h-2 bg-blue-600 rounded-full mr-3"></span>
                                        High quality materials
                                    </li>
                                    <li className="flex items-center text-gray-600">
                                        <span className="w-2 h-2 bg-blue-600 rounded-full mr-3"></span>
                                        Fast shipping
                                    </li>
                                    <li className="flex items-center text-gray-600">
                                        <span className="w-2 h-2 bg-blue-600 rounded-full mr-3"></span>
                                        30-day return policy
                                    </li>
                                    <li className="flex items-center text-gray-600">
                                        <span className="w-2 h-2 bg-blue-600 rounded-full mr-3"></span>
                                        Customer support
                                    </li>
                                </ul>
                            </div>

                            {/* Action Buttons */}
                            <div className="space-y-4">
                                <button className="w-full flex items-center justify-center px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                                    <ShoppingCart className="w-5 h-5 mr-2" />
                                    Add to Cart
                                </button>

                                <button className="w-full px-6 py-3 border-2 border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors">
                                    Add to Wishlist
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Related Products Section */}
                <div className="mt-16">
                    <h2 className="text-2xl font-bold text-gray-900 mb-8">You might also like</h2>
                    <div className="text-center py-12 bg-gray-100 rounded-lg">
                        <p className="text-gray-600">Related products coming soon...</p>
                    </div>
                </div>
            </div>
        </div>
    );
}