import * as THREE from 'three';
import {OrbitControls} from "three/addons";
import {World} from "./world.js";
import Stats from "three/addons/libs/stats.module.js";
import "../style.css";
import {createUI} from "./ui.js";

const stats = new Stats();
document.body.append(stats.dom);

const renderer = new THREE.WebGLRenderer();
renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setClearColor(0x80a0e0);
document.body.appendChild(renderer.domElement);

const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight);
camera.position.set(-32, 16, -32);

const controls = new OrbitControls(camera, renderer.domElement);
controls.target.set(16, 0, 16);
controls.update();

const scene = new THREE.Scene();
const world = new World();
world.generate();
scene.add(world);

/**
 * @returns void
 */
function setupLights() {
    const light1 = new THREE.DirectionalLight();
    light1.position.set(1, 1, 1);
    scene.add(light1);

    const light2 = new THREE.DirectionalLight();
    light2.position.set(-1, 1, -0.5);
    scene.add(light2);

    const ambient = new THREE.AmbientLight();
    ambient.intensity = 0.1;
    scene.add(ambient);
}

/**
 * @returns void
 */
function animate() {
    requestAnimationFrame(animate);
    renderer.render(scene, camera);
    stats.update();
}

window.addEventListener('resize', () => {
   camera.aspect = window.innerWidth / window.innerHeight;
   camera.updateProjectionMatrix();
   renderer.setSize(window.innerWidth, window.innerHeight);
});

setupLights();
createUI(world);
animate();