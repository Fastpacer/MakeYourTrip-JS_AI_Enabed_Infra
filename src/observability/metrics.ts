let jobsSubmitted = 0;
let jobsCompleted = 0;
let jobsFailed = 0;
let totalJobTimeMs = 0;

export function recordJobSubmitted() {
  jobsSubmitted += 1;
}

export function recordJobCompleted(durationMs: number) {
  jobsCompleted += 1;
  totalJobTimeMs += durationMs;
}

export function recordJobFailed() {
  jobsFailed += 1;
}

export function getMetrics() {
  const avgJobLatency =
    jobsCompleted === 0 ? 0 : totalJobTimeMs / jobsCompleted;

  return {
    jobs_submitted: jobsSubmitted,
    jobs_completed: jobsCompleted,
    jobs_failed: jobsFailed,
    avg_job_latency_ms: avgJobLatency
  };
}
