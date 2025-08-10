import Categories from "@/components/sections/categories";
import Header from "@/components/layout/header";
import Footer from "@/components/layout/footer";

export default function CategoriesPage() {
  return (
    <>
      <Header />
      <div className="min-h-screen">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-foreground mb-4">
              All Categories
            </h1>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Browse through our complete collection of product categories.
            </p>
          </div>
          <Categories />
        </div>
      </div>
      <Footer />
    </>
  );
}
