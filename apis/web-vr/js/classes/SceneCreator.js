import {ObjectCreator} from "./ObjectCreator.js";

export class SceneCreator{
	constructor(){
		this.objectCreator = new ObjectCreator();
	}

	createScene(environment){
		this.createSkyBox(environment);

		let position = new THREE.Vector3(0,0,0);
		this.createCenteredWhole(environment, position, 40, 40, 4, 4);
		
		position = new THREE.Vector3(20,1,5);
		this.createCenteredMountain(environment, position, 15, 25, 3, 2);		

		this.createRandomBlocks(environment);

		this.createLake(environment);

	}

	createSkyBox(environment){
		let skybox = this.objectCreator.createSimpleColorCube("#94bcfc", {x: 50, y: 50, z: 40});
		environment.scene.add(skybox);
		environment.objects.push(skybox); 
	}

	createRandomBlocks(environment){

	}

	createLake(environment, position, baseWidht, baseDepth, height, layerSpace){
		for(let y=0; y<height; y++){
			for(let x=0; x<(baseWidht-(layerSpace*2)*y); x++){
				for(let z=0; z<(baseDepth-(layerSpace*2)*y); z++){
					let waterCube = this.objectCreator.createWaterCube();
					waterCube.position.set( (firstLayer.x+layerSpace*y) + x,
											firstLayer.y - y,
											(firstLayer.z+layerSpace*y) + z );					
					environment.scene.add(waterCube);
					environment.objects.push(waterCube); 
				}
			}
		}
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