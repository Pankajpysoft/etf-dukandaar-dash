import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage, FormDescription } from '@/components/ui/form';
import { Switch } from '@/components/ui/switch';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { 
  Bell, 
  Mail, 
  MessageSquare, 
  TrendingUp, 
  AlertTriangle, 
  Calendar,
  Bot,
  Shield,
  Zap,
  Clock,
  CheckCircle2,
  Settings,
  Globe,
  Smartphone,
  PieChart
} from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';
import { toast } from 'sonner';
import { PremiumBadge } from '@/components/ui/premium-badge';
import { PremiumWrapper } from '@/components/premium/PremiumWrapper';

const alertsSchema = z.object({
  dailyDigest: z.boolean(),
  telegramAlerts: z.boolean(),
  emailSummary: z.boolean(),
  priceAlerts: z.boolean(),
  portfolioAlerts: z.boolean(),
  newsAlerts: z.boolean(),
  
  // Frequencies
  digestFrequency: z.enum(['daily', 'weekly', 'monthly']),
  alertFrequency: z.enum(['immediate', 'hourly', 'daily']),
  bigMoveThreshold: z.number().min(1).max(50),
  
  // Contact details
  telegramBotToken: z.string().optional(),
  telegramChatId: z.string().optional(),
  emailAddress: z.string().email().optional(),
  
  // Advanced settings
  marketHours: z.boolean(),
  weekendAlerts: z.boolean(),
  riskAlerts: z.boolean(),
  performanceAlerts: z.boolean(),
});

interface AlertHistory {
  id: string;
  type: 'price' | 'portfolio' | 'news' | 'risk';
  title: string;
  message: string;
  timestamp: string;
  severity: 'low' | 'medium' | 'high';
  acknowledged: boolean;
}

