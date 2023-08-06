import { createClient } from "@supabase/supabase-js";
import useAuthUser from "src/composables/useAuthUser";

const supabaseUrl = "https://pqrmgpwecgnsxvvjqjgy.supabase.co";
const supabaseAnonKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBxcm1ncHdlY2duc3h2dmpxamd5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTEwMTgxNzYsImV4cCI6MjAwNjU5NDE3Nn0.yBZthnj2E-zxITXAdX5IJjCWobZTVAB3ZT7tJM70zv8";
const supabase = createClient(supabaseUrl, supabaseAnonKey);

supabase.auth.onAuthStateChange((event, session) => {
  const { user } = useAuthUser();

  user.value = session?.user || null;
});

// console.log("init supa", supabase);

export default function useSupabase() {
  return { supabase };
}
