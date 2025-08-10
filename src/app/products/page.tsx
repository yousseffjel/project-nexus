"use client";

import Image from "next/image";
import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Header from "@/components/layout/header";
import Footer from "@/components/layout/footer";
import { useMockCart } from "@/providers/mock-cart-provider";

// Mock products data - in a real app, this would come from your database
const products = [
  {
    id: 1,
    name: "Premium Wireless Headphones",
    price: 299.99,
    category: "Electronics",
    image:
      "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&h=400&fit=crop",
    rating: 4.5,
    reviews: 128,
  },
  {
    id: 2,
    name: "Smart Watch Series X",
    price: 399.99,
    category: "Electronics",
    image:
      "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400&h=400&fit=crop",
    rating: 4.8,
    reviews: 95,
  },
  {
    id: 3,
    name: "Designer Leather Jacket",
    price: 249.99,
    category: "Fashion",
    image:
      "https://images.unsplash.com/photo-1551028719-00167b16eac5?w=400&h=400&fit=crop",
    rating: 4.6,
    reviews: 67,
  },
  {
    id: 4,
    name: "Ultra-HD 4K Monitor",
    price: 599.99,
    category: "Electronics",
    image:
      "https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?w=400&h=400&fit=crop",
    rating: 4.7,
    reviews: 201,
  },
  {
    id: 5,
    name: "Organic Face Cream",
    price: 79.99,
    category: "Beauty & Health",
    image:
      "https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=400&h=400&fit=crop",
    rating: 4.9,
    reviews: 156,
  },
  {
    id: 6,
    name: "Running Sneakers Pro",
    price: 159.99,
    category: "Sports & Outdoors",
    image:
      "https://images.unsplash.com/photo-1549298916-b41d501d3772?w=400&h=400&fit=crop",
    rating: 4.4,
    reviews: 89,
  },
  {
    id: 7,
    name: "Coffee Table Book: Modern Art",
    price: 45.99,
    category: "Books & Media",
    image:
      "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=400&h=400&fit=crop",
    rating: 4.3,
    reviews: 34,
  },
  {
    id: 8,
    name: "Indoor Plant Collection",
    price: 89.99,
    category: "Home & Garden",
    image:
      "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=400&h=400&fit=crop",
    rating: 4.7,
    reviews: 78,
  },
];

export default function ProductsPage() {
  const { addToCart } = useMockCart();

  return (
    <>
      <Header />
      <div className="min-h-screen">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-foreground mb-4">
              All Products
            </h1>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Discover our complete collection of high-quality products across
              all categories.
            </p>
          </div>

          <div className="flex justify-between items-center mb-8">
            <div>
              <p className="text-muted-foreground">
                Showing {products.length} products
              </p>
            </div>
            <div className="flex gap-4">
              <Link href="/categories">
                <Button variant="outline">Browse Categories</Button>
              </Link>
              <Link href="/">
                <Button variant="outline">← Back to Home</Button>
              </Link>
            </div>
          </div>

          {/* Products Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {products.map((product) => (
              <Card
                key={product.id}
                className="group hover:shadow-lg transition-all duration-300"
              >
                <CardContent className="p-4">
                  <Link href={`/products/${product.id}`} className="block">
                    <div className="aspect-square relative overflow-hidden rounded-lg mb-4 cursor-pointer">
                      <Image
                        src={product.image}
                        alt={product.name}
                        fill
                        className="object-cover transition-transform group-hover:scale-105"
                      />
                    </div>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between text-xs">
                        <span className="text-muted-foreground bg-muted px-2 py-1 rounded">
                          {product.category}
                        </span>
                        <div className="flex items-center text-muted-foreground">
                          <span>⭐</span>
                          <span className="ml-1">{product.rating}</span>
                          <span className="ml-1">({product.reviews})</span>
                        </div>
                      </div>
                      <h3 className="font-medium text-sm line-clamp-2 hover:text-primary transition-colors">
                        {product.name}
                      </h3>
                      <div className="flex items-center justify-between">
                        <span className="text-lg font-bold text-primary">
                          ${product.price}
                        </span>
                      </div>
                    </div>
                  </Link>
                  <Button
                    size="sm"
                    className="w-full mt-2"
                    onClick={(e) => {
                      e.stopPropagation();
                      try {
                        addToCart({
                          id: product.id,
                          name: product.name,
                          price: product.price,
                          image: product.image,
                        });
                        alert(`Added ${product.name} to cart!`);
                      } catch (error) {
                        console.error("Error adding to cart:", error);
                        alert("Error adding to cart");
                      }
                    }}
                  >
                    Add to Cart
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Call to Action */}
          <div className="text-center mt-12 p-8 bg-gradient-to-r from-primary/10 to-secondary/10 rounded-lg">
            <h3 className="text-2xl font-semibold mb-4">
              Looking for something specific?
            </h3>
            <p className="text-muted-foreground mb-6">
              Browse our categories to find exactly what you need, or contact us
              for personalized recommendations.
            </p>
            <div className="flex gap-4 justify-center">
              <Link href="/categories">
                <Button>Browse Categories</Button>
              </Link>
              <Button variant="outline">Contact Support</Button>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
