const API_BASE_URL = import.meta.env.PROD
  ? "https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent"
  : "/api"; // Use proxy in development

export async function fetchLessonPlan(details) {
  try {
    const response = await fetch(`${API_BASE_URL}?key=${import.meta.env.VITE_API_KEY}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        contents: [
          {
            parts: [
              {
                text: `Generate a lesson plan for: ${JSON.stringify(details)}`,
              },
            ],
          },
        ],
      }),
    });

    if (!response.ok) {
      throw new Error(`API request failed: ${response.status} ${response.statusText}`);
    }

    const data = await response.json();
    console.log("API Response:", data); // Debugging log

    if (data?.candidates?.[0]?.content?.parts?.[0]?.text) {
      return data.candidates[0].content.parts[0].text;
    } else {
      throw new Error("Invalid API response format");
    }
  } catch (error) {
    console.error("Error fetching lesson plan:", error);
    return "Error generating lesson plan. Please try again.";
  }
}
