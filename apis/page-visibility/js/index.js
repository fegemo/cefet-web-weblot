let hidden, visibilityChange; 
if (typeof document.hidden != "undefined") { 
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