(() => {
    // Elemento customizado que extende o elemento div do html 
    class CardElement extends HTMLDivElement {
        constructor() {
            super();
        }

        connectedCallback() {
            this.id = 'card_element';

            const img = document.createElement('img');
            img.src = this.hasAttribute('card-image') ? this.getAttribute('card-image') : './images/default.jpg';

            // Container do conteúdo textual do card
            const content = document.createElement('div');
            content.id = 'content';
            
            const title = document.createElement('p');
            title.id = 'title';
            title.innerText = this.hasAttribute('card-title') ? this.getAttribute('card-title') : 'Titulo';
    
            const description = document.createElement('p');
            description.id = 'description';
            description.innerText = this.hasAttribute('card-description') ? this.getAttribute('card-description') : 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis nec dui id tortor commodo interdum.';

            // Adicionando elementos ao div de conteúdo
            content.appendChild(title);
            content.appendChild(description);

            // Adicionando elementos ao novo elemento customizado
            this.appendChild(img);
            this.appendChild(content);

            // Adicionando estilo
            const style = document.createElement('style');
            style.textContent = `
            #card_element {
                display: flex;
                flex-direction: column;
                border-radius: 10px;
                box-shadow: 0 3px 10px rgb(0 0 0 / 0.2);
                gap: 10px;
                height: 200px;
                width: 250px;
              }
              
              #card_element img {
                height: 50%;
                object-fit: cover;
                width: 100%;
                border-radius: 10px 10px 0 0;
              }
              
              #card_element #content {
                margin: 0 15px;
                display: flex;
                flex-direction: column;
                height: 50%;
                gap: 5px;
                overflow: none;
              }
              
              #card_element #title {
                  margin: 0;
                  padding: 0;
                  font-size: 16px;
                  font-weight: bold;
              }
              
              #card_element #description {
                  margin: 0;
                  padding: 0;
                  font-size: 12px;
                  height: 60%;
                  overflow: hidden;
                  text-overflow: ellipsis;
                  text-align: justify;
              }
            `;

            this.appendChild(style);
        }
    
    }
    
    customElements.define('card-element', CardElement, { extends: "div" });
})();
