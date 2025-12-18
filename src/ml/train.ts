import { generateDataset } from "./datasetGenerator";
import { saveModel } from "./modelStore";

function train() {
  const data = generateDataset();

  // Simple linear weight estimation (mean contribution)
  let culture = 0;
  let beach = 0;
  let budget = 0;

  data.forEach(d => {
    if (d.label === "Paris") {
      culture += d.culture;
      budget += d.budget;
    } else {
      beach += d.beach;
    }
  });

  const model = {
    weights: {
      culture: culture / data.length,
      beach: beach / data.length,
      budget: budget / data.length
    }
  };

  saveModel(model);
  console.log("✅ Model trained and saved:", model);
}

train();
