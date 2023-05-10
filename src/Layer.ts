import { Matrix } from "./Matrix";

export class Layer {
  constructor(public weights: Matrix, public bias: Matrix) {}

  mutate(mutationChance = 0.03, mutationRate = 0.25) {
    this.weights = this.weights.map((value) => {
      if (Math.random() < mutationChance) {
        return value + (Math.random() * 2 - 1) * mutationRate;
      }

      return value;
    });

    this.bias = this.bias.map((value) => {
      if (Math.random() < mutationChance) {
        return value + (Math.random() * 2 - 1) * mutationRate;
      }

      return value;
    });
  }

  clone() {
    return new Layer(this.weights.clone(), this.bias.clone());
  }

  serialize() {
    return JSON.stringify(this);
  }
}
