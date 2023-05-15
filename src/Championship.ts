import { Car } from "./Car";
import { Network } from "./Network";
import { Track } from "./Track";
import { generateTrack } from "./generateTrack";

const NUMBER_OF_CARS = 100;
export const NUMBER_OF_RACES = 15;

export class Championship {
  networks: Network[];
  race: Race;
  scores: Map<Network, number[]>;
  raceNumber = 0;
  isFinished: boolean = false;

  constructor(public initialNetworks: Network[]) {
    this.networks = Array.from({ length: NUMBER_OF_CARS }, (_, index) => {
      let network = initialNetworks[index % initialNetworks.length];

      if (index >= initialNetworks.length) {
        network.mutateSelf();
      }

      return network.clone();
    });

    this.scores = new Map(this.networks.map((network) => [network, []]));

    this.race = new Race(this.networks);
  }

  update() {
    if (this.isFinished) {
      return;
    }

    this.race.update();

    if (this.race.isFinished) {
      this.raceNumber++;

      const scores = this.race.getScores();

      for (const [network, score] of scores) {
        this.scores.get(network)!.push(score);
      }

      if (this.raceNumber >= NUMBER_OF_RACES) {
        this.isFinished = true;
      }

      this.race = new Race(this.networks);
    }
  }
}

class Race {
  track: Track;
  cars: Car[];
  isFinished: boolean = false;

  constructor(public networks: Network[]) {
    this.track = generateTrack();

    this.cars = this.networks.map((network) => {
      const car = new Car(network);

      car.position = this.track.startPosition;
      car.orientation = this.track.startDirection;

      return car;
    });
  }

  update() {
    if (this.isFinished) {
      return;
    }

    for (let i = 0; i < this.cars.length; i++) {
      const car = this.cars[i];

      if (car.isDead) {
        continue;
      }

      car.update(this.track);
    }

    if (this.cars.every((car) => car.isDead)) {
      this.isFinished = true;
    }
  }

  getScores() {
    return new Map(this.cars.map((car) => [car.network, car.score]));
  }
}
