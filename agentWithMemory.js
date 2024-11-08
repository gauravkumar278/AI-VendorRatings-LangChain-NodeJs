// ... existing imports ...
import { BufferMemory } from "langchain/memory";
import { ConversationChain } from "langchain/chains";

// Add this after existing initialization code
const sessions = new Map();

function getOrCreateMemory(sessionId) {
    if (!sessions.has(sessionId)) {
        sessions.set(sessionId, new BufferMemory({
            returnMessages: true,
            memoryKey: "history"
        }));
    }
    return sessions.get(sessionId);
}

// ... keep existing preference agent unchanged ...

// Updated Rating Agent with memory
export async function runRatingAgent(preferences, vendorList, sessionId) {
    const memory = getOrCreateMemory(sessionId);
    const promptText = ratingPrompt();
    const prompt = PromptTemplate.fromTemplate(promptText);
    
    const chain = new ConversationChain({
        llm: model,
        memory: memory,
        prompt: prompt,
        outputParser: new JsonOutputParser()
    });

    const response = await chain.call({
        input: {
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
        }
    });
    
    return response.response;
}

// Optional: Clean up session memory
export function clearRatingSession(sessionId) {
    sessions.delete(sessionId);
}