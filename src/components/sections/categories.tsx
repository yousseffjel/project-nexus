import Link from "next/link";
import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";

export default function Categories() {
  // Mock data - in a real app, this would come from your database
  const categories = [
    {
      id: 1,
      name: "Electronics",
      slug: "electronics",
      image:
        "https://images.unsplash.com/photo-1518717758536-85ae29035b6d?w=400&h=400&fit=crop",
      productCount: 150,
    },
    {
      id: 2,
      name: "Fashion",
      slug: "fashion",
      image:
        "https://images.unsplash.com/photo-1445205170230-053b83016050?w=400&h=400&fit=crop",
      productCount: 230,
    },
    {
      id: 3,
      name: "Home & Garden",
      slug: "home-garden",
      image:
        "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=400&h=400&fit=crop",
      productCount: 89,
    },
    {
      id: 4,
      name: "Sports & Outdoors",
      slug: "sports-outdoors",
      image:
        "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=400&fit=crop",
      productCount: 120,
    },
    {
      id: 5,
      name: "Beauty & Health",
      slug: "beauty-health",
      image:
        "https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=400&h=400&fit=crop",
      productCount: 95,
    },
    {
      id: 6,
      name: "Books & Media",
      slug: "books-media",
      image:
        "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=400&h=400&fit=crop",
      productCount: 67,
    },
  ];

  return (
    <section className="py-16 bg-muted/20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-foreground mb-4">
            Shop by Category
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Explore our wide range of categories to find exactly what
            you&apos;re looking for.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories.map((category) => (
            <Link
              key={category.id}
              href={`/categories/${category.slug}`}
              className="group"
            >
              <Card className="hover:shadow-lg transition-all duration-300 group-hover:-translate-y-1">
                <CardContent className="p-6">
                  <div className="aspect-square relative overflow-hidden rounded-lg mb-4">
                    <Image
                      src={category.image}
                      alt={category.name}
                      fill
                      className="object-cover transition-transform group-hover:scale-105"
                    />
                  </div>
                  <div className="text-center">
                    <h3 className="font-semibold text-lg mb-1">
                      {category.name}
                    </h3>
                    <p className="text-muted-foreground text-sm">
                      {category.productCount} products
                    </p>
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
