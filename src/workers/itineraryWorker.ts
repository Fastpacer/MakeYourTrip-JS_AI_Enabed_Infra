import { updateJob } from "./jobStore";
import { runCoordinator } from "../coordinator/coordinator";
import { log } from "../observability/logger";
import {
  recordJobCompleted,
  recordJobFailed
} from "../observability/metrics";

export async function processItineraryJob(jobId: string) {
  const start = Date.now();

  try {
    log("info", "job_started", { jobId });

    updateJob(jobId, { status: "running", progress: 5 });
    await sleep(400);

    updateJob(jobId, { progress: 25 });
    await sleep(400);

    updateJob(jobId, { progress: 50 });
    await sleep(400);

    updateJob(jobId, { progress: 75 });
    await sleep(400);

    log("info", "about_to_run_coordinator", { jobId });


    const itinerary = await runCoordinator({});

    log("info", "coordinator_finished", { jobId });


    updateJob(jobId, {
      status: "completed",
      progress: 100,
      result: itinerary
    });

    recordJobCompleted(Date.now() - start);
    log("info", "job_completed", {
      jobId,
      duration_ms: Date.now() - start
    });
  } catch (err: any) {
    console.error("WORKER ERROR:", err);

    recordJobFailed();
    log("error", "job_failed", {
      jobId,
      error: err?.message || err
    });

    updateJob(jobId, {
      status: "failed",
      error: err?.message || "Worker failed"
    });
  }
}

function sleep(ms: number): Promise<void> {
  return new Promise(resolve => setTimeout(resolve, ms));
}

