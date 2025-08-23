import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = "https://roocapjgrdhvyvlogdjf.supabase.co";
const SUPABASE_PUBLISHABLE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJvb2NhcGpncmRodnl2bG9nZGpmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTU2OTY1NDgsImV4cCI6MjA3MTI3MjU0OH0.k5bj832_Y5C5YTrzHIHMh8AyvNpgPNpkSA2l8rnzRiM";

export const supabase = createClient(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY, {
  auth: {
    storage: localStorage,
    persistSession: true,
    autoRefreshToken: true,
  }
});