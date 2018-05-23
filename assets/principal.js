import inicializaGaleria from './galeria.js';
import html from './templating.js';
import MusicPlayer from './player.js';

const galleryEl = document.querySelector('main');


function preparaImagens(resultado) {
  const imagens = resultado.apis.map(api => api.screenshot);
  const promessas = imagens.map(imagem => new Promise((resolver, rejeitar) => {
    const imagemForaDaTelaEl = document.createElement('img');
    imagemForaDaTelaEl.onload = () => {
      const corMedia = ps.color.getImageAverageColor(imagemForaDaTelaEl).toStringRgb();
      resolver({
        imagem,
        corMedia
      });
    };
    imagemForaDaTelaEl.src = imagem;
  }));


  const promessaComImagensPreparadas = Promise.all(promessas)
    .then(imagensComCores => {
      resultado.apis = resultado.apis.map(api => {
        const estaImagemNoArrayComputado = imagensComCores.find(imgComCor => imgComCor.imagem === api.screenshot);
        api.corMedia = estaImagemNoArrayComputado.corMedia
        return api;
      });

      return Promise.resolve(resultado);
    });

  return promessaComImagensPreparadas;
}

function adicionaItemGaleria(apiInfo, i) {
  const par = i % 2 === 0;
  const novoElemento = html`
    <section class="section">
      <div class="middle">
        <a href="${apiInfo.paginaInicial}" target="_blank">
          <img src="${apiInfo.screenshot}">
        </a>
      </div>
      <div class="${par ? 'right' : 'left'} title" style="background-color: rgba(${apiInfo.corMedia}, 0.75)">
        <div class="content">
          <h2>${apiInfo.nome}</h2>
          <p>${apiInfo.breveDescricao}</p>
          <p>Demo: <a href="${apiInfo.paginaInicial}" target="_blank">${apiInfo.paginaInicial}</a></p>
          <div class="authors">
            <h3>Autores:</h3>
            <dl>
              ${apiInfo.desenvolvedores.map(dev => html`
                <dt>
                  <i class="fa fa-github-alt" aria-hidden="true"></i>
                  @<a href="https://github.com/$${dev.usuarioGithub}">$${dev.usuarioGithub}</a></dt>
                <dd>$${dev.nome}</dd>
              `)}
            </dl>
          </div>
        </div>
      </div>

      <div class="${par ? 'left' : 'right'} tiles"  style="background-color: rgba(${apiInfo.corMedia}, 0.75)">
        <picture data-browser-name="Google Chrome" data-supported="${apiInfo.suporteDeNavegadores.chrome ? '👍' : '👎'}" class="browser ${apiInfo.suporteDeNavegadores.chrome ? 'supported' : ''}">
          <img src="assets/icons/chrome.png">
        </picture>
        <picture data-browser-name="Mozilla Firefox" data-supported="${apiInfo.suporteDeNavegadores.firefox ? '👍' : '👎'}" class="browser ${apiInfo.suporteDeNavegadores.firefox ? 'supported' : ''}">
          <img src="assets/icons/firefox.png">
        </picture>
        <picture data-browser-name="Edge" data-supported="${apiInfo.suporteDeNavegadores.edge ? '👍' : '👎'}" class="browser ${apiInfo.suporteDeNavegadores.edge ? 'supported' : ''}">
          <img src="assets/icons/edge.png">
        </picture>
        <picture data-browser-name="Safari" data-supported="${apiInfo.suporteDeNavegadores.safari ? '👍' : '👎'}" class="browser ${apiInfo.suporteDeNavegadores.safari ? 'supported' : ''}">
          <img src="assets/icons/safari.png">
        </picture>
      </div>
    </section>`;

  galleryEl.innerHTML += novoElemento;
}

function preparaHTML(resultado) {
  const apis = resultado.apis;

  galleryEl.innerHTML = '';
  apis.forEach(adicionaItemGaleria);

}

fetch('apis.json')
  .then((resultado) => resultado.json())
  .then(preparaImagens)
  .then(preparaHTML)
  .then(inicializaGaleria);

const audioPlayerEl = document.querySelector('#audio .player');
new MusicPlayer(audioPlayerEl, 'assets/tema.mp3', 'A Lenda do Herói', 'Castro Brothers');
