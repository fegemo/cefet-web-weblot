var shinigami={
    nome:"img/Fantasma/Parado/parado_",
    max:10,
    velocidade:300,
    estado:"DIREITA",
    numero:1,
    elemento:document.querySelector("#fantasma")
}

const timing = { 
    duration: 1850,
    fill: 'forwards'
};
const Esquerda=[//vira para a esquerda e translada
   { transform: "scale(3) scaleX(1) translateX(0px)" },
    { transform: "scale(3) scaleX(1) translateX(-10em)" } 
]
const Direita=[//vira para a direita e translada
    { transform: "scale(3) scaleX(-1) translateX(0)" },
    { transform: "scale(3) scaleX(-1) translateX(-10em)" }
]
const tamanho = [//para aumentar o tamanho
    { transform: "scale(3)"},
    { transform: "scale(3)"}
  ];

function mudaSprite(){
    shinigami.numero=1;
    if (shinigami.estado == "ATAQUE") {
        shinigami.nome = "img/Fantasma/Ataque/ataque_"
        shinigami.max = 9
    }
    if (shinigami.estado == "MORTE") {
        shinigami.nome  = "img/Fantasma/Morte/morte_"
        shinigami.max = 10
    }
    if (shinigami.estado == "DIREITA") {
        shinigami.nome  = "img/Fantasma/Voando/voa_"
        shinigami.max = 6,
        shinigami.elemento.animate(Direita,timing);//animação
    }
    if (shinigami.estado == "ESQUERDA") {
        shinigami.nome  = "img/Fantasma/Voando/voa_"
        shinigami.max = 6,
        shinigami.elemento.animate(Esquerda,timing);//animação
    }
    if (shinigami.estado == "PARADO") {
        shinigami.nome  = "img/Fantasma/Parado/parado_"
        shinigami.max = 10
    }
}
setInterval(() => {
    shinigami.numero++;
    if (shinigami.numero > shinigami.max) {
        shinigami.numero=1;
        shinigami.estado = "PARADO";
        shinigami.elemento.animate(tamanho,timing);
        mudaSprite()
    }
    shinigami.elemento.src = shinigami.nome + shinigami.numero + ".png";
}, shinigami.velocidade);

shinigami.elemento.animate(tamanho,timing);