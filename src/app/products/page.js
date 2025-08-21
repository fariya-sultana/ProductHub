import ProductCard from "../components/ProductCard";


// This would typically come from your database
async function getProducts() {
    try {
        const res = await fetch(`${process.env.NEXTAUTH_URL}/api/products`, {
            cache: 'no-store', // This ensures fresh data on each request
        });

        if (!res.ok) {
            throw new Error('Failed to fetch products');
        }

        return res.json();
    } catch (error) {
        console.error('Error fetching products:', error);
        return [];
    }
}

export default async function ProductsPage() {
    const products = await getProducts();
    console.log("Products fetched:", products);
    return (
        <div className="min-h-screen bg-gray-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <div className="text-center mb-12">
                    <h1 className="text-4xl font-bold text-gray-900 mb-4">
                        Our Products
                    </h1>
                    <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                        Discover our amazing collection of products carefully curated for you
                    </p>
                </div>

                {products.length === 0 ? (
                    <div className="text-center py-12">
                        <div className="text-gray-400 mb-4">
                            <svg className="mx-auto h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                            </svg>
                        </div>
                        <h3 className="text-lg font-medium text-gray-900 mb-2">No products found</h3>
                        <p className="text-gray-600">Check back later for new products!</p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                        {products.map((product) => (
                            <ProductCard key={product._id} product={product} />
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}