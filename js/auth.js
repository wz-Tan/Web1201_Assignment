//Clicking sign out button triggers this
//Alert a message and redirect user to index.html
const signOut = document.querySelectorAll(".js-sign-out");
signOut.forEach((anchor) => {
    //Check the file is in root or inner directory
    isInner = anchor.classList.contains('inner-page');
    anchor.addEventListener('click', () => {
      alert('Signing out...');
      removeItem('loginAccount');
      window.location.replace(
       isInner
       ? "../index.html" 
       : "./index.html"
      );
    });
});

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

function removeItem(key) {
  if (isFireFox()) {
        window.sessionStorage.removeItem(key);
    } else {
        window.localStorage.removeItem(key);
    }
}
/////////////////

//Authentication guard
//prevent user from access to the web without login
function checkAuth() {
  const isLoggedIn = JSON.parse(getItem('loginAccount')) || false;
  if (!isLoggedIn) {
    alert("Please log in first");
    window.location.replace(
      document.body.classList.contains('inner-page')
      ? "../index.html"
      : "./index.html"
    );
  };
};

checkAuth();
window.addEventListener('pageshow', checkAuth);