const aiCodeReview = async (code) => {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-3.5-flash",
      contents:
        "Analyze the following code and provide a short and concise review of the code. Also, provide a list of potential improvements and suggestions for the code. " +
        code,
    });
    return response.text;
  } catch (error) {
    if (error.status === 503 || error.code === 503) {
      throw new Error("AI review service is busy right now, please try again in a moment.");
    }
    throw error;
  }
};