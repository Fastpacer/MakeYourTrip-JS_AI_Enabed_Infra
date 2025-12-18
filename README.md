# SortYourTrip / MakeYourTrip-JS

## Overview

This project is a production-oriented itinerary generation microservice built with **Node.js and TypeScript**.  
It demonstrates how AI-style reasoning systems can be structured using **modular agents**, asynchronous execution, and strong observability  without relying on external AI APIs.

Instead of calling an LLM, the system **simulates AI reasoning** using deterministic and probabilistic logic.  
The emphasis is on **architecture, orchestration, explainability, and reliability**, not model size.

---

## What This Project Demonstrates

- Agent-based decision making (destination, activities, transport)
- Coordinator-driven orchestration and dependency handling
- Asynchronous background job execution
- Progress tracking and telemetry
- Explainable reasoning traces
- Clean separation between inference logic and system plumbing

Agents are structured so their internal logic can later be replaced by ML or LLM-backed models without changing the surrounding system.

---

## System Flow

1. Client submits an itinerary request
2. API immediately returns a job ID
3. Background worker executes the planning workflow
4. Agents run and produce decisions + reasoning
5. Results are stored and observable via polling
6. Metrics and logs capture system behavior

---

## Core Components

### API (`src/api`)
- Express server
- Endpoints:
  - `POST /itineraries`
  - `GET /jobs/:jobId`
  - `GET /metrics`
  - `GET /health`

### Worker (`src/workers`)
- In-memory background worker
- Emits granular progress updates
- Invokes coordinator and persists results
- Designed to be replaceable with BullMQ + Redis

### Coordinator (`src/coordinator`)
- Orchestrates agent execution
- Handles dependencies between agents
- Aggregates results and reasoning traces

### Agents (`src/agents`)
Each agent:
- Is isolated and independently testable
- Returns:
  - choice
  - confidence score
  - reasoning text
- Uses heuristic logic to simulate decision making

---

## Observability

The service includes basic production-style observability:

- Structured JSON logs
- In-memory Prometheus-style metrics
- `/metrics` endpoint exposing:
  - jobs_submitted
  - jobs_completed
  - jobs_failed
  - avg_job_latency_ms

Observability was used during development to surface and fix async worker failures.

---

## ML & Evaluation (Scaffolding)

The `ml` and `evaluator` directories contain **lightweight reference implementations**:
- Synthetic dataset generation
- Training hooks
- Evaluation entry points

These are intentionally minimal and included to demonstrate **how ML-backed agents would integrate**, not to deliver a full model in one day.

---

## Running Locally

```bash
npm install
npm run dev
