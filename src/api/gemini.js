export async function fetchLessonPlan(details) {
  try {
    const response = await fetch(`/api?key=AIzaSyDeaIu7FL-U85tkbrB2N7cckI1iwPde9qc`, {
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

    if (data && data.candidates && data.candidates.length > 0) {
      return data.candidates[0].content.parts[0].text;
    } else {
      throw new Error("Invalid API response format");
    }
  } catch (error) {
    console.error("Error fetching lesson plan:", error);
    return "Error generating lesson plan. Please try again.";
  }
}
