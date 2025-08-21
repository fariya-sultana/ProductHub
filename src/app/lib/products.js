// Mock product database - in real app, use actual database
let products = [
  {
    id: "1",
    name: "Wireless Headphones",
    description: "High-quality wireless headphones with noise cancellation",
    price: 299.99,
    image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&h=300&fit=crop",
    category: "Electronics",
    features: [
      "Active Noise Cancellation",
      "30-hour battery life",
      "Wireless charging case",
      "Premium sound quality"
    ],
    inStock: true
  },
  {
    id: "2",
    name: "Smart Watch",
    description: "Advanced smartwatch with health monitoring and GPS",
    price: 399.99,
    image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400&h=300&fit=crop",
    category: "Electronics",
    features: [
      "Heart rate monitoring",
      "GPS tracking",
      "Water resistant",
      "7-day battery life"
    ],
    inStock: true
  },
  {
    id: "3",
    name: "Laptop Backpack",
    description: "Durable and stylish laptop backpack with multiple compartments",
    price: 89.99,
    image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=400&h=300&fit=crop",
    category: "Accessories",
    features: [
      "Fits 15-inch laptops",
      "Water-resistant material",
      "Multiple pockets",
      "Ergonomic design"
    ],
    inStock: true
  },
  {
    id: "4",
    name: "Bluetooth Speaker",
    description: "Portable Bluetooth speaker with powerful bass",
    price: 79.99,
    image: "https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=400&h=300&fit=crop",
    category: "Electronics",
    features: [
      "360-degree sound",
      "12-hour battery",
      "Waterproof design",
      "Voice assistant support"
    ],
    inStock: false
  }
]

export function getAllProducts() {
  return products
}

export function getProductById(id) {
  return products.find(product => product.id === id)
}

export function addProduct(product) {
  const newProduct = {
    id: Date.now().toString(),
    ...product,
    inStock: true
  }
  products.push(newProduct)
  return newProduct
}

export function getFeaturedProducts() {
  return products.slice(0, 3)
}