const socket = io('localhost:3000');

const tokenElement = document.getElementById('token');
const emailElement = document.getElementById('email');
const passwordElement = document.getElementById('password');
const nameElement = document.getElementById('name');
const birthdayElement = document.getElementById('birthday');
const opinionsElement = document.getElementById('opinions');
const getUserElement = document.getElementById('get-user');
const indexElement = document.getElementById('index');
const matchUserElement = document.getElementById('match-user');
const chatUserElement = document.getElementById('chat-user');
const messageElement = document.getElementById('message');
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

socket.on('/user/getstatus', (status, user) => {
    log(`Received user get status ${status}. User: ${user.name}`);
});

socket.on('/candidates/list', (status, candidates) => {
    log(`Received candidates list status ${status}. Candidates ${candidates}.`);
});

socket.on('/candidates/matchstatus', status => {
    log(`Received candidate match status ${status}.`);
});

socket.on('/chat/sendstatus', status => {
    log(`Received chat send status ${status}.`);
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
        name: nameElement.value,
        password: passwordElement.value,
        opinions: JSON.parse(opinionsElement.value),
    });
}

function getUser() {
    log(`Getting user ${getUserElement.value}...`);
    socket.emit('/user/get', {
        token: tokenElement.value,
        userId: getUserElement.value,
    })
}

function requestCandidates() {
    log(`Requesting candidates starting at ${indexElement.value}...`);
    socket.emit('/candidates/get', {
        token: tokenElement.value,
        index: indexElement.value,
    });
}

function requestMatch() {
    log(`Requesting match with ${matchUserElement.value}...`);
    socket.emit('/candidates/match', {
        token: tokenElement.value,
        user: matchUserElement.value,
    });
}

function sendChat() {
    log(`Sending message ${messageElement.value} to ${chatUserElement.value}...`);
    socket.emit('/chat/send', {
        token: tokenElement.value,
        user: chatUserElement.value,
        message: messageElement.value,
    });
}
