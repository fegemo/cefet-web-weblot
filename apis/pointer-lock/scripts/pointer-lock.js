const canvas = document.querySelector('#canvas');
const imagemEl = document.querySelector('#imagem-cursor');

const BORDA = 2;

let x = 0;
let y = 0;

canvas.addEventListener('click', () => {
    // SOLICITA O TRAVAMENTO DO CURSOR
    canvas.requestPointerLock();
});

document.addEventListener('pointerlockchange', lockChangeAlert);

function lockChangeAlert() {
    if (document.pointerLockElement === canvas) {
        console.log('Travado');
        document.addEventListener('mousemove', updatePosition);
    } else {
        console.log('Destravado');
        document.removeEventListener('mousemove', updatePosition);
    }
}

function updatePosition(e) {
    x += e.movementX;
    y += e.movementY;
    if (x > 500 + BORDA) {
        x = BORDA;
    }
    if (y > 500 + BORDA) {
        y = -BORDA;
    }
    if (x < -BORDA) {
        x = 500 + BORDA;
    }
    if (y < -BORDA) {
        y = 500 + BORDA;
    }
    imagemEl.style.left = `${x}px`;
    imagemEl.style.top = `${y}px`;
}
