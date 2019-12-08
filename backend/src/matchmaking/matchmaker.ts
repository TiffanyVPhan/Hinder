import {User} from "../data/user";
import {Database} from "../data/database";
import {matchServiceRequest} from "../network/request";


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

    get10Matches(user: User, index: number): User[] {
        // TODO (Evan/Harsh)

        // Get a list of at most 10 matches starting at `lastIndex`.

        matchServiceRequest(`/prefs/${user.matchServiceId}`, data => {
            JSON.parse(data).success.split(',').forEach(opinion => {
                Number(opinion)
            });
        });

        // Temp
        return this.getAllUsersExcept(user);
    }

    get10MatchesIds(user: User, index: number): number[] {
        return this.get10Matches(user, index).map(user => user.matchServiceId);
    }
}
