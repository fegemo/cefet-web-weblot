let alice = document.getElementById("alice");
let tunnel = document.getElementById("tunnel");
let aliceW = document.getElementById("alice-wrapper");

let controlW = document.getElementById("controls-wrapper");
let play = document.getElementById("play");
let pause = document.getElementById("pause");
let reverse = document.getElementById("rew");
let forward = document.getElementById("fwd");

let animate = document.getElementById('btn-wrapper');
let btnAnimate = document.getElementById('btn-animate');
let btnFs = document.getElementById('btn-fullscreen')

let title = document.getElementById('title');
let subtitle1 = document.getElementById('subtitle1');
let subtitle2 = document.getElementById('subtitle2');
let divider = document.getElementById('divider');
let name1 = document.getElementById('name1');
let name2 = document.getElementById('name2');
let name3 = document.getElementById('name3');


/* WORD ANIMATIONS */
  let startAnimation = function() {
    title.classList.remove('hide');
    subtitle1.classList.remove('hide');
    subtitle2.classList.remove('hide');
    divider.classList.remove('hide');
    name1.classList.remove('hide');
    name2.classList.remove('hide');
    name3.classList.remove('hide');
    aliceW.classList.remove('hide');
    controlW.classList.remove('hide');
    animate.className += " hide ";
  }

  /* START AINMATIONS */
  btnAnimate.addEventListener("click", startAnimation);



/* ALICE ANIMATIONS */
  let tunnelAnimation = tunnel.animate(
    [
      { transform: 'translate3D(0, 0, 0)' },
      { transform: 'translate3D(0, -300px, 0)' }
    ], {
      duration: 1000,
      iterations: Infinity
    }
  );

  let aliceAnimation = alice.animate(
    [
      { transform: 'rotate(0) translate3D(-50%, -50%, 0)', color: '#000', opacity: '0.1' },
      { color: '#904e95', offset: 0.333, opacity: '0.6'},
      { transform: 'rotate(360deg) translate3D(-50%, -50%, 0)', color: '#e96443', opacity: '1' }
    ], {
      duration: 3000,
      iterations: Infinity
    }
  );

  /* PLAY ALICE */
  play.addEventListener("click", function() {
    console.log('PLAY');

    tunnelAnimation.playbackRate = 1;
    tunnelAnimation.play();
    aliceAnimation.playbackRate = 1;
    aliceAnimation.play();
  });

  /* PAUSE ALICE */
  pause.addEventListener("click", function() {
    console.log('PAUSE');

    tunnelAnimation.pause();
    aliceAnimation.pause();
  });

  /* REVERSE ALICE */
  reverse.addEventListener("click", function() {
    console.log('REVERSE (3x)');

    tunnelAnimation.playbackRate = 3;
    tunnelAnimation.reverse();
    aliceAnimation.playbackRate = 3;
    aliceAnimation.reverse();
  });

  /* FORWARD ALICE */
  forward.addEventListener("click", function() {
    console.log('FORWARD (3x)');

    tunnelAnimation.playbackRate = 3;
    tunnelAnimation.play();
    aliceAnimation.playbackRate = 3;
    aliceAnimation.play();
  });



/* FULLSCREEN METHODS */
  let enabled = false;

  // toggle fullscreen
  btnFs.addEventListener('click', function() {
    if (enabled) {
      exitFullscreen();
    } else {
      launchFullscreen();
    }
  });

  // go fullscreen
  function launchFullscreen() {
    console.log('GO FULLSCREEN');
    enabled = true;

    let fullscreen = document.getElementById('alice-wrapper');
    let controlfs = document.getElementById('controls-wrapper');

    //let fullscreen = document.documentElement; // pagina toda

    if (fullscreen.requestFullscreen) {
      fullscreen.requestFullscreen();
    } else if (fullscreen.webkitRequestFullscreen) {
      fullscreen.webkitRequestFullscreen();
    } else if (fullscreen.mozRequestFullScreen) {
      fullscreen.mozRequestFullScreen();
    } else if (fullscreen.msRequestFullscreen) {
      fullscreen.msRequestFullscreen();
    }
 }

  // exit fullscreen
  function exitFullscreen() {
    console.log('EXIT FULLSCREEN');
    enabled = false;

    if(document.exitFullscreen) {
      document.exitFullscreen();
    } else if(document.mozCancelFullScreen) {
      document.mozCancelFullScreen();
    } else if(document.webkitExitFullscreen) {
      document.webkitExitFullscreen();
    }
  }

  var animationTo = document.getElementById("animation-to"),
    animationFrom = document.getElementById("animation-from");

  btnFs.addEventListener('click', function() {

    if (btnFs.classList.contains("animated")) {
      btnFs.classList.remove("animated");
      animationFrom.beginElement();
    } else {
      btnFs.classList.add("animated");
      animationTo.beginElement();
    }

  }, false);
