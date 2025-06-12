const username = localStorage.getItem("username");
const age = localStorage.getItem("age");

const isGithubPages = window.location.hostname.includes("github.io");
const base = isGithubPages ? "/quiz-app/" : "../";

if (!username || !age) {
  setTimeout(() => {
    window.location.href = base + "RegisterPage/register.html";
  }, 5000);
} else {
  setTimeout(() => {
    localStorage.setItem("showWelcome", "true");
    window.location.href = base + "homepage/home.html";
  }, 5000);
}
