import { Line } from "./Line";

export class Track {
  public lines: Line[];
  public gates: Line[];

  constructor({ lines, gates }: TrackData) {
    this.lines = lines;
    this.gates = gates;
  }
}

interface TrackData {
  lines: Line[];
  gates: Line[];
}
