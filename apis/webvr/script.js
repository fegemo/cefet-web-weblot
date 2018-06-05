window.addEventListener('keydown',e => handleKey(e.keyCode));
const camera = document.querySelector("#camera")
const cameraWrapper = document.querySelector("#camera-wrapper")
function handleKey(keyCode){
	const camerarot = camera.getAttribute('rotation')
	console.log(camerarot)
    switch (keyCode) {
        case 75:  //k 
			cameraWrapper.setAttribute('rotation', {x:camerarot.x, y:-camerarot.y, z:camerarot.z })
			break;
        case 76:  //l
			cameraWrapper.setAttribute('rotation', {x:camerarot.x, y:-camerarot.y+180, z:camerarot.z })
        break;
    }
}