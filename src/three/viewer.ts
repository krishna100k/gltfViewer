import type { GLTF } from "three/examples/jsm/Addons.js";
import { CameraManager } from "./cameraManager";
import { LoaderManager } from "./loaders/loaderManager";
import { RendererManager } from "./rendererManager";
import { SceneManager } from "./sceneManager";
import { Box3, Clock, Mesh, MeshStandardMaterial, Object3D, Vector2, Vector3, type Group } from "three";
import { OrbitController } from "./controls/orbitcontroller";
import { WalkController } from "./controls/walkController";
import { RaycasterManager } from "./intersections/raycasterManager";
import { configStore } from "../utils/configStore";
import { SolarSystem } from "./solarSystem";


export class Viewer {
    sceneManager !: SceneManager
    cameraManager !: CameraManager
    rendererManager !: RendererManager
    raycastermanager !: RaycasterManager
    loaderManager: LoaderManager
    solarSystemManager !: SolarSystem

    loadedModel?: Group

    //controls
    walkMode = false;
    orbitController: OrbitController
    walkController: WalkController

    clock: Clock = new Clock();

    clickedPointerCoords = new Vector2();

    selectedObject?: Object3D


    constructor(container: HTMLElement) {
        this.sceneManager = new SceneManager();
        this.cameraManager = new CameraManager(container);
        this.rendererManager = new RendererManager(container);
        this.loaderManager = new LoaderManager();
        this.raycastermanager = new RaycasterManager(this.cameraManager, container);
        // this.solarSystemManager = new SolarSystem(this.sceneManager);

        this.orbitController = new OrbitController(this.cameraManager, container);
        this.walkController = new WalkController(this.cameraManager, container);

        this.walkController.controls.addEventListener('unlock', this.exitWalkMode);

        this.animate();

        const canvas = this.rendererManager.renderer.domElement;
        canvas.addEventListener("pointerdown", this.onPointerDown);
        window.addEventListener("pointerup", this.onPointerUp);
    }



    // arrow function used deliberately because normal function does not carry "this", then
    // this.animate() does not refer to viewer.animate in that case
    // either you have to use arrow function or use bind
    animate = () => {
        requestAnimationFrame(this.animate);
        this.rendererManager.render(this.sceneManager.scene, this.cameraManager.camera);

        if (!this.walkMode) {
            this.orbitController.update();
        } else {
            this.walkController.update(this.clock.getDelta());
        }
    }

    loadModel(url: string, ext: string, setLoadingModelState : (loading : boolean) => void) {
        this.loaderManager.load(url, ext, (gltf: GLTF) => {
            // this.solarSystemManager?.clear();
            if (this.loadedModel) this.sceneManager.scene.remove(this.loadedModel);
            this.loadedModel = undefined;
            this.frameModel(gltf.scene);
            this.sceneManager.add(gltf.scene);
            this.loadedModel = gltf.scene;
            setLoadingModelState(false);
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

    getCurrentInputSpeed() {
        return this.walkController.inputSpeed;
    }

    frameModel(model: Object3D) {
        const box = new Box3().setFromObject(model);

        const size = box.getSize(new Vector3());
        const center = box.getCenter(new Vector3());

        model.position.sub(center);

        const maxSize = Math.max(size.x, size.y, size.z);

        configStore.speed = maxSize * configStore.autoSppedCalculationPercentage;

        this.cameraManager.camera.position.set(
            0,
            maxSize * 0.5,
            maxSize * 2
        );

        this.cameraManager.camera.lookAt(0, 0, 0);

        this.cameraManager.camera.near = maxSize / 1000;
        this.cameraManager.camera.far = maxSize * 10;
        this.cameraManager.camera.updateProjectionMatrix();

        this.orbitController.controls.target.set(0, 0, 0);
        this.orbitController.controls.update();
    }

    onPointerUp = (e: MouseEvent) => {
        if (e.clientX != this.clickedPointerCoords.x || e.clientY != this.clickedPointerCoords.y) return;
        const intersectedObjects = this.raycastermanager.cast(e, this.sceneManager.scene.children);

        if (this.selectedObject) {
            const currentObjectmesh = this.selectedObject as Mesh;
            currentObjectmesh.material = currentObjectmesh.userData?.["originalMaterial"];
            delete currentObjectmesh.userData.originalMaterial;;
            this.selectedObject = undefined;
        }

        if (intersectedObjects.length > 0) {
            this.highlightObject(intersectedObjects[0].object);
        }
    }

    onPointerDown = (e: MouseEvent) => {
        this.clickedPointerCoords.x = e.clientX;
        this.clickedPointerCoords.y = e.clientY;
    }

    highlightObject(object: Object3D) {
        const mesh = object as Mesh;
        if (!mesh.material) return;

        if (mesh.userData.originalMaterial) return;

        mesh.userData.originalMaterial = mesh.material;

        const highlight = (mat: MeshStandardMaterial) => {
            const clone = mat.clone();

            if (clone?.emissive) {
                clone.emissive.set(configStore.selectionColor);
                clone.emissiveIntensity = 1;
            } else if (clone?.color) {
                clone.color.set(configStore.selectionColor);
            } else {
                clone.opacity = 0.85;
                clone.transparent = true;
            }

            return clone;

        };

        mesh.material = Array.isArray(mesh.material)
            ? mesh.material.map(m => highlight(m as MeshStandardMaterial))
            : highlight(mesh.material as MeshStandardMaterial);

        this.selectedObject = mesh;
        console.log(this.selectedObject);
    }
}