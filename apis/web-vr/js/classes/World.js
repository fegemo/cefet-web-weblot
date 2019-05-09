const NEAR = 0.1;
const FAR = 1000;
const INITIAL_ANGLE = 60;


class World {
	constructor (){		
		this.width = window.innerWidth;
	    this.height = window.innerHeight;
	    this.aspect = this.width/this.height;

		this.scene = new THREE.Scene();

		//set camera (viewAngle, aspectRatio, near, far)//
		this.camera = new THREE.PerspectiveCamera(60, this.aspect, NEAR, FAR);

		this.renderer = new THREE.WebGLRenderer();
		this.renderer.setSize(this.width, this.height);
		document.body.appendChild(this.renderer.domElement);	

		this.setSceneObjects();

		this.vrhandler = new WebVRHandler(NEAR, FAR);

		requestAnimationFrame(() => this.update());

		window.addEventListener('resize', () => this.resize);
	}

	resize(){
		this.width = window.innerWidth;
	    this.height = window.innerHeight;
	    this.aspect = this.width/this.height;

    	this.renderer.setSize(this._width, this._height);

	    if (!this.camera) { 
	      return;
	    }

	    this.camera.aspect = this.aspect;
	    this.camera.updateProjectionMatrix();
	}

	update(){
		//rotacionando o cubo//
		this.objects[0].rotation.x += 0.01;
		this.objects[0].rotation.y += 0.01;

		this.render();
		
	}

	render(){
		let status = this.vrhandler.render();
  		 
  		if (status == true){
  			// Use the VR display's in-built rAF (which can be a diff refresh rate to
	    	// the default browser one).
  			this.vrhandler.vr.display.requestAnimationFrame(() => this.update);
  			// Call submitFrame to ensure that the device renders the latest image from
		    // the WebGL context.
		    this.vrhandler.vr.display.submitFrame();
		    
  		}  	
  		else if(status == false){ //there's no vr to render//
  			 //Ensure that we switch everything back to auto for non-VR mode//
		    this.renderer.autoClear = true;
		    this.scene.matrixAutoUpdate = true;
  			this.renderer.render(this.scene, this.camera);
	  		requestAnimationFrame(() => this.update);
	  		
  		}	
  		else {//it's the first frame//
  			this.vrhandler.vr.display.requestAnimationFrame(() => this.update);  
  			
  		}
  		
	}

	setSceneObjects(){
		this.objects = [];

		let geometry = new THREE.BoxGeometry(1, 1, 1);
		let material = new THREE.MeshBasicMaterial( { color: 0x00ff00 } );
		this.objects[0] = new THREE.Mesh(geometry, material);
		this.scene.add(this.objects[0]);

		this.camera.position.z = 5;
	}

}

/* createMeshes () {
    const WIDTH = 1;
    const HEIGHT = 1;
    const DEPTH = 1;

    // Box.
    const boxGeometry = new THREE.BoxGeometry(WIDTH, HEIGHT, DEPTH);
    const boxMaterial = new THREE.MeshNormalMaterial();

    this._box = new THREE.Mesh(boxGeometry, boxMaterial);
    this._box.position.z = -5;

    // Room.
    const roomGeometry = new THREE.BoxGeometry(10, 2, 10, 10, 2, 10);
    const roomMaterial = new THREE.MeshBasicMaterial({
      wireframe: true,
      opacity: 0.3,
      transparent: true,
      side: THREE.BackSide
    });
    const room = new THREE.Mesh(roomGeometry, roomMaterial);

    room.position.z = -5;

    this._scene.add(this._box);
    this._scene.add(room);
  }*/