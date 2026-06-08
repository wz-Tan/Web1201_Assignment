// Purely For Theme Switching and Saving Themes
const themeButton = document.querySelector(".btn-theme");

// Load saved theme on page load (carry between pages)
const savedTheme = localStorage.getItem("theme");
if (savedTheme === "dark") {
  document.documentElement.classList.add("dark");
  themeButton.textContent = "☀️";
} else {
  themeButton.textContent = "🌙";
}

// Toggle current page, change local storage in the background
themeButton.addEventListener("click", () => {
  const isDark = document.documentElement.classList.toggle("dark");
  themeButton.textContent = isDark ? "☀️" : "🌙";
  localStorage.setItem("theme", isDark ? "dark" : "light");
});

// First load doesnt trigger color transitions
window.addEventListener("load", () => {
  console.log("Transitions now allowed");
  document.documentElement.classList.add("transition-allowed");
});
