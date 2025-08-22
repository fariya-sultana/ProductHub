
import Link from 'next/link';
import { Plus, Package, Users, TrendingUp, DollarSign } from 'lucide-react';
import { getServerSession } from 'next-auth';
import { authOptions } from '../lib/auth';

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

export default async function DashboardPage() {
    const session = await getServerSession(authOptions)
    const products = await getProducts();
    console.log('Session:', session);
    return (
        <div className="space-y-8">
            {/* Welcome Section */}
            <div className="bg-white rounded-lg shadow-sm p-6">
                <h1 className="text-2xl font-bold text-gray-900 mb-2">
                    Welcome back, {session?.user?.name || session?.user?.email}! 👋
                </h1>
                <p className="text-gray-600">
                    Here is what is happening with your products today.
                </p>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {/* Total Products */}
                <div className="bg-white rounded-lg shadow-sm p-6">
                    <div className="flex items-center">
                        <div className="flex-shrink-0">
                            <Package className="h-8 w-8 text-blue-600" />
                        </div>
                        <div className="ml-4">
                            <p className="text-sm font-medium text-gray-500">Total Products</p>
                            <p className="text-2xl font-bold text-gray-900">{products?.length}</p>
                        </div>
                    </div>
                </div>

                {/* Total Users */}
                <div className="bg-white rounded-lg shadow-sm p-6">
                    <div className="flex items-center">
                        <div className="flex-shrink-0">
                            <Users className="h-8 w-8 text-green-600" />
                        </div>
                        <div className="ml-4">
                            <p className="text-sm font-medium text-gray-500">Total Users</p>
                            <p className="text-2xl font-bold text-gray-900">6</p>
                        </div>
                    </div>
                </div>

                {/* Total Value */}
                <div className="bg-white rounded-lg shadow-sm p-6">
                    <div className="flex items-center">
                        <div className="flex-shrink-0">
                            <DollarSign className="h-8 w-8 text-purple-600" />
                        </div>
                        <div className="ml-4">
                            <p className="text-sm font-medium text-gray-500">Total Value</p>
                            <p className="text-2xl font-bold text-gray-900">
                                $1M
                            </p>
                        </div>
                    </div>
                </div>

                {/* Average Price */}
                <div className="bg-white rounded-lg shadow-sm p-6">
                    <div className="flex items-center">
                        <div className="flex-shrink-0">
                            <TrendingUp className="h-8 w-8 text-orange-600" />
                        </div>
                        <div className="ml-4">
                            <p className="text-sm font-medium text-gray-500">Average Price</p>
                            <p className="text-2xl font-bold text-gray-900">
                                $200
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Quick Actions */}
            <div className="bg-white rounded-lg shadow-sm p-6">
                <h2 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    <Link
                        href="/dashboard/add-product"
                        className="flex items-center p-4 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors group"
                    >
                        <Plus className="h-8 w-8 text-blue-600 group-hover:text-blue-700" />
                        <div className="ml-4">
                            <p className="text-sm font-medium text-gray-900">Add Product</p>
                            <p className="text-sm text-gray-500">Create a new product</p>
                        </div>
                    </Link>

                    <Link
                        href="/products"
                        className="flex items-center p-4 bg-green-50 rounded-lg hover:bg-green-100 transition-colors group"
                    >
                        <Package className="h-8 w-8 text-green-600 group-hover:text-green-700" />
                        <div className="ml-4">
                            <p className="text-sm font-medium text-gray-900">View Products</p>
                            <p className="text-sm text-gray-500">Browse all products</p>
                        </div>
                    </Link>

                    <Link
                        href="/"
                        className="flex items-center p-4 bg-purple-50 rounded-lg hover:bg-purple-100 transition-colors group"
                    >
                        <TrendingUp className="h-8 w-8 text-purple-600 group-hover:text-purple-700" />
                        <div className="ml-4">
                            <p className="text-sm font-medium text-gray-900">Visit Store</p>
                            <p className="text-sm text-gray-500">Go to main site</p>
                        </div>
                    </Link>
                </div>
            </div>

            {/* Recent Products */}
            <div className="bg-white rounded-lg shadow-sm">
                <div className="px-6 py-4 border-b border-gray-200">
                    <div className="flex items-center justify-between">
                        <h2 className="text-lg font-semibold text-gray-900">Recent Products</h2>
                        <Link
                            href="/products"
                            className="text-sm text-blue-600 hover:text-blue-700 font-medium"
                        >
                            View all
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}