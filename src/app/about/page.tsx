import Image from "next/image";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { config } from "@/lib/config";
import { 
  Mountain,
  Cpu,
  Puzzle,
  Target,
  Users,
  Lightbulb
} from "lucide-react";

export default function AboutPage() {
  const { company } = config;

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <div className="bg-gradient-to-br from-steel-900 to-steel-700 text-white py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-5xl font-bold mb-6">
              About <span className="text-gold">LRPDM</span>
            </h1>
            <p className="text-xl text-gray-200">
              {company.tagline}
            </p>
          </div>
        </div>
      </div>

      {/* Company Story */}
      <div className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl font-bold text-steel-900 mb-6">
                Our Story
              </h2>
              <div className="space-y-4 text-steel-600">
                <p>
                  Founded by Cody Ryan Thomas, LRP Data & Management, Inc. was born from a 
                  simple yet powerful philosophy: Everything in life is a puzzle - and the 
                  harder the puzzle, the more rewarding the solution.
                </p>
                <p>
                  As Founder & Lead Developer, we tackle complex integrations while staying 
                  hands-on with the technical work. When challenges arise, we solve them 
                  together - because true leadership means sharing in both the puzzles and 
                  the solutions.
                </p>
                <p>
                  We specialize in creating seamless integrations between systems, whether 
                  that's connecting field operations to back offices, bridging legacy platforms 
                  with modern solutions, or unifying disparate data sources. Our end-to-end 
                  solutions prioritize user experience while maintaining operational efficiency.
                </p>
              </div>
            </div>
            <div className="flex justify-center">
              <Image
                src="/logo-light.webp"
                alt="LRPDM Logo"
                width={400}
                height={400}
                className="rounded-lg shadow-2xl"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Core Values */}
      <div className="py-20 bg-steel-50">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center text-steel-900 mb-12">
            Our Core Values
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <Card className="border-2 hover:border-gold transition-all">
              <CardHeader>
                <Puzzle className="h-12 w-12 text-gold mb-4" />
                <CardTitle>Problem Solving</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-steel-600">
                  We embrace complex challenges as opportunities to create innovative, 
                  elegant solutions that transform how teams work.
                </p>
              </CardContent>
            </Card>

            <Card className="border-2 hover:border-gold transition-all">
              <CardHeader>
                <Mountain className="h-12 w-12 text-gold mb-4" />
                <CardTitle>Grassroots Approach</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-steel-600">
                  Solutions are built from the ground up and tailored to each 
                  organization's unique challenges and requirements.
                </p>
              </CardContent>
            </Card>

            <Card className="border-2 hover:border-gold transition-all">
              <CardHeader>
                <Cpu className="h-12 w-12 text-gold mb-4" />
                <CardTitle>Technical Excellence</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-steel-600">
                  We stay hands-on with the technical work, ensuring every solution 
                  meets the highest standards of quality and performance.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      {/* What We Do */}
      <div className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center text-steel-900 mb-12">
            What We Do
          </h2>
          <div className="grid lg:grid-cols-2 gap-12">
            <div>
              <h3 className="text-2xl font-bold text-steel-900 mb-4">
                System Integration Excellence
              </h3>
              <p className="text-steel-600 mb-6">
                We bridge operational gaps and streamline processes by creating seamless 
                integrations between disparate systems. From enabling real-time field 
                updates to automating complex workflows, integration challenges become 
                opportunities to transform how your teams work.
              </p>
              <ul className="space-y-3 text-steel-600">
                <li className="flex items-start gap-2">
                  <Target className="h-5 w-5 text-gold flex-shrink-0 mt-0.5" />
                  <span>Connect field operations to back offices</span>
                </li>
                <li className="flex items-start gap-2">
                  <Target className="h-5 w-5 text-gold flex-shrink-0 mt-0.5" />
                  <span>Bridge legacy platforms with modern solutions</span>
                </li>
                <li className="flex items-start gap-2">
                  <Target className="h-5 w-5 text-gold flex-shrink-0 mt-0.5" />
                  <span>Unify disparate data sources</span>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="text-2xl font-bold text-steel-900 mb-4">
                User-Centric Design
              </h3>
              <p className="text-steel-600 mb-6">
                By combining problem-solving passion with user-centric design, we help 
                companies create solutions that people actually want to use. Our approach 
                ensures that technology enhances rather than complicates your workflows.
              </p>
              <ul className="space-y-3 text-steel-600">
                <li className="flex items-start gap-2">
                  <Users className="h-5 w-5 text-gold flex-shrink-0 mt-0.5" />
                  <span>Intuitive interfaces that require minimal training</span>
                </li>
                <li className="flex items-start gap-2">
                  <Users className="h-5 w-5 text-gold flex-shrink-0 mt-0.5" />
                  <span>Mobile-first design for field workers</span>
                </li>
                <li className="flex items-start gap-2">
                  <Users className="h-5 w-5 text-gold flex-shrink-0 mt-0.5" />
                  <span>Accessibility and inclusivity at the core</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Mission Statement */}
      <div className="py-20 bg-gradient-to-br from-gold/10 to-gold/5">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <Lightbulb className="h-16 w-16 text-gold mx-auto mb-6" />
            <h2 className="text-3xl font-bold text-steel-900 mb-6">
              Our Mission
            </h2>
            <p className="text-xl text-steel-700 leading-relaxed">
              To transform business operations by solving complex integration challenges 
              with innovative, user-centric solutions. We believe that by combining 
              technical excellence with a grassroots approach, we can help organizations 
              bridge operational gaps and unlock their full potential.
            </p>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="py-20 bg-steel-900 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold mb-6">
            Ready to Solve Your Puzzle?
          </h2>
          <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
            Let's work together to transform your complex challenges into elegant solutions.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-gold hover:bg-gold-dark text-steel-900 font-bold">
              <Link href="/contact">Get Started</Link>
            </Button>
            <Button size="lg" variant="outline" className="border-gold text-gold hover:bg-gold hover:text-steel-900">
              <Link href="/services">View Our Services</Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}