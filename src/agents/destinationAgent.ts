export async function destinationAgent(input: any) {
  // Simple heuristic logic (ML can replace later)
  const destination = "Paris";

  return {
    choice: destination,
    score: 0.82,
    reasoning: "User prefers culture and city travel; budget fits European destinations.",
    metadata: {
      model: "heuristic-v1"
    }
  };
}
