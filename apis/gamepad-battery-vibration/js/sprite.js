class Sprite {
	constructor(img) {
		//Atributos ****************
		this.life = 3;
		this.mvLastRight = true;
		this.atack = this.mvLeft = this.mvUp = this.mvRight = this.mvDown = false;
		//Origem para captura da imagem a ser exibida
		this.srcX = this.srcY = 0;
		//Posição no canvas onde a figura será exibida
		this.posX = this.posY = 0;
		this.imgWidth = 587;
		this.imgHeight = 707;
		this.width = 0.29 * 587;
		this.height = 0.29 * 707;
		this.speed = 10;
		this.atackSpeed = 1;
		this.gravity = 0.1;
		this.img = img;
		this.countAnim = 0;
		this.div = 5;
		this.frame = 55;
		this.endGame = false;
		this.idle = false;
		//Métodos *****************
		//Desenha a figura
		this.draw = function (ctx) {
			ctx.save()

			//ctx.translate(1920, 0);
			//	ctx.scale(-1, 1);
			ctx.drawImage(this.img, //Imagem de origem
				//Captura da imagem
				this.srcX, //Origem da captura no eixo X
				this.srcY, //Origem da captura no eixo Y
				this.imgWidth, //Largura da imagem que será capturada
				this.imgHeight, //Altura da imagem que será capturada
				//Exibição da imagem
				this.posX, //Posição no eixo X onde a imagem será exibida 
				this.posY, //Posição no eixo Y onde a imagem será exibida 
				this.width, //Largura da imagem a ser exibida 
				this.height //Altura da imagem a ser exibida 
			);
			this.animation();
			ctx.restore()
		};
		//Move a figura
		this.move = function (minWidth, maxWidth, time, floorHeight) {

			if ((maxWidth > this.posX && this.mvRight)) {
				this.posX += this.speed;
				this.srcY = this.imgHeight * 0;
			}
			else if ((minWidth < this.posX && this.mvLeft)) {
				this.posX -= this.speed;
				this.srcY = this.imgHeight * 1;
			}
			else if (this.mvUp) {

			}
			else if (this.mvDown) {
				this.srcY = this.imgHeight * 3;
			}
			else if (this.atack) {
				if (this.mvLastRight) {
					this.srcY = this.imgHeight * 2;
				}
				else {
					this.srcY = this.imgHeight * 3;
				}
			} else if (this.mvLastRight) {
				this.idle = true;
				this.srcY = this.imgHeight * 4;
			} else {
				this.idle = true;
				this.srcY = this.imgHeight * 5;
			}

			if (this.life <= 0) {
				if (this.mvLastRight) {
					this.imgWidth = 944;
					this.width = 0.29 * 944;
					this.height = 0.29 * 751;
					this.srcY = this.imgHeight * 6;
					this.frame = 50;
				} else {
					this.imgWidth = 944;
					this.width = 0.29 * 944;
					this.height = 0.29 * 751;
					this.srcY = this.imgHeight * 6 + 751;
					this.frame = 50;
				}
			}


		};

		//Anima a figura
		this.animation = function () {
			if (this.mvLeft || this.mvUp || this.mvRight || this.mvDown || this.atack || this.life <= 0 || this.idle) {
				//Caso qualquer seta seja pressionada, o contador de animação é incrementado
				if (this.life <= 0 && this.countAnim == 49) {
					this.endGame = true;
				} else {
					this.countAnim++;
				}
				if (this.countAnim >= this.frame) {
					this.countAnim = 0;
				}
				this.srcX = Math.floor(this.countAnim / 5) * this.imgWidth;
			}
			else {
				//Caso nenhuma tecla seja pressionada, o contador de animação é zerado e a imagem do personagem parado é exibida
				this.srcX = 0;
				this.countAnim = 0;
			}
		};
	}
}

