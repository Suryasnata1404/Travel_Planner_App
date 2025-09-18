import { GoogleGenerativeAI } from "@google/generative-ai";

const apiKey = import.meta.env.VITE_GOOGLE_GEMINI_AI_API_KEY;
const genAI = new GoogleGenerativeAI(apiKey);

const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" }); // Use latest model
//console.log("Gemini API key:", apiKey ? "Loaded ✅" : "Not found ❌");

const generationConfig = {
  temperature: 1,
  topP: 0.95,
  topK: 64,
  maxOutputTokens: 8192,
  responseMimeType: "application/json",
};

export async function generateTravelPlan(location, totalDays, traveler, budget) {
  const AI_PROMPT = `Generate a travel plan for:
  - Location: ${location}
  - Days: ${totalDays}
  - Travelers: ${traveler}
  - Budget: ${budget}

Return a JSON with:
1. hotel_options: list of { name, address, price, image_url, geo_coordinates, rating, description }
2. itinerary: for each day, a plan with { time, place, details, image_url, geo_coordinates, ticket_pricing, rating, best_time_to_visit }`;

  try {
    const result = await model.generateContent({
      contents: [{ role: "user", parts: [{ text: AI_PROMPT }] }],
      generationConfig,
    });

    let text = result.response.text();

    // Clean Gemini's response (removes ```json ... ```)
    text = text.replace(/```json|```/g, "").trim();

    return JSON.parse(text);
  } catch (err) {
    console.error("Gemini API error:", err);
    return null;
  }
}
