import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { config } from "@/lib/config";
import {
  Mail,
  Phone,
  MapPin,
  Clock,
  Send,
  MessageCircle,
  Handshake
} from "lucide-react";

export default function ContactPage() {
  const { company } = config;

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <div className="bg-gradient-to-br from-steel-900 to-steel-700 text-white py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-5xl font-bold mb-6">
              Contact <span className="text-gold">LRPDM</span>
            </h1>
            <p className="text-xl text-gray-200">
              Ready to transform your business operations? Let's discuss your project.
            </p>
          </div>
        </div>
      </div>

      {/* Contact Form & Info Section */}
      <div className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <div>
              <h2 className="text-3xl font-bold text-steel-900 mb-6">
                Let's Start a Conversation
              </h2>
              <p className="text-steel-600 mb-8">
                Whether you need a custom application, system integration, or strategic 
                consulting, we're here to help. Fill out the form and we'll get back to 
                you within 24 hours.
              </p>

              <form className="space-y-6">
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="firstName" className="text-steel-700">
                      First Name *
                    </Label>
                    <Input 
                      id="firstName" 
                      type="text" 
                      required 
                      className="mt-1 border-steel-300 focus:border-gold focus:ring-gold/20"
                    />
                  </div>
                  <div>
                    <Label htmlFor="lastName" className="text-steel-700">
                      Last Name *
                    </Label>
                    <Input 
                      id="lastName" 
                      type="text" 
                      required 
                      className="mt-1 border-steel-300 focus:border-gold focus:ring-gold/20"
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="email" className="text-steel-700">
                    Email Address *
                  </Label>
                  <Input 
                    id="email" 
                    type="email" 
                    required 
                    className="mt-1 border-steel-300 focus:border-gold focus:ring-gold/20"
                  />
                </div>

                <div>
                  <Label htmlFor="company" className="text-steel-700">
                    Company Name
                  </Label>
                  <Input 
                    id="company" 
                    type="text" 
                    className="mt-1 border-steel-300 focus:border-gold focus:ring-gold/20"
                  />
                </div>

                <div>
                  <Label htmlFor="phone" className="text-steel-700">
                    Phone Number
                  </Label>
                  <Input 
                    id="phone" 
                    type="tel" 
                    className="mt-1 border-steel-300 focus:border-gold focus:ring-gold/20"
                  />
                </div>

                <div>
                  <Label htmlFor="service" className="text-steel-700">
                    Service Interest
                  </Label>
                  <select 
                    id="service"
                    className="w-full mt-1 px-3 py-2 border border-steel-300 rounded-md focus:border-gold focus:ring-2 focus:ring-gold/20 bg-white"
                  >
                    <option value="">Select a service...</option>
                    <option value="custom-app">Custom Application Development</option>
                    <option value="integration">System Integration</option>
                    <option value="automation">Workflow Automation</option>
                    <option value="consulting">Strategic Consulting</option>
                    <option value="data-analytics">Data Analytics</option>
                    <option value="other">Other</option>
                  </select>
                </div>

                <div>
                  <Label htmlFor="budget" className="text-steel-700">
                    Project Budget Range
                  </Label>
                  <select 
                    id="budget"
                    className="w-full mt-1 px-3 py-2 border border-steel-300 rounded-md focus:border-gold focus:ring-2 focus:ring-gold/20 bg-white"
                  >
                    <option value="">Select budget range...</option>
                    <option value="under-10k">Under $10,000</option>
                    <option value="10k-25k">$10,000 - $25,000</option>
                    <option value="25k-50k">$25,000 - $50,000</option>
                    <option value="50k-100k">$50,000 - $100,000</option>
                    <option value="over-100k">Over $100,000</option>
                  </select>
                </div>

                <div>
                  <Label htmlFor="message" className="text-steel-700">
                    Project Details *
                  </Label>
                  <Textarea 
                    id="message" 
                    required 
                    rows={4}
                    placeholder="Tell us about your project, challenges you're facing, or goals you want to achieve..."
                    className="mt-1 border-steel-300 focus:border-gold focus:ring-gold/20"
                  />
                </div>

                <Button 
                  type="submit" 
                  size="lg" 
                  className="w-full bg-gold hover:bg-gold-dark text-steel-900 font-bold"
                >
                  <Send className="h-5 w-5 mr-2" />
                  Send Message
                </Button>
              </form>
            </div>

            {/* Contact Information */}
            <div className="space-y-8">
              <div>
                <h2 className="text-3xl font-bold text-steel-900 mb-6">
                  Get in Touch
                </h2>
                <p className="text-steel-600">
                  We're always ready to tackle your next challenge. Reach out through 
                  any of these channels and let's start building something amazing together.
                </p>
              </div>

              {/* Contact Cards */}
              <div className="space-y-4">
                <Card className="border-2 hover:border-gold transition-all">
                  <CardHeader className="pb-3">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-gold/10 rounded-lg flex items-center justify-center">
                        <Mail className="h-5 w-5 text-gold" />
                      </div>
                      <CardTitle className="text-steel-900">Email Us</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-steel-600">
                      <a href={`mailto:${company.email}`} className="text-gold hover:underline">
                        {company.email}
                      </a>
                    </p>
                    <p className="text-sm text-steel-500 mt-1">
                      We typically respond within 4 hours
                    </p>
                  </CardContent>
                </Card>

                <Card className="border-2 hover:border-gold transition-all">
                  <CardHeader className="pb-3">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-gold/10 rounded-lg flex items-center justify-center">
                        <Phone className="h-5 w-5 text-gold" />
                      </div>
                      <CardTitle className="text-steel-900">Call Us</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-steel-600">
                      <a href={`tel:${company.phone}`} className="text-gold hover:underline">
                        {company.phone}
                      </a>
                    </p>
                    <p className="text-sm text-steel-500 mt-1">
                      Monday - Friday, 8 AM - 6 PM PST
                    </p>
                  </CardContent>
                </Card>

                <Card className="border-2 hover:border-gold transition-all">
                  <CardHeader className="pb-3">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-gold/10 rounded-lg flex items-center justify-center">
                        <MapPin className="h-5 w-5 text-gold" />
                      </div>
                      <CardTitle className="text-steel-900">Location</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-steel-600">{company.address}</p>
                    <p className="text-sm text-steel-500 mt-1">
                      Serving clients nationwide
                    </p>
                  </CardContent>
                </Card>
              </div>

              {/* Business Hours */}
              <Card className="bg-gradient-to-br from-gold/10 to-gold/5 border-2 border-gold">
                <CardHeader>
                  <div className="flex items-center gap-3">
                    <Clock className="h-6 w-6 text-gold" />
                    <CardTitle className="text-steel-900">Business Hours</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-steel-600">Monday - Friday</span>
                      <span className="text-steel-900 font-medium">8:00 AM - 6:00 PM</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-steel-600">Saturday</span>
                      <span className="text-steel-900 font-medium">10:00 AM - 2:00 PM</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-steel-600">Sunday</span>
                      <span className="text-steel-900 font-medium">Closed</span>
                    </div>
                  </div>
                  <p className="text-sm text-steel-600 mt-4">
                    Emergency support available 24/7 for enterprise clients
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>

      {/* Process Section */}
      <div className="py-20 bg-steel-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-steel-900 mb-4">
              Our Process
            </h2>
            <p className="text-xl text-steel-600 max-w-3xl mx-auto">
              From initial consultation to project delivery, here's how we work together
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <Card className="border-2 hover:border-gold transition-all text-center">
              <CardHeader>
                <div className="w-16 h-16 bg-gold/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <MessageCircle className="h-8 w-8 text-gold" />
                </div>
                <CardTitle className="text-steel-900">1. Discovery Call</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-steel-600">
                  We start with a detailed conversation about your challenges, goals, 
                  and requirements to understand exactly what you need.
                </p>
              </CardContent>
            </Card>

            <Card className="border-2 hover:border-gold transition-all text-center">
              <CardHeader>
                <div className="w-16 h-16 bg-gold/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Handshake className="h-8 w-8 text-gold" />
                </div>
                <CardTitle className="text-steel-900">2. Proposal & Planning</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-steel-600">
                  We create a detailed proposal with timeline, deliverables, and costs. 
                  Once approved, we develop a comprehensive project plan.
                </p>
              </CardContent>
            </Card>

            <Card className="border-2 hover:border-gold transition-all text-center">
              <CardHeader>
                <div className="w-16 h-16 bg-gold/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Send className="h-8 w-8 text-gold" />
                </div>
                <CardTitle className="text-steel-900">3. Development & Delivery</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-steel-600">
                  We build your solution with regular check-ins and updates, ensuring 
                  everything meets your expectations before final delivery.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="py-20 bg-steel-900 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold mb-6">
            Ready to Get Started?
          </h2>
          <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
            Every great project starts with a conversation. Let's discuss how we can 
            help transform your business operations.
          </p>
          <Button size="lg" className="bg-gold hover:bg-gold-dark text-steel-900 font-bold">
            Schedule a Free Consultation
          </Button>
        </div>
      </div>
    </div>
  );
}