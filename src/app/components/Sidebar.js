'use client'
import { Package, Plus } from 'lucide-react';
import Link from 'next/link';
import React from 'react';

const Sidebar = () => {
    return (

        <div className="lg:w-64 flex-shrink-0">
            <nav className="bg-white rounded-lg shadow-sm p-6">
                <h2 className="text-lg font-semibold text-gray-900 mb-4">Menu</h2>
                <ul className="space-y-2">
                    <li>
                        <Link
                            href="/dashboard/add-product"
                            className="flex items-center px-3 py-2 text-sm font-medium text-gray-700 rounded-md hover:bg-gray-100 transition-colors"
                        >
                            <Plus className="w-4 h-4 mr-3" />
                            Add Product
                        </Link>
                    </li>
                    <li>
                        <Link
                            href="/products"
                            className="flex items-center px-3 py-2 text-sm font-medium text-gray-700 rounded-md hover:bg-gray-100 transition-colors"
                        >
                            <Package className="w-4 h-4 mr-3" />
                            View Products
                        </Link>
                    </li>
                </ul>
            </nav>
        </div>
    );
};

export default Sidebar;