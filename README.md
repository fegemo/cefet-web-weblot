# O Reino de Weblot :crown:

Um conjunto de códigos ilustrativos de APIs do HTML5.

## #comofaz?

Conforme o [enunciado][enunciado] diz, o trabalho é composto por uma (a) apresentação
de seminário, mais a criação e entrega de um (b) projeto de código simples ilustrando
cada API escolhida pelo grupo.

O projeto (b) deve ser entregue como um _Pull Request_ (veja [[1]][using-pull-requests] e
[[2]][creating-pull-requests]) neste repositório. Ou seja, um (01) membro do grupo deve:

1. Fazer um _fork_ deste repositório e dar permissão de escrita (commit/push) para todos os membros do grupo;
   - Clicar no botão _fork_ e, depois, clicar no **Settings**
1. Criar um _branch_ com nome 'ano/semestre' (e.g., `2018/02`);
   ```
   git branch 2018/02
   ```
   ou então (eu gosto mais, porque cria o _branch_ e já muda pra ele):
   ```
   git checkout -b 2018/02
   ```
1. Criar, **dentro da pasta `/apis`**, uma pasta com o nome da sua API de escolha (**nome em minúsculo,
   sem acentos, trocando espaços por de hífens e sem o prefixo ou sufixo API** - _e.g._, `/apis/drag-and-drop/`) e colocar
   seu código lá. Deve haver uma pasta dessa para cada API que você escolheu
1. Alterar o arquivo `apis.json` (na raiz) colocando as metainformações sobre cada API
   que o grupo escolheu (**sem remover a que está lá**). Você deve ver o exemplo
   da API de drag'n'drop e fazer da mesma forma:
   ```json
   {
     "semestre": "2018/01",
     "apis": [
       {
         "nome": "Drag and Drop API",
         "breveDescricao": "Possibilita o arraste de elementos HTML em cima de outros",
         "paginaInicial": "apis/drag-and-drop/",
         "screenshot": "apis/drag-and-drop/images/screenshot.png",
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
           "edge": true,
           "opera": true
         }
       },
       {
         "nome": "MINHA API",
         "breveDescricao": "MINHA DESCRIÇÃO... etc."
       }
     ]
   }
   ```
  - Não se esqueça de colocar uma vírgula entre o objeto que representa a API
    "Drag and Drop" e o objeto que você vai criar para representar a sua(s)
    API(s)

Os membros de um mesmo grupo devem trabalhar no _fork_ criado por apenas 1 integrante, ou
seja, aquele que criou o _fork_ deve dar permissão de escrita ao(s) outro(s).

Veja o projeto de exemplo que já está lá, sobre a API de _drag and drop_:
[código fonte][drag-and-drop-code] e o [exemplo publicado][drag-and-drop-live]. Procure
seguir a mesma ideia e formato (bonitão, criativão).

### O que deve conter

Seu código deve conter uma ilustração simples, porém interessante, de uso **de cada API
escolhida**. Procure separar os arquivos do código fonte em pastas
(_e.g._, `styles`, `scripts`, `images` etc.).

No diretório raiz de cada exemplo (_e.g._, `/apis/drag-and-drop/`) deve haver um arquivo
`index.html` com a página inicial (e provavelmente a única), que será a "porta de entrada"
do exemplo.

Além disso, crie um arquivo `README.md` (formato Markdown - veja [[3]][markdown] e
[[4]][markdown-tutorial]) para cada API escolhida contendo pelo menos três seções (a exemplo
[README.md da API de drag and drop][drag-and-drop-readme]):

1. API xyz
   - Breve descrição da API (uma linha)
   - **Uma _screenshot_ do seu exemplo rodando**
1. Links do Exemplo
   - **Link para seus _slides_ do seminário**
   - **Link para exemplo vivo** (formato: https://fegemo.github.io/cefet-web-weblot/apis/PASTA_DO_SEU_PROJETO/)
1. Créditos
   - **Indicação de quem são os autores**
   - Texto dando a devida atribuição aos eventuais recursos de terceiros usados (imagens, música, código fonte etc.)

## Enviando

Como mencionado, o envio será via um _pull request_. Assim que você der o último `git push` para o seu _fork_,
vá para a página do _fork_ no Github e clique em "Pull Request":

![](https://i.imgur.com/Wb4k4Fb.png)

Nessa tela, você deve escolher o seu _branch_ (`ano/semestre`) como origem e o _branch_ (`ano/semestre`) do repositório original como destino (e não o `master`).


[enunciado]: https://github.com/fegemo/cefet-web/blob/master/assignments/seminar-html5/README.md#seminário---apis-do-html5
[using-pull-requests]: https://help.github.com/articles/using-pull-requests/
[creating-pull-requests]: https://help.github.com/articles/creating-a-pull-request/
[markdown]: https://daringfireball.net/projects/markdown/
[markdown-tutorial]: https://guides.github.com/features/mastering-markdown/
[drag-and-drop-code]: https://github.com/fegemo/cefet-web-weblot/tree/master/apis/drag-and-drop/
[drag-and-drop-live]: https://fegemo.github.io/cefet-web-weblot/apis/drag-and-drop/
[drag-and-drop-readme]: https://github.com/fegemo/cefet-web-weblot/blob/master/apis/drag-and-drop/README.md
