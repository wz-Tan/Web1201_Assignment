let currentStep = 1;
const previousButton = document.querySelector(".js-previous-button");
const nextButton = document.querySelector(".js-next-button");
const progressFill = document.querySelector(".progress-fill");
const usernameInput = document.getElementById("username");
const emailInput = document.getElementById("email");
const passwordInput = document.getElementById("password");
const confirmPasswordInput = document.getElementById("confirm-password");
const showPasswordButton = document.querySelector(".js-show-password-button");
const showConfirmPasswordButton = document.querySelector(".js-show-confirm-password-button");
const usernameRepeatedMessage = document.querySelector(".js-repeated-message-username");
const emailRepeatedMessage = document.querySelector(".js-repeated-message-email");

//accounts = { username, email, password }

const accounts = JSON.parse(getItem('accounts')) || [
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


//show password

showPasswordButton.addEventListener("click", () => {
  changeButtonText(showPasswordButton);
  showPassword(passwordInput);
});
showConfirmPasswordButton.addEventListener("click", () => {
  changeButtonText(showConfirmPasswordButton);
  showPassword(confirmPasswordInput);
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
  };
}

/////////////
//validation

usernameInput.addEventListener("input", updateNextButton);
emailInput.addEventListener("input", updateNextButton);
passwordInput.addEventListener("input", updateNextButton);
confirmPasswordInput.addEventListener("input", updateNextButton)

//for firefox use
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
    if(isFireFox()) {
        window.sessionStorage.setItem(key);
    } else {
        window.localStorage.setItem(key);
    }
}
////////
function checkRepeated(inputValue, field) {
  return accounts.some(account => inputValue === account[field]);
}

function validateUsername() {
  let isRepeat;
  const username = usernameInput.value.trim();
  isRepeat = checkRepeated(username, 'username')
  if (isRepeat) {
    usernameRepeatedMessage.classList.remove('hide');
    usernameRepeatedMessage.innerHTML = `
    '${username}' has been used
    `
  } else {
    usernameRepeatedMessage.classList.add('hide');
  }
  return (
    (!isRepeat && username.length >= 4 &&
      !username.includes(" "))
      ? username
      : false
  );
};

function validateEmail() {
  let isRepeat;
  const email = emailInput.value.trim();
  isRepeat = checkRepeated(email, 'email');
  if (isRepeat) {
    emailRepeatedMessage.classList.remove('hide');
    emailRepeatedMessage.innerHTML = `
    '${email}' has been used
    `
  } else {
    emailRepeatedMessage.classList.add('hide');
  }
  return ((
    !isRepeat &&
    !email.includes(" ") &&
    !email.startsWith("@") &&
    email.includes("@") &&
    (email.endsWith(".com") ||
      email.endsWith(".sunway.edu.my")))
    ? email
    : false
  );
};

function validatePassword() {
  const password = passwordInput.value;
  const confirm = confirmPasswordInput.value;
  const strongPassword =
    password.length >= 8 &&
    /[A-Z]/.test(password) &&
    /[a-z]/.test(password) &&
    /[0-9]/.test(password) &&
    /[^a-zA-Z0-9]/.test(password);

  return ((strongPassword &&
    password === confirm)
    ? password
    : false
  );
};

///////////////////////


//show previous button

function showPreviousButton() {
  if (currentStep === 1) {
    previousButton.classList.add("hide");
  } else {
    previousButton.classList.remove("hide");
  };
};

//////////////////////


//for user input steps

function removeActiveStep() {
  const activeStepProgress = document.querySelector(`.step-${currentStep}`)
  const activeStep = document.getElementById(`step-${currentStep}`);
  activeStepProgress.classList.remove("active");
  activeStep.classList.remove("active");
}

function addActiveStep() {
  const activeStepProgress = document.querySelector(`.step-${currentStep}`);
  const activeStep = document.getElementById(`step-${currentStep}`);
  activeStepProgress.classList.add("active");
  activeStep.classList.add("active");
}

//////////////

//for progress bar

function addDoneStep() {
  const activeStep = document.querySelector(`.step-${currentStep}`);
  activeStep.classList.add("done");
}

function removeDoneStep() {
  const activeStep = document.querySelector(`.step-${currentStep}`);
  activeStep.classList.remove("done");
}

function updateProgressBar() {
  const percentage = ((currentStep - 1) / 3) * 100;

  progressFill.style.width = `${percentage}%`;
}

//////////////////////


//rendering the page

function nextStep() {
  if (currentStep >= 4) return;

  if (currentStep === 1 && !validateUsername()) {
    return;
  };

  if (currentStep === 2 && !validateEmail()) {
    return;
  };

  if (currentStep === 3 && !validatePassword()) {
    return;
  };
  removeActiveStep();
  addDoneStep();

  currentStep++;

  if (currentStep === 4) {
    nextButton.textContent = "Create Account";
  };

  addActiveStep();

  scrollToInput();

  showPreviousButton();
  updateProgressBar();
  updateNextButton();
}



function previousStep() {
  if (currentStep <= 1) return;

  removeActiveStep();

  currentStep--;

  if (currentStep < 4) {
    nextButton.textContent = "Next";
  };

  addActiveStep();
  removeDoneStep();

  scrollToInput();

  showPreviousButton();
  updateProgressBar();
  updateNextButton();
}

function getCurrentStepValue() {
  switch (currentStep) {
    case 1:
      return validateUsername();
    case 2:
      return validateEmail();
    case 3:
      return validatePassword();
    default:
      return true;
  }
}

function updateNextButton() {
  nextButton.disabled = !getCurrentStepValue();
};

function scrollToInput() {
  document
    .getElementById(`step-${currentStep}`)
    .scrollIntoView({
      behavior: "smooth",
      block: "start"
    });
}

showPreviousButton();
updateNextButton();
scrollToInput();

nextButton.addEventListener("click", () => {
  if (currentStep === 4) {
    retrieveUserInput();
    setItem(
      "accounts",
      JSON.stringify(accounts)
    );
    window.location.replace("index.html");
  } else {
    nextStep();
  }
});

previousButton.addEventListener("click", () => {
  previousStep();
});


////////////


//creating an new account

function retrieveUserInput() {
  const username = validateUsername();
  const email = validateEmail();
  const password = validatePassword();
  createAccount(username, email, password);
}

function createAccount(username, email, password) {
  if (username && email && password) {
    accounts.push({
      username,
      email,
      password
    });
  }
}
///////////////////////////