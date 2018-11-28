window.addEventListener('load', function() {
  function statusChange() {
      let statusNav =
        navigator.onLine ? 'ONLINE' : 'OFFLINE';
      let color = navigator.onLine ? 'green' : 'red';
      let strongEl = document.getElementById('status');
      strongEl.innerHTML = statusNav
      strongEl.style.textShadow = '1px 1px 1px ' + color;
      strongEl.style.color = color;

      let divEl = document.getElementById('chest');
      if (navigator.onLine)
        divEl.classList.add('open')
      else
        divEl.classList.remove('open')
  }
  statusChange();
  window.addEventListener('online',  statusChange);
  window.addEventListener('offline', statusChange);
});