// dummy data
const accounts = [{
  username: "username",
  email: "email@gmail.com",
  password: "1234"
}, {
  username: "username2",
  email: "email@yahoo.com",
  password: "1234"
}
];


const homeButton = document.querySelector(".js-home-button");
homeButton.addEventListener("click", () => {
  window.location.href = "index.html";
})

// compare data
const form = document.getElementById("login-form");

form.addEventListener("submit", (event) => {
  event.preventDefault();

  const formData = new FormData(form);

  const usernameEmail = formData.get("username-email").trim();
  const password = formData.get("password").trim();


  const account = accounts.find((user) =>
    (user.username === usernameEmail || user.email === usernameEmail) &&
    user.password === password
  );


  if (account) {
    console.log("success");
    window.location.replace("index.html");
  } else {
    console.log("fail");
    const loginFailMessage = document.querySelector(".js-login-fail-message");
    loginFailMessage.classList.add("show");
    const loginFailButton = document.querySelector(".js-login-fail-button");
    loginFailButton.addEventListener("click", () => {
      loginFailMessage.classList.remove("show");
    })

    form.reset();
  }

});


