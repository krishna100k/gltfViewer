import type { GLTF } from "three/examples/jsm/Addons.js";
import { CameraManager } from "./cameraManager";
import { LoaderManager } from "./loaders/loaderManager";
import { RendererManager } from "./rendererManager";
import { SceneManager } from "./sceneManager";
import { Clock, type Group } from "three";
import { OrbitController } from "./controls/orbitcontroller";
import { WalkController } from "./controls/walkController";


export class Viewer {
    sceneManager: SceneManager
    cameraManager: CameraManager
    rendererManager: RendererManager
    loaderManager: LoaderManager
    loadedModel?: Group

    //controls
    walkMode = false;
    orbitController: OrbitController
    walkController: WalkController

    clock: Clock = new Clock();


    constructor(container: HTMLElement) {
        this.sceneManager = new SceneManager();
        this.cameraManager = new CameraManager(container);
        this.rendererManager = new RendererManager(container);
        this.loaderManager = new LoaderManager();

        this.orbitController = new OrbitController(this.cameraManager, container);
        this.walkController = new WalkController(this.cameraManager, container);

        this.walkController.controls.addEventListener('unlock', this.exitWalkMode)

        this.animate();
        this.loadModel("/models/default.glb", "glb");
    }

    // arrow function used deliberately because normal function does not carry "this", then
    // this.animate() does not refer to viewer.animate in that case
    // either you have to use arrow function or use bind
    animate = () => {
        requestAnimationFrame(this.animate);
        this.rendererManager.render(this.sceneManager.scene, this.cameraManager.camera);

        if (!this.walkMode) {
            this.orbitController.update();
        }else{
            this.walkController.update(this.clock.getDelta());
        }
    }

    loadModel(url: string, ext: string) {
        this.loaderManager.load(url, ext, (gltf: GLTF) => {
            
            if(this.loadedModel) this.sceneManager.scene.remove(this.loadedModel);

            this.sceneManager.add(gltf.scene);
            this.loadedModel = gltf.scene
        })
    }

    toggleWalkMode = () => {
        this.walkMode = true
        this.orbitController.setEnabled(!this.walkMode);
        this.walkController.setEnabled(this.walkMode);
    }

    exitWalkMode = () => {
        this.walkMode = false;
        this.orbitController.setEnabled(!this.walkMode);
        this.walkController.setEnabled(this.walkMode);
    }

    setInputSpeed(speed: number) {
        this.walkController.inputSpeed = speed
    }

    getCurrentInputSpeed(){
        return this.walkController.inputSpeed;
    }
}