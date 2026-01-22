import * as THREE from "three";
import { store } from "../redux/store";

export class SceneManager {
    scene: THREE.Scene
    get settings() {
        return store.getState().settings;
    }
    constructor() {
        this.scene = new THREE.Scene();
        this.scene.background = new THREE.Color(this.settings.backgroundColor);

        const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
        this.scene.add(ambientLight);

        const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
        directionalLight.position.set(5, 10, 5);
        this.scene.add(directionalLight);
    }

    add(object: THREE.Object3D) {
        this.scene.add(object)
    }

    updateBackgroundColor = () => {
        this.scene.background = new THREE.Color(this.settings.backgroundColor);
    }
}