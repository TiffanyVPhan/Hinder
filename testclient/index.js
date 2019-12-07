const socket = io('localhost:3000');

const logElement = document.getElementById('log');
const emailElement = document.getElementById('email');
const passwordElement = document.getElementById('password');


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

socket.on('/auth/loginstatus', status => {
    log(`Received login status ${status}.`);
});

function signUp() {
    log(`Signing up with email ${emailElement.value} and password ${emailElement.value}...`);
    socket.emit('/auth/signup', {'email': emailElement.value, 'password': passwordElement.value})
}

function logIn() {
    log(`Logging in with email ${emailElement.value} and password ${emailElement.value}...`);
    socket.emit('/auth/login', {'email': emailElement.value, 'password': passwordElement.value})
}
