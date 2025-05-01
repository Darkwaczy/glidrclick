
import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = 'https://jbcurgdwbvjsgbftjejg.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImpiY3VyZ2R3YnZqc2diZnRqZWpnIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDU0NjczODMsImV4cCI6MjA2MTA0MzM4M30.wOf5E0_UQGmvAGEaUrPUg6oVZxnuZhRmrfVw_XIqgeI';

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
