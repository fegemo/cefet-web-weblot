const getRandomDoguinhoImageAsync = async () => {
  const response = await window.fetch('https://dog.ceo/api/breeds/image/random');
  const { message } = await response.json();
  return message;
}

const updateDoguinhoImage = async () => { 
  const url = await getRandomDoguinhoImageAsync();

  let doguinhoImage = document.getElementById("doguinho");
  doguinhoImage.src = url;

  let loader = document.getElementById("loader");
  loader.style.display = 'none';

  doguinhoImage.style.display = 'block';
}

document.getElementById('change-button').addEventListener('click', async (ev) => {
  let loader = document.getElementById("loader");
  loader.style.display = 'block';

  let doguinhoImage = document.getElementById("doguinho");
  doguinhoImage.style.display = 'none';

  await updateDoguinhoImage();
});

document.getElementById('share-button').addEventListener('click', async (ev) => {
  let doguinhoImage = document.getElementById("doguinho");
  console.log(doguinhoImage.src);

  if (navigator.share) {
    navigator.share({
      title: 'favorite-doguinho',
      url: doguinhoImage.src
    }).then(() => {
      console.log('Thanks for downloading!');
    })
    .catch(console.error);
  } else {
    alert('Seu navegador não suporta esse tipo de compartilhamento! :(');
  }
});



updateDoguinhoImage();


