import { BBox } from "./BBox";
import { Vector } from "./Vector";

export class Line {
  #bbox: BBox | null = null;

  constructor(public start: Vector, public end: Vector) {}

  getDirection() {
    return new Vector(this.end.x - this.start.x, this.end.y - this.start.y);
  }

  getMidpoint() {
    return new Vector(
      (this.start.x + this.end.x) / 2,
      (this.start.y + this.end.y) / 2
    );
  }

  get bbox() {
    this.#bbox ??= {
      xMin: Math.min(this.start.x, this.end.x),
      xMax: Math.max(this.start.x, this.end.x),
      yMin: Math.min(this.start.y, this.end.y),
      yMax: Math.max(this.start.y, this.end.y),
    };
    return this.#bbox;
  }
}
