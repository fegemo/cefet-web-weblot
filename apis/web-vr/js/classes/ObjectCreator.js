export class ObjectCreator {
	constructor(){
		this.loader = new THREE.TextureLoader();
		this.path = './images/';

		this.grassTopTexture = this.loader.load(this.path + 'grass.jpg');
		this.grassSideTexture = this.loader.load(this.path + 'grass-side.jpg');
		this.grassBottomTexture = this.loader.load(this.path + 'earth.jpg');

		this.waterTexture = this.loader.load(this.path + 'water.png');
		this.earthTexture = this.loader.load(this.path + 'earth.jpg');
		this.cloudTexture = this.loader.load(this.path + 'cloud.png');
		this.sandTexture = this.loader.load(this.path + 'sand.jpg');
		this.rockTexture = this.loader.load(this.path + 'rock.jpg');

		this.treeTrunkTopTexture = this.loader.load(this.path + 'tree-trunk-top.jpg');
		this.treeTrunkSideTexture = this.loader.load(this.path + 'tree-trunk-side.jpg');
		this.treeTrunkBottomTexture = this.loader.load(this.path + 'tree-trunk-top.jpg');
		this.treeLeafTexture = this.loader.load(this.path + 'tree-leaf.png');
	}

	createGrassCube(){		
		let materials =  [
			new THREE.MeshBasicMaterial({color: 0xffffff, map: this.grassSideTexture,  side: THREE.DoubleSide}), //right
			new THREE.MeshBasicMaterial({color: 0xffffff, map: this.grassSideTexture,  side: THREE.DoubleSide}), //left
			new THREE.MeshBasicMaterial({color: 0xffffff, map: this.grassTopTexture, side: THREE.DoubleSide}), //top
			new THREE.MeshBasicMaterial({color: 0xffffff, map: this.grassBottomTexture, side: THREE.DoubleSide}), //bottom
			new THREE.MeshBasicMaterial({color: 0xffffff, map: this.grassSideTexture,  side: THREE.DoubleSide}), //front
			new THREE.MeshBasicMaterial({color: 0xffffff, map: this.grassSideTexture,  side: THREE.DoubleSide}) //side
		];
		let geometry = new THREE.BoxGeometry(1, 1, 1);
		return new THREE.Mesh(geometry, materials);
	}

	createSimpleTextureCube(texture, scale){
		let material = new THREE.MeshBasicMaterial({color: 0xffffff, map: texture, side: THREE.DoubleSide});
		let geometry = new THREE.BoxGeometry(scale.x, scale.y, scale.z);
		return new THREE.Mesh(geometry, material);
	}

	createSimpleColorCube(color, scale){
		let material = new THREE.MeshBasicMaterial({color: color, side: THREE.DoubleSide});
		let geometry = new THREE.BoxGeometry(scale.x, scale.y, scale.z);
		return new THREE.Mesh(geometry, material);
	}

	createWaterCube(){
		return createSimpleTextureCube(this.waterTexture, {x: 1, y: 1, z: 1});
	}

	createEarthCube(){
		return createSimpleTextureCube(this.earthTexture, {x: 1, y: 1, z: 1});
	}

	createCloudCube(){
		return createSimpleTextureCube(this.cloudTexture, {x: 1, y: 1, z: 1});
	}

	createSandCube(){
		return createSimpleTextureCube(this.sandTexture, {x: 1, y: 1, z: 1});
	}

	createRockCube(){
		return createSimpleTextureCube(this.rockTexture, {x: 1, y: 1, z: 1});
	}

	createTreeTrunkCube(){
		let materials =  [
			new THREE.MeshBasicMaterial({color: 0xffffff, map: this.treeTrunkSideTexture,  side: THREE.DoubleSide}), //right
			new THREE.MeshBasicMaterial({color: 0xffffff, map: this.treeTrunkSideTexture,  side: THREE.DoubleSide}), //left
			new THREE.MeshBasicMaterial({color: 0xffffff, map: this.treeTrunkTopTexture, side: THREE.DoubleSide}), //top
			new THREE.MeshBasicMaterial({color: 0xffffff, map: this.treeTrunkBottomTexture, side: THREE.DoubleSide}), //bottom
			new THREE.MeshBasicMaterial({color: 0xffffff, map: this.treeTrunkSideTexture,  side: THREE.DoubleSide}), //front
			new THREE.MeshBasicMaterial({color: 0xffffff, map: this.treeTrunkSideTexture,  side: THREE.DoubleSide}) //side
		];
		let geometry = new THREE.BoxGeometry(1, 1, 1);
		return new THREE.Mesh(geometry, materials);
	}

	createTreeLeafCube(){
		return createSimpleTextureCube(this.treeLeafTexture, {x: 1, y: 1, z: 1});
	}

}