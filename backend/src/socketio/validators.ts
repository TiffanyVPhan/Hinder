import {CandidatesGetMessage, LoginMessage, SettingsUpdateMessage, SignupMessage, UserGetMessage} from "./messages";
import {CONFIG} from "../config";
import {Database} from "../data/database";

const EMAIL_REGEX = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

const ERRORS = {
    InvalidEmail: 1,
    InvalidPassword: 2,
    InvalidBirthday: 3,
    EmailTaken: 4,
};

export function no(errors: number[]) {
    return !errors.length;
}

export function has(errors: number[]) {
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

    signupValid(message: SignupMessage): number[] {
        return this.emailValid(message.email).concat(this.passwordValid(message.password))
                                             .concat(this.birthdayValid(message.birthday))
                                             .concat(this.emailUnused(message.email));
    }

    loginValid(message: LoginMessage): number[] {
        // TODO
        return [];
    }

    settingsUpdateValid(message: SettingsUpdateMessage): number[] {
        // TODO
        return [];
    }

    userGetValid(message: UserGetMessage): number[] {
        // TODO
        return [];
    }

    candidateGetValid(message: CandidatesGetMessage): number[] {
        // TODO
        return [];
    }
}
