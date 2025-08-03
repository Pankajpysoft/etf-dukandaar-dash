import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { TrendingUp, Brain, Bell, ArrowRight, ArrowLeft, Check } from "lucide-react";
import { cn } from "@/lib/utils";

const slides = [
  {
    id: 1,
    icon: TrendingUp,
    title: "Track Your Portfolio",
    subtitle: "Smart Portfolio Management",
    description: "Monitor your stocks and ETFs in real-time. Get comprehensive insights into your investment performance with beautiful charts and analytics.",
    features: ["Real-time price updates", "Performance analytics", "Sector allocation", "P&L tracking"],
    gradient: "bg-gradient-to-br from-primary/20 via-primary/10 to-background",
  },
  {
    id: 2,
    icon: Brain,
    title: "AI-Powered Insights",
    subtitle: "Intelligent Investment Guidance",
    description: "Get personalized recommendations powered by AI. Discover opportunities, manage risks, and optimize your portfolio with smart insights.",
    features: ["AI stock analysis", "Risk assessment", "Portfolio optimization", "Market predictions"],
    gradient: "bg-gradient-to-br from-info/20 via-info/10 to-background",
  },
  {
    id: 3,
    icon: Bell,
    title: "Smart Alerts",
    subtitle: "Never Miss Important Updates",
    description: "Stay informed with intelligent notifications. Get alerts via email or Telegram when your stocks hit targets or market conditions change.",
    features: ["Price alerts", "News notifications", "Telegram integration", "Custom triggers"],
    gradient: "bg-gradient-to-br from-success/20 via-success/10 to-background",
  },
];

export default function Onboarding() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const navigate = useNavigate();

  const nextSlide = () => {
    if (currentSlide < slides.length - 1) {
      setCurrentSlide(currentSlide + 1);
    } else {
      navigate("/");
    }
  };

  const prevSlide = () => {
    if (currentSlide > 0) {
      setCurrentSlide(currentSlide - 1);
    }
  };

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
  };

  const skipOnboarding = () => {
    navigate("/");
  };

  const slide = slides[currentSlide];
  const IconComponent = slide.icon;

  return (
    <div className={cn("min-h-screen flex items-center justify-center p-4 transition-all duration-700", slide.gradient)}>
      <div className="w-full max-w-4xl">
        <Card className="bg-card/80 backdrop-blur-sm shadow-xl border-0">
          <CardContent className="p-0">
            <div className="grid md:grid-cols-2 min-h-[600px]">
              {/* Left side - Content */}
              <div className="p-8 md:p-12 flex flex-col justify-center">
                <div className="mb-8">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-12 h-12 bg-gradient-primary rounded-xl flex items-center justify-center">
                      <IconComponent className="w-6 h-6 text-primary-foreground" />
                    </div>
                    <Badge variant="secondary" className="px-3 py-1">
                      {slide.subtitle}
                    </Badge>
                  </div>
                  
                  <h1 className="text-4xl font-bold text-foreground mb-4 leading-tight">
                    {slide.title}
                  </h1>
                  
                  <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
                    {slide.description}
                  </p>

                  <div className="space-y-3">
                    {slide.features.map((feature, index) => (
                      <div key={index} className="flex items-center gap-3">
                        <div className="w-5 h-5 bg-success rounded-full flex items-center justify-center">
                          <Check className="w-3 h-3 text-success-foreground" />
                        </div>
                        <span className="text-foreground">{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Navigation */}
                <div className="space-y-6">
                  <div className="flex items-center gap-2">
                    {slides.map((_, index) => (
                      <button
                        key={index}
                        onClick={() => goToSlide(index)}
                        className={cn(
                          "w-3 h-3 rounded-full transition-all duration-300",
                          index === currentSlide 
                            ? "bg-primary w-8" 
                            : "bg-muted hover:bg-muted-foreground/30"
                        )}
                      />
                    ))}
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex gap-3">
                      {currentSlide > 0 && (
                        <Button variant="outline" onClick={prevSlide}>
                          <ArrowLeft className="w-4 h-4 mr-2" />
                          Previous
                        </Button>
                      )}
                      <Button variant="ghost" onClick={skipOnboarding}>
                        Skip
                      </Button>
                    </div>

                    <Button onClick={nextSlide} className="bg-gradient-primary">
                      {currentSlide === slides.length - 1 ? "Get Started" : "Next"}
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </Button>
                  </div>
                </div>
              </div>

              {/* Right side - Illustration */}
              <div className="hidden md:flex items-center justify-center p-12 bg-gradient-to-br from-muted/50 to-muted/20">
                <div className="w-full h-full rounded-2xl bg-gradient-card flex items-center justify-center">
                  <IconComponent className="w-32 h-32 text-primary/30" />
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}