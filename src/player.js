import * as THREE from "three";
import { PointerLockControls } from 'three/addons/controls/PointerLockControls.js';

/**
 * @typedef { import("./models/player").PlayerInterface } PlayerType
 */
/** @implements {PlayerType} */
export class Player {
    #worldVelocity = new THREE.Vector3();

    /**
     * @param {THREE.Scene} scene
     */
    constructor(scene) {
        this.radius = 0.5;
        this.height = 1.75;
        this.maxSpeed = 10;
        this.jumpSpeed = 10;
        this.onGround = false;
        this.input = new THREE.Vector3();
        this.velocity = new THREE.Vector3();
        this.camera = new THREE.PerspectiveCamera(70, window.innerWidth / window.innerHeight, 0.1, 200);
        this.controls = new PointerLockControls(this.camera, document.body);
        this.cameraHelper = new THREE.CameraHelper(this.camera);
        this.cameraHelper.visible = false;
        this.boundsHelper = new THREE.Mesh(
            new THREE.CylinderGeometry(this.radius, this.radius, this.height, 16),
            new THREE.MeshBasicMaterial({ wireframe: true })
        );
        scene.add(this.boundsHelper);
        this.camera.position.set(32, 16, 32);
        scene.add(this.camera);
        scene.add(this.cameraHelper);

        document.addEventListener('keydown', this.onKeyDown.bind(this));
        document.addEventListener('keyup', this.onKeyUp.bind(this));
    }

    // Updates the state of the player based on the current user inputs
    applyInputs(changeInTime) {
        if (this.controls.isLocked) {
            this.velocity.x = this.input.x;
            this.velocity.z = this.input.z;
            this.controls.moveRight(this.velocity.x * changeInTime);
            this.controls.moveForward(this.velocity.z * changeInTime);
            this.position.y += this.velocity.y * changeInTime;
        }

        document.getElementById('player-position').innerHTML
            = this.positionToString();
    }

    /**
     * Updates the position of the player's bounding cylinder helper
     */
    updateBoundsHelper() {
        this.boundsHelper.position.copy(this.camera.position);
        this.boundsHelper.position.y -= this.height / 2;
    }

    get position() {
        return this.camera.position;
    }

    /**
     * Returns the velocity of the player in world coordinates
     * @returns {THREE.Vector3}
     */
    get worldVelocity() {
        this.#worldVelocity.copy(this.velocity);
        this.#worldVelocity.applyEuler(new THREE.Euler(0, this.camera.rotation.y, 0));
        return this.#worldVelocity;
    }

    /**
     * Applies a change in velocity 'dv' that is specified in the world frame
     */
    applyWorldDeltaVelocity(deltaValue) {
        deltaValue.applyEuler(new THREE.Euler(0, -this.camera.rotation.y, 0));
        this.velocity.add(deltaValue);
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
            case 'Space':
                if (this.onGround) {
                    this.velocity.y += this.jumpSpeed;
                }
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