export default function Alerts() {
  const { user } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [alertHistory, setAlertHistory] = useState<AlertHistory[]>([]);
  const [activeAlerts, setActiveAlerts] = useState(3);
  const [telegramConnected, setTelegramConnected] = useState(false);

  const form = useForm<z.infer<typeof alertsSchema>>({
    resolver: zodResolver(alertsSchema),
    defaultValues: {
      dailyDigest: true,
      telegramAlerts: false,
      emailSummary: true,
      priceAlerts: true,
      portfolioAlerts: true,
      newsAlerts: false,
      digestFrequency: 'daily',
      alertFrequency: 'immediate',
      bigMoveThreshold: 5,
      marketHours: true,
      weekendAlerts: false,
      riskAlerts: true,
      performanceAlerts: true,
    },
  });

  useEffect(() => {
    // Load hardcoded alert history
    const mockHistory: AlertHistory[] = [
      {
        id: '1',
        type: 'price',
        title: 'AAPL Price Alert',
        message: 'Apple Inc. has increased by 8.2% in the last hour',
        timestamp: new Date(Date.now() - 3600000).toISOString(),
        severity: 'medium',
        acknowledged: false
      },
      {
        id: '2',
        type: 'portfolio',
        title: 'Portfolio Performance',
        message: 'Your portfolio has gained ₹12,450 today (+2.8%)',
        timestamp: new Date(Date.now() - 7200000).toISOString(),
        severity: 'low',
        acknowledged: true
      },
      {
        id: '3',
        type: 'risk',
        title: 'Risk Alert',
        message: 'High concentration detected in Technology sector (65%)',
        timestamp: new Date(Date.now() - 86400000).toISOString(),
        severity: 'high',
        acknowledged: false
      },
      {
        id: '4',
        type: 'news',
        title: 'Market News',
        message: 'Fed announces new monetary policy - Markets react positively',
        timestamp: new Date(Date.now() - 172800000).toISOString(),
        severity: 'medium',
        acknowledged: true
      }
    ];
    
    setAlertHistory(mockHistory);
  }, []);

  const onSubmit = async (values: z.infer<typeof alertsSchema>) => {
    setIsLoading(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      toast.success('Alert settings updated successfully!');
    } catch (error) {
      toast.error('Failed to update alert settings');
    } finally {
      setIsLoading(false);
    }
  };

  const connectTelegram = async () => {
    setIsLoading(true);
    try {
      // Simulate Telegram bot connection
      await new Promise(resolve => setTimeout(resolve, 2000));
      setTelegramConnected(true);
      toast.success('Telegram bot connected successfully!');
    } catch (error) {
      toast.error('Failed to connect Telegram bot');
    } finally {
      setIsLoading(false);
    }
  };

  const testAlert = async (type: string) => {
    try {
      await new Promise(resolve => setTimeout(resolve, 500));
      toast.success(`Test ${type} alert sent successfully!`);
    } catch (error) {
      toast.error(`Failed to send test ${type} alert`);
    }
  };

  const acknowledgeAlert = (alertId: string) => {
    setAlertHistory(prev => 
      prev.map(alert => 
        alert.id === alertId 
          ? { ...alert, acknowledged: true }
          : alert
      )
    );
    toast.success('Alert acknowledged');
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'high': return 'bg-destructive text-destructive-foreground';
      case 'medium': return 'bg-warning text-warning-foreground';
      case 'low': return 'bg-success text-success-foreground';
      default: return 'bg-secondary text-secondary-foreground';
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'price': return TrendingUp;
      case 'portfolio': return PieChart;
      case 'risk': return AlertTriangle;
      case 'news': return Globe;
      default: return Bell;
    }
  };

  return (
    <div className="container mx-auto p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold bg-gradient-primary bg-clip-text text-transparent">
            Alerts & Notifications
          </h1>
          <p className="text-muted-foreground">Manage your alerts, notifications and stay informed</p>
        </div>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-success rounded-full animate-pulse"></div>
            <span className="text-sm text-muted-foreground">{activeAlerts} Active Alerts</span>
          </div>
          <Badge variant="secondary" className="bg-gradient-primary text-primary-foreground">
            <Zap className="w-3 h-3 mr-1" />
            Real-time
          </Badge>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Settings Panel */}
        <div className="lg:col-span-2 space-y-6">
          {/* Alert Types */}
          <Card className="bg-gradient-card shadow-lg border-primary/20 hover:shadow-primary/10 transition-all duration-300">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Bell className="w-5 h-5 text-primary" />
                Alert Types
              </CardTitle>
              <CardDescription>Choose which alerts you want to receive</CardDescription>
            </CardHeader>
            <CardContent>
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="dailyDigest"
                      render={({ field }) => (
                        <FormItem className="flex flex-row items-center justify-between rounded-lg border border-primary/20 p-4 bg-gradient-hover/30 hover:bg-gradient-hover/50 transition-all duration-300">
                          <div className="space-y-0.5">
                            <div className="flex items-center gap-2">
                              <Mail className="w-4 h-4 text-primary" />
                              <FormLabel className="text-base font-medium">Daily Digest</FormLabel>
                            </div>
                            <FormDescription>
                              Daily portfolio summary via email
                            </FormDescription>
                          </div>
                          <FormControl>
                            <Switch
                              checked={field.value}
                              onCheckedChange={field.onChange}
                            />
                          </FormControl>
                        </FormItem>
                      )}
                    />

                    <PremiumWrapper feature="Telegram Alerts" description="Get instant alerts on Telegram">
                      <FormField
                        control={form.control}
                        name="telegramAlerts"
                        render={({ field }) => (
                          <FormItem className="flex flex-row items-center justify-between rounded-lg border border-primary/20 p-4 bg-gradient-hover/30 hover:bg-gradient-hover/50 transition-all duration-300">
                            <div className="space-y-0.5">
                              <div className="flex items-center gap-2">
                                <MessageSquare className="w-4 h-4 text-primary" />
                                <FormLabel className="text-base font-medium">Telegram Alerts</FormLabel>
                                <PremiumBadge />
                              </div>
                              <FormDescription>
                                Instant alerts via Telegram bot
                              </FormDescription>
                            </div>
                            <FormControl>
                              <Switch
                                checked={field.value}
                                onCheckedChange={field.onChange}
                              />
                            </FormControl>
                          </FormItem>
                        )}
                      />
                    </PremiumWrapper>

                    <FormField
                      control={form.control}
                      name="priceAlerts"
                      render={({ field }) => (
                        <FormItem className="flex flex-row items-center justify-between rounded-lg border border-primary/20 p-4 bg-gradient-hover/30 hover:bg-gradient-hover/50 transition-all duration-300">
                          <div className="space-y-0.5">
                            <div className="flex items-center gap-2">
                              <TrendingUp className="w-4 h-4 text-primary" />
                              <FormLabel className="text-base font-medium">Price Alerts</FormLabel>
                            </div>
                            <FormDescription>
                              Stock price movement alerts
                            </FormDescription>
                          </div>
                          <FormControl>
                            <Switch
                              checked={field.value}
                              onCheckedChange={field.onChange}
                            />
                          </FormControl>
                        </FormItem>
                      )}
                    />

                    <PremiumWrapper feature="Risk Alerts" description="Advanced risk monitoring">
                      <FormField
                        control={form.control}
                        name="riskAlerts"
                        render={({ field }) => (
                          <FormItem className="flex flex-row items-center justify-between rounded-lg border border-primary/20 p-4 bg-gradient-hover/30 hover:bg-gradient-hover/50 transition-all duration-300">
                            <div className="space-y-0.5">
                              <div className="flex items-center gap-2">
                                <Shield className="w-4 h-4 text-primary" />
                                <FormLabel className="text-base font-medium">Risk Alerts</FormLabel>
                                <PremiumBadge />
                              </div>
                              <FormDescription>
                                Portfolio risk monitoring
                              </FormDescription>
                            </div>
                            <FormControl>
                              <Switch
                                checked={field.value}
                                onCheckedChange={field.onChange}
                              />
                            </FormControl>
                          </FormItem>
                        )}
                      />
                    </PremiumWrapper>
                  </div>

                  <Separator />

                  {/* Frequency Settings */}
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold flex items-center gap-2">
                      <Clock className="w-5 h-5 text-primary" />
                      Frequency Settings
                    </h3>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <FormField
                        control={form.control}
                        name="digestFrequency"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Digest Frequency</FormLabel>
                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                              <FormControl>
                                <SelectTrigger className="bg-background border-primary/20">
                                  <SelectValue placeholder="Select frequency" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                <SelectItem value="daily">Daily</SelectItem>
                                <SelectItem value="weekly">Weekly</SelectItem>
                                <SelectItem value="monthly">Monthly</SelectItem>
                              </SelectContent>
                            </Select>
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="bigMoveThreshold"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Big Move Threshold (%)</FormLabel>
                            <FormControl>
                              <Input
                                type="number"
                                min="1"
                                max="50"
                                className="bg-background border-primary/20"
                                {...field}
                                onChange={(e) => field.onChange(parseFloat(e.target.value))}
                              />
                            </FormControl>
                            <FormDescription>
                              Alert when stock moves more than this percentage
                            </FormDescription>
                          </FormItem>
                        )}
                      />
                    </div>
                  </div>

                  <Separator />

                  {/* Telegram Integration */}
                  <PremiumWrapper feature="Telegram Integration" description="Connect your Telegram bot for instant notifications">
                    <div className="space-y-4">
                      <h3 className="text-lg font-semibold flex items-center gap-2">
                        <Bot className="w-5 h-5 text-primary" />
                        Telegram Integration
                        <PremiumBadge />
                      </h3>
                      
                      {!telegramConnected ? (
                        <div className="p-4 border border-primary/20 rounded-lg bg-gradient-hover/30">
                          <div className="flex items-center justify-between mb-4">
                            <div>
                              <h4 className="font-medium">Connect Telegram Bot</h4>
                              <p className="text-sm text-muted-foreground">
                                Get instant alerts on Telegram
                              </p>
                            </div>
                            <Button
                              type="button"
                              onClick={connectTelegram}
                              disabled={isLoading}
                              className="bg-gradient-primary hover:bg-gradient-primary/90"
                            >
                              <MessageSquare className="w-4 h-4 mr-2" />
                              Connect Bot
                            </Button>
                          </div>
                          
                          <div className="space-y-3">
                            <FormField
                              control={form.control}
                              name="telegramBotToken"
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel>Bot Token</FormLabel>
                                  <FormControl>
                                    <Input
                                      placeholder="Enter your bot token"
                                      className="bg-background border-primary/20"
                                      {...field}
                                    />
                                  </FormControl>
                                </FormItem>
                              )}
                            />
                            
                            <FormField
                              control={form.control}
                              name="telegramChatId"
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel>Chat ID</FormLabel>
                                  <FormControl>
                                    <Input
                                      placeholder="Enter your chat ID"
                                      className="bg-background border-primary/20"
                                      {...field}
                                    />
                                  </FormControl>
                                  <FormDescription>
                                    Get your chat ID from @userinfobot
                                  </FormDescription>
                                </FormItem>
                              )}
                            />
                          </div>
                        </div>
                      ) : (
                        <div className="p-4 border border-success/20 rounded-lg bg-success/10">
                          <div className="flex items-center gap-2 text-success">
                            <CheckCircle2 className="w-5 h-5" />
                            <span className="font-medium">Telegram bot connected successfully!</span>
                          </div>
                          <div className="mt-3 flex gap-2">
                            <Button
                              type="button"
                              size="sm"
                              variant="outline"
                              onClick={() => testAlert('Telegram')}
                            >
                              Send Test Alert
                            </Button>
                            <Button
                              type="button"
                              size="sm"
                              variant="outline"
                              onClick={() => setTelegramConnected(false)}
                            >
                              Disconnect
                            </Button>
                          </div>
                        </div>
                      )}
                    </div>
                  </PremiumWrapper>

                  <div className="flex justify-end">
                    <Button 
                      type="submit" 
                      disabled={isLoading}
                      className="bg-gradient-primary hover:bg-gradient-primary/90"
                    >
                      {isLoading ? 'Saving...' : 'Save Settings'}
                    </Button>
                  </div>
                </form>
              </Form>
            </CardContent>
          </Card>
        </div>

        {/* Alert History Sidebar */}
        <div className="space-y-6">
          <Card className="bg-gradient-card shadow-lg border-primary/20">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Bell className="w-5 h-5 text-primary" />
                Recent Alerts
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {alertHistory.map((alert) => {
                const IconComponent = getTypeIcon(alert.type);
                return (
                  <div
                    key={alert.id}
                    className={`p-3 rounded-lg border transition-all duration-300 hover:shadow-md ${
                      alert.acknowledged 
                        ? 'bg-muted/50 border-muted' 
                        : 'bg-background border-primary/20 shadow-sm'
                    }`}
                  >
                    <div className="flex items-start gap-3">
                      <div className={`p-2 rounded-lg ${getSeverityColor(alert.severity)}`}>
                        <IconComponent className="w-4 h-4" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h4 className="font-medium text-sm">{alert.title}</h4>
                        <p className="text-xs text-muted-foreground line-clamp-2">
                          {alert.message}
                        </p>
                        <div className="flex items-center justify-between mt-2">
                          <span className="text-xs text-muted-foreground">
                            {new Date(alert.timestamp).toLocaleTimeString()}
                          </span>
                          {!alert.acknowledged && (
                            <Button
                              size="sm"
                              variant="ghost"
                              onClick={() => acknowledgeAlert(alert.id)}
                              className="h-6 px-2 text-xs"
                            >
                              Acknowledge
                            </Button>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </CardContent>
          </Card>

          <Card className="bg-gradient-card shadow-lg border-primary/20">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Settings className="w-5 h-5 text-primary" />
                Quick Actions
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <Button
                variant="outline"
                size="sm"
                className="w-full justify-start"
                onClick={() => testAlert('Email')}
              >
                <Mail className="w-4 h-4 mr-2" />
                Test Email Alert
              </Button>
              <Button
                variant="outline"
                size="sm"
                className="w-full justify-start"
                onClick={() => testAlert('Push')}
              >
                <Smartphone className="w-4 h-4 mr-2" />
                Test Push Notification
              </Button>
              <Button
                variant="outline"
                size="sm"
                className="w-full justify-start"
                onClick={() => toast.info('Alert history cleared')}
              >
                <CheckCircle2 className="w-4 h-4 mr-2" />
                Clear All Alerts
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}