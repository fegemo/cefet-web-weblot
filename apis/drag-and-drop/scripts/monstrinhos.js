const dragTargetEl = document.getElementById('dnd-target');
const draggables = document.getElementsByClassName('dnd-draggable');

for (let draggableEl of draggables) {
  // coloca um evento 'dragstart' em cada elemento arrastável
  draggableEl.addEventListener('dragstart', e => {
    // assim que um elemento começa a ser arrastdo,
    // é necessário definir que "informação" (dado) ele
    // está transportando. Neste caso, apenas uma string
    // com o próprio id do elemento
    e.dataTransfer.effectAllowed = 'move';
    e.dataTransfer.setData('text/plain', e.currentTarget.id);
  });
}

// o elemento que pode receber itens arrastáveis deve
// tratar o evento 'dragover'
dragTargetEl.addEventListener('dragover', e => {
  e.preventDefault();

  // assim que o alvo receber um elemento sobrevoando nele,
  // colocamos uma classe nele pra mostrar ao usuário que
  // ele pode soltar o arrastável aqui
  e.currentTarget.classList.add('dnd-over');
  e.dataTransfer.dropEffect = 'move';
});

// o elemento alvo deve tratar também o evento 'dragenter'
dragTargetEl.addEventListener('dragenter', e => {
  e.preventDefault();
  e.currentTarget.classList.add('dnd-over');
});

// o elemento alvo deve tratar o 'dragleave'
dragTargetEl.addEventListener('dragleave', e => {
  // tira a classe que indicava que o usuário poderia
  // soltar o item aqui no alvo
  e.currentTarget.classList.remove('dnd-over');
});

// o alvo deve tratar o evento 'drop', chamado quando o
// usuário solta um item arrastável nele
dragTargetEl.addEventListener('drop', e => {
  e.preventDefault();

  // pega o elemento HTML que foi solto aqui e o coloca
  // dentro do alvo, além de colocar uma classe que vai
  // pôr uma animação no bichinho
  const el = document.getElementById(e.dataTransfer.getData('text/plain'));
  e.currentTarget.appendChild(el);
  el.classList.add('dnd-destroying');
  dragTargetEl.classList.remove('dnd-over');
});
