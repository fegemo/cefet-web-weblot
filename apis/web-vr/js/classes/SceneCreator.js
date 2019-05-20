import {ObjectCreator} from "./ObjectCreator.js";

export class SceneCreator{
	constructor(){
		this.objectCreator = new ObjectCreator();
	}

	createScene(environment){
		this.createSkyBox(environment);	
		this.createBeatch(environment);
		
		let position = new THREE.Vector3(20,1,17);
		this.createCenteredMountain(environment, position, 15, 25, 3, 2);		
		this.createTree(environment, position, 10);

		position = new THREE.Vector3(20,-2,-25);
		this.createCenteredMountain(environment, position, 10, 10, 3, 1);		

		position = new THREE.Vector3(60,1,-25);
		this.createCenteredMountain(environment, position, 35, 30, 5, 2);	
		this.createTree(environment, position, 20);

		position = new THREE.Vector3(30,-2,35);
		this.createCenteredMountain(environment, position, 25, 15, 3, 1);	
		this.createTree(environment, position, 10);

		position = new THREE.Vector3(-20,-3,15);
		this.createCenteredMountain(environment, position, 15, 20, 3, 2);		
		this.createTree(environment, position, 15);

		position = new THREE.Vector3(-40,1,-10);
		this.createCenteredMountain(environment, position, 15, 15, 3, 2);		
		this.createTree(environment, position, 10);

		position = new THREE.Vector3(-60,1,0);
		this.createCenteredMountain(environment, position, 45, 45, 8, 2);		
		this.createTree(environment, position, 25);

		this.createRandomGrassBlocks(environment);
		this.createRandomCloudBlocks(environment);		

		environment.scene.fog = new THREE.Fog(0xFFFFFF, 50, 300);

	}

	createTree(environment, position, height){
		for(let i=0;i<height;i++){
			let trunkCube = this.objectCreator.createTreeTrunkCube();
			trunkCube.position.set(position.x, position.y + i, position.z);				
			environment.scene.add(trunkCube);
			environment.objects.push(trunkCube); 
		}
		for(let i=0;i<height*6;i++){
			let leafCube = this.objectCreator.createTreeLeafCube();
			leafCube.position.set(position.x + Math.floor((Math.random()*height/2) - height/4),
				position.y + height + Math.floor((Math.random()*height/3) - height/6),
				position.z + Math.floor((Math.random()*height/2) - height/4));				
			environment.scene.add(leafCube);
			environment.objects.push(leafCube); 
		}		
	}

	createSkyBox(environment){
		let skybox = this.objectCreator.createSimpleColorCube("#94bcfc", {x: 300, y: 300, z: 300});
		environment.scene.add(skybox);
		environment.objects.push(skybox); 
	}

	createRandomGrassBlocks(environment){
		let randomX, randomY, randomZ;
		for(let i=0; i<900; i++){
			randomX = Math.floor(Math.random()*400) - 200; 
			randomZ = Math.floor(Math.random()*400) - 200; 
			while(randomX < 20 && randomX > -20 && randomZ < 20 && randomZ > -20){	
				randomX = Math.floor(Math.random()*400) - 200; 
				randomZ = Math.floor(Math.random()*400) - 200; 
			}
			randomY = Math.floor(Math.random()*10 - 5); 

			let grassCube = this.objectCreator.createGrassCube();
			grassCube.position.set(randomX, randomY, randomZ);				
			environment.scene.add(grassCube);
			environment.objects.push(grassCube); 
		}
	}

	createRandomCloudBlocks(environment){
		let randomX, randomY, randomZ;
		for(let c=0; c<50; c++){
			randomX = Math.floor(Math.random()*200) - 100; 
			randomZ = Math.floor(Math.random()*200) - 100;
			randomY = Math.floor(Math.random()*20) + 30;
			for(let i=0; i<60; i++){
				let cloudCube = this.objectCreator.createCloudCube();
				cloudCube.position.set(randomX + Math.floor(Math.random()*15), 
					randomY + Math.floor(Math.random()*5), 
					randomZ + Math.floor(Math.random()*15));				
				environment.scene.add(cloudCube);
				environment.objects.push(cloudCube); 
			}
		}
	}

