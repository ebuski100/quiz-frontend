const userProfile = document.querySelector(".userProfile");
const profileName = document.querySelector(".profile-username");
const profileContainer = document.querySelector(".profile-container");
const savedProfileImage = localStorage.getItem("profileImage");
const coinsMaxDisplay = document.querySelector(".coinMax-cont");
const heartMaxDisplay = document.querySelector(".heartMax-cont");
const coinNum = document.querySelector(".coin-num");
const heartText = document.querySelector(".heartnum");
console.log(heartText);
const savedUsername = localStorage.getItem("username") || "Player";
const shareBtn = document.querySelector(".userinvite");
const isGithubPages = window.location.hostname.includes("github.io");
const base = isGithubPages ? "/quiz-app/" : "../";
const quitBtn = document.querySelector(".quit-btn");
const currentCoins = parseInt(localStorage.getItem("coinCount")) || 0;
let currentHeartNum = parseInt(localStorage.getItem("heartNum"));

if (currentHeartNum === null || isNaN(currentHeartNum)) {
  currentHeartNum = 5; // Set to 5 only if heartNum is not defined
  localStorage.setItem("heartNum", currentHeartNum);
}

if (profileName) {
  profileName.textContent = savedUsername;
}

heartText.textContent = currentHeartNum;
localStorage.setItem("coinCount", currentCoins);
coinNum.textContent = currentCoins;

if (currentCoins >= 5000) {
  coinsMaxDisplay.classList.add("displayMax");
} else {
  coinsMaxDisplay.classList.remove("displayMax");
}
if (currentHeartNum >= 5) {
  heartMaxDisplay.classList.add("displayMax");
} else {
  heartMaxDisplay.classList.remove("displayMax");
}
if (savedProfileImage) {
  userProfile.src = savedProfileImage;
}
const storeBtns = document.querySelectorAll(".storeBtn");
const EditBtn = document.querySelector(".edit-btn-link");
// Apply the saved theme on page load
const savedTheme = localStorage.getItem("theme") || "light"; // Default to light theme
if (savedTheme === "dark") {
  profileContainer.classList.add("dark");
  profileName.classList.add("headItems");
  storeBtns.forEach((storeBtn) => {
    storeBtn.classList.add("storeBtnBackground");
  });
}
EditBtn.addEventListener("click", () => {
  setTimeout(() => {
    window.location.href = base + "EditPage/edit.html";
  }, 200);
});

quitBtn.addEventListener("click", () => {
  setTimeout(() => {
    window.location.href = base + "homepage/home.html";
  }, 200);
});
storeBtns.forEach((storeBtn) => {
  storeBtn.addEventListener("click", () => {
    setTimeout(() => {
      window.location.href = base + "StorePage/store.html";
    }, 200);
  });
});

const savedMusicState = localStorage.getItem("musicState") || "paused";

shareBtn.addEventListener("click", () => {
  const shareData = {
    title: "Villa Quiz Game",
    text: "Try out this fun quiz app and earn rewards!",
    url: "https://ebuski100.github.io/quiz-app/",
  };

  if (navigator.share) {
    navigator
      .share(shareData)
      .then(() => console.log("App shared successfully!"))
      .catch((error) => console.log("Error sharing:", error));
  } else {
    // Fallback: copy link to clipboard
    navigator.clipboard.writeText(shareData.url).then(() => {
      alert("Quiz app link copied to clipboard! Share it with your friends.");
    });
  }
});

if (savedMusicState === "playing") {
  backgroundMusic.play();
} else {
  backgroundMusic.pause();
}
const footerIcons = document.querySelectorAll(".tooltip-box");

const savedMusicTime = parseFloat(localStorage.getItem("musicTime")) || 0;
backgroundMusic.currentTime = savedMusicTime;
backgroundMusic.addEventListener("timeupdate", () => {
  localStorage.setItem("musicTime", backgroundMusic.currentTime);
});
const buttons = document.querySelectorAll(".btn");
let soundState = localStorage.getItem("soundState") || "on";

const soundEffect = document.getElementById("soundEffect");
buttons.forEach((button) => {
  console.log(soundState);
  button.addEventListener("click", () => {
    if (soundState === "on") {
      soundEffect.currentTime = 0; // Reset sound to the beginning
      soundEffect.play(); // Play the sound effect
    }
  });
});

footerIcons.forEach((footerIcon) => {
  footerIcon.addEventListener("click", () => {
    setTimeout(() => {
      if (footerIcon.classList.contains("home")) {
        window.location.href = base + "homepage/home.html";
      } else if (footerIcon.classList.contains("profile")) {
        window.location.href = base + "profilePage/user.html";
      } else if (footerIcon.classList.contains("setting-icon")) {
        window.location.href = base + "SettingsPage/setting.html";
      } else {
        window.location.href = base + "StorePage/store.html";
      }
    }, 200);
  });
});
