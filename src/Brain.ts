import { Neuron } from "./Neuron";

export interface Brain {
  steeringNeuron: Neuron;
  accelerationNeuron: Neuron;
}
