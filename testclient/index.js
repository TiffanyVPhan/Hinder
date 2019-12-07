const socket = io('localhost:3000');

const logElement = document.getElementById('log');
const emailElement = document.getElementById('email');
const passwordElement = document.getElementById('password');


log('Connecting to server...');

socket.on('connect', () => {
    log('Connected to server.');
});

socket.on('/auth/signupstatus', status => {
    log(`Received signup status ${status}.`);
});

function log(message) {
    let messageElement = document.createElement('p');
    messageElement.innerText = message;
    logElement.appendChild(messageElement);
}

function signUp() {
    log(`Signing up with email ${emailElement.value} and password ${emailElement.value}...`);
    socket.emit('/auth/signup', {'email': emailElement.value, 'password': passwordElement.value})
}
