function generateToken(): string {
    // TODO: Tokens need to be unique.
    return Math.floor(Math.random() * 99999).toString();
}

export class User {
    public token: string;
    public name: string;
    public birthday: string;
    public opinions: {[key: string]: number};

    constructor(
        public email: string,
        public password: string
    ) {}

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
