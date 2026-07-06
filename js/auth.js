const signOut = document.querySelectorAll(".js-sign-out");
signOut.forEach((anchor) => {
    isInner = anchor.classList.contains('inner-page');
    anchor.addEventListener('click', () => {
      alert('Signing out...');
      removeItem('login');
      window.location.replace(
       isInner
       ? "../index.html" 
       : "./index.html"
      );
    });
});

// for firefox
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
        return window.sessionStorage.removeItem(key);
    } else {
        return window.localStorage.removeItem(key);
    }
}
/////////////////
function checkAuth() {
  const isLoggedIn = JSON.parse(getItem('login')) || false;
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