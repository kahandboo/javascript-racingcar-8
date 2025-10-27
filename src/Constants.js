const CONSTANTS = {
    MAX_NAME_LENGTH: 5,
    MIN_MOVE_NUMBER: 4,      
    RANDOM_RANGE_MIN: 0,
    RANDOM_RANGE_MAX: 9,
};

const INPUT_MESSAGES = {
    CAR_NAMES: "경주할 자동차 이름을 입력하세요.(이름은 쉼표(,) 기준으로 구분)\n",
    ROUND_COUNT: "시도할 횟수는 몇 회인가요?\n",
};

const ERROR_MESSAGES = {
    NAME_LENGTH: `[ERROR] 이름은 ${CONSTANTS.MAX_NAME_LENGTH}자 이하여야 합니다.`,
    DUPLICATE_NAME: "[ERROR] 자동차 이름은 중복될 수 없습니다.",
    EMPTY_NAME: "[ERROR] 이름은 빈 문자열일 수 없습니다.",
    MIN_CAR_COUNT: "[ERROR] 자동차 이름은 2개 이상 입력해야합니다.",
    EMPTY_ROUND: "[ERROR] 시도할 횟수를 입력해야 합니다.",
    ROUND_NOT_NUMBER: "[ERROR] 시도할 횟수는 숫자여야 합니다.",
    ROUND_POSITIVE: "[ERROR] 시도할 횟수는 1 이상이어야 합니다.",
};

export { CONSTANTS, INPUT_MESSAGES, ERROR_MESSAGES };