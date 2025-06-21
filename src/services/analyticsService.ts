
import { supabase } from '@/integrations/supabase/client';

export interface AnalyticsData {
  visitors: { date: string; count: number }[];
  conversions: { date: string; conversions: number }[];
  sources: { source: string; count: number }[];
  totalVisitors: number;
  totalConversions: number;
  conversionRate: number;
}

export const analyticsService = {
  async getAnalyticsData(userId: string, dateRange: number = 30): Promise<AnalyticsData> {
    try {
      const endDate = new Date();
      const startDate = new Date();
      startDate.setDate(startDate.getDate() - dateRange);

      // Fetch visitors data
      const { data: visitors, error: visitorsError } = await supabase
        .from('analytics_visitors')
        .select('date, count')
        .eq('user_id', userId)
        .gte('date', startDate.toISOString().split('T')[0])
        .lte('date', endDate.toISOString().split('T')[0])
        .order('date');

      if (visitorsError) throw visitorsError;

      // Fetch conversions data
      const { data: conversions, error: conversionsError } = await supabase
        .from('analytics_conversions')
        .select('date, conversions')
        .eq('user_id', userId)
        .gte('date', startDate.toISOString().split('T')[0])
        .lte('date', endDate.toISOString().split('T')[0])
        .order('date');

      if (conversionsError) throw conversionsError;

      // Fetch sources data
      const { data: sources, error: sourcesError } = await supabase
        .from('analytics_sources')
        .select('source, count')
        .eq('user_id', userId)
        .order('count', { ascending: false });

      if (sourcesError) throw sourcesError;

      // Calculate totals
      const totalVisitors = visitors?.reduce((sum, v) => sum + v.count, 0) || 0;
      const totalConversions = conversions?.reduce((sum, c) => sum + c.conversions, 0) || 0;
      const conversionRate = totalVisitors > 0 ? (totalConversions / totalVisitors) * 100 : 0;

      return {
        visitors: visitors || [],
        conversions: conversions || [],
        sources: sources || [],
        totalVisitors,
        totalConversions,
        conversionRate,
      };
    } catch (error) {
      console.error('Error fetching analytics data:', error);
      throw error;
    }
  },

  async trackVisitor(userId: string) {
    try {
      const today = new Date().toISOString().split('T')[0];
      
      const { error } = await supabase
        .from('analytics_visitors')
        .upsert({
          user_id: userId,
          date: today,
          count: 1,
        }, {
          onConflict: 'user_id,date',
          ignoreDuplicates: false,
        });

      if (error) throw error;
    } catch (error) {
      console.error('Error tracking visitor:', error);
    }
  },

  async trackConversion(userId: string) {
    try {
      const today = new Date().toISOString().split('T')[0];
      
      const { error } = await supabase
        .from('analytics_conversions')
        .upsert({
          user_id: userId,
          date: today,
          conversions: 1,
        }, {
          onConflict: 'user_id,date',
          ignoreDuplicates: false,
        });

      if (error) throw error;
    } catch (error) {
      console.error('Error tracking conversion:', error);
    }
  },

  async trackSource(userId: string, source: string) {
    try {
      const { error } = await supabase
        .from('analytics_sources')
        .upsert({
          user_id: userId,
          source,
          count: 1,
        }, {
          onConflict: 'user_id,source',
          ignoreDuplicates: false,
        });

      if (error) throw error;
    } catch (error) {
      console.error('Error tracking source:', error);
    }
  },
};
