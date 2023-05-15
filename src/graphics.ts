import { Car } from "./Car";
import { Line } from "./Line";
import { Network } from "./Network";
import { Track } from "./Track";
import { Vector } from "./Vector";
import { clamp } from "./clamp";
import { hsl } from "./indexToColor";

let context: CanvasRenderingContext2D;
let canvas: HTMLCanvasElement;

export function getContext() {
  return context;
}

export function createCanvas() {
  canvas = document.createElement("canvas");
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  document.body.appendChild(canvas);
  context = canvas.getContext("2d")!;
}

export function drawLine(line: Line) {
  context.beginPath();
  context.moveTo(line.start.x, line.start.y);
  context.lineTo(line.end.x, line.end.y);
  context.stroke();
}

export function drawPoint(point: Vector) {
  context.beginPath();
  context.arc(point.x, point.y, 5, 0, Math.PI * 2);
  context.fill();
}

export function drawCar(car: Car) {
  context.save();
  context.translate(car.position.x, car.position.y);
  context.rotate(car.orientation);
  context.fillStyle = hsl(clamp(car.life * 2, 0, 360));
  context.fillRect(-5, -2.5, 10, 5);
  context.restore();
}

export function clearScreen() {
  context.clearRect(0, 0, canvas.width, canvas.height);
}

export function drawNetwork(network: Network, x: number, y: number) {
  const layersGap = 100;
  const neuronsGap = 50;

  for (let layerId = 0; layerId < network.layers.length; layerId++) {
    const layer = network.layers[layerId];

    for (let row = 0; row < layer.weights.rows; row++) {
      for (let col = 0; col < layer.weights.cols; col++) {
        context.beginPath();

        const weight = layer.weights.get(row, col);

        context.strokeStyle = `hsla(${
          weight < 0 ? 0 : 120
        }, 100%, 50%, ${Math.abs(weight)}`;
        context.lineWidth = 2;

        context.moveTo(x + layerId * layersGap, y + col * neuronsGap);
        context.lineTo(x + (layerId + 1) * layersGap, y + row * neuronsGap);

        context.stroke();
      }
    }
  }
}

export function drawTrack(track: Track) {
  context.strokeStyle = "#ddd";

  track.boundaries.forEach((line) => {
    drawLine(line);
  });

  context.strokeStyle = "#33d";

  track.gates.forEach((gate) => {
    drawLine(gate);
  });
}

export function drawText(x: number, y: number, text: string, color = "#fff") {
  context.fillStyle = color;
  context.fillText(text, x, y);
}
