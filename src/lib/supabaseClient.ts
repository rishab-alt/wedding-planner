import { createClient } from '@supabase/supabase-js';

// Hardcoded Supabase keys (only for local development, avoid this for production)
const supabaseUrl = 'https://adcihxrwpvelfqaqquyw.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFkY2loeHJ3cHZlbGZxYXFxdXl3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDQxMDk5NzcsImV4cCI6MjA1OTY4NTk3N30.U3PQ1NiK45ci-hwUynN9b94m9FM-xkry-IC40zEVGyk';
const supabaseServiceRoleKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFkY2loeHJ3cHZlbGZxYXFxdXl3Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc0NDEwOTk3NywiZXhwIjoyMDU5Njg1OTc3fQ.XnuUdTwmf6JKoY-mhjzYAduao5MdcXkywwqyefuh7bM';

// Create the Supabase client instance with the service role key for server-side operations
const supabase = createClient(supabaseUrl, supabaseServiceRoleKey);

// Optional: Function to get the current session (if you're handling auth on the server-side)
export async function getSession() {
  const { data: { session }, error } = await supabase.auth.getSession();
  if (error) {
    console.error('Error getting session:', error.message);
  }
  return session;
}

export default supabase;
