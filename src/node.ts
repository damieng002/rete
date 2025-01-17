import { Connection } from './connection';
import { Control } from './control';
import { Input } from './input';
import { Output } from './output';
import { InputsData, NodeData, OutputsData } from './core/data';
import { Candidate } from './candidate';

export class Node {

    name: string;
    id: number;
    position: [number, number] = [0.0, 0.0];
    inputs = new Map<string, Input>();
    outputs = new Map<string, Output>();
    controls = new Map<string, Control>();
    data: { [key: string]: unknown } = {};
    meta: { [key: string]: unknown } = {};
    collapsed: boolean;
    candidates = new Map<string, Candidate>();
    descriptionCollapsed: boolean;
    inputsCollapsed: boolean;
    processedCollapsed: boolean;
    outputsCollapsed: boolean;

    static latestId = 0;

    constructor(name: string) {
        this.name = name;
        this.collapsed = false;
        this.descriptionCollapsed = true;
        this.inputsCollapsed = false;
        this.processedCollapsed = true;
        this.outputsCollapsed = false;
        this.id = Node.incrementId();
    }

    _add<T extends { key: string } & Record<string, any>>(list: Map<string, T>, item: T, prop: string) {
        if (list.has(item.key))
            throw new Error(`Item with key '${item.key}' already been added to the node`);
        if (item[prop] !== null)
            throw new Error('Item has already been added to some node');

        (item as Record<string, Node>)[prop] = this;
        list.set(item.key, item);
    }

    addControl(control: Control) {
        this._add(this.controls, control, 'parent');
        return this;
    }

    removeControl(control: Control) {
        control.parent = null;

        this.controls.delete(control.key);
    }

    addInput(input: Input) {
        this._add(this.inputs, input, 'node');
        return this;
    }

    removeInput(input: Input) {
        input.removeConnections();
        input.node = null;

        this.inputs.delete(input.key);
    }

    addOutput(output: Output) {
        this._add(this.outputs, output, 'node');
        return this;
    }

    removeOutput(output: Output) {
        output.removeConnections();
        output.node = null;

        this.outputs.delete(output.key);
    }

    addCandidate(candidate: Candidate){
        this._add(this.candidates, candidate, 'node');
        return this;
    }

    removeCandidate(candidate: Candidate){
        this.candidates.delete(candidate.key);
    }

    setMeta(meta: { [key: string]: unknown }) {
        this.meta = meta;
        return this;
    }

    getConnections() {
        const ios = [...this.inputs.values(), ...this.outputs.values()];
        const connections = ios.reduce((arr, io) => {
            return [...arr, ...io.connections];
        }, [] as Connection[]);

        return connections;
    }

    update() {
    }

    static incrementId() {
        if (!this.latestId)
            this.latestId = 1
        else
            this.latestId++
        return this.latestId
    }

    static resetId() {
        this.latestId = 0;
    }

    toJSON(): NodeData {
        const reduceIO = <T extends Record<string, any>>(list: Map<string, Input | Output | Candidate>) => {
            return Array.from(list).reduce<T>((obj, [key, io]) => {
                (obj as Record<string, any>)[key] = io.toJSON();
                return obj;
            }, {} as any)
        }

        return {
            'id': this.id,
            'data': this.data,
            'inputs': reduceIO<InputsData>(this.inputs),
            'outputs': reduceIO<OutputsData>(this.outputs),
            'position': this.position,
            'name': this.name,
            'collapsed': this.collapsed,
            'candidates': Array.from(this.candidates).map(([_,val])=>val),
            'descriptionCollapsed':this.descriptionCollapsed,
            'inputsCollapsed': this.inputsCollapsed,
            'processedCollapsed': this.processedCollapsed,
            'outputsCollapsed': this.outputsCollapsed
        }
    }

    static fromJSON(json: NodeData) {
        const node = new Node(json.name);
        const [x, y] = json.position;

        node.id = json.id;
        node.data = json.data;
        node.position = [x, y];
        node.name = json.name;
        Node.latestId = Math.max(node.id, Node.latestId);
        node.collapsed = json.collapsed;
        const candidatesMap = new Map<string, Candidate>();
        for (const key in json.candidates) {
            if (json.candidates.hasOwnProperty(key)) {
                candidatesMap.set(key, json.candidates[key]);
            }
        }
        node.candidates = candidatesMap;
        node.descriptionCollapsed = json.descriptionCollapsed;
        node.inputsCollapsed = json.inputsCollapsed;
        node.processedCollapsed = json.processedCollapsed;
        node.outputsCollapsed = json.outputsCollapsed;

        return node;
    }
}
