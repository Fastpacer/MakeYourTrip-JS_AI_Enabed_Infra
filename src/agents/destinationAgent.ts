import { loadModel, DestinationModel } from "../ml/modelStore";

export async function destinationAgent(input: any) {
  let model: DestinationModel;
  let usedFallback = false;

  try {
    model = loadModel();
  } catch {
    // Fallback model if training not run
    usedFallback = true;
    model = {
      weights: {
        culture: 0.6,
        beach: 0.4,
        budget: 0.5
      }
    };
  }

  // Normalize inputs (0–1)
  const culture = typeof input?.culture === "number" ? input.culture : 0.7;
  const beach = typeof input?.beach === "number" ? input.beach : 0.3;
  const budget = typeof input?.budget === "number" ? input.budget : 0.5;

  const parisScore =
    model.weights.culture * culture +
    model.weights.budget * budget;

  const goaScore =
    model.weights.beach * beach +
    model.weights.budget * budget;

  const choice = parisScore >= goaScore ? "Paris" : "Goa";
  const rawScore = Math.max(parisScore, goaScore);
  const confidence = Math.min(1, Math.max(0, rawScore));

  return {
    choice,
    score: confidence,
    reasoning: usedFallback
      ? "Fallback heuristic model used because ML model was not trained."
      : "Destination selected using a trained linear scoring model.",
    metadata: {
      parisScore,
      goaScore,
      model: usedFallback ? "heuristic-fallback" : "linear-ml-v1"
    }
  };
}
