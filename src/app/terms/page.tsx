import { Card, CardContent } from "@/components/ui/card";
import Link from "next/link";
import Header from "@/components/layout/header";
import Footer from "@/components/layout/footer";

export default function TermsPage() {
  return (
    <>
      <Header />
      <div className="min-h-screen">
        {/* Hero Section */}
        <section className="relative bg-gradient-to-r from-primary/10 to-secondary/10 py-20">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-4xl mx-auto">
              <h1 className="text-4xl lg:text-6xl font-bold text-foreground mb-6">
                Terms of <span className="text-primary">Service</span>
              </h1>
              <p className="text-lg text-muted-foreground">
                Please read these terms carefully before using our services.
              </p>
              <p className="text-sm text-muted-foreground mt-4">
                Last updated: {new Date().toLocaleDateString()}
              </p>
            </div>
          </div>
        </section>

        {/* Terms Content */}
        <section className="py-16">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
            <div className="space-y-8">
              <Card>
                <CardContent className="p-8">
                  <h2 className="text-2xl font-bold mb-4">
                    1. Acceptance of Terms
                  </h2>
                  <div className="space-y-4 text-muted-foreground">
                    <p>
                      By accessing and using Next E-commerce (&quot;the
                      Service&quot;), you accept and agree to be bound by the
                      terms and provision of this agreement. If you do not agree
                      to abide by the above, please do not use this service.
                    </p>
                    <p>
                      These Terms of Service (&quot;Terms&quot;) govern your use
                      of our website located at nextecommerce.com (the
                      &quot;Service&quot;) operated by Next E-commerce
                      (&quot;us&quot;, &quot;we&quot;, or &quot;our&quot;).
                    </p>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-8">
                  <h2 className="text-2xl font-bold mb-4">2. Use License</h2>
                  <div className="space-y-4 text-muted-foreground">
                    <p>
                      Permission is granted to temporarily download one copy of
                      the materials on Next E-commerce&apos;s website for
                      personal, non-commercial transitory viewing only. This is
                      the grant of a license, not a transfer of title, and under
                      this license you may not:
                    </p>
                    <ul className="list-disc ml-6 space-y-2">
                      <li>modify or copy the materials</li>
                      <li>
                        use the materials for any commercial purpose or for any
                        public display (commercial or non-commercial)
                      </li>
                      <li>
                        attempt to decompile or reverse engineer any software
                        contained on the website
                      </li>
                      <li>
                        remove any copyright or other proprietary notations from
                        the materials
                      </li>
                    </ul>
                    <p>
                      This license shall automatically terminate if you violate
                      any of these restrictions and may be terminated by us at
                      any time. Upon terminating your viewing of these materials
                      or upon the termination of this license, you must destroy
                      any downloaded materials in your possession.
                    </p>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-8">
                  <h2 className="text-2xl font-bold mb-4">3. Account Terms</h2>
                  <div className="space-y-4 text-muted-foreground">
                    <p>
                      When you create an account with us, you must provide
                      information that is accurate, complete, and current at all
                      times.
                    </p>
                    <p>You are responsible for:</p>
                    <ul className="list-disc ml-6 space-y-2">
                      <li>
                        Safeguarding the password and maintaining the security
                        of your account
                      </li>
                      <li>All activities that occur under your account</li>
                      <li>
                        Immediately notifying us of any unauthorized use of your
                        account
                      </li>
                    </ul>
                    <p>
                      We reserve the right to refuse service, terminate
                      accounts, remove or edit content, or cancel orders at our
                      sole discretion.
                    </p>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-8">
                  <h2 className="text-2xl font-bold mb-4">
                    4. Products and Services
                  </h2>
                  <div className="space-y-4 text-muted-foreground">
                    <p>
                      Certain products or services may be available exclusively
                      online through the website. These products or services may
                      have limited quantities and are subject to return or
                      exchange only according to our Return Policy.
                    </p>
                    <p>
                      We have made every effort to display as accurately as
                      possible the colors and images of our products that appear
                      at the store. We cannot guarantee that your computer
                      monitor&apos;s display of any color will be accurate.
                    </p>
                    <p>
                      We reserve the right, but are not obligated, to limit the
                      sales of our products or services to any person,
                      geographic region, or jurisdiction.
                    </p>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-8">
                  <h2 className="text-2xl font-bold mb-4">
                    5. Pricing and Payment
                  </h2>
                  <div className="space-y-4 text-muted-foreground">
                    <p>
                      All prices are subject to change without notice. We
                      reserve the right to modify or discontinue the Service (or
                      any part or content thereof) without notice at any time.
                    </p>
                    <p>Payment terms:</p>
                    <ul className="list-disc ml-6 space-y-2">
                      <li>Payment is due at the time of purchase</li>
                      <li>
                        We accept major credit cards and other payment methods
                        as displayed during checkout
                      </li>
                      <li>
                        All payments are processed securely through our payment
                        providers
                      </li>
                      <li>You are responsible for any applicable taxes</li>
                    </ul>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-8">
                  <h2 className="text-2xl font-bold mb-4">
                    6. Shipping and Delivery
                  </h2>
                  <div className="space-y-4 text-muted-foreground">
                    <p>
                      Delivery times and shipping costs vary by location and
                      shipping method selected. See our
                      <Link
                        href="/shipping"
                        className="text-primary hover:underline"
                      >
                        {" "}
                        Shipping Information
                      </Link>{" "}
                      page for detailed information.
                    </p>
                    <p>
                      Risk of loss and title for items purchased from our store
                      pass to you upon delivery to the shipping carrier. You are
                      responsible for filing any claims with carriers for lost
                      or damaged shipments.
                    </p>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-8">
                  <h2 className="text-2xl font-bold mb-4">
                    7. Returns and Refunds
                  </h2>
                  <div className="space-y-4 text-muted-foreground">
                    <p>
                      Our return policy is detailed on our{" "}
                      <Link
                        href="/returns"
                        className="text-primary hover:underline"
                      >
                        Returns & Exchanges
                      </Link>{" "}
                      page. By making a purchase, you agree to our return policy
                      terms.
                    </p>
                    <p>
                      Refunds will be processed using the same payment method
                      used for the original purchase, unless otherwise
                      specified.
                    </p>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-8">
                  <h2 className="text-2xl font-bold mb-4">
                    8. Prohibited Uses
                  </h2>
                  <div className="space-y-4 text-muted-foreground">
                    <p>You may not use our products or services:</p>
                    <ul className="list-disc ml-6 space-y-2">
                      <li>
                        For any unlawful purpose or to solicit others to perform
                        unlawful acts
                      </li>
                      <li>
                        To violate any international, federal, provincial, or
                        state regulations, rules, laws, or local ordinances
                      </li>
                      <li>
                        To infringe upon or violate our intellectual property
                        rights or the intellectual property rights of others
                      </li>
                      <li>
                        To harass, abuse, insult, harm, defame, slander,
                        disparage, intimidate, or discriminate
                      </li>
                      <li>To submit false or misleading information</li>
                      <li>
                        To upload or transmit viruses or any other type of
                        malicious code
                      </li>
                    </ul>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-8">
                  <h2 className="text-2xl font-bold mb-4">9. Disclaimer</h2>
                  <div className="space-y-4 text-muted-foreground">
                    <p>
                      The information on this website is provided on an &quot;as
                      is&quot; basis. To the fullest extent permitted by law,
                      this Company:
                    </p>
                    <ul className="list-disc ml-6 space-y-2">
                      <li>
                        Excludes all representations and warranties relating to
                        this website and its contents
                      </li>
                      <li>
                        Excludes all liability for damages arising out of or in
                        connection with your use of this website
                      </li>
                    </ul>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-8">
                  <h2 className="text-2xl font-bold mb-4">
                    10. Limitation of Liability
                  </h2>
                  <div className="space-y-4 text-muted-foreground">
                    <p>
                      In no case shall Next E-commerce, our directors, officers,
                      employees, affiliates, agents, contractors, interns,
                      suppliers, service providers, or licensors be liable for
                      any injury, loss, claim, or any direct, indirect,
                      incidental, punitive, special, or consequential damages of
                      any kind.
                    </p>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-8">
                  <h2 className="text-2xl font-bold mb-4">
                    11. Indemnification
                  </h2>
                  <div className="space-y-4 text-muted-foreground">
                    <p>
                      You agree to indemnify, defend, and hold harmless Next
                      E-commerce and our parent, subsidiaries, affiliates,
                      partners, officers, directors, agents, contractors,
                      licensors, service providers, subcontractors, suppliers,
                      interns, and employees, harmless from any claim or demand,
                      including reasonable attorneys&apos; fees, made by any
                      third-party due to or arising out of your breach of these
                      Terms of Service or the documents they incorporate by
                      reference, or your violation of any law or the rights of a
                      third-party.
                    </p>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-8">
                  <h2 className="text-2xl font-bold mb-4">12. Governing Law</h2>
                  <div className="space-y-4 text-muted-foreground">
                    <p>
                      These terms and conditions are governed by and construed
                      in accordance with the laws of the United States and you
                      irrevocably submit to the exclusive jurisdiction of the
                      courts in that state or location.
                    </p>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-8">
                  <h2 className="text-2xl font-bold mb-4">
                    13. Changes to Terms
                  </h2>
                  <div className="space-y-4 text-muted-foreground">
                    <p>
                      We reserve the right, at our sole discretion, to update,
                      change, or replace any part of these Terms of Service by
                      posting updates and changes to our website. It is your
                      responsibility to check our website periodically for
                      changes.
                    </p>
                    <p>
                      Your continued use of or access to our website or the
                      Service following the posting of any changes to these
                      Terms of Service constitutes acceptance of those changes.
                    </p>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-8">
                  <h2 className="text-2xl font-bold mb-4">
                    14. Contact Information
                  </h2>
                  <div className="space-y-4 text-muted-foreground">
                    <p>
                      Questions about the Terms of Service should be sent to us
                      at:
                    </p>
                    <div className="bg-muted/50 p-4 rounded-lg">
                      <p>
                        <strong>Email:</strong> legal@nextecommerce.com
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
