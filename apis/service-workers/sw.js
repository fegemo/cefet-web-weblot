self.addEventListener('install', function(e) {
  console.log('Installing service worker.')
});

self.addEventListener('activate', function(e) {
  console.log('Activate service worker.')
});

var messages = [];

self.addEventListener('fetch', function(e) {
  var dataUrl = 'https://api.whatdoestrumpthink.com';

  if (e.request.url.indexOf(dataUrl) > -1) {

    if (!navigator.onLine) {
      var message = 'SW says: No quote for you!';

      if (messages.length)
        message = messages[Math.floor(Math.random()*messages.length)];

      e.respondWith(
        new Response(JSON.stringify({message: message}), {
          headers: { "Content-Type" : "application/json" }
        })
      );
    }
    else {
      e.respondWith(
        fetch(e.request).then(function(response){
          
          response.clone().json().then(function(response) {
            messages.push('CACHED: ' + response.message);
          });

          return response;
        })
      )
    }
  }
  else {
    e.respondWith(
      fetch(e.request)
    );
  }

});