	createBeatch(environment){
		let position = new THREE.Vector3(0,0,0);
		this.createLake(environment, position, 32, 32, 3, 4);

		let baseWidht = 40;
		let baseDepth = 40;
		let height = 4;
		let layerSpace = 4;
		let direction = -1;

		let firstLayer = new THREE.Vector3();
		firstLayer.x = position.x - (baseWidht/2 - 0.5);
		firstLayer.y = position.y;
		firstLayer.z = position.z - (baseDepth/2 - 0.5);

		for(let y=0; y<height; y++){			
			if(y==(height-1)){ //se for a primeira ou a ultima layer, tem que ser completa//
				for(let x=0; x<(baseWidht-(layerSpace*2)*y); x++){
					for(let z=0; z<(baseDepth-(layerSpace*2)*y); z++){
						let sandCube = this.objectCreator.createSandCube();
						sandCube.position.set( (firstLayer.x+layerSpace*y) + x,
												firstLayer.y + direction*y,
												(firstLayer.z+layerSpace*y) + z );					
						environment.scene.add(sandCube);
						environment.objects.push(sandCube); 							
					}
				}
			}
			else { //caso contrário, fazer só as bordas//
				for(let x=0; x<(baseWidht-(layerSpace*2)*y); x++){
					if(x<layerSpace || x>((baseWidht-(layerSpace*2)*y)-layerSpace)-1){ //se estiver fazendo as bordas em x//
						for(let z=0; z<(baseDepth-(layerSpace*2)*y); z++){		       //então tem que fazer a coluna inteira// 
							if(y==0){
								let grassCube = this.objectCreator.createGrassCube();
								grassCube.position.set( (firstLayer.x+layerSpace*y) + x,
														firstLayer.y + direction*y,
														(firstLayer.z+layerSpace*y) + z );					
								environment.scene.add(grassCube);
								environment.objects.push(grassCube); 
							}
							else{
								let sandCube = this.objectCreator.createSandCube();
								sandCube.position.set( (firstLayer.x+layerSpace*y) + x,
														firstLayer.y + direction*y,
														(firstLayer.z+layerSpace*y) + z );					
								environment.scene.add(sandCube);
								environment.objects.push(sandCube); 
							}
						}
					}
					else{ //se não está fazendo as bordas em x, faz as bordas em z//
						for(let z=0; z<(baseDepth-(layerSpace*2)*y); z++){
							if(!(z<layerSpace || z>((baseDepth-(layerSpace*2)*y)-layerSpace)-1)){ 
								z=(((baseDepth-(layerSpace*2)*y)-layerSpace)-1); 
							}
							if(y==0){
								let grassCube = this.objectCreator.createGrassCube();
								grassCube.position.set( (firstLayer.x+layerSpace*y) + x,
														firstLayer.y + direction*y,
														(firstLayer.z+layerSpace*y) + z );					
								environment.scene.add(grassCube);
								environment.objects.push(grassCube); 
							}
							else{
								let sandCube = this.objectCreator.createSandCube();
								sandCube.position.set( (firstLayer.x+layerSpace*y) + x,
														firstLayer.y + direction*y,
														(firstLayer.z+layerSpace*y) + z );					
								environment.scene.add(sandCube);
								environment.objects.push(sandCube); 
							}
						}
					}
				}
			}
		}
	}

	createLake(environment, position, baseWidht, baseDepth, height, layerSpace){
		let firstLayer = new THREE.Vector3();
		firstLayer.x = position.x - (baseWidht/2 - 0.5);
		firstLayer.y = position.y;
		firstLayer.z = position.z - (baseDepth/2 - 0.5);
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