import { Matrix } from "./Matrix";

export class Layer {
  #size?: number;

  constructor(public weights: Matrix, public bias: Matrix) {}

  mutate(mutationChance = 0.03, mutationRate = 0.25) {
    const weights = this.weights.map((value) => {
      if (Math.random() < mutationChance) {
        return value + (Math.random() * 2 - 1) * mutationRate;
      }

      return value;
    });

    const bias = this.bias.map((value) => {
      if (Math.random() < mutationChance) {
        return value + (Math.random() * 2 - 1) * mutationRate;
      }

      return value;
    });

    return new Layer(weights, bias);
  }

  get size() {
    this.#size ??= this.weights.size + this.bias.size;
    return this.#size;
  }

  getAt(index: number) {
    if (index < 0 || index >= this.size) {
      throw new Error(`Index ${index} is out of bounds [0, ${this.size})`);
    }

    if (index < this.weights.size) {
      return this.weights.getAt(index);
    }

    return this.bias.getAt(index - this.weights.size);
  }

  setAt(index: number, value: number) {
    if (index < 0 || index >= this.size) {
      throw new Error(`Index ${index} is out of bounds [0, ${this.size})`);
    }

    if (index < this.weights.size) {
      return new Layer(this.weights.setAt(index, value), this.bias);
    }

    return new Layer(
      this.weights,
      this.bias.setAt(index - this.weights.size, value)
    );
  }

  serialize() {
    return JSON.stringify(this);
  }
}
