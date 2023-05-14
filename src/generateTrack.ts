import { Line } from "./Line";
import { Vector } from "./Vector";
import { getIntersectionOfLines } from "./getIntersectionOfLines";
import { getDistanceBetweenPoints } from "./getDistanceBetweenPoints";
import { Track } from "./Track";

export function generateTrack() {
  const { gates, boundaries } = generateLines();

  const startBorder = gates.shift()!;
  const endBorder = gates.pop()!;
  boundaries.push(startBorder, endBorder);

  const startPoint = startBorder
    .getMidpoint()
    .add(gates[0].getMidpoint())
    .divide(2);

  const startDirection = gates[0].getMidpoint().subtract(startPoint).angle;

  return new Track(boundaries, gates, startPoint, startDirection);
}

function generateLines() {
  let gates, boundaries;

  do {
    const middleLine = generateMiddleLine();

    gates = alignLinesToTopLeft(generateGates(middleLine));

    boundaries = generateBoundaries(gates);
  } while (isSelfIntersecting(boundaries));

  return { gates, boundaries };
}

export function isSelfIntersecting(borders: Line[]) {
  for (let i = 0; i < borders.length; i++) {
    for (let j = i + 1; j < borders.length; j++) {
      const intersection = getIntersectionOfLines(borders[i], borders[j]);

      if (
        intersection &&
        getDistanceBetweenPoints(intersection, borders[i].start) > 1 &&
        getDistanceBetweenPoints(intersection, borders[i].end) > 1 &&
        getDistanceBetweenPoints(intersection, borders[j].start) > 1 &&
        getDistanceBetweenPoints(intersection, borders[j].end) > 1
      ) {
        return true;
      }
    }
  }

  return false;
}

function generateBoundaries(gates: Line[]) {
  const borders: Line[] = [];

  for (let i = 0; i < gates.length - 1; i++) {
    const gate = gates[i];
    const nextGate = gates[i + 1];

    const startsLine = new Line(gate.start, nextGate.start);
    const endsLine = new Line(gate.end, nextGate.end);

    if (getIntersectionOfLines(startsLine, endsLine) === null) {
      borders.push(
        new Line(gate.start, nextGate.start),
        new Line(gate.end, nextGate.end)
      );
    } else {
      borders.push(
        new Line(gate.start, nextGate.end),
        new Line(gate.end, nextGate.start)
      );
    }
  }

  return borders;
}

function generateGates(middleLine: Line[]) {
  const gates: Line[] = [];

  for (let i = 0; i < middleLine.length - 1; i++) {
    const vector = middleLine[i].getDirection().normalize();
    const nextVector = middleLine[i + 1].getDirection().normalize();

    const leftPoint = vector
      .subtract(nextVector)
      .normalize()
      .multiply(20)
      .add(middleLine[i].end);

    const rightPoint = vector
      .subtract(nextVector)
      .normalize()
      .multiply(-20)
      .add(middleLine[i].end);

    gates.push(new Line(leftPoint, rightPoint));
  }

  return gates;
}

function alignLinesToTopLeft(lines: Line[], padding = 20) {
  let xMin = Infinity;
  let yMin = Infinity;

  lines.forEach((line) => {
    const bbox = line.bbox;

    if (bbox.xMin < xMin) {
      xMin = bbox.xMin;
    }

    if (bbox.yMin < yMin) {
      yMin = bbox.yMin;
    }
  });

  const offsetX = -xMin + padding;
  const offsetY = -yMin + padding;

  return lines.map((line) => {
    return new Line(
      new Vector(line.start.x + offsetX, line.start.y + offsetY),
      new Vector(line.end.x + offsetX, line.end.y + offsetY)
    );
  });
}

function generateMiddleLine() {
  let lastPoint = new Vector(0, 0);

  const lines: Line[] = [];

  for (let i = 0; i < 20; i++) {
    const lastLine = lines.at(-1);

    const nextLine = new Vector(40, Math.random() * 100 - 50)
      .rotate(lastLine?.getDirection().angle ?? 0)
      .getLine(lastPoint);

    lines.push(nextLine);

    lastPoint = nextLine.end;
  }

  return lines;
}
