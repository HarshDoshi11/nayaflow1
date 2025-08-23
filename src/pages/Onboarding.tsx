import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { 
  Shield, 
  Upload, 
  CheckCircle, 
  ArrowRight, 
  FileText,
  Smartphone,
  Download
} from "lucide-react";
import { Link } from "react-router-dom";

const Onboarding = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    city: "Mumbai",
    dataConsent: false,
    recommendationsConsent: false
  });

  const totalSteps = 3;
  const progress = (currentStep / totalSteps) * 100;

  const handleNext = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSubmit = () => {
    // In real app, this would save to database and redirect
    console.log("Form submitted:", formData);
  };

  const downloadTemplate = (type: string) => {
    // Mock CSV download
    const csvContent = type === 'transactions' 
      ? "date,amount,direction,merchant,channel,category\n2025-01-01,-250.00,debit,BigBazaar,UPI,groceries\n2025-01-01,1200.00,credit,RefundX,wallet,refund"
      : "date,platform,amount\n2025-01-03,RideShareX,1450.00\n2025-01-05,FoodDeliveryY,980.00";
    
    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${type}_template.csv`;
    a.click();
    window.URL.revokeObjectURL(url);
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="w-full max-w-2xl">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-2 mb-4">
            <div className="h-10 w-10 bg-gradient-primary rounded-lg flex items-center justify-center">
              <span className="text-white font-bold">N</span>
            </div>
            <span className="text-2xl font-bold bg-gradient-primary bg-clip-text text-transparent">
              NayaScore
            </span>
          </div>
          <h1 className="text-3xl font-bold mb-2">Welcome to Your Financial Future</h1>
          <p className="text-muted-foreground">Let's get you set up in just a few steps</p>
        </div>

        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex justify-between text-sm text-muted-foreground mb-2">
            <span>Step {currentStep} of {totalSteps}</span>
            <span>{Math.round(progress)}% Complete</span>
          </div>
          <Progress value={progress} className="h-2" />
        </div>

        {/* Step Content */}
        <Card className="bg-gradient-card border-0 shadow-lg">
          {currentStep === 1 && (
            <>
              <CardHeader className="text-center">
                <CardTitle className="flex items-center justify-center gap-2 text-xl">
                  <Smartphone className="h-6 w-6 text-primary" />
                  Basic Information
                </CardTitle>
                <p className="text-muted-foreground">Tell us a bit about yourself</p>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="name">Full Name *</Label>
                    <Input
                      id="name"
                      value={formData.name}
                      onChange={(e) => setFormData({...formData, name: e.target.value})}
                      placeholder="Enter your full name"
                    />
                  </div>
                  <div>
                    <Label htmlFor="phone">Phone Number *</Label>
                    <Input
                      id="phone"
                      value={formData.phone}
                      onChange={(e) => setFormData({...formData, phone: e.target.value})}
                      placeholder="+91 9876543210"
                    />
                  </div>
                </div>
                <div>
                  <Label htmlFor="email">Email Address *</Label>
                  <Input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                    placeholder="your.email@example.com"
                  />
                </div>
                <div>
                  <Label htmlFor="city">City</Label>
                  <Input
                    id="city"
                    value={formData.city}
                    onChange={(e) => setFormData({...formData, city: e.target.value})}
                    placeholder="Mumbai"
                  />
                </div>
              </CardContent>
            </>
          )}

          {currentStep === 2 && (
            <>
              <CardHeader className="text-center">
                <CardTitle className="flex items-center justify-center gap-2 text-xl">
                  <Shield className="h-6 w-6 text-primary" />
                  Privacy & Consent
                </CardTitle>
                <p className="text-muted-foreground">Your data, your choice</p>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="bg-muted/50 rounded-lg p-4">
                  <h3 className="font-semibold mb-2 flex items-center gap-2">
                    <CheckCircle className="h-5 w-5 text-secondary" />
                    How Your Score is Computed
                  </h3>
                  <ul className="text-sm text-muted-foreground space-y-1">
                    <li>• <strong>Income Stability (45%):</strong> Consistency of your earnings over time</li>
                    <li>• <strong>Expense Control (25%):</strong> How well you manage spending volatility</li>
                    <li>• <strong>Debt Serviceability (20%):</strong> Your capacity to service loans</li>
                    <li>• <strong>Financial Behavior (10%):</strong> Payment discipline and savings habits</li>
                  </ul>
                </div>

                <div className="space-y-4">
                  <div className="flex items-start space-x-3">
                    <Checkbox
                      id="dataConsent"
                      checked={formData.dataConsent}
                      onCheckedChange={(checked) => 
                        setFormData({...formData, dataConsent: checked as boolean})
                      }
                    />
                    <div className="grid gap-1.5 leading-none">
                      <Label htmlFor="dataConsent" className="text-sm font-medium">
                        Data Upload Consent *
                      </Label>
                      <p className="text-xs text-muted-foreground">
                        I consent to uploading my transaction data for credit scoring analysis. 
                        All data is encrypted and used only for scoring purposes.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-3">
                    <Checkbox
                      id="recommendationsConsent"
                      checked={formData.recommendationsConsent}
                      onCheckedChange={(checked) => 
                        setFormData({...formData, recommendationsConsent: checked as boolean})
                      }
                    />
                    <div className="grid gap-1.5 leading-none">
                      <Label htmlFor="recommendationsConsent" className="text-sm font-medium">
                        Personalized Recommendations
                      </Label>
                      <p className="text-xs text-muted-foreground">
                        I'd like to receive personalized loan offers and financial coaching 
                        based on my credit profile.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="bg-primary/10 rounded-lg p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <Shield className="h-5 w-5 text-primary" />
                    <span className="font-semibold text-primary">Bank-Level Security</span>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Your data is protected with 256-bit encryption and stored securely. 
                    We never share your personal information with third parties without consent.
                  </p>
                </div>
              </CardContent>
            </>
          )}

          {currentStep === 3 && (
            <>
              <CardHeader className="text-center">
                <CardTitle className="flex items-center justify-center gap-2 text-xl">
                  <Upload className="h-6 w-6 text-primary" />
                  Upload Your Data
                </CardTitle>
                <p className="text-muted-foreground">Start with sample data or upload your own</p>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Card className="border-2 border-dashed border-border hover:border-primary transition-smooth">
                    <CardHeader className="text-center">
                      <FileText className="h-8 w-8 text-primary mx-auto mb-2" />
                      <CardTitle className="text-lg">Transaction Data</CardTitle>
                      <p className="text-sm text-muted-foreground">
                        UPI statements, bank transactions
                      </p>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      <Button 
                        variant="outline" 
                        size="sm" 
                        className="w-full"
                        onClick={() => downloadTemplate('transactions')}
                      >
                        <Download className="h-4 w-4 mr-2" />
                        Download Template
                      </Button>
                      <Button variant="fintech" size="sm" className="w-full">
                        <Upload className="h-4 w-4 mr-2" />
                        Upload CSV
                      </Button>
                    </CardContent>
                  </Card>

                  <Card className="border-2 border-dashed border-border hover:border-primary transition-smooth">
                    <CardHeader className="text-center">
                      <FileText className="h-8 w-8 text-secondary mx-auto mb-2" />
                      <CardTitle className="text-lg">Payout Data</CardTitle>
                      <p className="text-sm text-muted-foreground">
                        Platform earnings, gig payouts
                      </p>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      <Button 
                        variant="outline" 
                        size="sm" 
                        className="w-full"
                        onClick={() => downloadTemplate('payouts')}
                      >
                        <Download className="h-4 w-4 mr-2" />
                        Download Template
                      </Button>
                      <Button variant="success" size="sm" className="w-full">
                        <Upload className="h-4 w-4 mr-2" />
                        Upload CSV
                      </Button>
                    </CardContent>
                  </Card>
                </div>

                <div className="text-center">
                  <p className="text-sm text-muted-foreground mb-4">
                    Don't have data ready? No problem!
                  </p>
                  <Button variant="secondary" className="w-full">
                    Load Demo Data & Continue
                  </Button>
                </div>

                <div className="bg-accent/10 rounded-lg p-4">
                  <h4 className="font-semibold text-accent mb-2">💡 Pro Tip</h4>
                  <p className="text-sm text-muted-foreground">
                    Upload at least 3 months of data for the most accurate score. 
                    The more data you provide, the better we can understand your financial patterns.
                  </p>
                </div>
              </CardContent>
            </>
          )}

          {/* Navigation Buttons */}
          <div className="px-6 pb-6">
            <div className="flex justify-between pt-6 border-t border-border">
              <Button 
                variant="outline" 
                onClick={handlePrevious}
                disabled={currentStep === 1}
              >
                Previous
              </Button>
              
              {currentStep < totalSteps ? (
                <Button 
                  variant="fintech" 
                  onClick={handleNext}
                  disabled={
                    (currentStep === 1 && (!formData.name || !formData.email || !formData.phone)) ||
                    (currentStep === 2 && !formData.dataConsent)
                  }
                >
                  Next Step
                  <ArrowRight className="h-4 w-4 ml-2" />
                </Button>
              ) : (
                <Button 
                  variant="hero" 
                  onClick={handleSubmit}
                  asChild
                >
                  <Link to="/dashboard">
                    Complete Setup
                    <CheckCircle className="h-4 w-4 ml-2" />
                  </Link>
                </Button>
              )}
            </div>
          </div>
        </Card>

        {/* Help Text */}
        <div className="text-center mt-6">
          <p className="text-sm text-muted-foreground">
            Need help? <a href="#" className="text-primary hover:underline">Contact our support team</a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Onboarding;