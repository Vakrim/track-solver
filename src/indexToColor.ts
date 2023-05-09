export function indexToColor(index: number): string {
  return hsl(index * 10);
}

export function hsl(h: number): string {
  return `hsl(${h}, 100%, 50%)`;
}
