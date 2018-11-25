window.addEventListener('unload', (event) => {
  if (navigator.sendBeacon) {
    navigator.sendBeacon('/log', '>>>>> Armas Para Batalha chegaram!!! <<<<<<<');
  }
});
