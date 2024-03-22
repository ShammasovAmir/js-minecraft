import {CameraHelper, PerspectiveCamera, Vector3} from "three";
import {PointerLockControls} from "three/examples/jsm/controls/PointerLockControls";

export interface PlayerInterface {
    camera: PerspectiveCamera;
    controls: PointerLockControls;
    maxSpeed: number;
    input: Vector3;
    velocity: Vector3;
    cameraHelper: CameraHelper;
    position: () => Vector3;
    applyInputs: (changeInTime: number) => void;
    onKeyDown: (event: KeyboardEvent) => void;
    onKeyUp: (event: KeyboardEvent) => void;
    positionToString: () => string;
}