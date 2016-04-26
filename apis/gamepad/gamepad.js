var haveEvents = 'GamepadEvent' in window;
var haveWebkitEvents = 'WebKitGamepadEvent' in window;
var controllers = {};
var rAF = window.mozRequestAnimationFrame ||
  window.webkitRequestAnimationFrame ||
  window.requestAnimationFrame;

function connecthandler(e) {
  addgamepad(e.gamepad);
}
function addgamepad(gamepad) {
  controllers[gamepad.index] = gamepad; var d = document.createElement("div");
  d.setAttribute("id", "controller" + gamepad.index);
  var t = document.createElement("h1");
  t.appendChild(document.createTextNode("gamepad: " + gamepad.id));
  d.appendChild(t);
  var b = document.createElement("div");
  b.className = "buttons";
  for (var i=0; i<gamepad.buttons.length; i++) {
    var e = document.createElement("span");
    e.className = "button";
    //e.id = "b" + i;
    e.innerHTML = i;
    b.appendChild(e);
  }
  d.appendChild(b);
  var a = document.createElement("div");
  a.className = "axes";
  for (i=0; i<gamepad.axes.length; i++) {
    e = document.createElement("progress");
    e.className = "axis";
    //e.id = "a" + i;
    e.setAttribute("max", "2");
    e.setAttribute("value", "1");
    e.innerHTML = i;
    a.appendChild(e);
  }
  d.appendChild(a);
  document.body.appendChild(d);
  document.getElementById('gamepad').innerHTML = "Gamepad connected " + gamepad.id;
  rAF(updateStatus);
}

function disconnecthandler(e) {
  removegamepad(e.gamepad);
}

function removegamepad(gamepad) {
  var d = document.getElementById("controller" + gamepad.index);
  document.body.removeChild(d);
  delete controllers[gamepad.index];
}

function buttonPressed(b) {
  if (typeof(b) == "object") {
    return b.pressed;
  }
  return b == 1.0;
}

