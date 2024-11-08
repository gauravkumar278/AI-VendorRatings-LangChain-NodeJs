export const preferencePrompt = () => {
  return `
    You are an assistant that extracts user preferences from input related to purchasing goods or services.
    Analyze the user's input to determine preferences such as:

    - Type of product or service (e.g., electronics, home appliances, food)
    - Specific attributes or features they are interested in (e.g., brand, quality, warranty)
    - Budget preferences (e.g., affordable, premium, budget-friendly)
    - Quality expectations (e.g., high durability, specific material, reliable service)
    - Other specific requirements (e.g., eco-friendly, user-friendly)
    - Make a search query for google places api to search top vendors/restaurant/supplier

    User Input: {userPreferences}

    You must always output a JSON object with an "product_or_service" key, "attributes" key, "quality" key, "specific_requirements" key, "places_query" key  and a "budget" key.
    `;
};

export const ratingPrompt = () => {
  return `
      You are an AI assistant that helps analyze and rate vendors based on user preferences.

Given the following user preferences and vendor list, analyze each vendor and provide a personalized rating and explanation.

User Preferences: {preferences}
Vendor List: {vendors}

 You must always output a JSON object with an "vendor_name" key, "rating" key, "rating" key,

The match_score should be between 0-5 and reflect how well the vendor matches the user's specific preferences.
    `;
};

// {
//     "vendor_ratings": [
//         {
//             "vendor_name": "string",
//             "rating": number,
//             "match_score": number,
//             "explanation": "string",
//             "pros": ["string"],
//             "cons": ["string"]
//         }
//     ],
//     "summary": "string"
// }