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
    opinions: number[],
}

export interface CandidatesGetMessage {
    token: string,
    index: number,
}

export interface UserGetMessage {
    token: string,
    userId: number,
}
