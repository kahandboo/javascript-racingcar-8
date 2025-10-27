import { MissionUtils } from "@woowacourse/mission-utils";
import { CONSTANTS, INPUT_MESSAGES, ERROR_MESSAGES } from "./constants.js";

export default class App {
  async run() {
    const carNamesInput = await this.getCarNamesInput();
    const roundInput = await this.getRoundInput();
    this.validateRound(roundInput);

    const carNames = this.parseCarNames(carNamesInput);
    this.validateCarNames(carNames);
    const carsInfo = this.setUpCars(carNames);

    this.startGame(carsInfo, roundInput); 
    
    const winners = this.determineWinners(carsInfo);
    this.printWinners(winners);
  }

  getCarNamesInput() {
    return MissionUtils.Console.readLineAsync(INPUT_MESSAGES.CAR_NAMES);
  }
  
  getRoundInput() {
    return MissionUtils.Console.readLineAsync(INPUT_MESSAGES.ROUND_COUNT);
  }

  parseCarNames(carNamesInput) {
    if (!carNamesInput.includes(",")) throw new Error(ERROR_MESSAGES.MIN_CAR_COUNT);
    const carNames = carNamesInput.split(",");
    
    return carNames.map(carName => carName.trim());
  }

  validateCarNames(carNames) {
    carNames.forEach(carName => {
      if (carName.length > CONSTANTS.MAX_NAME_LENGTH) {
        throw new Error(ERROR_MESSAGES.NAME_LENGTH);
      }

      if (carName === '') {
        throw new Error(ERROR_MESSAGES.EMPTY_NAME);
      }
    });

    const uniqueCarNames = new Set(carNames);
    
    if (uniqueCarNames.size != carNames.length) {
        throw new Error(ERROR_MESSAGES.DUPLICATE_NAME);
    }
  }

  validateRound(roundInput) {
    if (!roundInput || roundInput.trim() === "") {
      throw new Error(ERROR_MESSAGES.EMPTY_ROUND);
    }
    if (isNaN(Number(roundInput))) {
      throw new Error(ERROR_MESSAGES.ROUND_NOT_NUMBER);
    }
    if (Number(roundInput) <= 0) {
      throw new Error(ERROR_MESSAGES.ROUND_POSITIVE);
    }
  }

  setUpCars(carNames) {
    const carsInfo = [];

    carNames.forEach(carName => {
      const carInfo = {
        name: carName, 
        score: 0
      }
      carsInfo.push(carInfo);
    });
    return carsInfo;
  }

  startGame(carsInfo, round) {
    for (let i = 0; i < round; i++) {
      this.progressRound(carsInfo);
      this.printScores(carsInfo);
    }
  }

  progressRound(carsInfo) {
    carsInfo.forEach(car => this.moveCars(car));
  }

  moveCars(car) {
    if (this.decideMove()) car.score += 1;
  }

  decideMove() {
    const randomNumber = MissionUtils.Random.pickNumberInRange(CONSTANTS.RANDOM_RANGE_MIN, CONSTANTS.RANDOM_RANGE_MAX);
        
    if (randomNumber >= CONSTANTS.MIN_MOVE_NUMBER) {
      return true;
    }
    return false;
  }

  printScores(carsInfo) {
    carsInfo.forEach(car => {
      const scoreBar = '-'.repeat(car.score);
      MissionUtils.Console.print(`${car.name} : ${scoreBar}`);
    });
  }

  determineWinners(carsInfo) {
    const maxScore = Math.max(...carsInfo.map(car => car.score));
    const winners = carsInfo.filter(car => car.score === maxScore);

    return winners;
  }

  printWinners(winners) {
    const winnerNames = winners.map(winner => winner.name).join(", ");

    MissionUtils.Console.print("최종 우승자 : " + winnerNames);
  }
}
