import { Vector } from "./Vector";
import { Point } from "./Point";

export function isPointInVectorBBox(vector: Vector, point: Point) {
  const { x: x1, y: y1 } = vector.start;
  const { x: x2, y: y2 } = vector.end;

  const minX = Math.min(x1, x2);
  const maxX = Math.max(x1, x2);
  const minY = Math.min(y1, y2);
  const maxY = Math.max(y1, y2);

  return (
    point.x >= minX && point.x <= maxX && point.y >= minY && point.y <= maxY
  );
}
