import { useState, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { 
  ArrowLeft, 
  Upload, 
  FileText,
  CheckCircle,
  AlertTriangle,
  Download,
  RefreshCw
} from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "sonner";

const DataUpload = () => {
  const navigate = useNavigate();
  const [uploadProgress, setUploadProgress] = useState(0);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadedFiles, setUploadedFiles] = useState<any[]>([]);

  const handleFileUpload = useCallback((event: React.ChangeEvent<HTMLInputElement>, type: string) => {
    const files = Array.from(event.target.files || []);
    if (files.length === 0) return;

    setIsUploading(true);
    setUploadProgress(0);

    // Simulate file upload progress
    const progressInterval = setInterval(() => {
      setUploadProgress((prev) => {
        if (prev >= 100) {
          clearInterval(progressInterval);
          setIsUploading(false);
          
          // Add uploaded file to list
          const newFile = {
            id: Date.now(),
            name: files[0].name,
            type: type,
            size: files[0].size,
            records: Math.floor(Math.random() * 1000) + 100,
            uploadedAt: new Date(),
            status: 'processed'
          };
          
          setUploadedFiles(prev => [...prev, newFile]);
          toast.success(`${type} data uploaded successfully!`);
          return 100;
        }
        return prev + Math.random() * 15 + 5;
      });
    }, 200);
  }, []);

  const downloadTemplate = (type: string) => {
    const csvContent = type === 'transactions' 
      ? "date,amount,direction,merchant,channel,category\n2025-01-01,-250.00,debit,BigBazaar,UPI,groceries\n2025-01-01,1200.00,credit,RefundX,wallet,refund\n2025-01-02,-45.00,debit,Starbucks,Card,food\n2025-01-03,2500.00,credit,Salary,Bank,income"
      : "date,platform,amount\n2025-01-03,RideShareX,1450.00\n2025-01-05,FoodDeliveryY,980.00\n2025-01-07,FreelanceZ,3200.00\n2025-01-10,RideShareX,1680.00";
    
    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${type}_template.csv`;
    a.click();
    window.URL.revokeObjectURL(url);
    toast.success(`${type} template downloaded!`);
  };

  const loadDemoData = () => {
    setIsUploading(true);
    setUploadProgress(0);

    const progressInterval = setInterval(() => {
      setUploadProgress((prev) => {
        if (prev >= 100) {
          clearInterval(progressInterval);
          setIsUploading(false);
          
          const demoFiles = [
            {
              id: Date.now(),
              name: 'demo_transactions.csv',
              type: 'transactions',
              size: 15420,
              records: 287,
              uploadedAt: new Date(),
              status: 'processed'
            },
            {
              id: Date.now() + 1,
              name: 'demo_payouts.csv',
              type: 'payouts',
              size: 8340,
              records: 45,
              uploadedAt: new Date(),
              status: 'processed'
            }
          ];
          
          setUploadedFiles(demoFiles);
          toast.success("Demo data loaded successfully!");
          
          // Redirect to dashboard after demo data is loaded
          setTimeout(() => {
            navigate('/dashboard');
          }, 2000);
          
          return 100;
        }
        return prev + Math.random() * 10 + 3;
      });
    }, 150);
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
                  Data Upload
                </h1>
                <p className="text-sm text-muted-foreground">
                  Upload your financial data to get started
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
        <div className="max-w-4xl mx-auto space-y-8">
          {/* Upload Progress */}
          {isUploading && (
            <Card>
              <CardContent className="pt-6">
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Processing your data...</span>
                    <span>{Math.round(uploadProgress)}%</span>
                  </div>
                  <Progress value={uploadProgress} />
                </div>
              </CardContent>
            </Card>
          )}

          {/* Upload Options */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Transactions Upload */}
            <Card className="border-2 border-dashed border-border hover:border-primary transition-smooth">
              <CardHeader className="text-center">
                <FileText className="h-12 w-12 text-primary mx-auto mb-4" />
                <CardTitle>Transaction Data</CardTitle>
                <p className="text-sm text-muted-foreground">
                  UPI statements, bank transactions, spending records
                </p>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-2">
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => downloadTemplate('transactions')}
                  >
                    <Download className="h-4 w-4 mr-2" />
                    Template
                  </Button>
                  <label className="cursor-pointer">
                    <Button variant="fintech" size="sm" className="w-full">
                      <Upload className="h-4 w-4 mr-2" />
                      Upload CSV
                    </Button>
                    <input
                      type="file"
                      accept=".csv,.xlsx,.xls"
                      onChange={(e) => handleFileUpload(e, 'transactions')}
                      className="hidden"
                      disabled={isUploading}
                    />
                  </label>
                </div>
                <div className="text-xs text-muted-foreground space-y-1">
                  <p>• CSV format with columns: date, amount, direction, merchant, channel, category</p>
                  <p>• At least 3 months of data recommended</p>
                  <p>• Maximum file size: 10MB</p>
                </div>
              </CardContent>
            </Card>

            {/* Payouts Upload */}
            <Card className="border-2 border-dashed border-border hover:border-primary transition-smooth">
              <CardHeader className="text-center">
                <FileText className="h-12 w-12 text-secondary mx-auto mb-4" />
                <CardTitle>Payout Data</CardTitle>
                <p className="text-sm text-muted-foreground">
                  Platform earnings, gig work payouts, freelance payments
                </p>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-2">
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => downloadTemplate('payouts')}
                  >
                    <Download className="h-4 w-4 mr-2" />
                    Template
                  </Button>
                  <label className="cursor-pointer">
                    <Button variant="success" size="sm" className="w-full">
                      <Upload className="h-4 w-4 mr-2" />
                      Upload CSV
                    </Button>
                    <input
                      type="file"
                      accept=".csv,.xlsx,.xls"
                      onChange={(e) => handleFileUpload(e, 'payouts')}
                      className="hidden"
                      disabled={isUploading}
                    />
                  </label>
                </div>
                <div className="text-xs text-muted-foreground space-y-1">
                  <p>• CSV format with columns: date, platform, amount</p>
                  <p>• Include all gig work and freelance earnings</p>
                  <p>• Regular payouts help improve score accuracy</p>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Demo Data Option */}
          <Card className="text-center bg-gradient-card border-0 shadow-lg">
            <CardHeader>
              <CardTitle>Don't Have Data Ready?</CardTitle>
              <p className="text-muted-foreground">
                Try NayaScore with realistic demo data to see how it works
              </p>
            </CardHeader>
            <CardContent>
              <Button 
                variant="secondary" 
                size="lg"
                onClick={loadDemoData}
                disabled={isUploading}
              >
                {isUploading ? (
                  <RefreshCw className="h-5 w-5 mr-2 animate-spin" />
                ) : (
                  <CheckCircle className="h-5 w-5 mr-2" />
                )}
                Load Demo Data & Continue
              </Button>
            </CardContent>
          </Card>

          {/* Uploaded Files */}
          {uploadedFiles.length > 0 && (
            <Card>
              <CardHeader>
                <CardTitle>Uploaded Files</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {uploadedFiles.map((file) => (
                    <div key={file.id} className="flex items-center justify-between p-4 bg-muted/30 rounded-lg">
                      <div className="flex items-center gap-3">
                        <FileText className="h-8 w-8 text-primary" />
                        <div>
                          <div className="font-medium">{file.name}</div>
                          <div className="text-sm text-muted-foreground">
                            {file.records} records • {Math.round(file.size / 1024)} KB
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <Badge variant="secondary">
                          <CheckCircle className="h-3 w-3 mr-1" />
                          {file.status}
                        </Badge>
                        <span className="text-sm text-muted-foreground">
                          {file.uploadedAt.toLocaleDateString()}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
                
                {uploadedFiles.length > 0 && (
                  <div className="mt-6 flex justify-center">
                    <Button variant="hero" size="lg" asChild>
                      <Link to="/dashboard">
                        Continue to Dashboard
                        <CheckCircle className="h-5 w-5 ml-2" />
                      </Link>
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>
          )}

          {/* Help Section */}
          <Card className="border-l-4 border-l-accent">
            <CardContent className="pt-6">
              <div className="flex items-start gap-2">
                <AlertTriangle className="h-5 w-5 text-accent mt-0.5" />
                <div>
                  <h4 className="font-medium text-accent mb-2">Data Security & Privacy</h4>
                  <div className="text-sm text-muted-foreground space-y-1">
                    <p>• All data is encrypted in transit and at rest with bank-level security</p>
                    <p>• We only use your data for credit scoring - never shared with third parties</p>
                    <p>• You can delete your data anytime from your account settings</p>
                    <p>• We comply with all Indian data protection regulations</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
};

export default DataUpload;