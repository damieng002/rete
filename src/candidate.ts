export class Candidate {

    key: string;
    idCandidate: number;
    name: string;
    similarity: number;
    node: Node | null = null;

    constructor(key: string, idCandidate: number, name:string, similarity:number) {
        this.node = null;
        this.key = key;
        this.idCandidate = idCandidate;
        this.name = name; 
        this.similarity = similarity;
    }

    toJSON(){
        return {
            idCandidate: this.idCandidate,
            name: this.name,
            similarity: this.similarity
        }
    }
}