const { GoogleGenAI } = require("@google/genai");

const ai = new GoogleGenAI({ apiKey: process.env.GOOGLE_API_KEY });

const aiCodeReview = async (code, attempt = 1) => {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash-lite",
      contents:
        "Analyze the following code and provide a short and concise review of the code. Also, provide a list of potential improvements and suggestions for the code. " +
        code,
    });
    return response.text;
  } catch (error) {
    const is503 = error.status === 503 || error.code === 503 || error.message?.includes("UNAVAILABLE");

    if (is503 && attempt < 3) {
      await new Promise((resolve) => setTimeout(resolve, 1000 * attempt)); // 1s, then 2s
      return aiCodeReview(code, attempt + 1);
    }

    throw new Error("AI review is temporarily unavailable. Please try again in a moment.");
  }
};

module.exports = { aiCodeReview };