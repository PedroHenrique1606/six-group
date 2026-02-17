export type Messages = Record<string, unknown>;

export function getMessage(messages: Messages, key: string): unknown {
  const parts = key.split(".");
  let current: unknown = messages;
  for (const part of parts) {
    if (current == null || typeof current !== "object") return undefined;
    current = (current as Record<string, unknown>)[part];
  }
  return current;
}

export function getString(messages: Messages, key: string): string {
  const value = getMessage(messages, key);
  return typeof value === "string" ? value : key;
}
