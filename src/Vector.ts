import { Line } from "./Line";
import { Point } from "./Point";

interface PointLike {
  x: number;
  y: number;
}

export class Vector {
  constructor(public x: number, public y: number) {}

  add(other: PointLike) {
    return new Vector(this.x + other.x, this.y + other.y);
  }

  subtract(other: PointLike) {
    return new Vector(this.x - other.x, this.y - other.y);
  }

  multiply(factor: number) {
    return new Vector(this.x * factor, this.y * factor);
  }

  normalize() {
    const length = this.length;

    return new Vector(this.x / length, this.y / length);
  }

  rotate(angle: number) {
    return new Vector(
      this.x * Math.cos(angle) - this.y * Math.sin(angle),
      this.x * Math.sin(angle) + this.y * Math.cos(angle)
    );
  }

  getLine(start: Point) {
    return new Line(start, start.add(this));
  }

  get length() {
    return Math.sqrt(Math.pow(this.x, 2) + Math.pow(this.y, 2));
  }

  get angle() {
    return Math.atan2(this.y, this.x);
  }
}
