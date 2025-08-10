import { NextRequest, NextResponse } from "next/server";
import { apiRateLimit, getClientId } from "@/lib/rate-limit";

interface Product {
  id: number;
  name: string;
  price: number;
  image: string;
  category: string;
  description: string;
  brand: string;
  rating: number;
  reviews: number;
  in_stock: boolean;
}

const MOCK_PRODUCTS: Product[] = [
  {
    id: 1,
    name: "Premium Wireless Headphones",
    price: 299.99,
    image:
      "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500&h=500&fit=crop",
    category: "electronics",
    description: "High-quality wireless headphones with noise cancellation.",
    brand: "TechBrand",
    rating: 4.5,
    reviews: 1250,
    in_stock: true,
  },
  {
    id: 2,
    name: "Smart Watch",
    price: 199.99,
    image:
      "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500&h=500&fit=crop",
    category: "electronics",
    description: "Feature-rich smartwatch with health monitoring.",
    brand: "SmartTech",
    rating: 4.3,
    reviews: 890,
    in_stock: true,
  },
  {
    id: 3,
    name: "Designer Laptop Bag",
    price: 89.99,
    image:
      "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=500&h=500&fit=crop",
    category: "accessories",
    description: "Stylish and functional laptop bag for professionals.",
    brand: "StyleCorp",
    rating: 4.7,
    reviews: 456,
    in_stock: true,
  },
  {
    id: 4,
    name: "Organic Cotton T-Shirt",
    price: 29.99,
    image:
      "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=500&h=500&fit=crop",
    category: "clothing",
    description: "Comfortable organic cotton t-shirt in various colors.",
    brand: "EcoWear",
    rating: 4.4,
    reviews: 234,
    in_stock: true,
  },
];

export async function GET(request: NextRequest): Promise<NextResponse> {
  try {
    const clientId = getClientId(request);
    const rateLimitResult = apiRateLimit.check(request, 30, clientId);

    if (!rateLimitResult.success) {
      return NextResponse.json(
        {
          error: "Rate limit exceeded",
          message: "Too many requests. Please try again later.",
        },
        {
          status: 429,
          headers: {
            "Retry-After": "60",
            "X-RateLimit-Limit": "30",
            "X-RateLimit-Remaining": rateLimitResult.remaining.toString(),
          },
        }
      );
    }

    const { searchParams } = new URL(request.url);
    const category = searchParams.get("category");
    const search = searchParams.get("search");
    const limit = Math.min(parseInt(searchParams.get("limit") || "10", 10), 50);
    const offset = Math.max(parseInt(searchParams.get("offset") || "0", 10), 0);

    let filteredProducts = MOCK_PRODUCTS;

    if (category) {
      filteredProducts = filteredProducts.filter(
        (product) => product.category.toLowerCase() === category.toLowerCase()
      );
    }

    if (search) {
      const searchLower = search.toLowerCase();
      filteredProducts = filteredProducts.filter(
        (product) =>
          product.name.toLowerCase().includes(searchLower) ||
          product.description.toLowerCase().includes(searchLower)
      );
    }

    const paginatedProducts = filteredProducts.slice(offset, offset + limit);

    return NextResponse.json({
      products: paginatedProducts,
      pagination: {
        total: filteredProducts.length,
        limit,
        offset,
        hasMore: offset + limit < filteredProducts.length,
      },
    });
  } catch (error) {
    console.error("Products API Error:", error);

    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
