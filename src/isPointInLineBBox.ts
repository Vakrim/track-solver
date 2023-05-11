import { Line } from "./Line";
import { Point } from "./Point";

export function isPointInLineBBox(line: Line, point: Point) {
  const { x: x1, y: y1 } = line.start;
  const { x: x2, y: y2 } = line.end;

  const minX = Math.min(x1, x2);
  const maxX = Math.max(x1, x2);
  const minY = Math.min(y1, y2);
  const maxY = Math.max(y1, y2);

  return (
    point.x >= minX && point.x <= maxX && point.y >= minY && point.y <= maxY
  );
}
