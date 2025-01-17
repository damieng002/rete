import { Connection } from './connection';
import { Node } from './node';
import { Socket } from './socket';
export declare class IO {
    node: Node | null;
    multipleConnections: boolean;
    connections: Connection[];
    key: string;
    name: string;
    socket: Socket;
    data: any;
    constructor(key: string, name: string, socket: Socket, multiConns: boolean);
    removeConnection(connection: Connection): void;
    removeConnections(): void;
}
