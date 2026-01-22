import * as THREE from "three";
import { store } from "../redux/store";

export class CameraManager {
    camera: THREE.PerspectiveCamera
    get settings() {
        return store.getState().settings;
    }

    constructor(container: HTMLElement) {
        this.camera = new THREE.PerspectiveCamera(this.settings.camera.fov, container.clientWidth / container.clientHeight, this.settings.camera.near, this.settings.camera.far);

        this.camera.position.set(0, 2, 5);
        this.camera.lookAt(0, 0, 0);

        window.addEventListener('resize', () => {
            this.camera.aspect = container.clientWidth / container.clientHeight;
            this.camera.updateProjectionMatrix();
        })
    }

    getCameraSettings() {
        return {
          position: {
            x: this.camera.position.x,
            y: this.camera.position.y,
            z: this.camera.position.z
          },
          near: this.camera.near,
          far: this.camera.far,
          fov: this.camera.fov
        };
      }
}