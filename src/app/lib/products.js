

export function getAllProducts() {
  return products
}

export function getProductById(id) {
  return products.find(product => product._id === id)
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