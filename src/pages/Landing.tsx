import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import ThemeToggle from "@/components/Theme/ThemeToggle";
import heroImage from "@/assets/hero-image.png";



import {
  Shield,
  Brain,
  TrendingUp,
  Smartphone,
  Star,
  ArrowRight,
  Bot,
  Workflow,
  FileText,
  Lock,
  Zap,
  LineChart,
  Github   // 👈 add this
} from "lucide-react";

/* ------------------------- Modal (no extra deps) ------------------------- */
const Modal = ({ open, onClose, children, title }) => {
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
        aria-hidden="true"
      />
      <div className="relative z-[101] w-full max-w-2xl rounded-2xl border border-border bg-card shadow-2xl">
        <div className="flex items-center justify-between border-b border-border p-4">
          <h3 className="text-lg font-semibold">{title}</h3>
          <button
            onClick={onClose}
            aria-label="Close"
            className="rounded-md px-2 py-1 text-muted-foreground hover:bg-muted/60"
          >
            ✕
          </button>
        </div>
        <div className="p-4">{children}</div>
      </div>
    </div>
  );
};

/* ----------------------- Agent demo (safe async run) --------------------- */
const AgentDemo = ({ onDone }) => {
  const [running, setRunning] = useState(false);
  const [stepIndex, setStepIndex] = useState(0);
  const [progress, setProgress] = useState(0);
  const [logs, setLogs] = useState([]);
  const mounted = useRef(true);
  const abortRef = useRef(false);

  const steps = [
    { label: "Parsing UPI statement (PDF/CSV)", ms: 900 },
    { label: "Extracting transactions & merchants", ms: 1000 },
    { label: "Detecting income streams & volatility", ms: 1200 },
    { label: "Building cashflow model", ms: 900 },
    { label: "Scoring affordability & risk", ms: 1100 },
    { label: "Generating insights & nudges", ms: 900 },
    { label: "Matching lenders & offers", ms: 900 },
  ];

  useEffect(() => {
    mounted.current = true;
    return () => {
      mounted.current = false;
      abortRef.current = true;
    };
  }, []);

  const safeSet = (fn) => {
    if (mounted.current) fn();
  };

  const sleep = (ms) => new Promise((res) => setTimeout(res, ms));

  const start = async () => {
    if (running) return;
    abortRef.current = false;
    safeSet(() => {
      setRunning(true);
      setStepIndex(0);
      setProgress(0);
      setLogs([{ t: Date.now(), m: "Agent started." }]);
    });

    for (let i = 0; i < steps.length; i++) {
      if (abortRef.current) return stop(true);
      const step = steps[i];

      safeSet(() => {
        setStepIndex(i);
        setLogs((l) => [...l, { t: Date.now(), m: `➡️ ${step.label}` }]);
      });

      const chunks = Math.max(1, Math.floor(step.ms / 100));
      for (let c = 1; c <= chunks; c++) {
        if (abortRef.current) return stop(true);
        await sleep(step.ms / chunks);
        // keep progress strictly < 100 until the end
        const pct = Math.min(99, Math.round(((i + c / chunks) / steps.length) * 100));
        safeSet(() => setProgress(pct));
      }

      safeSet(() =>
        setLogs((l) => [...l, { t: Date.now(), m: `✅ Completed: ${step.label}` }])
      );
    }

    // Finalize
    if (!abortRef.current) {
      safeSet(() => {
        setProgress(100);
        setRunning(false);
        setLogs((l) => [
          ...l,
          { t: Date.now(), m: "🎉 Agent run finished." },
          { t: Date.now(), m: "Score: 726  | Monthly surplus: ₹11,480" },
          { t: Date.now(), m: "Recommended: Micro-loan 25–50k @ 16–18% APR" },
        ]);
      });
      onDone?.();
    }
  };

  const stop = (silent = false) => {
    abortRef.current = true;
    if (silent) return;
    safeSet(() => {
      setRunning(false);
      setLogs((l) => [...l, { t: Date.now(), m: "Agent stopped." }]);
    });
  };

  return (
    <div className="space-y-4">
      {/* Progress */}
      <div className="w-full overflow-hidden rounded-full bg-muted">
        <div
          className="h-3 bg-gradient-to-r from-primary to-accent transition-all"
          style={{ width: `${progress}%` }}
          aria-valuenow={progress}
          aria-valuemin={0}
          aria-valuemax={100}
          role="progressbar"
        />
      </div>

      {/* Step indicator */}
      <div className="text-sm text-muted-foreground">
        {stepIndex < steps.length ? (
          <>
            <span className="font-medium text-foreground">Current:</span>{" "}
            {steps[stepIndex].label}
          </>
        ) : (
          <span className="font-medium text-foreground">Done</span>
        )}
      </div>

      {/* Logs */}
      <div className="h-56 w-full overflow-auto rounded-lg border border-border bg-background p-3 text-sm">
        {logs.map((row, i) => (
          <div key={i} className="leading-6">
            <span className="text-muted-foreground">
              {new Date(row.t).toLocaleTimeString()}
            </span>{" "}
            – {row.m}
          </div>
        ))}
        {logs.length === 0 && (
          <div className="text-muted-foreground">No logs yet…</div>
        )}
      </div>

      {/* Controls */}
      <div className="flex items-center gap-2">
        <Button onClick={start} disabled={running} variant="hero">
          {running ? "Running…" : "Start Agent"}
        </Button>
        <Button onClick={() => stop()} disabled={!running} variant="outline">
          Stop
        </Button>
        <Button asChild variant="fintech">
          <Link to="/auth">Use My Data</Link>
        </Button>
      </div>

      <p className="text-xs text-muted-foreground">
        This is a local demo of our agentic pipeline. Connect your account or upload a
        sample statement to run the full analysis securely on the server.
      </p>
    </div>
  );
};

