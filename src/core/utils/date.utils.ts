export function getTodayDateString(): string {
  return new Date().toISOString().split('T')[0];
}
