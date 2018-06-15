const servidorDasImagens = 'images/',
  todasAsImagens = [
    'imagem1.jpg',
    'imagem2.jpg',
    'imagem3.jpg',
  ];
var index = 0;

function proximaImagem(){
	index = index >=2 ? 0 : index+1;
	let img = document.getElementById('slide');
	img.src = servidorDasImagens + todasAsImagens[index];
}

function anteriorImagem(){
	index = index <=0 ? 2 : index-1;
	let img = document.getElementById('slide');
	img.src = servidorDasImagens + todasAsImagens[index];
}
