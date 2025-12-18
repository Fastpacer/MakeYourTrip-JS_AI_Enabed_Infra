import {
  destinationAgent,
  activityAgent,
  transportAgent
} from "../agents";

export interface ItineraryResult {
  destination: string;
  activities: string[];
  transport: string;
  reasoningTrace: Record<string, string>;
}

export async function runCoordinator(input: any): Promise<ItineraryResult> {
  const reasoningTrace: Record<string, string> = {};

  // 1️⃣ Destination agent
  const destinationResult = await destinationAgent(input);
  reasoningTrace.destinationAgent = destinationResult.reasoning;

  // 2️⃣ Activity agent (depends on destination)
  const activityResult = await activityAgent(input, {
    destination: destinationResult.choice
  });
  reasoningTrace.activityAgent = activityResult.reasoning;

  // 3️⃣ Transport agent (parallel-safe but simple here)
  const transportResult = await transportAgent(input, {
    destination: destinationResult.choice
  });
  reasoningTrace.transportAgent = transportResult.reasoning;

  return {
    destination: destinationResult.choice,
    activities: activityResult.choice,
    transport: transportResult.choice,
    reasoningTrace
  };
}
