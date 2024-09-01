const rocket = document.getElementById("rocket");

let xPos = 0;
let getRocket;
let rotate = 0;

const startScreen = document.getElementById("start");

window.addEventListener("keydown", (e) => {
  if (e.key === " ") {
    startScreen.style.opacity = 0;

    setTimeout(() => {
      startScreen.style.display = "none";
    }, 1000);
  }
});

const fireRocket = () => {
  if (xPos > 3000 || xPos < -3000) {
    return cancelAnimationFrame(getRocket);
  }
  
  if(rotate > 0){
    rotate += 2;
  } else {
    rotate -= 2;
  }
  
  xPos = (rotate * rotate) / 20;

  // rotate가 음수면 xPos도 음수로 변환
  if (rotate < 0) {
    xPos = -xPos;
  }
  
  console.log(xPos);

  rocket.style.transform = `rotate(${rotate}deg)`;
  rocket.style.marginLeft = `${xPos}px`;
  getRocket = requestAnimationFrame(fireRocket);

  // 로켓이 화면 밖으로 나가면 애니메이션 중지
  if(xPos < -(window.innerWidth / 2) || xPos > window.innerWidth / 2){
    cancelAnimationFrame(getRocket);
  }
};

const controlRocket = () => {
  window.addEventListener("keydown", (e) => {
    const num = Math.floor(Math.random() * 50);
    if(e.key === "ArrowLeft"){
      rotate -= num;
    } else if(e.key === "ArrowRight"){
      rotate += num;
    }
  });
};

const downRocket = () => {
  if (yPos === 300) {
    return cancelAnimationFrame(getRocket);
  }
  yPos += 2;

  rocket.style.transform = `translateX(-${yPos * 2.1}px)`;
  getRocket = requestAnimationFrame(fireRocket);
};

fireRocket();
controlRocket();

window.addEventListener("click", () => cancelAnimationFrame(getRocket));
