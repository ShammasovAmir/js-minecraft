interface BlockInterface {
    name: string;
    id: number;
    color?: number;
}

export interface BlocksInterface {
    empty: BlockInterface;
    grass: BlockInterface;
    dirt: BlockInterface;
}