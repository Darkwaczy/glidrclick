
-- Update posts table to include all required fields
ALTER TABLE public.posts 
ADD COLUMN IF NOT EXISTS type text DEFAULT 'social',
ADD COLUMN IF NOT EXISTS published_at timestamp with time zone,
ADD COLUMN IF NOT EXISTS image_url text;

-- Create social_platforms table for social media connections
CREATE TABLE IF NOT EXISTS public.social_platforms (
  id uuid NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id uuid REFERENCES auth.users NOT NULL,
  platform_id text NOT NULL,
  name text NOT NULL,
  icon text,
  is_connected boolean DEFAULT false,
  access_token text,
  refresh_token text,
  token_expires_at timestamp with time zone,
  account_id text,
  account_name text,
  last_sync timestamp with time zone,
  notifications jsonb DEFAULT '{"mentions": true, "messages": true}'::jsonb,
  sync_frequency text DEFAULT 'daily',
  metadata jsonb DEFAULT '{}'::jsonb,
  created_at timestamp with time zone NOT NULL DEFAULT now(),
  updated_at timestamp with time zone NOT NULL DEFAULT now()
);

-- Create post_platforms junction table
CREATE TABLE IF NOT EXISTS public.post_platforms (
  id uuid NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  post_id uuid REFERENCES public.posts(id) ON DELETE CASCADE,
  platform_id text NOT NULL,
  user_id uuid REFERENCES auth.users NOT NULL,
  status text DEFAULT 'pending',
  published_at timestamp with time zone,
  platform_post_id text,
  error_message text,
  created_at timestamp with time zone NOT NULL DEFAULT now()
);

-- Create subscriptions table for billing
CREATE TABLE IF NOT EXISTS public.subscriptions (
  id uuid NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id uuid REFERENCES auth.users NOT NULL,
  plan text NOT NULL,
  status text NOT NULL,
  billing_cycle text NOT NULL,
  amount numeric NOT NULL,
  currency text DEFAULT 'NGN',
  next_billing_date timestamp with time zone,
  created_at timestamp with time zone NOT NULL DEFAULT now(),
  updated_at timestamp with time zone NOT NULL DEFAULT now()
);

-- Update profiles table with additional fields
ALTER TABLE public.profiles 
ADD COLUMN IF NOT EXISTS avatar_url text,
ADD COLUMN IF NOT EXISTS bio text,
ADD COLUMN IF NOT EXISTS website text,
ADD COLUMN IF NOT EXISTS location text,
ADD COLUMN IF NOT EXISTS email_notifications boolean DEFAULT true,
ADD COLUMN IF NOT EXISTS push_notifications boolean DEFAULT true;

-- Create storage bucket for avatars and content
INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES 
  ('avatars', 'avatars', true, 5242880, ARRAY['image/jpeg', 'image/png', 'image/gif', 'image/webp']),
  ('content', 'content', true, 10485760, ARRAY['image/jpeg', 'image/png', 'image/gif', 'image/webp', 'video/mp4'])
ON CONFLICT (id) DO NOTHING;

-- Enable RLS on new tables
ALTER TABLE public.social_platforms ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.post_platforms ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.subscriptions ENABLE ROW LEVEL SECURITY;

-- Create RLS policies for social_platforms
CREATE POLICY "Users can view their own social platforms" 
  ON public.social_platforms 
  FOR SELECT 
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own social platforms" 
  ON public.social_platforms 
  FOR INSERT 
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own social platforms" 
  ON public.social_platforms 
  FOR UPDATE 
  USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own social platforms" 
  ON public.social_platforms 
  FOR DELETE 
  USING (auth.uid() = user_id);

-- Create RLS policies for post_platforms
CREATE POLICY "Users can view their own post platforms" 
  ON public.post_platforms 
  FOR SELECT 
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own post platforms" 
  ON public.post_platforms 
  FOR INSERT 
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own post platforms" 
  ON public.post_platforms 
  FOR UPDATE 
  USING (auth.uid() = user_id);

-- Create RLS policies for subscriptions
CREATE POLICY "Users can view their own subscriptions" 
  ON public.subscriptions 
  FOR SELECT 
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own subscriptions" 
  ON public.subscriptions 
  FOR INSERT 
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own subscriptions" 
  ON public.subscriptions 
  FOR UPDATE 
  USING (auth.uid() = user_id);

-- Create storage policies for avatars bucket
CREATE POLICY "Users can view avatars" ON storage.objects
  FOR SELECT USING (bucket_id = 'avatars');

CREATE POLICY "Users can upload their own avatars" ON storage.objects
  FOR INSERT WITH CHECK (bucket_id = 'avatars' AND auth.uid()::text = (storage.foldername(name))[1]);

CREATE POLICY "Users can update their own avatars" ON storage.objects
  FOR UPDATE USING (bucket_id = 'avatars' AND auth.uid()::text = (storage.foldername(name))[1]);

CREATE POLICY "Users can delete their own avatars" ON storage.objects
  FOR DELETE USING (bucket_id = 'avatars' AND auth.uid()::text = (storage.foldername(name))[1]);

-- Create storage policies for content bucket
CREATE POLICY "Users can view content" ON storage.objects
  FOR SELECT USING (bucket_id = 'content');

CREATE POLICY "Users can upload their own content" ON storage.objects
  FOR INSERT WITH CHECK (bucket_id = 'content' AND auth.uid()::text = (storage.foldername(name))[1]);

CREATE POLICY "Users can update their own content" ON storage.objects
  FOR UPDATE USING (bucket_id = 'content' AND auth.uid()::text = (storage.foldername(name))[1]);

CREATE POLICY "Users can delete their own content" ON storage.objects
  FOR DELETE USING (bucket_id = 'content' AND auth.uid()::text = (storage.foldername(name))[1]);

-- Add triggers for updated_at timestamps
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_social_platforms_updated_at 
  BEFORE UPDATE ON public.social_platforms 
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_subscriptions_updated_at 
  BEFORE UPDATE ON public.subscriptions 
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
