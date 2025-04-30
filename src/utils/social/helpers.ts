
/**
 * Helper functions for social media integration
 */

/**
 * Get platform name from ID
 * @param platformId The platform ID
 * @returns The formatted platform name
 */
export const getPlatformName = (platformId: string): string => {
  const platforms: Record<string, string> = {
    'facebook': 'Facebook',
    'twitter': 'Twitter',
    'linkedin': 'LinkedIn',
    'instagram': 'Instagram',
    'pinterest': 'Pinterest',
    'wordpress': 'WordPress',
  };
  
  return platforms[platformId] || platformId.charAt(0).toUpperCase() + platformId.slice(1);
};

/**
 * Format date for display
 * @param date Date string
 * @returns Formatted date string
 */
export const formatDate = (date: string | Date): string => {
  if (!date) return '';
  const dateObj = typeof date === 'string' ? new Date(date) : date;
  return dateObj.toLocaleString();
};

/**
 * Get current user ID from Supabase auth
 * @returns User ID or null if not authenticated
 */
export const getCurrentUserId = async () => {
  const { supabase } = await import('@/integrations/supabase/client');
  const { data } = await supabase.auth.getUser();
  return data?.user?.id || null;
};

