import {User} from "../data/user";
import {Match} from "./match";
import {Database} from "../data/database";

export class MatchMaker {
    constructor(
        private database: Database,
    ) {}

    get10Matches(user: User, lastIndex: number): Match[] {
        // TODO (Evan/Harsh)

        // Get a list of at most 10 matches starting at `lastIndex`.

        return [];
    }
}
