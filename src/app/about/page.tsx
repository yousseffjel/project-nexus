import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import Header from "@/components/layout/header";
import Footer from "@/components/layout/footer";

export default function AboutPage() {
  return (
    <>
      <Header />
      <div className="min-h-screen">
        {/* Hero Section */}
        <section className="relative bg-gradient-to-r from-primary/10 to-secondary/10 py-20">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-4xl mx-auto">
              <h1 className="text-4xl lg:text-6xl font-bold text-foreground mb-6">
                About <span className="text-primary">Our Store</span>
              </h1>
              <p className="text-lg text-muted-foreground mb-8">
                We&apos;re passionate about bringing you the best products at
                amazing prices. Our journey started with a simple mission: to
                make online shopping better for everyone.
              </p>
            </div>
          </div>
        </section>

        {/* Our Story Section */}
        <section className="py-16">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl font-bold mb-6">Our Story</h2>
                <p className="text-muted-foreground mb-4">
                  Founded in 2024, Next E-commerce began as a small startup with
                  a big dream: to revolutionize the online shopping experience.
                  We believe that everyone deserves access to quality products
                  without breaking the bank.
                </p>
                <p className="text-muted-foreground mb-4">
                  Today, we serve thousands of customers worldwide, offering
                  everything from cutting-edge electronics to stylish fashion,
                  home essentials, and much more. Our commitment to quality,
                  customer service, and innovation drives everything we do.
                </p>
                <p className="text-muted-foreground">
                  We&apos;re not just a marketplace – we&apos;re a community of
                  people who love great products and exceptional service.
                </p>
              </div>
              <div className="relative">
                <div className="aspect-square relative rounded-2xl overflow-hidden">
                  <Image
                    src="https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=600&h=600&fit=crop&auto=format"
                    alt="Our Story"
                    fill
                    className="object-cover"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Values Section */}
        <section className="py-16 bg-muted/20">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">Our Values</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                These core values guide every decision we make and every
                interaction we have with our customers.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <Card className="text-center">
                <CardContent className="p-8">
                  <div className="h-16 w-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-2xl">🛡️</span>
                  </div>
                  <h3 className="text-xl font-semibold mb-3">Quality First</h3>
                  <p className="text-muted-foreground">
                    We carefully curate every product to ensure it meets our
                    high standards for quality and reliability.
                  </p>
                </CardContent>
              </Card>

              <Card className="text-center">
                <CardContent className="p-8">
                  <div className="h-16 w-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-2xl">❤️</span>
                  </div>
                  <h3 className="text-xl font-semibold mb-3">Customer Love</h3>
                  <p className="text-muted-foreground">
                    Our customers are at the heart of everything we do. Your
                    satisfaction is our ultimate goal.
                  </p>
                </CardContent>
              </Card>

              <Card className="text-center">
                <CardContent className="p-8">
                  <div className="h-16 w-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-2xl">🚀</span>
                  </div>
                  <h3 className="text-xl font-semibold mb-3">Innovation</h3>
                  <p className="text-muted-foreground">
                    We continuously improve our platform and services to provide
                    you with the best shopping experience.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Team Section */}
        <section className="py-16">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">Meet Our Team</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                The amazing people behind Next E-commerce who make it all
                possible.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <Card className="text-center">
                <CardContent className="p-6">
                  <div className="aspect-square relative rounded-full overflow-hidden w-24 h-24 mx-auto mb-4">
                    <Image
                      src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop&auto=format"
                      alt="John Smith"
                      fill
                      className="object-cover"
                    />
                  </div>
                  <h3 className="text-lg font-semibold mb-1">John Smith</h3>
                  <p className="text-muted-foreground text-sm mb-2">
                    CEO & Founder
                  </p>
                  <p className="text-muted-foreground text-sm">
                    Passionate about creating exceptional customer experiences
                    and building innovative solutions.
                  </p>
                </CardContent>
              </Card>

              <Card className="text-center">
                <CardContent className="p-6">
                  <div className="aspect-square relative rounded-full overflow-hidden w-24 h-24 mx-auto mb-4">
                    <Image
                      src="https://images.unsplash.com/photo-1494790108755-2616b612b786?w=400&h=400&fit=crop&auto=format"
                      alt="Sarah Johnson"
                      fill
                      className="object-cover"
                    />
                  </div>
                  <h3 className="text-lg font-semibold mb-1">Sarah Johnson</h3>
                  <p className="text-muted-foreground text-sm mb-2">
                    Head of Design
                  </p>
                  <p className="text-muted-foreground text-sm">
                    Creates beautiful and intuitive user experiences that make
                    shopping a joy.
                  </p>
                </CardContent>
              </Card>

              <Card className="text-center">
                <CardContent className="p-6">
                  <div className="aspect-square relative rounded-full overflow-hidden w-24 h-24 mx-auto mb-4">
                    <Image
                      src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&auto=format"
                      alt="Mike Davis"
                      fill
                      className="object-cover"
                    />
                  </div>
                  <h3 className="text-lg font-semibold mb-1">Mike Davis</h3>
                  <p className="text-muted-foreground text-sm mb-2">CTO</p>
                  <p className="text-muted-foreground text-sm">
                    Ensures our platform is fast, secure, and reliable for all
                    our customers.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 bg-gradient-to-r from-primary/10 to-secondary/10">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl font-bold mb-4">
              Ready to Start Shopping?
            </h2>
            <p className="text-muted-foreground mb-8 max-w-2xl mx-auto">
              Join thousands of satisfied customers and discover amazing
              products at unbeatable prices.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/products">
                <Button size="lg">Browse Products</Button>
              </Link>
              <Link href="/contact">
                <Button variant="outline" size="lg">
                  Contact Us
                </Button>
              </Link>
            </div>
          </div>
        </section>
      </div>
      <Footer />
    </>
  );
}
