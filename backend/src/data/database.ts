import {User} from "./user";

export class Database {
    public users: User[];

    constructor() {
        this.users = [];

        // this.addUser('test@test.com', 'i love harsh');
        // this.addUser('test2@test.com', 'i love harsh evan');
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

    getUserByMatchServiceId(id: number): User | undefined {
        for (const user of this.users) {
            if (user.matchServiceId == id) // This has to be a double equals and I don't know why
                return user;
        }
    }
}
