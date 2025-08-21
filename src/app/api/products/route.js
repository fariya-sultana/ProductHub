import { NextResponse } from "next/server"
import { getAllProducts, addProduct } from "../../lib/products"
import { getServerSession } from "next-auth"
import { authOptions } from "../../lib/auth"

export async function GET() {
  try {
    const products = getAllProducts()
    return NextResponse.json(products)
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch products" }, { status: 500 })
  }
}

export async function POST(request) {
  try {
    const session = await getServerSession(authOptions)
    
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const productData = await request.json()
    
    // Basic validation
    if (!productData.name || !productData.price) {
      return NextResponse.json({ error: "Name and price are required" }, { status: 400 })
    }

    const newProduct = addProduct(productData)
    return NextResponse.json(newProduct, { status: 201 })
  } catch (error) {
    return NextResponse.json({ error: "Failed to create product" }, { status: 500 })
  }
}