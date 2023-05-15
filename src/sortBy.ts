export function sortBy<T>(items: T[], getValue: (item: T) => number) {
  const values = new Map(items.map((item) => [item, getValue(item)]));

  return [...items].sort((a, b) => values.get(a)! - values.get(b)!);
}
