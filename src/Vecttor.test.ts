import { Vector } from "./Vector";
import { Point } from "./Point";

describe(Vector, () => {
  describe("angle", () => {
    it("should return the angle of the vector", () => {
      const vector = new Vector(new Point(0, 0), new Point(0, 10));

      expect(vector.angle).toBe(Math.PI / 2);
    });
  });

  describe("rotate", () => {
    it("should rotate the vector", () => {
      const vector = new Vector(new Point(0, 0), new Point(10, 0));

      const rotatedVector = vector.rotate(Math.PI / 2, new Point(0, 0));

      expect(rotatedVector.start.x).toBeCloseTo(0);
      expect(rotatedVector.start.y).toBeCloseTo(0);
      expect(rotatedVector.end.x).toBeCloseTo(0);
      expect(rotatedVector.end.y).toBeCloseTo(10);
    });
  });

  describe("add", () => {
    it("should add the vectors", () => {
      const vector1 = new Vector(new Point(0, 0), new Point(10, 0));
      const vector2 = new Vector(new Point(10, 0), new Point(10, 10));

      const addedVector = vector1.add(vector2);

      expect(addedVector.start.x).toBeCloseTo(0);
      expect(addedVector.start.y).toBeCloseTo(0);
      expect(addedVector.end.x).toBeCloseTo(10);
      expect(addedVector.end.y).toBeCloseTo(10);
    });
  });
});
