import * as THREE from "three";
import { configStore } from "../utils/configStore";

export class SceneManager{
    scene : THREE.Scene
    constructor(){
        this.scene = new THREE.Scene();
        this.scene.background = new THREE.Color(configStore.backgroundColor);

        const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
        this.scene.add(ambientLight);

        const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
        directionalLight.position.set(5, 10, 5);
        this.scene.add(directionalLight);
    }

    add(object : THREE.Object3D){
        this.scene.add(object)
    }
}