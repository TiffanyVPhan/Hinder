const socket = io('localhost:3000');

const tokenElement = document.getElementById('token');
const emailElement = document.getElementById('email');
const passwordElement = document.getElementById('password');
const nameElement = document.getElementById('name');
const birthdayElement = document.getElementById('birthday');
const opinionsElement = document.getElementById('opinions');
const indexElement = document.getElementById('index');
const candidateListElement = document.getElementById('candidateList');
const logElement = document.getElementById('log');


function log(message) {
    let messageElement = document.createElement('p');
    messageElement.innerText = message;
    logElement.appendChild(messageElement);
}

log('Connecting to server...');

socket.on('connect', () => {
    log('Connected to server.');
});

socket.on('/auth/signupstatus', status => {
    log(`Received signup status ${status}.`);
});

socket.on('/auth/loginstatus', (status, token) => {
    log(`Received login status ${status}. Token: ${token}`);
    tokenElement.value = token;
});

socket.on('/settings/updatestatus', status => {
    log(`Received settings update status ${status}.`);
});

socket.on('/candidates/list', (status, candidates) => {
    log(`Received candidates list status ${status}. Candidates ${candidates}.`);
});

function signUp() {
    log(`Signing up with email ${emailElement.value} and password ${passwordElement.value}...`);
    socket.emit('/auth/signup', {
        email: emailElement.value,
        password: passwordElement.value,
    });
}

function logIn() {
    log(`Logging in with email ${emailElement.value} and password ${passwordElement.value}...`);
    socket.emit('/auth/login', {
        email: emailElement.value,
        password: passwordElement.value,
    });
}

function updateSettings() {
    log(`Updating setting name to ${nameElement.value}, birthday to ${birthdayElement.value}, and opinions to ${opinionsElement.value}...`);
    socket.emit('/settings/update', {
        token: tokenElement.value,
        name: emailElement.value,
        password: passwordElement.value,
        opinions: JSON.parse(opinionsElement.value),
    });
}

function requestCandidates() {
    log(`Requesting candidates starting at ${indexElement.value}...`);
    socket.emit('/candidates/get', {
        token: tokenElement.value,
        index: indexElement.value,
    })
}
