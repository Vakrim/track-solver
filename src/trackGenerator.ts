import { Vector } from "./Vector";
import { Point } from "./Point";
import { createCanvas, drawVector, getContext } from "./graphics";
import { runLoop } from "./runLoop";
import "./style.css";

function setup() {
  createCanvas();

  const middleVector = generateTrack();

  function update() {}

  function draw() {
    getContext().strokeStyle = "black";

    middleVector.forEach((vector) => {
      drawVector(vector);
    });
  }

  return { update, draw };
}

// function generateBorders(middleVector: Vector[]) {
//   for(let i = 0; i < middleVector.length; i++) {
//     const vector = middleVector[i]; 

//     const nextVector = middleVector[i + 1];
//   }
// };

function generateTrack() {
  let lastPoint = new Point(400, 400);

  const vectors: Vector[] = [];

  for (let i = 0; i < 20; i++) {
    const lastVector = vectors.at(-1);

    const nextVector = new Vector(
      lastPoint,
      new Point(lastPoint.x + 40, lastPoint.y + Math.random() * 100 - 50)
    ).rotate(lastVector?.angle ?? 0, lastPoint);

    vectors.push(nextVector);

    lastPoint = nextVector.end;
  }

  return vectors;
}


runLoop(setup());
