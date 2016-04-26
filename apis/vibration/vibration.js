
window.navigator = window.navigator || {};
if (navigator.vibrate === undefined) {
    document.getElementById('v-unsupported').classList.remove('hidden');
    ['button1', 'button2', 'button3'].forEach(function(elementId) {
      document.getElementById(elementId).setAttribute('disabled', 'disabled');
    });
} else {
    document.getElementById("button1").addEventListener('click', function() {
      navigator.vibrate(1000);
    });
    document.getElementById("button2").addEventListener('click', function() {
      navigator.vibrate([1000, 500, 1000, 500, 2000]);
    });
    document.getElementById("button3").addEventListener('click', function() {
      navigator.vibrate(0);
    });
}
