export type TrainingExample = {
  culture: number; // 0–1
  beach: number;   // 0–1
  budget: number;  // 0–1
  label: "Paris" | "Goa";
};

export function generateDataset(): TrainingExample[] {
  return [
    { culture: 0.9, beach: 0.1, budget: 0.6, label: "Paris" },
    { culture: 0.8, beach: 0.2, budget: 0.7, label: "Paris" },
    { culture: 0.2, beach: 0.9, budget: 0.4, label: "Goa" },
    { culture: 0.1, beach: 0.8, budget: 0.5, label: "Goa" }
  ];
}
