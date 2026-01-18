import { GLTFLoader, type GLTF } from "three/examples/jsm/Addons.js";

export class GLTFManager{
    loader : GLTFLoader

    constructor(){
        this.loader = new GLTFLoader();
    }

    load(url : string, onLoaded : (gltf : GLTF) => void){
        this.loader.load(url, (gltf) => {
            onLoaded(gltf);
        })
    }
}