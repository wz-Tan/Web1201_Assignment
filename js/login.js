// dummy data
const accounts =
  JSON.parse(getItem('accounts')) || [
    {
      username: "username",
      email: "email@gmail.com",
      password: "1234",
    },
    {
      username: "username2",
      email: "email@yahoo.com",
      password: "1234",
    },
  ];

//get all variables needed including the input and button elements
const passwordInput = document.getElementById("password");
const showPasswordButton = document.querySelector(".js-show-password-button");
const usernameEmailInput = document.getElementById("username-email");
const loginButton = document.querySelector(".js-login-button");

//disable login button for the incomplete form

//Init for the first time
loginButton.disabled = !(passwordInput.value && usernameEmailInput.value);

//keep tracking user input to enable/disable the login button
const inputElements = document.querySelectorAll("input");
inputElements.forEach(input => {
  input.addEventListener("input", () => {
    loginButton.disabled = !(passwordInput.value && usernameEmailInput.value);
  });
});

//show password
showPasswordButton.addEventListener("click", () => {
  changeButtonText(showPasswordButton);
  showPassword(passwordInput);
});

//change the text between Hide and Show
function changeButtonText(buttonElement) {
  let buttonText = buttonElement.innerHTML;
  if (buttonText.trim() === "Show") {
    buttonText = "Hide";
  } else {
    buttonText = "Show";
  }
  buttonElement.innerHTML = buttonText;
}

//change the input type
function showPassword(password) {
  if (password.type === "password") {
    password.type = "text";
  } else {
    password.type = "password";
  }
}

// for firefox used
function isFireFox() {
    return navigator.userAgent.includes('Firefox');
}

function setItem(key, value) {
    if (isFireFox()) {
        window.sessionStorage.setItem(key, value);
    } else {
        window.localStorage.setItem(key, value);
    }
}

function getItem(key) {
    if (isFireFox()) {
        return window.sessionStorage.getItem(key);
    } else {
        return window.localStorage.getItem(key);
    }
}
//////////////
// compare data
const form = document.getElementById("login-form");

form.addEventListener("submit", (event) => {
  event.preventDefault();

  const formData = new FormData(form);

  const usernameEmail = formData.get("username-email").trim();
  const password = formData.get("password").trim();

  //the first input can be either username or email
  const account = accounts.find(
    (user) =>
      (user.username === usernameEmail || user.email === usernameEmail) &&
      user.password === password,
  );

  //successfully login store the loginAccount
  //else an error message will be displayed
  if (account) {
    // setItem('login', JSON.stringify(true));
    setItem('loginAccount', JSON.stringify(account));
    window.location.replace("home.html");
  } else {
    const loginFailMessage = document.querySelector(".js-login-fail-message");
    loginFailMessage.classList.add("show");
    const loginFailButton = document.querySelector(".js-login-fail-button");
    loginFailButton.addEventListener("click", () => {
      loginFailMessage.classList.remove("show");
    });

    //reset the form anyway and check for the button availablity again
    form.reset();
    loginButton.disabled = !(passwordInput.value && usernameEmailInput.value);
  }
});

//scroll to the input field smoothly if screen is not enough height to display the entire page
document.querySelector(".userinfo").scrollIntoView({
  behavior: "smooth",
  block: "start",
});
