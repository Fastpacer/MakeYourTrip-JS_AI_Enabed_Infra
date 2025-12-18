# Design Document — MakeYourTrip-JS (SortYourTrip)

## Overview

This project implements a production-style itinerary generation microservice in **Node.js + TypeScript**, designed to simulate how an AI-driven system could be built and operated in a real-world backend environment.

The primary goal of this implementation is **architectural and infrastructural clarity**, rather than maximizing model sophistication. The system emphasizes:
- modular agent orchestration
- asynchronous job processing
- observability and telemetry
- extensibility for future AI/ML integration

The result is a working prototype that demonstrates how an AI system could be *mounted on top of robust backend infrastructure*.

---

## High-Level Architecture

The service is composed of the following core layers:

1. **API Layer (Express)**
   - Handles request validation and job submission
   - Exposes job status, health checks, and metrics
   - Designed to return immediately for long-running tasks

2. **Worker Layer**
   - Processes itinerary generation asynchronously
   - Emits granular progress updates
   - Handles success, failure, and fallback scenarios

3. **Coordinator**
   - Orchestrates multiple independent agents
   - Resolves dependencies (e.g., activities depend on destination)
   - Aggregates agent outputs into a final itinerary

4. **Agent Modules**
   - `destinationAgent`
   - `activityAgent`
   - `transportAgent`
   - Each agent follows a consistent interface and returns:
     - choice
     - confidence score
     - reasoning text
     - metadata

5. **Observability**
   - Structured logging
   - Metrics for job throughput and latency
   - Designed to integrate with Prometheus-style scraping

---

## Agent Design

Agents are implemented as **pure, composable modules** with no direct knowledge of:
- HTTP
- queues
- storage
- orchestration logic

Each agent exposes:

```ts
run(input, context) -> {
  choice,
  score,
  reasoning,
  metadata
}


