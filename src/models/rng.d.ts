export interface RngInterface {
    m_w: number;
    m_z: number;
    mask: number;
    random: () => number;
}