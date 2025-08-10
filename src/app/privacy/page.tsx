import { Card, CardContent } from "@/components/ui/card";
import Link from "next/link";
import Header from "@/components/layout/header";
import Footer from "@/components/layout/footer";

export default function PrivacyPage() {
  return (
    <>
      <Header />
      <div className="min-h-screen">
        {/* Hero Section */}
        <section className="relative bg-gradient-to-r from-primary/10 to-secondary/10 py-20">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-4xl mx-auto">
              <h1 className="text-4xl lg:text-6xl font-bold text-foreground mb-6">
                Privacy <span className="text-primary">Policy</span>
              </h1>
              <p className="text-lg text-muted-foreground">
                Your privacy is important to us. Learn how we collect, use, and
                protect your information.
              </p>
              <p className="text-sm text-muted-foreground mt-4">
                Last updated: {new Date().toLocaleDateString()}
              </p>
            </div>
          </div>
        </section>

        {/* Privacy Policy Content */}
        <section className="py-16">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
            <div className="space-y-8">
              <Card>
                <CardContent className="p-8">
                  <h2 className="text-2xl font-bold mb-4">
                    1. Information We Collect
                  </h2>
                  <div className="space-y-4 text-muted-foreground">
                    <div>
                      <h3 className="font-semibold text-foreground mb-2">
                        Personal Information
                      </h3>
                      <p>
                        We collect information you provide directly to us, such
                        as when you create an account, make a purchase, or
                        contact us for support. This may include:
                      </p>
                      <ul className="list-disc ml-6 mt-2 space-y-1">
                        <li>Name and contact information</li>
                        <li>Billing and shipping addresses</li>
                        <li>
                          Payment information (processed securely by our payment
                          providers)
                        </li>
                        <li>Order history and preferences</li>
                      </ul>
                    </div>

                    <div>
                      <h3 className="font-semibold text-foreground mb-2">
                        Automatically Collected Information
                      </h3>
                      <p>
                        When you visit our website, we automatically collect
                        certain information about your device and usage:
                      </p>
                      <ul className="list-disc ml-6 mt-2 space-y-1">
                        <li>Device information (browser, operating system)</li>
                        <li>IP address and location data</li>
                        <li>Pages visited and time spent on our site</li>
                        <li>Cookies and similar tracking technologies</li>
                      </ul>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-8">
                  <h2 className="text-2xl font-bold mb-4">
                    2. How We Use Your Information
                  </h2>
                  <div className="space-y-4 text-muted-foreground">
                    <p>We use the information we collect to:</p>
                    <ul className="list-disc ml-6 space-y-2">
                      <li>Process and fulfill your orders</li>
                      <li>Provide customer support and respond to inquiries</li>
                      <li>
                        Send you important updates about your orders and our
                        services
                      </li>
                      <li>Improve our website and services</li>
                      <li>Personalize your shopping experience</li>
                      <li>Prevent fraud and ensure security</li>
                      <li>Comply with legal obligations</li>
                    </ul>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-8">
                  <h2 className="text-2xl font-bold mb-4">
                    3. Information Sharing
                  </h2>
                  <div className="space-y-4 text-muted-foreground">
                    <p>
                      We do not sell, rent, or trade your personal information
                      to third parties. We may share your information in the
                      following circumstances:
                    </p>
                    <ul className="list-disc ml-6 space-y-2">
                      <li>
                        <strong>Service Providers:</strong> With trusted
                        partners who help us operate our business (payment
                        processors, shipping companies, etc.)
                      </li>
                      <li>
                        <strong>Legal Requirements:</strong> When required by
                        law or to protect our rights and safety
                      </li>
                      <li>
                        <strong>Business Transfers:</strong> In connection with
                        any merger, sale, or transfer of our business
                      </li>
                      <li>
                        <strong>With Your Consent:</strong> Any other sharing
                        will be done with your explicit consent
                      </li>
                    </ul>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-8">
                  <h2 className="text-2xl font-bold mb-4">4. Data Security</h2>
                  <div className="space-y-4 text-muted-foreground">
                    <p>
                      We take the security of your personal information
                      seriously and use industry-standard measures to protect
                      it:
                    </p>
                    <ul className="list-disc ml-6 space-y-2">
                      <li>SSL encryption for all data transmission</li>
                      <li>
                        Secure payment processing through certified providers
                      </li>
                      <li>Regular security audits and updates</li>
                      <li>
                        Limited access to personal information on a need-to-know
                        basis
                      </li>
                      <li>Employee training on data protection practices</li>
                    </ul>
                    <p className="mt-4">
                      However, no method of transmission over the internet is
                      100% secure. While we strive to protect your information,
                      we cannot guarantee absolute security.
                    </p>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-8">
                  <h2 className="text-2xl font-bold mb-4">
                    5. Your Rights and Choices
                  </h2>
                  <div className="space-y-4 text-muted-foreground">
                    <p>
                      You have several rights regarding your personal
                      information:
                    </p>
                    <ul className="list-disc ml-6 space-y-2">
                      <li>
                        <strong>Access:</strong> Request a copy of the personal
                        information we have about you
                      </li>
                      <li>
                        <strong>Update:</strong> Correct or update your
                        information in your account settings
                      </li>
                      <li>
                        <strong>Delete:</strong> Request deletion of your
                        personal information (subject to certain exceptions)
                      </li>
                      <li>
                        <strong>Opt-out:</strong> Unsubscribe from marketing
                        communications at any time
                      </li>
                      <li>
                        <strong>Portability:</strong> Request your data in a
                        portable format
                      </li>
                    </ul>
                    <p className="mt-4">
                      To exercise these rights, please{" "}
                      <Link
                        href="/contact"
                        className="text-primary hover:underline"
                      >
                        contact us
                      </Link>{" "}
                      or update your preferences in your account settings.
                    </p>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-8">
                  <h2 className="text-2xl font-bold mb-4">
                    6. Cookies and Tracking
                  </h2>
                  <div className="space-y-4 text-muted-foreground">
                    <p>
                      We use cookies and similar technologies to enhance your
                      browsing experience:
                    </p>
                    <ul className="list-disc ml-6 space-y-2">
                      <li>
                        <strong>Essential Cookies:</strong> Required for basic
                        website functionality
                      </li>
                      <li>
                        <strong>Performance Cookies:</strong> Help us understand
                        how you use our site
                      </li>
                      <li>
                        <strong>Functionality Cookies:</strong> Remember your
                        preferences and settings
                      </li>
                      <li>
                        <strong>Marketing Cookies:</strong> Used to show
                        relevant advertisements
                      </li>
                    </ul>
                    <p className="mt-4">
                      You can control cookie settings through your browser, but
                      disabling certain cookies may affect website
                      functionality.
                    </p>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-8">
                  <h2 className="text-2xl font-bold mb-4">
                    7. Children&apos;s Privacy
                  </h2>
                  <div className="space-y-4 text-muted-foreground">
                    <p>
                      Our services are not intended for children under 13 years
                      of age. We do not knowingly collect personal information
                      from children under 13. If you believe we have collected
                      information from a child under 13, please contact us
                      immediately.
                    </p>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-8">
                  <h2 className="text-2xl font-bold mb-4">
                    8. International Data Transfers
                  </h2>
                  <div className="space-y-4 text-muted-foreground">
                    <p>
                      Your information may be transferred to and processed in
                      countries other than your own. We ensure that such
                      transfers comply with applicable data protection laws and
                      implement appropriate safeguards to protect your
                      information.
                    </p>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-8">
                  <h2 className="text-2xl font-bold mb-4">
                    9. Changes to This Policy
                  </h2>
                  <div className="space-y-4 text-muted-foreground">
                    <p>
                      We may update this Privacy Policy from time to time. We
                      will notify you of any material changes by posting the new
                      policy on our website and updating the &quot;Last
                      updated&quot; date. Your continued use of our services
                      after any changes indicates your acceptance of the updated
                      policy.
                    </p>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-8">
                  <h2 className="text-2xl font-bold mb-4">10. Contact Us</h2>
                  <div className="space-y-4 text-muted-foreground">
                    <p>
                      If you have any questions about this Privacy Policy or our
                      privacy practices, please contact us:
                    </p>
                    <div className="bg-muted/50 p-4 rounded-lg">
                      <p>
                        <strong>Email:</strong> privacy@nextecommerce.com
                      </p>
                      <p>
                        <strong>Phone:</strong> +1 (555) 123-4567
                      </p>
                      <p>
                        <strong>Address:</strong> 123 Commerce St, City, State
                        12345
                      </p>
                      <p className="mt-2">
                        <Link
                          href="/contact"
                          className="text-primary hover:underline"
                        >
                          Or use our contact form
                        </Link>
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>
      </div>
      <Footer />
    </>
  );
}
