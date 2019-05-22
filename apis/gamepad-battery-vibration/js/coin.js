class Coin {
	constructor(img,cnvWidth,counter) {
		//Atributos ****************
		this.jump = this.mvLeft = this.mvUp = this.mvRight = this.mvDown = false;
		//Origem para captura da imagem a ser exibida
		this.srcX = this.srcY = 0;
		//Posição no canvas onde a figura será exibida


		this.width = 60;
		this.height = 60;
		this.imgWidth = 84;
		this.imgHeight = 84;
		
		this.jumpSpeed = 1;
		this.gravity = 0.1;
		this.img = img;
		this.cnvWidth = cnvWidth;
		this.counter = counter;
		this.speed = 4+this.counter/20;
		this.countAnim = 0;
		this.posX = Math.floor(((Math.random() * (this.cnvWidth - this.width)) + this.width));
		this.posY = Math.floor(((Math.random()*-60))-20);
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
		this.move = function () {
			this.posY += this.speed;
			this.srcY = this.height * 0;
		};
		//Anima a figura
		this.animation = function () {
			this.countAnim++;
			if (this.countAnim >= 30) {
				this.countAnim = 0;
			}
			this.srcX = Math.floor(this.countAnim / 5) * this.imgWidth;
		};
	}
}

