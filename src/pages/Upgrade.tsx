import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Check, X, Crown, Zap, Shield, TrendingUp } from "lucide-react";
import { PremiumBadge } from "@/components/ui/premium-badge";

const features = [
  { name: "Add Stocks to Portfolio", free: true, premium: true },
  { name: "Basic Portfolio View", free: true, premium: true },
  { name: "Stock Price Updates", free: true, premium: true },
  { name: "AI-Powered Insights", free: false, premium: true },
  { name: "Telegram Alerts", free: false, premium: true },
  { name: "Email Notifications", free: false, premium: true },
  { name: "Advanced Screener Filters", free: false, premium: true },
  { name: "Portfolio Health Score", free: false, premium: true },
  { name: "PDF Report Downloads", free: false, premium: true },
  { name: "Risk Analyzer", free: false, premium: true },
  { name: "Multi-Portfolio Support", free: false, premium: true },
  { name: "Sector Diversification Graph", free: false, premium: true },
  { name: "Golden Crossover Alerts", free: false, premium: true },
  { name: "288 EMA Analysis", free: false, premium: true },
];

const benefits = [
  {
    icon: <TrendingUp className="w-6 h-6" />,
    title: "Smart Analysis",
    description: "AI-powered insights and advanced technical indicators"
  },
  {
    icon: <Zap className="w-6 h-6" />,
    title: "Instant Alerts",
    description: "Real-time notifications via Telegram and email"
  },
  {
    icon: <Shield className="w-6 h-6" />,
    title: "Risk Management",
    description: "Portfolio health scores and risk analysis tools"
  }
];

export default function Upgrade() {
  return (
    <div className="space-y-8 p-6 max-w-7xl mx-auto">
      {/* Hero Section */}
      <div className="text-center space-y-4">
        <div className="inline-flex items-center gap-2 bg-gradient-primary rounded-full px-6 py-3 shadow-glow mb-4">
          <Crown className="w-5 h-5 text-primary-foreground" />
          <span className="text-primary-foreground font-semibold">Upgrade to Premium</span>
        </div>
        
        <h1 className="text-4xl font-bold bg-gradient-primary bg-clip-text text-transparent">
          Unlock Advanced Trading Features
        </h1>
        
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          Get AI-powered insights, real-time alerts, and advanced analysis tools to make smarter investment decisions.
        </p>
      </div>

      {/* Benefits */}
      <div className="grid md:grid-cols-3 gap-6">
        {benefits.map((benefit, index) => (
          <Card key={index} className="bg-gradient-card border-accent/20 shadow-lg">
            <CardContent className="pt-6">
              <div className="text-accent mb-4">{benefit.icon}</div>
              <h3 className="font-semibold text-lg mb-2">{benefit.title}</h3>
              <p className="text-muted-foreground">{benefit.description}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Pricing Plans */}
      <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
        {/* Monthly Plan */}
        <Card className="relative border-accent/30 shadow-lg">
          <CardHeader>
            <CardTitle className="text-center">
              <div className="text-2xl font-bold">Monthly Plan</div>
              <div className="text-3xl font-bold text-accent mt-2">₹99</div>
              <div className="text-sm text-muted-foreground">per month</div>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <Button className="w-full bg-accent hover:bg-accent/90 text-accent-foreground">
              Start Monthly Plan
            </Button>
            <p className="text-xs text-center text-muted-foreground">
              Cancel anytime • UPI, Cards accepted
            </p>
          </CardContent>
        </Card>

        {/* Yearly Plan */}
        <Card className="relative border-primary bg-gradient-card shadow-primary">
          <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
            <Badge className="bg-gradient-primary text-primary-foreground font-semibold px-4 py-1">
              Most Popular - Save 17%
            </Badge>
          </div>
          
          <CardHeader className="pt-8">
            <CardTitle className="text-center">
              <div className="text-2xl font-bold">Yearly Plan</div>
              <div className="flex items-center justify-center gap-2 mt-2">
                <span className="text-lg text-muted-foreground line-through">₹1,188</span>
                <span className="text-3xl font-bold text-primary">₹999</span>
              </div>
              <div className="text-sm text-muted-foreground">per year</div>
              <div className="text-xs text-accent font-medium">Save ₹189 annually</div>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <Button className="w-full bg-gradient-primary hover:bg-gradient-hover text-primary-foreground shadow-primary">
              <Crown className="w-4 h-4 mr-2" />
              Start Yearly Plan
            </Button>
            <p className="text-xs text-center text-muted-foreground">
              Best value • UPI, Cards accepted
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Feature Comparison */}
      <Card className="max-w-4xl mx-auto">
        <CardHeader>
          <CardTitle className="text-center">Feature Comparison</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-3 px-4">Feature</th>
                  <th className="text-center py-3 px-4">
                    <div className="font-semibold">Free</div>
                  </th>
                  <th className="text-center py-3 px-4">
                    <div className="flex items-center justify-center gap-2">
                      <Crown className="w-4 h-4 text-primary" />
                      <span className="font-semibold text-primary">Premium</span>
                    </div>
                  </th>
                </tr>
              </thead>
              <tbody>
                {features.map((feature, index) => (
                  <tr key={index} className="border-b border-border/50">
                    <td className="py-3 px-4 font-medium">{feature.name}</td>
                    <td className="text-center py-3 px-4">
                      {feature.free ? (
                        <Check className="w-5 h-5 text-success mx-auto" />
                      ) : (
                        <X className="w-5 h-5 text-muted-foreground mx-auto" />
                      )}
                    </td>
                    <td className="text-center py-3 px-4">
                      {feature.premium ? (
                        <Check className="w-5 h-5 text-primary mx-auto" />
                      ) : (
                        <X className="w-5 h-5 text-muted-foreground mx-auto" />
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* Payment Methods */}
      <Card className="max-w-2xl mx-auto bg-gradient-card">
        <CardContent className="pt-6">
          <h3 className="text-center font-semibold mb-4">Secure Payment Methods</h3>
          <div className="flex justify-center items-center gap-8">
            <div className="text-center">
              <div className="w-12 h-12 bg-accent/20 rounded-full flex items-center justify-center mx-auto mb-2">
                <span className="text-accent font-bold">UPI</span>
              </div>
              <div className="text-xs text-muted-foreground">UPI Payments</div>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-2">
                <span className="text-primary font-bold">💳</span>
              </div>
              <div className="text-xs text-muted-foreground">Cards</div>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-success/20 rounded-full flex items-center justify-center mx-auto mb-2">
                <span className="text-success font-bold">NB</span>
              </div>
              <div className="text-xs text-muted-foreground">Net Banking</div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}