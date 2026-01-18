import { PointerLockControls } from "three/examples/jsm/Addons.js";
import type { CameraManager } from "../cameraManager";
import { InputsManager } from "./inputsManager";
import { Vector3 } from "three";
import { Constants } from "../../utils/constants";

export class WalkController {
    controls: PointerLockControls
    enabled = false;
    inputsManager: InputsManager

    velocity = new Vector3();
    direction = new Vector3();
    inputSpeed = Constants.speed;
    speed = Constants.speed;

    constructor(cameraManager: CameraManager, container: HTMLElement) {
        this.controls = new PointerLockControls(cameraManager.camera, container);
        this.inputsManager = new InputsManager();
    }

    setEnabled(enabled: boolean) {
        this.enabled = enabled;
        enabled ? this.controls.lock() : this.controls.unlock();
    }

    update(delta: number) {
        this.direction.set(0,0,0);
        if (this.inputsManager.isPressed("KeyW")) this.direction.z += 1;
        if (this.inputsManager.isPressed("KeyS")) this.direction.z -= 1;
        if (this.inputsManager.isPressed("KeyA")) this.direction.x -= 1;
        if (this.inputsManager.isPressed("KeyD")) this.direction.x += 1;

        if(this.inputsManager.isPressed("ShiftLeft")){
            this.speed = this.inputSpeed * 3;
        }else{
            this.speed = this.inputSpeed;
        }

        this.controls.moveForward(this.direction.z * this.speed * delta)
        this.controls.moveRight(this.direction.x * this.speed * delta)

        if(this.inputsManager.isPressed("Space")){
            this.controls.object.position.y += 1 * this.speed * delta;
        }

        if(this.inputsManager.isPressed("ControlLeft")){
            this.controls.object.position.y -= 1 * this.speed * delta;
        }
    }
}