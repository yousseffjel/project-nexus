import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Search, MessageCircle, Phone, Mail } from "lucide-react";
import Header from "@/components/layout/header";
import Footer from "@/components/layout/footer";

export default function HelpPage() {
  const faqCategories = [
    {
      title: "Orders & Shipping",
      faqs: [
        {
          question: "How can I track my order?",
          answer:
            "You can track your order using the tracking number sent to your email, or by logging into your account and viewing your order history.",
        },
        {
          question: "How long does shipping take?",
          answer:
            "Standard shipping takes 5-7 business days, while express shipping takes 2-3 business days.",
        },
        {
          question: "Do you offer international shipping?",
          answer:
            "Yes, we ship to most countries worldwide. Shipping costs and delivery times vary by destination.",
        },
      ],
    },
    {
      title: "Returns & Refunds",
      faqs: [
        {
          question: "What is your return policy?",
          answer:
            "We offer a 30-day return policy for most items in original condition with tags and packaging intact.",
        },
        {
          question: "How do I return an item?",
          answer:
            "You can initiate a return through your account or contact our customer service team for assistance.",
        },
        {
          question: "When will I receive my refund?",
          answer:
            "Refunds are processed within 5-7 business days after we receive your returned item.",
        },
      ],
    },
    {
      title: "Account & Payment",
      faqs: [
        {
          question: "How do I create an account?",
          answer:
            "Click 'Sign Up' in the top navigation and follow the simple registration process.",
        },
        {
          question: "What payment methods do you accept?",
          answer:
            "We accept all major credit cards, PayPal, and other secure payment methods.",
        },
        {
          question: "Is my payment information secure?",
          answer:
            "Yes, we use industry-standard SSL encryption to protect all payment information.",
        },
      ],
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
                Help <span className="text-primary">Center</span>
              </h1>
              <p className="text-lg text-muted-foreground mb-8">
                Find answers to common questions or get in touch with our
                support team.
              </p>

              {/* Search Bar */}
              <div className="relative max-w-md mx-auto">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <input
                  type="search"
                  placeholder="Search for help..."
                  className="w-full rounded-md border border-input bg-background px-10 py-3 text-sm ring-offset-background focus:border-ring focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Quick Actions */}
        <section className="py-16">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-center mb-12">
              How can we help you?
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <Link href="/contact">
                <Card className="text-center hover:shadow-lg transition-all duration-300 cursor-pointer">
                  <CardContent className="p-6">
                    <div className="h-12 w-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                      <MessageCircle className="h-6 w-6 text-primary" />
                    </div>
                    <h3 className="font-semibold mb-2">Live Chat</h3>
                    <p className="text-sm text-muted-foreground">
                      Chat with our support team
                    </p>
                  </CardContent>
                </Card>
              </Link>

              <Link href="/contact">
                <Card className="text-center hover:shadow-lg transition-all duration-300 cursor-pointer">
                  <CardContent className="p-6">
                    <div className="h-12 w-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Phone className="h-6 w-6 text-primary" />
                    </div>
                    <h3 className="font-semibold mb-2">Call Us</h3>
                    <p className="text-sm text-muted-foreground">
                      +1 (555) 123-4567
                    </p>
                  </CardContent>
                </Card>
              </Link>

              <Link href="/contact">
                <Card className="text-center hover:shadow-lg transition-all duration-300 cursor-pointer">
                  <CardContent className="p-6">
                    <div className="h-12 w-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Mail className="h-6 w-6 text-primary" />
                    </div>
                    <h3 className="font-semibold mb-2">Email Support</h3>
                    <p className="text-sm text-muted-foreground">
                      support@nextecommerce.com
                    </p>
                  </CardContent>
                </Card>
              </Link>

              <Link href="/returns">
                <Card className="text-center hover:shadow-lg transition-all duration-300 cursor-pointer">
                  <CardContent className="p-6">
                    <div className="h-12 w-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                      <span className="text-2xl">📦</span>
                    </div>
                    <h3 className="font-semibold mb-2">Return Item</h3>
                    <p className="text-sm text-muted-foreground">
                      Start a return process
                    </p>
                  </CardContent>
                </Card>
              </Link>
            </div>
          </div>
        </section>

        {/* FAQ Sections */}
        <section className="py-16 bg-muted/20">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-center mb-12">
              Frequently Asked Questions
            </h2>

            <div className="space-y-8">
              {faqCategories.map((category, categoryIndex) => (
                <div key={categoryIndex}>
                  <h3 className="text-2xl font-semibold mb-6">
                    {category.title}
                  </h3>
                  <div className="grid gap-4">
                    {category.faqs.map((faq, faqIndex) => (
                      <Card key={faqIndex}>
                        <CardHeader>
                          <CardTitle className="text-lg">
                            {faq.question}
                          </CardTitle>
                        </CardHeader>
                        <CardContent>
                          <p className="text-muted-foreground">{faq.answer}</p>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Still Need Help */}
        <section className="py-16">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl font-bold mb-4">Still need help?</h2>
            <p className="text-muted-foreground mb-8 max-w-2xl mx-auto">
              Can&apos;t find what you&apos;re looking for? Our customer support
              team is here to help.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/contact">
                <Button size="lg">Contact Support</Button>
              </Link>
              <Link href="/">
                <Button variant="outline" size="lg">
                  Back to Home
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
