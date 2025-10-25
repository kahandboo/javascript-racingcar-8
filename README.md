# javascript-racingcar-precourse

### 구현할 기능 목록

1. getUserInput()
    - 자동차 이름, 시도할 횟수를 입력받음
2. parseCarNames()
    - 입력 문자열에서 자동차 이름 파싱해 배열로 저장
3. setUpCars()
    - 파싱된 이름을 점수 초깃값과 함께 객체로 배열에 저장
4. validateCarNames()
    - 이름 길이 검증(5자 이하) -> Error 발생
5. validateRound()
    - 시도할 횟수 검증(빈 문자열, 숫자, 정수) -> Error 발생
6. startGame()
    - 시도 횟수동안 객체를 순회하면서 전진/멈춤 동작 수행
7. decideMove()
    - 전진 조건 계산해서 전진(true) or 멈춤(false) 동작 반환
8. printScores()
    - 게임을 진행하면서 각 자동차의 점수를 (-)형식으로 출력
9. determineWinners()
    - 가장 높은 점수를 기록한 자동차를 우승자로 선택
10. printWinners()
    - 우승자 출력(여러명일 경우 쉼표로 구분)
11. carsInfo 배열 </br>
    - carsInfo = [ </br>
        {name: "woni", score: 1}, </br>
        {name: "pobi", score: 10}, </br>
        ...
    ];
