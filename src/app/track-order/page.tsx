"use client";

import { useState } from "react";
import Link from "next/link";
import { Search, Package, Mail, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Header from "@/components/layout/header";
import Footer from "@/components/layout/footer";

export default function TrackOrderPage() {
  const [formData, setFormData] = useState({
    orderNumber: "",
    email: "",
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // In a real app, you would:
    // 1. Validate the order number and email
    // 2. Query the database for the order
    // 3. Display order status and tracking information

    alert(`Order tracking feature will be available once the backend is integrated.
    
For now, please check your email for order updates.`);
  };

  return (
    <>
      <Header />
      <div className="min-h-screen bg-muted/30">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="max-w-2xl mx-auto">
            {/* Header */}
            <div className="flex items-center justify-between mb-8">
              <div className="flex items-center space-x-4">
                <Link href="/">
                  <Button variant="ghost" size="sm">
                    <ArrowLeft className="h-4 w-4 mr-2" />
                    Back to Home
                  </Button>
                </Link>
                <h1 className="text-3xl font-bold">Track Your Order</h1>
              </div>
            </div>

            {/* Info Card */}
            <Card className="mb-8 border-blue-200 bg-blue-50 dark:bg-blue-950/20 dark:border-blue-800">
              <CardContent className="pt-6">
                <div className="flex items-start space-x-3">
                  <Package className="h-5 w-5 text-blue-600 dark:text-blue-400 mt-1" />
                  <div>
                    <h3 className="font-semibold text-blue-800 dark:text-blue-200 mb-2">
                      Guest Order Tracking
                    </h3>
                    <p className="text-blue-600 dark:text-blue-300 text-sm">
                      Enter your order number and email address to track your
                      order status. You can find your order number in the
                      confirmation email we sent you.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Tracking Form */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Search className="h-5 w-5 mr-2" />
                  Enter Order Details
                </CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <Label htmlFor="orderNumber">Order Number</Label>
                    <Input
                      id="orderNumber"
                      name="orderNumber"
                      placeholder="e.g., ORD-2024-001234"
                      value={formData.orderNumber}
                      onChange={handleInputChange}
                      required
                    />
                  </div>

                  <div>
                    <Label htmlFor="email">Email Address</Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      placeholder="Enter the email used for the order"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                    />
                  </div>

                  <Button type="submit" className="w-full" size="lg">
                    <Search className="h-4 w-4 mr-2" />
                    Track Order
                  </Button>
                </form>
              </CardContent>
            </Card>

            {/* Help Section */}
            <Card className="mt-8">
              <CardHeader>
                <CardTitle className="flex items-center text-lg">
                  <Mail className="h-5 w-5 mr-2" />
                  Need Help?
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4 text-sm">
                  <div>
                    <h4 className="font-semibold mb-2">
                      Can&apos;t find your order number?
                    </h4>
                    <p className="text-muted-foreground">
                      Check your email inbox (including spam/junk folders) for
                      your order confirmation. The order number starts with
                      &quot;ORD-&quot;.
                    </p>
                  </div>

                  <div>
                    <h4 className="font-semibold mb-2">
                      Still having trouble?
                    </h4>
                    <p className="text-muted-foreground mb-2">
                      Our customer support team is here to help:
                    </p>
                    <div className="flex flex-col sm:flex-row gap-2">
                      <Link href="/contact">
                        <Button variant="outline" size="sm">
                          Contact Support
                        </Button>
                      </Link>
                      <Link href="/help">
                        <Button variant="outline" size="sm">
                          Visit Help Center
                        </Button>
                      </Link>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
