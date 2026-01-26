import { PointerLockControls } from "three/examples/jsm/Addons.js";
import type { CameraManager } from "../cameraManager";
import { InputsManager } from "./inputsManager";
import { Vector3 } from "three";
import { store } from "../../redux/store";
import { Constants } from "../../utils/constants";

export class WalkController {
    controls: PointerLockControls
    enabled = false;
    inputsManager !: InputsManager

    velocity = new Vector3();
    direction = new Vector3();

    get settings() {
        return store.getState().settings;
    }

    constructor(cameraManager: CameraManager, container: HTMLElement, inputsManager : InputsManager) {
        this.controls = new PointerLockControls(cameraManager.camera, container);
        this.inputsManager = inputsManager
    }

    setEnabled(enabled: boolean) {
        this.enabled = enabled;
        enabled ? this.controls.lock() : this.controls.unlock();
    }

    update(delta: number) {
        this.direction.set(0, 0, 0);
        if (this.inputsManager.isPressed("KeyW")) { this.direction.z += 1 };
        if (this.inputsManager.isPressed("KeyS")) this.direction.z -= 1;
        if (this.inputsManager.isPressed("KeyA")) this.direction.x -= 1;
        if (this.inputsManager.isPressed("KeyD")) this.direction.x += 1;

        const baseSpeed = this.settings.speed;
        const speed = this.inputsManager.isPressed("ShiftLeft")
            ? baseSpeed * Constants.RunSpeed
            : baseSpeed;

        this.controls.moveForward(this.direction.z * speed * delta);
        this.controls.moveRight(this.direction.x * speed * delta);

        if (this.inputsManager.isPressed("Space")) {
            this.controls.object.position.y += speed * delta;
        }

        if (this.inputsManager.isPressed("KeyC")) {
            this.controls.object.position.y -= speed * delta;
        }
    }

    dispose() {
        this.inputsManager.dispose();
    }
}