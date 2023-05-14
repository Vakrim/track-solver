import { createCanvas, drawCar, drawTrack } from "./graphics";
import { runLoop } from "./runLoop";
import "./style.css";
import { Championship } from "./Championship";
import { Network } from "./Network";
import { getPreTrainedNetworks } from "./getPreTrained";

function setup() {
  createCanvas();

  const goodNetworks: Network[] = getPreTrainedNetworks();

  const championship = new Championship(goodNetworks);

  function update() {
    championship.update();
  }

  function draw() {
    drawTrack(championship.race.track);

    for (const car of championship.race.cars) {
      drawCar(car);
    }
  }

  return { update, draw };
}

runLoop(setup());
