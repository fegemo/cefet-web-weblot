function navSection() {
    let ativo = document.querySelector('a.active');
    ativo.classList.remove('active');
    ativo = document.getElementById(ativo.dataset.section);
    ativo.classList.remove('active');
    event.target.classList.add('active');
    document.getElementById(event.target.dataset.section).classList.add('active');
}

let nav = document.querySelectorAll('#navbar a');
for (let a of nav) {
    a.addEventListener('click', navSection);
}

let introTextEl = document.querySelector('.flow > pre');
// atribui um evento de clique à <nav id="movies"></nav>
document.querySelector('#movies').addEventListener('click', function (e) {
// queremos apenas cliques cujo alvo foram <li></li>
    if (e.currentTarget.matches('li')) {
// remove a classe ".reading-animation", que faz o texto subir
        introTextEl.classList.remove('reading-animation');
        // define a propriedade visibility como hidden para evitar que o usuário
        // veja a animação sendo interrompida
        introTextEl.style.visibility = 'hidden';
        // daqui 0ms (no próximo "tick" de atualização), devolver a classe
        // ".reading-animation" e tornar o texto visível novamente
        setTimeout(function () {
            introTextEl.classList.add('reading-animation');
            introTextEl.style.visibility = 'visible';
        }, 0);
    }
});
let movies = document.querySelector('#movies ul');
let url = 'https://swapi.co/api/films';
const guide = [[4, 'I'], [5, 'II'], [6, 'III'], [1, 'IV'], [2, 'V'], [3, 'VI'], [7, 'VII']];
let aux = '';
for (let i = 0; i < guide.length; i++) {
    aux += '<li data-episode-url=' + url + '/' + guide[i][0] + '/>Episode ' + guide[i][1] + '</li>';
}
movies.innerHTML = aux;
let episodes = document.querySelectorAll('#movies li');
for (let episode of episodes) {
    episode.addEventListener('click', texto);
}

function texto() {
    introTextEl.classList.remove('reading-animation');
    introTextEl.style.visibility = 'hidden';
    setTimeout(function () {
        introTextEl.classList.add('reading-animation');
        introTextEl.style.visibility = 'visible';
    }, 0);
    fetch(this.getAttribute('data-episode-url'), {method: 'get'}).then(function (resposta) {
        resposta.text().then(function (result) {
            result = JSON.parse(result);
            document.querySelector('.reading-animation').innerHTML =
                    'Episode ' + guide[Number(result.episode_id) - 1][1] + '\n'
                    + result.title + '\n\n' + result.opening_crawl;
        })
    }).catch(function (err) {
        console.error(err);
    });
}

// find template and compile it

let templateSource = document.getElementById('results-template').innerHTML,
        template = Handlebars.compile(templateSource),
        resultsPlaceholder = document.getElementById('results'),
        playingCssClass = 'playing',
        audioObject = null;
let fetchTracks = function (albumId, callback) {
    fetch('https://api.spotify.com/v1/albums/' + albumId).then(function (resposta) {
        resposta.text().then(function (response) {
            response = JSON.parse(response);
            callback(response);
        })}).catch(function (err) {
        console.error(err);
    });
};

let searchAlbums = function (query) {
    fetch('https://api.spotify.com/v1/search?q=' + query + '&type=album')
            .then(function (resposta) {
                resposta.text().then(function (response) {
                    response = JSON.parse(response);
                    resultsPlaceholder.innerHTML = template(response);
                })}).catch(function (err) {
        console.error(err);
    });
}

    results.addEventListener('click', function (e) {
        var target = e.target;
        if (target !== null && target.classList.contains('cover')) {
            if (target.classList.contains(playingCssClass)) {
                audioObject.pause();
            } else {
                if (audioObject) {
                    audioObject.pause();
                }
                fetchTracks(target.getAttribute('data-album-id'), function (data) {
                    audioObject = new Audio(data.tracks.items[0].preview_url);
                    audioObject.play();
                    target.classList.add(playingCssClass);
                    audioObject.addEventListener('ended', function () {
                        target.classList.remove(playingCssClass);
                    });
                    audioObject.addEventListener('pause', function () {
                        target.classList.remove(playingCssClass);
                    });
                });
            }
        }
    });
    document.getElementById('search').addEventListener('click', function (e) {
        e.preventDefault();
        searchAlbums(document.getElementById('query').value);
    }, false);
