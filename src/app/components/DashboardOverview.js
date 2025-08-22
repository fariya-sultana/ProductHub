"use client"
import { Home } from 'lucide-react';
import Link from 'next/link';
import React from 'react';
import { useSession } from 'next-auth/react';

const DashboardOverview = () => {
    const { data: session } = useSession()
    // console.log("Session:", session);

    return (
        <div className="bg-white dark:bg-gray-900 shadow-sm border-b border-gray-200 dark:border-gray-700">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center py-4">
                    <div className="flex items-center space-x-4">
                        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Dashboard</h1>
                        <span className="text-sm text-gray-500 dark:text-gray-300">
                            Welcome back, {session?.user?.name || session?.user?.email}!
                        </span>
                    </div>
                    <Link
                        href="/"
                        className="inline-flex items-center px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-200 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md hover:bg-gray-50 dark:hover:bg-gray-600 transition-colors"
                    >
                        <Home className="w-4 h-4 mr-2" />
                        Back to Home
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default DashboardOverview;
