export interface SignupMessage {
    email: string,
    password: string,
    birthday: string,
}

export interface LoginMessage {
    email: string,
    password: string,
}

export interface SettingsUpdateMessage {
    token: string,
    name: string,
    birthday: string,
    opinions: {[key: string]: number}
}
