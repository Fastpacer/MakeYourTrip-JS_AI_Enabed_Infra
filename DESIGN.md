# Design Document — SortYourTrip / MakeYourTrip-JS

## 1. Problem Statement

The goal of this project is to design a production-like itinerary generation service that simulates AI reasoning using multiple agents. The system should support asynchronous execution, provide progress visibility, expose observability metrics, and remain extensible toward ML-backed inference — all within a Node.js + TypeScript ecosystem.

The focus is on **system design and orchestration**, not on integrating large external AI models.

---

## 2. High-Level Architecture

The system is composed of four main layers:

1. **API Layer** — Accepts user requests and exposes job status
2. **Background Worker** — Executes itinerary generation asynchronously
3. **Coordinator** — Orchestrates agent execution and dependencies
4. **Agents** — Independent decision-making modules

This separation ensures:
- Loose coupling between components
- Clear ownership of responsibilities
- Replaceability of individual parts (e.g., agents, queue backend)

---

## 3. Agent-Based Reasoning Model

### 3.1 Why Agents?

Instead of a monolithic decision engine, the system decomposes itinerary planning into specialized agents:

- `destinationAgent`
- `activityAgent`
- `transportAgent`

Each agent:
- Operates independently
- Focuses on a single responsibility
- Returns both a decision and an explanation

This mirrors real-world AI systems where multiple subsystems contribute partial decisions that are later combined.

---

### 3.2 Agent Interface

All agents expose the same interface:

```ts
run(input, context): Promise<AgentResult>
