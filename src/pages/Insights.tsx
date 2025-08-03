import { Brain, TrendingUp, TrendingDown, AlertTriangle, Shield, Target, Zap } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { PieChart, Pie, Cell, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, LineChart, Line } from "recharts";
import { cn } from "@/lib/utils";

interface PortfolioHealth {
  score: number;
  grade: string;
  diversification: number;
  riskLevel: number;
  volatility: number;
  sharpeRatio: number;
}

interface SectorAllocation {
  sector: string;
  percentage: number;
  value: number;
  color: string;
  recommendation: "overweight" | "underweight" | "neutral";
}

interface AIRecommendation {
  id: string;
  type: "buy" | "sell" | "hold" | "warning";
  title: string;
  description: string;
  confidence: number;
  impact: "high" | "medium" | "low";
  action: string;
}

interface RiskMetric {
  label: string;
  value: number;
  status: "low" | "medium" | "high";
  description: string;
}

const portfolioHealth: PortfolioHealth = {
  score: 78,
  grade: "B+",
  diversification: 72,
  riskLevel: 65,
  volatility: 18.5,
  sharpeRatio: 1.34,
};

const sectorAllocation: SectorAllocation[] = [
  { sector: "IT", percentage: 35, value: 87500, color: "#3B82F6", recommendation: "overweight" },
  { sector: "Banking", percentage: 25, value: 62500, color: "#10B981", recommendation: "neutral" },
  { sector: "Energy", percentage: 15, value: 37500, color: "#F59E0B", recommendation: "underweight" },
  { sector: "FMCG", percentage: 12, value: 30000, color: "#EF4444", recommendation: "neutral" },
  { sector: "Auto", percentage: 8, value: 20000, color: "#8B5CF6", recommendation: "underweight" },
  { sector: "Pharma", percentage: 5, value: 12500, color: "#06B6D4", recommendation: "underweight" },
];

const aiRecommendations: AIRecommendation[] = [
  {
    id: "1",
    type: "warning",
    title: "High IT Sector Concentration",
    description: "Your portfolio has 35% allocation to IT sector, which is above the recommended 25% threshold. Consider reducing exposure to manage concentration risk.",
    confidence: 92,
    impact: "high",
    action: "Rebalance Portfolio",
  },
  {
    id: "2",
    type: "buy",
    title: "Increase Energy Sector Exposure",
    description: "Energy sector is underweight at 15%. With improving crude oil dynamics and government focus on renewables, consider increasing allocation to 20%.",
    confidence: 78,
    impact: "medium",
    action: "Add Energy Stocks",
  },
  {
    id: "3",
    type: "hold",
    title: "Banking Sector Well Positioned",
    description: "Banking allocation at 25% is optimal. Strong fundamentals and improving asset quality support current positioning.",
    confidence: 85,
    impact: "low",
    action: "Maintain Position",
  },
  {
    id: "4",
    type: "sell",
    title: "Consider Profit Booking in TCS",
    description: "TCS has gained 15% in the last month and is trading near resistance. Consider partial profit booking to manage concentration risk.",
    confidence: 74,
    impact: "medium",
    action: "Book Partial Profits",
  },
];

const riskMetrics: RiskMetric[] = [
  {
    label: "Concentration Risk",
    value: 75,
    status: "high",
    description: "Top 3 holdings represent 65% of portfolio",
  },
  {
    label: "Volatility Risk",
    value: 45,
    status: "medium",
    description: "Portfolio volatility is within acceptable range",
  },
  {
    label: "Sector Risk",
    value: 68,
    status: "high",
    description: "High concentration in IT and Banking sectors",
  },
  {
    label: "Liquidity Risk",
    value: 25,
    status: "low",
    description: "All holdings are highly liquid large-cap stocks",
  },
];

const performanceData = [
  { month: "Jan", portfolio: 12.5, nifty: 8.2 },
  { month: "Feb", portfolio: 18.3, nifty: 12.1 },
  { month: "Mar", portfolio: 15.7, nifty: 14.2 },
  { month: "Apr", portfolio: 22.1, nifty: 16.8 },
  { month: "May", portfolio: 19.8, nifty: 15.3 },
  { month: "Jun", portfolio: 24.7, nifty: 18.9 },
];

