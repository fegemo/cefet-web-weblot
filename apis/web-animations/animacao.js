document.querySelector(".velocidade-braco-esquerdo").onchange = (e) => {
  let angulo1 = "30";
  let angulo2 = "-120";
  let braco = ".braco-esquerdo";
  animaBraco(braco, angulo1, angulo2, e.currentTarget.value);
};

document.querySelector(".velocidade-braco-direito").onchange = (e) => {
  let angulo1 = "-30";
  let angulo2 = "120";
  let braco = ".braco-direito";
  animaBraco(braco, angulo1, angulo2, e.currentTarget.value);
};

function animaBraco(braco, angulo1, angulo2, velocidade) {
  document.querySelector(braco).animate([
    { transform: 'rotate(' + angulo1 + 'deg)' },
    { transform: 'rotate(' + angulo2 + 'deg)' },
  ],
    {
      easing: 'steps(600, end)',
      iterations: Infinity,
      direction: 'alternate',
      duration: Number(velocidade)
    }
  );
}