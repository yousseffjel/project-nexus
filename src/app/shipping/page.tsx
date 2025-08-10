import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Truck, Clock, MapPin, Package } from "lucide-react";
import Header from "@/components/layout/header";
import Footer from "@/components/layout/footer";

export default function ShippingPage() {
  const shippingOptions = [
    {
      name: "Standard Shipping",
      time: "5-7 business days",
      cost: "Free on orders $50+",
      description: "Our most popular shipping option with reliable delivery.",
      icon: <Truck className="h-6 w-6" />,
    },
    {
      name: "Express Shipping",
      time: "2-3 business days",
      cost: "$9.99",
      description: "Faster delivery for when you need items quickly.",
      icon: <Clock className="h-6 w-6" />,
    },
    {
      name: "Overnight Shipping",
      time: "Next business day",
      cost: "$24.99",
      description: "Get your items the next business day.",
      icon: <Package className="h-6 w-6" />,
    },
  ];

  const internationalShipping = [
    { country: "Canada", time: "7-10 business days", cost: "$15.99" },
    { country: "United Kingdom", time: "10-14 business days", cost: "$19.99" },
    { country: "European Union", time: "10-14 business days", cost: "$22.99" },
    { country: "Australia", time: "14-21 business days", cost: "$25.99" },
    {
      country: "Other Countries",
      time: "14-28 business days",
      cost: "Calculated at checkout",
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
                Shipping <span className="text-primary">Information</span>
              </h1>
              <p className="text-lg text-muted-foreground">
                Fast, reliable delivery options to get your orders to you
                quickly and safely.
              </p>
            </div>
          </div>
        </section>

        {/* Shipping Options */}
        <section className="py-16">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-center mb-12">
              Domestic Shipping Options
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
              {shippingOptions.map((option, index) => (
                <Card
                  key={index}
                  className="text-center hover:shadow-lg transition-all duration-300"
                >
                  <CardHeader>
                    <div className="h-12 w-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                      {option.icon}
                    </div>
                    <CardTitle className="text-xl">{option.name}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2 mb-4">
                      <p className="text-2xl font-bold text-primary">
                        {option.time}
                      </p>
                      <p className="text-lg font-semibold">{option.cost}</p>
                    </div>
                    <p className="text-muted-foreground text-sm">
                      {option.description}
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Free Shipping Banner */}
            <Card className="bg-gradient-to-r from-green-50 to-emerald-50 border-green-200">
              <CardContent className="p-8 text-center">
                <h3 className="text-2xl font-bold text-green-800 mb-2">
                  🎉 Free Standard Shipping
                </h3>
                <p className="text-green-700">
                  Enjoy free standard shipping on all orders over $50. No code
                  needed!
                </p>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Processing Time */}
        <section className="py-16 bg-muted/20">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="text-3xl font-bold mb-8">Order Processing</h2>
              <Card>
                <CardContent className="p-8">
                  <Clock className="h-12 w-12 mx-auto mb-4 text-primary" />
                  <h3 className="text-xl font-semibold mb-4">
                    1-2 Business Days
                  </h3>
                  <p className="text-muted-foreground mb-6">
                    All orders are processed within 1-2 business days. Orders
                    placed on weekends or holidays will be processed the next
                    business day.
                  </p>
                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                    <p className="text-blue-800 text-sm">
                      <strong>Order by 2 PM EST</strong> and your order will be
                      processed the same day!
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* International Shipping */}
        <section className="py-16">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-center mb-12">
              International Shipping
            </h2>

            <div className="max-w-4xl mx-auto">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <MapPin className="h-5 w-5 mr-2" />
                    We Ship Worldwide
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground mb-6">
                    We&apos;re happy to ship to customers around the world.
                    International shipping rates and delivery times vary by
                    destination.
                  </p>

                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead>
                        <tr className="border-b">
                          <th className="text-left py-3 font-semibold">
                            Destination
                          </th>
                          <th className="text-left py-3 font-semibold">
                            Delivery Time
                          </th>
                          <th className="text-left py-3 font-semibold">
                            Shipping Cost
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {internationalShipping.map((shipping, index) => (
                          <tr key={index} className="border-b">
                            <td className="py-3">{shipping.country}</td>
                            <td className="py-3 text-muted-foreground">
                              {shipping.time}
                            </td>
                            <td className="py-3 font-semibold">
                              {shipping.cost}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>

                  <div className="mt-6 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                    <p className="text-yellow-800 text-sm">
                      <strong>Note:</strong> International customers are
                      responsible for any customs duties, taxes, or fees imposed
                      by their country.
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Tracking Information */}
        <section className="py-16 bg-muted/20">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              <div>
                <h2 className="text-3xl font-bold mb-6">Order Tracking</h2>
                <div className="space-y-6">
                  <div>
                    <h3 className="text-xl font-semibold mb-3">
                      📧 Email Confirmation
                    </h3>
                    <p className="text-muted-foreground">
                      You&apos;ll receive an email with tracking information
                      once your order ships.
                    </p>
                  </div>

                  <div>
                    <h3 className="text-xl font-semibold mb-3">
                      📱 Account Dashboard
                    </h3>
                    <p className="text-muted-foreground">
                      Track all your orders in real-time through your account
                      dashboard.
                    </p>
                  </div>

                  <div>
                    <h3 className="text-xl font-semibold mb-3">
                      🔔 SMS Updates
                    </h3>
                    <p className="text-muted-foreground">
                      Get text message updates about your delivery (optional).
                    </p>
                  </div>
                </div>
              </div>

              <Card>
                <CardHeader>
                  <CardTitle>Track Your Order</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium mb-2">
                        Tracking Number
                      </label>
                      <input
                        type="text"
                        placeholder="Enter your tracking number"
                        className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus:border-ring focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
                      />
                    </div>
                    <Button className="w-full">Track Package</Button>

                    <div className="text-center">
                      <p className="text-sm text-muted-foreground">
                        Don&apos;t have a tracking number?
                      </p>
                      <Button variant="link" className="p-0 h-auto">
                        Sign in to view your orders
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-16">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-center mb-12">
              Shipping FAQ
            </h2>

            <div className="max-w-3xl mx-auto space-y-6">
              <Card>
                <CardContent className="p-6">
                  <h3 className="font-semibold mb-2">
                    Can I change my shipping address after placing an order?
                  </h3>
                  <p className="text-muted-foreground text-sm">
                    Contact us immediately if you need to change your shipping
                    address. We can only make changes before your order ships.
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <h3 className="font-semibold mb-2">
                    Do you ship to PO boxes?
                  </h3>
                  <p className="text-muted-foreground text-sm">
                    Yes, we can ship to PO boxes using USPS delivery methods.
                    Some large items may require a physical address.
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <h3 className="font-semibold mb-2">
                    What if my package is damaged during shipping?
                  </h3>
                  <p className="text-muted-foreground text-sm">
                    Contact our customer service team immediately with photos of
                    the damaged package. We&apos;ll arrange a replacement or
                    refund.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section className="py-16 bg-gradient-to-r from-primary/10 to-secondary/10">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl font-bold mb-4">
              Questions About Shipping?
            </h2>
            <p className="text-muted-foreground mb-8 max-w-2xl mx-auto">
              Our customer service team is here to help with any shipping
              questions or concerns.
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
