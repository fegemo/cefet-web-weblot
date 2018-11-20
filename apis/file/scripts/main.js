document.getElementById('input-file').addEventListener('change', loadFile);

function loadFile(event) {
    const input = event.target
  if ('files' in input && input.files.length > 0) {
	  placeFileContent(document.getElementById('file-content'), input.files[0])
  }
}
function placeFileContent(target, file) {
    const reader = new FileReader();
    reader.onload = event => target.value = event.target.result;
    reader.readAsText(file);
}
