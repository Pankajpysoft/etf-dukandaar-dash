import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Check, X, Crown, Zap, Shield, TrendingUp, Star } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const plans = [
  {
    name: "Free",
    price: "₹0",
    period: "forever",
    description: "Perfect for getting started",
    features: [
      "Basic portfolio tracking",
      "5 ETF watchlist",
      "Monthly reports",
      "Basic alerts",
      "Community support"
    ],
    limitations: [
      "Limited to 5 ETFs",
      "No AI insights",
      "No advanced alerts",
      "No premium support"
    ],
    current: true
  },
  {
    name: "Premium",
    price: "₹99",
    period: "month",
    description: "Everything you need for serious investing",
    features: [
      "Unlimited ETF tracking",
      "AI-powered insights",
      "Advanced alerts & notifications",
      "Real-time portfolio analysis",
      "Custom reports & exports",
      "Telegram bot integration",
      "Priority support",
      "Tax optimization suggestions",
      "Risk analysis tools",
      "Performance benchmarking"
    ],
    popular: true,
    savings: "Most Popular"
  },
  {
    name: "Pro",
    price: "₹199",
    period: "month",
    description: "For professional investors and advisors",
    features: [
      "Everything in Premium",
      "Multi-portfolio management",
      "Client portfolio tracking",
      "White-label reports",
      "API access",
      "Advanced analytics",
      "Custom dashboards",
      "Dedicated account manager",
      "1-on-1 consultation calls",
      "Early access to new features"
    ],
    enterprise: true
  }
];

const benefits = [
  {
    icon: TrendingUp,
    title: "Smart Portfolio Insights",
    description: "Get AI-powered recommendations to optimize your ETF portfolio performance"
  },
  {
    icon: Zap,
    title: "Real-time Alerts",
    description: "Never miss important market movements with instant Telegram notifications"
  },
  {
    icon: Shield,
    title: "Risk Management",
    description: "Advanced risk analysis tools to protect and grow your investments"
  },
  {
    icon: Star,
    title: "Premium Support",
    description: "Get priority support and expert guidance for your investment journey"
  }
];

