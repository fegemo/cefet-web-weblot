# O Reino de Weblot :crown:

Um conjunto de códigos ilustrativos de [APIs do HTML5][publicado] (⬅️ clicar).


## Instruções

Conforme o [enunciado][enunciado] diz, o trabalho é composto pela criação, entrega e apresentação 
de um projeto de código simples ilustrando cada API escolhida pelo grupo.

O projeto deve ser entregue como um _Pull Request_ (veja [[1]][using-pull-requests] e
[[2]][creating-pull-requests]) neste repositório. Ou seja, um (01) membro do grupo deve:

1. Fazer um _fork_ deste repositório e dar permissão de escrita (commit/push) para todos os membros do grupo;
   - Clicar no botão _fork_ e, depois, clicar no **Settings** e procurar
1. Trabalhar no _branch_ com nome 'ano/semestre' (e.g., `20YY/SS`). Por exemplo, se for em `2030/01`:
   ```
   git checkout -b 2030/01
   ```
1. Para cada exemplo que se pretende criar, você deve criar **dentro da pasta `/apis`** uma pastinha com o nome da sua API de escolha (**nome em minúsculo,
   sem acentos, trocando espaços por de hífens e sem o prefixo ou sufixo API** - _e.g._, `/apis/drag-and-drop/`) e colocar
   seu código lá.
   - Se optar por ilustrar mais de uma API em um mesmo exemplo, dê um nome à pasta resumindo todas as APIs usadas. Por exemplo, para APIs de Canvas e Speech Recognition, o nome da pasta seria `apis/canvas-e-speech-recognition/`.
1. Cada pasta de exemplo deve conter:
   1. Uma screenshot (preferencialmente quadrada e nor formato `.webp`)
   1. Arquivo `README.md` seguindo o modelo de `apis/drag-and-drop/README.md`
   1. Arquivo `apis.json` seguindo o modelo de `apis/drag-and-drop/apis.json`, que é um vetor com os dados de cada API usada no seu exemplo. Formato de um `apis.json`:
      ```json
      [
        {
          "nome": "Drag and Drop API",
          "breveDescricao": "Possibilita o arraste de elementos HTML em cima de outros",
          "paginaInicial": "apis/drag-and-drop/",
          "screenshot": {
            "caminho": "apis/drag-and-drop/images/screenshot.png",
            "textoAlternativo": "Uma página com 2 monstrinhos em uma jaula e outros 3 fora com os dizeres 'Prenda os Monstrinhos'"
          },
          "desenvolvedores": [
            {
              "nome": "Flávio Coutinho",
              "usuarioGithub": "fegemo"
            }
          ],
          "suporteDeNavegadores": {
            "chrome": true,
            "safari": true,
            "firefox": true,
            "ie": false,
            "edge": true,
            "opera": true
          }
        },
        {
          "nome": "SEGUNDA API DO MESMO EXEMPLO",
          "breveDescricao": "MINHA DESCRIÇÃO... etc."
        }
      ]
      ```
      - Sobre o suporte de navegadores, consulte alguma fonte como o [caniuse.com][caniuse] para preencher.
1. Alterar o arquivo `examples.json` (na raiz) colocando **os nomes das pastas** de exemplos (só o nome, não o caminho) que o grupo criou
   (**sem remover a que está lá**). Insira a(s) string(s) com nomes de pasta sendo 1 por linha e em ordem
   alfabética - apenas para tentar reduzir o número de conflitos nesse arquivo ao entregar seu _pull request_. Por exemplo, para incluir os exemplos `apis/battery-status/` e `apis/webvr`:
   - Inicialmente estava assim:
     ```json
     {
       "semestre": "2030/01",
       "pastas": [
         "drag-and-drop"
       ]
     }
     ```
   - Ficou assim:
     ```json
     {
       "semestre": "2030/01",
       "pastas": [
         "battery-status",
         "drag-and-drop",
         "webvr"
       ]
     }
     ```
1. Abra um servidor web na pasta raiz e veja se está tudo funcionando (verifique o console para erros)
1. Quando tudo estiver certo, abra o _pull request_ do seu _branch_ 20XX/SS **contra o _branch_ de mesmo nome
   do repositório do professor**


Os membros de um mesmo grupo devem trabalhar no _fork_ criado por apenas 1 integrante, ou
seja, aquele que criou o _fork_ deve dar permissão de escrita ao(s) outro(s).

Veja o projeto de exemplo que já está lá, sobre a API de _drag and drop_:
[código fonte][drag-and-drop-code] e o [exemplo publicado][drag-and-drop-live]. Pessoas bonitas seguem
a mesma ideia e formato (exemplo simples, porém bonitão, criativão e _on-topic_).


## Enviando

Como mencionado, o envio será via um _pull request_. Assim que você der o último `git push` para o seu _fork_,
vá para a página do seu _fork_ no Github e clique em "Pull Request":

![](https://i.imgur.com/Wb4k4Fb.png)

Nessa tela, você deve escolher:
- como origem: o seu _branch_ (`ano/semestre`);
- como estino: o _branch_ (`ano/semestre`) do repositório original como destino (**e não o `master`**).


[publicado]: https://fegemo.github.io/cefet-web-weblot
[enunciado]: https://github.com/fegemo/cefet-web/blob/master/assignments/seminar-html5/README.md#seminário---apis-do-html5
[using-pull-requests]: https://help.github.com/articles/using-pull-requests/
[creating-pull-requests]: https://help.github.com/articles/creating-a-pull-request/
[markdown]: https://daringfireball.net/projects/markdown/
[markdown-tutorial]: https://guides.github.com/features/mastering-markdown/
[drag-and-drop-code]: https://github.com/fegemo/cefet-web-weblot/tree/master/apis/drag-and-drop/
[drag-and-drop-live]: https://fegemo.github.io/cefet-web-weblot/apis/drag-and-drop/
[drag-and-drop-readme]: https://github.com/fegemo/cefet-web-weblot/blob/master/apis/drag-and-drop/README.md
[caniuse]: https://caniuse.com