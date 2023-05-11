import { Point } from "./Point";

export class Line {
  constructor(public start: Point, public end: Point) {}

  add(other: Line) {
    return new Line(this.start, this.end.subtract(other.start).add(other.end));
  }

  rotate(angle: number, origin: Point) {
    return new Line(
      this.start.rotate(angle, origin),
      this.end.rotate(angle, origin)
    );
  }

  get angle() {
    return Math.atan2(this.end.y - this.start.y, this.end.x - this.start.x);
  }
}
