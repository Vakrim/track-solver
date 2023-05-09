export class Matrix {
  constructor(
    public rows: number,
    public cols: number,
    public data: number[]
  ) {}

  static createRandom(rows: number, cols: number) {
    const data = new Array(rows * cols)
      .fill(0)
      .map(() => Math.random() * 2 - 1);
    return new Matrix(rows, cols, data);
  }

  multiply(other: Matrix) {
    if (this.cols !== other.rows)
      throw new Error(
        `Columns of A ${this.getSizeInspect()} must match rows of B ${other.getSizeInspect()}`
      );

    const data = [];

    for (let row = 0; row < this.rows; row++) {
      for (let col = 0; col < other.cols; col++) {
        let sum = 0;
        for (let k = 0; k < this.cols; k++) {
          sum +=
            this.data[row * this.cols + k] * other.data[k * other.cols + col];
        }
        data.push(sum);
      }
    }

    return new Matrix(this.rows, other.cols, data);
  }

  add(other: Matrix) {
    if (this.rows !== other.rows || this.cols !== other.cols)
      throw new Error(
        `Matrices must have the same dimensions ${this.getSizeInspect()}, ${other.getSizeInspect()}`
      );

    const data = [];

    for (let i = 0; i < this.data.length; i++) {
      data.push(this.data[i] + other.data[i]);
    }

    return new Matrix(this.rows, this.cols, data);
  }

  getSizeInspect() {
    return `(${this.rows}, ${this.cols})`;
  }

  map(fn: (value: number) => number) {
    const data = this.data.map(fn);
    return new Matrix(this.rows, this.cols, data);
  }

  clone() {
    return new Matrix(this.rows, this.cols, [...this.data]);
  }

  serialize() {
    return JSON.stringify(this);
  }
}
