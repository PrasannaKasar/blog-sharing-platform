// models/summarizer.js

// Import the Google Generative AI library
const { GoogleGenerativeAI } = require("@google/generative-ai");

// Access your API key from environment variables
// Ensure GEMINI_API_KEY is set in your .env file
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

/**
 * Summarizes the provided text using the Gemini Pro model.
 * @param {string} text - The content to be summarized.
 * @returns {Promise<string>} - A promise that resolves with the summarized text.
 */
const summarizeTextWithGemini = async (text) => {
  try {
    // For text-only input, use the gemini-pro model which is compatible with generateContent
    const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });

    // Define the prompt to summarize the text
    const prompt = `Summarize the following blog content:\n\n${text}`;

    // Call the Gemini API to generate the summary
    const result = await model.generateContent(prompt);
    const response = await result.response;

    // Extract the summarized text from the response
    const summary = response.text().trim();
    return summary;
  } catch (err) {
    console.error('Error summarizing with Gemini:', err);
    throw new Error('Summarization failed');
  }
};

module.exports = { summarizeTextWithGemini };