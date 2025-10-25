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

  describe("decideMove 단위 테스트", () => {
    let app;
    beforeEach(() => {
      app = new App();
    });

    test('randomNumber가 4 이상일 때 true를 반환한다.', () => {
      // given
      jest.spyOn(MissionUtils.Random, 'pickNumberInRange').mockReturnValue(4);      
      
      // when
      const result = app.decideMove();
      
      // then
      expect(result).toBe(true);
    });

    test('randomNumber가 3 이하일 때 false를 반환한다.', () => {
      // given
      jest.spyOn(MissionUtils.Random, 'pickNumberInRange').mockReturnValue(3);      
      
      // when
      const result = app.decideMove();
      
      // then
      expect(result).toBe(false);
    });
  });

  describe("printScores 단위 테스트", () => {
    let app;
    beforeEach(() => {
      app = new App();
    });

    afterEach(() => {
      jest.restoreAllMocks();
    });

    test('점수판을 올바르게 출력한다', () => {
      // given
      const carsInfo = [
        { name: 'pobi', score: 3 },
        { name: 'crong', score: 1 },
      ];
      const printSpy = jest.spyOn(MissionUtils.Console, 'print').mockImplementation(() => {});
    
      // when
      app.printScores(carsInfo);
    
      // then
      expect(printSpy).toHaveBeenCalledTimes(2); 
      expect(printSpy.mock.calls[0][0]).toBe('pobi : ---\n'); 
      expect(printSpy.mock.calls[1][0]).toBe('crong : -\n'); 
    });

    test('점수가 0일 때 하이픈 없이 출력한다', () => {
      // given
      const carsInfo = [{ name: 'zeroCar', score: 0 }];
      const printSpy = jest.spyOn(MissionUtils.Console, 'print').mockImplementation(() => {});
      
      // when
      app.printScores(carsInfo);
      
      // then
      expect(printSpy).toHaveBeenCalledWith('zeroCar : \n');
    });
    
    test('차가 없을 때 아무것도 출력하지 않는다', () => {
      // given
      const carsInfo = [];
      const printSpy = jest.spyOn(MissionUtils.Console, 'print').mockImplementation(() => {});
    
      // when
      app.printScores(carsInfo);
    
      // then
      expect(printSpy).not.toHaveBeenCalled(); 
    });
  });

  describe("determineWinners 단위 테스트", () => {
    let app;
    beforeEach(() => {
      app = new App();
    });

    test("단독 우승자가 있는 경우, 해당 객체 배열을 반환한다.", () => {
      // given
      const carsInfo = [
        { name: 'pobi', score: 5 },
        { name: 'jun', score: 3 },
        { name: 'woni', score: 1 },
      ];
      
      // when
      const winners = app.determineWinners(carsInfo);

      // then
      expect(winners).toEqual([{ name: 'pobi', score: 5 }]);
    });

    test("공동 우승자가 있는 경우, 해당 객체 배열 2개를 반환한다.", () => {
      // given
      const carsInfo = [
        { name: 'pobi', score: 5 },
        { name: 'jun', score: 3 },
        { name: 'woni', score: 5 }, 
      ];
      
      // when
      const winners = app.determineWinners(carsInfo);

      // then
      expect(winners).toEqual([
        { name: 'pobi', score: 5 },
        { name: 'woni', score: 5 },
      ]);
    });
  });

  describe("printWinners 단위 테스트", () => {
    let app;
    beforeEach(() => {
      app = new App();
    });

    afterEach(() => {
      jest.restoreAllMocks();
    });

    test("단일 우승자를 출력한다.", () => {
      // given
      const winners = [
        { name: 'pobi', score: 3 },
      ];
      const printSpy = jest.spyOn(MissionUtils.Console, 'print').mockImplementation(() => {});
    
      // when
      app.printWinners(winners);
    
      // then
      expect(printSpy).toHaveBeenCalledWith('최종 우승자 : pobi'); 
    });

    test("복수 우승자를 출력한다.", () => {
      // given
      const winners = [
        { name: 'pobi', score: 3 },
        { name: 'woni', score: 3 },
      ];
      const printSpy = jest.spyOn(MissionUtils.Console, 'print').mockImplementation(() => {});
    
      // when
      app.printWinners(winners);
    
      // then
      expect(printSpy).toHaveBeenCalledWith('최종 우승자 : pobi, woni'); 
    });
  });
});
