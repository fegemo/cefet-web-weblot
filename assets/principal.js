// import inicializaGaleria from './galeria.js';
import { observer } from './galeria.js';
import html from './templating.js';
import MusicPlayer from './player.js';
import { geradorComparadorPropriedade, insereOrdenado } from './ordenacao.js';

const galeriaEl = document.querySelector('main #galeria');
const placeholderTemplateEl = document.querySelector('#placeholder-template');
const progressoEl = document.querySelector('#progresso-carregamento');
const progresso = {
  imagensBaixadas: 0,
  totalImagens: null,
  get valor() {
    return Math.ceil(this.imagensBaixadas / this.totalImagens * 100);
  },
  finaliza() {
    progressoEl.classList.add('oculta')
  }
};

function notificaImagemBaixada() {
  progresso.imagensBaixadas++;
  progressoEl.value = progresso.valor;
  progressoEl.style.setProperty('--value', progresso.valor + '%');
}

function adicionaItemGaleria(yearSemester, apiInfo) {
  const tema = apiInfo.usarTemaEscuro ? 'dark' : '';

  const novoElemento = html`
      <div class="middle" style="background-color: rgb(${apiInfo.corMedia})">
        <a href="${apiInfo.paginaInicial}" target="_blank" id="${apiInfo.slug}" aria-label="Imagem do exemplo sobre ${apiInfo.nome}" rel="noopener">
          <img>
        </a>
      </div>
      <div class="title ${tema}" style="background-color: rgba(${apiInfo.corMedia}, 0.75)">
        <div class="content">
          <h2>${apiInfo.nome}</h2>
          <p>${apiInfo.breveDescricao}</p>
          <nav>
            <i class="fa fa-file-text"></i> <a href="${apiInfo.paginaInicial}" target="_blank" rel="noopener">Demonstração</a>
            <i class="fa fa-code"></i> <a href="https://github.com/fegemo/cefet-web-weblot/tree/${yearSemester}/${apiInfo.paginaInicial}" target="_blank" rel="noopener">Código</a>
          </nav>
          <div class="authors">
            <h3>Autores:</h3>
            <ul>
              ${apiInfo.desenvolvedores.map(dev => html`
                <li>
                  <i class="fa fa-github-alt" aria-hidden="true"></i>
                  <a href="https://github.com/$${dev.usuarioGithub}" rel="noopener">$${dev.usuarioGithub}</a>
                  <span class="author-name">$${dev.nome}</span>
                </li>
              `)}
            </ul>
          </div>
        </div>
      </div>

      <div class="tiles" style="background-color: rgba(${apiInfo.corMedia}, 0.75)">
        <picture data-browser-name="Chrome" data-supported="${apiInfo.suporteDeNavegadores.chrome ? '👍' : '👎'}" class="browser ${apiInfo.suporteDeNavegadores.chrome ? 'supported' : ''}">
          <img src="assets/icons/chrome.webp" alt="Ícone do navegador Google Chrome">
        </picture>
        <picture data-browser-name="Firefox" data-supported="${apiInfo.suporteDeNavegadores.firefox ? '👍' : '👎'}" class="browser ${apiInfo.suporteDeNavegadores.firefox ? 'supported' : ''}">
          <img src="assets/icons/firefox.webp" alt="Ícone do navegador Firefox">
        </picture>
        <picture data-browser-name="Edge" data-supported="${apiInfo.suporteDeNavegadores.edge ? '👍' : '👎'}" class="browser ${apiInfo.suporteDeNavegadores.edge ? 'supported' : ''}">
          <img src="assets/icons/edge.webp" alt="Ícone do navegador Edge">
        </picture>
        <picture data-browser-name="IE" data-supported="${apiInfo.suporteDeNavegadores.edge ? '👍' : '👎'}" class="browser ${apiInfo.suporteDeNavegadores.ie ? 'supported' : ''}">
          <img src="assets/icons/ie.webp" alt="Ícone do navegador Internet Explorer">
        </picture>
        <picture data-browser-name="Safari" data-supported="${apiInfo.suporteDeNavegadores.safari ? '👍' : '👎'}" class="browser ${apiInfo.suporteDeNavegadores.safari ? 'supported' : ''}">
          <img src="assets/icons/safari.webp" alt="Ícone do navegador Safari">
        </picture>
        <picture data-browser-name="Opera" data-supported="${apiInfo.suporteDeNavegadores.opera ? '👍' : '👎'}" class="browser ${apiInfo.suporteDeNavegadores.opera ? 'supported' : ''}">
          <img src="assets/icons/opera.webp" alt="Ícone do navegador Opera">
        </picture>
      </div>`

  const itemEl = galeriaEl.querySelector(`[data-slug="${apiInfo.slug}"]`)
  itemEl.innerHTML = novoElemento
  itemEl.classList.remove('placeholder')
  itemEl.querySelector(`#${apiInfo.slug}`).replaceChild(apiInfo.elementoImagem, galeriaEl.querySelector(`#${apiInfo.slug} img`))
  observer.observe(itemEl)
}

