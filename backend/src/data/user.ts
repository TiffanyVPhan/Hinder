import {matchServiceRequest} from "../network/request";


function generateToken(): string {
    // TODO: Tokens need to be unique.
    return Math.floor(Math.random() * 99999).toString();
}

export class User {
    public token: string;
    public name: string;
    public birthday: string;
    public opinions: {[key: string]: number};

    public matchServiceId: number;

    constructor(
        public email: string,
        public password: string,
    ) {
        matchServiceRequest('/create', data => {
            this.matchServiceId = Number(JSON.parse(data).success);
        });
    }

    newToken() {
        this.token = generateToken();
        return this.token;
    }

    updateSettings(name: string, birthday: string, opinions: {[key: string]: number}) {
        this.name = name;
        this.birthday = birthday;
        this.opinions = opinions;
    }
}
