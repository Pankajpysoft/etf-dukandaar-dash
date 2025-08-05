import { Search, Bell, User, Settings, CreditCard, LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";
import { useNavigate } from "react-router-dom";

export function Header() {
  const navigate = useNavigate();

  const handleProfileClick = () => {
    navigate('/settings');
  };

  const handleSettingsClick = () => {
    navigate('/settings');
  };

  const handleBillingClick = () => {
    navigate('/upgrade');
  };

  const handleLogout = () => {
    // Mock logout
    console.log('Logging out...');
  };

  return (
    <header className="h-16 border-b border-border bg-card px-6 flex items-center justify-between shadow-sm">
      {/* Search */}
      <div className="flex items-center flex-1 max-w-md">
        <div className="relative w-full">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            placeholder="Search stocks, ETFs..."
            className="pl-10 bg-background border-border"
          />
        </div>
      </div>

      {/* Right side */}
      <div className="flex items-center space-x-4">
        {/* Notifications */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" className="relative">
              <Bell className="w-5 h-5" />
              <Badge className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 text-xs bg-destructive text-destructive-foreground">
                3
              </Badge>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-80">
            <div className="p-3 border-b border-border">
              <h3 className="font-semibold text-foreground">Notifications</h3>
            </div>
            <div className="p-2">
              <div className="space-y-2">
                <div className="p-3 hover:bg-secondary rounded-md cursor-pointer">
                  <div className="flex items-center justify-between">
                    <p className="text-sm font-medium text-foreground">TCS up 2.5%</p>
                    <span className="text-xs text-success">+₹45</span>
                  </div>
                  <p className="text-xs text-muted-foreground mt-1">2 minutes ago</p>
                </div>
                <div className="p-3 hover:bg-secondary rounded-md cursor-pointer">
                  <div className="flex items-center justify-between">
                    <p className="text-sm font-medium text-foreground">ITC down 3%</p>
                    <span className="text-xs text-destructive">-₹12</span>
                  </div>
                  <p className="text-xs text-muted-foreground mt-1">15 minutes ago</p>
                </div>
                <div className="p-3 hover:bg-secondary rounded-md cursor-pointer">
                  <p className="text-sm font-medium text-foreground">Weekly digest ready</p>
                  <p className="text-xs text-muted-foreground mt-1">1 hour ago</p>
                </div>
              </div>
            </div>
          </DropdownMenuContent>
        </DropdownMenu>

        {/* User menu */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon">
              <User className="w-5 h-5" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56">
            <DropdownMenuItem onClick={handleProfileClick} className="cursor-pointer">
              <User className="mr-2 h-4 w-4" />
              Profile
            </DropdownMenuItem>
            <DropdownMenuItem onClick={handleSettingsClick} className="cursor-pointer">
              <Settings className="mr-2 h-4 w-4" />
              Settings
            </DropdownMenuItem>
            <DropdownMenuItem onClick={handleBillingClick} className="cursor-pointer">
              <CreditCard className="mr-2 h-4 w-4" />
              Billing
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={handleLogout} className="text-destructive cursor-pointer">
              <LogOut className="mr-2 h-4 w-4" />
              Logout
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}