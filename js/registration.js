//get all variables needed including all buttons and inputs
//every steps needed
let currentStep = 1;
const previousButton = document.querySelector(".js-previous-button");
const nextButton = document.querySelector(".js-next-button");
const progressFill = document.querySelector(".progress-fill");
//username step
const usernameInput = document.getElementById("username");
const usernameRepeatedMessage = document.querySelector(".js-repeated-message-username");
//email step
const emailInput = document.getElementById("email");
const emailRepeatedMessage = document.querySelector(".js-repeated-message-email");
//password step
const passwordInput = document.getElementById("password");
const confirmPasswordInput = document.getElementById("confirm-password");
const showPasswordButton = document.querySelector(".js-show-password-button");
const showConfirmPasswordButton = document.querySelector(".js-show-confirm-password-button");

//for firefox used
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

//accounts = { username, email, password }
//load accounts from storage, if not then assign some dummy values
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
//make sure password and confirm password work independently
showPasswordButton.addEventListener("click", () => {
  changeButtonText(showPasswordButton);
  showPassword(passwordInput);
});
showConfirmPasswordButton.addEventListener("click", () => {
  changeButtonText(showConfirmPasswordButton);
  showPassword(confirmPasswordInput);
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
  };
}


//validation
//tracking the inputs so next button state update on live
usernameInput.addEventListener("input", updateNextButton);
emailInput.addEventListener("input", updateNextButton);
passwordInput.addEventListener("input", updateNextButton);
confirmPasswordInput.addEventListener("input", updateNextButton)

//return true if input value matches stored accounts
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



//show previous button
//only showing previous button after the 1st step
function showPreviousButton() {
  if (currentStep === 1) {
    previousButton.classList.add("hide");
  } else {
    previousButton.classList.remove("hide");
  };
};



//for user input steps
//inactivate current step while moving forward/backward
function removeActiveStep() {
  const activeStepProgress = document.querySelector(`.step-${currentStep}`)
  const activeStep = document.getElementById(`step-${currentStep}`);
  activeStepProgress.classList.remove("active");
  activeStep.classList.remove("active");
}

//activate next or previous step while moving rward/backward
function addActiveStep() {
  const activeStepProgress = document.querySelector(`.step-${currentStep}`);
  const activeStep = document.getElementById(`step-${currentStep}`);
  activeStepProgress.classList.add("active");
  activeStep.classList.add("active");
}


//for progress bar
//done step circle(s) display in green colour
function addDoneStep() {
  const activeStep = document.querySelector(`.step-${currentStep}`);
  activeStep.classList.add("done");
}

function removeDoneStep() {
  const activeStep = document.querySelector(`.step-${currentStep}`);
  activeStep.classList.remove("done");
}

//progress bar is filled with 0%, 33.33%, 66.66%, 100%
function updateProgressBar() {
  const percentage = ((currentStep - 1) / 3) * 100;

  progressFill.style.width = `${percentage}%`;
}



//rendering the page
function nextStep() {
  //validating each input before moving next
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
  //for the last (4th) step, "Next" is changed to "Create Account"
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

//return the results of validation accordingly
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

//scroll to the input field smoothly if screen is not enough height to display the entire page
function scrollToInput() {
  document
    .getElementById(`step-${currentStep}`)
    .scrollIntoView({
      behavior: "smooth",
      block: "start"
    });
}

//Init the elements rendering
showPreviousButton();
updateNextButton();
scrollToInput();

nextButton.addEventListener("click", () => {
  if (currentStep === 4) {
    retrieveUserInput();
    setItem(
      'accounts',
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




//creating an new account
//final check before storing the account
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