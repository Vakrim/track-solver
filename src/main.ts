import { Brain } from "./Brain";
import { Car } from "./Car";
import { Neuron } from "./Neuron";
import { Point } from "./Point";
import { createTrack } from "./createTrack";
import {
  clearScreen,
  createCanvasAndGetContext,
  drawCar,
  drawLine,
  getContext,
} from "./graphics";
import { indexToColor } from "./indexToColor";
import { getPreTrainedBrains } from "./pretrained";
import "./style.css";

function setup() {
  createCanvasAndGetContext();

  const track = createTrack();

  const goodBrains: Brain[] = getPreTrainedBrains();

  const cars = Array.from({ length: 100 }, () => createCar(goodBrains));

  let gateHighScore = 0;

  return function update() {
    clearScreen();

    for (
      let compression = 0;
      compression < window.timeCompression;
      compression++
    ) {
      for (let i = 0; i < cars.length; i++) {
        cars[i].update(track);

        if (cars[i].isDead) {
          const deadCar = cars[i];

          if (deadCar.currentGateScore > gateHighScore) {
            gateHighScore = cars[i].currentGateScore;

            if (goodBrains.length >= 10) {
              goodBrains.shift();
            }

            goodBrains.push({
              steeringNeuron: deadCar.steeringNeuron.clone(),
              accelerationNeuron: deadCar.accelerationNeuron.clone(),
            });

            console.log(gateHighScore);
            console.log(goodBrains);
          }

          cars[i] = createCar(goodBrains);
        }
      }
    }

    getContext().strokeStyle = "black";

    track.lines.forEach((line) => {
      drawLine(line);
    });

    track.gates.forEach((gate, index) => {
      getContext().strokeStyle = indexToColor(index);

      drawLine(gate);
    });

    for (let i = 0; i < cars.length; i++) {
      drawCar(cars[i]);
    }
  };
}

function createCar(goodBrains: Brain[]) {
  const car = new Car(new Point(120, 80));

  const randomBrain = goodBrains[Math.floor(Math.random() * goodBrains.length)];

  car.steeringNeuron = randomBrain.steeringNeuron.clone();
  car.accelerationNeuron = randomBrain.accelerationNeuron.clone();

  car.steeringNeuron.mutate();
  car.accelerationNeuron.mutate();

  return car;
}

const update = setup();

requestAnimationFrame(function loop() {
  update();
  requestAnimationFrame(loop);
});

window.timeCompression = 1;

// typescript extend window with timeCompression
declare global {
  interface Window {
    timeCompression: number;
  }
}
