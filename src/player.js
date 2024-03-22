import * as THREE from "three";
import { PointerLockControls } from 'three/addons/controls/PointerLockControls.js';

/**
 * @typedef { import("./models/player").PlayerInterface } PlayerType
 */
/** @implements {PlayerType} */
export class Player {
    /**
     * @param {THREE.Scene} scene
     */
    constructor(scene) {
        this.maxSpeed = 10;
        this.input = new THREE.Vector3();
        this.velocity = new THREE.Vector3();
        this.camera = new THREE.PerspectiveCamera(70, window.innerWidth / window.innerHeight, 0.1, 200);
        this.controls = new PointerLockControls(this.camera, document.body);
        this.cameraHelper = new THREE.CameraHelper(this.camera);
        this.camera.position.set(32, 16, 32);
        scene.add(this.camera);
        scene.add(this.cameraHelper);

        document.addEventListener('keydown', this.onKeyDown.bind(this));
        document.addEventListener('keyup', this.onKeyUp.bind(this));
    }

    applyInputs(changeInTime) {
        if (this.controls.isLocked) {
            this.velocity.x = this.input.x;
            this.velocity.z = this.input.z;
            this.controls.moveRight(this.velocity.x * changeInTime);
            this.controls.moveForward(this.velocity.z * changeInTime);

            document.getElementById('player-position').innerHTML
                = this.positionToString();
        }
    }

    get position() {
        return this.camera.position;
    }

    onKeyDown(event) {
        if (!this.controls.isLocked) {
            this.controls.lock();
        }

        switch (event.code) {
            case 'KeyW':
                this.input.z = this.maxSpeed;
                break;
            case 'KeyA':
                this.input.x = -this.maxSpeed;
                break;
            case 'KeyS':
                this.input.z = -this.maxSpeed;
                break;
            case 'KeyD':
                this.input.x = this.maxSpeed;
                break;
            case 'KeyR':
                if (this.repeat) break;
                this.position.set(32, 10, 32);
                this.velocity.set(0, 0, 0);
                break;
        }
    }

    onKeyUp(event) {
        switch (event.code) {
            case 'KeyW':
                this.input.z = 0;
                break;
            case 'KeyA':
                this.input.x = 0;
                break;
            case 'KeyS':
                this.input.z = 0;
                break;
            case 'KeyD':
                this.input.x = 0;
                break;
        }
    }

    positionToString() {
        let str = '';
        str += `X: ${this.position.x.toFixed(3)} `;
        str += `Y: ${this.position.y.toFixed(3)} `;
        str += `Z: ${this.position.z.toFixed(3)}`;
        return str;
    }
}
