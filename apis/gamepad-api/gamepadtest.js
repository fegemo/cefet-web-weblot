/*
 * Gamepad API Test
 * Written in 2013 by Ted Mielczarek <ted@mielczarek.org>
 *
 * To the extent possible under law, the author(s) have dedicated all copyright and related and neighboring rights to this software to the public domain worldwide. This software is distributed without any warranty.
 *
 * You should have received a copy of the CC0 Public Domain Dedication along with this software. If not, see <http://creativecommons.org/publicdomain/zero/1.0/>.
 */
let haveEvents = 'GamepadEvent' in window;
let haveWebkitEvents = 'WebKitGamepadEvent' in window;
let controllers = {};
let rAF = window.mozRequestAnimationFrame ||
  window.webkitRequestAnimationFrame ||
  window.requestAnimationFrame;

function connecthandler(e) {
  addgamepad(e.gamepad);
}
function addgamepad(gamepad) {
  controllers[gamepad.index] = gamepad; let d = document.createElement("div");
  d.setAttribute("id", "controller" + gamepad.index);
  let t = document.createElement("h1");
  t.appendChild(document.createTextNode("Nome do Controle: " + gamepad.id));
  d.appendChild(t);
  let b = document.createElement("div");
  b.className = "buttons";
  for (let i=0; i<gamepad.buttons.length; i++) {
    let e = document.createElement("span");
    e.className = "button";
    //e.id = "b" + i;
    e.innerHTML = i;
    e.style.marginRight = "5px";
    b.appendChild(e);
  }
  d.appendChild(b);
  let a = document.createElement("div");
  a.className = "axes";
  for (i=0; i<gamepad.axes.length; i++) {
    e = document.createElement("meter");
    e.className = "axis";
    //e.id = "a" + i;
    e.setAttribute("min", "-1");
    e.setAttribute("max", "1");
    e.setAttribute("value", "0");
    e.innerHTML = "Analógico";
    a.appendChild(e);
  }
  d.appendChild(a);
  document.getElementById("start").style.display = "none";
  document.body.appendChild(d);
  rAF(updateStatus);
}

function disconnecthandler(e) {
  removegamepad(e.gamepad);
}

function removegamepad(gamepad) {
  let d = document.getElementById("controller" + gamepad.index);
  document.body.removeChild(d);
  delete controllers[gamepad.index];
}

function updateStatus() {
  scangamepads();
  for (j in controllers) {
    let controller = controllers[j];
    let d = document.getElementById("controller" + j);
    let buttons = d.getElementsByClassName("button");
    for (let i=0; i<controller.buttons.length; i++) {
      let b = buttons[i];
      let val = controller.buttons[i];
      let pressed = val == 1.0;
      if (typeof(val) == "object") {
        pressed = val.pressed;
        val = val.value;
      }
      let pct = Math.round(val * 100) + "%";
      b.style.backgroundSize = pct + " " + pct;
      if (pressed) {
        b.className = "button pressed";
        isKonami(controller.buttons[i]);
      } else {
        b.className = "button";
      }
    }

    let axes = d.getElementsByClassName("axis");
    for (let i=0; i<controller.axes.length; i++) {
      let a = axes[i];
      a.innerHTML = i + ": " + controller.axes[i].toFixed(4);
      a.setAttribute("value", controller.axes[i]);
    }
  }
  rAF(updateStatus);
}

function scangamepads() {
  let gamepads = navigator.getGamepads ? navigator.getGamepads() : (navigator.webkitGetGamepads ? navigator.webkitGetGamepads() : []);
  for (let i = 0; i < gamepads.length; i++) {
    if (gamepads[i]) {
      if (!(gamepads[i].index in controllers)) {
        addgamepad(gamepads[i]);
      } else {
        controllers[gamepads[i].index] = gamepads[i];
      }
    }
  }
}

if (haveEvents) {
  window.addEventListener("gamepadconnected", connecthandler);
  window.addEventListener("gamepaddisconnected", disconnecthandler);
} else if (haveWebkitEvents) {
  window.addEventListener("webkitgamepadconnected", connecthandler);
  window.addEventListener("webkitgamepaddisconnected", disconnecthandler);
} else {
  setInterval(scangamepads, 500);
}

// KonamiCode pq me deu vontade
let konamiCodePosition = 0;
function isKonami(key){
  c = controllers[0];
  let konamiCode = [c.buttons[12], c.buttons[12], c.buttons[13], c.buttons[13], c.buttons[14], c.buttons[15], c.buttons[14], c.buttons[15], c.buttons[1], c.buttons[0]];
  let requiredKey = konamiCode[konamiCodePosition];
  if (key == requiredKey) {
    konamiCodePosition++;
    if (konamiCodePosition == konamiCode.length) {
      activateCheats();
      konamiCodePosition = 0;
    }
  } else {
    konamiCodePosition = 0;
  }
}

function activateCheats() {
  document.body.style.backgroundImage = "url('images/konamicode.png')";
  alert("cheats activated");
}
