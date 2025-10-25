import { MissionUtils } from "@woowacourse/mission-utils";

export default class App {
  async run() {}

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
        if (this.decideMove()) {
          car.score += 1;
        }
      });
  
      this.printScores(carsInfo);
    }
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
}
