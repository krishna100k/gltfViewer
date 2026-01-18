import type { GLTF } from "three/examples/jsm/Addons.js";
import { GLTFManager } from "./gltfManager";

export class LoaderManager{
    gltfManager : GLTFManager
    constructor(){
        this.gltfManager = new GLTFManager();
    }

    load(url: string, ext: string, onLoaded : (gltf : GLTF) => void) {
        if (ext === "gltf" || ext === "glb") this.gltfManager.load(url, onLoaded);
    }
}