import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://mhmrcdawpcbnwsdsvxro.supabase.co/rest/v1/';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im1obXJjZGF3cGNibndzZHN2eHJvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODE5NjczNDIsImV4cCI6MjA5NzU0MzM0Mn0.UoWno4zrBm-3bOAU3Yd8sQfP4OkO1KBRYQqgnMKkIVQ';

export const supabase = createClient(supabaseUrl, supabaseKey);