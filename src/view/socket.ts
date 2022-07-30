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
                isOutput = 'output_type_id' in this.io.data
            }
            // @ts-ignore
            // the middle of the node component
            const posY = document.getElementById(this.node.name.toLowerCase() + '-' + this.node.id).offsetHeight / 2

            if (isOutput) {
                // @ts-ignore
                const posXOutput = document.getElementById('details-' + this.node.id).offsetWidth - customHackedOffsetX

                return [
                    // @ts-ignore
                    position[0] + posXOutput,
                    position[1] + posY
                ]
            }

            return [
                position[0] + customHackedOffsetX,
                // @ts-ignore
                position[1] + posY
            ]
        }
        return [
            position[0] + el.offsetLeft + el.offsetWidth / 2,
            position[1] + el.offsetTop + el.offsetHeight / 2
        ]
    }
}