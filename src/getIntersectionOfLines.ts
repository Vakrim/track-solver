import { Line } from "./Line";
import { isPointInLineBBox } from "./isPointInLineBBox";
import { areBBoxesIntersecting } from "./areBBoxesIntersecting";
import { Vector } from "./Vector";

export function getIntersectionOfLines(line1: Line, line2: Line) {
  if (!areBBoxesIntersecting(line1.bbox, line2.bbox)) {
    return null;
  }

  const { x: x1, y: y1 } = line1.start;
  const { x: x2, y: y2 } = line1.end;
  const { x: x3, y: y3 } = line2.start;
  const { x: x4, y: y4 } = line2.end;

  const denominator = (x1 - x2) * (y3 - y4) - (x3 - x4) * (y1 - y2);

  // Lines are parallel
  if (denominator === 0) {
    return null;
  }

  const xNumerator =
    (x1 * y2 - y1 * x2) * (x3 - x4) - (x1 - x2) * (x3 * y4 - y3 * x4);

  const yNumerator =
    (x1 * y2 - y1 * x2) * (y3 - y4) - (y1 - y2) * (x3 * y4 - y3 * x4);

  const point = new Vector(xNumerator / denominator, yNumerator / denominator);

  if (!isPointInLineBBox(line1, point) || !isPointInLineBBox(line2, point)) {
    return null;
  }

  return point;
}
