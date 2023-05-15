import { clamp } from "./clamp";

export function indexToColor(index: number): string {
  return hsl(index * 10);
}

export function hsl(h: number): string {
  return `hsl(${h}, 100%, 50%)`;
}

export function colorOfRange(value: number, min: number, max: number): string {
  const clamped = clamp(value, min, max);
  const hue = (clamped - min) / (max - min) * 240;
  return hsl(hue);
}
