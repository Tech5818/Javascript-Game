/**
 * spacebar를 누르기 전까지 play 화면이 안보임
 *
 * spacebar를 누르면 start 화면은 사라지고,
 * play화면이 보임
 */

const startScreen = document.getElementById("start");

window.addEventListener("keydown", (e) => {
  if (e.key === " ") {
    startScreen.style.opacity = 0;

    setTimeout(() => {
      startScreen.style.display = "none";
    }, 1000);
  }
});
