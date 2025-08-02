import { MetricsCards } from "@/components/dashboard/MetricsCards";
import { PortfolioChart } from "@/components/dashboard/PortfolioChart";
import { RecentAlerts } from "@/components/dashboard/RecentAlerts";
import { AIInsights } from "@/components/dashboard/AIInsights";
import { TopPerformers } from "@/components/dashboard/TopPerformers";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const Index = () => {
  return (
    <div className="p-6 space-y-6">
      {/* Welcome Section */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Welcome back, John!</h1>
          <p className="text-muted-foreground mt-1">
            Here's what's happening with your portfolio today.
          </p>
        </div>
        <div className="text-right">
          <p className="text-sm text-muted-foreground">Last updated</p>
          <p className="text-sm font-medium text-foreground">
            {new Date().toLocaleTimeString('en-IN', { 
              hour: '2-digit', 
              minute: '2-digit',
              hour12: true 
            })}
          </p>
        </div>
      </div>

      {/* Metrics Cards */}
      <MetricsCards />

      {/* Main Content Tabs */}
      <Tabs defaultValue="overview" className="space-y-6">
        <TabsList className="grid w-full grid-cols-5 lg:w-auto">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="portfolio">Portfolio</TabsTrigger>
          <TabsTrigger value="watchlist">Watchlist</TabsTrigger>
          <TabsTrigger value="insights">Insights</TabsTrigger>
          <TabsTrigger value="screener">Screener</TabsTrigger>
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
