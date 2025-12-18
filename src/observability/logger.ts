export type LogLevel = "info" | "error" | "warn";

export function log(
  level: LogLevel,
  event: string,
  payload: Record<string, any> = {}
) {
  const entry = {
    timestamp: new Date().toISOString(),
    level,
    event,
    ...payload
  };

  console.log(JSON.stringify(entry));
}
