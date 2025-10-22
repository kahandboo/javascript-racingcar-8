# javascript-racingcar-precourse

### 구현할 기능 목록

1. getUserInput()
    - 자동차 이름, 시도할 횟수를 입력받음
2. parseCarNames()
    - 입력 문자열에서 자동차 이름 파싱
3. setUpCars()
    - 파싱된 이름을 객체에 저장
4. validateCarNames()
    - 이름 길이 검증(5자 이하) -> Error 발생
5. runGame()
    - 시도 횟수동안 객체를 순회하면서 전진/멈춤 동작 수행
6. decideMove()
    - 전진 조건 계산해서 전진(true) or 멈춤(false) 동작 반환
7. recordResult()
    - 반환된 결과를 토대로 동작 수행 결과를 객체에 저장
8. determineWinners()
    - 가장 높은 점수를 기록한 자동차를 우승자로 선택
9. printWinners()
    - 우승자 출력(여러명일 경우 쉼표로 구분)
10. carsInfo 객체 </br>
    - carsInfo = [ </br>
        {name: "woni", score: 1}, </br>
        {name: "pobi", score: 10}, </br>
        ...
    ];
