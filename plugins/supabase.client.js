/* plugins/client.js */
import { createClient } from "@supabase/supabase-js";
const supabase = createClient(
  "https://lvjrfcwhboqqemflnqre.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imx2anJmY3doYm9xcWVtZmxucXJlIiwicm9sZSI6ImFub24iLCJpYXQiOjE2NDgwNzkxODEsImV4cCI6MTk2MzY1NTE4MX0.VyFiAQWvzH8S-XeRZPfmpONdtNtYaShKHZGl93WX2Co"
);

export default (_, inject) => {
  inject("supabase", supabase);
};
