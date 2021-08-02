/*API
navigator.onLine
navigator.onLine é uma propriedade que mantém um valor 
verdadeiro / falso (verdadeiro para online, falso para offline).*/


//função boolean que manipula o DOM dinamicamente para ajustar ao status de conexão
function hasNetwork(online) {
  const element = document.querySelector(".status");
  if(online) {
    element.classList.remove("offline");
    element.classList.add("online");
    element.innerText = "📳 Online :)";
  } else {
    element.classList.remove("online");
    element.classList.add("offline");
    element.innerText = "📴 Offline :(";
  }
}

//verifica inicialmente se o estado do usuário é 'online'

/* pode ser ótima se eles inicializarem seu aplicativo e 
puderem ser informados de que seu conteúdo pode estar desatualizado.*/

window.addEventListener("load", () => {
  hasNetwork(navigator.onLine);
});

window.addEventListener("load", () => {
  hasNetwork(navigator.onLine);

  window.addEventListener("online", () => {
    hasNetwork(true);
  });
  window.addEventListener("offline", () => {
    hasNetwork(false);
  });
});

/*Então, quando usar isso?
Talvez você precise dizer a um usuário que ele não
pode carregar um arquivo porque está offline, os dados ao 
vivo que estão vendo podem não estar mais atualizados porque 
estão offline ou algo assim.*/