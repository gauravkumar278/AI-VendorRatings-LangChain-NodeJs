import { GooglePlacesAPI } from "@langchain/community/tools/google_places";
import 'dotenv/config';

// Initialize the Google Places tool
const placesTool = new GooglePlacesAPI({
    apiKey: process.env.GOOGLE_PLACES_API_KEY // Make sure to set this in your environment variables
});

// Function to search for vendors
export async function searchVendors(searchQuery) {
    try {
        // Construct search query
        //const searchQuery = `${searchType} in ${location}`;
        const results = await placesTool.invoke(searchQuery);
        // Parse and format the results
        const vendors = JSON.parse(results);
        // Extract relevant information
        return vendors.map(vendor => ({
            name: vendor.name,
            rating: vendor.rating,
            // address: vendor.address,
            // phoneNumber: vendor.phoneNumber,
            // website: vendor.website,
            // reviews: vendor.reviews,
            // user_ratings_total: vendor.userRatingCount,
            // place_id: vendor.id
        }));
    } catch (error) {
        console.error("Error searching vendors:", error);
        throw error;
    }
}