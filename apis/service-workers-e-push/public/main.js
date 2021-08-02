Notification.requestPermission(function(status) {
    console.log('Notification permission status:', status);
});

function displayNotification() {
    if (Notification.permission == 'granted') {
      navigator.serviceWorker.getRegistration().then(function(reg) {
        var options = {
          body: 'Você está pronto para começar a história? Inicie a aventura! ✅',
          icon: 'images/sword.png',
          vibrate: [100, 50, 100],
          data: {
            dateOfArrival: Date.now(),
            primaryKey: 1
          },
          actions: [
            {action: 'explore', title: 'Explore this new world',
              icon: 'images/checkmark.png'},
            {action: 'close', title: 'Close notification',
              icon: 'images/xmark.png'},
          ]
        };
        reg.showNotification('Hello my friend!', options);
      });
    }
}

let subscribeButton = document.getElementById("subscribe-button");
subscribeButton.addEventListener("click", () => {
  subscribeUserToPush();
});

let notificationButton = document.getElementById("notification-button");
notificationButton.addEventListener("click", () => {
  displayNotification();
});

let pushEndpoint = "";


function subscribeUserToPush() {
  return navigator.serviceWorker.register('sw.js')
    .then(function (registration) {
      const subscribeOptions = {
        userVisibleOnly: true
      };

      return registration.pushManager.subscribe(subscribeOptions);
    })
    .then(function (pushSubscription) {
      console.log('Received PushSubscription: ', JSON.stringify(pushSubscription));
      fillEndpointURL(pushSubscription.endpoint);
      return pushSubscription;
    });

}
const introEndpoint = "Your push endpoint is:";
const urlDescription = "To test it, make a POST request to this endpoint with a TTL header:"
function fillEndpointURL(endpoint) {
  pushEndpoint = endpoint;

  introEnpointH3 = document.getElementById("intro-endpoint");
  introEnpointH3.innerHTML = introEndpoint;

  urlSpan = document.getElementById("endpoint-url");
  urlSpan.innerHTML = pushEndpoint;

  descriptionSpan = document.getElementById("url-description");
  descriptionSpan.innerHTML = urlDescription;


  requestSpan = document.getElementById("post-request");
  requestSpan.innerHTML = `curl \"${pushEndpoint}\"
  --request POST --header \"TTL: 60\" --header \"Content-Length: 0\"`;
}


