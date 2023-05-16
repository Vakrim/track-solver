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

  get(row: number, col: number) {
    return this.data[row * this.cols + col];
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

  resize(rows: number, cols: number) {
    if (rows * cols < this.rows * this.cols)
      throw new Error(
        `New matrix must be bigger than the original ${this.getSizeInspect()}, (${rows}, ${cols})`
      );

    const data = new Array(rows * cols).fill(0);

    for (let row = 0; row < Math.min(this.rows, rows); row++) {
      for (let col = 0; col < Math.min(this.cols, cols); col++) {
        data[row * cols + col] = this.data[row * this.cols + col];
      }
    }

    return new Matrix(rows, cols, data);
  }

  getSizeInspect() {
    return `(${this.rows}, ${this.cols})`;
  }

  map(fn: (value: number) => number) {
    const data = this.data.map(fn);
    return new Matrix(this.rows, this.cols, data);
  }

  get size() {
    return this.rows * this.cols;
  }

  getAt(index: number) {
    if (index < 0 || index >= this.size)
      throw new Error(`Index ${index} out of bounds`);

    return this.data[index];
  }

  setAt(index: number, value: number) {
    if (index < 0 || index >= this.size)
      throw new Error(`Index ${index} out of bounds`);

    const data = [...this.data];
    data[index] = value;
    return new Matrix(this.rows, this.cols, data);
  }

  serialize() {
    return JSON.stringify(this);
  }
}
