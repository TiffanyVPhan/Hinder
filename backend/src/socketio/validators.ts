import {SignUpMessage} from "./messages";
import {CONFIG} from "../config";

const EMAIL_REGEX = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

const ERRORS = {
    InvalidEmail: 1,
    InvalidPassword: 2,
    InvalidBirthday: 3,
};

function validateEmail(email: string): number[] {
    return EMAIL_REGEX.test(email) ? [] : [ERRORS.InvalidEmail];
}

function validatePassword(username: string): number[] {
    return username.length < CONFIG.maxPasswordLength ? [] : [ERRORS.InvalidPassword];
}

function validateBirthday(birthday: string): number[] {
    // TODO
    return [];
}

export function validateSignUp(message: SignUpMessage): number[] {
    return validateEmail(message.email).concat(validatePassword(message.password))
                                       .concat(validateBirthday(message.birthday));
}
