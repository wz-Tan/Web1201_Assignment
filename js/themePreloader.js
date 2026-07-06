function isFireFox() {
  return navigator.userAgent.includes("Firefox");
}

// Load saved theme on page load (carry between pages)
const savedTheme = isFireFox()
  ? window.sessionStorage.getItem("theme")
  : window.localStorage.getItem("theme");
if (savedTheme === "dark") {
  document.documentElement.classList.add("dark");
}
