export class Point {
  constructor(public x: number, public y: number) {}

  add(other: Point) {
    return new Point(this.x + other.x, this.y + other.y);
  }

  subtract(other: Point) {
    return new Point(this.x - other.x, this.y - other.y);
  }

  rotate(angle: number, origin: Point) {
    const dx = this.x - origin.x;
    const dy = this.y - origin.y;

    const x = dx * Math.cos(angle) - dy * Math.sin(angle) + origin.x;
    const y = dx * Math.sin(angle) + dy * Math.cos(angle) + origin.y;

    return new Point(x, y);
  }
}
