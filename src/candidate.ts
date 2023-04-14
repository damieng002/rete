export class Candidate {

    key: string;
    idCandidate: number;
    name: string;
    similarity: number;

    constructor(key: string, idCandidate: number, name:string, similarity:number) {
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