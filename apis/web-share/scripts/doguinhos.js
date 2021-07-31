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


updateDoguinhoImage();


