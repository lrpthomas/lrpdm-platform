import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { config } from "@/lib/config";
import { 
  Code2, 
  Workflow, 
  Target, 
  Wrench,
  Link2,
  ChartBar,
  Shield,
  Zap,
  Users
} from "lucide-react";

export default function Home() {
  const { company, apps } = config;
  
  return (
    <div>
      {/* Hero Section with VGK-inspired gradient */}
      <div className="relative bg-gradient-to-br from-steel-900 via-steel-800 to-steel-700 text-white">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="relative container mx-auto px-4 py-24">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-5xl lg:text-6xl font-bold mb-6">
                <span className="text-gold">LRP</span> Data & Management
              </h1>
              <p className="text-xl lg:text-2xl mb-8 text-gray-200">
                {company.tagline}
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button size="lg" className="bg-gold hover:bg-gold-dark text-steel-900 font-bold">
                  <Link href="/contact">Start Your Project</Link>
                </Button>
                <Button size="lg" variant="outline" className="border-gold text-gold hover:bg-gold hover:text-steel-900">
                  <Link href="/apps">Explore Applications</Link>
                </Button>
              </div>
            </div>
            <div className="hidden lg:flex justify-center">
              <Image
                src="/logo-dark.webp"
                alt="LRPDM Logo"
                width={400}
                height={400}
                className="drop-shadow-2xl"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Services Section */}
      <div className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-steel-900 mb-4">
              Enterprise Solutions
            </h2>
            <p className="text-xl text-steel-600 max-w-3xl mx-auto">
              From custom applications to complete workflow automation, we transform how businesses operate
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card className="border-2 hover:border-gold transition-all hover:shadow-xl">
              <CardHeader>
                <Code2 className="h-12 w-12 text-gold mb-4" />
                <CardTitle className="text-steel-900">Custom Applications</CardTitle>
                <CardDescription className="text-steel-600">
                  Built-to-order web and mobile apps that solve your specific business needs
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="border-2 hover:border-gold transition-all hover:shadow-xl">
              <CardHeader>
                <Workflow className="h-12 w-12 text-gold mb-4" />
                <CardTitle className="text-steel-900">Workflow Automation</CardTitle>
                <CardDescription className="text-steel-600">
                  Turn repetitive manual tasks into automated processes that save time
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="border-2 hover:border-gold transition-all hover:shadow-xl">
              <CardHeader>
                <Target className="h-12 w-12 text-gold mb-4" />
                <CardTitle className="text-steel-900">Strategic Consulting</CardTitle>
                <CardDescription className="text-steel-600">
                  Expert guidance on choosing and implementing the right technology
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="border-2 hover:border-gold transition-all hover:shadow-xl">
              <CardHeader>
                <Wrench className="h-12 w-12 text-gold mb-4" />
                <CardTitle className="text-steel-900">Tool Development</CardTitle>
                <CardDescription className="text-steel-600">
                  Custom software tools that connect your existing systems
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="border-2 hover:border-gold transition-all hover:shadow-xl">
              <CardHeader>
                <Link2 className="h-12 w-12 text-gold mb-4" />
                <CardTitle className="text-steel-900">System Integration</CardTitle>
                <CardDescription className="text-steel-600">
                  Make all your different software platforms work together seamlessly
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="border-2 hover:border-gold transition-all hover:shadow-xl">
              <CardHeader>
                <ChartBar className="h-12 w-12 text-gold mb-4" />
                <CardTitle className="text-steel-900">Data Analytics</CardTitle>
                <CardDescription className="text-steel-600">
                  Transform your raw data into actionable business intelligence
                </CardDescription>
              </CardHeader>
            </Card>
          </div>
        </div>
      </div>

      {/* Featured Apps Section */}
      <div className="py-20 bg-steel-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-steel-900 mb-4">
              Featured Applications
            </h2>
            <p className="text-xl text-steel-600">
              Ready-to-use business applications built with enterprise-grade security
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {apps.business.filter(app => app.featured).map((app) => (
              <Card key={app.id} className="bg-white hover:shadow-2xl transition-all border-2 hover:border-gold">
                <CardHeader>
                  <div className="w-12 h-12 bg-gold/10 rounded-lg flex items-center justify-center mb-4">
                    <span className="text-2xl">📊</span>
                  </div>
                  <CardTitle className="text-steel-900">{app.name}</CardTitle>
                  <CardDescription className="text-steel-600">
                    {app.description}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Button asChild className="w-full bg-steel-800 hover:bg-steel-700">
                    <Link href={app.href}>Launch App</Link>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="text-center mt-12">
            <Button size="lg" className="bg-gold hover:bg-gold-dark text-steel-900 font-bold">
              <Link href="/apps">View All Applications</Link>
            </Button>
          </div>
        </div>
      </div>

      {/* Why Choose Us Section */}
      <div className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl font-bold text-steel-900 mb-6">
                Why Choose <span className="text-gold">LRPDM</span>?
              </h2>
              <div className="space-y-6">
                <div className="flex gap-4">
                  <Shield className="h-8 w-8 text-gold flex-shrink-0" />
                  <div>
                    <h3 className="text-xl font-semibold text-steel-900 mb-2">
                      Enterprise Security
                    </h3>
                    <p className="text-steel-600">
                      Built with security-first architecture, featuring encrypted data storage, 
                      secure authentication, and regular security audits.
                    </p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <Zap className="h-8 w-8 text-gold flex-shrink-0" />
                  <div>
                    <h3 className="text-xl font-semibold text-steel-900 mb-2">
                      Lightning Fast
                    </h3>
                    <p className="text-steel-600">
                      Optimized for performance with modern technologies, ensuring your 
                      applications run at peak efficiency.
                    </p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <Users className="h-8 w-8 text-gold flex-shrink-0" />
                  <div>
                    <h3 className="text-xl font-semibold text-steel-900 mb-2">
                      Dedicated Support
                    </h3>
                    <p className="text-steel-600">
                      Direct access to our development team ensures your questions are 
                      answered and issues resolved quickly.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-gold/20 to-gold/10 rounded-2xl p-8 border-2 border-gold">
              <h3 className="text-2xl font-bold text-steel-900 mb-4">
                Ready to Transform Your Business?
              </h3>
              <p className="text-steel-700 mb-6">
                Join companies that have streamlined their operations with our custom solutions.
              </p>
              <div className="space-y-4">
                <Button className="w-full bg-steel-900 hover:bg-steel-800">
                  <Link href="/contact">Schedule Consultation</Link>
                </Button>
                <Button variant="outline" className="w-full border-steel-900 text-steel-900 hover:bg-steel-900 hover:text-white">
                  <Link href="/about">Learn More About Us</Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-steel-900 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <Image
                src="/logo-dark.webp"
                alt="LRPDM Logo"
                width={150}
                height={150}
                className="mb-4"
              />
              <p className="text-steel-400">
                Everything in life is a puzzle
              </p>
            </div>

            <div>
              <h4 className="text-gold font-semibold mb-4">Company</h4>
              <ul className="space-y-2">
                <li><Link href="/about" className="text-steel-400 hover:text-gold">About Us</Link></li>
                <li><Link href="/team" className="text-steel-400 hover:text-gold">Our Team</Link></li>
                <li><Link href="/services" className="text-steel-400 hover:text-gold">Services</Link></li>
                <li><Link href="/contact" className="text-steel-400 hover:text-gold">Contact</Link></li>
              </ul>
            </div>

            <div>
              <h4 className="text-gold font-semibold mb-4">Applications</h4>
              <ul className="space-y-2">
                <li><Link href="/apps/invoice" className="text-steel-400 hover:text-gold">Invoice Generator</Link></li>
                <li><Link href="/apps/project-management" className="text-steel-400 hover:text-gold">Project Management</Link></li>
                <li><Link href="/apps/crm" className="text-steel-400 hover:text-gold">CRM System</Link></li>
                <li><Link href="/apps" className="text-steel-400 hover:text-gold">View All Apps</Link></li>
              </ul>
            </div>

            <div>
              <h4 className="text-gold font-semibold mb-4">Legal</h4>
              <ul className="space-y-2">
                <li><Link href="/privacy" className="text-steel-400 hover:text-gold">Privacy Policy</Link></li>
                <li><Link href="/terms" className="text-steel-400 hover:text-gold">Terms of Service</Link></li>
              </ul>
            </div>
          </div>

          <div className="border-t border-steel-800 mt-8 pt-8 text-center text-steel-400">
            <p>© {new Date().getFullYear()} {company.name}. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}