import { MetricsCards } from "@/components/dashboard/MetricsCards";
import { PortfolioChart } from "@/components/dashboard/PortfolioChart";
import { RecentAlerts } from "@/components/dashboard/RecentAlerts";
import { TopPerformers } from "@/components/dashboard/TopPerformers";

const Index = () => {
  return (
    <div className="p-6 space-y-6 animate-fade-in">
      {/* Welcome Section */}
      <div className="flex items-center justify-between p-6 rounded-xl bg-gradient-card border border-primary/20 shadow-elegant hover:shadow-glow transition-all duration-300">
        <div>
          <h1 className="text-3xl font-bold bg-gradient-primary bg-clip-text text-transparent">
            Welcome back, Demo User!
          </h1>
          <p className="text-muted-foreground mt-1 text-lg">
            Here's what's happening with your portfolio today.
          </p>
        </div>
        <div className="text-right p-4 bg-gradient-soft rounded-lg border border-primary/10">
          <p className="text-sm text-muted-foreground">Last updated</p>
          <p className="text-sm font-medium text-foreground">
            {new Date().toLocaleTimeString('en-IN', { 
              hour: '2-digit', 
              minute: '2-digit',
              hour12: true 
            })}
          </p>
          <div className="w-2 h-2 bg-success rounded-full mt-1 animate-pulse mx-auto"></div>
        </div>
      </div>

      {/* Metrics Cards */}
      <MetricsCards />

      {/* Main Dashboard Content */}
      <div className="space-y-6">
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          <PortfolioChart />
          <RecentAlerts />
          <TopPerformers />
        </div>
      </div>
    </div>
  );
};

export default Index;
