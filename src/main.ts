import { Car } from "./Car";
import { Network } from "./Network";
import { Point } from "./Point";
import { createTrack } from "./createTrack";
import {
  createCanvas,
  drawCar,
  drawLine,
  drawNetwork,
  getContext,
} from "./graphics";
import { indexToColor } from "./indexToColor";
import { getPreTrainedNetworks } from "./getPreTrained";
import "./style.css";
import { runLoop } from "./runLoop";

function setup() {
  createCanvas();

  const track = createTrack();

  const goodNetworks: Network[] = getPreTrainedNetworks();

  const cars = Array.from({ length: 100 }, () => createCar(goodNetworks));

  let gateHighScore = 0;

  function update() {
    for (
      let compression = 0;
      compression < window.timeCompression;
      compression++
    ) {
      for (let i = 0; i < cars.length; i++) {
        cars[i].update(track);

        if (cars[i].currentGateScore > gateHighScore + 10) {
          // kill car to share knowledge
          cars[i].isDead = true;
        }

        if (cars[i].isDead) {
          const deadCar = cars[i];

          if (deadCar.currentGateScore > gateHighScore) {
            gateHighScore = cars[i].currentGateScore;

            if (goodNetworks.length >= 10) {
              goodNetworks.shift();
            }

            goodNetworks.push(deadCar.network.clone());

            console.log(gateHighScore);
            console.groupCollapsed("Networks");
            console.log(JSON.stringify(goodNetworks.map((n) => n.serialize())));
            console.groupEnd();
          }

          cars[i] = createCar(goodNetworks);
        }
      }
    }
  }

  function draw() {
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

    drawNetwork(
      cars[Math.floor(new Date().getTime() / 300) % cars.length].network,
      600,
      20
    );
  }

  return {
    update,
    draw,
  };
}

function createCar(goodNetworks: Network[]) {
  const car = new Car(new Point(120, 80));

  const randomNetwork =
    Math.random() < 0.5
      ? sample(goodNetworks)
      : sample(getPreTrainedNetworks());

  car.network = randomNetwork.clone();

  car.network.mutate();

  return car;
}

runLoop(setup());

window.timeCompression = 1;

declare global {
  interface Window {
    timeCompression: number;
  }
}

function sample<T>(array: T[]) {
  return array[Math.floor(Math.random() * array.length)];
}
