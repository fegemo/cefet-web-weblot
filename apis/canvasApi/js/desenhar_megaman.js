var dx = 40;//a taxa de varia��o (velocidade) horizontal do objeto
var x = 20;//posi��o horizontal do objeto (com valor inicial)
var y = 0;//posi��o vertical do objeto (com valor inicial)
var WIDTH = 1500;//largura da �rea retangular
var HEIGHT = 540;//altura da �rea retangular
var tile1 = new Image();//Imagem que ser� carregada e desenhada na canvas
var posicao = 0;//Indicador da posi��o atual do personagem
var NUM_POSICOES = 10;//Quantidade de imagens que comp�em o movimento

const canvasMegaMan = () => {
    this.canvas;
    this.ctx;

    this.keyDown = (evt) => {
        switch (evt.keyCode) {
            case 39:
                if (x + dx < WIDTH) {
                    x += dx;
                    posicao++;
                    if (posicao == NUM_POSICOES)
                        posicao = 0;
                }
                break;
            case 37:
                if (x - dx > 0) {
                    x -= dx;
                    if(posicao>1){
                        posicao--;
                    }
                    if (posicao == NUM_POSICOES)
                        posicao--;
                }
                break;
        }

    };

    this.desenhar = () => {
        tile1.src = 'megaman/posicao_' + posicao + '.png';
        ctx.drawImage(tile1, x, y);
    }

    this.limparTela = () => {
        ctx.fillStyle = "rgb(255,255,255)";
        ctx.beginPath();
        ctx.rect(0, 0, WIDTH, HEIGHT);
        ctx.closePath();
        ctx.fill();
    }

    this.atualizar = () => {
        limparTela();
        desenhar();
    }

    this.iniciar = () => {
        canvas = document.getElementById("canvas"); //O elemento canvas sobre o qual desenharemos
        ctx = canvas.getContext("2d"); //O "contexto" da canvas que ser utilizado (2D ou 3D)
        return setInterval(atualizar, 100);// Atualizacao dos elementos apartir de um intervalo
    }

    return this;
}
var canvasMega = canvasMegaMan();// Instancia das funcoes
window.addEventListener('keydown', canvasMega.keyDown);//Ouvir evento de click seta direita
canvasMega.iniciar();//Iniciar ciclo