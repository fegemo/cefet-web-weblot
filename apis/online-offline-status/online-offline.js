let texto = document.getElementById('mensagem');

let imagem = document.getElementById('gatinho');
let online = window.navigator.onLine;


if (online){
  console.log('online');
  texto.innerHTML = 'Você está online';
  imagem.src = 'images/pusheen_baloons.png';

}
else {
  console.log('offline');
  document.getElementById('conteudo').style.background = 'linear-gradient(to bottom, #9fafc9, #1f4b91)';
  texto.innerHTML = 'Você está offline';
  imagem.src = 'images/pusheen_lazy.png';
  imagem.style.height = '150px';
  imagem.style.weight = '150px';
  imagem.style.margin = '300px 0 0 0';
}
