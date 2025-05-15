
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
  "Safety/Security Breaches",
  "None of the Above"
];

// Function to categorize a report using OpenAI
export const categorizeReport = async function (reportText) {
  if (!reportText || reportText.trim().length < 5) {
    return "Uncategorized";
  }
  try {
    const prompt = `You will be given a report. Categorize it into **exactly one** of the following categories, or say "None of the Above" if it doesn't fit any:
- Academic Misconduct
- Harassment and Discrimination
- Financial/Resources Misconduct
- Safety/Security Breaches

Report: "${reportText}"

Respond ONLY with the category name from the list above, or say "None of the Above".`;


    const response = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        { role: "system", content: "You are a classification system that matches reports to categories." },
        { role: "user", content: prompt }
      ],
      temperature: 0.0
    });

    const category = response.choices[0].message.content.trim();
    return categories.includes(category) ? (category === "None of the Above" ? "spam" : category) : "spam";

  } catch (error) {
    console.error("Error categorizing report:", error.response?.data || error.message);
    return "Uncategorized";
  }
}
