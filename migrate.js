import { createClient } from '@sanity/client';
import { cruisePackages, tourPackages } from './src/data/packages.js';
import { southIndiaPackages } from './src/data/southIndiaPackages.js';

// Setup client for mutation (requires a token)
const client = createClient({
  projectId: 'gzvlzfo2',
  dataset: 'production',
  apiVersion: '2024-03-01',
  useCdn: false,
  // token: 'YOUR_SANITY_TOKEN' // We will need the user to provide this to run it
});

const migrateData = async () => {
    console.log('Migration requires a Sanity API Token with Write access.');
    // We can't automatically run this without an API token from Sanity.
    // Instead of forcing the user to create a token, it might be easier for them 
    // to just add packages manually as needed, or we can use the studio.
}

migrateData();
