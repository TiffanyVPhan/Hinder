import {User} from "../data/user";
import {Database} from "../data/database";


export class MatchMaker {
    constructor(
        private database: Database,
    ) {}

    getAllUsersExcept(currentUser: User): User[] {
        const result: User[] = [];
        for (const user of this.database.users)
            if (user !== currentUser)
                result.push(user);

        return result;
    }

    get10Matches(user: User, lastIndex: number): User[] {
        // TODO (Evan/Harsh)

        // Get a list of at most 10 matches starting at `lastIndex`.

        // Temp
        return this.getAllUsersExcept(user);
    }
}
