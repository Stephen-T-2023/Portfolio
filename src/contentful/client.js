import { createClient } from 'contentful'; // Import the Contentful client factory

const client = createClient({
  space: import.meta.env.VITE_CONTENTFUL_SPACE_ID,          // Project space ID from Vite env
  accessToken: import.meta.env.VITE_CONTENTFUL_ACCESS_TOKEN // API access token from Vite env
});

export default client; // Export the configured client for use throughout the app
