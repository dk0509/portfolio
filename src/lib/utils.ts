export function cn(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(" ");
}

export function formatCompact(value: number) {
  if (value >= 1000) return `${Math.round(value / 1000)}K`;
  return String(value);
}
