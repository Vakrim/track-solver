import { Matrix } from "./Matrix";
import { sigmoid } from "./sigmoid";

export class Network {
  constructor(public layers: Layer[]) {}

  static createRandom(
    inputCount: number,
    hiddenLayers: number[],
    outputCount: number
  ) {
    const layers = [];

    for (let i = 0; i < hiddenLayers.length; i++) {
      const neuronsCount = hiddenLayers[i];

      const weights = Matrix.createRandom(
        neuronsCount,
        i === 0 ? inputCount : hiddenLayers[i - 1]
      );
      const bias = Matrix.createRandom(neuronsCount, 1);

      layers.push(new Layer(weights, bias));
    }

    const weights = Matrix.createRandom(
      outputCount,
      hiddenLayers[hiddenLayers.length - 1]
    );
    const bias = Matrix.createRandom(outputCount, 1);

    layers.push(new Layer(weights, bias));

    return new Network(layers);
  }

  feedforward(inputs: number[]) {
    let prevResult = inputs;

    for (let i = 0; i < this.layers.length; i++) {
      const layer = this.layers[i];

      const result = layer.weights
        .multiply(new Matrix(prevResult.length, 1, prevResult))
        .add(layer.bias)
        .map((value) => sigmoid(value));

      prevResult = result.data;
    }

    return prevResult;
  }

  mutate(mutationChance = 0.03, mutationRate = 0.25) {
    this.layers.forEach((layer) => layer.mutate(mutationChance, mutationRate));
  }

  clone() {
    return new Network(
      this.layers.map(
        (layer) => new Layer(layer.weights.clone(), layer.bias.clone())
      )
    );
  }

  serialize() {
    return JSON.stringify(this);
  }

  static deserialize(data: string) {
    const parsed = JSON.parse(data);

    const layers = parsed.layers.map((layer: Layer) => {
      return new Layer(
        new Matrix(layer.weights.rows, layer.weights.cols, layer.weights.data),
        new Matrix(layer.bias.rows, layer.bias.cols, layer.bias.data)
      );
    });

    return new Network(layers);
  }
}

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
