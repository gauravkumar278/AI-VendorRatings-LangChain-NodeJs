// Import the functions from the individual agent files
import { runPreferenceAgent, runRatingAgent } from './agents.js';
import { searchVendors } from './googleplaces_tool.js';
// Example User Input
const userPreferences = "I am looking for a refrigerator with a high energy efficiency rating, stainless steel finish, in New York City";
//const location = "New York City";

// Run the Agents Sequentially
(async () => {
    try {
        // Step 1: Run Preference Agent
        console.log("Step 1: Running Preference Agent...");
        const analyzedPreferences = await runPreferenceAgent(userPreferences);
        console.log("Analyzed Preferences:", analyzedPreferences);

        // // Step 2: Run Vendor Search Agent
        console.log("Step 2: Running Vendor Search Google Places Tool...");
        const vendorResults = await searchVendors(analyzedPreferences.places_query);
        console.log("Vendor Search Results:", vendorResults);

        // // Step 3: Run Rating Agent
        console.log("Running Rating Agent...");
        const personalizedRatings = await runRatingAgent(analyzedPreferences, vendorResults);
        console.log("Personalized Ratings:", personalizedRatings);

    } catch (error) {
        console.error("Error in running agents:", error);
    }
})();
