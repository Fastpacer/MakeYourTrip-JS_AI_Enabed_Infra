import { log } from "../observability/logger";
import { recordJobSubmitted, getMetrics } from "../observability/metrics";
import { createJob, getJob } from "../workers/jobStore";
import { processItineraryJob } from "../workers/itineraryWorker";
import express from "express";
import { json } from "express";
import { v4 as uuidv4 } from "uuid";


const app = express();
const PORT = process.env.PORT || 3000;

app.use(json({ limit: "1mb" }));

/**
 * Health check
 */
app.get("/health", (_req, res) => {
  res.json({ status: "ok", service: "makeyourtrip-js" });
});

/**
 * Submit itinerary job
 * (stub for now – will be backed by queue/worker next)
 */
app.post("/itineraries", async (_req, res) => {
  const jobId = uuidv4();

  createJob(jobId);
  recordJobSubmitted();
  log("info", "job_submitted", { jobId });

  processItineraryJob(jobId);

  res.status(202).json({ jobId, status: "queued" });
});


/**
 * Get job status (stub)
 */
app.get("/jobs/:jobId", async (req, res) => {
  const { jobId } = req.params;
  const job = getJob(jobId);

  if (!job) {
    return res.status(404).json({ error: "Job not found" });
  }

  res.json(job);
});

app.get("/metrics", (_req, res) => {
  res.json(getMetrics());
});

app.listen(PORT, () => {
  console.log(`🚀 API server running on http://localhost:${PORT}`);
});


