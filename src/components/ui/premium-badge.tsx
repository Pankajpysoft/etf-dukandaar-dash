import { Badge } from "@/components/ui/badge";
import { Crown, Lock } from "lucide-react";
import { cn } from "@/lib/utils";

interface PremiumBadgeProps {
  variant?: "premium" | "locked";
  className?: string;
}

export function PremiumBadge({ variant = "premium", className }: PremiumBadgeProps) {
  return (
    <Badge 
      variant="outline" 
      className={cn(
        "text-xs font-medium border-accent/30 bg-gradient-primary text-primary-foreground",
        variant === "locked" && "bg-muted/50 text-muted-foreground border-muted",
        className
      )}
    >
      {variant === "premium" ? (
        <>
          <Crown className="w-3 h-3 mr-1" />
          Premium
        </>
      ) : (
        <>
          <Lock className="w-3 h-3 mr-1" />
          Premium Only
        </>
      )}
    </Badge>
  );
}