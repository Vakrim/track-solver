import { Line } from "./Line";
import { Vector } from "./Vector";

export class Track {
  constructor(
    public boundaries: Line[],
    public gates: Line[],
    public startPosition: Vector,
    public startDirection: number
  ) {}
}
