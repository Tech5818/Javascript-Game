const rocket = document.getElementById("rocket");
const scoreElement = document.getElementById("score"); // 점수를 표시할 HTML 요소
const fuelElement = document.getElementById("fuel"); // 연료를 표시할 HTML 요소
const gameOverScreen = document.getElementById("gameover");
const recordElement = document.getElementById("record");
const retryBtn = document.getElementById("retry_btn");
const recordBtn = document.getElementById("record_btn");
const gameOverMesageElement = document.getElementById("gameover_message");
const topScoreElement = document.getElementById("top_score");
const lastScoreEelement = document.getElementById("last_score");

let xPos = 0; // x 위치
let yPos = 0; // y 위치
let getRocket; // rocket
let rotate = 0; // 각도
let direction; // 오른쪽으로 기울건지 왼쪽으로 기울건지
const baseSpeed = 5; // 기본 속도 배수
const speedFactor = 1; // 속도 증가 계수
let score = 0; // 초기 점수
let fuel = 100; // 초기 연료

// 중력과 낙하 애니메이션 관련 변수
let isGameOver = false; // 게임 오버 상태
const gravity = 0.5; // 중력 계수
let velocity = 0; // 낙하 속도
let gameOverMesage = "";

// 랜덤으로 방향을 설정하는 함수
const setDirection = setInterval(() => {
  const random = Math.random();

  if (random > 0.5) {
    direction = "left";
  } else {
    direction = "right";
  }

  console.log(direction);
}, 1000);

// 점수를 업데이트하는 함수
const updateScore = () => {
  const normalizedRotate = Math.abs(rotate) / 90;
  score += Math.max(0.1, 5 * (1 - normalizedRotate));
  scoreElement.textContent = `SCORE: ${Math.round(score)}`;
};

// 연료를 업데이트하는 함수
const updateFuel = () => {
  fuel -= 0.1;
  fuel = Math.max(0, fuel);
  fuelElement.style.width = `${Math.round(fuel)}%`;

  if (fuel <= 0) {
    if (!isGameOver) {
      isGameOver = true;
      gameOverMesage = "Out of fuel";
      gameOver();
    }
  }
};

const fireRocket = () => {
  if (isGameOver) {
    return;
  }

  // 각도에 따라 속도를 비선형적으로 조정하여 다이나믹한 움직임 생성
  const normalizedRotate = Math.abs(rotate) / 90; // 각도를 0에서 1 사이로 정규화
  const speed = baseSpeed * Math.pow(normalizedRotate, speedFactor); // speedFactor로 속도 증가 계수 조정
  xPos += (rotate > 0 ? 1 : -1) * speed; // 각도에 따라 왼쪽이나 오른쪽으로 이동

  if (rotate === 90 && rotate === -90) {
    xPos += 15;
  }

  // 각도에 따라 y 위치 조정
  yPos = 200 * (1 - normalizedRotate); // -100px에서 0px까지의 범위 조정
  rocket.style.transform = `rotate(${rotate}deg)`;
  rocket.style.marginLeft = `${xPos}px`;
  rocket.style.marginBottom = `${yPos}px`; // y 위치 조정

  getRocket = requestAnimationFrame(fireRocket);

  updateScore(); // 점수 업데이트
  updateFuel(); // 연료 업데이트

  // 로켓이 body 경계를 벗어나면 게임 오버
  const rocketRect = rocket.getBoundingClientRect(); // 로켓의 위치와 크기 정보
  const bodyRect = document.body.getBoundingClientRect(); // body의 위치와 크기 정보

  if (
    rocketRect.left < bodyRect.left ||
    rocketRect.right > bodyRect.right ||
    rocketRect.top < bodyRect.top ||
    rocketRect.bottom > bodyRect.bottom
  ) {
    if (!isGameOver) {
      isGameOver = true;
      gameOverMesage = "It's off track";
      gameOver();
    }
  }
};

// 게임 오버 시 실행되는 함수
const gameOver = () => {
  gameOverScreen.style.display = "flex";
  recordElement.textContent = `record: ${Math.round(score)}`;
  gameOverMesageElement.textContent = gameOverMesage;
  // 애니메이션을 멈추기
  cancelAnimationFrame(getRocket);

  localStorage.setItem("last_score", score);

  const topRecord = localStorage.getItem("top_score");

  if (topRecord < score) {
    localStorage.setItem("top_score", score);
  }
  // 로켓 떨어지는 애니메이션 시작
  const dropRocket = () => {
    if (yPos >= window.innerHeight) {
      return;
    }

    // 중력 효과로 y 위치와 낙하 속도 조정
    velocity += gravity;
    yPos += velocity;
    rocket.style.marginBottom = `-${yPos}px`;

    requestAnimationFrame(dropRocket);
  };

  dropRocket();
};

// 랜덤 방향 변경
const randomRotate = () => {
  if (direction === "left") {
    rotate -= 1;
  } else {
    rotate += 1;
  }

  // 각도를 -90도와 90도 사이로 제한
  if (rotate > 90) rotate = 90;
  if (rotate < -90) rotate = -90;

  requestAnimationFrame(randomRotate);
};

// 방향키로 조정
const controlRocket = () => {
  window.addEventListener("keydown", (e) => {
    if (e.key === "ArrowLeft") {
      rotate -= 5;
    } else if (e.key === "ArrowRight") {
      rotate += 5;
    }

    // 방향키로 조정할 때도 각도를 -90도와 90도 사이로 제한
    if (rotate > 90) rotate = 90;
    if (rotate < -90) rotate = -90;
  });
};

retryBtn.addEventListener("click", () => {
  location.reload();
});

const startScreen = document.getElementById("start");

window.addEventListener("keydown", (e) => {
  if (e.key === " ") {
    startScreen.style.opacity = 0;

    setTimeout(() => {
      startScreen.style.display = "none";
    }, 1000);
    fireRocket();
    randomRotate();
    controlRocket();
  }
});

let lastScore = localStorage.getItem("last_score");
let topScore = localStorage.getItem("top_score");

console.log(lastScore);

if (!lastScore) {
  lastScore = 0;
}

if (!topScore) {
  topScore = 0;
}
lastScoreEelement.textContent = `last score: ${Math.round(lastScore)}`;
topScoreElement.textContent = `top score: ${Math.round(topScore)}`;
