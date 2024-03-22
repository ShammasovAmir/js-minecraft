import {PlayerInterface} from "./player";
import {WorldInterface} from "./world";
import {Group} from "three";

//TODO: Update physics definitions

export interface BlockCollisionInterface {
    id: number;
    instanceId: number;
}

export interface PhysicsInterface {
    gravity: number;
    simulationRate: number;
    stepSize: number;
    accumulator: number;
    helpers: Group;
    update: (changeInTime: number, player: PlayerInterface, world: WorldInterface) => void;
    detectCollisions: (player: PlayerInterface, world: WorldInterface) => void;
    broadPhase: (player: PlayerInterface, world: WorldInterface) => BlockCollisionInterface[];
}