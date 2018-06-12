let fetchCharacter
(
    window.onload = () => {
        if(!window.fetch) {
            alert('Navegador não tem suporte a Fetch')
            return
        }
        const key = '563b7acaba30e269b2db2b9655961a95'
        fetchCharacter = async () => {
            const character = document.querySelector('#character').value
            let nameQuery = character ? `name=${character}&` : ''
            const resp = await fetch(`https://gateway.marvel.com:443/v1/public/characters?${nameQuery}ts=1&apikey=${key}&hash=f2e1443e68b8b9072cfc270f77933ba2`)
            const jsonResp = await resp.json();

            const resultsDiv = document.querySelector('#results')
            while (resultsDiv.firstChild) {
                resultsDiv.removeChild(resultsDiv.firstChild);
            }
            if(jsonResp.data.results.length == 0) {
                alert('Personagem não encontrado')
            }
            jsonResp.data.results.forEach(character => {
                const container = document.createElement('div')
                container.className = 'char-container'
                const information = document.createElement('div')
                information.className = 'info'
                const title = document.createElement('h4')
                const description = document.createElement('span')
                const img = document.createElement('img')
                
                title.innerText = character.name
                description.innerText = character.description
                img.src = `${character.thumbnail.path}.${character.thumbnail.extension}`
                
                information.appendChild(title)
                information.appendChild(description)
                container.appendChild(information)
                container.appendChild(img)
                resultsDiv.appendChild(container)
                resultsDiv.style.display = 'block'
            })
        }
    }
)()