import { createClient } from "@supabase/supabase-js";
export const supabaseUrl = "https://otvplojemqvwzkfqycsm.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im90dnBsb2plbXF2d3prZnF5Y3NtIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTYxMTIyOTQsImV4cCI6MjAzMTY4ODI5NH0.tXAkqG1Q_y2P0Tgjr-lyOffdrS5T4jyon_Pb_JVKTUU";
const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
