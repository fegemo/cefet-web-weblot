class Enemy {
	constructor(img, cnvHeight, counter) {
		//Atributos ****************
		this.jump = this.mvLeft = this.mvUp = this.mvRight = this.mvDown = false;
		//Origem para captura da imagem a ser exibida
		this.srcX = this.srcY = 0;
		//Posição no canvas onde a figura será exibida
		this.mvLastRight = true;
		this.imgWidth = 430;
		this.imgHeight = 519;
		this.width = 7 * 24;
		this.height = 7 * 32;

		this.jumpSpeed = 1;
		this.gravity = 0.1;
		this.img = img;
		this.cnvHeight = cnvHeight;
		this.counter = counter;
		this.speed = 4 + this.counter / 20;
		this.countAnim = 0;

		this.posY = cnvHeight - this.height;
		if (Math.random() > 0.5) {
			this.posX = Math.floor(((Math.random() * +1000)) + cnvHeight + 500);
		} else {
			this.posX = Math.floor(((Math.random() * -1000)) - this.width - 500);
		}
		//Métodos *****************
		//Desenha a figura
		this.draw = function (ctx) {


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
		};
		//Move a figura
		this.move = function (zezimPosX) {

			if (zezimPosX > this.posX) {
				this.srcY = this.imgHeight * 0;
				this.posX += this.speed;
				this.mvLastRight = true;
			} else {
				this.srcY = this.imgHeight * 1;
				this.posX -= this.speed;
				this.mvLastRight = false;
			}

		};
		//Anima a figura
		this.animation = function () {
			this.countAnim++;
			if (this.countAnim >= 50) {
				this.countAnim = 0;
			}
			this.srcX = Math.floor(this.countAnim / 5) * this.imgWidth;
		};
	}
}