function updateStatus() {
  scangamepads();
  for (j in controllers) {
    var controller = controllers[j];
    var d = document.getElementById("controller" + j);
    var buttons = d.getElementsByClassName("button");/*
    for (var i=0; i<controller.buttons.length; i++) {
      var b = buttons[i];
      var val = controller.buttons[i];
      var pressed = val == 1.0;
      if (typeof(val) == "object") {
        pressed = val.pressed;
        val = val.value;
      }
      var pct = Math.round(val * 100) + "%";
      b.style.backgroundSize = pct + " " + pct;
      if (pressed) {
        b.className = "button pressed";
      } else {
        b.className = "button";
      }
    }*/
    if(buttonPressed(controller.buttons[2])){
      document.getElementById('quadrado').getElementsByTagName("button")[0].style.opacity = 1;
    } else {
      document.getElementById('quadrado').getElementsByTagName("button")[0].style.opacity = 0.3;
    }

    if(buttonPressed(controller.buttons[0])){
      document.getElementById('xis').getElementsByTagName("button")[0].style.opacity = 1;
    } else {
      document.getElementById('xis').getElementsByTagName("button")[0].style.opacity = 0.3;
    }

    if(buttonPressed(controller.buttons[1])){
      document.getElementById('bolinha').getElementsByTagName("button")[0].style.opacity = 1;
    } else {
      document.getElementById('bolinha').getElementsByTagName("button")[0].style.opacity = 0.3;
    }

    if(buttonPressed(controller.buttons[3])){
      document.getElementById('triangulo').getElementsByTagName("button")[0].style.opacity = 1;
    } else {
      document.getElementById('triangulo').getElementsByTagName("button")[0].style.opacity = 0.3;
    }

    if(buttonPressed(controller.buttons[4])){
      document.getElementById('l1').getElementsByTagName("button")[0].style.opacity = 1;
    } else {
      document.getElementById('l1').getElementsByTagName("button")[0].style.opacity = 0.3;
    }

    if(buttonPressed(controller.buttons[5])){
      document.getElementById('r1').getElementsByTagName("button")[0].style.opacity = 1;
    } else {
      document.getElementById('r1').getElementsByTagName("button")[0].style.opacity = 0.3;
    }

    if(buttonPressed(controller.buttons[6])){
      document.getElementById('l2').getElementsByTagName("button")[0].style.opacity = 1;
    } else {
      document.getElementById('l2').getElementsByTagName("button")[0].style.opacity = 0.3;
    }

    if(buttonPressed(controller.buttons[7])){
      document.getElementById('r2').getElementsByTagName("button")[0].style.opacity = 1;
    } else {
      document.getElementById('r2').getElementsByTagName("button")[0].style.opacity = 0.3;
    }

    if(buttonPressed(controller.buttons[8])){
      document.getElementById('options').getElementsByTagName("button")[0].style.opacity = 1;
    } else {
      document.getElementById('options').getElementsByTagName("button")[0].style.opacity = 0.3;
    }

    if(buttonPressed(controller.buttons[9])){
      document.getElementById('start').getElementsByTagName("button")[0].style.opacity = 1;
    } else {
      document.getElementById('start').getElementsByTagName("button")[0].style.opacity = 0.3;
    }

    if(buttonPressed(controller.buttons[10])){
      document.getElementById('esq').getElementsByTagName("button")[0].style.opacity = 1;
    } else {
      document.getElementById('esq').getElementsByTagName("button")[0].style.opacity = 0.3;
    }

    if(buttonPressed(controller.buttons[11])){
      document.getElementById('dir').getElementsByTagName("button")[0].style.opacity = 1;
    } else {
      document.getElementById('dir').getElementsByTagName("button")[0].style.opacity = 0.3;
    }

    if(buttonPressed(controller.buttons[12])){
      document.getElementById('cima').getElementsByTagName("button")[0].style.opacity = 1;
    } else {
      document.getElementById('cima').getElementsByTagName("button")[0].style.opacity = 0.3;
    }

    if(buttonPressed(controller.buttons[13])){
      document.getElementById('baixo').getElementsByTagName("button")[0].style.opacity = 1;
    } else {
      document.getElementById('baixo').getElementsByTagName("button")[0].style.opacity = 0.3;
    }

    if(buttonPressed(controller.buttons[14])){
      document.getElementById('esquerda').getElementsByTagName("button")[0].style.opacity = 1;
    } else {
      document.getElementById('esquerda').getElementsByTagName("button")[0].style.opacity = 0.3;
    }

    if(buttonPressed(controller.buttons[15])){
      document.getElementById('direita').getElementsByTagName("button")[0].style.opacity = 1;
    } else {
      document.getElementById('direita').getElementsByTagName("button")[0].style.opacity = 0.3;
    }

    if(buttonPressed(controller.buttons[16])){
      document.getElementById('ps').getElementsByTagName("button")[0].style.opacity = 1;
    } else {
      document.getElementById('ps').getElementsByTagName("button")[0].style.opacity = 0.3;
    }

    if(buttonPressed(controller.buttons[17])){
      document.getElementById('touchpad').getElementsByTagName("button")[0].style.opacity = 1;
    } else {
      document.getElementById('touchpad').getElementsByTagName("button")[0].style.opacity = 0.3;
    }

    document.getElementById('esq').getElementsByTagName("progress")[0].value = controller.axes[0] + 1;
    document.getElementById('esq').getElementsByTagName("progress")[1].value = controller.axes[1] + 1;

    document.getElementById('dir').getElementsByTagName("progress")[0].value = controller.axes[2] + 1;
    document.getElementById('dir').getElementsByTagName("progress")[1].value = controller.axes[3] + 1;
  }
  rAF(updateStatus);
}

function scangamepads() {
  var gamepads = navigator.getGamepads ? navigator.getGamepads() : (navigator.webkitGetGamepads ? navigator.webkitGetGamepads() : []);
  for (var i = 0; i < gamepads.length; i++) {
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
