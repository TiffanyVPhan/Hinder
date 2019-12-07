import {SignUpMessage} from "./messages";
import {CONFIG} from "../config";
import {Database} from "../data/database";

const EMAIL_REGEX = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

const ERRORS = {
    InvalidEmail: 1,
    InvalidPassword: 2,
    InvalidBirthday: 3,
    EmailTaken: 4,
};

export function no(errors) {
    return !errors.length;
}

export function has(errors) {
    return !no(errors);
}

export class Validator {
    constructor(
        private database: Database
    ) {}

    emailValid(email: string): number[] {
        return EMAIL_REGEX.test(email) ? [] : [ERRORS.InvalidEmail];
    }

    passwordValid(username: string): number[] {
        return username.length < CONFIG.maxPasswordLength ? [] : [ERRORS.InvalidPassword];
    }

    birthdayValid(birthday: string): number[] {
        // TODO
        return [];
    }

    emailUnused(email: string): number[] {
        return this.database.getUserByEmail(email) ? [ERRORS.EmailTaken] : [];
    }

    signUpValid(message: SignUpMessage): number[] {
        return this.emailValid(message.email).concat(this.passwordValid(message.password))
                                             .concat(this.birthdayValid(message.birthday))
                                             .concat(this.emailUnused(message.email));
    }
}

