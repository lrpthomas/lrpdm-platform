import Image from "next/image";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { config } from "@/lib/config";
import {
  Mail,
  Linkedin,
  Code2,
  Target,
  Lightbulb,
  Users,
  Award,
  Coffee
} from "lucide-react";

export default function TeamPage() {
  const { company } = config;

  const teamMembers = [
    {
      id: "cody-thomas",
      name: "Cody Ryan Thomas",
      role: "Founder & Lead Developer",
      bio: "With a passion for solving complex puzzles and a hands-on approach to leadership, Cody founded LRPDM with the philosophy that the harder the puzzle, the more rewarding the solution. He specializes in creating seamless integrations between systems and leads by example, working alongside the team to tackle technical challenges.",
      image: "/team/cody-thomas.jpg", // Placeholder - would need actual image
      skills: ["Full-Stack Development", "System Integration", "Team Leadership", "Solution Architecture"],
      contact: {
        email: "cody@lrpdm.com",
        linkedin: "https://linkedin.com/in/cody-thomas"
      },
      achievements: [
        "Founded LRPDM with grassroots approach",
        "Led 50+ successful integration projects", 
        "Specialized in field-to-office connectivity solutions"
      ]
    }
  ];

  const values = [
    {
      icon: Target,
      title: "Problem-First Thinking",
      description: "We approach every challenge by deeply understanding the problem before jumping to solutions."
    },
    {
      icon: Code2,
      title: "Technical Excellence", 
      description: "We maintain the highest standards of code quality and system architecture."
    },
    {
      icon: Users,
      title: "Collaborative Leadership",
      description: "True leadership means sharing in both the puzzles and the solutions together."
    },
    {
      icon: Lightbulb,
      title: "Innovation Focus",
      description: "We combine cutting-edge technology with practical, user-centric design."
    }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <div className="bg-gradient-to-br from-steel-900 to-steel-700 text-white py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-5xl font-bold mb-6">
              Meet the <span className="text-gold">LRPDM</span> Team
            </h1>
            <p className="text-xl text-gray-200">
              Passionate problem solvers dedicated to transforming business operations
            </p>
          </div>
        </div>
      </div>

      {/* Team Members */}
      <div className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-steel-900 mb-4">
              Leadership Team
            </h2>
            <p className="text-xl text-steel-600 max-w-3xl mx-auto">
              Meet the people behind LRPDM's innovative solutions and client-focused approach
            </p>
          </div>

          <div className="max-w-4xl mx-auto">
            {teamMembers.map((member) => (
              <Card key={member.id} className="border-2 hover:border-gold transition-all shadow-lg">
                <div className="grid lg:grid-cols-3 gap-8 p-8">
                  {/* Profile Image */}
                  <div className="flex flex-col items-center text-center">
                    <div className="w-48 h-48 bg-gradient-to-br from-gold/20 to-steel/10 rounded-full flex items-center justify-center mb-6 border-4 border-gold/30">
                      <div className="w-40 h-40 bg-steel-100 rounded-full flex items-center justify-center">
                        <Code2 className="h-16 w-16 text-gold" />
                      </div>
                    </div>
                    
                    <h3 className="text-2xl font-bold text-steel-900 mb-2">
                      {member.name}
                    </h3>
                    <p className="text-gold font-semibold text-lg mb-4">
                      {member.role}
                    </p>
                    
                    <div className="flex gap-3">
                      <Button size="sm" variant="outline" className="border-gold text-gold hover:bg-gold hover:text-steel-900">
                        <Mail className="h-4 w-4 mr-2" />
                        Email
                      </Button>
                      <Button size="sm" variant="outline" className="border-steel-400 text-steel-600 hover:bg-steel-600 hover:text-white">
                        <Linkedin className="h-4 w-4 mr-2" />
                        LinkedIn
                      </Button>
                    </div>
                  </div>

                  {/* Bio and Details */}
                  <div className="lg:col-span-2 space-y-6">
                    <div>
                      <h4 className="text-xl font-semibold text-steel-900 mb-3">About</h4>
                      <p className="text-steel-600 leading-relaxed">
                        {member.bio}
                      </p>
                    </div>

                    <div>
                      <h4 className="text-xl font-semibold text-steel-900 mb-3">Core Skills</h4>
                      <div className="flex flex-wrap gap-2">
                        {member.skills.map((skill, index) => (
                          <span 
                            key={index}
                            className="px-3 py-1 bg-gold/10 text-gold border border-gold/30 rounded-full text-sm font-medium"
                          >
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div>
                      <h4 className="text-xl font-semibold text-steel-900 mb-3">Key Achievements</h4>
                      <ul className="space-y-2">
                        {member.achievements.map((achievement, index) => (
                          <li key={index} className="flex items-start gap-2">
                            <Award className="h-5 w-5 text-gold flex-shrink-0 mt-0.5" />
                            <span className="text-steel-600">{achievement}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </div>

      {/* Team Values */}
      <div className="py-20 bg-steel-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-steel-900 mb-4">
              Our Team Values
            </h2>
            <p className="text-xl text-steel-600 max-w-3xl mx-auto">
              The principles that guide how we work together and serve our clients
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value, index) => (
              <Card key={index} className="border-2 hover:border-gold transition-all text-center p-6">
                <CardHeader className="pb-4">
                  <div className="w-16 h-16 bg-gold/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <value.icon className="h-8 w-8 text-gold" />
                  </div>
                  <h3 className="text-xl font-semibold text-steel-900">
                    {value.title}
                  </h3>
                </CardHeader>
                <CardContent>
                  <p className="text-steel-600">
                    {value.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>

      {/* Company Culture */}
      <div className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold text-steel-900 mb-4">
                Our Culture
              </h2>
              <p className="text-xl text-steel-600">
                What makes LRPDM a great place to work and partner with
              </p>
            </div>

            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div>
                <h3 className="text-2xl font-bold text-steel-900 mb-6">
                  Puzzle-Solving Mindset
                </h3>
                <div className="space-y-4 text-steel-600">
                  <p>
                    At LRPDM, we believe that everything in life is a puzzle. This philosophy 
                    shapes how we approach challenges, collaborate as a team, and deliver 
                    solutions to our clients.
                  </p>
                  <p>
                    The harder the puzzle, the more rewarding the solution. This drives us 
                    to embrace complex projects that others might shy away from, knowing 
                    that the most challenging problems often lead to the most innovative 
                    and impactful solutions.
                  </p>
                  <p>
                    We foster an environment where every team member is encouraged to think 
                    creatively, share ideas openly, and contribute to solving the puzzles 
                    that matter most to our clients.
                  </p>
                </div>
              </div>

              <div className="bg-gradient-to-br from-gold/10 to-gold/5 rounded-2xl p-8 border-2 border-gold">
                <h3 className="text-2xl font-bold text-steel-900 mb-6">
                  Join Our Team
                </h3>
                <p className="text-steel-700 mb-6">
                  We're always looking for talented individuals who share our passion 
                  for problem-solving and client success.
                </p>
                <div className="space-y-3 mb-6">
                  <div className="flex items-center gap-3">
                    <Coffee className="h-5 w-5 text-gold" />
                    <span className="text-steel-700">Flexible work environment</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Lightbulb className="h-5 w-5 text-gold" />
                    <span className="text-steel-700">Continuous learning opportunities</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Users className="h-5 w-5 text-gold" />
                    <span className="text-steel-700">Collaborative team culture</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Target className="h-5 w-5 text-gold" />
                    <span className="text-steel-700">Meaningful, challenging projects</span>
                  </div>
                </div>
                <Button className="w-full bg-steel-900 hover:bg-steel-800">
                  <Link href="/contact">View Open Positions</Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="py-20 bg-steel-900 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold mb-6">
            Ready to Work with Our Team?
          </h2>
          <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
            Experience the LRPDM difference. Let our passionate problem-solvers 
            transform your business challenges into elegant solutions.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-gold hover:bg-gold-dark text-steel-900 font-bold">
              <Link href="/contact">Start Your Project</Link>
            </Button>
            <Button size="lg" variant="outline" className="border-gold text-gold hover:bg-gold hover:text-steel-900">
              <Link href="/about">Learn More About Us</Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}