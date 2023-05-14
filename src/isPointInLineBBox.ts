import { Line } from "./Line";
import { Vector } from "./Vector";

export function isPointInLineBBox(line: Line, point: Vector) {
  const { xMin, xMax, yMin, yMax } = line.bbox;

  return (
    point.x >= xMin && point.x <= xMax && point.y >= yMin && point.y <= yMax
  );
}
