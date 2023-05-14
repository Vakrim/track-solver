import { BBox } from "./BBox";

export function areBBoxesIntersecting(a: BBox, b: BBox) {
  return (
    a.xMin <= b.xMax && a.xMax >= b.xMin && a.yMin <= b.yMax && a.yMax >= b.yMin
  );
}
