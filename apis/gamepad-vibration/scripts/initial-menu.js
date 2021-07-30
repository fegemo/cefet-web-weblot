const MUSICS = 2;
let CURRENT_MUSIC = 1;
const musicsUlEl = document.querySelector('.popup > ul ');
const musicsLiEls = Array.from(musicsUlEl.childNodes).filter(
  (el) => el.tagName?.toLowerCase() == 'li'
);
const musics = musicsLiEls.map((musicLiEl) => musicLiEl.dataset.musicName);
const pressToStartEl = document.querySelector('.popup .press-to-start');

export class InitialMenu {
  handleMenuGamepadEvents() {
    return new Promise((resolve, reject) => {
      let oldDown, oldUp, currentUp, currentDown, oldStart, currentStart;
      [oldStart, oldUp, oldDown] = [false, false, false][
        (currentStart, currentUp, currentDown)
      ] = [false, false, false];
      setInterval(() => {
        [currentStart, currentUp, currentDown] = this.getGamepadInput().filter(
          (el, index) => index == 12 || index == 13 || index == 0
        );
        if (currentUp != oldUp) {
          oldUp = currentUp;
          if (currentUp) {
            CURRENT_MUSIC--;
            if (CURRENT_MUSIC == 0) {
              CURRENT_MUSIC = MUSICS;
            }
            console.log('Pressed up -> go to music' + CURRENT_MUSIC);
            this.changeSelectedMusic();
          }
        } else if (currentDown != oldDown) {
          oldDown = currentDown;
          if (currentDown) {
            CURRENT_MUSIC++;
            if (CURRENT_MUSIC == MUSICS + 1) {
              CURRENT_MUSIC = 1;
            }
            console.log('Pressed down -> go to music' + CURRENT_MUSIC);
            this.changeSelectedMusic();
          }
        } else if (currentStart != oldStart) {
          oldStart = currentStart;
          if (currentStart) {
            resolve(musics[CURRENT_MUSIC - 1]);
          }
        }
      }, 1000 / 10); // check 10 times per second if the button one is pressed
    });
  }

  handleMouseEvents() {
    return new Promise((resolve, reject) => {
      Array.from(musicsUlEl.childNodes)
        .filter((el) => el.tagName?.toLowerCase() == 'li')
        .forEach((node) => {
          node.addEventListener('click', () => {
            CURRENT_MUSIC = +node.id.replace('music', '');
            resolve(musics[CURRENT_MUSIC - 1]);
          });
        });
    });
  }

  getGamepadInput = () => {
    let buttons = navigator.getGamepads()[0].buttons.map((b) => b.pressed);
    return buttons;
  };

  changeSelectedMusic() {
    pressToStartEl.classList.remove('hide');

    // console.log(musicsUlEl.childNodes)
    musicsLiEls.forEach((node) => {
      node.id == 'music' + CURRENT_MUSIC
        ? node.classList.add('selected')
        : node.classList.remove('selected');
    });
  }
}
