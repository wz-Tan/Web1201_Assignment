const signOut = document.querySelectorAll(".js-sign-out");
signOut.forEach((anchor) => {
    anchor.addEventListener('click', () => {
      alert('Signing out...');
      localStorage.removeItem('login');
      window.location.replace("/index.html");
    });
});

const isLoggedIn = JSON.parse(localStorage.getItem('login')) || false;
function checkAuth() {
  if (!isLoggedIn) {
    alert("Please log in first");
    window.location.replace("/index.html");
  };
};

checkAuth();
window.addEventListener('pageshow', checkAuth);