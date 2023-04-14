import { Emitter } from '../core/emitter';
import { EventsTypes } from '../events';
import { IO } from '../io';
import { Node } from '../node';

export class SocketView extends Emitter<EventsTypes> {

    el: HTMLElement;
    type: string;
    io: IO;
    node: Node;

    constructor(el: HTMLElement, type: string, io: IO, node: Node, emitter: Emitter<EventsTypes>) {
        super(emitter);
        this.el = el;
        this.type = type;
        this.io = io;
        this.node = node;

        this.trigger('rendersocket', { el, [type]: this.io, socket: io.socket });
    }

    getPosition({ position }: { position: number[] }): [number, number] {
        const el = this.el;

        if (this.node.collapsed) {
            let isOutput = false;
            const customHackedOffsetX = 50;

            if (this.io.node) {
                isOutput = this.io.socket.name === 'output'
            }

            const nodeNameId = document.getElementById(this.node.name.toLowerCase() + '-' + this.node.id);

            if(!nodeNameId) {
                throw Error(`The node name id: nodename-${this.node.id} not found. Make sure to set the id in the HTML element`);
            }


            // the middle of the node component
            const posY = nodeNameId.offsetHeight / 2

            if (isOutput) {
                const detailsElement = document.getElementById('details-' + this.node.id);
                if(!detailsElement){
                    throw Error(`The details id: details-${this.node.id} not found. Make sure to set the id in the details HTML element`);
                }
                const posXOutput = detailsElement.offsetWidth - customHackedOffsetX

                return [
                    
                    position[0] + posXOutput,
                    position[1] + posY
                ]
            }

            return [
                position[0] + customHackedOffsetX,
                position[1] + posY
            ]
        }
        if (this.node.inputsCollapsed) {
            let isOutput = false;
            const customHackedOffsetX = 50;
            const customHackedOffsetY = -10;

            if (this.io.node) {
                isOutput = this.io.socket.name === 'output'
            }
            if (!isOutput) {
                const nodeInputs = document.getElementById('node-inputs-' + this.node.id)
                const nodeSummary = document.getElementById('node-summary-' + this.node.id);

                if(!nodeInputs){
                    throw Error(`The node-inputs id: node-inputs-${this.node.id} not found. Make sure to set the id in the HTML element`);
                }

                if(!nodeSummary){
                    throw Error(`The node-summary id: node-summary-${this.node.id} not found. Make sure to set the id in the HTML element`);
                }

                // the middle of the inputs
                const posY = nodeInputs.offsetHeight + nodeSummary.offsetHeight + customHackedOffsetY

                return [
                    position[0] + customHackedOffsetX,
                    position[1] + posY
                ]
            }
        }
        if (this.node.outputsCollapsed) {
            let isOutput = false;
            const customHackedOffsetX = 47;
            const customHackedOffsetY = 0;

            if (this.io.node) {
                isOutput = this.io.socket.name === 'output'
            }
            if (isOutput) {

                const companyId = document.getElementById('company-' + this.node.id);
                const nodeFooterId = document.getElementById('node-footer-' + this.node.id)
                const nodeOutputsId = document.getElementById('node-outputs-' + this.node.id);
                const detailsId = document.getElementById('details-' + this.node.id);

                if(!companyId){
                    throw Error(`The company id: company-${this.node.id} not found. Make sure to set the id in the HTML element`);
                }

                if(!nodeFooterId){
                    throw Error(`The node-footer id: node-footer-${this.node.id} not found. Make sure to set the id in the HTML element`);
                }
                if(!nodeOutputsId){
                    throw Error(`The node-outputs id: node-outputs-${this.node.id} not found. Make sure to set the id in the HTML element`);
                }
                if(!detailsId){
                    throw Error(`The details id: details-${this.node.id} not found. Make sure to set the id in the HTML element`);
                }

                // the middle of the outputs
                const posY = companyId.offsetHeight + customHackedOffsetY - nodeFooterId.offsetHeight - 
                nodeOutputsId.offsetHeight / 2
                
                const posXOutput = detailsId.offsetWidth - customHackedOffsetX

                return [
                    position[0] + posXOutput,
                    position[1] + posY
                ]
            }
        }
        return [
            position[0] + el.offsetLeft + el.offsetWidth / 2,
            position[1] + el.offsetTop + el.offsetHeight / 2
        ]
    }
}