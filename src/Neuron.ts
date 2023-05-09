export class Neuron {
  constructor(public weights: number[], public bias: number) {}

  static createRandom(inputsCount: number) {
    const weights = Array.from(
      { length: inputsCount },
      () => Math.random() * 2 - 1
    );
    const bias = Math.random() * 2 - 1;

    return new Neuron(weights, bias);
  }

  feedforward(inputs: number[]) {
    const sum = this.weights.reduce((sum, weight, index) => {
      return sum + weight * inputs[index] + this.bias;
    }, 0);

    return this.activate(sum);
  }

  activate(sum: number) {
    return sigmoid(sum);
  }

  clone() {
    return new Neuron([...this.weights], this.bias);
  }

  mutate() {
    const mutationRate = 0.03;

    this.weights = this.weights.map((weight) => {
      if (Math.random() < mutationRate) {
        return weight + (Math.random() * 2 - 1) * 0.5;
      }

      return weight;
    });

    if (Math.random() < mutationRate) {
      this.bias += (Math.random() * 2 - 1) * 0.5;
    }
  }
}

function sigmoid(x: number) {
  return 2 / (1 + Math.exp(-x)) - 1;
}
