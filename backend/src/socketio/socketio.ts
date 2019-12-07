import {createServer, Server as HTTPServer} from 'http'
import * as SocketIO from 'socket.io';
import {Server as SocketIOServer, Socket, } from 'socket.io';
import {CONFIG} from '../config'
import {SignUpMessage} from "./messages";
import {validateSignUp} from "./validators";

export class Communication {
    private readonly httpServer: HTTPServer;
    private readonly socketIOServer: SocketIOServer;

    constructor() {
        this.httpServer = createServer();

        this.socketIOServer = SocketIO(this.httpServer , {
            path: '/',
            serveClient: false,
            pingInterval: 10000,
            pingTimeout: 5000,
            cookie: false
        });

        this.socketIOServer.on('connection', this.onConnect.bind(this));

        console.log(`Starting server on port ${CONFIG.port}.`);
        this.httpServer.listen(CONFIG.port);
    }

    onConnect(socket: Socket) {
        console.log('User connected.');
        socket.on('/auth/signup', this.onSignup(socket).bind(this));
    }

    onSignup(socket: Socket) {
        console.log('User sent signup.');
        return (message: SignUpMessage) => {
            const errors = validateSignUp(message);
            this.sendSignupStatus(socket, errors.length ? errors[0] : 0);
        }
    }

    sendSignupStatus(socket: Socket, status: number) {
        console.log('Responding...');
        socket.emit('/auth/signupstatus', status);
    }
}
