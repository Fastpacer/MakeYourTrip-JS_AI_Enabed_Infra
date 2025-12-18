import fs from "fs";
import path from "path";

export type DestinationModel = {
  weights: {
    culture: number;
    beach: number;
    budget: number;
  };
};

const MODEL_PATH = path.join(__dirname, "model.json");

export function saveModel(model: DestinationModel) {
  fs.writeFileSync(MODEL_PATH, JSON.stringify(model, null, 2));
}

export function loadModel(): DestinationModel {
  if (!fs.existsSync(MODEL_PATH)) {
    throw new Error("Model not trained. Run `npm run train` first.");
  }
  return JSON.parse(fs.readFileSync(MODEL_PATH, "utf-8"));
}
