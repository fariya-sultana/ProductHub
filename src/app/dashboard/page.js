import Link from 'next/link';
import { Plus, Package, Users, TrendingUp, DollarSign } from 'lucide-react';
import { getServerSession } from 'next-auth';
import { authOptions } from '../lib/auth';

async function getProducts() {
    try {
        const res = await fetch(`${process.env.NEXTAUTH_URL}/api/products`, {
            cache: 'no-store',
        });

        if (!res.ok) throw new Error('Failed to fetch products');

        return res.json();
    } catch (error) {
        console.error('Error fetching products:', error);
        return [];
    }
}

export default async function DashboardPage() {
    const session = await getServerSession(authOptions);
    const products = await getProducts();
    console.log('Session:', session);

    return (
        <div className="space-y-8">
            {/* Welcome Section */}
            <div className="bg-white dark:bg-gray-700 rounded-lg shadow-sm p-6">
                <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                    Welcome back, {session?.user?.name || session?.user?.email}! 👋
                </h1>
                <p className="text-gray-600 dark:text-gray-300">
                    Here is what is happening with your products today.
                </p>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {/* Total Products */}
                <div className="bg-white dark:bg-gray-700 rounded-lg shadow-sm p-6">
                    <div className="flex items-center">
                        <Package className="h-8 w-8 text-blue-600" />
                        <div className="ml-4">
                            <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Total Products</p>
                            <p className="text-2xl font-bold text-gray-900 dark:text-white">{products?.length}</p>
                        </div>
                    </div>
                </div>

                {/* Total Users */}
                <div className="bg-white dark:bg-gray-700 rounded-lg shadow-sm p-6">
                    <div className="flex items-center">
                        <Users className="h-8 w-8 text-green-600" />
                        <div className="ml-4">
                            <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Total Users</p>
                            <p className="text-2xl font-bold text-gray-900 dark:text-white">6</p>
                        </div>
                    </div>
                </div>

                {/* Total Value */}
                <div className="bg-white dark:bg-gray-700 rounded-lg shadow-sm p-6">
                    <div className="flex items-center">
                        <DollarSign className="h-8 w-8 text-purple-600" />
                        <div className="ml-4">
                            <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Total Value</p>
                            <p className="text-2xl font-bold text-gray-900 dark:text-white">$1M</p>
                        </div>
                    </div>
                </div>

                {/* Average Price */}
                <div className="bg-white dark:bg-gray-700 rounded-lg shadow-sm p-6">
                    <div className="flex items-center">
                        <TrendingUp className="h-8 w-8 text-orange-600" />
                        <div className="ml-4">
                            <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Average Price</p>
                            <p className="text-2xl font-bold text-gray-900 dark:text-white">$200</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Quick Actions */}
            <div className="bg-white dark:bg-gray-700 rounded-lg shadow-sm p-6">
                <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Quick Actions</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    <Link href="/dashboard/add-product" className="flex items-center p-4 bg-blue-50 dark:bg-blue-900/80 rounded-lg hover:bg-blue-100 dark:hover:bg-blue-800 transition-colors group">
                        <Plus className="h-8 w-8 text-blue-600 group-hover:text-blue-700" />
                        <div className="ml-4">
                            <p className="text-sm font-medium text-gray-900 dark:text-white">Add Product</p>
                            <p className="text-sm text-gray-500 dark:text-gray-400">Create a new product</p>
                        </div>
                    </Link>

                    <Link href="/products" className="flex items-center p-4 bg-green-50 dark:bg-green-900/80 rounded-lg hover:bg-green-100 dark:hover:bg-green-800 transition-colors group">
                        <Package className="h-8 w-8 text-green-600 group-hover:text-green-700" />
                        <div className="ml-4">
                            <p className="text-sm font-medium text-gray-900 dark:text-white">View Products</p>
                            <p className="text-sm text-gray-500 dark:text-gray-400">Browse all products</p>
                        </div>
                    </Link>

                    <Link href="/" className="flex items-center p-4 bg-purple-50 dark:bg-purple-900/80 rounded-lg hover:bg-purple-100 dark:hover:bg-purple-800 transition-colors group">
                        <TrendingUp className="h-8 w-8 text-purple-600 group-hover:text-purple-700" />
                        <div className="ml-4">
                            <p className="text-sm font-medium text-gray-900 dark:text-white">Visit Store</p>
                            <p className="text-sm text-gray-500 dark:text-gray-400">Go to main site</p>
                        </div>
                    </Link>
                </div>
            </div>

            {/* Recent Products */}
            <div className="bg-white dark:bg-gray-700 rounded-lg shadow-sm">
                <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700 flex items-center justify-between">
                    <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Recent Products</h2>
                    <Link href="/products" className="text-sm text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 font-medium">
                        View all
                    </Link>
                </div>
            </div>
        </div>
    );
}
