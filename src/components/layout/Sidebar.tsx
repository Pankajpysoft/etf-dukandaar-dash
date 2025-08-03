import { useState } from "react";
import { NavLink } from "react-router-dom";
import {
  BarChart3,
  TrendingUp,
  Eye,
  Search,
  PieChart,
  FileText,
  Bell,
  Settings,
  ChevronLeft,
  ChevronRight,
  LogOut,
  Crown,
} from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";

const menuItems = [
  { title: "Dashboard", url: "/", icon: BarChart3 },
  { title: "Portfolio", url: "/portfolio", icon: TrendingUp },
  { title: "Screener", url: "/screener", icon: Search },
  { title: "Insights", url: "/insights", icon: PieChart },
  { title: "Alerts", url: "/alerts", icon: Bell },
  { title: "Reports", url: "/reports", icon: FileText },
  { title: "Settings", url: "/settings", icon: Settings },
];

export function Sidebar() {
  const [collapsed, setCollapsed] = useState(false);
  const { user, signOut } = useAuth();

  return (
    <div
      className={cn(
        "h-screen bg-gradient-card border-r border-border transition-all duration-300 flex flex-col shadow-lg",
        collapsed ? "w-16" : "w-64"
      )}
    >
      {/* Header */}
      <div className="p-4 border-b border-border flex items-center justify-between">
        {!collapsed && (
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-primary rounded-lg flex items-center justify-center shadow-glow animate-glow-pulse">
              <TrendingUp className="w-5 h-5 text-primary-foreground" />
            </div>
            <div>
              <h1 className="font-bold text-lg text-foreground">ETF Ki Dukaan</h1>
              <p className="text-xs text-muted-foreground">Portfolio Tracker</p>
            </div>
          </div>
        )}
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setCollapsed(!collapsed)}
          className="h-8 w-8"
        >
          {collapsed ? (
            <ChevronRight className="h-4 w-4" />
          ) : (
            <ChevronLeft className="h-4 w-4" />
          )}
        </Button>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4 space-y-4">
        <ul className="space-y-2">
          {menuItems.map((item) => (
            <li key={item.title}>
              <NavLink
                to={item.url}
                end={item.url === "/"}
                className={({ isActive }) =>
                  cn(
                    "flex items-center space-x-3 px-3 py-2.5 rounded-lg transition-all duration-300 group relative hover:scale-105",
                    isActive
                      ? "bg-gradient-primary text-primary-foreground shadow-primary animate-scale-in"
                      : "text-muted-foreground hover:text-foreground hover:bg-gradient-hover"
                  )
                }
              >
                <item.icon className="w-5 h-5 flex-shrink-0" />
                {!collapsed && <span className="font-medium">{item.title}</span>}
                {collapsed && (
                   <div className="absolute left-full ml-2 px-2 py-1 bg-popover border border-border rounded-md shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 animate-scale-in z-50">
                     <span className="text-sm font-medium text-popover-foreground whitespace-nowrap">
                       {item.title}
                     </span>
                   </div>
                )}
              </NavLink>
            </li>
          ))}
        </ul>

        {/* Premium Upgrade Card */}
        {!collapsed && (
          <Card className="bg-gradient-primary text-primary-foreground shadow-glow animate-glow-pulse">
            <CardContent className="p-4">
              <div className="flex items-center gap-2 mb-2">
                <Crown className="h-5 w-5" />
                <span className="font-semibold">Go Premium</span>
              </div>
              <p className="text-xs text-primary-foreground/80 mb-3">
                Unlock AI insights, alerts & advanced features
              </p>
              <NavLink to="/upgrade">
                <Button 
                  size="sm" 
                  className="w-full bg-primary-foreground text-primary hover:bg-primary-foreground/90 font-medium"
                >
                  ₹99/month
                </Button>
              </NavLink>
            </CardContent>
          </Card>
        )}
      </nav>

      {/* Footer */}
      <div className="p-4 border-t border-border space-y-2">
        {!collapsed ? (
          <>
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-secondary rounded-full flex items-center justify-center">
                <span className="text-sm font-medium text-secondary-foreground">
                  {user?.email?.[0]?.toUpperCase() || 'U'}
                </span>
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-foreground truncate">
                  {user?.user_metadata?.full_name || user?.email}
                </p>
                <p className="text-xs text-muted-foreground truncate">Free Plan</p>
              </div>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={signOut}
              className="w-full justify-start text-muted-foreground hover:text-foreground"
            >
              <LogOut className="w-4 h-4 mr-2" />
              Sign Out
            </Button>
          </>
        ) : (
          <div className="flex flex-col items-center space-y-2">
            <div className="w-8 h-8 bg-secondary rounded-full flex items-center justify-center">
              <span className="text-sm font-medium text-secondary-foreground">
                {user?.email?.[0]?.toUpperCase() || 'U'}
              </span>
            </div>
            <Button
              variant="ghost"
              size="icon"
              onClick={signOut}
              className="w-8 h-8"
            >
              <LogOut className="w-4 h-4" />
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}