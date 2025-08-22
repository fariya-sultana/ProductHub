'use client'
import Link from "next/link"
import { Eye, ShoppingCart } from "lucide-react"

export default function ProductCard({ product }) {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden group">
      {/* Product Image */}
      <div className="relative overflow-hidden">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
        />
        <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all duration-300 flex items-center justify-center">
          <Link
            href={`/products/${product._id}`}
            className="bg-white text-gray-900 px-4 py-2 rounded-lg font-semibold opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-4 group-hover:translate-y-0 flex items-center space-x-2"
          >
            <Eye className="h-4 w-4" />
            <span>View Details</span>
          </Link>
        </div>
        
        {/* Stock Badge */}
        <div className="absolute top-3 right-3">
          <span className={`px-2 py-1 rounded-full text-xs font-semibold ${
            product.inStock 
              ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200' 
              : 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
          }`}>
            {product.inStock ? 'In Stock' : 'Out of Stock'}
          </span>
        </div>
      </div>

      {/* Product Info */}
      <div className="p-6">
        <div className="mb-2">
          <span className="text-sm text-blue-600 dark:text-blue-400 font-semibold">
            {product.category}
          </span>
        </div>
        
        <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2 line-clamp-1">
          {product.name}
        </h3>
        
        <p className="text-gray-600 dark:text-gray-300 text-sm mb-4 line-clamp-2">
          {product.description}
        </p>

        {/* Price and Action */}
        <div className="flex items-center justify-between">
          <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">
            ${product.price}
          </div>
          
          <Link
            href={`/products/${product._id}`}
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-semibold transition-colors flex items-center space-x-2"
          >
            <ShoppingCart className="h-4 w-4" />
            <span>View</span>
          </Link>
        </div>
      </div>
    </div>
  )
}