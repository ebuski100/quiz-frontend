const usernameInput = document.getElementById("username");
const ageInput = document.getElementById("age");

const quitBtn = document.querySelector(".notInterested");
const regSubmitBtn = document.querySelector(".regSubmitBtn");
console.log(regSubmitBtn);

const isGithubPages = window.location.hostname.includes("github.io");
const base = isGithubPages ? "/quiz-app/" : "../";
document
  .getElementById("registerForm")
  .addEventListener("submit", function (e) {
    e.preventDefault();

    const username = document.getElementById("username").value.trim();
    const age = document.getElementById("age").value;

    localStorage.setItem("username", username);
    localStorage.setItem("age", age);
    localStorage.setItem("showWelcome", "true");
    window.location.href = base + "homepage/home.html";
  });

const buttons = document.querySelectorAll(".btn");
let soundState = localStorage.getItem("soundState") || "on";

const soundEffect = document.getElementById("soundEffect");
buttons.forEach((button) => {
  console.log(soundState);
  button.addEventListener("click", () => {
    if (soundState === "on") {
      soundEffect.currentTime = 0;
      soundEffect.play();
    }
  });
});

quitBtn.addEventListener("click", () => {
  location.href = "https://www.google.com";
});
