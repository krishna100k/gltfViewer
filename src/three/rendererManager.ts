import * as THREE from "three";

export class RendererManager{
    renderer : THREE.WebGLRenderer
    constructor(container : HTMLElement){
        this.renderer = new THREE.WebGLRenderer({antialias : true});
        this.renderer.setSize(container.clientWidth,  container.clientHeight);
        container.appendChild(this.renderer.domElement);
    }

    render(scene : THREE.Scene, camera : THREE.PerspectiveCamera){
        this.renderer.render(scene, camera);
    }
}