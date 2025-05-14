
import OpenAI from "openai";
import dotenv from "dotenv";

dotenv.config();

// Initialize OpenAI API
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY, 
});

const categories = [
  "Academic Misconduct",
  "Harassment and Discrimination", 
  "Financial/Resources Misconduct",
  "Safety/Security Breaches" 
];

// Function to categorize a report using OpenAI
export const categorizeReport = async function(reportText) {
  try {
    const prompt = `Categorize this report into exactly one of these categories: ${categories.join(', ')}.
    Report: "${reportText}"
    Respond ONLY with the category name.`;

    const response = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        { role: "system", content: "You are a classification system that matches reports to categories." },
        { role: "user", content: prompt }
      ],
      temperature: 0.0
    });

    const category = response.choices[0].message.content.trim();
    return categories.includes(category) ? category : "Uncategorized";
  } catch (error) {
    console.error("Error categorizing report:", error.response?.data || error.message);
    return "Uncategorized";
  }
}