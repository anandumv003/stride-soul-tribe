// This file is automatically generated. Do not edit it directly.
import { createClient } from '@supabase/supabase-js';
import type { Database } from './types';

const SUPABASE_URL = "https://gphujntpqxbeztcsbuqs.supabase.co";
const SUPABASE_PUBLISHABLE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImdwaHVqbnRwcXhiZXp0Y3NidXFzIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTA0NDE4NTEsImV4cCI6MjA2NjAxNzg1MX0.A0e6css0jiV4S6SDJDoT9OCx44lxeVphVxR9J2SWu6s";

// Import the supabase client like this:
// import { supabase } from "@/integrations/supabase/client";

export const supabase = createClient<Database>(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY);