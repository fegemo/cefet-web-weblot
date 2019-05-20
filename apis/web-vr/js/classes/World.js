import {SceneCreator} from "./SceneCreator.js";

const NEAR = 0.1;
const FAR = 500;
const INITIAL_ANGLE = 60;

let debugMode = false;

class World {
	constructor (){		
		this.width = window.innerWidth;
	    this.height = window.innerHeight;
	    this.aspect = this.width/this.height;

	    this.container = document.querySelector("#container");
	    this.container.innerHTML = "";		

		//set camera (viewAngle, aspectRatio, near, far)//
		this.camera = new THREE.PerspectiveCamera(60, this.aspect, NEAR, FAR);
		
		this.scene = new THREE.Scene();

		this.renderer = new THREE.WebGLRenderer({antialias: true});
		this.renderer.setSize(this.width, this.height);
    	this.container.appendChild(this.renderer.domElement);			

    	this.controls = new THREE.OrbitControls(this.camera, this.renderer.domElement);
    	this.controls.enabled = true;
    	this.controls.enableDamping = true;

		this.setScene();

		if (typeof VRFrameData === "undefined") {
			this.active = false;
			console.error("WebVR not supported");
			return;
	    }

	    this.active = true;
	    this.firstVRFrame = false;
	    
	    this.vr = {
			display: null,
			frameData: new VRFrameData()
	    };
	
		requestAnimationFrame(() => this.update());
		
		this.getDisplays();

	    window.addEventListener("vrdisplayactivate", () => this.activateVR());
	    window.addEventListener("vrdisplaydeactivate", () => this.deactivateVR());
		window.addEventListener("resize", () => this.resize());
	}

	resize(){
		this.width = window.innerWidth;
	    this.height = window.innerHeight;
	    this.aspect = this.width/this.height;

    	this.renderer.setSize(this.width, this.height);

	    if (!this.camera) { 
	      return;
	    }

	    this.camera.aspect = this.aspect;
	    this.camera.updateProjectionMatrix();
	}
	
	setScene(){	
		this.objects = [];	
    	let sceneCreator = new SceneCreator();
    	let environment = {
    		camera: this.camera,
    		scene: this.scene,
    		objects: this.objects,
    	}
    	sceneCreator.createScene(environment);
    	
    	let light = new THREE.DirectionalLight(0x002288);
		light.position.set(0, 45, 0);
		this.scene.add(light);

		light = new THREE.AmbientLight(0x222222);
		this.scene.add(light);

		this.camera.position.set(0, 5, 0);
		this.controls.update();
	}	

	getDisplays(){
		navigator.getVRDisplays().then(displays => {
			//Filter down to devices that can present.
			displays = displays.filter(display => display.capabilities.canPresent);

			//If there are no devices available, quit out.
			if (displays.length === 0) {
				console.error("No device available is able to present");
				return;
			}

			//Store the first display we find. A more production-ready version should
			//allow the user to choose from their available displays.
			this.vr.display = displays[0];
			this.vr.display.depthNear = NEAR;
			this.vr.display.depthFar = FAR;
		
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
	    this.vrButton = document.createElement("button");
	    this.vrButton.classList.add("vr-toggle");
	    this.vrButton.textContent = "Enable VR";
	    this.vrButton.addEventListener("click", () => this.toggleVR());
	    document.body.appendChild(this.vrButton);
	}

	activateVR () {	    
	    if (!this.vr.display) {
	      return;
	    }
	    this.getPresent();	
	    this.vrButton.textContent = "Disable VR";
	} 

	deactivateVR () {
	    if (!this.vr.display) {
	      return;
	    }

	    if (!this.vr.display.isPresenting) {
	      return;
	    }

	    this.vr.display.exitPresent();
	    this.vrButton.textContent = "Enable VR";	    
	}

	toggleVR () {		
	    if (this.vr.display.isPresenting) {
	      return this.deactivateVR();
	    }
    	return this.activateVR();
  	}

	update(){
		this.render();
	}

	render(){		
	    if (this.active == false || !(this.vr.display && this.vr.display.isPresenting)) {  			
		    this.resize(); //Ensure that we switch everything back to auto for non-VR mode//
		    this.renderer.autoClear = true;
		    this.scene.matrixAutoUpdate = true;

  			this.renderer.render(this.scene, this.camera);
	  		requestAnimationFrame(() => this.update());	 

	    }
	    else if (this.firstVRFrame) {
	    	this.firstVRFrame = false;
	    	this.vr.display.requestAnimationFrame(() => this.update());
	    }
	    else {  		  		
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

		    // Use the VR display's in-built rAF (which can be a diff refresh rate to
		    // the default browser one).
		    this.vr.display.requestAnimationFrame(() => this.update());

		    // Call submitFrame to ensure that the device renders the latest image from
		    // the WebGL context.
		    this.vr.display.submitFrame();		  			
		}
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

let world = new World();