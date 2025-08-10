import Link from "next/link";
import { CheckCircle, Package, Mail, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Header from "@/components/layout/header";
import Footer from "@/components/layout/footer";

export default function OrderConfirmationPage() {
  return (
    <>
      <Header />
      <div className="min-h-screen bg-muted/30">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="max-w-2xl mx-auto text-center">
            {/* Success Icon */}
            <div className="flex justify-center mb-6">
              <div className="h-20 w-20 bg-green-100 dark:bg-green-900/20 rounded-full flex items-center justify-center">
                <CheckCircle className="h-12 w-12 text-green-600 dark:text-green-400" />
              </div>
            </div>

            {/* Success Message */}
            <h1 className="text-3xl font-bold text-green-800 dark:text-green-400 mb-4">
              Order Placed Successfully!
            </h1>
            <p className="text-lg text-muted-foreground mb-8">
              Thank you for your purchase. Your order has been confirmed and is
              being processed.
            </p>

            {/* Order Details Card */}
            <Card className="mb-8">
              <CardHeader>
                <CardTitle className="flex items-center justify-center">
                  <Package className="h-5 w-5 mr-2" />
                  What Happens Next?
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="text-center">
                    <div className="h-12 w-12 bg-blue-100 dark:bg-blue-900/20 rounded-full flex items-center justify-center mx-auto mb-3">
                      <Mail className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                    </div>
                    <h3 className="font-semibold mb-2">Email Confirmation</h3>
                    <p className="text-sm text-muted-foreground">
                      Check your email for order details and tracking
                      information
                    </p>
                  </div>

                  <div className="text-center">
                    <div className="h-12 w-12 bg-yellow-100 dark:bg-yellow-900/20 rounded-full flex items-center justify-center mx-auto mb-3">
                      <Package className="h-6 w-6 text-yellow-600 dark:text-yellow-400" />
                    </div>
                    <h3 className="font-semibold mb-2">Processing</h3>
                    <p className="text-sm text-muted-foreground">
                      Your order will be prepared and packaged within 1-2
                      business days
                    </p>
                  </div>

                  <div className="text-center">
                    <div className="h-12 w-12 bg-green-100 dark:bg-green-900/20 rounded-full flex items-center justify-center mx-auto mb-3">
                      <ArrowRight className="h-6 w-6 text-green-600 dark:text-green-400" />
                    </div>
                    <h3 className="font-semibold mb-2">Shipping</h3>
                    <p className="text-sm text-muted-foreground">
                      Your order will be shipped and you&apos;ll receive
                      tracking details
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Guest Order Tracking Info */}
            <Card className="mb-8 border-blue-200 bg-blue-50 dark:bg-blue-950/20 dark:border-blue-800">
              <CardContent className="pt-6">
                <div className="flex items-start space-x-3">
                  <CheckCircle className="h-5 w-5 text-blue-600 dark:text-blue-400 mt-1" />
                  <div className="text-left">
                    <h3 className="font-semibold text-blue-800 dark:text-blue-200 mb-2">
                      Order Tracking (No Account Needed)
                    </h3>
                    <p className="text-blue-600 dark:text-blue-300 text-sm">
                      Since you checked out as a guest, your order confirmation
                      and tracking details have been sent to your email address.
                      You can track your order using the tracking link in your
                      email confirmation.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/products">
                <Button size="lg" className="w-full sm:w-auto">
                  Continue Shopping
                </Button>
              </Link>
              <Link href="/contact">
                <Button
                  variant="outline"
                  size="lg"
                  className="w-full sm:w-auto"
                >
                  Contact Support
                </Button>
              </Link>
            </div>

            {/* Additional Info */}
            <div className="mt-8 text-sm text-muted-foreground">
              <p>
                Need help? Contact our support team or visit our{" "}
                <Link href="/help" className="text-primary underline">
                  Help Center
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
