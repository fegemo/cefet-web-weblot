let knightEl = document.querySelector("#knight");
let boxEl = document.querySelector("#knight-box");

const leftLimit = 0.05 * window.innerWidth;
const bottomLimit = 0;
const rightLimit = window.innerWidth - (0.05 * window.innerWidth);
const topLimit = window.innerHeight;

let px = leftLimit + 1;
let py = bottomLimit + 1;

setInterval(function () {
    if (state === 'hurt') {
        if (!knightEl.classList.contains('hurt')) {
            knightEl.style.width = '240px';
            knightEl.className = '';
            knightEl.classList.add(state + '-right');
        }

    } else if (state === 'die') {
        if (!knightEl.classList.contains('die')) {
            knightEl.style.width = '240px';
            knightEl.className = '';
            knightEl.classList.add(state + '-right');
        }
    }
}, 1000 / 30);

document.addEventListener('keydown', (e => {
    let step;

    if (e.keyCode == 37 || e.keyCode == 39) {
        if (state === 'walk') {
            step = 5;
            knightEl.style.width = '234px';
        } else if (state === 'run') {
            step = 10;
            knightEl.style.width = '240px';
        } else if (state === 'hurt') {
            step = 1;
            knightEl.style.width = '240px';
        } else if (state === 'die') {
            step = 0;
            knightEl.style.width = '240px';
        }
    }

    if (e.keyCode == 37 && px > leftLimit) { //left
        if (px > leftLimit + step) {
            px -= step;

            boxEl.style.left = px + 'px';
        }
        knightEl.className = '';
        knightEl.classList.add(state + '-left');
    }

    if (e.keyCode == 39 && px < rightLimit) { //right
		if (px < rightLimit - knightEl.clientWidth) {
            px += step;

            boxEl.style.left = px + 'px';
		}
        knightEl.className = '';
        knightEl.classList.add(state + '-right');
    }
}));

document.addEventListener('keyup', (e => {
	if (e.keyCode == 37 && px > leftLimit) {
        if (status !== 'hurt' || status !== 'die') {
            knightEl.classList.add('idle-left');
            knightEl.classList.remove(state + '-left');
        }
	}

	if (e.keyCode == 39 && px < rightLimit) {
        if (status !== 'hurt' || status !== 'die') {
            knightEl.classList.remove(state + '-right');
            knightEl.classList.add('idle-right');
        }
	}

    knightEl.style.width = '227px';
}));
