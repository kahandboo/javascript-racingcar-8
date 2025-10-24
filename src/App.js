import { MissionUtils } from "@woowacourse/mission-utils";

export default class App {
  async run() {
    const carNamesInput = await this.getCarNamesInput();
    const RoundInput = await this.getRoundInput();

    const carNames = this.parseCarNames(carNamesInput);
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
}
