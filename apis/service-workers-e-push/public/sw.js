
askPermission();

function askPermission() {
  return new Promise(function (resolve, reject) {
    const permissionResult = Notification.requestPermission(function (result) {
      resolve(result);
    });

    if (permissionResult) {
      permissionResult.then(resolve, reject);
    }
  })
    .then(function (permissionResult) {
      if (permissionResult !== 'granted') {
        throw new Error('We weren\'t granted permission.');
      } 
    });
}

const history = [
  "Parou diante da estagem O Velho Narakort e ficou por um momento ouvindo o burburinho. Àquela hora, como de costume, o lugar estava cheio.", 
  "O desconhecido não entrou. Seguiu adiante e puxou seu cavalo até uma taberna menor, chamada A Raposa. Esatava quase vazia; afinal, não tinha boa fama.",
  "O taberneiro ergeu a cabeça de cima de uma barrica de pepinos marinados e mediu o visitante de alto a baixo. Este, ainda com a capa sobre os ombros, permaneceu diante do balcão, imóvel e calado.",
  "- O que vai ser?\n-Cerveja - pediu o desconhecido, com a voz desagradável.",
  "O taberneiro limpou as mãos no puído avental e encheu uma velha caneca de barro.",
  "O desconhecido não era velho, mas tinha os cabelos quase totalmente brancos. Sob a capa, vestia um surrado gibão de couro, amarrado nos ombros e nas axilas. Quando tirou a capa, todos puderam ver a longa espada de dois gumes presa ás costas por um cinturão.",
  "Nada havia de extraordinário naquilo, já que em Wyzim quase todos andavam armados, mas ninguém carregava uma espada ás costas como se fosse um arco ou uma aljava.",
  "O desconhecido não se sentou á mesa com os poucos fregueses. Permaneceu de pé junto do balcão, encarando o taberneiro com olhos penetrantes. Bebeu um trago da caneca.",
  "-Estou procurando um quarto para passar a noite.\n-Não temos vagas - respondeu rudemente o taberneiro, olhando para as empoeiradas botas do recém-chegado.-Procure no Velho Narakort.",
  "-Prefiro aqui.\n-Impossível.-O taberneiro finalmente reconheceu o sotaque do desconhecido: era de Rívia.\n-Pagarei bem-sussurrou o estranho, como se estivesse inseguro.",
  "Foi então que a confusão teve ínicio. Um magricela bexiguento, que desde o momento em que o desconhecido entrara na taberna o observava soturnamente, levantou-se da mesa e aproximou-se do balcão.",
  "Dois de seus companheiros se postaram atrás, a menos de dois passos.\n-Não ouviu que não há lugar aqui para tipós como você, seu vagabundo riviano?-rosnou o bexigento, parando ao lado do desconhecido",
  "-Aqui, em Wyzim, não precisamos de gente de sua laia. Este, no entanto, evitou seu olhar. Nem lhe passava pela cabeça sair em defesa de um riviano. Afinal, quem gostava de rivianos?",
  "-Todos os rivianos são ladrões-continuou o encrenqueiro, fedendo a cerveja,alho e ódio.-Ouviu o que eu disse, seu bastardo?",
  "-Ele não consegue escutar porque tem merda nos ouvidos-disse um dos que estavam atrás, fazendo o outro soltar uma gargalhada.\nPague a conta e suma daqui!-gritou o bexiguento.",
  "Foi só então que o desconhecido olhou para ele.\n-Primeiro, vou terminar minha cerveja.\nPois nós vamos ajudá-lo-sibilou o magricela, que arrancou a caneca da mão do riviano e, agarrando-o pelo braço, enfiou os dedos por trás da tira de couro que atravessava o peito do desconhecido.",
  "Um de seus comparsas preparava-se para desferir um soco. O estranho girou sobre os calcanhares, fazendo o bexiguento perder o equilíbrio. A espada sibilou de dentro da bainha e por um breve momento brilhou á luz das lamparinas. O ambiente fervilhou. Alguém gritou.",
  "Um dos fregueses se precipitou para fora.Uma cadeira desabou e recipientes de barro estilhaçaram.O taberneiro, com lábios trêmulos, ficou olhando para o horrivelmente destroçado rosto do bexiguento, que, desprendendo aos poucos os dedos da beira do balcão, deslizou para baixo, sumindo como se estivesse se afogando.",
  "Os outros dois jaziam no chão, imóvel, o outro se agitando convulsivamente no meio de uma poça escura cada vez maior. Um fino e histérico grito feminino soou no ar, parecendo perfurar os ouvidos. O taberneiro, tremendo feito vara verde, começou a vomitar."
];
let count = 0;
self.addEventListener('push', function (e) {
  var options = {
    body: history[count],
    icon: 'images/example.png',
    vibrate: [100, 50, 100],
    data: {
      dateOfArrival: Date.now(),
      primaryKey: '2'
    },
    actions: [
      {
        action: 'explore', title: 'Explore this new world',
        icon: 'images/checkmark.png'
      },
      {
        action: 'close', title: 'Close',
        icon: 'images/xmark.png'
      },
    ]
  };

  if(count === history.length - 1)
    count = history.length - 1;
  else 
    count++;

  e.waitUntil(
    self.registration.showNotification('This notification was generated with the PushAPI!', options)
  );
});

