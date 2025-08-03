import { Bot, Lightbulb, TrendingUp, AlertTriangle } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { PremiumBadge } from "@/components/ui/premium-badge";
import { PremiumWrapper } from "@/components/premium/PremiumWrapper";

interface Insight {
  id: string;
  type: "recommendation" | "warning" | "opportunity";
  title: string;
  description: string;
  confidence: number;
  action?: string;
}

const insights: Insight[] = [
  {
    id: "1",
    type: "recommendation",
    title: "Consider Rebalancing IT Sector",
    description: "Your IT allocation is 35% - above optimal range. Consider reducing exposure to maintain diversification.",
    confidence: 85,
    action: "View Suggestions",
  },
  {
    id: "2",
    type: "opportunity",
    title: "Banking Stocks Undervalued",
    description: "HDFC Bank and ICICI show strong fundamentals with current PE below historical average.",
    confidence: 72,
    action: "Add to Watchlist",
  },
  {
    id: "3",
    type: "warning",
    title: "High Concentration Risk",
    description: "Top 3 holdings represent 65% of portfolio. Consider diversifying to reduce concentration risk.",
    confidence: 91,
    action: "View Details",
  },
];

function getInsightIcon(type: Insight["type"]) {
  switch (type) {
    case "recommendation":
      return Lightbulb;
    case "opportunity":
      return TrendingUp;
    case "warning":
      return AlertTriangle;
    default:
      return Bot;
  }
}

function getInsightColor(type: Insight["type"]) {
  switch (type) {
    case "recommendation":
      return "bg-info text-info-foreground";
    case "opportunity":
      return "bg-success text-success-foreground";
    case "warning":
      return "bg-warning text-warning-foreground";
    default:
      return "bg-secondary text-secondary-foreground";
  }
}

export function AIInsights() {
  return (
    <Card className="bg-gradient-card shadow-lg">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="text-foreground flex items-center gap-2">
          <Bot className="w-5 h-5 text-primary" />
          AI Insights
          <PremiumBadge />
        </CardTitle>
        <Badge variant="secondary" className="bg-primary text-primary-foreground">
          Smart Analysis
        </Badge>
      </CardHeader>
      <CardContent>
        <PremiumWrapper 
          feature="AI-Powered Insights" 
          description="Get intelligent analysis and recommendations based on your portfolio performance and market trends."
        >
          <div className="space-y-4">
            {insights.map((insight) => {
              const Icon = getInsightIcon(insight.type);
              return (
                <div
                  key={insight.id}
                  className="p-4 bg-background rounded-lg border border-border hover:shadow-md transition-shadow"
                >
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center space-x-2">
                      <div className={`p-2 rounded-full ${getInsightColor(insight.type)}`}>
                        <Icon className="w-4 h-4" />
                      </div>
                      <h4 className="font-semibold text-foreground">{insight.title}</h4>
                    </div>
                    <Badge variant="outline" className="text-xs">
                      {insight.confidence}% confidence
                    </Badge>
                  </div>
                  <p className="text-sm text-muted-foreground mb-3 leading-relaxed">
                    {insight.description}
                  </p>
                  {insight.action && (
                    <Button variant="outline" size="sm" className="text-xs">
                      {insight.action}
                    </Button>
                  )}
                </div>
              );
            })}
          </div>
          <div className="mt-4 pt-4 border-t border-border">
            <Button variant="ghost" className="w-full text-primary hover:text-primary-foreground hover:bg-primary">
              View All AI Insights
            </Button>
          </div>
        </PremiumWrapper>
      </CardContent>
    </Card>
  );
}