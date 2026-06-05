let currentStep = 1;
const previousButton = document.querySelector(".js-previous-button");
const nextButton = document.querySelector(".js-next-button");
const loginButton = document.querySelector(".js-login-button");
const homeButton = document.querySelector(".js-home-button");
const progressFill = document.querySelector(".progress-fill");
const usernameInput = document.getElementById("username");
const emailInput = document.getElementById("email");
const passwordInput = document.getElementById("password");
const confirmPasswordInput = document.getElementById("confirm-password");
const showPasswordButton = document.querySelector(".js-show-password-button")
const showConfirmPasswordButton = document.querySelector(".js-show-confirm-password-button")


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


function validateUsername() {
  const username = usernameInput.value.trim();

  return (
    username.length >= 4 &&
    !username.includes(" ")
  );
};

function validateEmail() {
  const email = emailInput.value.trim();

  return (
    !email.includes(" ") &&
    !email.startsWith("@") &&
    email.includes("@") &&
    (email.endsWith(".com") ||
      email.endsWith(".sunway.edu.my"))
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

  return (strongPassword &&
    password === confirm
  );
};

///////////////////////

loginButton.addEventListener("click", () => {
  window.location.href = "login.html";
});

homeButton.addEventListener("click", () => {
  window.location.href = "index.html";
});


function showPreviousButton() {
  if (currentStep === 1) {
    previousButton.classList.add("hide");
  } else {
    previousButton.classList.remove("hide");
  };
};



//for user input

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

function createAccount() {
  window.location.replace("index.html");
};


function updateNextButton() {
  let isValid;
  if (currentStep === 1) {
    isValid = validateUsername();
  }
  else if (currentStep === 2) {
    isValid = validateEmail();
  }
  else if (currentStep === 3) {
    isValid = validatePassword();
  } else {
    isValid = true;
  }
  nextButton.disabled = !isValid;
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
    createAccount();
  } else {
    nextStep();
  }
});

previousButton.addEventListener("click", () => {
  previousStep();
});
