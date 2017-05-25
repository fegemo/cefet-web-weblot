var sun = new Image();
var moon = new Image();
var earth = new Image();

function init() {
  sun.src = 'https://mdn.mozillademos.org/files/1456/Canvas_sun.png';
  moon.src = 'https://mdn.mozillademos.org/files/1443/Canvas_moon.png';
  earth.src = 'https://mdn.mozillademos.org/files/1429/Canvas_earth.png';
  window.requestAnimationFrame(draw);
}

function draw() {
  
  //-- Pega o elemento e informa que é 2D
  var canvas = document.getElementById('canvas').getContext('2d');

  canvas.globalCompositeOperation = 'destination-over';

  //-- Limpa a área de desenho
  canvas.clearRect(0, 0, 300, 300); 

  canvas.fillStyle = 'rgba(0, 0, 0, 0.4)';
  canvas.strokeStyle = 'rgba(0, 153, 255, 0.4)';
  canvas.save();
  canvas.translate(150, 150);

  //-- Terra
  var time = new Date();
  canvas.rotate(((2 * Math.PI) / 60) * time.getSeconds() + ((2 * Math.PI) / 60000) * time.getMilliseconds());
  canvas.translate(105, 0);
  canvas.fillRect(0, -12, 50, 24);
  canvas.drawImage(earth, -12, -12);

  //-- Lua
  canvas.save();
  canvas.rotate(((2 * Math.PI) / 6) * time.getSeconds() + ((2 * Math.PI) / 6000) * time.getMilliseconds());
  canvas.translate(0, 28.5);
  canvas.drawImage(moon, -3.5, -3.5);
  canvas.restore();

  canvas.restore();
  
  //-- Criando a Órbita da Terra
  canvas.beginPath();
  canvas.arc(150, 150, 105, 0, Math.PI * 2, false);
  canvas.stroke();
 
  //-- Sol
  canvas.drawImage(sun, 0, 0, 300, 300);

  window.requestAnimationFrame(draw);

  //-- Graph

  var ctx = document.getElementById('graph').getContext('2d');
  var img = new Image();
  img.onload = function() {
    ctx.drawImage(img, 60, 0);
    ctx.beginPath();
    ctx.moveTo(30, 96);
    ctx.lineTo(70, 66);
    ctx.lineTo(103, 76);
    ctx.lineTo(170, 15);
    ctx.stroke();
  };
  
  img.src = 'https://mdn.mozillademos.org/files/5395/backdrop.png';

}

init();
