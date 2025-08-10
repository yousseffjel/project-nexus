import { Suspense } from "react";
import Header from "@/components/layout/header";
import Hero from "@/components/sections/hero";
import FeaturedProducts from "@/components/sections/featured-products";
import Categories from "@/components/sections/categories";
import Footer from "@/components/layout/footer";
import LoadingSpinner from "@/components/ui/loading-spinner";

export default function Home() {
  return (
    <>
      <Header />
      <main className="min-h-screen">
        <Hero />
        <Suspense fallback={<LoadingSpinner />}>
          <FeaturedProducts />
        </Suspense>
        <Suspense fallback={<LoadingSpinner />}>
          <Categories />
        </Suspense>
      </main>
      <Footer />
    </>
  );
}
