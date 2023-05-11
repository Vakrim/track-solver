import { Vector } from "./Vector";

export class Track {
  public vectors: Vector[];
  public gates: Vector[];

  constructor({ vectors, gates }: TrackData) {
    this.vectors = vectors;
    this.gates = gates;
  }
}

interface TrackData {
  vectors: Vector[];
  gates: Vector[];
}
