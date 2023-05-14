import { Line } from "./Line";
import { Track } from "./Track";
import { Vector } from "./Vector";

export function createTrack() {
  let points = right.map(([x, y]) => new Vector(x, y));

  const lines: Line[] = [];

  for (let i = 0; i < points.length; i++) {
    const start = points.at(i - 1)!;
    const end = points.at(i)!;

    lines.push(new Line(start, end));
  }

  points = left.map(([x, y]) => new Vector(x, y));

  for (let i = 0; i < points.length; i++) {
    const start = points.at(i - 1)!;
    const end = points.at(i)!;

    lines.push(new Line(start, end));
  }

  const gates: Line[] = [];

  for (let i = 0; i < right.length; i++) {
    const start = left.at(i)!;
    const end = right.at(i)!;

    gates.push(new Line(new Vector(...start), new Vector(...end)));
  }

  return new Track(lines, gates, new Vector(150, 80), Math.PI * 0.75);
}

const right: [number, number][] = [
  [90, 90],
  [87, 149],
  [62, 192],
  [57, 222],
  [64, 261],
  [86, 292],
  [156, 319],
  [208, 332],
  [276, 375],
  [303, 425],
  [319, 465],
  [350, 500],
  [410, 509],
  [469, 491],
  [522, 434],
  [498, 344],
  [452, 291],
  [385, 258],
  [361, 211],
  [381, 134],
  [391, 88],
  [301, 36],
  [254, 25],
  [182, 35],
];

const left: [number, number][] = [
  [139, 110],
  [136, 141],
  [126, 168],
  [119, 201],
  [119, 239],
  [131, 263],
  [177, 279],
  [222, 287],
  [307, 334],
  [330, 364],
  [343, 415],
  [371, 439],
  [398, 466],
  [446, 449],
  [468, 400],
  [451, 352],
  [412, 315],
  [350, 282],
  [315, 228],
  [309, 162],
  [329, 104],
  [289, 75],
  [228, 79],
  [183, 87],
  [183, 87],
  [183, 87],
  [183, 87],
];
