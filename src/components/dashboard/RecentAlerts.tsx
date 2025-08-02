import { Bell, TrendingUp, TrendingDown, AlertCircle } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

interface Alert {
  id: string;
  stock: string;
  message: string;
  type: "gain" | "loss" | "info";
  time: string;
  value: string;
}

const alerts: Alert[] = [
  {
    id: "1",
    stock: "TCS",
    message: "Crossed resistance level",
    type: "gain",
    time: "2 min ago",
    value: "+2.5%",
  },
  {
    id: "2",
    stock: "ITC",
    message: "Below 200 DMA",
    type: "loss",
    time: "15 min ago",
    value: "-3.2%",
  },
  {
    id: "3",
    stock: "INFY",
    message: "High volume spike",
    type: "info",
    time: "1 hour ago",
    value: "+1.2%",
  },
  {
    id: "4",
    stock: "HDFC",
    message: "Dividend announcement",
    type: "info",
    time: "2 hours ago",
    value: "+0.8%",
  },
];

function getAlertIcon(type: Alert["type"]) {
  switch (type) {
    case "gain":
      return TrendingUp;
    case "loss":
      return TrendingDown;
    default:
      return AlertCircle;
  }
}

function getAlertColor(type: Alert["type"]) {
  switch (type) {
    case "gain":
      return "text-success";
    case "loss":
      return "text-destructive";
    default:
      return "text-info";
  }
}

export function RecentAlerts() {
  return (
    <Card className="bg-gradient-card shadow-lg">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="text-foreground flex items-center">
          <Bell className="w-5 h-5 mr-2" />
          Recent Alerts
        </CardTitle>
        <Badge variant="secondary" className="text-xs">
          {alerts.length} new
        </Badge>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {alerts.map((alert) => {
            const Icon = getAlertIcon(alert.type);
            return (
              <div
                key={alert.id}
                className="flex items-center justify-between p-3 bg-background rounded-lg border border-border hover:shadow-md transition-shadow"
              >
                <div className="flex items-center space-x-3">
                  <div className={cn("p-2 rounded-full bg-secondary", getAlertColor(alert.type))}>
                    <Icon className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="flex items-center space-x-2">
                      <span className="font-semibold text-foreground">{alert.stock}</span>
                      <span className={cn("text-sm font-medium", getAlertColor(alert.type))}>
                        {alert.value}
                      </span>
                    </div>
                    <p className="text-sm text-muted-foreground">{alert.message}</p>
                  </div>
                </div>
                <span className="text-xs text-muted-foreground">{alert.time}</span>
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}