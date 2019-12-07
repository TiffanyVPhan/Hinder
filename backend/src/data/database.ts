import {User} from "./user";

export class Database {
    public users: User[];

    addUser(email: string, password: string) {
        const user = new User(email, password);
        this.users.push(user);
    }

    getUserByEmail(email: string): User | undefined {
        for (const user of this.users)
            if (user.email === email)
                return user;
    }
}
