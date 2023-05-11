import { Line } from "./Line";
import { Point } from "./Point";
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

// function generateBorders(middleLine: Line[]) {
//   for(let i = 0; i < middleLine.length; i++) {
//     const line = middleLine[i]; 

//     const nextLine = middleLine[i + 1];
//   }
// };

function generateTrack() {
  let lastPoint = new Point(400, 400);

  const lines: Line[] = [];

  for (let i = 0; i < 20; i++) {
    const lastLine = lines.at(-1);

    const nextLine = new Line(
      lastPoint,
      new Point(lastPoint.x + 40, lastPoint.y + Math.random() * 100 - 50)
    ).rotate(lastLine?.angle ?? 0, lastPoint);

    lines.push(nextLine);

    lastPoint = nextLine.end;
  }

  return lines;
}


runLoop(setup());
