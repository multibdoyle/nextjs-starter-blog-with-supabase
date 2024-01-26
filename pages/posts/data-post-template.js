// Import the Supabase client
import { createClient } from '@supabase/supabase-js';

// Initialize the client with your Supabase project URL and API key
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
const supabase = createClient(supabaseUrl, supabaseKey)

// Define the table where you want to post data
const tableName = 'email_forms';

// Define the data you want to post
const dataToPost = {
  name: 'Charlie Snoopysnoot',
  message: 'i am coming for your scroopy doops. All of it',
  email: 'charlie@peanutsgang.net'
  // Add more columns and values as needed
};

// Post the data to the table
async function postData() {
  const { data, error } = await supabase.from(tableName).upsert([dataToPost]);

  if (error) {
    console.error('Error posting data:', error);
    return;
  }

  console.log('Data posted successfully:', data);
}

// Call the postData function to post your data//
postData();
//Diplay some ish //

export default function dataTemplate() {
    return <>
    <h1>Posting some data!</h1>
    <h2> Get with the program!</h2>
     <pre>{JSON.stringify(dataToPost, null, 2)}</pre>
    </>    
}