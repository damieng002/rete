export declare class Candidate {
    key: string;
    idCandidate: number;
    name: string;
    similarity: number;
    node: Node | null;
    constructor(key: string, idCandidate: number, name: string, similarity: number);
    toJSON(): {
        key: string;
        idCandidate: number;
        name: string;
        similarity: number;
    };
}
