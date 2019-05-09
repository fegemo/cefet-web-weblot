class WebVRHandler {
	constructor(near, far){
		this.active = true;
	    if (typeof VRFrameData === 'undefined') {
			this.active = false;
			console.error('WebVR not supported');
			return;
	    }

	    this.firstVRFrame = false;
	    this.button = undefined;
	    this.vr = {
			display: null,
			frameData: new VRFrameData()
	    };

	    window.addEventListener("vrdisplayactivate", () => this.activateVR);
	    window.addEventListener("vrdisplaydeactivate", () => this.deactivateVR);

		this.getDisplays(near, far);
	}

	getDisplays(NEAR, FAR){
		navigator.getVRDisplays().then(displays => {
			//Filter down to devices that can present.
			displays = displays.filter(display => display.capabilities.canPresent);

			//If there are no devices available, quit out.
			if (displays.length === 0) {
				console.warn('No device available is able to present.');
				return;
			}

			//Store the first display we find. A more production-ready version should
			//allow the user to choose from their available displays.
			this.vr.display = displays[0];
			this.vr.display.depthNear = near;
			this.vr.display.depthFar = far;
		
			this.createPresentationButton();
		});
	}

	getPresent(){
		this.vr.display.requestPresent([{
	    	source: this.renderer.domElement
	    }])
	    .catch(e => {
	    	console.error("Unable to init VR: ${e}");
	    });
	}

	createPresentationButton () {
	    this.button = document.createElement('button');
	    this.button.classList.add('vr-toggle');
	    this.button.textContent = 'Enable VR';
	    this.button.addEventListener('click', () => this.toggleVR());
	    document.body.appendChild(this.button);
	}

	deactivateVR () {
	    if (!this.vr.display) {
	      return;
	    }

	    if (!this.vr.display.isPresenting) {
	      return;
	    }

	    this.vr.display.exitPresent();
	    return;
	}

	activateVR () {
	    if (!this.vr.display) {
	      return;
	    }
	    this.getPresent();	   
	}

	toggleVR () {
	    if (this.vr.display.isPresenting) {
	      return this.deactivateVR();
	    }
    	return this.activateVR();
  	}

  	render () {
	    if (this.active == false || !(this.vr.display && this.vr.display.isPresenting)) {
		    return false;
	    }

	    //When this is called the first time, it will be using the standard//
	    //window.requestAnimationFrame API, which will throw a warning when we call
	    //display.submitFrame. So for the first frame that this is called we will
	    //exit early and request a new frame from the VR device instead//
	    if (this.firstVRFrame) {
	    	this.firstVRFrame = false;
	    	return null;
	    }

	    const EYE_WIDTH = this.width * 0.5;
	    const EYE_HEIGHT = this.height;

	    //Get all the latest data from the VR headset and dump it into frameData//
	    this.vr.display.getFrameData(this.vr.frameData);

	    //Disable autoupdating because these values will be coming from the//
	    //frameData data directly//
	    this.scene.matrixAutoUpdate = false;

	    //Make sure not to clear the renderer automatically, because we will need//
	    //to render it ourselves twice, once for each eye//
	    this.renderer.autoClear = false;

	    //Clear the canvas manually//
	    this.renderer.clear();

	    //Left eye//
	    let leftEyeParameters = {
	    	x: 0,
			y: 0,
			w: EYE_WIDTH,
			h: EYE_HEIGHT	    	
	    }
	    this.renderEye(this.vr.frameData.leftViewMatrix, this.vr.frameData.leftProjectionMatrix, leftEyeParameters);	

    	//Ensure that left eye calcs aren't going to interfere with right eye ones//
    	this.renderer.clearDepth();

	    //Right eye//
	    let rightEyeParameters = {
	    	x: EYE_WIDTH,
			y: 0,
			w: EYE_WIDTH,
			h: EYE_HEIGHT	    	
	    }
	    this.renderEye(this.vr.frameData.rightViewMatrix, this.vr.frameData.rightProjectionMatrix, rightEyeParameters);
	    return true;
  }

  renderEye (viewMatrix, projectionMatrix, viewport) {
    // Set the left or right eye half//
    this.renderer.setViewport(viewport.x, viewport.y, viewport.w, viewport.h);

    // Update the scene and camera matrices.
    this.camera.projectionMatrix.fromArray(projectionMatrix);
    this.scene.matrix.fromArray(viewMatrix);

    // Tell the scene to update (otherwise it will ignore the change of matrix).
    this.scene.updateMatrixWorld(true);
    this.renderer.render(this.scene, this.camera);
  }

}