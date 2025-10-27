import { MissionUtils } from "@woowacourse/mission-utils";

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
    return MissionUtils.Console.readLineAsync("경주할 자동차 이름을 입력하세요.(이름은 쉼표(,) 기준으로 구분)\n");
  }
  
  getRoundInput() {
    return MissionUtils.Console.readLineAsync("시도할 횟수는 몇 회인가요?\n");
  }

  parseCarNames(carNamesInput) {
    if (!carNamesInput.includes(",")) throw new Error("[ERROR] 자동차 이름은 2개 이상 입력해야합니다.\n");
    const carNames = carNamesInput.split(",");
    
    return carNames.map(carName => carName.trim());
  }

  validateCarNames(carNames) {
    carNames.forEach(carName => {
      if (carName.length >= 6) {
        throw new Error("[ERROR] 이름은 5자 이하여야 합니다.");
      }

      if (carName === '') {
        throw new Error("[ERROR] 이름은 빈 문자열일 수 없습니다.");
      }
    });
  }

  validateRound(roundInput) {
    if (roundInput.trim() === "") {
      throw new Error("[ERROR] 시도할 횟수를 입력해야 합니다.");
    }
    if (isNaN(Number(roundInput))) {
      throw new Error("[ERROR] 시도할 횟수는 숫자여야 합니다.");
    }
    if (Number(roundInput) <= 0) {
      throw new Error("[ERROR] 시도할 횟수는 1 이상이어야 합니다.");
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
      carsInfo.forEach(car => { 
        this.moveCars(car);
      });
  
      this.printScores(carsInfo);
    }
  }

  moveCars(car) {
    if (this.decideMove()) car.score += 1;
  }

  decideMove() {
    const randomNumber = MissionUtils.Random.pickNumberInRange(0, 9);
        
    if (randomNumber >= 4) {
      return true;
    }
    return false;
  }

  printScores(carsInfo) {
    carsInfo.forEach(car => {
      const scoreBar = '-'.repeat(car.score);
      MissionUtils.Console.print(`${car.name} : ${scoreBar}\n`);
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