/* ------------------------------ Landing page ----------------------------- */
const Landing = () => {
  const [agentOpen, setAgentOpen] = useState(false);

  const features = [
    {
      icon: Brain,
      title: "AI-Powered Scoring",
      description:
        "Advanced algorithms analyze your gig income patterns and financial behavior",
    },
    {
      icon: Shield,
      title: "Privacy First",
      description:
        "Your data is encrypted and protected with bank-level security",
    },
    {
      icon: TrendingUp,
      title: "Smart Coaching",
      description: "Get personalized nudges to improve your financial health",
    },
    {
      icon: Smartphone,
      title: "Easy Integration",
      description:
        "Upload UPI statements or connect with payment platforms seamlessly",
    },
  ];

  const testimonials = [
    {
      name: "Anay Shah",
      role: "Delivery Partner",
      comment:
        "NayaFlow helped me understand my earning stability and get my first formal loan!",
      rating: 5,
    },
    {
      name: "Harsh Doshi",
      role: "Freelance Designer",
      comment:
        "The AI coaching helped me plan my finances better. My score improved by 80 points!",
      rating: 5,
    },
    {
      name: "Manaswi Bajaj",
      role: "Ride Share Driver",
      comment: "Finally, a credit score that understands gig workers like us.",
      rating: 4,
    },
    
  ];

  const agentSkills = [
    {
      icon: Bot,
      title: "Autonomous Workflow",
      desc: "Multi-step agent plans tasks, monitors progress, and self-corrects.",
    },
    {
      icon: Workflow,
      title: "Tool Use",
      desc: "Calls extractors, parsers, and scoring models as needed.",
    },
    {
      icon: FileText,
      title: "Document IQ",
      desc: "Reads PDFs/CSVs, reconciles duplicates, detects merchant categories.",
    },
    {
      icon: LineChart,
      title: "Cashflow Modeling",
      desc: "Finds income stability, burn, buffers, and affordability.",
    },
    {
      icon: Lock,
      title: "Guardrails",
      desc: "Policy checks and PII minimization to keep your data safe.",
    },
    {
      icon: Zap,
      title: "Real-time Insights",
      desc: "Surfaces nudges right when they matter.",
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-50 border-b border-border bg-card/80 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <img
                src="LOGO.png"
                alt="NayaFlow Logo"
                className="h-9 w-auto object-contain"
              />
            </div>
            <nav className="hidden md:flex items-center gap-6">
              <div className="flex items-center gap-2">
                <ThemeToggle />
              </div>
              <a
  href="https://github.com/HarshDoshi11/nayaflow"
  target="_blank"
  rel="noopener noreferrer"
  className="flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground transition-smooth"
>
  <Github className="h-4 w-4" />
  GitHub
</a>

              <a
                href="#features"
                className="text-sm text-muted-foreground transition-smooth hover:text-foreground"
              >
                Features
              </a>
              <a
                href="#agent"
                className="text-sm text-muted-foreground transition-smooth hover:text-foreground"
              >
                Agentic AI
              </a>
              <a
                href="#how-it-works"
                className="text-sm text-muted-foreground transition-smooth hover:text-foreground"
              >
                How it Works
              </a>
              <a
                href="#testimonials"
                className="text-sm text-muted-foreground transition-smooth hover:text-foreground"
              >
                Reviews
              </a>
              <Button variant="fintech" size="sm" asChild>
                <Link to="/auth">Get Started</Link>
              </Button>
            </nav>
          </div>
        </div>
      </header>

      {/* Hero */}
      <section className="bg-gradient-to-br from-background via-muted/20 to-background py-20">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2">
            <div className="space-y-8">
              <div className="space-y-4">
                <Badge variant="secondary" className="bg-gradient-hero border-0 text-white">
                  Smart AI Credit Scoring
                </Badge>
                <h1 className="text-4xl font-bold leading-tight md:text-6xl">
                  Credit Scoring for{" "}
                  <span className="bg-gradient-hero bg-clip-text text-transparent">
                    Gig Workers
                  </span>
                </h1>
                <p className="text-xl leading-relaxed text-muted-foreground">
                  Get fair credit scores that understand your irregular income.
                  AI-powered insights, personalized coaching, and access to affordable loans.
                </p>
              </div>

              <div className="flex flex-col gap-4 sm:flex-row">
                <Button variant="hero" size="xl" asChild>
                  <Link to="/auth">
                    Start Free Assessment
                    <ArrowRight className="h-5 w-5" />
                  </Link>
                </Button>
                <Button variant="outline" size="xl" asChild>
  <a
    href="https://youtu.be/xvFZjo5PgG0?si=09UFsn4ENC-lMocb"
    target="_blank"
    rel="noopener noreferrer"
  >
    Watch Demo Video
  </a>
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
              <div className="absolute inset-0 rounded-3xl bg-gradient-hero opacity-20 blur-3xl" />
              <img
                src={heroImage}
                alt="Gig workers using NayaFlow for credit scoring"
                className="relative w-full rounded-3xl shadow-2xl"
              />
            </div>
          </div>
        </div>
      </section>
         {/* Hero Section */}
<section className="py-20 bg-gradient-to-br from-background via-muted/20 to-background">
  {/* ...your existing hero code... */}
</section>
{/* Moving text banner */}




      {/* Features */}
      <section id="features" className="py-20">
        <div className="container mx-auto px-4">
          <div className="mb-16 text-center">
            <h2 className="mb-4 text-3xl font-bold md:text-4xl">
              Built for the{" "}
              <span className="bg-gradient-primary bg-clip-text text-transparent">
                New Economy
              </span>
            </h2>
            <p className="mx-auto max-w-2xl text-xl text-muted-foreground">
              Traditional credit scores don't work for gig workers. We use AI to understand your true financial picture.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
            {features.map(({ icon: Icon, title, description }, index) => (
              <Card
                key={index}
                className="bg-gradient-card border-0 shadow-md transition-smooth hover:shadow-lg"
              >
                <CardHeader className="text-center">
                  <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-gradient-primary">
                    <Icon className="h-6 w-6 text-white" />
                  </div>
                  <CardTitle className="text-lg">{title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-center text-sm text-muted-foreground">
                    {description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Agentic AI */}
      <section id="agent" className="bg-muted/20 py-20">
        <div className="container mx-auto px-4">
          <div className="mb-12 text-center">
            <Badge className="mb-3 bg-gradient-primary text-white">Agentic AI</Badge>
            <h2 className="text-3xl font-bold md:text-4xl">An Agent that Works for You</h2>
            <p className="mx-auto mt-3 max-w-3xl text-lg text-muted-foreground">
              Our autonomous agent plans tasks, calls tools, and explains every step—so you get a transparent score and actionable coaching.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {[
              { icon: Bot, title: "Plan & Execute", desc: "Goal-driven loop with self-checks." },
              { icon: Workflow, title: "Multi-Tool", desc: "Parsers, scorers, matchers." },
              { icon: FileText, title: "Statement IQ", desc: "PDF/CSV intake & cleaning." },
              { icon: LineChart, title: "Cashflow Lens", desc: "Volatility & surplus modeling." },
              { icon: Lock, title: "Privacy Guard", desc: "PII minimization & guardrails." },
              { icon: Zap, title: "In-the-moment Nudges", desc: "Timely insights to improve score." },
            ].map(({ icon: Icon, title, desc }, i) => (
              <Card key={i} className="border-0 bg-gradient-card shadow-md">
                <CardHeader className="flex flex-row items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-primary">
                    <Icon className="h-5 w-5 text-white" />
                  </div>
                  <CardTitle className="text-base">{title}</CardTitle>
                </CardHeader>
                <CardContent className="pt-0 text-sm text-muted-foreground">
                  {desc}
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="mt-8 flex justify-center">
            <Button size="lg" variant="fintech" onClick={() => setAgentOpen(true)}>
              Try Agent Demo
            </Button>
          </div>
        </div>
      </section>

      {/* How it Works */}
      <section id="how-it-works" className="bg-muted/10 py-20">
        <div className="container mx-auto px-4">
          <div className="mb-16 text-center">
            <h2 className="mb-4 text-3xl font-bold md:text-4xl">How NayaFlow Works</h2>
            <p className="text-xl text-muted-foreground">Simple, transparent, and designed for you</p>
          </div>

          <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
            <Card className="border-0 bg-gradient-card text-center shadow-md">
              <CardHeader>
                <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-gradient-primary">
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

            <Card className="border-0 bg-gradient-card text-center shadow-md">
              <CardHeader>
                <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-gradient-primary">
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

            <Card className="border-0 bg-gradient-card text-center shadow-md">
              <CardHeader>
                <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-gradient-primary">
                  <span className="text-2xl font-bold text-white">3</span>
                </div>
                <CardTitle>Get Your Score</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Receive your NayaFlow with personalized insights and loan recommendations
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section id="testimonials" className="py-20">
        <div className="container mx-auto px-4">
          <div className="mb-16 text-center">
            <h2 className="mb-4 text-3xl font-bold md:text-4xl">What Our Users Say</h2>
            <p className="text-xl text-muted-foreground">Real stories from real gig workers</p>
          </div>

          <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className="border-0 bg-gradient-card shadow-md">
                <CardHeader>
                  <div className="mb-2 flex items-center gap-1">
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

      {/* CTA */}
      <section className="bg-gradient-hero py-20">
        <div className="container mx-auto px-4 text-center">
          <h2 className="mb-4 text-3xl font-bold text-white md:text-4xl">
            Ready to Get Your Fair Credit Score?
          </h2>
        <p className="mx-auto mb-8 max-w-2xl text-xl text-white/90">
            Join thousands of gig workers who've already improved their financial future with NayaFlow
          </p>
          <Button variant="secondary" size="xl" asChild>
            <Link to="/auth">
              Get Started Free
              <ArrowRight className="h-5 w-5" />
            </Link>
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border py-12">
        
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
            <div>
              <div className="mb-4 flex items-center gap-2">
                <img
                  src="favicon.ico"
                  alt="NayaFlow Logo"
                  className="h-6 w-6 rounded-lg object-contain"
                />
                <span className="text-xl font-bold">NayaFlow</span>
              </div>
              <p className="text-sm text-muted-foreground" />
            </div>

            <div>
              <h4 className="mb-4 font-semibold">Company</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>
                  <a href="#" className="hover:text-foreground">About</a>
                </li>
                <li>
                  <a href="#" className="hover:text-foreground">Contact</a>
                </li>
              </ul>
            </div>
          </div>

          <div className="mt-8 border-t border-border pt-8 text-center text-sm text-muted-foreground">
            © 2024 NayaFlow. All rights reserved.
          </div>
        </div>
      </footer>

      {/* Agent Modal */}
      <Modal
        open={agentOpen}
        onClose={() => setAgentOpen(false)}
        title="NayaFlow Agent — Live Demo"
      >
        <AgentDemo onDone={() => { /* you can auto-close: setAgentOpen(false); */ }} />
      </Modal>
    </div>
  );
};

export default Landing;
