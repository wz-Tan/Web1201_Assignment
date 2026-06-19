// Purely For Theme Switching and Saving Themes
const themeButtons = document.querySelectorAll(".btn-theme");

function toggleTheme() {
  const isDark = document.documentElement.classList.toggle("dark");
  themeButtons.forEach((btn) => (btn.textContent = isDark ? "☀️" : "🌙"));
  localStorage.setItem("theme", isDark ? "dark" : "light");
}

themeButtons.forEach((btn) => btn.addEventListener("click", toggleTheme));

// First load doesnt trigger color transitions and button content
window.addEventListener("load", () => {
  document.documentElement.classList.add("transition-allowed");
  const savedTheme = localStorage.getItem("theme");
  themeButtons.forEach(
    (btn) => (btn.textContent = savedTheme === "dark" ? "☀️" : "🌙"),
  );
});

//  For Header Usage
const headerButton = document.querySelector(".mobile .btn-header");
const headerDropdown = document.querySelector(".mobile .header-dropdown");
headerButton.addEventListener("click", () => {
  headerDropdown.classList.toggle("active");
});
