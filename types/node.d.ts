import { Connection } from './connection';
import { Control } from './control';
import { Input } from './input';
import { Output } from './output';
import { NodeData } from './core/data';
import { Candidate } from './candidate';
export declare class Node {
    name: string;
    id: number;
    position: [number, number];
    inputs: Map<string, Input>;
    outputs: Map<string, Output>;
    controls: Map<string, Control>;
    data: {
        [key: string]: unknown;
    };
    meta: {
        [key: string]: unknown;
    };
    collapsed: boolean;
    candidates: Map<string, Candidate>;
    descriptionCollapsed: boolean;
    inputsCollapsed: boolean;
    processedCollapsed: boolean;
    outputsCollapsed: boolean;
    static latestId: number;
    constructor(name: string);
    _add<T extends {
        key: string;
    } & Record<string, any>>(list: Map<string, T>, item: T, prop: string): void;
    addControl(control: Control): this;
    removeControl(control: Control): void;
    addInput(input: Input): this;
    removeInput(input: Input): void;
    addOutput(output: Output): this;
    removeOutput(output: Output): void;
    addCandidate(candidate: Candidate): this;
    removeCandidate(candidate: Candidate): void;
    setMeta(meta: {
        [key: string]: unknown;
    }): this;
    getConnections(): Connection[];
    update(): void;
    static incrementId(): number;
    static resetId(): void;
    toJSON(): NodeData;
    static fromJSON(json: NodeData): Node;
}
