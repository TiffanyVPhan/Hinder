import {Communication} from "./socketio/socketio";
import {Database} from "./data/database";
import {Validator} from "./socketio/validators";


function main() {
    let database = new Database();
    let validator = new Validator(database);
    let communication = new Communication(database, validator);
}

main();
