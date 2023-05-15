import { createCanvas, drawCar, drawText, drawTrack } from "./graphics";
import { runLoop } from "./runLoop";
import "./style.css";
import { Championship, NUMBER_OF_RACES } from "./Championship";
import { Network } from "./Network";
import { getPreTrainedNetworks } from "./getPreTrained";
import { sum } from "./sum";
import { sortBy } from "./sortBy";

function setup() {
  createCanvas();

  let goodNetworks: Network[] = getPreTrainedNetworks();

  let championship = new Championship(goodNetworks);

  function update() {
    for (
      let compression = 0;
      compression < window.timeCompression;
      compression++
    ) {
      championship.update();

      if (championship.isFinished) {
        const results = Array.from(championship.scores).map(
          ([network, scores]) => {
            return { network, score: sum(scores) };
          }
        );

        const sorted = sortBy(results, (result) => -result.score);

        goodNetworks = sorted.slice(0, 10).map((result) => result.network);

        console.log(`Scores: ${sorted[0].score} - ${sorted[9].score}`);
        console.groupCollapsed("Networks");
        console.log(JSON.stringify(goodNetworks.map((n) => n.serialize())));
        console.groupEnd();

        championship = new Championship(goodNetworks);
      }
    }
  }

  function draw() {
    drawTrack(championship.race.track);

    for (const car of championship.race.cars) {
      drawCar(car);
    }

    drawText(
      400,
      10,
      `Finished races: ${championship.raceNumber} / ${NUMBER_OF_RACES}`
    );
  }

  return { update, draw };
}

runLoop(setup());

window.timeCompression = 1;
