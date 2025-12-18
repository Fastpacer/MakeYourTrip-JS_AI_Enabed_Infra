export async function transportAgent(input: any, context: any) {
  const transport =
    context.destination === "Paris" ? "Metro + Walking" : "Public Transport";

  return {
    choice: transport,
    score: 0.69,
    reasoning: "Dense urban layout favors public transport and walking.",
    metadata: {}
  };
}
