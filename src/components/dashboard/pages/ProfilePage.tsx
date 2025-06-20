
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { toast } from 'sonner';
import { supabase } from '@/integrations/supabase/client';
import { Loader2 } from 'lucide-react';

interface UserProfile {
  id: string;
  first_name: string;
  last_name: string;
  email: string;
  bio: string;
  avatar_url: string;
  job_title: string;
  company: string;
  notification_preferences: {
    email_digest: boolean;
    mentions: boolean;
    direct_messages: boolean;
    post_performance: boolean;
    new_followers: boolean;
    scheduled_posts: boolean;
  };
  social_links: {
    website: string;
    twitter: string;
    linkedin: string;
    instagram: string;
  };
}

const ProfilePage: React.FC = () => {
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [avatarFile, setAvatarFile] = useState<File | null>(null);
  const [avatarPreview, setAvatarPreview] = useState<string | null>(null);
  
  // Fetch user profile
  useEffect(() => {
    const fetchProfile = async () => {
      setIsLoading(true);
      try {
        const { data: { user } } = await supabase.auth.getUser();
        
        if (user) {
          // Try to get the profile from the profiles table
          const { data, error } = await supabase
            .from('profiles')
            .select('*')
            .eq('id', user.id)
            .single();
            
          if (error && error.code !== 'PGRST116') {
            throw error;
          }
          
          if (data) {
            // Use database profile
            setProfile({
              id: user.id,
              first_name: data.first_name || '',
              last_name: data.last_name || '',
              email: user.email || '',
              bio: data.bio || '',
              avatar_url: data.avatar_url || '',
              job_title: data.job_title || '',
              company: data.company || '',
              notification_preferences: data.notification_preferences || {
                email_digest: true,
                mentions: true,
                direct_messages: true,
                post_performance: true,
                new_followers: false,
                scheduled_posts: true,
              },
              social_links: data.social_links || {
                website: '',
                twitter: '',
                linkedin: '',
                instagram: '',
              }
            });
          } else {
            // Create a default profile
            setProfile({
              id: user.id,
              first_name: user.user_metadata?.first_name || '',
              last_name: user.user_metadata?.last_name || '',
              email: user.email || '',
              bio: '',
              avatar_url: user.user_metadata?.avatar_url || '',
              job_title: '',
              company: '',
              notification_preferences: {
                email_digest: true,
                mentions: true,
                direct_messages: true,
                post_performance: true,
                new_followers: false,
                scheduled_posts: true,
              },
              social_links: {
                website: '',
                twitter: '',
                linkedin: '',
                instagram: '',
              }
            });
          }
        }
      } catch (error) {
        console.error('Error fetching profile:', error);
        toast.error('Failed to load profile');
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchProfile();
  }, []);
  
  // Handle avatar file selection
  const handleAvatarChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setAvatarFile(file);
      
      // Create a preview
      const reader = new FileReader();
      reader.onloadend = () => {
        setAvatarPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };
  
  // Handle profile update
  const handleProfileUpdate = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsSaving(true);
    
    try {
      if (!profile) return;
      
      const formData = new FormData(event.currentTarget);
      const updatedProfile = {
        first_name: formData.get('firstName') as string,
        last_name: formData.get('lastName') as string,
        bio: formData.get('bio') as string,
        job_title: formData.get('jobTitle') as string,
        company: formData.get('company') as string,
        social_links: {
          website: formData.get('website') as string,
          twitter: formData.get('twitter') as string,
          linkedin: formData.get('linkedin') as string,
          instagram: formData.get('instagram') as string,
        }
      };
      
      // Upload avatar if changed
      let avatarUrl = profile.avatar_url;
      if (avatarFile) {
        const fileExt = avatarFile.name.split('.').pop();
        const fileName = `${profile.id}-${Math.random().toString(36).substring(2)}.${fileExt}`;
        
        const { error: uploadError } = await supabase.storage
          .from('avatars')
          .upload(fileName, avatarFile);
          
        if (uploadError) {
          throw uploadError;
        }
        
        const { data: urlData } = supabase.storage
          .from('avatars')
          .getPublicUrl(fileName);
          
        avatarUrl = urlData.publicUrl;
      }
      
      // Update user profile in Supabase
      const { error } = await supabase
        .from('profiles')
        .upsert({
          id: profile.id,
          ...updatedProfile,
          avatar_url: avatarUrl,
          updated_at: new Date().toISOString(),
        });
        
      if (error) throw error;
      
      // Update local state
      setProfile({
        ...profile,
        ...updatedProfile,
        avatar_url: avatarUrl,
      });
      
      toast.success('Profile updated successfully');
    } catch (error) {
      console.error('Error updating profile:', error);
      toast.error('Failed to update profile');
    } finally {
      setIsSaving(false);
    }
  };
  
  // Handle notification preferences update
  const handleNotificationUpdate = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsSaving(true);
    
    try {
      if (!profile) return;
      
      const formData = new FormData(event.currentTarget);
      const notificationPreferences = {
        email_digest: formData.get('emailDigest') === 'on',
        mentions: formData.get('mentions') === 'on',
        direct_messages: formData.get('directMessages') === 'on',
        post_performance: formData.get('postPerformance') === 'on',
        new_followers: formData.get('newFollowers') === 'on',
        scheduled_posts: formData.get('scheduledPosts') === 'on',
      };
      
      // Update notification preferences in Supabase
      const { error } = await supabase
        .from('profiles')
        .upsert({
          id: profile.id,
          notification_preferences: notificationPreferences,
          updated_at: new Date().toISOString(),
        });
        
      if (error) throw error;
      
      // Update local state
      setProfile({
        ...profile,
        notification_preferences: notificationPreferences,
      });
      
      toast.success('Notification preferences updated');
    } catch (error) {
      console.error('Error updating notification preferences:', error);
      toast.error('Failed to update notification preferences');
    } finally {
      setIsSaving(false);
    }
  };
  
  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <Loader2 className="h-8 w-8 animate-spin text-gray-400" />
      </div>
    );
  }
  
  if (!profile) {
    return (
      <div className="text-center py-12">
        <h2 className="text-2xl font-bold mb-2">Profile Not Available</h2>
        <p className="text-gray-500">Please log in to view and manage your profile.</p>
      </div>
    );
  }
  
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">User Profile</h1>
      
      <Tabs defaultValue="personal" className="space-y-6">
        <TabsList>
          <TabsTrigger value="personal">Personal Information</TabsTrigger>
          <TabsTrigger value="notifications">Notification Preferences</TabsTrigger>
          <TabsTrigger value="social">Social Links</TabsTrigger>
        </TabsList>
        
        <TabsContent value="personal" className="space-y-6">
          <Card>
            <form onSubmit={handleProfileUpdate}>
              <CardHeader>
                <CardTitle>Personal Information</CardTitle>
                <CardDescription>
                  Update your personal information and profile picture.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex flex-col sm:flex-row gap-6">
                  <div className="flex flex-col items-center space-y-4">
                    <Avatar className="w-32 h-32 border-2 border-gray-200">
                      <AvatarImage src={avatarPreview || profile.avatar_url} />
                      <AvatarFallback>
                        {profile.first_name?.[0] || ''}{profile.last_name?.[0] || ''}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex flex-col items-center space-y-2">
                      <label htmlFor="avatar-upload" className="cursor-pointer text-sm text-blue-600 hover:text-blue-800">
                        Change Avatar
                      </label>
                      <Input 
                        id="avatar-upload" 
                        type="file" 
                        accept="image/*" 
                        className="hidden" 
                        onChange={handleAvatarChange}
                      />
                    </div>
                  </div>
                  
                  <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="firstName">First Name</Label>
                      <Input 
                        id="firstName" 
                        name="firstName" 
                        defaultValue={profile.first_name} 
                        required 
                      />
                    </div>
                    <div>
                      <Label htmlFor="lastName">Last Name</Label>
                      <Input 
                        id="lastName" 
                        name="lastName" 
                        defaultValue={profile.last_name} 
                        required 
                      />
                    </div>
                    <div className="sm:col-span-2">
                      <Label htmlFor="email">Email</Label>
                      <Input 
                        id="email" 
                        name="email" 
                        type="email" 
                        value={profile.email} 
                        disabled 
                      />
                      <p className="text-xs text-gray-500 mt-1">
                        Email address cannot be changed.
                      </p>
                    </div>
                  </div>
                </div>
                
                <div>
                  <Label htmlFor="bio">Bio</Label>
                  <Textarea 
                    id="bio" 
                    name="bio" 
                    defaultValue={profile.bio} 
                    className="h-24" 
                    placeholder="Tell us about yourself"
                  />
                </div>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="jobTitle">Job Title</Label>
                    <Input 
                      id="jobTitle" 
                      name="jobTitle" 
                      defaultValue={profile.job_title} 
                      placeholder="e.g. Marketing Manager"
                    />
                  </div>
                  <div>
                    <Label htmlFor="company">Company/Organization</Label>
                    <Input 
                      id="company" 
                      name="company" 
                      defaultValue={profile.company} 
                      placeholder="e.g. Acme Inc."
                    />
                  </div>
                </div>
              </CardContent>
              <CardFooter className="flex justify-end">
                <Button type="submit" disabled={isSaving}>
                  {isSaving ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Saving...
                    </>
                  ) : "Save Changes"}
                </Button>
              </CardFooter>
            </form>
          </Card>
        </TabsContent>
        
        <TabsContent value="notifications" className="space-y-6">
          <Card>
            <form onSubmit={handleNotificationUpdate}>
              <CardHeader>
                <CardTitle>Notification Preferences</CardTitle>
                <CardDescription>
                  Customize how and when you receive notifications.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="emailDigest">Weekly Email Digest</Label>
                      <p className="text-sm text-gray-500">
                        Receive a weekly summary of your account activity.
                      </p>
                    </div>
                    <Switch 
                      id="emailDigest" 
                      name="emailDigest" 
                      defaultChecked={profile.notification_preferences.email_digest} 
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="mentions">Social Media Mentions</Label>
                      <p className="text-sm text-gray-500">
                        Get notified when someone mentions you on social media.
                      </p>
                    </div>
                    <Switch 
                      id="mentions" 
                      name="mentions" 
                      defaultChecked={profile.notification_preferences.mentions} 
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="directMessages">Direct Messages</Label>
                      <p className="text-sm text-gray-500">
                        Receive notifications for new direct messages.
                      </p>
                    </div>
                    <Switch 
                      id="directMessages" 
                      name="directMessages" 
                      defaultChecked={profile.notification_preferences.direct_messages} 
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="postPerformance">Post Performance</Label>
                      <p className="text-sm text-gray-500">
                        Get updates about how your posts are performing.
                      </p>
                    </div>
                    <Switch 
                      id="postPerformance" 
                      name="postPerformance" 
                      defaultChecked={profile.notification_preferences.post_performance} 
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="newFollowers">New Followers</Label>
                      <p className="text-sm text-gray-500">
                        Be notified when you gain new followers.
                      </p>
                    </div>
                    <Switch 
                      id="newFollowers" 
                      name="newFollowers" 
                      defaultChecked={profile.notification_preferences.new_followers} 
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="scheduledPosts">Scheduled Posts</Label>
                      <p className="text-sm text-gray-500">
                        Get reminders about upcoming scheduled posts.
                      </p>
                    </div>
                    <Switch 
                      id="scheduledPosts" 
                      name="scheduledPosts" 
                      defaultChecked={profile.notification_preferences.scheduled_posts} 
                    />
                  </div>
                </div>
              </CardContent>
              <CardFooter className="flex justify-end">
                <Button type="submit" disabled={isSaving}>
                  {isSaving ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Saving...
                    </>
                  ) : "Save Preferences"}
                </Button>
              </CardFooter>
            </form>
          </Card>
        </TabsContent>
        
        <TabsContent value="social" className="space-y-6">
          <Card>
            <form onSubmit={handleProfileUpdate}>
              <CardHeader>
                <CardTitle>Social Media Links</CardTitle>
                <CardDescription>
                  Connect your social media profiles to your account.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 gap-4">
                  <div>
                    <Label htmlFor="website">Website</Label>
                    <Input 
                      id="website" 
                      name="website" 
                      defaultValue={profile.social_links.website} 
                      placeholder="https://yourwebsite.com"
                      type="url"
                    />
                  </div>
                  <div>
                    <Label htmlFor="twitter">Twitter/X</Label>
                    <Input 
                      id="twitter" 
                      name="twitter" 
                      defaultValue={profile.social_links.twitter} 
                      placeholder="https://twitter.com/yourusername"
                      type="url"
                    />
                  </div>
                  <div>
                    <Label htmlFor="linkedin">LinkedIn</Label>
                    <Input 
                      id="linkedin" 
                      name="linkedin" 
                      defaultValue={profile.social_links.linkedin} 
                      placeholder="https://linkedin.com/in/yourusername"
                      type="url"
                    />
                  </div>
                  <div>
                    <Label htmlFor="instagram">Instagram</Label>
                    <Input 
                      id="instagram" 
                      name="instagram" 
                      defaultValue={profile.social_links.instagram} 
                      placeholder="https://instagram.com/yourusername"
                      type="url"
                    />
                  </div>
                </div>
              </CardContent>
              <CardFooter className="flex justify-end">
                <Button type="submit" disabled={isSaving}>
                  {isSaving ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Saving...
                    </>
                  ) : "Save Links"}
                </Button>
              </CardFooter>
            </form>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ProfilePage;
