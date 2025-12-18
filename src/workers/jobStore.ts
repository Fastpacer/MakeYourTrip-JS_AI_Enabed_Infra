export type JobStatus = "queued" | "running" | "completed" | "failed";

export interface JobState {
  jobId: string;
  status: JobStatus;
  progress: number; // 0–100
  result?: any;
  error?: string;
}

const jobs = new Map<string, JobState>();

export function createJob(jobId: string): JobState {
  const job: JobState = {
    jobId,
    status: "queued",
    progress: 0
  };
  jobs.set(jobId, job);
  return job;
}

export function getJob(jobId: string): JobState | undefined {
  return jobs.get(jobId);
}

export function updateJob(jobId: string, patch: Partial<JobState>) {
  const job = jobs.get(jobId);
  if (!job) return;
  Object.assign(job, patch);
}
