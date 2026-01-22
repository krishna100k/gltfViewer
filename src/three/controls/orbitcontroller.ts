import { OrbitControls } from "three/examples/jsm/Addons.js";
import type { CameraManager } from "../cameraManager";

export class OrbitController {
    controls: OrbitControls
    constructor(cameraManager: CameraManager, container: HTMLElement) {
        this.controls = new OrbitControls(cameraManager.camera, container)
    }

    setEnabled(enabled: boolean) {
        this.controls.enabled = enabled
    }

    update() {
        this.controls.update();
    }

    getTarget(){
        return this.controls.target.clone();
    }
}