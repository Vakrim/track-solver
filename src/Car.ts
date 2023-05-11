import { Vector } from "./Vector";
import { Network } from "./Network";
import { Point } from "./Point";
import { Track } from "./Track";
import { getIntersectionOfVectors } from "./getIntersectionOfVectors";
import { drawPoint } from "./graphics";

export class Car {
  public orientation = Math.random() * 0.2 - 0.1 + Math.PI * 0.5;
  public speed = 1;
  public rayLength = 100;
  public isDead = false;
  public currentGateScore = 0;
  public nextGateIndex = 0;

  public life = 200;

  public network = Network.createRandom(6, [5], 2);

  constructor(public position: Point) {}

  update(track: Track) {
    this.life--;
    if (this.life <= 0) {
      this.isDead = true;
      return;
    }

    const rays = this.observe(track);

    const inputs = [
      ...rays.map((ray) => ray / this.rayLength),
      this.speed / 10,
    ];

    const outputs = this.network.feedforward(inputs);

    const steeringOutput = outputs[0];
    const accelerationOutput = outputs[1];

    this.orientation += steeringOutput * 0.1;
    this.speed += accelerationOutput * 0.1;

    const nextPosition = new Point(
      this.position.x + Math.cos(this.orientation) * this.speed,
      this.position.y + Math.sin(this.orientation) * this.speed
    );

    const velocity = new Vector(this.position, nextPosition);

    const isCollision = this.getIsCollision(track, velocity);

    if (isCollision) {
      this.isDead = true;
    }

    this.checkGate(track, velocity);

    this.position = nextPosition;
  }

  getIsCollision(track: Track, velocity: Vector) {
    const collision = track.vectors.some((vector) => {
      const intersection = getIntersectionOfVectors(velocity, vector);

      if (!intersection) {
        return false;
      }

      drawPoint(intersection);

      return true;
    });

    return collision;
  }

  checkGate(track: Track, velocity: Vector) {
    const gate = track.gates[this.nextGateIndex];

    const intersection = getIntersectionOfVectors(velocity, gate);

    if (intersection) {
      this.currentGateScore++;
      this.nextGateIndex = this.currentGateScore % track.gates.length;
      this.life = 50;
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

    const ray = new Vector(
      this.position,
      new Point(
        this.position.x + Math.cos(rayAngle) * this.rayLength,
        this.position.y + Math.sin(rayAngle) * this.rayLength
      )
    );

    const closestIntersection = track.vectors.reduce<{
      point: Point;
      distance: number;
    } | null>((closest, vector): { point: Point; distance: number } | null => {
      const intersection = getIntersectionOfVectors(ray, vector);

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

    return closestIntersection.distance;
  }
}

function getDistanceBetweenPoints(a: Point, b: Point) {
  return Math.sqrt(Math.pow(a.x - b.x, 2) + Math.pow(a.y - b.y, 2));
}
