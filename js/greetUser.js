const greetingTextElement = document.querySelector(".greeting-text");
const account = JSON.parse(getItem('loginAccount'));
const username = account.username;
greetingTextElement.textContent = `Welcome to SigmaStore, ${username}`;

// for firefox use
function isFireFox() {
    return navigator.userAgent.includes('Firefox');
}

function getItem(key) {
    if (isFireFox()) {
        return window.sessionStorage.getItem(key);
    } else {
        return window.localStorage.getItem(key);
    }
}
