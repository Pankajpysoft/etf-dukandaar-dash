import { TrendingUp, TrendingDown, DollarSign, Percent } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface MetricCardProps {
  title: string;
  value: string;
  change: string;
  isPositive: boolean;
  icon: React.ElementType;
}

function MetricCard({ title, value, change, isPositive, icon: Icon }: MetricCardProps) {
  return (
    <Card className="bg-gradient-card shadow-lg hover:shadow-glow transition-all duration-300 border border-primary/20 animate-scale-hover group">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium text-muted-foreground group-hover:text-foreground transition-colors">
          {title}
        </CardTitle>
        <div className="p-2 rounded-lg bg-gradient-hover group-hover:bg-gradient-primary transition-all duration-300">
          <Icon className="h-4 w-4 text-muted-foreground group-hover:text-primary-foreground transition-colors" />
        </div>
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold text-foreground group-hover:text-gradient-primary transition-all duration-300">
          {value}
        </div>
        <div className="flex items-center mt-1">
          {isPositive ? (
            <TrendingUp className="h-4 w-4 text-success mr-1 animate-pulse" />
          ) : (
            <TrendingDown className="h-4 w-4 text-destructive mr-1 animate-pulse" />
          )}
          <span
            className={cn(
              "text-xs font-medium",
              isPositive ? "text-success" : "text-destructive"
            )}
          >
            {change}
          </span>
          <span className="text-xs text-muted-foreground ml-1">from yesterday</span>
        </div>
      </CardContent>
    </Card>
  );
}

export function MetricsCards() {
  const metrics = [
    {
      title: "Total Investment",
      value: "₹2,45,000",
      change: "+2.5%",
      isPositive: true,
      icon: DollarSign,
    },
    {
      title: "Current Value",
      value: "₹2,78,500",
      change: "+1.8%",
      isPositive: true,
      icon: TrendingUp,
    },
    {
      title: "Daily Gain/Loss",
      value: "₹4,250",
      change: "-0.5%",
      isPositive: false,
      icon: TrendingDown,
    },
    {
      title: "Overall Returns",
      value: "13.67%",
      change: "+0.3%",
      isPositive: true,
      icon: Percent,
    },
  ];

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      {metrics.map((metric, index) => (
        <div 
          key={index} 
          className="animate-slide-up" 
          style={{ animationDelay: `${index * 100}ms` }}
        >
          <MetricCard {...metric} />
        </div>
      ))}
    </div>
  );
}