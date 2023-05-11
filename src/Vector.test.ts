import { Vector } from "./Vector";

describe(Vector, () => {
  describe("angle", () => {
    it("should return the angle of the Vector", () => {
      const vector = new Vector(0, 10);

      expect(vector.angle).toBe(Math.PI / 2);
    });
  });

  describe("rotate", () => {
    it("should rotate the Vector", () => {
      const vector = new Vector(10, 0);

      const rotatedVector = vector.rotate(Math.PI / 2);

      expect(rotatedVector.x).toBeCloseTo(0);
      expect(rotatedVector.y).toBeCloseTo(10);
    });
  });

  describe("add", () => {
    it("should add the Vectors", () => {
      const vector1 = new Vector(10, 0);
      const vector2 = new Vector(0, 10);

      const addedVector = vector1.add(vector2);

      expect(addedVector.x).toBeCloseTo(10);
      expect(addedVector.y).toBeCloseTo(10);
    });
  });
});
