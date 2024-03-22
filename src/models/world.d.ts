interface WorldSizeInterface {
    width: number;
    height: number;
}

interface BlockDataElement {
    id: number;
    instanceId: number | null;
}

interface TerrainInterface {
    scale: number;
    magnitude: number;
    offset: number;
}

interface SimplexParams {
    seed: number;
    terrain: TerrainInterface;
}

export interface WorldInterface {
    data: BlockDataElement[][][];
    params: SimplexParams;
    size: WorldSizeInterface;
    threshold: number;
    generate: () => void;
    initializeTerrain: () => void;
    generateTerrain: () => void;
    generateMeshes: () => void;
    getBlock: (x: number, y: number, z: number) => BlockDataElement | null;
    setBlockId: (x: number, y: number, z: number, id: number) => void;
    setBlockInstanceId: (x: number, y: number, z: number, instanceId: number) => void;
    inBounds: (x: number, y: number, z: number) => boolean;
    inBlockObscured: (x: number, y: number, z: number) => boolean;
}