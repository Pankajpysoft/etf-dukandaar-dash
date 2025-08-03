import { MetricsCards } from "@/components/dashboard/MetricsCards";
import { PortfolioChart } from "@/components/dashboard/PortfolioChart";
import { RecentAlerts } from "@/components/dashboard/RecentAlerts";
import { AIInsights } from "@/components/dashboard/AIInsights";
import { TopPerformers } from "@/components/dashboard/TopPerformers";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const Index = () => {
  return (
    <div className="p-6 space-y-6 animate-slide-up">
      {/* Welcome Section */}
      <div className="flex items-center justify-between p-6 rounded-xl bg-gradient-card border border-primary/20 shadow-lg hover:shadow-glow transition-all duration-300">
        <div>
          <h1 className="text-3xl font-bold text-gradient-primary animate-glow-pulse">
            Welcome back, Demo User!
          </h1>
          <p className="text-muted-foreground mt-1 text-lg">
            Here's what's happening with your portfolio today.
          </p>
        </div>
        <div className="text-right p-4 bg-gradient-hover rounded-lg border border-primary/10">
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

      {/* Main Content Tabs */}
      <Tabs defaultValue="overview" className="space-y-6">
        <TabsList className="grid w-full grid-cols-5 lg:w-auto bg-gradient-card border border-primary/20 shadow-lg">
          <TabsTrigger value="overview" className="data-[state=active]:bg-gradient-primary data-[state=active]:text-primary-foreground">Overview</TabsTrigger>
          <TabsTrigger value="portfolio" className="data-[state=active]:bg-gradient-primary data-[state=active]:text-primary-foreground">Portfolio</TabsTrigger>
          <TabsTrigger value="watchlist" className="data-[state=active]:bg-gradient-primary data-[state=active]:text-primary-foreground">Watchlist</TabsTrigger>
          <TabsTrigger value="insights" className="data-[state=active]:bg-gradient-primary data-[state=active]:text-primary-foreground">Insights</TabsTrigger>
          <TabsTrigger value="screener" className="data-[state=active]:bg-gradient-primary data-[state=active]:text-primary-foreground">Screener</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            <PortfolioChart />
            <RecentAlerts />
            <TopPerformers />
          </div>
          <AIInsights />
        </TabsContent>

        <TabsContent value="portfolio" className="space-y-6">
          <div className="text-center py-20 text-muted-foreground">
            Portfolio management coming soon...
          </div>
        </TabsContent>

        <TabsContent value="watchlist" className="space-y-6">
          <div className="text-center py-20 text-muted-foreground">
            Watchlist coming soon...
          </div>
        </TabsContent>

        <TabsContent value="insights" className="space-y-6">
          <div className="text-center py-20 text-muted-foreground">
            Advanced insights coming soon...
          </div>
        </TabsContent>

        <TabsContent value="screener" className="space-y-6">
          <div className="text-center py-20 text-muted-foreground">
            Stock screener coming soon...
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Index;
