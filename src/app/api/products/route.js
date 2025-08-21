// import clientPromise from "@/app/lib/mongodb";


// export async function GET() {
//   try {
//     const client = await clientPromise;
//     const db = client.db("product-management-app");
//     const products = await db.collection("products").find().toArray();
//     return new Response(JSON.stringify(products), { status: 200 });
//   } catch (err) {
//     return new Response(JSON.stringify({ error: err.message }), { status: 500 });
//   }
// }

// export async function POST(req) {
//   try {
//     const client = await clientPromise;
//     const db = client.db("product-management-app");
//     const data = await req.json();
//     await db.collection("products").insertOne(data);
//     return new Response(JSON.stringify({ message: "Product added" }), { status: 201 });
//   } catch (err) {
//     return new Response(JSON.stringify({ error: err.message }), { status: 500 });
//   }
// }


import { MongoClient } from "mongodb";

const uri = process.env.MONGODB_URI;

export async function GET() {
  try {
    const client = new MongoClient(uri);
    await client.connect();
    const database = client.db("product-management-app");
    const collection = database.collection("products");

    const products = await collection.find({}).toArray();
    await client.close();

    return new Response(JSON.stringify(products), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error(error);
    return new Response(JSON.stringify({ error: "Failed to fetch products" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}

export async function POST(req) {
  try {
    const product = await req.json();
    const client = new MongoClient(uri);
    await client.connect();
    const database = client.db("product-management-app");
    const collection = database.collection("products");

    const result = await collection.insertOne(product);
    await client.close();

    return new Response(JSON.stringify(result), {
      status: 201,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error(error);
    return new Response(JSON.stringify({ error: "Failed to create product" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}