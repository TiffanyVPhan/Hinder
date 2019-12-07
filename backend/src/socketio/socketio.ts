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

        this.socketIOServer = SocketIO(this.httpServer, {
            path: '/api',
            serveClient: false,
            pingInterval: 10000,
            pingTimeout: 5000,
            cookie: false
        });

        this.socketIOServer.on('connect', this.onConnect);

        console.log('Starting server...');
        this.httpServer.listen(CONFIG.port);
    }

    onConnect(socket: Socket) {
        socket.on('/auth/signup', this.onSignup(socket));
    }

    onSignup(socket: Socket) {
        return (message: SignUpMessage) => {
            const errors = validateSignUp(message);
            this.sendSignupStatus(socket, errors ? errors[0] : 0);
        }
    }

    sendSignupStatus(socket: Socket, status: number) {
        socket.send('/auth/signupstatus', status);
    }
}
