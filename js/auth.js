const signOut = document.querySelectorAll(".js-sign-out");
signOut.forEach((anchor) => {
    isInner = anchor.classList.contains('inner-page');
    anchor.addEventListener('click', () => {
      alert('Signing out...');
      localStorage.removeItem('login');
      window.location.replace(
       isInner
       ? "../index.html" 
       : "./index.html"
      );
    });
});

const isLoggedIn = JSON.parse(localStorage.getItem('login')) || false;
function checkAuth() {
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