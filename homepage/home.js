const dailyFacts = document.querySelector(".facts");

const profileBtn = document.querySelector(".profile");

profileBtn.addEventListener("click", () => {});
const shareBtn = document.querySelector(".homeInvite");

const oldUser = localStorage.getItem("oldUser");
const userWelcomeMsg = document.querySelector(".userWelcomeMsg");
const savedUsername = localStorage.getItem("username") || "Player";

const isGithubPages = window.location.hostname.includes("github.io");
const base = isGithubPages ? "/quiz-app/" : "../";

if (localStorage.getItem("showWelcome") === "true") {
  if (!oldUser) {
    setTimeout(() => {
      userWelcomeMsg.classList.add("fly-in");
    }, 500);
    userWelcomeMsg.textContent = `Welcome ${savedUsername} 🖐🏼`;
  } else {
    setTimeout(() => {
      userWelcomeMsg.classList.add("fly-in");
    }, 500);
    userWelcomeMsg.textContent = `Welcome Back ${savedUsername} 🖐🏼`;
  }
  localStorage.removeItem("showWelcome");
} else {
  userWelcomeMsg.textContent = "";
}

shareBtn.addEventListener("click", (event) => {
  event.preventDefault();
  event.stopPropagation();
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

// const reqOptions = {
//   method: "GET",
//   headers: {
//     "X-Api-Key": key,
//   },
// };

fetch("https://quiz-backend-2-wv4p.onrender.com/api/facts/")
  .then((res) => {
    console.log("Response Status:", res.status);
    res.json();
    return res.text().then((text) => {
      console.log("Response Body:", text); //
      if (!res.ok) {
        throw new Error(`HTTP error! Status: ${res.status}`);
      }
      return JSON.parse(text);
    });
  })
  .then((data) => {
    console.log("Response Data:", data);
    if (data && data.length > 0) {
      const currentDate = new Date().toDateString();
      const lastFetchDate = localStorage.getItem("lastFetchDate");

      if (!lastFetchDate || currentDate !== lastFetchDate) {
        const newFact = data[0].fact; //
        localStorage.setItem("dailyFact", newFact);
        localStorage.setItem("lastFetchDate", currentDate);
        dailyFacts.textContent = newFact;
      } else {
        dailyFacts.textContent =
          localStorage.getItem("dailyFact") || "No facts available.";
      }
    } else {
      dailyFacts.textContent = "No facts available.";
    }
  })
  .catch((error) => {
    console.error("Error:", error);
    dailyFacts.textContent = "Failed to load facts.";
  });

const exitBtn = document.querySelector(".exit");
const yes = document.querySelector(".yes");
const No = document.querySelector(".No");
const closeModal = document.querySelector(".close-modal");
const modalFooter = document.querySelector(".modal-footer");
const exitModal = document.querySelector(".exit-modal");
const playBtn = document.querySelector(".play");
// const storeBtns = document.querySelectorAll(".storeBtns");
const footerIcons = document.querySelectorAll(".tooltip-box");

// const coinsMaxDisplay = document.querySelector(".coinMax-cont");
// const heartMaxDisplay = document.querySelector(".heartMax-cont");
// const coinNum = document.querySelector(".coin-num");
// const heartText = document.querySelector(".heartnum");
// console.log(heartText);
// const currentCoins = parseInt(localStorage.getItem("coinCount")) || 0;
// let currentHeartNum = parseInt(localStorage.getItem("heartNum"));

// if (currentHeartNum === null || isNaN(currentHeartNum)) {
//   currentHeartNum = 5;
//   localStorage.setItem("heartNum", currentHeartNum);
// }

// heartText.textContent = currentHeartNum;
// localStorage.setItem("coinCount", currentCoins);
// coinNum.textContent = currentCoins;

// if (currentCoins >= 5000) {
//   coinsMaxDisplay.classList.add("displayMax");
// } else {
//   coinsMaxDisplay.classList.remove("displayMax");
// }
// if (currentHeartNum >= 5) {
//   heartMaxDisplay.classList.add("displayMax");
// } else {
//   heartMaxDisplay.classList.remove("displayMax");
// }

// storeBtns.forEach((storeBtn) => {
//   storeBtn.addEventListener("click", () => {
//     setTimeout(() => {
//       window.location.href = base + "StorePage/store.html";
//     }, 200);
//   });
// });
playBtn.addEventListener("click", () => {
  setTimeout(() => {
    window.location.href = base + "Quizpage/quiz.html";
  }, 200);
});
exitBtn.addEventListener("click", () => {
  exitModal.style.display = "block";
});
closeModal.addEventListener("click", () => {
  exitModal.style.display = "none";
});

modalFooter.addEventListener("click", () => {
  exitModal.style.display = "none";
});

No.addEventListener("click", () => {
  exitModal.style.display = "none";
});

yes.addEventListener("click", () => {
  setTimeout(() => {
    window.location.href = "https://www.google.com";
  }, 200);
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
const savedTheme = localStorage.getItem("theme") || "light";
const homeBody = document.querySelector(".container");

if (savedTheme === "dark") {
  homeBody.classList.add("dark");
  storeBtns.forEach((storeBtn) => {
    storeBtn.classList.add("storeBtnBackground");
  });
}

const savedMusicState = localStorage.getItem("musicState") || "paused";

if (savedMusicState === "playing") {
  backgroundMusic.play();
} else {
  backgroundMusic.pause();
}

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
