import { Line } from "./Line";
import { Network } from "./Network";
import { Track } from "./Track";
import { Vector } from "./Vector";
import { getIntersectionOfLines } from "./getIntersectionOfLines";

export class Car {
  public orientation = 0;
  public speed = 1;
  public rayLength = 100;
  public isDead = false;
  public score = 0;
  public nextGateIndex = 0;
  public position = new Vector(0, 0);

  public life = 200;

  constructor(public network = Network.createRandom(6, [5], 2)) {}

  update(track: Track) {
    this.life--;
    this.score--;
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
    this.speed += accelerationOutput * 0.3;

    const nextPosition = new Vector(
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
    const collision = track.boundaries.some((line) => {
      const intersection = getIntersectionOfLines(velocity, line);

      if (!intersection) {
        return false;
      }

      return true;
    });

    return collision;
  }

  checkGate(track: Track, velocity: Line) {
    const gate = track.gates[this.nextGateIndex];

    const intersection = getIntersectionOfLines(velocity, gate);

    if (intersection) {
      this.score += 200;
      this.nextGateIndex++;

      if (this.nextGateIndex >= track.gates.length) {
        this.score += 500;

        this.isDead = true;
        return;
      }

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
      new Vector(
        this.position.x + Math.cos(rayAngle) * this.rayLength,
        this.position.y + Math.sin(rayAngle) * this.rayLength
      )
    );

    const closestIntersection = track.boundaries.reduce<{
      point: Vector;
      distance: number;
    } | null>((closest, line): { point: Vector; distance: number } | null => {
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

    return closestIntersection.distance;
  }
}

function getDistanceBetweenPoints(a: Vector, b: Vector) {
  return Math.sqrt(Math.pow(a.x - b.x, 2) + Math.pow(a.y - b.y, 2));
}
