export class FirstPersonControls {
	constructor(){
		this.enabled = false;
		if(navigator.getVRDisplays && navigator.getGamepads) {
			console.log("WebVR API and Gamepad API supported.");			
			this.gamepads = navigator.getGamepads()[0];
		} 
		else {
			console.log("WebVR API and/or Gamepad API not supported by this browser.");
		}
	}

	update(){
		if(this.gamepads) {
		  this.pose = this.gamepads.pose;
		  this.position = this.pose.position;
		  this.orientation = this.pose.orientation;
		  console.log("Pose: " + this.pose + " Position: " + this.position + " Orientation: " + this.orientation);
		}
	}

}