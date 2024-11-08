import { ChatOpenAI } from "@langchain/openai";
import { AgentExecutor, createOpenAIToolsAgent } from "langchain/agents";
import { preferencePrompt, ratingPrompt } from "./prompt.js";
import { GooglePlacesAPI } from "@langchain/community/tools/google_places";
import { PromptTemplate } from "@langchain/core/prompts";
import { JsonOutputParser } from "@langchain/core/output_parsers";
import 'dotenv/config';

const openAIApiKey = process.env.OPENAI_API_KEY;
// Initialize OpenAI
const model = new ChatOpenAI({
    apiKey: openAIApiKey,
    model: "gpt-4o", // Replace with your API key
    //verbose: true
});

// Preference Agent
export async function runPreferenceAgent(userPreferences) {
    const promptText = preferencePrompt();
    //console.log("promptText", promptText);
    const prompt = PromptTemplate.fromTemplate(promptText);
    const chain = prompt.pipe(model).pipe(new JsonOutputParser());
    const userInput = {
        userPreferences: userPreferences
    }
    const response = await chain.invoke(userInput);
    return response;
}

// Rating Agent
export async function runRatingAgent(preferences, vendorList) {
    const promptText = ratingPrompt();
    const prompt = PromptTemplate.fromTemplate(promptText);
    const chain = prompt.pipe(model).pipe(new JsonOutputParser());
    
    const userInput = {
        preferences: JSON.stringify({
            product: preferences.product_or_service,
            attributes: preferences.attributes,
            quality: preferences.quality,
            requirements: preferences.specific_requirements,
            budget: preferences.budget
        }),
        vendors: JSON.stringify(vendorList.map(vendor => ({
            name: vendor.name,
            rating: vendor.rating,
            reviews: vendor.reviews,
            totalRatings: vendor.user_ratings_total
        })))
    };
    
    const response = await chain.invoke(userInput);
    return response;
}
