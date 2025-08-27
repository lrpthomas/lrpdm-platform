import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { config } from "@/lib/config";
import { 
  FileText,
  CheckSquare,
  Users,
  MessageSquare,
  Share2,
  Video,
  Share,
  BarChart3,
  Package,
  Calendar,
  ShoppingCart,
  Calculator,
  Star,
  ArrowRight,
  Zap
} from "lucide-react";

const iconMap = {
  FileText,
  CheckSquare,
  Users,
  MessageSquare,
  Share2,
  Video,
  Share,
  BarChart3,
  Package,
  Calendar,
  ShoppingCart,
  Calculator
};

export default function AppsPage() {
  const { apps } = config;
  
  // Group apps by category
  const appsByCategory = apps.business.reduce((acc, app) => {
    if (!acc[app.category]) {
      acc[app.category] = [];
    }
    acc[app.category].push(app);
    return acc;
  }, {} as Record<string, typeof apps.business>);

  const featuredApps = apps.business.filter(app => app.featured);

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <div className="bg-gradient-to-br from-steel-900 to-steel-700 text-white py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-5xl font-bold mb-6">
              Business <span className="text-gold">Applications</span>
            </h1>
            <p className="text-xl text-gray-200 mb-8">
              Comprehensive suite of business tools designed to streamline your operations
            </p>
            <div className="flex items-center justify-center gap-2 text-sm text-gray-300">
              <Zap className="h-4 w-4" />
              <span>Enterprise-grade security • 99.9% uptime • 24/7 support</span>
            </div>
          </div>
        </div>
      </div>

      {/* Featured Apps */}
      <div className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-steel-900 mb-4">
              Featured Applications
            </h2>
            <p className="text-xl text-steel-600 max-w-3xl mx-auto">
              Our most popular business solutions, trusted by companies worldwide
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
            {featuredApps.map((app) => {
              const IconComponent = iconMap[app.icon as keyof typeof iconMap] || FileText;
              return (
                <Card key={app.id} className="border-2 hover:border-gold transition-all hover:shadow-xl bg-gradient-to-br from-white to-gold/5">
                  <CardHeader>
                    <div className="flex items-start justify-between mb-4">
                      <div className="w-14 h-14 bg-gold/10 rounded-xl flex items-center justify-center">
                        <IconComponent className="h-7 w-7 text-gold" />
                      </div>
                      <Badge variant="secondary" className="bg-gold/20 text-gold border-gold/30">
                        <Star className="h-3 w-3 mr-1" />
                        Featured
                      </Badge>
                    </div>
                    <CardTitle className="text-steel-900 text-xl">{app.name}</CardTitle>
                    <CardDescription className="text-steel-600">
                      {app.description}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Button asChild className="w-full bg-gold hover:bg-gold-dark text-steel-900 font-bold">
                      <Link href={app.href}>
                        Launch App
                        <ArrowRight className="h-4 w-4 ml-2" />
                      </Link>
                    </Button>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </div>

      {/* All Apps by Category */}
      <div className="py-20 bg-steel-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-steel-900 mb-4">
              All Applications
            </h2>
            <p className="text-xl text-steel-600">
              Explore our complete suite of business solutions
            </p>
          </div>

          <div className="space-y-12">
            {Object.entries(appsByCategory).map(([category, categoryApps]) => (
              <div key={category}>
                <div className="flex items-center gap-3 mb-6">
                  <h3 className="text-2xl font-bold text-steel-900">{category}</h3>
                  <Badge variant="outline" className="text-steel-600">
                    {categoryApps.length} apps
                  </Badge>
                </div>
                
                <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                  {categoryApps.map((app) => {
                    const IconComponent = iconMap[app.icon as keyof typeof iconMap] || FileText;
                    return (
                      <Card key={app.id} className="border-2 hover:border-gold transition-all hover:shadow-lg">
                        <CardHeader className="pb-3">
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-gold/10 rounded-lg flex items-center justify-center">
                              <IconComponent className="h-5 w-5 text-gold" />
                            </div>
                            <div className="flex-1 min-w-0">
                              <CardTitle className="text-steel-900 text-lg truncate">
                                {app.name}
                              </CardTitle>
                              {app.featured && (
                                <Badge variant="secondary" size="sm" className="bg-gold/20 text-gold border-gold/30 mt-1">
                                  Featured
                                </Badge>
                              )}
                            </div>
                          </div>
                        </CardHeader>
                        <CardContent className="pt-0">
                          <CardDescription className="text-steel-600 text-sm mb-4 line-clamp-2">
                            {app.description}
                          </CardDescription>
                          <Button asChild size="sm" className="w-full bg-steel-800 hover:bg-steel-700">
                            <Link href={app.href}>Launch</Link>
                          </Button>
                        </CardContent>
                      </Card>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-steel-900 mb-4">
              Why Choose LRPDM Applications?
            </h2>
            <p className="text-xl text-steel-600">
              Built with enterprise standards and user experience in mind
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-gold/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Zap className="h-8 w-8 text-gold" />
              </div>
              <h3 className="text-xl font-semibold text-steel-900 mb-2">Lightning Fast</h3>
              <p className="text-steel-600">
                Optimized for performance with modern technologies and CDN delivery
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-gold/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="h-8 w-8 text-gold" />
              </div>
              <h3 className="text-xl font-semibold text-steel-900 mb-2">User-Friendly</h3>
              <p className="text-steel-600">
                Intuitive interfaces designed for minimal learning curve and maximum productivity
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-gold/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Share2 className="h-8 w-8 text-gold" />
              </div>
              <h3 className="text-xl font-semibold text-steel-900 mb-2">Integrated</h3>
              <p className="text-steel-600">
                All applications work seamlessly together, sharing data and workflows
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-gold/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <CheckSquare className="h-8 w-8 text-gold" />
              </div>
              <h3 className="text-xl font-semibold text-steel-900 mb-2">Reliable</h3>
              <p className="text-steel-600">
                99.9% uptime guarantee with automatic backups and disaster recovery
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="py-20 bg-steel-900 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold mb-6">
            Ready to Transform Your Business?
          </h2>
          <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
            Start with our featured applications or contact us for a custom solution 
            tailored to your specific needs.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-gold hover:bg-gold-dark text-steel-900 font-bold">
              <Link href="/contact">Get Started Today</Link>
            </Button>
            <Button size="lg" variant="outline" className="border-gold text-gold hover:bg-gold hover:text-steel-900">
              <Link href="/about">Learn More</Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}