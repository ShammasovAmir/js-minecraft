import * as THREE from 'three';
import {OrbitControls} from "three/addons";
import {World} from "./world.js";
import Stats from "three/addons/libs/stats.module.js";
import "../style.css";
import {createUI} from "./ui.js";
import {PCFSoftShadowMap} from "three";
import {Player} from "./player.js";
import {Physics} from "./physics.js";

const stats = new Stats();
document.body.append(stats.dom);

const renderer = new THREE.WebGLRenderer();
renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setClearColor(0x00A9FF);
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = PCFSoftShadowMap;
document.body.appendChild(renderer.domElement);

const orbitCamera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight);
orbitCamera.position.set(-32, 16, -32);

const controls = new OrbitControls(orbitCamera, renderer.domElement);
controls.target.set(16, 0, 16);
controls.update();

const scene = new THREE.Scene();
const player = new Player(scene);
const physics = new Physics(scene);
const world = new World();
world.generate();
scene.add(world);

/**
 * @returns void
 */
function setupLights() {
    const sun = new THREE.DirectionalLight();
    sun.position.set(50, 50, 50);
    sun.castShadow = true;
    sun.shadow.camera.left = -40;
    sun.shadow.camera.right = 40;
    sun.shadow.camera.top = 40;
    sun.shadow.camera.bottom = -40;
    sun.shadow.camera.near = 0.1;
    sun.shadow.camera.far = 200;
    sun.shadow.bias = -0.001;
    scene.add(sun);

    const ambient = new THREE.AmbientLight();
    ambient.intensity = 0.1;
    scene.add(ambient);
}

let previousTime = performance.now();
/**
 * @returns void
 */
function animate() {
    let currentTime = performance.now();
    let changeInTime = (currentTime - previousTime) / 1000;

    requestAnimationFrame(animate);
    player.applyInputs(changeInTime);
    physics.update(changeInTime, player, world);
    renderer.render(scene, player.controls.isLocked ? player.camera : orbitCamera);
    stats.update();

    previousTime = currentTime;
}

window.addEventListener('resize', () => {
    orbitCamera.aspect = window.innerWidth / window.innerHeight;
    orbitCamera.updateProjectionMatrix();
    player.camera.aspect = window.innerWidth / window.innerHeight;
    player.camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
});

setupLights();
createUI(world, player, physics);
animate();