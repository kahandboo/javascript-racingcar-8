import { MissionUtils } from "@woowacourse/mission-utils";

class App {
  async run() {}
  getCarNamesInput() {
    return MissionUtils.Console.readLineAsync("경주할 자동차 이름을 입력하세요.(이름은 쉼표(,) 기준으로 구분)\n");
  }
  
  getRoundInput() {
    return MissionUtils.Console.readLineAsync("시도할 횟수는 몇 회인가요?\n");
  }
}

export default App;
