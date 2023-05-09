export function sigmoid(x: number) {
  return 2 / (1 + Math.exp(-x)) - 1;
}
