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

    async get10Matches(user: User, index: number): Promise<User[]> {
        const result: User[] = [];

        const data = await matchServiceRequest(`/top/10/${index}/${user.matchServiceId}`);

        for (const match of JSON.parse(data).success.split(',')) {
            result.push(this.database.getUserByMatchServiceId(Number(match.replace(' ', ''))));
        }

        return result;
    }

    async get10MatchesIds(user: User, index: number): Promise<number[]> {
        return (await this.get10Matches(user, index)).map(user => user.matchServiceId);
    }
}
