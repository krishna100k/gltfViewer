import { Object3D, Raycaster, Vector2 } from "three";
import type { CameraManager } from "../cameraManager";

export class RaycasterManager{
    raycaster !: Raycaster
    mouse !: Vector2
    cameraManager !: CameraManager
    container !: HTMLElement

    constructor(cameraManager : CameraManager, container : HTMLElement){
        this.raycaster = new Raycaster();
        this.mouse = new Vector2();

        this.cameraManager = cameraManager;
        this.container = container;
    }

    cast(event : MouseEvent, objects : Object3D[]){
        const rect = this.container.getBoundingClientRect();

        // converting to normalized device coordinates as three js does not support pixels.
        this.mouse.x = ((event.clientX - rect.x) / rect.width) * 2 - 1;
        this.mouse.y = -((event.clientY - rect.y) / rect.height) * 2 + 1;

        this.raycaster.setFromCamera(this.mouse, this.cameraManager.camera);

        // avoiding transform controls gizmo object by filtering.
        return this.raycaster.intersectObjects(objects).filter(f => !f.object.userData?.isTransFormControlsObject);
    }
}