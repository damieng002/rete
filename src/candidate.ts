export class Candidate{

    id_candidate: number;
    name: string;
    similarity: number;


    constructor(id_candidate: number, name:string, similarity:number){
        this.id_candidate = id_candidate;
        this.name = name; 
        this.similarity = similarity;
    }
}