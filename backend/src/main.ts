import {Communication} from "./socketio/socketio";
import {Database} from "./data/database";
import {Validator} from "./socketio/validators";
import {MatchMaker} from "./matchmaking/matchmaker";


function main() {
    let database = new Database();
    let matchMaker = new MatchMaker(database);
    let validator = new Validator(database);
    let communication = new Communication(database, validator, matchMaker);
}

main();
