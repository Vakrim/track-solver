import { Car } from "./Car";
import { Line } from "./Line";
import { Point } from "./Point";
import { clamp } from "./clamp";
import { hsl } from "./indexToColor";

let context: CanvasRenderingContext2D;

export function getContext() {
  return context;
}

export function createCanvasAndGetContext() {
  const canvas = document.createElement("canvas");
  canvas.width = 800;
  canvas.height = 600;
  document.body.appendChild(canvas);
  context = canvas.getContext("2d")!;
}

export function drawLine(line: Line) {
  context.beginPath();
  context.moveTo(line.start.x, line.start.y);
  context.lineTo(line.end.x, line.end.y);
  context.stroke();
}

export function drawPoint(point: Point) {
  context.beginPath();
  context.arc(point.x, point.y, 5, 0, Math.PI * 2);
  context.fill();
}

export function drawCar(car: Car) {
  context.save();
  context.translate(car.position.x, car.position.y);
  context.rotate(car.orientation);
  context.fillStyle = hsl(clamp(car.life, 0, 360));
  context.fillRect(-5, -2.5, 10, 5);
  context.restore();
}

export function clearScreen() {
  context.clearRect(0, 0, 800, 600);
}
