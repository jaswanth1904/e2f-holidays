import { createClient } from '@sanity/client';
import imageUrlBuilder from '@sanity/image-url';

export const client = createClient({
  projectId: '9ti264f4', // E2F Holidays CMS project ID
  dataset: 'production',
  apiVersion: '2024-03-01', // use current date (YYYY-MM-DD) to target the latest API version
  useCdn: true, // `false` if you want to ensure fresh data
});

const builder = imageUrlBuilder(client);

// Helper function to resolve images from Sanity
export const urlFor = (source) => builder.image(source);
