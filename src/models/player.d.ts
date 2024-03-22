import {CameraHelper, Mesh, PerspectiveCamera, Vector3} from "three";
import {PointerLockControls} from "three/examples/jsm/controls/PointerLockControls";

export interface PlayerInterface {
    camera: PerspectiveCamera;
    controls: PointerLockControls;
    maxSpeed: number;
    radius: number;
    height: number;
    jumpSpeed: number;
    onGround: boolean;
    input: Vector3;
    velocity: Vector3;
    cameraHelper: CameraHelper;
    boundsHelper: Mesh;
    position: () => Vector3;
    applyInputs: (changeInTime: number) => void;
    updateBoundsHelper: () => void;
    applyWorldDeltaVelocity: (deltaValue: Vector3) => void;
    onKeyDown: (event: KeyboardEvent) => void;
    onKeyUp: (event: KeyboardEvent) => void;
    positionToString: () => string;
}