import { Layer } from "./Layer";
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

  mutate(mutationChance = 0.1, mutationRate = 0.15) {
    return new Network(
      this.layers.map((layer) => layer.mutate(mutationChance, mutationRate))
    );
  }

  serialize() {
    return JSON.stringify(this);
  }

  get size() {
    return this.layers.reduce((sum, layer) => sum + layer.size, 0);
  }

  getAt(index: number) {
    if (index < 0 || index >= this.size) {
      throw new Error(`Index ${index} is out of bounds [0, ${this.size})`);
    }

    let layerIndex = 0;

    while (index >= this.layers[layerIndex].size) {
      index -= this.layers[layerIndex].size;
      layerIndex++;
    }

    return this.layers[layerIndex].getAt(index);
  }

  setAt(index: number, setterOrValue: number | ((prev: number) => number)) {
    if (index < 0 || index >= this.size) {
      throw new Error(`Index ${index} is out of bounds [0, ${this.size})`);
    }

    let layerIndex = 0;

    while (index >= this.layers[layerIndex].size) {
      index -= this.layers[layerIndex].size;
      layerIndex++;
    }

    return new Network(
      this.layers.map((layer, i) => {
        if (i !== layerIndex) {
          return layer;
        }

        if (typeof setterOrValue === "number") {
          return layer.setAt(index, setterOrValue);
        }

        const value = setterOrValue(layer.getAt(index));

        return layer.setAt(index, value);
      })
    );
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
