export class Candidate {

    idCandidate: number;
    name: string;
    similarity: number;

    constructor(idCandidate: number, name:string, similarity:number) {
        this.idCandidate = idCandidate;
        this.name = name; 
        this.similarity = similarity;
    }
}