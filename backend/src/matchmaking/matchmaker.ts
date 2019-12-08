import {User} from "../data/user";
import {Match} from "./match";

export class MatchMaker {
    async get10Matches(user: User, offset: number): Match[] {
        const response = await fetch(`http://localhost:3000/prefs/top/10/${offset}/${user.prefServId}`)
        return response;
    }
}
