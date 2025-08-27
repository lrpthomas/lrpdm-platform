import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { config } from "@/lib/config";

export default function Home() {
  const { company, apps } = config;
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      <div className="container mx-auto px-4 py-16">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold text-slate-900 mb-6">
            {company.name}
          </h1>
          <p className="text-xl text-slate-600 mb-8 max-w-3xl mx-auto">
            {company.tagline}
          </p>
          <div className="flex gap-4 justify-center">
            <Button asChild size="lg">
              <Link href="/auth/signin">Get Started</Link>
            </Button>
            <Button variant="outline" size="lg" asChild>
              <Link href="/apps">View Apps</Link>
            </Button>
          </div>
        </div>

        {/* Featured Apps */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-center mb-8">Featured Applications</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {apps.business.filter(app => app.featured).map((app) => (
              <Card key={app.id} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <span className="text-2xl">📊</span>
                    {app.name}
                  </CardTitle>
                  <CardDescription>{app.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <Button asChild className="w-full">
                    <Link href={app.href}>Open App</Link>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Services Section */}
        <div className="bg-white rounded-lg p-8 shadow-lg">
          <h2 className="text-3xl font-bold text-center mb-8">Our Services</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="text-4xl mb-4">🔧</div>
              <h3 className="text-xl font-semibold mb-2">Custom Applications</h3>
              <p className="text-slate-600">Built-to-order web and mobile apps that solve your specific business needs</p>
            </div>
            <div className="text-center">
              <div className="text-4xl mb-4">⚡</div>
              <h3 className="text-xl font-semibold mb-2">Workflow Automation</h3>
              <p className="text-slate-600">Turn repetitive manual tasks into automated processes that save time and reduce errors</p>
            </div>
            <div className="text-center">
              <div className="text-4xl mb-4">🎯</div>
              <h3 className="text-xl font-semibold mb-2">Strategic Consulting</h3>
              <p className="text-slate-600">Expert guidance on choosing and implementing the right technology for your business</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
