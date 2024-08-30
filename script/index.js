const rocket = document.getElementById("rocket");

let xPos = 0;
let getRocket;
let rotate = 0;

const fireRocket = () => {
  if (xPos > 3000) {
    return cancelAnimationFrame(fireRocket);
  }
  rotate += 1;
  xPos += Math.sqrt(rotate, 2);
  console.log(xPos);

  rocket.style.transform = `translateX(${xPos / 2}px rotate(${rotate}deg)`;
  getRocket = requestAnimationFrame(fireRocket);
};
const downRocket = () => {
  if (yPos === 300) {
    return cancelAnimationFrame(fireRocket);
  }
  yPos += 2;

  rocket.style.transform = `translateX(-${yPos * 2.1}px)`;
  getRocket = requestAnimationFrame(fireRocket);
};

fireRocket();

window.addEventListener("click", () => cancelAnimationFrame(getRocket));
