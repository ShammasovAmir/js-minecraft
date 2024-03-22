import {MeshLambertMaterial} from "three";

interface ScaleInterface {
    x: number;
    y: number;
    z: number;
}

interface BlockInterface {
    name: string;
    id: number;
    color?: number;
    scale?: ScaleInterface;
    scarcity?: number;
    material?: MeshLambertMaterial | MeshLambertMaterial[];
}

export interface BlocksInterface {
    empty: BlockInterface;
    grass: BlockInterface;
    dirt: BlockInterface;
    stone: BlockInterface;
    coalOre: BlockInterface;
    ironOre: BlockInterface;
}