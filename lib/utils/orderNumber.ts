export function generateOrderNumber(date: Date = new Date(), random: number = Math.random()): string {
  const datePart = date.toISOString().slice(0, 10).replace(/-/g, "");
  const randomPart = Math.floor(random * 36 ** 4)
    .toString(36)
    .toUpperCase()
    .padStart(4, "0");
  return `AE-${datePart}-${randomPart}`;
}
