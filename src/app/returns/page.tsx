import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Package, Clock, CheckCircle, XCircle } from "lucide-react";
import Header from "@/components/layout/header";
import Footer from "@/components/layout/footer";

export default function ReturnsPage() {
  const returnProcess = [
    {
      step: 1,
      title: "Initiate Return",
      description:
        "Contact our customer service or use your account to start the return process.",
      icon: <Package className="h-6 w-6" />,
    },
    {
      step: 2,
      title: "Package Your Item",
      description:
        "Securely package the item with all original packaging and accessories.",
      icon: <Package className="h-6 w-6" />,
    },
    {
      step: 3,
      title: "Ship the Item",
      description:
        "Use the prepaid shipping label we provide or drop off at designated locations.",
      icon: <Package className="h-6 w-6" />,
    },
    {
      step: 4,
      title: "Processing",
      description:
        "Once received, we'll inspect the item and process your refund within 5-7 business days.",
      icon: <Clock className="h-6 w-6" />,
    },
  ];

  return (
    <>
      <Header />
      <div className="min-h-screen">
        {/* Hero Section */}
        <section className="relative bg-gradient-to-r from-primary/10 to-secondary/10 py-20">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-4xl mx-auto">
              <h1 className="text-4xl lg:text-6xl font-bold text-foreground mb-6">
                Returns & <span className="text-primary">Exchanges</span>
              </h1>
              <p className="text-lg text-muted-foreground">
                We want you to be completely satisfied with your purchase. Learn
                about our return policy and how to return items.
              </p>
            </div>
          </div>
        </section>

        {/* Return Policy Overview */}
        <section className="py-16">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              <div>
                <h2 className="text-3xl font-bold mb-6">Our Return Policy</h2>
                <div className="space-y-6">
                  <div className="flex items-start space-x-4">
                    <div className="h-10 w-10 bg-green-100 rounded-full flex items-center justify-center mt-1">
                      <CheckCircle className="h-5 w-5 text-green-600" />
                    </div>
                    <div>
                      <h3 className="font-semibold mb-2">
                        30-Day Return Window
                      </h3>
                      <p className="text-muted-foreground">
                        You have 30 days from the date of delivery to return
                        most items for a full refund.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-4">
                    <div className="h-10 w-10 bg-green-100 rounded-full flex items-center justify-center mt-1">
                      <CheckCircle className="h-5 w-5 text-green-600" />
                    </div>
                    <div>
                      <h3 className="font-semibold mb-2">Original Condition</h3>
                      <p className="text-muted-foreground">
                        Items must be in original condition with tags attached
                        and original packaging.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-4">
                    <div className="h-10 w-10 bg-green-100 rounded-full flex items-center justify-center mt-1">
                      <CheckCircle className="h-5 w-5 text-green-600" />
                    </div>
                    <div>
                      <h3 className="font-semibold mb-2">
                        Free Return Shipping
                      </h3>
                      <p className="text-muted-foreground">
                        We provide prepaid return shipping labels for most
                        returns within the US.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-4">
                    <div className="h-10 w-10 bg-green-100 rounded-full flex items-center justify-center mt-1">
                      <CheckCircle className="h-5 w-5 text-green-600" />
                    </div>
                    <div>
                      <h3 className="font-semibold mb-2">Quick Refunds</h3>
                      <p className="text-muted-foreground">
                        Refunds are processed within 5-7 business days after we
                        receive your return.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <Card>
                <CardHeader>
                  <CardTitle>Start a Return</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-muted-foreground">
                    Ready to return an item? We&apos;ll make it as easy as
                    possible.
                  </p>
                  <div className="space-y-3">
                    <Link href="/contact">
                      <Button className="w-full">
                        Contact Customer Service
                      </Button>
                    </Link>
                    <p className="text-center text-sm text-muted-foreground">
                      or
                    </p>
                    <Button variant="outline" className="w-full">
                      Sign In to Your Account
                    </Button>
                  </div>
                  <div className="mt-6 p-4 bg-muted/50 rounded-lg">
                    <h4 className="font-semibold mb-2">
                      Need your order number?
                    </h4>
                    <p className="text-sm text-muted-foreground">
                      Check your email confirmation or account order history.
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Return Process */}
        <section className="py-16 bg-muted/20">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-center mb-12">
              How Returns Work
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {returnProcess.map((step, index) => (
                <Card key={index} className="text-center">
                  <CardContent className="p-6">
                    <div className="h-12 w-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                      {step.icon}
                    </div>
                    <div className="mb-4">
                      <span className="bg-primary text-primary-foreground text-sm px-2 py-1 rounded">
                        Step {step.step}
                      </span>
                    </div>
                    <h3 className="font-semibold mb-2">{step.title}</h3>
                    <p className="text-sm text-muted-foreground">
                      {step.description}
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Non-Returnable Items */}
        <section className="py-16">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mx-auto">
              <h2 className="text-3xl font-bold text-center mb-12">
                Non-Returnable Items
              </h2>

              <Card>
                <CardContent className="p-8">
                  <p className="text-muted-foreground mb-6">
                    For health and safety reasons, the following items cannot be
                    returned:
                  </p>

                  <div className="space-y-4">
                    <div className="flex items-center space-x-3">
                      <XCircle className="h-5 w-5 text-red-500" />
                      <span>
                        Personal care items (opened cosmetics, skincare)
                      </span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <XCircle className="h-5 w-5 text-red-500" />
                      <span>Perishable goods (food, flowers)</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <XCircle className="h-5 w-5 text-red-500" />
                      <span>Custom or personalized items</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <XCircle className="h-5 w-5 text-red-500" />
                      <span>Digital downloads or software</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <XCircle className="h-5 w-5 text-red-500" />
                      <span>Gift cards</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section className="py-16 bg-gradient-to-r from-primary/10 to-secondary/10">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl font-bold mb-4">
              Questions About Returns?
            </h2>
            <p className="text-muted-foreground mb-8 max-w-2xl mx-auto">
              Our customer service team is here to help with any questions about
              returns or exchanges.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/contact">
                <Button size="lg">Contact Support</Button>
              </Link>
              <Link href="/help">
                <Button variant="outline" size="lg">
                  Visit Help Center
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
