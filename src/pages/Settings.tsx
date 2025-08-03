import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage, FormDescription } from '@/components/ui/form';
import { Switch } from '@/components/ui/switch';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';
import { Crown, Moon, Sun, Monitor, Bell, Mail, MessageSquare, Download, FileText, Users } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import { useTheme } from 'next-themes';

const profileSchema = z.object({
  fullName: z.string().min(2, 'Full name must be at least 2 characters'),
  email: z.string().email('Invalid email address'),
});

const preferencesSchema = z.object({
  theme: z.enum(['light', 'dark', 'system']),
  notificationsEnabled: z.boolean(),
  emailNotifications: z.boolean(),
  telegramNotifications: z.boolean(),
  telegramChatId: z.string().optional(),
});

export default function Settings() {
  const { user } = useAuth();
  const { theme, setTheme } = useTheme();
  const [profile, setProfile] = useState<any>(null);
  const [preferences, setPreferences] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(false);

  const profileForm = useForm<z.infer<typeof profileSchema>>({
    resolver: zodResolver(profileSchema),
  });

  const preferencesForm = useForm<z.infer<typeof preferencesSchema>>({
    resolver: zodResolver(preferencesSchema),
    defaultValues: {
      theme: 'system',
      notificationsEnabled: true,
      emailNotifications: true,
      telegramNotifications: false,
    },
  });

  useEffect(() => {
    if (user) {
      fetchProfile();
      fetchPreferences();
    }
  }, [user]);

  const fetchProfile = async () => {
    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('user_id', user?.id)
        .single();

      if (data) {
        setProfile(data);
        profileForm.reset({
          fullName: data.full_name || '',
          email: data.email || '',
        });
      }
    } catch (error) {
      console.error('Error fetching profile:', error);
    }
  };

  const fetchPreferences = async () => {
    try {
      const { data, error } = await supabase
        .from('user_preferences')
        .select('*')
        .eq('user_id', user?.id)
        .single();

      if (data) {
        setPreferences(data);
        preferencesForm.reset({
          theme: (data.theme as 'light' | 'dark' | 'system') || 'system',
          notificationsEnabled: data.notifications_enabled,
          emailNotifications: data.email_notifications,
          telegramNotifications: data.telegram_notifications,
          telegramChatId: data.telegram_chat_id || '',
        });
      }
    } catch (error) {
      // If no preferences exist, create default ones
      const defaultPrefs = {
        user_id: user?.id,
        theme: 'system',
        notifications_enabled: true,
        email_notifications: true,
        telegram_notifications: false,
      };

      const { error: insertError } = await supabase
        .from('user_preferences')
        .insert([defaultPrefs]);

      if (!insertError) {
        setPreferences(defaultPrefs);
      }
    }
  };

  const onUpdateProfile = async (values: z.infer<typeof profileSchema>) => {
    setIsLoading(true);
    try {
      const { error } = await supabase
        .from('profiles')
        .update({
          full_name: values.fullName,
          email: values.email,
        })
        .eq('user_id', user?.id);

      if (error) throw error;
      
      toast.success('Profile updated successfully!');
      fetchProfile();
    } catch (error: any) {
      toast.error(error.message || 'Failed to update profile');
    } finally {
      setIsLoading(false);
    }
  };

  const onUpdatePreferences = async (values: z.infer<typeof preferencesSchema>) => {
    setIsLoading(true);
    try {
      const { error } = await supabase
        .from('user_preferences')
        .upsert({
          user_id: user?.id,
          theme: values.theme,
          notifications_enabled: values.notificationsEnabled,
          email_notifications: values.emailNotifications,
          telegram_notifications: values.telegramNotifications,
          telegram_chat_id: values.telegramChatId,
        });

      if (error) throw error;
      
      setTheme(values.theme);
      toast.success('Preferences updated successfully!');
      fetchPreferences();
    } catch (error: any) {
      toast.error(error.message || 'Failed to update preferences');
    } finally {
      setIsLoading(false);
    }
  };

  const upgradeToPremium = () => {
    toast.info('Premium upgrade feature coming soon!');
  };

  const exportData = (format: string) => {
    toast.info(`${format} export feature coming soon!`);
  };

  return (
    <div className="container mx-auto p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Settings</h1>
          <p className="text-muted-foreground">Manage your account settings and preferences</p>
        </div>
        {!profile?.is_premium && (
          <Button onClick={upgradeToPremium} className="bg-gradient-primary">
            <Crown className="mr-2 h-4 w-4" />
            Upgrade to Premium
          </Button>
        )}
      </div>

      <div className="grid gap-6">
        {/* Profile Settings */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="flex items-center gap-2">
                  <Users className="h-5 w-5" />
                  Profile Information
                </CardTitle>
                <CardDescription>Update your personal information</CardDescription>
              </div>
              {profile?.is_premium && (
                <Badge variant="secondary" className="bg-gradient-primary text-white">
                  <Crown className="mr-1 h-3 w-3" />
                  Premium
                </Badge>
              )}
            </div>
          </CardHeader>
          <CardContent>
            <Form {...profileForm}>
              <form onSubmit={profileForm.handleSubmit(onUpdateProfile)} className="space-y-4">
                <FormField
                  control={profileForm.control}
                  name="fullName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Full Name</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter your full name" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={profileForm.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input type="email" placeholder="Enter your email" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button type="submit" disabled={isLoading}>
                  {isLoading ? 'Updating...' : 'Update Profile'}
                </Button>
              </form>
            </Form>
          </CardContent>
        </Card>

        {/* Theme & Preferences */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Monitor className="h-5 w-5" />
              Theme & Preferences
            </CardTitle>
            <CardDescription>Customize your app experience</CardDescription>
          </CardHeader>
          <CardContent>
            <Form {...preferencesForm}>
              <form onSubmit={preferencesForm.handleSubmit(onUpdatePreferences)} className="space-y-6">
                <FormField
                  control={preferencesForm.control}
                  name="theme"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Theme</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select a theme" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="light">
                            <div className="flex items-center gap-2">
                              <Sun className="h-4 w-4" />
                              Light
                            </div>
                          </SelectItem>
                          <SelectItem value="dark">
                            <div className="flex items-center gap-2">
                              <Moon className="h-4 w-4" />
                              Dark
                            </div>
                          </SelectItem>
                          <SelectItem value="system">
                            <div className="flex items-center gap-2">
                              <Monitor className="h-4 w-4" />
                              System
                            </div>
                          </SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <Separator />

                <div className="space-y-4">
                  <h3 className="text-lg font-medium flex items-center gap-2">
                    <Bell className="h-5 w-5" />
                    Notifications
                  </h3>
                  
                  <FormField
                    control={preferencesForm.control}
                    name="notificationsEnabled"
                    render={({ field }) => (
                      <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                        <div className="space-y-0.5">
                          <FormLabel className="text-base">Enable Notifications</FormLabel>
                          <FormDescription>
                            Receive notifications about portfolio updates and alerts
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

                  <FormField
                    control={preferencesForm.control}
                    name="emailNotifications"
                    render={({ field }) => (
                      <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                        <div className="space-y-0.5 flex items-center gap-2">
                          <Mail className="h-4 w-4" />
                          <div>
                            <FormLabel className="text-base">Email Notifications</FormLabel>
                            <FormDescription>
                              Receive important updates via email
                            </FormDescription>
                          </div>
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

                  <FormField
                    control={preferencesForm.control}
                    name="telegramNotifications"
                    render={({ field }) => (
                      <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                        <div className="space-y-0.5 flex items-center gap-2">
                          <MessageSquare className="h-4 w-4" />
                          <div>
                            <FormLabel className="text-base">Telegram Notifications</FormLabel>
                            <FormDescription>
                              Receive real-time alerts via Telegram
                            </FormDescription>
                          </div>
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

                  {preferencesForm.watch('telegramNotifications') && (
                    <FormField
                      control={preferencesForm.control}
                      name="telegramChatId"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Telegram Chat ID</FormLabel>
                          <FormControl>
                            <Input placeholder="Enter your Telegram chat ID" {...field} />
                          </FormControl>
                          <FormDescription>
                            Get your chat ID by messaging @userinfobot on Telegram
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  )}
                </div>

                <Button type="submit" disabled={isLoading}>
                  {isLoading ? 'Saving...' : 'Save Preferences'}
                </Button>
              </form>
            </Form>
          </CardContent>
        </Card>

        {/* Export Options */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Download className="h-5 w-5" />
              Export Options
            </CardTitle>
            <CardDescription>Export your data in various formats</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Button 
                variant="outline" 
                onClick={() => exportData('PDF')}
                className="flex items-center gap-2"
              >
                <FileText className="h-4 w-4" />
                Export PDF Report
              </Button>
              <Button 
                variant="outline" 
                onClick={() => exportData('Excel')}
                className="flex items-center gap-2"
              >
                <FileText className="h-4 w-4" />
                Export Excel Report
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}