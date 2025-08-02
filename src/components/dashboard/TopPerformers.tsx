import { TrendingUp, Star } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

interface Stock {
  symbol: string;
  name: string;
  price: number;
  change: number;
  changePercent: number;
  volume: string;
}

const topPerformers: Stock[] = [
  {
    symbol: "TCS",
    name: "Tata Consultancy Services",
    price: 3245.50,
    change: 78.25,
    changePercent: 2.47,
    volume: "2.3M",
  },
  {
    symbol: "INFY",
    name: "Infosys Limited",
    price: 1567.80,
    change: 34.60,
    changePercent: 2.26,
    volume: "4.1M",
  },
  {
    symbol: "HDFC",
    name: "HDFC Bank Limited",
    price: 1456.30,
    change: 28.90,
    changePercent: 2.02,
    volume: "1.8M",
  },
];

export function TopPerformers() {
  return (
    <Card className="bg-gradient-card shadow-lg">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="text-foreground flex items-center">
          <Star className="w-5 h-5 mr-2 text-warning" />
          Top Performers Today
        </CardTitle>
        <Badge variant="secondary" className="bg-success text-success-foreground">
          Trending Up
        </Badge>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {topPerformers.map((stock, index) => (
            <div
              key={stock.symbol}
              className="flex items-center justify-between p-3 bg-background rounded-lg border border-border hover:shadow-md transition-shadow"
            >
              <div className="flex items-center space-x-3">
                <div className="flex items-center justify-center w-8 h-8 bg-gradient-primary rounded-full text-primary-foreground font-bold text-sm">
                  {index + 1}
                </div>
                <div>
                  <div className="flex items-center space-x-2">
                    <span className="font-semibold text-foreground">{stock.symbol}</span>
                    <TrendingUp className="w-4 h-4 text-success" />
                  </div>
                  <p className="text-xs text-muted-foreground truncate max-w-[150px]">
                    {stock.name}
                  </p>
                </div>
              </div>
              <div className="text-right">
                <div className="font-semibold text-foreground">₹{stock.price.toFixed(2)}</div>
                <div className="flex items-center space-x-1">
                  <span className="text-xs text-success">+₹{stock.change.toFixed(2)}</span>
                  <span className="text-xs text-success">({stock.changePercent}%)</span>
                </div>
                <div className="text-xs text-muted-foreground">Vol: {stock.volume}</div>
              </div>
            </div>
          ))}
        </div>
        <div className="mt-4 pt-4 border-t border-border">
          <Button variant="outline" className="w-full">
            View All Stocks
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}