function adicionaPlaceholder(api, i) {
  const placeholderEl = placeholderTemplateEl.content.firstElementChild.cloneNode(true)
  const insertedEl = galeriaEl.insertBefore(placeholderEl, i >= galeriaEl.children.length ? null : galeriaEl.children[i])
  insertedEl.dataset.slug = api.slug
}

function atualizaSemestre(resultado) {
  const semestreEls = document.querySelectorAll('.semestre');
  semestreEls.forEach(el => el.innerHTML = resultado.semestre);
}

function mostraErro(erro) {
  galeriaEl.classList.add('errored');
  galeriaEl.innerHTML = `Deu erro!! Descrição: <pre>${erro}</pre>`;
  console.error(erro);
}

function processaImagem(imagem) {
  progresso.totalImagens++
  const imagemForaDaTelaEl = document.createElement('img')
  imagemForaDaTelaEl.alt = imagem.textoAlternativo
  const promessaImagem = new Promise((resolver, rejeitar) => {
    imagemForaDaTelaEl.onload = () => {
      // determina qual é a "cor média" da imagem de exemplo da API
      const corMedia = ps.color.getImageAverageColor(imagemForaDaTelaEl).toStringRgb();
      // dada a cor média que foi encontrada, verifica se deve aplicar um "tema"
      // escuro, caso a cor média seja mais clara (para dar contraste)
      // para tanto, levamos a cor média do espaço RGB para HSI, e olhamos
      // para I (intensidade) pra ver se está mais para claro (>0.5) ou escuro
      // (<0.5)
      const usarTemaEscuro = toHSI(corMedia.split(','))[2] > 0.5;
  
      // atualiza o progresso porque esta imagem foi baixada (promessa cumprida)
      notificaImagemBaixada();
  
      resolver({
        elementoImagem: imagemForaDaTelaEl,
        corMedia,
        usarTemaEscuro
      })
    }
  })
  
  imagemForaDaTelaEl.src = imagem.caminho
  return promessaImagem
}

async function processaApi(exemplos, api, semestre) {
  api.slug = api.nome.toLowerCase().replace(/\s+/g, '-')
  const indice = insereOrdenado(exemplos.apis, api, geradorComparadorPropriedade('nome'))
  adicionaPlaceholder(api, indice)
  
  const informacoesImagem = await processaImagem(api.screenshot)
  api = {...api, ...informacoesImagem}

  adicionaItemGaleria(semestre, api)
}

async function processaPasta(exemplos, pasta, semestre) {
  const caminhoArquivoApis = `apis/${pasta}/apis.json`
  const promessasApis = []
  try {
    const resposta = await fetch(caminhoArquivoApis)
    if (!resposta.ok) throw new Error(resposta.statusText)
    const resultado = await resposta.json()
  
    for (const api of resultado) {
      try {
        const promessa = processaApi(exemplos, api, semestre)
        promessasApis.push(promessa)
      } catch (erro) {
        console.error(`Não foi possível processar a API ${api} da pasta ${caminhoArquivoApis}.`, erro)
      }
    }

  } catch (erro) {
    console.error(`Não foi possível carregar ${caminhoArquivoApis}.`, erro)
  } finally {
    return Promise.all(promessasApis);
  }
}

const audioPlayerEl = document.querySelector('#audio .player');
new MusicPlayer(audioPlayerEl, 'assets/tema.mp3', 'A Lenda do Herói', 'Castro Brothers');


try {
  // 1. pega examples.json, que tem pastas = [...]
  // 2. cada pasta
  //   2.1 pega apis.json
  //   2.2 para cada api
  //     2.2.1 modifica examples.apis para inserir em ordem alfabética
  //     2.2.2 onload da imagem para pegar detalhes
  //     2.2.3 adiciona item na galeria
  const resposta = await fetch('examples.json');
  if (!resposta.ok) throw new Error(resposta.statusText)
  const exemplos = await resposta.json();
  
  atualizaSemestre(exemplos);

  progresso.totalImagens = 0
  galeriaEl.innerHTML = ''
  exemplos.apis = []
  const promessas = []
  for (const pasta of exemplos.pastas) {
    try {
      const promessaPasta = processaPasta(exemplos, pasta, exemplos.semestre)
      promessas.push(promessaPasta)
    } catch(erro) {
      console.error(`Não foi possível carregar a pasta '${pasta}.`, erro);
    }
  }
  await Promise.allSettled(promessas)
  progresso.finaliza()
  
} catch(erro) {
  mostraErro(erro);
}
