
export class InputsManager {
    keys: Record<string, boolean> = {}
    constructor() {
        window.addEventListener("keydown", (e) => {
            this.keys[e.code] = true;
        });

        window.addEventListener("keyup", (e) => {
            this.keys[e.code] = false;
        });
    }

    isPressed(code: string) {
        return this.keys[code];
    }

    dispose() {
        window.onkeydown = null;
        window.onkeyup = null;
    }
}