import * as THREE from "three";

export class CameraManager {
    camera: THREE.PerspectiveCamera
    constructor(container: HTMLElement) {
        this.camera = new THREE.PerspectiveCamera(60, container.clientWidth / container.clientHeight, 0.1, 1000);

        this.camera.position.set(0, 2, 5);
        this.camera.lookAt(0, 0, 0);

        window.addEventListener('resize', () => {
            this.camera.aspect = container.clientWidth / container.clientHeight;
            this.camera.updateProjectionMatrix();
        })
    }
}