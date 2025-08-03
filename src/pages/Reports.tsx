import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { 
  FileText, 
  Download, 
  Share2, 
  Mail, 
  Eye, 
  Calendar,
  TrendingUp,
  PieChart,
  BarChart3,
  Plus,
  Clock,
  CheckCircle,
  AlertCircle,
  XCircle
} from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';

import { toast } from 'sonner';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

interface Report {
  id: string;
  title: string;
  type: 'portfolio' | 'performance' | 'custom';
  status: 'pending' | 'generating' | 'completed' | 'failed';
  file_url?: string;
  preview_data?: any;
  created_at: string;
}

export default function Reports() {
  const { user } = useAuth();
  const [reports, setReports] = useState<Report[]>([]);
  const [isGenerating, setIsGenerating] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [reportType, setReportType] = useState<string>('portfolio');
  const [reportTitle, setReportTitle] = useState('');
  const [previewContent, setPreviewContent] = useState<any>(null);

  useEffect(() => {
    if (user) {
      fetchReports();
    }
  }, [user]);

  const fetchReports = async () => {
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 500));
      
      const mockReports: Report[] = [
        {
          id: 'report-1',
          title: 'Monthly Portfolio Review - December 2024',
          type: 'portfolio',
          status: 'completed',
          preview_data: generateMockPortfolioData(),
          created_at: new Date(Date.now() - 86400000).toISOString() // 1 day ago
        },
        {
          id: 'report-2',
          title: 'Q4 Performance Analysis',
          type: 'performance',
          status: 'completed',
          preview_data: generateMockPortfolioData(),
          created_at: new Date(Date.now() - 259200000).toISOString() // 3 days ago
        },
        {
          id: 'report-3',
          title: 'Risk Assessment Report',
          type: 'custom',
          status: 'generating',
          preview_data: null,
          created_at: new Date().toISOString()
        }
      ];
      
      setReports(mockReports);
    } catch (error: any) {
      toast.error('Failed to fetch reports');
    }
  };

  const generateMockPortfolioData = () => {
    return {
      totalValue: 125420.50,
      totalGain: 8340.25,
      gainPercentage: 7.14,
      holdings: [
        { symbol: 'AAPL', name: 'Apple Inc.', shares: 100, value: 18500, gain: 2.5 },
        { symbol: 'GOOGL', name: 'Alphabet Inc.', shares: 25, value: 35750, gain: 1.8 },
        { symbol: 'MSFT', name: 'Microsoft Corp.', shares: 75, value: 28125, gain: 3.2 },
        { symbol: 'TSLA', name: 'Tesla Inc.', shares: 50, value: 12500, gain: -1.2 },
        { symbol: 'AMZN', name: 'Amazon.com Inc.', shares: 20, value: 30545, gain: 4.1 }
      ],
      sectors: [
        { name: 'Technology', value: 65, percentage: 52 },
        { name: 'Consumer Goods', value: 35, percentage: 28 },
        { name: 'Healthcare', value: 15, percentage: 12 },
        { name: 'Finance', value: 10, percentage: 8 }
      ],
      performance: {
        '1D': 1.2,
        '1W': 3.5,
        '1M': 7.1,
        '3M': 12.8,
        '1Y': 24.6
      }
    };
  };

  const generateReport = async () => {
    if (!reportTitle.trim()) {
      toast.error('Please enter a report title');
      return;
    }

    setIsGenerating(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const newReport: Report = {
        id: `report-${Date.now()}`,
        title: reportTitle,
        type: reportType as 'portfolio' | 'performance' | 'custom',
        status: 'generating',
        preview_data: generateMockPortfolioData(),
        created_at: new Date().toISOString()
      };

      // Add to local state
      setReports(prev => [newReport, ...prev]);

      // Simulate report generation
      setTimeout(() => {
        setReports(prev => 
          prev.map(report => 
            report.id === newReport.id 
              ? { ...report, status: 'completed' as const }
              : report
          )
        );
        toast.success('Report generated successfully!');
      }, 3000);

      setIsDialogOpen(false);
      setReportTitle('');
      
    } catch (error: any) {
      toast.error('Failed to generate report');
    } finally {
      setIsGenerating(false);
    }
  };

  const previewReport = (report: Report) => {
    setPreviewContent(report.preview_data);
  };

  const downloadPDF = async (report: Report) => {
    try {
      const pdf = new jsPDF();
      
      // Add title
      pdf.setFontSize(20);
      pdf.text(report.title, 20, 30);
      
      // Add date
      pdf.setFontSize(12);
      pdf.text(`Generated on: ${new Date(report.created_at).toLocaleDateString()}`, 20, 45);
      
      if (report.preview_data) {
        const data = report.preview_data;
        
        // Portfolio summary
        pdf.setFontSize(16);
        pdf.text('Portfolio Summary', 20, 65);
        
        pdf.setFontSize(12);
        pdf.text(`Total Value: $${data.totalValue?.toLocaleString()}`, 20, 80);
        pdf.text(`Total Gain: $${data.totalGain?.toLocaleString()} (${data.gainPercentage}%)`, 20, 95);
        
        // Holdings
        pdf.setFontSize(16);
        pdf.text('Holdings', 20, 115);
        
        let yPosition = 130;
        data.holdings?.forEach((holding: any) => {
          pdf.setFontSize(10);
          pdf.text(`${holding.symbol} - ${holding.name}`, 20, yPosition);
          pdf.text(`${holding.shares} shares - $${holding.value.toLocaleString()}`, 20, yPosition + 10);
          yPosition += 25;
        });
      }
      
      pdf.save(`${report.title}.pdf`);
      toast.success('PDF downloaded successfully!');
    } catch (error) {
      toast.error('Failed to download PDF');
    }
  };

  const shareReport = (report: Report) => {
    // In a real app, this would generate a shareable link
    navigator.clipboard.writeText(`Check out my portfolio report: ${report.title}`);
    toast.success('Report link copied to clipboard!');
  };

  const emailReport = (report: Report) => {
    const subject = encodeURIComponent(`Portfolio Report: ${report.title}`);
    const body = encodeURIComponent(`Please find attached my portfolio report: ${report.title}\n\nGenerated on: ${new Date(report.created_at).toLocaleDateString()}`);
    window.open(`mailto:?subject=${subject}&body=${body}`);
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'pending':
        return <Clock className="h-4 w-4 text-warning" />;
      case 'generating':
        return <Clock className="h-4 w-4 text-info animate-pulse" />;
      case 'completed':
        return <CheckCircle className="h-4 w-4 text-success" />;
      case 'failed':
        return <XCircle className="h-4 w-4 text-destructive" />;
      default:
        return <AlertCircle className="h-4 w-4 text-muted-foreground" />;
    }
  };

  const getStatusBadge = (status: string) => {
    const variants: Record<string, any> = {
      pending: 'secondary',
      generating: 'default',
      completed: 'default',
      failed: 'destructive'
    };
    
    return (
      <Badge variant={variants[status] || 'secondary'} className="capitalize">
        {getStatusIcon(status)}
        <span className="ml-1">{status}</span>
      </Badge>
    );
  };

  return (
    <div className="container mx-auto p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Reports</h1>
          <p className="text-muted-foreground">Generate and manage your portfolio reports</p>
        </div>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button className="bg-gradient-primary">
              <Plus className="mr-2 h-4 w-4" />
              Generate Report
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Generate New Report</DialogTitle>
              <DialogDescription>
                Create a new portfolio report with customized settings
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <Label htmlFor="title">Report Title</Label>
                <Input
                  id="title"
                  value={reportTitle}
                  onChange={(e) => setReportTitle(e.target.value)}
                  placeholder="Enter report title"
                />
              </div>
              <div>
                <Label htmlFor="type">Report Type</Label>
                <Select value={reportType} onValueChange={setReportType}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select report type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="portfolio">
                      <div className="flex items-center gap-2">
                        <PieChart className="h-4 w-4" />
                        Portfolio Overview
                      </div>
                    </SelectItem>
                    <SelectItem value="performance">
                      <div className="flex items-center gap-2">
                        <TrendingUp className="h-4 w-4" />
                        Performance Analysis
                      </div>
                    </SelectItem>
                    <SelectItem value="custom">
                      <div className="flex items-center gap-2">
                        <BarChart3 className="h-4 w-4" />
                        Custom Report
                      </div>
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <Button 
                onClick={generateReport} 
                className="w-full" 
                disabled={isGenerating}
              >
                {isGenerating ? 'Generating...' : 'Generate Report'}
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Preview Modal */}
      {previewContent && (
        <Dialog open={!!previewContent} onOpenChange={() => setPreviewContent(null)}>
          <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Report Preview</DialogTitle>
            </DialogHeader>
            <div id="report-preview" className="space-y-6">
              <div className="text-center">
                <h2 className="text-2xl font-bold">Portfolio Report</h2>
                <p className="text-muted-foreground">Generated on {new Date().toLocaleDateString()}</p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Card>
                  <CardContent className="p-4">
                    <div className="text-center">
                      <p className="text-sm font-medium text-muted-foreground">Total Value</p>
                      <p className="text-2xl font-bold">${previewContent.totalValue?.toLocaleString()}</p>
                    </div>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-4">
                    <div className="text-center">
                      <p className="text-sm font-medium text-muted-foreground">Total Gain</p>
                      <p className="text-2xl font-bold text-success">
                        ${previewContent.totalGain?.toLocaleString()}
                      </p>
                    </div>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-4">
                    <div className="text-center">
                      <p className="text-sm font-medium text-muted-foreground">Gain %</p>
                      <p className="text-2xl font-bold text-success">
                        {previewContent.gainPercentage}%
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </div>

              <Card>
                <CardHeader>
                  <CardTitle>Top Holdings</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {previewContent.holdings?.map((holding: any, index: number) => (
                      <div key={index} className="flex justify-between items-center">
                        <div>
                          <p className="font-medium">{holding.symbol}</p>
                          <p className="text-sm text-muted-foreground">{holding.name}</p>
                        </div>
                        <div className="text-right">
                          <p className="font-medium">${holding.value.toLocaleString()}</p>
                          <p className={`text-sm ${holding.gain >= 0 ? 'text-success' : 'text-destructive'}`}>
                            {holding.gain >= 0 ? '+' : ''}{holding.gain}%
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </DialogContent>
        </Dialog>
      )}

      {/* Reports List */}
      <div className="space-y-4">
        {reports.length === 0 ? (
          <Card>
            <CardContent className="flex flex-col items-center justify-center py-12">
              <FileText className="h-12 w-12 text-muted-foreground mb-4" />
              <h3 className="text-lg font-semibold mb-2">No reports yet</h3>
              <p className="text-muted-foreground text-center mb-4">
                Generate your first portfolio report to get detailed insights
              </p>
            </CardContent>
          </Card>
        ) : (
          reports.map((report) => (
            <Card key={report.id}>
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div>
                    <CardTitle className="flex items-center gap-2">
                      <FileText className="h-5 w-5" />
                      {report.title}
                    </CardTitle>
                    <CardDescription>
                      <div className="flex items-center gap-4 mt-1">
                        <span className="capitalize">{report.type} report</span>
                        <span className="flex items-center gap-1">
                          <Calendar className="h-3 w-3" />
                          {new Date(report.created_at).toLocaleDateString()}
                        </span>
                      </div>
                    </CardDescription>
                  </div>
                  {getStatusBadge(report.status)}
                </div>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => previewReport(report)}
                    disabled={report.status !== 'completed'}
                  >
                    <Eye className="mr-2 h-4 w-4" />
                    Preview
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => downloadPDF(report)}
                    disabled={report.status !== 'completed'}
                  >
                    <Download className="mr-2 h-4 w-4" />
                    Download PDF
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => shareReport(report)}
                    disabled={report.status !== 'completed'}
                  >
                    <Share2 className="mr-2 h-4 w-4" />
                    Share
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => emailReport(report)}
                    disabled={report.status !== 'completed'}
                  >
                    <Mail className="mr-2 h-4 w-4" />
                    Email
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))
        )}
      </div>
    </div>
  );
}