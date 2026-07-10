//get all the variables needed
//greeting text, account and username
const greetingTextElement = document.querySelector(".greeting-text");
const account = JSON.parse(getItem('loginAccount'));
const username = account.username;

//rendering the greeting text
greetingTextElement.textContent = `Welcome back, ${username}`;

// for firefox used
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
