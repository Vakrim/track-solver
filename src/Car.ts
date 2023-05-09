import { Line } from "./Line";
import { Neuron } from "./Neuron";
import { Point } from "./Point";
import { Track } from "./Track";
import { getIntersectionOfLines } from "./getIntersectionOfLines";
import { drawPoint } from "./graphics";

export class Car {
  public orientation = Math.random() * 0.2 - 0.1 + Math.PI * 0.5;
  public speed = 1;
  public rayLength = 100;
  public isDead = false;
  public currentGateScore = 0;
  public nextGateIndex = 0;

  public life = 200;

  public steeringNeuron = Neuron.createRandom(5);
  public accelerationNeuron = Neuron.createRandom(5);

  constructor(public position: Point) {}

  update(track: Track) {
    this.life--;
    if (this.life <= 0) {
      this.isDead = true;
      return;
    }

    const rays = this.observe(track);

    const inputs = rays.map((ray) => ray / this.rayLength);

    const steeringOutput = this.steeringNeuron.feedforward(inputs);
    const accelerationOutput = this.accelerationNeuron.feedforward(inputs);

    this.orientation += steeringOutput * 0.1;
    this.speed += accelerationOutput * 0.1;

    const nextPosition = new Point(
      this.position.x + Math.cos(this.orientation) * this.speed,
      this.position.y + Math.sin(this.orientation) * this.speed
    );

    const velocity = new Line(this.position, nextPosition);

    const isCollision = this.getIsCollision(track, velocity);

    if (isCollision) {
      this.isDead = true;
    }

    this.checkGate(track, velocity);

    this.position = nextPosition;
  }

  getIsCollision(track: Track, velocity: Line) {
    const collision = track.lines.some((line) => {
      const intersection = getIntersectionOfLines(velocity, line);

      if (!intersection) {
        return false;
      }

      drawPoint(intersection);

      return true;
    });

    return collision;
  }

  checkGate(track: Track, velocity: Line) {
    const gate = track.gates[this.nextGateIndex];

    const intersection = getIntersectionOfLines(velocity, gate);

    if (intersection) {
      this.currentGateScore++;
      this.nextGateIndex = this.currentGateScore % track.gates.length;
      this.life = 100;
    }
  }

  public observe(track: Track) {
    const rays = [
      this.castRay(track, Math.PI * -0.5),
      this.castRay(track, Math.PI * -0.25),
      this.castRay(track, 0),
      this.castRay(track, Math.PI * 0.25),
      this.castRay(track, Math.PI * 0.5),
    ];

    return rays;
  }

  private castRay(track: Track, angle: number) {
    const rayAngle = this.orientation + angle;

    const ray = new Line(
      this.position,
      new Point(
        this.position.x + Math.cos(rayAngle) * this.rayLength,
        this.position.y + Math.sin(rayAngle) * this.rayLength
      )
    );

    const closestIntersection = track.lines.reduce<{
      point: Point;
      distance: number;
    } | null>((closest, line): { point: Point; distance: number } | null => {
      const intersection = getIntersectionOfLines(ray, line);

      if (!intersection) {
        return closest;
      }

      const intersectionDistance = getDistanceBetweenPoints(
        this.position,
        intersection
      );

      if (!closest || intersectionDistance < closest.distance) {
        return { point: intersection, distance: intersectionDistance };
      }

      return closest;
    }, null);

    if (!closestIntersection) {
      return this.rayLength;
    }

    // drawPoint(closestIntersection.point);

    return closestIntersection.distance;
  }
}

function getDistanceBetweenPoints(a: Point, b: Point) {
  return Math.sqrt(Math.pow(a.x - b.x, 2) + Math.pow(a.y - b.y, 2));
}
