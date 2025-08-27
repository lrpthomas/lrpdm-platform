import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { config } from "@/lib/config";

export default function AppsPage() {
  const { apps } = config;
  const allApps = [...apps.core, ...apps.business, ...apps.specialized];
  
  return (
    <div className="min-h-screen bg-slate-50">
      <div className="container mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-slate-900 mb-4">
            Business Applications
          </h1>
          <p className="text-xl text-slate-600 max-w-2xl mx-auto">
            Streamline your operations with our comprehensive suite of business applications
          </p>
        </div>

        {/* Core Apps */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold mb-6 text-slate-800">Core Platform</h2>
          <div className="grid md:grid-cols-2 gap-6">
            {apps.core.map((app) => (
              <Card key={app.id} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <span className="text-2xl">🏠</span>
                    {app.name}
                  </CardTitle>
                  <CardDescription>{app.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <Button asChild className="w-full">
                    <Link href={app.href}>Open {app.name}</Link>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Business Apps */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold mb-6 text-slate-800">Business Applications</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {apps.business.map((app) => (
              <Card key={app.id} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <span className="text-2xl">💼</span>
                    {app.name}
                  </CardTitle>
                  <CardDescription>{app.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <Button asChild className="w-full">
                    <Link href={app.href}>Open {app.name}</Link>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Specialized Apps */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold mb-6 text-slate-800">Specialized Applications</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {apps.specialized.map((app) => (
              <Card key={app.id} className="hover:shadow-lg transition-shadow border-amber-200">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <span className="text-2xl">⭐</span>
                    {app.name}
                  </CardTitle>
                  <CardDescription>
                    {app.description}
                    <span className="block text-xs text-amber-600 mt-1">
                      Requires {app.requiredPlan} plan
                    </span>
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Button asChild className="w-full">
                    <Link href={app.href}>Open {app.name}</Link>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* CTA Section */}
        <div className="text-center bg-white rounded-lg p-8 shadow-lg">
          <h3 className="text-2xl font-bold mb-4">Need a Custom Application?</h3>
          <p className="text-slate-600 mb-6 max-w-2xl mx-auto">
            We build custom business applications tailored to your specific needs. 
            From workflow automation to specialized tools, we solve complex integration challenges.
          </p>
          <Button asChild size="lg">
            <Link href="/contact">Get Started</Link>
          </Button>
        </div>
      </div>
    </div>
  );
}