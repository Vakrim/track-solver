import { Vector } from "./Vector";
import { Point } from "./Point";
import { isPointInVectorBBox } from "./isPointInVectorBBox";

export function getIntersectionOfVectors(vector1: Vector, vector2: Vector) {
  const { x: x1, y: y1 } = vector1.start;
  const { x: x2, y: y2 } = vector1.end;
  const { x: x3, y: y3 } = vector2.start;
  const { x: x4, y: y4 } = vector2.end;

  const denominator = (x1 - x2) * (y3 - y4) - (x3 - x4) * (y1 - y2);

  // Vectors are parallel
  if (denominator === 0) {
    return null;
  }

  const xNumerator = (x1 * y2 - y1 * x2) * (x3 - x4) - (x1 - x2) * (x3 * y4 - y3 * x4);

  const yNumerator = (x1 * y2 - y1 * x2) * (y3 - y4) - (y1 - y2) * (x3 * y4 - y3 * x4);

  const point = new Point(xNumerator / denominator, yNumerator / denominator);

  if (!isPointInVectorBBox(vector1, point) || !isPointInVectorBBox(vector2, point)) {
    return null;
  }

  return point;
}
