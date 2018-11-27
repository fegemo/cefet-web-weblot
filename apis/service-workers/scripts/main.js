const SWSample = {
  log: function() {
    let line = Array.prototype.slice.call(arguments).map(function(argument) {
      return typeof argument === 'string' ? argument : JSON.stringify(argument);
    }).join(' ');

    document.querySelector('#log').textContent += line + '\n';
  },

  clearLog: function() {
    document.querySelector('#log').textContent = '';
  },

  setStatus: function(status) {
    document.querySelector('#status').innerHTML = status;
  },

  setContent: function(newContent) {
    let content = document.querySelector('#content');
    while(content.hasChildNodes()) {
      content.removeChild(content.lastChild);
    }
    content.appendChild(newContent);
  }
};

window.addEventListener('error', function(error) {
  if (SWSample && SWSample.log) {
    console.error(error);
    SWSample.log(error.message + ' (Seu navegador talvez não suporte essa funcionalidade.)');
    error.preventDefault();
  }
});

window.addEventListener('load', function() {
  function statusChange() {
      let statusStore =
        navigator.onLine ? 'Você está <strong>ONLINE</strong>' : 'Você está <strong>OFFLINE</strong>';
      let color = navigator.onLine ? 'green' : 'red';

      SWSample.setStatus(statusStore);
      let strongArr = document.getElementsByTagName('strong');
      for (let strongEl of strongArr) {
        strongEl.style.textShadow = '1px 1px 1px ' + color;
        strongEl.style.color = color;
      }
  }
  statusChange();
  window.addEventListener('online',  statusChange);
  window.addEventListener('offline', statusChange);
});

const imgs = [
  'axe.png',
  'bow.png',
  'crossbow.png',
  'cub.png',
  'flag1.png',
  'flag2.png',
  'hammer.png',
  'helmet.png',
  'mace.png',
  'shield1.png',
  'shield2.png',
  'spear.png',
  'sword1.png',
  'sword2.png',
  'torch.png'
]

const items = imgs.map((item) => {
  return 'images/' + item;
})

let cached = false;

const chest = document.querySelector('#chest');

chest.addEventListener('click', () => {
  chest.classList.add('animate');

  setTimeout(() => {
    chest.classList.remove('animate')
    let imgElement = document.createElement('img');
    imgElement.src = items[Math.ceil(Math.random() * items.length) - 1];
    document.querySelector('#container').appendChild(imgElement);
  }, 800);
});

function clearContents(contentsElement) {
  // Clear out the existing items from the list.
  while (contentsElement.firstChild) {
    contentsElement.removeChild(contentsElement.firstChild);
  }
}

function addToCache(url) {
  sendMessage({
    command: 'add',
    url: url
  }).then(function() {
    // If the promise resolves, just display a success message.
    SWSample.log(`'${url}' adicionado ao cache.`);
  }).catch(SWSample.log); // If the promise rejects, show the error.
}

function showCommands() {
  document.querySelector('#add').addEventListener('click', function() {
    let url = document.querySelector('#url').value;

    addToCache(url);
  });

  document.querySelector('#delete').addEventListener('click', function() {
    let url = document.querySelector('#url').value;

    sendMessage({
      command: 'delete',
      url: url
    }).then(function() {
      // If the promise resolves, just display a success message.
      SWSample.log(`${url} removido do cache.`);
    }).catch(SWSample.log); // If the promise rejects, show the error.
  });

  const botaoList = document.querySelector('#listcontents');
  botaoList.addEventListener('click', function() {
    let contentsElement = document.querySelector('#contents');

    if (botaoList.textContent != 'Mostrar Cache') {
      botaoList.textContent = 'Mostrar Cache';
      clearContents(contentsElement);
      return;
    }

    sendMessage({command: 'keys'})
      .then(function(data) {
        clearContents(contentsElement);

        // Add each cached URL to the list, one by one.
        data.urls.forEach(function(url) {
          let liElement = document.createElement('li');
          liElement.textContent = url;
          contentsElement.appendChild(liElement);
        });
        
        botaoList.textContent = 'Esconder Cache';
      })//.catch(SWSample.log); // If the promise rejects, show the error.
  });

  document.querySelector('#commands').style.display = 'block';
}

function sendMessage(message) {
  // This wraps the message posting/response in a promise, which will resolve if the response doesn't
  // contain an error, and reject with the error if it does. If you'd prefer, it's possible to call
  // controller.postMessage() and set up the onmessage handler independently of a promise, but this is
  // a convenient wrapper.
  return new Promise(function(resolve, reject) {
    let messageChannel = new MessageChannel();
    messageChannel.port1.onmessage = function(event) {
      if (event.data.error) {
        reject(event.data.error);
      } else {
        resolve(event.data);
      }
    };

    // This sends the message data as well as transferring messageChannel.port2 to the service worker.
    // The service worker can then use the transferred port to reply via postMessage(), which
    // will in turn trigger the onmessage handler on messageChannel.port1.
    // See https://html.spec.whatwg.org/multipage/workers.html#dom-worker-postmessage
    navigator.serviceWorker.controller.postMessage(message,
      [messageChannel.port2]);
  });
}

if ('serviceWorker' in navigator) {
  // Set up a listener for messages posted from the service worker.
  // The service worker is set to post a message to all its clients once it's run its activation
  // handler and taken control of the page, so you should see this message event fire once.
  // You can force it to fire again by visiting this page in an Incognito window.
  navigator.serviceWorker.addEventListener('message', function(event) {
    SWSample.log(event.data);
    if (!cached) {
      //Realiza o pre-cache de todas as imagens.
      items.forEach((img) => {
        addToCache(img);
      });
      cached = true;
    }
  });

  navigator.serviceWorker.register('service-worker.js')
    // Wait until the service worker is active.
    .then(function() {
      return navigator.serviceWorker.ready;
    })
    // ...and then show the interface for the commands once it's ready.
    .then(showCommands)
    .catch(function(error) {
      // Something went wrong during registration. The service-worker.js file
      // might be unavailable or contain a syntax error.
      SWSample.log(error);
    });
} else {
  SWSample.log('Esse navegador não suporta service workers.');
}