export function Upgrade() {
  const [selectedPlan, setSelectedPlan] = useState<string>("Premium");
  const [billingCycle, setBillingCycle] = useState<"monthly" | "yearly">("monthly");
  const { toast } = useToast();

  const handleUpgrade = async (planName: string) => {
    try {
      // Simulate payment processing
      toast({
        title: "Upgrading to " + planName,
        description: "Redirecting to payment gateway...",
      });
      
      // In a real app, this would redirect to Stripe or payment processor
      setTimeout(() => {
        toast({
          title: "Payment Successful!",
          description: `Welcome to ${planName} plan! Your account has been upgraded.`,
        });
      }, 2000);
    } catch (error) {
      toast({
        title: "Payment Failed",
        description: "Please try again or contact support.",
        variant: "destructive",
      });
    }
  };

  const getDiscountedPrice = (price: string) => {
    if (billingCycle === "yearly") {
      const monthlyPrice = parseInt(price.replace("₹", ""));
      const yearlyPrice = monthlyPrice * 10; // 2 months free
      return `₹${yearlyPrice}`;
    }
    return price;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-primary/5 to-accent/10 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 bg-gradient-primary rounded-full px-4 py-2 mb-6 shadow-glow animate-glow-pulse">
            <Crown className="w-5 h-5 text-primary-foreground" />
            <span className="text-sm font-medium text-primary-foreground">Upgrade to Premium</span>
          </div>
          
          <h1 className="text-4xl font-bold text-gradient-primary mb-4 animate-fade-in">
            Unlock Advanced ETF Insights
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto animate-fade-in">
            Take your ETF investing to the next level with AI-powered insights, 
            real-time alerts, and professional-grade analytics.
          </p>
        </div>

        {/* Billing Toggle */}
        <div className="flex justify-center mb-8">
          <div className="bg-muted rounded-lg p-1 flex shadow-md">
            <button
              onClick={() => setBillingCycle("monthly")}
              className={`px-4 py-2 rounded-md text-sm font-medium transition-all duration-300 ${
                billingCycle === "monthly"
                  ? "bg-primary text-primary-foreground shadow-sm scale-105"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              Monthly
            </button>
            <button
              onClick={() => setBillingCycle("yearly")}
              className={`px-4 py-2 rounded-md text-sm font-medium transition-all duration-300 ${
                billingCycle === "yearly"
                  ? "bg-primary text-primary-foreground shadow-sm scale-105"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              <span>Yearly</span>
              <Badge variant="secondary" className="ml-2 text-xs animate-pulse">
                Save 20%
              </Badge>
            </button>
          </div>
        </div>

        {/* Benefits Section */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {benefits.map((benefit, index) => (
            <Card key={benefit.title} className="text-center border-0 bg-gradient-card shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 animate-fade-in" style={{ animationDelay: `${index * 100}ms` }}>
              <CardContent className="p-6">
                <div className="bg-gradient-primary rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-4 shadow-glow animate-glow-pulse">
                  <benefit.icon className="w-6 h-6 text-primary-foreground" />
                </div>
                <h3 className="font-semibold mb-2 text-foreground">{benefit.title}</h3>
                <p className="text-sm text-muted-foreground">{benefit.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Pricing Plans */}
        <div className="grid md:grid-cols-3 gap-8 mb-12">
          {plans.map((plan, index) => (
            <Card 
              key={plan.name}
              className={`relative transition-all duration-500 hover:scale-105 animate-fade-in ${
                plan.popular 
                  ? "border-primary bg-gradient-card shadow-glow border-2 scale-105" 
                  : plan.enterprise
                  ? "border-accent bg-gradient-card shadow-accent"
                  : "bg-card shadow-lg hover:shadow-xl"
              }`}
              style={{ animationDelay: `${index * 150}ms` }}
            >
              {plan.popular && (
                <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                  <Badge className="bg-gradient-primary text-primary-foreground border-0 shadow-glow animate-pulse">
                    {plan.savings}
                  </Badge>
                </div>
              )}
              
              {plan.current && (
                <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                  <Badge variant="outline" className="bg-background animate-pulse">
                    Current Plan
                  </Badge>
                </div>
              )}

              <CardHeader className="text-center pb-6">
                <CardTitle className="text-2xl font-bold text-foreground">{plan.name}</CardTitle>
                <CardDescription className="text-sm">{plan.description}</CardDescription>
                <div className="mt-4">
                  <span className="text-4xl font-bold text-gradient-primary">
                    {getDiscountedPrice(plan.price)}
                  </span>
                  <span className="text-muted-foreground">/{plan.period}</span>
                  {billingCycle === "yearly" && plan.price !== "₹0" && (
                    <div className="text-sm text-muted-foreground mt-1">
                      <span className="line-through">₹{parseInt(plan.price.replace("₹", "")) * 12}</span>
                      <span className="text-success ml-2 font-medium">Save ₹{parseInt(plan.price.replace("₹", "")) * 2}</span>
                    </div>
                  )}
                </div>
              </CardHeader>

              <CardContent className="space-y-4">
                <div className="space-y-3">
                  {plan.features.map((feature) => (
                    <div key={feature} className="flex items-center gap-3">
                      <Check className="w-4 h-4 text-success flex-shrink-0" />
                      <span className="text-sm text-foreground">{feature}</span>
                    </div>
                  ))}
                  {plan.limitations?.map((limitation) => (
                    <div key={limitation} className="flex items-center gap-3 opacity-60">
                      <X className="w-4 h-4 text-muted-foreground flex-shrink-0" />
                      <span className="text-sm text-muted-foreground">{limitation}</span>
                    </div>
                  ))}
                </div>

                <Separator />

                <Button
                  className={`w-full transition-all duration-300 ${
                    plan.current
                      ? "bg-muted text-muted-foreground cursor-not-allowed"
                      : plan.popular
                      ? "bg-gradient-primary hover:bg-gradient-hover text-primary-foreground shadow-primary hover:scale-105"
                      : plan.enterprise
                      ? "bg-gradient-cyber hover:bg-gradient-hover text-primary-foreground shadow-accent hover:scale-105"
                      : "bg-primary hover:bg-primary/90 hover:scale-105"
                  }`}
                  disabled={plan.current}
                  onClick={() => handleUpgrade(plan.name)}
                >
                  {plan.current ? "Current Plan" : `Upgrade to ${plan.name}`}
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Features Comparison */}
        <Card className="bg-gradient-card shadow-lg animate-fade-in">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl text-foreground">Feature Comparison</CardTitle>
            <CardDescription>Compare all features across different plans</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-border">
                    <th className="text-left py-3 px-4 font-medium text-foreground">Features</th>
                    <th className="text-center py-3 px-4 font-medium text-foreground">Free</th>
                    <th className="text-center py-3 px-4 font-medium text-foreground">Premium</th>
                    <th className="text-center py-3 px-4 font-medium text-foreground">Pro</th>
                  </tr>
                </thead>
                <tbody className="text-sm">
                  {[
                    ["Portfolio Tracking", "5 ETFs", "Unlimited", "Unlimited"],
                    ["AI Insights", "❌", "✅", "✅"],
                    ["Real-time Alerts", "Basic", "Advanced", "Advanced"],
                    ["Telegram Integration", "❌", "✅", "✅"],
                    ["Custom Reports", "❌", "✅", "✅"],
                    ["Multi Portfolio", "❌", "❌", "✅"],
                    ["API Access", "❌", "❌", "✅"],
                    ["Priority Support", "❌", "✅", "✅"],
                    ["Dedicated Manager", "❌", "❌", "✅"]
                  ].map(([feature, free, premium, pro], index) => (
                    <tr key={feature} className="border-b border-border/50 hover:bg-muted/30 transition-colors">
                      <td className="py-3 px-4 font-medium text-foreground">{feature}</td>
                      <td className="text-center py-3 px-4 text-muted-foreground">{free}</td>
                      <td className="text-center py-3 px-4 text-primary font-medium">{premium}</td>
                      <td className="text-center py-3 px-4 text-accent font-medium">{pro}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>

        {/* Payment Methods */}
        <div className="text-center mt-12 animate-fade-in">
          <p className="text-sm text-muted-foreground mb-4">Secure payment powered by</p>
          <div className="flex justify-center items-center gap-8">
            <div className="bg-gradient-primary text-primary-foreground px-4 py-2 rounded-lg font-medium shadow-glow hover:scale-105 transition-transform">Stripe</div>
            <div className="bg-gradient-secondary text-secondary-foreground px-4 py-2 rounded-lg font-medium shadow-md hover:scale-105 transition-transform">Razorpay</div>
            <div className="bg-gradient-success text-success-foreground px-4 py-2 rounded-lg font-medium shadow-md hover:scale-105 transition-transform">UPI</div>
          </div>
        </div>
      </div>
    </div>
  );
}