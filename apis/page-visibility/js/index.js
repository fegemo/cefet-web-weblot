let hidden, visibilityChange; 
if (typeof document.hidden != "undefined") { // Suporte para Opera 12.10 e Firefox 18 em diante 
  hidden = "hidden";
  visibilityChange = "visibilitychange";
}

let audioElement = document.getElementById("audioElement");
audioElement.play();

function handleVisibilityChange() {
  if (document[hidden]) {
    audioElement.pause();
  } else {
    audioElement.play();
  }
}

if (typeof document.addEventListener == "undefined" || 
  typeof document[hidden] == "undefined") {
  alert("O navegador não tem suporte ao 'Page Visibility API'.");
} else {
  document.addEventListener(visibilityChange, handleVisibilityChange, false);
}