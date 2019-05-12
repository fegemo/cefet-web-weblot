export class ObjectCreator {
	constructor(){
		this.loader = new THREE.TextureLoader();
		this.path = './images/';

		this.grassUpTexture = this.loader.load(this.path + 'grass.jpg');
		this.grassSideTexture = this.loader.load(this.path + 'grass-side.jpg');
		this.grassBottomTexture = this.loader.load(this.path + 'earth.jpg');
		this.waterTexture = this.loader.load(this.path + 'water.png');
		this.earthTexture = this.loader.load(this.path + 'earth.jpg');
		this.cloudTexture = this.loader.load(this.path + 'cloud.png');
		this.sandTexture = this.loader.load(this.path + 'sand.jpg');
		this.rockTexture = this.loader.load(this.path + 'rock.jpg');
		this.treeTrunkUpTexture = this.loader.load(this.path + 'tree-trunk-up.jpg');
		this.treeTrunkSideTexture = this.loader.load(this.path + 'tree-trunk-side.jpg');
		this.treeTrunkBottomTexture = this.loader.load(this.path + 'tree-trunk-up.jpg');
		this.treeLeafTexture = this.loader.load(this.path + 'tree-leaf.png');
	}

	createGrassCube(){		
		let materials =  [
			new THREE.MeshBasicMaterial({color: 0xffffff, map: this.grassSideTexture,  side: THREE.DoubleSide}), //right
			new THREE.MeshBasicMaterial({color: 0xffffff, map: this.grassSideTexture,  side: THREE.DoubleSide}), //left
			new THREE.MeshBasicMaterial({color: 0xffffff, map: this.grassUpTexture, side: THREE.DoubleSide}), //top
			new THREE.MeshBasicMaterial({color: 0xffffff, map: this.grassBottomTexture, side: THREE.DoubleSide}), //bottom
			new THREE.MeshBasicMaterial({color: 0xffffff, map: this.grassSideTexture,  side: THREE.DoubleSide}), //front
			new THREE.MeshBasicMaterial({color: 0xffffff, map: this.grassSideTexture,  side: THREE.DoubleSide}) //side
		];
		let geometry = new THREE.BoxGeometry(1, 1, 1);
		return new THREE.Mesh(geometry, materials);
	}

	createSimpleCube(texture){
		let material = new THREE.MeshBasicMaterial({color: 0xffffff, map: texture, side: THREE.DoubleSide});
		let geometry = new THREE.BoxGeometry(1, 1, 1);
		return new THREE.Mesh(geometry, material);
	}

	createWaterCube(){
		return createSimpleCube(this.waterTexture);
	}

	createEarthCube(){
		return createSimpleCube(this.earthTexture);
	}

	createCloudCube(){
		return createSimpleCube(this.cloudTexture);
	}

	createSandCube(){
		return createSimpleCube(this.sandTexture);
	}

	createRockCube(){
		return createSimpleCube(this.rockTexture);
	}

	createTreeTrunkCube(){
		let materials =  [
			new THREE.MeshBasicMaterial({color: 0xffffff, map: this.treeTrunkSideTexture,  side: THREE.DoubleSide}), //right
			new THREE.MeshBasicMaterial({color: 0xffffff, map: this.treeTrunkSideTexture,  side: THREE.DoubleSide}), //left
			new THREE.MeshBasicMaterial({color: 0xffffff, map: this.treeTrunkUpTexture, side: THREE.DoubleSide}), //top
			new THREE.MeshBasicMaterial({color: 0xffffff, map: this.treeTrunkBottomTexture, side: THREE.DoubleSide}), //bottom
			new THREE.MeshBasicMaterial({color: 0xffffff, map: this.treeTrunkSideTexture,  side: THREE.DoubleSide}), //front
			new THREE.MeshBasicMaterial({color: 0xffffff, map: this.treeTrunkSideTexture,  side: THREE.DoubleSide}) //side
		];
		let geometry = new THREE.BoxGeometry(1, 1, 1);
		return new THREE.Mesh(geometry, materials);
	}

	createTreeLeafCube(){
		return createSimpleCube(this.treeLeafTexture);
	}

}