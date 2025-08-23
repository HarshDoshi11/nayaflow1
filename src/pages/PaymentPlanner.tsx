import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar } from "@/components/ui/calendar";
import { 
  ArrowLeft, 
  Calendar as CalendarIcon, 
  AlertTriangle,
  CheckCircle,
  TrendingUp,
  Bell
} from "lucide-react";
import { Link, useNavigate } from "react-router-dom";

const PaymentPlanner = () => {
  const navigate = useNavigate();
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());

  // Mock data for payment schedule
  const upcomingPayments = [
    {
      date: new Date(2024, 8, 15), // September 15
      amount: 3500,
      type: "EMI",
      description: "Personal Loan EMI",
      risk: "low"
    },
    {
      date: new Date(2024, 8, 18),
      amount: 1200,
      type: "Utility",
      description: "Mobile + Internet",
      risk: "low"
    },
    {
      date: new Date(2024, 8, 22),
      amount: 8000,
      type: "Rent",
      description: "Monthly Rent",
      risk: "medium"
    },
    {
      date: new Date(2024, 8, 25),
      amount: 2500,
      type: "BNPL",
      description: "Buy Now Pay Later",
      risk: "high"
    }
  ];

  const expectedIncome = [
    {
      date: new Date(2024, 8, 10),
      amount: 15000,
      source: "RideShare Platform",
      confidence: "high"
    },
    {
      date: new Date(2024, 8, 17),
      amount: 8500,
      source: "Food Delivery",
      confidence: "medium"
    },
    {
      date: new Date(2024, 8, 24),
      amount: 12000,
      source: "Freelance Project",
      confidence: "high"
    }
  ];

  const getRiskColor = (risk: string) => {
    switch (risk) {
      case "low": return "bg-secondary text-white";
      case "medium": return "bg-primary text-white";
      case "high": return "bg-destructive text-white";
      default: return "bg-muted text-foreground";
    }
  };

  const getConfidenceColor = (confidence: string) => {
    switch (confidence) {
      case "high": return "bg-secondary text-white";
      case "medium": return "bg-accent text-white";
      default: return "bg-muted text-foreground";
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Button variant="ghost" size="sm" onClick={() => navigate(-1)}>
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back
              </Button>
              <div>
                <h1 className="text-2xl font-bold bg-gradient-primary bg-clip-text text-transparent">
                  Payment Planner
                </h1>
                <p className="text-sm text-muted-foreground">
                  Smart scheduling based on your income patterns
                </p>
              </div>
            </div>
            <Button variant="outline" size="sm" asChild>
              <Link to="/">
                Home
              </Link>
            </Button>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Calendar */}
          <div className="lg:col-span-1">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <CalendarIcon className="h-5 w-5 text-primary" />
                  Payment Calendar
                </CardTitle>
              </CardHeader>
              <CardContent>
                <Calendar
                  mode="single"
                  selected={selectedDate}
                  onSelect={setSelectedDate}
                  className="rounded-md border"
                />
                <div className="mt-4 space-y-2">
                  <div className="flex items-center gap-2 text-sm">
                    <div className="h-3 w-3 bg-secondary rounded-full" />
                    <span>Low Risk</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <div className="h-3 w-3 bg-primary rounded-full" />
                    <span>Medium Risk</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <div className="h-3 w-3 bg-destructive rounded-full" />
                    <span>High Risk</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Right Column - Payment Details */}
          <div className="lg:col-span-2 space-y-6">
            {/* Cash Flow Summary */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <TrendingUp className="h-5 w-5 text-primary" />
                  September Cash Flow Summary
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="text-center p-4 bg-secondary/10 rounded-lg">
                    <div className="text-2xl font-bold text-secondary">₹35,500</div>
                    <div className="text-sm text-muted-foreground">Expected Income</div>
                  </div>
                  <div className="text-center p-4 bg-destructive/10 rounded-lg">
                    <div className="text-2xl font-bold text-destructive">₹15,200</div>
                    <div className="text-sm text-muted-foreground">Scheduled Payments</div>
                  </div>
                  <div className="text-center p-4 bg-primary/10 rounded-lg">
                    <div className="text-2xl font-bold text-primary">₹20,300</div>
                    <div className="text-sm text-muted-foreground">Available Buffer</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Upcoming Payments */}
            <Card>
              <CardHeader>
                <CardTitle>Upcoming Payments</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {upcomingPayments.map((payment, index) => (
                  <div key={index} className="flex items-center justify-between p-4 bg-muted/30 rounded-lg">
                    <div className="flex items-center gap-3">
                      <div className="text-center">
                        <div className="font-semibold">{payment.date.getDate()}</div>
                        <div className="text-xs text-muted-foreground">
                          {payment.date.toLocaleDateString('en-US', { month: 'short' })}
                        </div>
                      </div>
                      <div>
                        <div className="font-medium">{payment.description}</div>
                        <div className="text-sm text-muted-foreground">{payment.type}</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <Badge className={getRiskColor(payment.risk)}>
                        {payment.risk} risk
                      </Badge>
                      <div className="text-right">
                        <div className="font-semibold">₹{payment.amount.toLocaleString()}</div>
                      </div>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Expected Income */}
            <Card>
              <CardHeader>
                <CardTitle>Expected Income</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {expectedIncome.map((income, index) => (
                  <div key={index} className="flex items-center justify-between p-4 bg-secondary/10 rounded-lg">
                    <div className="flex items-center gap-3">
                      <div className="text-center">
                        <div className="font-semibold">{income.date.getDate()}</div>
                        <div className="text-xs text-muted-foreground">
                          {income.date.toLocaleDateString('en-US', { month: 'short' })}
                        </div>
                      </div>
                      <div>
                        <div className="font-medium">{income.source}</div>
                        <Badge className={getConfidenceColor(income.confidence)}>
                          {income.confidence} confidence
                        </Badge>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="font-semibold text-secondary">₹{income.amount.toLocaleString()}</div>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Smart Recommendations */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Bell className="h-5 w-5 text-accent" />
                  Smart Recommendations
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-start gap-3 p-4 bg-accent/10 rounded-lg">
                  <AlertTriangle className="h-5 w-5 text-accent mt-0.5" />
                  <div>
                    <div className="font-medium text-accent">Cash Crunch Alert</div>
                    <p className="text-sm text-muted-foreground">
                      You have ₹10,500 in payments due on Sept 22-25, but only ₹8,500 expected income on Sept 17. 
                      Consider delaying the BNPL payment or arranging additional income.
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start gap-3 p-4 bg-secondary/10 rounded-lg">
                  <CheckCircle className="h-5 w-5 text-secondary mt-0.5" />
                  <div>
                    <div className="font-medium text-secondary">Optimization Tip</div>
                    <p className="text-sm text-muted-foreground">
                      Schedule your rent payment on Sept 24th (after freelance payment) instead of Sept 22nd 
                      to maintain healthy cash flow.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Action Buttons */}
            <div className="flex gap-3">
              <Button variant="fintech" className="flex-1">
                <Bell className="h-4 w-4 mr-2" />
                Set Payment Reminders
              </Button>
              <Button variant="outline" className="flex-1">
                Export Calendar
              </Button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default PaymentPlanner;