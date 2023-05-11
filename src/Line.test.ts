import { Line } from "./Line";
import { Point } from "./Point";

describe(Line, () => {
  describe("angle", () => {
    it("should return the angle of the line", () => {
      const line = new Line(new Point(0, 0), new Point(0, 10));

      expect(line.angle).toBe(Math.PI / 2);
    });
  });

  describe("rotate", () => {
    it("should rotate the line", () => {
      const line = new Line(new Point(0, 0), new Point(10, 0));

      const rotatedLine = line.rotate(Math.PI / 2, new Point(0, 0));

      expect(rotatedLine.start.x).toBeCloseTo(0);
      expect(rotatedLine.start.y).toBeCloseTo(0);
      expect(rotatedLine.end.x).toBeCloseTo(0);
      expect(rotatedLine.end.y).toBeCloseTo(10);
    });
  });

  describe("add", () => {
    it("should add the lines", () => {
      const line1 = new Line(new Point(0, 0), new Point(10, 0));
      const line2 = new Line(new Point(10, 0), new Point(10, 10));

      const addedLine = line1.add(line2);

      expect(addedLine.start.x).toBeCloseTo(0);
      expect(addedLine.start.y).toBeCloseTo(0);
      expect(addedLine.end.x).toBeCloseTo(10);
      expect(addedLine.end.y).toBeCloseTo(10);
    });
  });
});
