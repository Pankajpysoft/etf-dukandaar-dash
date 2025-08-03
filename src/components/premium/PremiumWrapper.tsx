import { ReactNode } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { PremiumBadge } from "@/components/ui/premium-badge";
import { useAuth } from "@/hooks/useAuth";
import { Crown } from "lucide-react";
import { cn } from "@/lib/utils";

interface PremiumWrapperProps {
  children: ReactNode;
  feature: string;
  description?: string;
  showUpgrade?: boolean;
  className?: string;
}

export function PremiumWrapper({ 
  children, 
  feature, 
  description, 
  showUpgrade = true,
  className 
}: PremiumWrapperProps) {
  const { user } = useAuth();
  
  // For now, we'll assume user is not premium. In real app, check user.is_premium
  const isPremium = false; // TODO: Check actual premium status from user data
  
  if (isPremium) {
    return <>{children}</>;
  }

  return (
    <div className={cn("relative", className)}>
      <div className="relative overflow-hidden">
        {/* Blurred content */}
        <div className="filter blur-sm opacity-50 pointer-events-none">
          {children}
        </div>
        
        {/* Premium overlay */}
        <div className="absolute inset-0 bg-gradient-card/80 backdrop-blur-sm flex flex-col items-center justify-center p-6 text-center">
          <div className="bg-gradient-primary rounded-full p-3 mb-4 shadow-glow">
            <Crown className="w-6 h-6 text-primary-foreground" />
          </div>
          
          <PremiumBadge variant="locked" className="mb-3" />
          
          <h3 className="text-lg font-semibold text-foreground mb-2">
            {feature}
          </h3>
          
          {description && (
            <p className="text-sm text-muted-foreground mb-4 max-w-sm">
              {description}
            </p>
          )}
          
          {showUpgrade && (
            <div className="space-y-2">
              <Button 
                size="sm" 
                className="bg-gradient-primary hover:bg-gradient-hover text-primary-foreground font-medium shadow-primary"
              >
                Upgrade to Premium - ₹99/month
              </Button>
              <p className="text-xs text-muted-foreground">
                Unlock this and all premium features
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}