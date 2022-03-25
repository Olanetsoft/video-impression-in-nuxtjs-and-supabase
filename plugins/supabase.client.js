/* plugins/client.js */
import { createClient } from "@supabase/supabase-js";
const supabase = createClient("https://yoururl.supabase.co", "your-api-key");
export default (_, inject) => {
  inject("supabase", supabase);
};
