export async function activityAgent(input: any, context: any) {
  const destination = context.destination;

  const activities =
    destination === "Paris"
      ? ["Louvre Museum", "Seine River Cruise", "Montmartre Walk"]
      : ["City Tour", "Local Cuisine Experience"];

  return {
    choice: activities,
    score: 0.76,
    reasoning: `Selected activities aligned with destination=${destination} and cultural interests.`,
    metadata: {
      dependency: "destination"
    }
  };
}
