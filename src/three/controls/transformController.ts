import { TransformControls } from "three/examples/jsm/controls/TransformControls.js";
import type { CameraManager } from "../cameraManager";
import type { RendererManager } from "../rendererManager";
import type { SceneManager } from "../sceneManager";
import type { OrbitController } from "./orbitcontroller";
import type { Object3D } from "three";
import type { InputsManager } from "./inputsManager";

export type TransformMode = "translate" | "rotate" | "scale";

export class TransformController {
    cameraManager !: CameraManager
    rendererManager !: RendererManager
    sceneManager !: SceneManager
    orbitControls !: OrbitController
    controls !: TransformControls
    inputsManager !: InputsManager

    constructor(cameraManager: CameraManager, rendererManager: RendererManager, sceneManager: SceneManager, orbitControls: OrbitController, inputsManager : InputsManager) {
        this.cameraManager = cameraManager;
        this.rendererManager = rendererManager;
        this.sceneManager = sceneManager;
        this.orbitControls = orbitControls;
        this.inputsManager = inputsManager;

        this.controls = new TransformControls(this.cameraManager.camera, this.rendererManager.renderer.domElement);
        this.controls.getHelper().traverse((obj) => {
            obj.userData.isTransFormControlsObject = true;
        });
        this.sceneManager.add(this.controls.getHelper());
    }

    attachObject(mesh : Object3D){
        this.controls.attach(mesh);
    }

    detachObject(){
        this.controls.detach();
        this.setMode("translate");
    }

    setMode(mode : TransformMode){
        this.controls.setMode(mode);
    }



}