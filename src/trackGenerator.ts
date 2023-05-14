import { createCanvas, drawTrack } from "./graphics";
import { runLoop } from "./runLoop";
import "./style.css";
import { generateTrack } from "./generateTrack";

function setup() {
  createCanvas();

  const track = generateTrack();

  function update() {}

  function draw() {
    drawTrack(track);
  }

  return { update, draw };
}

runLoop(setup());
