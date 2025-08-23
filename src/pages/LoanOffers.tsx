import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Slider } from "@/components/ui/slider";
import { Label } from "@/components/ui/label";
import { 
  ArrowLeft, 
  DollarSign, 
  TrendingUp, 
  Calculator,
  CheckCircle,
  AlertTriangle,
  ExternalLink
} from "lucide-react";
import { Link, useNavigate } from "react-router-dom";

const LoanOffers = () => {
  const navigate = useNavigate();
  const [loanAmount, setLoanAmount] = useState([25000]);
  const [tenure, setTenure] = useState([12]);

  const offers = [
    {
      id: 1,
      lender: "Sampoorna Finance",
      apr: 18.5,
      minAmount: 5000,
      maxAmount: 50000,
      maxTenure: 24,
      processingFee: 2.5,
      eligibility: "Excellent Match",
      eligibilityScore: 95,
      features: ["Quick Disbursal", "No Collateral", "Flexible Repayment"]
    },
    {
      id: 2,
      lender: "FlexiCredit",
      apr: 22.0,
      minAmount: 10000,
      maxAmount: 100000,
      maxTenure: 36,
      processingFee: 3.0,
      eligibility: "Good Match",
      eligibilityScore: 78,
      features: ["Digital Process", "Pre-approved", "Same Day Approval"]
    },
    {
      id: 3,
      lender: "GigFund",
      apr: 15.8,
      minAmount: 15000,
      maxAmount: 75000,
      maxTenure: 18,
      processingFee: 2.0,
      eligibility: "Perfect Match",
      eligibilityScore: 98,
      features: ["Gig Worker Specialist", "Income Flexibility", "Low Interest"]
    }
  ];

  const calculateEMI = (amount: number, rate: number, tenure: number) => {
    const monthlyRate = rate / (12 * 100);
    const emi = (amount * monthlyRate * Math.pow(1 + monthlyRate, tenure)) / 
                (Math.pow(1 + monthlyRate, tenure) - 1);
    return Math.round(emi);
  };

  const getEligibilityColor = (score: number) => {
    if (score >= 90) return "bg-secondary text-white";
    if (score >= 75) return "bg-primary text-white";
    return "bg-accent text-white";
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
                  Loan Offers
                </h1>
                <p className="text-sm text-muted-foreground">
                  Personalized offers based on your NayaScore
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
        {/* EMI Calculator */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calculator className="h-5 w-5 text-primary" />
              EMI Calculator
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <Label>Loan Amount: ₹{loanAmount[0].toLocaleString()}</Label>
                <Slider
                  value={loanAmount}
                  onValueChange={setLoanAmount}
                  max={100000}
                  min={5000}
                  step={5000}
                  className="mt-2"
                />
              </div>
              <div>
                <Label>Tenure: {tenure[0]} months</Label>
                <Slider
                  value={tenure}
                  onValueChange={setTenure}
                  max={36}
                  min={6}
                  step={1}
                  className="mt-2"
                />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Available Offers */}
        <div className="space-y-6">
          <h2 className="text-xl font-semibold">Available Offers</h2>
          
          {offers.map((offer) => {
            const emi = calculateEMI(loanAmount[0], offer.apr, tenure[0]);
            const totalAmount = emi * tenure[0];
            const processingFeeAmount = (loanAmount[0] * offer.processingFee) / 100;
            const totalCost = totalAmount + processingFeeAmount;

            return (
              <Card key={offer.id} className="bg-gradient-card border-0 shadow-lg">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div>
                      <CardTitle className="text-xl">{offer.lender}</CardTitle>
                      <div className="flex items-center gap-2 mt-2">
                        <Badge className={getEligibilityColor(offer.eligibilityScore)}>
                          {offer.eligibility}
                        </Badge>
                        <span className="text-sm text-muted-foreground">
                          {offer.eligibilityScore}% match
                        </span>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-2xl font-bold text-primary">
                        {offer.apr}% APR
                      </div>
                    </div>
                  </div>
                </CardHeader>

                <CardContent className="space-y-6">
                  {/* EMI Breakdown */}
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-4 bg-muted/30 rounded-lg">
                    <div className="text-center">
                      <div className="text-lg font-bold text-secondary">₹{emi.toLocaleString()}</div>
                      <div className="text-xs text-muted-foreground">Monthly EMI</div>
                    </div>
                    <div className="text-center">
                      <div className="text-lg font-bold">₹{totalAmount.toLocaleString()}</div>
                      <div className="text-xs text-muted-foreground">Total Repayment</div>
                    </div>
                    <div className="text-center">
                      <div className="text-lg font-bold">₹{processingFeeAmount.toLocaleString()}</div>
                      <div className="text-xs text-muted-foreground">Processing Fee</div>
                    </div>
                    <div className="text-center">
                      <div className="text-lg font-bold text-accent">₹{totalCost.toLocaleString()}</div>
                      <div className="text-xs text-muted-foreground">Total Cost</div>
                    </div>
                  </div>

                  {/* Features */}
                  <div>
                    <h4 className="font-medium mb-3">Key Features</h4>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
                      {offer.features.map((feature, index) => (
                        <div key={index} className="flex items-center gap-2 text-sm">
                          <CheckCircle className="h-4 w-4 text-secondary" />
                          {feature}
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Eligibility Factors */}
                  <div className="bg-primary/10 rounded-lg p-4">
                    <div className="flex items-center gap-2 mb-2">
                      <TrendingUp className="h-4 w-4 text-primary" />
                      <span className="font-medium">Why You Qualify</span>
                    </div>
                    <div className="text-sm text-muted-foreground space-y-1">
                      <p>• Your income stability score of 78% exceeds minimum requirement</p>
                      <p>• DSR of 28% is well within acceptable limits</p>
                      <p>• Strong payment discipline detected in transaction patterns</p>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex gap-3">
                    <Button variant="fintech" className="flex-1">
                      Apply Now
                      <ExternalLink className="h-4 w-4 ml-2" />
                    </Button>
                    <Button variant="outline">
                      View Details
                    </Button>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Disclaimer */}
        <Card className="mt-8 border-l-4 border-l-accent">
          <CardContent className="pt-6">
            <div className="flex items-start gap-2">
              <AlertTriangle className="h-5 w-5 text-accent mt-0.5" />
              <div>
                <h4 className="font-medium text-accent mb-1">Important Information</h4>
                <p className="text-sm text-muted-foreground">
                  Interest rates and loan terms are indicative and subject to final approval by lenders. 
                  Actual rates may vary based on final credit assessment. Compare all terms before applying.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  );
};

export default LoanOffers;