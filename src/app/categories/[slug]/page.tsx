"use client";

import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Header from "@/components/layout/header";
import Footer from "@/components/layout/footer";
import { use } from "react";
import { useMockCart } from "@/providers/mock-cart-provider";

// This would normally come from your database
const categories = {
  electronics: {
    name: "Electronics",
    description: "Latest gadgets, computers, phones, and electronic devices",
    image:
      "https://images.unsplash.com/photo-1518717758536-85ae29035b6d?w=800&h=400&fit=crop",
  },
  fashion: {
    name: "Fashion",
    description:
      "Trendy clothing, accessories, and fashion items for all styles",
    image:
      "https://images.unsplash.com/photo-1445205170230-053b83016050?w=800&h=400&fit=crop",
  },
  "home-garden": {
    name: "Home & Garden",
    description: "Everything for your home, garden, and living spaces",
    image:
      "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=800&h=400&fit=crop",
  },
  "sports-outdoors": {
    name: "Sports & Outdoors",
    description: "Sports equipment, outdoor gear, and fitness accessories",
    image:
      "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=800&h=400&fit=crop",
  },
  "beauty-health": {
    name: "Beauty & Health",
    description:
      "Beauty products, skincare, health supplements, and wellness items",
    image:
      "https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=800&h=400&fit=crop",
  },
  "books-media": {
    name: "Books & Media",
    description: "Books, movies, music, and educational content",
    image:
      "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=800&h=400&fit=crop",
  },
};

// Mock products - in a real app, this would come from your database
const sampleProducts = [
  {
    id: 1,
    name: "Premium Wireless Headphones",
    price: 299.99,
    image:
      "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&h=400&fit=crop",
    rating: 4.5,
  },
  {
    id: 2,
    name: "Smart Watch Series X",
    price: 399.99,
    image:
      "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400&h=400&fit=crop",
    rating: 4.8,
  },
  {
    id: 3,
    name: "Ultra-HD 4K Monitor",
    price: 599.99,
    image:
      "https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?w=400&h=400&fit=crop",
    rating: 4.7,
  },
  {
    id: 4,
    name: "Mechanical Gaming Keyboard",
    price: 149.99,
    image:
      "https://images.unsplash.com/photo-1541140532154-b024d705b90a?w=400&h=400&fit=crop",
    rating: 4.6,
  },
];

interface CategoryPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export default function CategoryPage({ params }: CategoryPageProps) {
  const { slug } = use(params);
  const { addToCart } = useMockCart();
  const category = categories[slug as keyof typeof categories];

  if (!category) {
    notFound();
  }

  return (
    <>
      <Header />
      <div className="min-h-screen">
        {/* Category Header */}
        <div className="relative h-64 bg-gradient-to-r from-primary/20 to-secondary/20">
          <Image
            src={category.image}
            alt={category.name}
            fill
            className="object-cover opacity-30"
          />
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center text-white">
              <h1 className="text-4xl font-bold mb-4">{category.name}</h1>
              <p className="text-xl max-w-2xl mx-auto">
                {category.description}
              </p>
            </div>
          </div>
        </div>

        {/* Products Section */}
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="flex justify-between items-center mb-8">
            <div>
              <h2 className="text-2xl font-semibold mb-2">
                Products in {category.name}
              </h2>
              <p className="text-muted-foreground">
                {sampleProducts.length} products found
              </p>
            </div>
            <Link href="/categories">
              <Button variant="outline">← Back to Categories</Button>
            </Link>
          </div>

          {/* Products Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {sampleProducts.map((product) => (
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
                    <div className="space-y-2 mb-4">
                      <h3 className="font-medium text-sm line-clamp-2 hover:text-primary transition-colors">
                        {product.name}
                      </h3>
                      <div className="flex items-center justify-between">
                        <span className="text-lg font-bold text-primary">
                          ${product.price}
                        </span>
                        <div className="flex items-center text-sm text-muted-foreground">
                          <span>⭐</span>
                          <span className="ml-1">{product.rating}</span>
                        </div>
                      </div>
                    </div>
                  </Link>
                  <Button
                    size="sm"
                    className="w-full"
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

          {/* Coming Soon Message */}
          <div className="text-center mt-12 p-8 bg-muted/50 rounded-lg">
            <h3 className="text-xl font-semibold mb-2">
              More Products Coming Soon!
            </h3>
            <p className="text-muted-foreground">
              We&apos;re constantly adding new products to this category. Check
              back soon for more options.
            </p>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
