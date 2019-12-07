import {createServer, Server as HTTPServer} from 'http'
import * as SocketIO from 'socket.io';
import {Server as SocketIOServer, Socket, } from 'socket.io';
import {CONFIG} from '../config'
import {SignUpMessage} from "./messages";
import {has, no, Validator} from "./validators";
import {Database} from "../data/database";


export class Communication {
    private readonly httpServer: HTTPServer;
    private readonly socketIOServer: SocketIOServer;

    constructor(
        private database: Database,
        private validator: Validator,
    ) {
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
        socket.on('/auth/signup', this.onSignup(socket).bind(this));
        socket.on('/auth/login', this.onLogin(socket).bind(this));
    }

    onSignup(socket: Socket) {
        return (message: SignUpMessage) => {
            const errors = this.validator.signUpValid(message);

            if (no(errors))
                this.database.addUser(message.email, message.password);

            this.sendSignupStatus(socket, has(errors) ? errors[0] : 0);
        }
    }

    onLogin(socket: Socket) {
        return (message: SignUpMessage) => {
            // TODO
        }
    }

    sendSignupStatus(socket: Socket, status: number) {
        socket.emit('/auth/signupstatus', status);
    }
}