export default function Insights() {
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const getRecommendationIcon = (type: string) => {
    switch (type) {
      case "buy": return <TrendingUp className="w-4 h-4 text-success" />;
      case "sell": return <TrendingDown className="w-4 h-4 text-destructive" />;
      case "warning": return <AlertTriangle className="w-4 h-4 text-warning" />;
      default: return <Shield className="w-4 h-4 text-info" />;
    }
  };

  const getRiskColor = (status: string) => {
    switch (status) {
      case "low": return "text-success";
      case "medium": return "text-warning";
      case "high": return "text-destructive";
      default: return "text-muted-foreground";
    }
  };

  const getHealthGrade = (score: number) => {
    if (score >= 90) return { grade: "A+", color: "text-success", bg: "bg-success/10" };
    if (score >= 80) return { grade: "A", color: "text-success", bg: "bg-success/10" };
    if (score >= 70) return { grade: "B+", color: "text-info", bg: "bg-info/10" };
    if (score >= 60) return { grade: "B", color: "text-warning", bg: "bg-warning/10" };
    return { grade: "C", color: "text-destructive", bg: "bg-destructive/10" };
  };

  const healthGrade = getHealthGrade(portfolioHealth.score);

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-foreground">AI Insights & Analytics</h1>
          <p className="text-muted-foreground mt-1">
            Advanced portfolio analysis powered by artificial intelligence
          </p>
        </div>
        <div className="flex gap-3">
          <Button variant="outline" size="sm">
            <Target className="w-4 h-4 mr-2" />
            Set Goals
          </Button>
          <Button size="sm" className="bg-gradient-primary">
            <Brain className="w-4 h-4 mr-2" />
            Get AI Report
          </Button>
        </div>
      </div>

      {/* Portfolio Health Score */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-1 bg-gradient-card shadow-lg">
          <CardHeader>
            <CardTitle className="text-foreground flex items-center gap-2">
              <Brain className="w-5 h-5 text-primary" />
              Portfolio Health Score
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="text-center">
              <div className={cn("inline-flex items-center justify-center w-24 h-24 rounded-full text-4xl font-bold", healthGrade.bg, healthGrade.color)}>
                {healthGrade.grade}
              </div>
              <p className="text-3xl font-bold text-foreground mt-2">{portfolioHealth.score}/100</p>
              <p className="text-muted-foreground">Overall Health Score</p>
            </div>

            <div className="space-y-4">
              <div>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm text-muted-foreground">Diversification</span>
                  <span className="text-sm font-medium">{portfolioHealth.diversification}%</span>
                </div>
                <Progress value={portfolioHealth.diversification} className="h-2" />
              </div>

              <div>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm text-muted-foreground">Risk Level</span>
                  <span className="text-sm font-medium">{portfolioHealth.riskLevel}%</span>
                </div>
                <Progress value={portfolioHealth.riskLevel} className="h-2" />
              </div>

              <div className="grid grid-cols-2 gap-4 pt-4 border-t border-border">
                <div>
                  <p className="text-2xl font-bold text-foreground">{portfolioHealth.volatility}%</p>
                  <p className="text-xs text-muted-foreground">Volatility</p>
                </div>
                <div>
                  <p className="text-2xl font-bold text-foreground">{portfolioHealth.sharpeRatio}</p>
                  <p className="text-xs text-muted-foreground">Sharpe Ratio</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Sector Allocation */}
        <Card className="lg:col-span-2 bg-gradient-card shadow-lg">
          <CardHeader>
            <CardTitle className="text-foreground">Sector Allocation Breakdown</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={sectorAllocation}
                      cx="50%"
                      cy="50%"
                      innerRadius={40}
                      outerRadius={80}
                      paddingAngle={2}
                      dataKey="percentage"
                    >
                      {sectorAllocation.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip 
                      formatter={(value: any) => [`${value}%`, 'Allocation']}
                      labelStyle={{ color: 'var(--foreground)' }}
                      contentStyle={{ 
                        backgroundColor: 'hsl(var(--card))',
                        border: '1px solid hsl(var(--border))',
                        borderRadius: '8px'
                      }}
                    />
                  </PieChart>
                </ResponsiveContainer>
              </div>

              <div className="space-y-3">
                {sectorAllocation.map((sector, index) => (
                  <div key={index} className="flex items-center justify-between p-3 rounded-lg bg-muted/30">
                    <div className="flex items-center gap-3">
                      <div 
                        className="w-3 h-3 rounded-full" 
                        style={{ backgroundColor: sector.color }}
                      />
                      <span className="font-medium text-foreground">{sector.sector}</span>
                      <Badge 
                        variant={
                          sector.recommendation === "overweight" ? "destructive" :
                          sector.recommendation === "underweight" ? "secondary" : "outline"
                        }
                        className="text-xs"
                      >
                        {sector.recommendation}
                      </Badge>
                    </div>
                    <div className="text-right">
                      <p className="font-semibold text-foreground">{sector.percentage}%</p>
                      <p className="text-xs text-muted-foreground">{formatCurrency(sector.value)}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* AI Recommendations */}
      <Card className="bg-gradient-card shadow-lg">
        <CardHeader>
          <CardTitle className="text-foreground flex items-center gap-2">
            <Zap className="w-5 h-5 text-primary" />
            AI-Powered Recommendations
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 gap-4">
            {aiRecommendations.map((rec) => (
              <Card key={rec.id} className="bg-card border">
                <CardContent className="p-4">
                  <div className="flex items-start gap-3">
                    <div className="mt-1">
                      {getRecommendationIcon(rec.type)}
                    </div>
                    <div className="flex-1 space-y-2">
                      <div className="flex items-center justify-between">
                        <h4 className="font-semibold text-foreground">{rec.title}</h4>
                        <Badge variant={rec.impact === "high" ? "destructive" : rec.impact === "medium" ? "secondary" : "outline"}>
                          {rec.impact} impact
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground">{rec.description}</p>
                      <div className="flex items-center justify-between pt-2">
                        <div className="flex items-center gap-2">
                          <span className="text-sm font-medium">Confidence:</span>
                          <Progress value={rec.confidence} className="w-16 h-2" />
                          <span className="text-sm text-muted-foreground">{rec.confidence}%</span>
                        </div>
                        <Button size="sm" variant="outline">
                          {rec.action}
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Risk Analysis & Performance */}
      <div className="grid lg:grid-cols-2 gap-6">
        {/* Risk Analysis */}
        <Card className="bg-gradient-card shadow-lg">
          <CardHeader>
            <CardTitle className="text-foreground flex items-center gap-2">
              <Shield className="w-5 h-5 text-primary" />
              Risk Analysis
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {riskMetrics.map((metric, index) => (
                <div key={index} className="p-4 rounded-lg bg-muted/30">
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-medium text-foreground">{metric.label}</span>
                    <Badge className={cn("text-xs", getRiskColor(metric.status))}>
                      {metric.status.toUpperCase()}
                    </Badge>
                  </div>
                  <Progress value={metric.value} className="h-2 mb-2" />
                  <p className="text-sm text-muted-foreground">{metric.description}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Performance Comparison */}
        <Card className="bg-gradient-card shadow-lg">
          <CardHeader>
            <CardTitle className="text-foreground">Performance vs Nifty 50</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={performanceData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                  <XAxis 
                    dataKey="month" 
                    stroke="hsl(var(--muted-foreground))"
                    fontSize={12}
                  />
                  <YAxis 
                    stroke="hsl(var(--muted-foreground))"
                    fontSize={12}
                  />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: 'hsl(var(--card))',
                      border: '1px solid hsl(var(--border))',
                      borderRadius: '8px'
                    }}
                  />
                  <Line 
                    type="monotone" 
                    dataKey="portfolio" 
                    stroke="hsl(var(--primary))" 
                    strokeWidth={3}
                    name="Your Portfolio"
                  />
                  <Line 
                    type="monotone" 
                    dataKey="nifty" 
                    stroke="hsl(var(--muted-foreground))" 
                    strokeWidth={2}
                    strokeDasharray="5 5"
                    name="Nifty 50"
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
            <div className="flex justify-center gap-6 mt-4">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-primary rounded-full" />
                <span className="text-sm text-muted-foreground">Your Portfolio</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-1 bg-muted-foreground rounded-full" />
                <span className="text-sm text-muted-foreground">Nifty 50</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}