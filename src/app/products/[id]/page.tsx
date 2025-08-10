"use client";

import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Star,
  Heart,
  ShoppingCart,
  Share,
  Truck,
  Shield,
  RotateCcw,
} from "lucide-react";
import Header from "@/components/layout/header";
import Footer from "@/components/layout/footer";
import { useMockCart } from "@/providers/mock-cart-provider";
import { use } from "react";

// Mock product database - in a real app, this would come from your database
const products = {
  "1": {
    id: 1,
    name: "Premium Wireless Headphones",
    price: 199.99,
    originalPrice: 249.99,
    images: [
      "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&h=800&fit=crop",
      "https://images.unsplash.com/photo-1484704849700-f032a568e944?w=800&h=800&fit=crop",
      "https://images.unsplash.com/photo-1583394838336-acd977736f90?w=800&h=800&fit=crop",
    ],
    rating: 4.5,
    reviews: 127,
    category: "Electronics",
    brand: "AudioMax",
    description:
      "Experience premium sound quality with our latest wireless headphones featuring active noise cancellation, 30-hour battery life, and crystal-clear audio.",
    features: [
      "Active Noise Cancellation",
      "30-hour battery life",
      "Bluetooth 5.2 connectivity",
      "Quick charge - 15 min for 3 hours",
      "Premium leather ear cushions",
      "Built-in microphone for calls",
    ],
    specifications: {
      Weight: "250g",
      "Battery Life": "30 hours",
      "Charging Time": "2 hours",
      Connectivity: "Bluetooth 5.2",
      "Driver Size": "40mm",
      "Frequency Response": "20Hz - 20kHz",
    },
    inStock: true,
    stockCount: 25,
  },
  "2": {
    id: 2,
    name: "Smart Fitness Watch",
    price: 299.99,
    originalPrice: null,
    images: [
      "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=800&h=800&fit=crop",
      "https://images.unsplash.com/photo-1551698618-1dfe5d97d256?w=800&h=800&fit=crop",
      "https://images.unsplash.com/photo-1434493789847-2f02dc6ca35d?w=800&h=800&fit=crop",
    ],
    rating: 4.8,
    reviews: 203,
    category: "Electronics",
    brand: "FitTech",
    description:
      "Track your fitness goals with this advanced smartwatch featuring heart rate monitoring, GPS tracking, and 7-day battery life.",
    features: [
      "Heart rate monitoring",
      "Built-in GPS",
      "7-day battery life",
      "Waterproof (50m)",
      "Sleep tracking",
      "Multiple sport modes",
    ],
    specifications: {
      Display: '1.4" AMOLED',
      "Battery Life": "7 days",
      "Water Resistance": "50 meters",
      Connectivity: "Bluetooth, WiFi",
      Sensors: "Heart Rate, GPS, Accelerometer",
      Compatibility: "iOS & Android",
    },
    inStock: true,
    stockCount: 15,
  },
  "3": {
    id: 3,
    name: "Ergonomic Office Chair",
    price: 449.99,
    originalPrice: 599.99,
    images: [
      "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=800&h=800&fit=crop",
      "https://images.unsplash.com/photo-1541558869434-2840d308329a?w=800&h=800&fit=crop",
      "https://images.unsplash.com/photo-1549497538-303791108f95?w=800&h=800&fit=crop",
    ],
    rating: 4.6,
    reviews: 89,
    category: "Home & Garden",
    brand: "ComfortPro",
    description:
      "Maximize your productivity with this premium ergonomic office chair designed for all-day comfort and support.",
    features: [
      "Lumbar support system",
      "Adjustable armrests",
      "Breathable mesh back",
      "Height adjustable",
      "360° swivel base",
      "Weight capacity: 300lbs",
    ],
    specifications: {
      Material: "Mesh & Fabric",
      "Weight Capacity": "300 lbs",
      "Seat Height": "17-21 inches",
      Armrests: "4D Adjustable",
      Base: "Aluminum 5-star",
      Warranty: "5 years",
    },
    inStock: true,
    stockCount: 8,
  },
  "4": {
    id: 4,
    name: "Portable Coffee Maker",
    price: 89.99,
    originalPrice: null,
    images: [
      "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=800&h=800&fit=crop",
      "https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=800&h=800&fit=crop",
      "https://images.unsplash.com/photo-1497636577773-f1231844b336?w=800&h=800&fit=crop",
    ],
    rating: 4.3,
    reviews: 156,
    category: "Home & Garden",
    brand: "BrewMaster",
    description:
      "Enjoy barista-quality coffee anywhere with this compact, portable coffee maker perfect for travel and outdoor adventures.",
    features: [
      "Manual brewing control",
      "Compact & lightweight",
      "No electricity required",
      "Easy to clean",
      "Durable construction",
      "Perfect for camping",
    ],
    specifications: {
      Capacity: "300ml",
      Weight: "400g",
      Material: "Aluminum & Plastic",
      Pressure: "Manual",
      Filter: "Reusable metal",
      Dimensions: "18 x 8 x 8 cm",
    },
    inStock: true,
    stockCount: 32,
  },
};

