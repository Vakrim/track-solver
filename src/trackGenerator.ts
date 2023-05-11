import { Line } from "./Line";
import { Point } from "./Point";
import { Vector } from "./Vector";
import { createCanvas, drawLine, getContext } from "./graphics";
import { runLoop } from "./runLoop";
import "./style.css";

function setup() {
  createCanvas();

  const middleLine = generateTrack();

  function update() {}

  function draw() {
    getContext().strokeStyle = "black";

    middleLine.forEach((line) => {
      drawLine(line);
    });
  }

  return { update, draw };
}

function generateBorders(middleLine: Vector[]) {
  for (let i = 0; i < middleLine.length - 1; i++) {
    const vector = middleLine[i];
    const nextVector = middleLine[i + 1];

    const vector.subtract(nextVector).normalize().multiply(10).moveTo(vector.end);
  }
}

function generateTrack() {
  let lastPoint = new Point(400, 400);

  const lines: Line[] = [];

  for (let i = 0; i < 20; i++) {
    const lastLine = lines.at(-1);

    const nextLine = new Vector(
      40,  Math.random() * 100 - 50
    ).rotate(lastLine?.getDirection().angle ?? 0).getLine(lastPoint);

    lines.push(nextLine);

    lastPoint = nextLine.end;
  }

  return lines;
}

runLoop(setup());
