const imgElement = document.querySelector('#job-image');
const radioButtons = document.querySelectorAll('input[type="radio"][name="chosen-job"]');
const growUpButton = document.querySelector('#grow-up-button');

function getImgSource(job) {
  switch (job) {
    case 'astronaut':
      return `img/${job}.jpg`;
    case 'painter':
      return `img/${job}.png`;
    case 'teacher':
    case 'dancer':
    case 'player':
    case 'medic':
    case 'magician':
      return `img/${job}.jpeg`;
    default:
      break;
  }
}

for (button of radioButtons) {
  button.addEventListener('change', () => {
    console.log("teste");
    const checkedButton = document.querySelector('input[type="radio"]:checked');
    const job = checkedButton.value;
    const imgNewSrc = getImgSource(job);
    imgElement.src = imgNewSrc;
  });
}

growUpButton.addEventListener('click', () => {
  imgElement.webkitRequestFullscreen();
})