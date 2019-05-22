window.onload = function () {
	//Constantes que armazenam o código de cada seta do teclado
	var life = 3;
	var SPACE = 32; LEFT = 37, UP = 38, RIGHT = 39, DOWN = 40;
	var floorHeight = 0;
	var time = 0;
	var counterCoin = 0;
	var counterEnemy = 1;
	var counterKill = 0;
	var cnv = document.querySelector("canvas");
	var ctx = cnv.getContext("2d");
	var spriteSheet = new Image();
	var spriteSheetCoin = new Image();
	var spriteSheetEnemy = new Image();
	spriteSheet.src = "img/character.png";
	spriteSheetCoin.src = "img/coin.png";
	spriteSheetEnemy.src = "img/character2.png";
	var background = new Image();
	background.src = "img/BG.png"
	var zezim = new Sprite(spriteSheet);
	var enemy = new Enemy(spriteSheetEnemy);
	var coin = [];
	var enemy = [];
	let body = document.getElementById('body');
	let scoreText = document.createElement('h1');
	scoreText.textContent = "Score : 0 ";
	scoreText.className = 'score';
	body.appendChild(scoreText);
	enemy.push(new Enemy(spriteSheetEnemy, cnv.width, counterEnemy))

	enemy.forEach(function (item, indice, array) {
		console.log(item, indice);
	});

	coin.push(new Coin(spriteSheetCoin, cnv.width, counterCoin))

	coin.forEach(function (item, indice, array) {
		console.log(item, indice);
	});

	var battery;

	function batterySuccess(batteryManager) {
		battery = batteryManager;
		console.log(battery.level)
		if (battery.charging) {
			background.src = "img/desert.png"
			scoreText.style.color = 'black';

		}else{	
			background.src = "img/BG.png"
			scoreText.style.color = 'white';
		}
		/*
		if (battery.level > 0.5) {
			desert
		}
		else if (battery.level <= 0.5) {

			background.src = "img/BG.png"
		}
		*/
	}

	function batteryFailure() {
		document.getElementById("promiseStatus").innerHTML = "failed";
	}

	var maxWidth = cnv.width - zezim.width;
	var minWidth = 0;



	let lifeDiv = document.createElement('div');
	lifeDiv.className = 'life';
	body.appendChild(lifeDiv);

	window.addEventListener("keydown", keydownHandler, false);
	window.addEventListener("keyup", keyupHandler, false);
	function gamePadHandler() {
		var gp = navigator.getGamepads()[0];
		if (gp) {
			console.log(gp);
			if (gp.axes[0] > 0.001) {
				zezim.mvLastRight = true;
				zezim.mvRight = true;
				zezim.mvLeft = false;
				zezim.mvUp = false;
				zezim.mvDown = false;
			} else if (gp.axes[0] < -0.001) {
				zezim.mvLastRight = false;
				zezim.mvRight = false;
				zezim.mvLeft = true;
				zezim.mvUp = false;
				zezim.mvDown = false;
			} else {
				zezim.mvLastRight = false;
				zezim.mvRight = false;
				zezim.mvLeft = false;
				zezim.mvUp = false;
				zezim.mvDown = false;
			}
		}
		if (gp) {
			if (gp.buttons[2].pressed) {
				zezim.mvRight = false;
				zezim.mvLeft = false;
				zezim.mvUp = false;
				zezim.mvDown = false;
				zezim.atack = true;
			} else {
				zezim.atack = false;
			}
		}
	}

	function keydownHandler(e) {
		switch (e.keyCode) {
			case RIGHT:
				zezim.mvLastRight = true;
				zezim.mvRight = true;
				zezim.mvLeft = false;
				zezim.mvUp = false;
				zezim.mvDown = false;
				break;
			case LEFT:
				zezim.mvLastRight = false;
				zezim.mvRight = false;
				zezim.mvLeft = true;
				zezim.mvUp = false;
				zezim.mvDown = false;
				break;
			case UP:
				zezim.mvRight = false;
				zezim.mvLeft = false;
				zezim.mvUp = true;
				zezim.mvDown = false;
				console.log("Quantidade de Moedas " + counterCoin);
				console.log(" Quantidade de Inimigos " + counterEnemy);
				break;
			case SPACE:
				zezim.mvRight = false;
				zezim.mvLeft = false;
				zezim.mvUp = false;
				zezim.mvDown = false;
				zezim.atack = true;
				break;
		}

	}

	function keyupHandler(e) {
		switch (e.keyCode) {
			case RIGHT:
				zezim.mvRight = false;
				break;
			case LEFT:
				zezim.mvLeft = false;
				break;
			case UP:
				zezim.mvUp = false;
				break;
			case DOWN:
				zezim.mvDown = false;
				break;
			case SPACE:
				zezim.atack = false;
				break;
		}
	}

	//Quano a imagem é carregada, o programa é iniciado
	spriteSheet.onload = function () {
		init();
		zezim.posX = (cnv.width - zezim.width) / 2; // personagem nasce no meio da tela
		zezim.posY = cnv.height - zezim.height;

		coin.forEach(function (item, indice, array) {
			item.posX = Math.floor(((Math.random() * (item.cnvWidth - 400 - item.width)) + item.width)) + 200;
			item.posY = Math.floor(((Math.random() * -800)) - 200);
		});

		enemy.forEach(function (item, indice, array) {
			item.posY = cnv.height - item.height;
			if (Math.floor(Math.random()) < 0.5) {
				item.posX = Math.floor(((Math.random() * +800)) + cnv.width);
			} else {
				item.posX = Math.floor(((Math.random() * -800)) - item.width);
			}

		});
	}

	function init() {
		loop();
	}

	function update() {
		if (!zezim.endGame) {
			gamePadHandler();
			navigator.getBattery().then(batterySuccess, batteryFailure);
			zezim.move(minWidth, maxWidth, time, floorHeight);
			coin.forEach(function (item, indice, array) {
				item.move();

				//Colisao
				if ((item.posY) <= zezim.posY + zezim.height && zezim.posY <= (item.posY + item.height)) {
					if ((item.posX) <= zezim.posX + zezim.width && zezim.posX <= (item.posX + item.width)) {
						item.posX = Math.floor(((Math.random() * (item.cnvWidth - 800 - item.width)) + item.width)) + 400;
						item.posY = Math.floor(((Math.random() * -800)) - 200);
						if (counterCoin < 9) {
							this.window.navigator.vibrate(500);
							coin.push(new Coin(spriteSheetCoin, cnv.width, counterCoin));
							//Colisao
						}
						counterCoin++;
						scoreText.textContent = 'Score : ' + ((counterCoin * 10) + (counterKill * 5));
						console.log("COLISAO MOEDA " + scoreText)
					}
				}
				// passar da tela
				if (item.posY > cnv.height) {
					item.posX = Math.floor(((Math.random() * (item.cnvWidth - 800 - item.width)) + item.width)) + 400;
					item.posY = Math.floor(((Math.random() * -800)) - 200);
				}
			});

			enemy.forEach(function (item, indice, array) {

				item.move(zezim.posX);


				//Colisao
				if ((item.posY) <= zezim.posY + zezim.height && zezim.posY <= (item.posY + item.height)) {
					if ((item.posX) <= zezim.posX + zezim.width - 100 && zezim.posX <= (item.posX + item.width) - 100) {

						item.posY = cnv.height - item.height;

						if (zezim.atack && zezim.mvLastRight && !item.mvLastRight) {

						} else if (zezim.atack && !zezim.mvLastRight && item.mvLastRight) {

						} else {
							zezim.life--;
							this.window.navigator.vibrate(500);

							if (zezim.life > 0)
								counterKill -= 10;
							if ((counterKill * 5 + counterCoin * 10) < 0) {
								counterKill = 0;
								counterCoin = 0;
							}
							console.log(lifeDiv.style.width);
							if (zezim.life == 2)
								lifeDiv.style.width = '112px';
							else if (zezim.life == 1)
								lifeDiv.style.width = '56px';
							else if (zezim.life == 0)
								lifeDiv.style.width = '0px';
						}
						if (counterEnemy <= 4 && zezim.life > 0) {
							navigator.vibrate([500]);
							enemy.push(new Enemy(spriteSheetEnemy, cnv.height, counterEnemy));
							//Colisao
							counterKill++;
						}
						scoreText.textContent = 'Score : ' + ((counterCoin * 10) + (counterKill * 5));

						counterEnemy++;

						//Atualiza posição apos colisao
						if (zezim.life < 1 && !zezim.atack) {
						} else if (Math.random() > 0.5) {
							item.posX = Math.floor(((Math.random() * +1000)) + cnv.width + 500);
						} else {
							item.posX = Math.floor(((Math.random() * -1000)) - item.width - 500);
						}
					}
				}

			});
		}
	}

	function draw() {

		ctx.clearRect(0, 0, cnv.width, cnv.height);
		ctx.drawImage(background, //Imagem de origem
			//Captura da imagem
			0, //Origem da captura no eixo X
			0, //Origem da captura no eixo Y
			1000, //Largura da imagem que será capturada
			900, //Altura da imagem que será capturada
			//Exibição da imagem
			0, //Posição no eixo X onde a imagem será exibida 
			0, //Posição no eixo Y onde a imagem será exibida 
			cnv.width, //Largura da imagem a ser exibida 
			cnv.height //Altura da imagem a ser exibida 
		);
		coin.forEach(function (item, indice, array) {
			item.draw(ctx);
		});
		zezim.draw(ctx);

		enemy.forEach(function (item, indice, array) {
			item.draw(ctx);
		});
	}

	function loop() {
		window, requestAnimationFrame(loop, cnv);
		time += 1;
		update();
		draw();
	}
}
