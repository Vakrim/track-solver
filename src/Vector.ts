import { Point } from "./Point";

export class Vector {
  constructor(public start: Point, public end: Point) {}

  add(other: Vector) {
    return new Vector(
      this.start,
      this.end.subtract(other.start).add(other.end)
    );
  }

  subtract(other: Vector) {
    return new Vector(
      this.start,
      this.end.subtract(other.start).subtract(other.end)
    );
  }

  multiply(factor: number) {
    return new Vector(
      this.start,
      new Point(this.end.x * factor, this.end.y * factor)
    );
  }

  normalize() {
    const length = this.length;

    return new Vector(
      this.start,
      new Point(
        this.start.x + (this.end.x - this.start.x) / length,
        this.start.y + (this.end.y - this.start.y) / length
      )
    );
  }

  rotate(angle: number, origin: Point) {
    return new Vector(
      this.start.rotate(angle, origin),
      this.end.rotate(angle, origin)
    );
  }

  moveTo(point: Point) {
    return new Vector(point, point.add(this.end.subtract(this.start)));
  }

  get length() {
    return Math.sqrt(
      Math.pow(this.end.x - this.start.x, 2) +
        Math.pow(this.end.y - this.start.y, 2)
    );
  }

  get angle() {
    return Math.atan2(this.end.y - this.start.y, this.end.x - this.start.x);
  }
}
