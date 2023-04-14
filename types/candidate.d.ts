export declare class Candidate {
    key: string;
    idCandidate: number;
    name: string;
    similarity: number;
    constructor(key: string, idCandidate: number, name: string, similarity: number);
    toJSON(): {
        idCandidate: number;
        name: string;
        similarity: number;
    };
}
