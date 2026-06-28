// dummy data
const accounts =
  JSON.parse(localStorage.getItem('accounts')) || [
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

////////

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
    localStorage.setItem('login', JSON.stringify(true));
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
