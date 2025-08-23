import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import heroImage from "@/assets/hero-image.png";
import { 
  Shield, 
  Brain, 
  TrendingUp, 
  Smartphone, 
  CheckCircle, 
  Star,
  Users,
  Award,
  ArrowRight
} from "lucide-react";
import { Link } from "react-router-dom";

const Landing = () => {
  const features = [
    {
      icon: Brain,
      title: "AI-Powered Scoring",
      description: "Advanced algorithms analyze your gig income patterns and financial behavior"
    },
    {
      icon: Shield,
      title: "Privacy First",
      description: "Your data is encrypted and protected with bank-level security"
    },
    {
      icon: TrendingUp,
      title: "Smart Coaching",
      description: "Get personalized nudges to improve your financial health"
    },
    {
      icon: Smartphone,
      title: "Easy Integration",
      description: "Upload UPI statements or connect with payment platforms seamlessly"
    }
  ];

  const testimonials = [
    {
      name: "Rajesh Kumar",
      role: "Delivery Partner",
      comment: "NayaScore helped me understand my earning stability and get my first formal loan!",
      rating: 5
    },
    {
      name: "Priya Singh",
      role: "Freelance Designer",
      comment: "The AI coaching helped me plan my finances better. My score improved by 80 points!",
      rating: 5
    },
    {
      name: "Mohammed Ali",
      role: "Ride Share Driver",
      comment: "Finally, a credit score that understands gig workers like us.",
      rating: 5
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="h-8 w-8 bg-gradient-primary rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">N</span>
              </div>
              <span className="text-xl font-bold bg-gradient-primary bg-clip-text text-transparent">
                NayaScore
              </span>
            </div>
            <nav className="hidden md:flex items-center gap-6">
              <a href="#features" className="text-sm text-muted-foreground hover:text-foreground transition-smooth">
                Features
              </a>
              <a href="#how-it-works" className="text-sm text-muted-foreground hover:text-foreground transition-smooth">
                How it Works
              </a>
              <a href="#testimonials" className="text-sm text-muted-foreground hover:text-foreground transition-smooth">
                Reviews
              </a>
              <Button variant="fintech" size="sm" asChild>
                <Link to="/dashboard">Get Started</Link>
              </Button>
            </nav>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-br from-background via-muted/20 to-background">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <div className="space-y-4">
                <Badge variant="secondary" className="bg-gradient-hero text-white border-0">
                  🚀 AI-Powered Credit Scoring
                </Badge>
                <h1 className="text-4xl md:text-6xl font-bold leading-tight">
                  Credit Scoring for{" "}
                  <span className="bg-gradient-hero bg-clip-text text-transparent">
                    Gig Workers
                  </span>
                </h1>
                <p className="text-xl text-muted-foreground leading-relaxed">
                  Get fair credit scores that understand your irregular income. 
                  AI-powered insights, personalized coaching, and access to affordable loans.
                </p>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <Button variant="hero" size="xl" asChild>
                  <Link to="/dashboard">
                    Start Free Assessment
                    <ArrowRight className="h-5 w-5" />
                  </Link>
                </Button>
                <Button variant="outline" size="xl">
                  Watch Demo
                </Button>
              </div>

              <div className="flex items-center gap-8">
                <div className="text-center">
                  <div className="text-2xl font-bold text-primary">50K+</div>
                  <div className="text-sm text-muted-foreground">Users Scored</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-secondary">₹2Cr+</div>
                  <div className="text-sm text-muted-foreground">Loans Facilitated</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-accent">4.8★</div>
                  <div className="text-sm text-muted-foreground">User Rating</div>
                </div>
              </div>
            </div>

            <div className="relative">
              <div className="absolute inset-0 bg-gradient-hero rounded-3xl blur-3xl opacity-20"></div>
              <img 
                src={heroImage} 
                alt="Gig workers using NayaScore for credit scoring"
                className="relative rounded-3xl shadow-2xl w-full"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Built for the{" "}
              <span className="bg-gradient-primary bg-clip-text text-transparent">
                New Economy
              </span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Traditional credit scores don't work for gig workers. We use AI to understand your true financial picture.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="bg-gradient-card border-0 shadow-md hover:shadow-lg transition-smooth">
                <CardHeader className="text-center">
                  <div className="mx-auto h-12 w-12 bg-gradient-primary rounded-lg flex items-center justify-center mb-4">
                    <feature.icon className="h-6 w-6 text-white" />
                  </div>
                  <CardTitle className="text-lg">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground text-center">
                    {feature.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* How it Works */}
      <section id="how-it-works" className="py-20 bg-muted/20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">How NayaScore Works</h2>
            <p className="text-xl text-muted-foreground">Simple, transparent, and designed for you</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="text-center bg-gradient-card border-0 shadow-md">
              <CardHeader>
                <div className="mx-auto h-16 w-16 bg-gradient-primary rounded-full flex items-center justify-center mb-4">
                  <span className="text-2xl font-bold text-white">1</span>
                </div>
                <CardTitle>Upload Your Data</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Securely upload your UPI statements, payout records, or connect your accounts
                </p>
              </CardContent>
            </Card>

            <Card className="text-center bg-gradient-card border-0 shadow-md">
              <CardHeader>
                <div className="mx-auto h-16 w-16 bg-gradient-success rounded-full flex items-center justify-center mb-4">
                  <span className="text-2xl font-bold text-white">2</span>
                </div>
                <CardTitle>AI Analysis</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Our AI analyzes your income stability, expense patterns, and financial behavior
                </p>
              </CardContent>
            </Card>

            <Card className="text-center bg-gradient-card border-0 shadow-md">
              <CardHeader>
                <div className="mx-auto h-16 w-16 bg-accent rounded-full flex items-center justify-center mb-4">
                  <span className="text-2xl font-bold text-white">3</span>
                </div>
                <CardTitle>Get Your Score</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Receive your NayaScore with personalized insights and loan recommendations
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section id="testimonials" className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">What Our Users Say</h2>
            <p className="text-xl text-muted-foreground">Real stories from real gig workers</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className="bg-gradient-card border-0 shadow-md">
                <CardHeader>
                  <div className="flex items-center gap-1 mb-2">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="h-4 w-4 fill-accent text-accent" />
                    ))}
                  </div>
                  <CardTitle className="text-lg">{testimonial.name}</CardTitle>
                  <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                </CardHeader>
                <CardContent>
                  <p className="text-sm italic">"{testimonial.comment}"</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-hero">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Ready to Get Your Fair Credit Score?
          </h2>
          <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
            Join thousands of gig workers who've already improved their financial future with NayaScore
          </p>
          <Button variant="secondary" size="xl" asChild>
            <Link to="/dashboard">
              Get Started Free
              <ArrowRight className="h-5 w-5" />
            </Link>
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 border-t border-border">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="h-8 w-8 bg-gradient-primary rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-sm">N</span>
                </div>
                <span className="text-xl font-bold">NayaScore</span>
              </div>
              <p className="text-sm text-muted-foreground">
                Fair credit scoring for India's gig economy
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Product</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><a href="#" className="hover:text-foreground">Features</a></li>
                <li><a href="#" className="hover:text-foreground">Pricing</a></li>
                <li><a href="#" className="hover:text-foreground">API</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Company</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><a href="#" className="hover:text-foreground">About</a></li>
                <li><a href="#" className="hover:text-foreground">Careers</a></li>
                <li><a href="#" className="hover:text-foreground">Contact</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Legal</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><a href="#" className="hover:text-foreground">Privacy</a></li>
                <li><a href="#" className="hover:text-foreground">Terms</a></li>
                <li><a href="#" className="hover:text-foreground">Security</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-border mt-8 pt-8 text-center text-sm text-muted-foreground">
            © 2024 NayaScore. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Landing;