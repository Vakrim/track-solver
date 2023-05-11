import { Point } from "./Point";
import { Vector } from "./Vector";

export class Line {
  constructor(public start: Point, public end: Point) {}

  getDirection() {
    return new Vector(this.end.x - this.start.x, this.end.y - this.start.y);
  }
}
