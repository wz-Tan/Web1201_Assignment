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


const passwordInput = document.getElementById("password");
const showPasswordButton = document.querySelector(".js-show-password-button");
const usernameEmailInput = document.getElementById("username-email");
const loginButton = document.querySelector(".js-login-button");

//disable login button for the empty form
const inputElements = document.querySelectorAll("input");
inputElements.forEach(input => {
  input.addEventListener("input", () => {
    console.log(!(passwordInput.value ||usernameEmailInput.value))
    loginButton.disabled = !(passwordInput.value || usernameEmailInput.value);
  });
});

//show password
showPasswordButton.addEventListener("click", () => {
  changeButtonText(showPasswordButton);
  showPassword(passwordInput);
});

function changeButtonText(buttonElement) {
  let buttonText = buttonElement.innerHTML;
  if (buttonText.trim() === "Show") {
    buttonText = "Hide";
  } else {
    buttonText = "Show";
  }
  buttonElement.innerHTML = buttonText;
}

function showPassword(password) {
  if (password.type === "password") {
    password.type = "text";
  } else {
    password.type = "password";
  }
}

//disable the button for the empty form



////////
// for firefox use
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

  const account = accounts.find(
    (user) =>
      (user.username === usernameEmail || user.email === usernameEmail) &&
      user.password === password,
  );

  if (account) {
    console.log("success");
    // setItem('login', JSON.stringify(true));
    setItem('loginAccount', JSON.stringify(account));
    window.location.replace("home.html");
  } else {
    console.log("fail");
    const loginFailMessage = document.querySelector(".js-login-fail-message");
    loginFailMessage.classList.add("show");
    const loginFailButton = document.querySelector(".js-login-fail-button");
    loginFailButton.addEventListener("click", () => {
      loginFailMessage.classList.remove("show");
    });

    form.reset();
  }
});

document.querySelector(".userinfo").scrollIntoView({
  behavior: "smooth",
  block: "start",
});