// Related products function
const getRelatedProducts = (currentProductId: number, category: string) => {
  return Object.values(products)
    .filter(
      (product) =>
        product.id !== currentProductId && product.category === category
    )
    .slice(0, 4);
};

interface ProductPageProps {
  params: Promise<{
    id: string;
  }>;
}

export default function ProductPage({ params }: ProductPageProps) {
  const { id } = use(params);
  const { addToCart } = useMockCart();
  const product = products[id as keyof typeof products];

  if (!product) {
    notFound();
  }

  const relatedProducts = getRelatedProducts(product.id, product.category);

  return (
    <>
      <Header />
      <div className="min-h-screen">
        {/* Breadcrumb */}
        <div className="border-b bg-muted/20">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-4">
            <nav className="text-sm">
              <Link
                href="/"
                className="text-muted-foreground hover:text-primary"
              >
                Home
              </Link>
              <span className="mx-2 text-muted-foreground">/</span>
              <Link
                href="/products"
                className="text-muted-foreground hover:text-primary"
              >
                Products
              </Link>
              <span className="mx-2 text-muted-foreground">/</span>
              <span className="text-foreground">{product.name}</span>
            </nav>
          </div>
        </div>

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Product Images */}
            <div className="space-y-4">
              <div className="aspect-square relative overflow-hidden rounded-lg bg-muted">
                <Image
                  src={product.images[0]}
                  alt={product.name}
                  fill
                  className="object-cover"
                  priority
                />
              </div>
              <div className="grid grid-cols-3 gap-4">
                {product.images.slice(1).map((image, index) => (
                  <div
                    key={index}
                    className="aspect-square relative overflow-hidden rounded-lg bg-muted cursor-pointer hover:opacity-75 transition-opacity"
                  >
                    <Image
                      src={image}
                      alt={`${product.name} ${index + 2}`}
                      fill
                      className="object-cover"
                    />
                  </div>
                ))}
              </div>
            </div>

            {/* Product Info */}
            <div className="space-y-6">
              <div>
                <p className="text-sm text-muted-foreground mb-2">
                  {product.brand}
                </p>
                <h1 className="text-3xl font-bold mb-4">{product.name}</h1>

                {/* Rating */}
                <div className="flex items-center space-x-2 mb-4">
                  <div className="flex items-center">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`h-5 w-5 ${
                          i < Math.floor(product.rating)
                            ? "text-yellow-400 fill-current"
                            : "text-gray-300"
                        }`}
                      />
                    ))}
                  </div>
                  <span className="text-sm font-medium">{product.rating}</span>
                  <span className="text-sm text-muted-foreground">
                    ({product.reviews} reviews)
                  </span>
                </div>

                {/* Price */}
                <div className="flex items-center space-x-4 mb-6">
                  <span className="text-3xl font-bold text-primary">
                    ${product.price}
                  </span>
                  {product.originalPrice && (
                    <span className="text-xl text-muted-foreground line-through">
                      ${product.originalPrice}
                    </span>
                  )}
                  {product.originalPrice && (
                    <span className="bg-red-100 text-red-800 px-2 py-1 rounded text-sm font-medium">
                      Save ${(product.originalPrice - product.price).toFixed(2)}
                    </span>
                  )}
                </div>

                {/* Stock Status */}
                <div className="mb-6">
                  {product.inStock ? (
                    <p className="text-green-600 font-medium">
                      ✓ In Stock ({product.stockCount} available)
                    </p>
                  ) : (
                    <p className="text-red-600 font-medium">Out of Stock</p>
                  )}
                </div>

                {/* Guest Checkout Notice */}
                <div className="bg-blue-50 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4 mb-6">
                  <div className="flex items-center space-x-2">
                    <ShoppingCart className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                    <p className="text-blue-800 dark:text-blue-200 font-medium text-sm">
                      Quick checkout - No account required!
                    </p>
                  </div>
                  <p className="text-blue-600 dark:text-blue-300 text-xs mt-1">
                    Simply add to cart and checkout as a guest
                  </p>
                </div>

                {/* Actions */}
                <div className="space-y-4 mb-8">
                  <div className="flex space-x-4">
                    <Button
                      size="lg"
                      className="flex-1"
                      disabled={!product.inStock}
                      onClick={() => {
                        try {
                          addToCart({
                            id: product.id,
                            name: product.name,
                            price: product.price,
                            image: product.images[0],
                          });
                          alert(`Added ${product.name} to cart!`);
                        } catch (error) {
                          console.error("Error adding to cart:", error);
                          alert("Error adding to cart");
                        }
                      }}
                    >
                      <ShoppingCart className="h-5 w-5 mr-2" />
                      Add to Cart
                    </Button>
                    <Button variant="outline" size="lg">
                      <Heart className="h-5 w-5" />
                    </Button>
                    <Button variant="outline" size="lg">
                      <Share className="h-5 w-5" />
                    </Button>
                  </div>
                  <Button
                    variant="outline"
                    size="lg"
                    className="w-full"
                    disabled={!product.inStock}
                    onClick={() => {
                      try {
                        addToCart({
                          id: product.id,
                          name: product.name,
                          price: product.price,
                          image: product.images[0],
                        });
                        alert(
                          `Added ${product.name} to cart! Redirecting to cart...`
                        );
                        // In a real app, you would redirect to cart or checkout
                        window.location.href = "/cart";
                      } catch (error) {
                        console.error("Error adding to cart:", error);
                        alert("Error adding to cart");
                      }
                    }}
                  >
                    Buy Now
                  </Button>
                </div>

                {/* Features */}
                <div className="border-t pt-6">
                  <h3 className="font-semibold mb-4">Key Features</h3>
                  <ul className="space-y-2">
                    {product.features.map((feature, index) => (
                      <li key={index} className="flex items-center text-sm">
                        <span className="text-green-500 mr-2">✓</span>
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>

          {/* Product Details Tabs */}
          <div className="mt-16">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              {/* Description */}
              <Card>
                <CardContent className="p-6">
                  <h3 className="text-xl font-semibold mb-4">Description</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    {product.description}
                  </p>
                </CardContent>
              </Card>

              {/* Specifications */}
              <Card>
                <CardContent className="p-6">
                  <h3 className="text-xl font-semibold mb-4">Specifications</h3>
                  <div className="space-y-3">
                    {Object.entries(product.specifications).map(
                      ([key, value]) => (
                        <div key={key} className="flex justify-between">
                          <span className="text-muted-foreground">{key}:</span>
                          <span className="font-medium">{value}</span>
                        </div>
                      )
                    )}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Shipping & Return Info */}
          <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card>
              <CardContent className="p-6 text-center">
                <Truck className="h-8 w-8 mx-auto mb-3 text-primary" />
                <h4 className="font-semibold mb-2">Free Shipping</h4>
                <p className="text-sm text-muted-foreground">
                  Free shipping on orders over $50
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6 text-center">
                <RotateCcw className="h-8 w-8 mx-auto mb-3 text-primary" />
                <h4 className="font-semibold mb-2">Easy Returns</h4>
                <p className="text-sm text-muted-foreground">
                  30-day return policy
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6 text-center">
                <Shield className="h-8 w-8 mx-auto mb-3 text-primary" />
                <h4 className="font-semibold mb-2">Warranty</h4>
                <p className="text-sm text-muted-foreground">
                  1-year manufacturer warranty
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Related Products */}
          {relatedProducts.length > 0 && (
            <div className="mt-16">
              <h2 className="text-2xl font-bold mb-8">Related Products</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {relatedProducts.map((relatedProduct) => (
                  <Link
                    key={relatedProduct.id}
                    href={`/products/${relatedProduct.id}`}
                  >
                    <Card className="group hover:shadow-lg transition-all duration-300">
                      <CardContent className="p-4">
                        <div className="aspect-square relative overflow-hidden rounded-lg mb-4">
                          <Image
                            src={relatedProduct.images[0]}
                            alt={relatedProduct.name}
                            fill
                            className="object-cover transition-transform group-hover:scale-105"
                          />
                        </div>
                        <div className="space-y-2">
                          <h3 className="font-medium text-sm line-clamp-2">
                            {relatedProduct.name}
                          </h3>
                          <div className="flex items-center justify-between">
                            <span className="text-lg font-bold text-primary">
                              ${relatedProduct.price}
                            </span>
                            <div className="flex items-center text-sm text-muted-foreground">
                              <Star className="h-3 w-3 fill-current text-yellow-400 mr-1" />
                              <span>{relatedProduct.rating}</span>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
      <Footer />
    </>
  );
}
