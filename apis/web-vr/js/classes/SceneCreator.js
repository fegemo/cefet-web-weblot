import {ObjectCreator} from "./ObjectCreator.js";

export class SceneCreator{
	constructor(){
		this.objectCreator = new ObjectCreator();
	}

	createScene(environment){
		let position = new THREE.Vector3(0,0,0);
		this.createCenteredWhole(environment, position, 30, 30, 3, 5);
		
		position = new THREE.Vector3(10,1,0);
		this.createCenteredMountain(environment, position, 5, 10, 2, 1);
		
		position = new THREE.Vector3(20,1,5);
		this.createCenteredMountain(environment, position, 15, 25, 3, 2);		

		let roomGeometry = new THREE.BoxGeometry(5, 1, 10);
    	let roomMaterial = new THREE.MeshBasicMaterial({
	      wireframe: true,
	      opacity: 0.3,
	      transparent: true,
	      side: THREE.BackSide
	    });
    	let room = new THREE.Mesh(roomGeometry, roomMaterial);

    	environment.scene.add(room);
	}

	createCenteredMountain(environment, position, baseWidht, baseDepth, height, layerSpace){
		this.createCenteredLandForm(environment, position, baseWidht, baseDepth, height, layerSpace, 1);
	}

	createCenteredWhole(environment, position, baseWidht, baseDepth, height, layerSpace){
		this.createCenteredLandForm(environment, position, baseWidht, baseDepth, height, layerSpace, -1);
	}

	createCenteredLandForm(environment, position, baseWidht, baseDepth, height, layerSpace, direction){
		let firstLayer = new THREE.Vector3();
		firstLayer.x = position.x - (baseWidht/2 - 0.5);
		firstLayer.y = position.y;
		firstLayer.z = position.z - (baseDepth/2 - 0.5);

		for(let y=0; y<height; y++){
			if(y==(height-1)){ //se for a primeira ou a ultima layer, tem que ser completa//
				for(let x=0; x<(baseWidht-(layerSpace*2)*y); x++){
					for(let z=0; z<(baseDepth-(layerSpace*2)*y); z++){
						let grassCube = this.objectCreator.createGrassCube();
						grassCube.position.set( (firstLayer.x+layerSpace*y) + x,
												firstLayer.y + direction*y,
												(firstLayer.z+layerSpace*y) + z );					
						environment.scene.add(grassCube);
						environment.objects.push(grassCube); 
					}
				}
			}
			else { //caso contrário, fazer só as bordas//
				for(let x=0; x<(baseWidht-(layerSpace*2)*y); x++){
					if(x<layerSpace || x>((baseWidht-(layerSpace*2)*y)-layerSpace)-1){ //se estiver fazendo as bordas em x//
						for(let z=0; z<(baseDepth-(layerSpace*2)*y); z++){		       //então tem que fazer a coluna inteira// 
							let grassCube = this.objectCreator.createGrassCube();
							grassCube.position.set( (firstLayer.x+layerSpace*y) + x,
													firstLayer.y + direction*y,
													(firstLayer.z+layerSpace*y) + z );					
							environment.scene.add(grassCube);
							environment.objects.push(grassCube); 
						}
					}
					else{ //se não está fazendo as bordas em x, faz as bordas em z//
						for(let z=0; z<(baseDepth-(layerSpace*2)*y); z++){
							if(!(z<layerSpace || z>((baseDepth-(layerSpace*2)*y)-layerSpace)-1)){ 
								z=(((baseDepth-(layerSpace*2)*y)-layerSpace)-1); 
							}
							let grassCube = this.objectCreator.createGrassCube();
							grassCube.position.set( (firstLayer.x+layerSpace*y) + x,
													firstLayer.y + direction*y,
													(firstLayer.z+layerSpace*y) + z );					
							environment.scene.add(grassCube);
							environment.objects.push(grassCube); 
						}
					}
				}
			}
		}


	}

}