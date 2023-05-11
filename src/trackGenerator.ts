import { Line } from "./Line";
import { Point } from "./Point";
import { Vector } from "./Vector";
import { createCanvas, drawLine, getContext } from "./graphics";
import { runLoop } from "./runLoop";
import { getIntersectionOfLines } from "./getIntersectionOfLines";
import "./style.css";
import { getDistanceBetweenPoints } from "./getDistanceBetweenPoints";

function setup() {
  createCanvas();

  const middleLine = generateTrack();

  const gates = generateGates(middleLine);

  const borders = generateBorders(gates);

  function update() {}

  function draw() {
    getContext().strokeStyle = "black";

    middleLine.forEach((line) => {
      drawLine(line);
    });

    getContext().strokeStyle = "green";

    gates.forEach((gate) => {
      drawLine(gate);
    });

    getContext().strokeStyle = "white";

    borders.forEach((border) => {
      drawLine(border);
    });

    validateSelfIntersection(borders);
  }

  return { update, draw };
}

function validateSelfIntersection(borders: Line[]) {
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
        throw new Error("Self intersection");
      }
    }
  }
}

function generateBorders(gates: Line[]) {
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

function generateTrack() {
  let lastPoint = new Point(400, 400);

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

runLoop(setup());
