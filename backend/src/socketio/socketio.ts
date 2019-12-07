import {createServer, Server as HTTPServer} from 'http'
import * as SocketIO from 'socket.io';
import {Server as SocketIOServer, Socket, } from 'socket.io';
import {CONFIG} from '../config'
import {LoginMessage, SettingsUpdateMessage, SignupMessage} from "./messages";
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
        socket.on('/settings/update', this.onSettingsUpdate(socket).bind(this));
    }

    onSignup(socket: Socket) {
        return (message: SignupMessage) => {
            const errors = this.validator.signupValid(message);

            if (no(errors))
                this.database.addUser(message.email, message.password);

            this.sendSignupStatus(socket, has(errors) ? errors[0] : 0);
        }
    }

    onLogin(socket: Socket) {
        return (message: LoginMessage) => {
            const errors = this.validator.loginValid(message);

            let token: string;
            if (no(errors))
                token = this.database.getUserByEmail(message.email)!.newToken();

            this.sendLoginStatus(socket, has(errors) ? errors[0] : 0, token);
        }
    }

    onSettingsUpdate(socket: Socket) {
        return (message: SettingsUpdateMessage) => {
            const errors = this.validator.settingsUpdateValid(message);

            if (no(errors))
                this.database.getUserByToken(message.token).updateSettings(
                    message.name,
                    message.birthday,
                    message.opinions,
                );

            this.sendSettingsUpdateStatus(socket, has(errors) ? errors[0] : 0);
        }
    }

    sendSignupStatus(socket: Socket, status: number) {
        socket.emit('/auth/signupstatus', status);
    }

    sendLoginStatus(socket: Socket, status: number, token: string) {
        socket.emit('/auth/loginstatus', status, token);
    }

    sendSettingsUpdateStatus(socket: Socket, status: number) {
        socket.emit('/settings/updatestatus', status);
    }
}
