const getRandomDoguinhoImageAsync = async () => {
  const response = await window.fetch('https://dog.ceo/api/breeds/image/random');
  const { message } = await response.json();
  return message;
}

const updateDoguinhoImage = async () => { 
  const url = await getRandomDoguinhoImageAsync();

  let doguinhoImage = document.getElementById("doguinho");
  doguinhoImage.src = url;
}

document.getElementById('change-button').addEventListener('click', async (ev) => {
  await updateDoguinhoImage();
});

document.getElementById('share-button').addEventListener('click', async (ev) => {
  let doguinhoImage = document.getElementById("doguinho");
  console.log(doguinhoImage.src);

  if (navigator.share) {
    navigator.share({
      title: 'Download doguinho image',
      url: doguinhoImage.src
    }).then(() => {
      console.log('Thanks for sharing!');
    })
    .catch(console.error);
  } else {
    alert('Seu navegador não suporta esse tipo de compartilhamento! :(');
  }
});



updateDoguinhoImage();


