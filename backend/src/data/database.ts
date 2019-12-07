import {User} from "./user";

export class Database {
    public users: User[];

    constructor() {
        this.users = [];
    }


    addUser(email: string, password: string) {
        const user = new User(email, password);
        this.users.push(user);
    }

    getUserByToken(token: string): User | undefined {
        for (const user of this.users)
            if (user.token === token)
                return user;
    }

    getUserByEmail(email: string): User | undefined {
        for (const user of this.users)
            if (user.email === email)
                return user;
    }
}
