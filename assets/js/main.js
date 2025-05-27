/**
 * Theming.
 *
 * Supports the preferred color scheme of the operation system as well as
 * the theme choice of the user.
 *
 */
const themeToggle = document.querySelector(".theme-toggle");
const chosenTheme = window.localStorage && window.localStorage.getItem("theme");
const chosenThemeIsDark = chosenTheme == "dark";
const chosenThemeIsLight = chosenTheme == "light";

// Detect the color scheme the operating system prefers.
function detectOSColorTheme() {
  const darkThemeStyles = document.getElementById("inlined-dark-theme-styles");
  const lightThemeStyles = document.getElementById("inlined-light-theme-styles");

  if (chosenThemeIsDark) {
    document.documentElement.setAttribute("data-theme", "dark");
    darkThemeStyles.media = "all";
    lightThemeStyles.media = "not all";

  } else if (chosenThemeIsLight) {
    document.documentElement.setAttribute("data-theme", "light");
    darkThemeStyles.media = "not all";
    lightThemeStyles.media = "all";

  } else if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
    document.documentElement.setAttribute("data-theme", "dark");
    localStorage.setItem("theme", "dark");
    darkThemeStyles.media = "all";
    lightThemeStyles.media = "not all";

  } else {
    document.documentElement.setAttribute("data-theme", "light");
    localStorage.setItem("theme", "light");
    darkThemeStyles.media = "not all";
    lightThemeStyles.media = "all";
  }
}

// Switch the theme.
function switchTheme(e) {
  if (chosenThemeIsDark) {
    localStorage.setItem("theme", "light");

  } else if (chosenThemeIsLight) {
    localStorage.setItem("theme", "dark");

  } else {
    if (document.documentElement.getAttribute("data-theme") == "dark") {
      localStorage.setItem("theme", "light");

    } else {
      localStorage.setItem("theme", "dark");
    }
  }

  detectOSColorTheme();
  window.location.reload();
}

// Event listener
if (themeToggle) {
  themeToggle.addEventListener("click", switchTheme, false);
  window
    .matchMedia("(prefers-color-scheme: dark)")
    .addEventListener("change", (e) => e.matches && detectOSColorTheme());
  window
    .matchMedia("(prefers-color-scheme: light)")
    .addEventListener("change", (e) => e.matches && detectOSColorTheme());

  detectOSColorTheme();
} else {
  localStorage.removeItem("theme");
}
