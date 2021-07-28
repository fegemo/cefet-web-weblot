const canvas = document.getElementsByTagName("canvas");
const cellWidth = window.innerWidth / 11;

const vibrate = () => {
  navigator.vibrate =
    navigator.vibrate ||
    navigator.webkitVibrate ||
    navigator.mozVibrate ||
    navigator.msVibrate;

  if (navigator.vibrate) {
    navigator.vibrate(100);
  }
};

const checkTouch = (x) => {
  for (let i = 2; i < 9; i += 2) {
    if (x >= i * cellWidth && x <= (i + 1) * cellWidth) {
      return vibrate();
    }
  }
};

const handleStart = (evt) => {
  evt.preventDefault();
  checkTouch(evt.changedTouches[0].pageX);
};

canvas[0].addEventListener("touchstart", handleStart, false);