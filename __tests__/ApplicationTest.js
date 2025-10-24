import App from "../src/App.js";
import { MissionUtils } from "@woowacourse/mission-utils";

const mockQuestions = (inputs) => {
  MissionUtils.Console.readLineAsync = jest.fn();

  MissionUtils.Console.readLineAsync.mockImplementation(() => {
    const input = inputs.shift();
    return Promise.resolve(input);
  });
};

const mockRandoms = (numbers) => {
  MissionUtils.Random.pickNumberInRange = jest.fn();

  numbers.reduce((acc, number) => {
    return acc.mockReturnValueOnce(number);
  }, MissionUtils.Random.pickNumberInRange);
};

const getLogSpy = () => {
  const logSpy = jest.spyOn(MissionUtils.Console, "print");
  logSpy.mockClear();
  return logSpy;
};

describe("자동차 경주", () => {
  describe("parseCarNames 단위 테스트", () => {
    let app;
    beforeEach(() => {
      app = new App();
    });

    test('쉼표로 구분된 문자열을 이름 배열로 정확히 분리해야 한다.', () => {
      // given
      const input = "pobi,woni,jun";
      
      // when 
      const result = app.parseCarNames(input);
      
      // then 
      expect(result).toEqual(['pobi', 'woni', 'jun']);
    });
  
    test('이름 앞뒤에 공백이 있는 경우엔 공백을 제거해야 한다.', () => {
      // given
      const input = "  pobi ,woni, jun  "; 
      
      // when
      const result = app.parseCarNames(input);
      
      // then
      expect(result).toEqual(['pobi', 'woni', 'jun']);
    });

    test('쉼표가 없는 단일 이름(2개 미만)이 입력되면 에러를 발생시켜야 한다.', () => {
      // given
      const input = "pobi"; 
      
      // when & then
      expect(() => app.parseCarNames(input))
        .toThrow("[ERROR]");
    });
  });

  describe("validateCarNames 단위 테스트", () => {
    let app;
    beforeEach(() => {
      app = new App();
    });

    test('이름이 6자 이상인 경우엔 에러를 발생시켜야 한다.', () => {
      // given
      const input = ["woniii"]; 
      
      // when & then
      expect(() => app.validateCarNames(input))
        .toThrow("[ERROR]");
    });

    test('이름이 빈 문자열인 경우엔 에러를 발생시켜야 한다.', () => {
      // given
      const input = [""]; 
      
      // when & then
      expect(() => app.validateCarNames(input))
        .toThrow("[ERROR]");
    });
  });
  
  describe("setUpCars 단위 테스트", () => {
    let app;
    beforeEach(() => {
      app = new App();
    });

    test('배열에 저장된 자동차 이름을 객체에 score와 함께 저장한다.', () => {
      // given
      const input = ["pobi", "woni"]; 
      
      // when
      const result = app.setUpCars(input);
      
      // then
      expect(result).toEqual([{name: 'pobi', score: 0}, {name: 'woni', score: 0}]);
    });

    test('배열에 저장된 자동차 이름이 하나여도 객체로 변환한다.', () => {
      // given
      const input = ["pobi"]; 
      
      // when
      const result = app.setUpCars(input);
      
      // then
      expect(result).toEqual([{name: 'pobi', score: 0}]);
    });
  
    test('빈 배열이 입력될 경우, 빈 배열을 그대로 반환한다.', () => {
      // given
      const input = [];
      
      // when
      const result = app.setUpCars(input);
      
      // then
      expect(result).toEqual([]); 
    });
  });
});
