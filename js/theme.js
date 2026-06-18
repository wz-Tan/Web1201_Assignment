// Purely For Theme Switching and Saving Themes
const themeButton = document.querySelector(".btn-theme");

// Toggle current page, change local storage in the background
themeButton.addEventListener("click", () => {
  const isDark = document.documentElement.classList.toggle("dark");
  themeButton.textContent = isDark ? "☀️" : "🌙";
  localStorage.setItem("theme", isDark ? "dark" : "light");
});

// First load doesnt trigger color transitions and button content
window.addEventListener("load", () => {
  document.documentElement.classList.add("transition-allowed");
  const savedTheme = localStorage.getItem("theme");
  themeButton.textContent = savedTheme === "dark" ? "☀️" : "🌙";
});

//  For Header Usage 
const headerButton = document.querySelector(".btn-header")