const quitBtn = document.querySelector(".quit-btn");
const cancelAdBtn = document.getElementById("cancel-ad-btn");
const LifeItems = document.querySelectorAll(".life-item");
quitBtn.addEventListener("click", () => {
  history.back();
});
const adVideo = document.getElementById("ad-video");
const getLifeItems = document.querySelectorAll(".getLife");
const shareBtn = document.querySelector(".invite");
const modalFooter = document.querySelector(".modal-footer");
const getAHintModal = document.querySelector(".getAHintModal");
// Load the adLinks.json file
const heartText = document.querySelector(".heartnum");
const getaHintCoin = document.getElementById("getAHintCoin");
const fewCoinsAdBtn = document.getElementById("few-coinsAdBtn");
const watchAdBtns = document.querySelectorAll(".watch-ad");
const adModal = document.querySelector(".adModal");
const allHintsAdBtn = document.getElementById("allHintsAdBtn");
const oneLifeAdBtn = document.getElementById("oneLifeAdBtn");
const currentTimeDisplay = document.getElementById("currentTime");
const totalDurationDisplay = document.getElementById("totalDuration");
const progressBar = document.getElementById("progressBar");
const videoTimer = document.querySelector(".video-timer");
console.log(totalDurationDisplay);
const footerIcons = document.querySelectorAll(".tooltip-box");
const coinNum = document.querySelector(".coin-num");
const allHintsCoin = document.getElementById("allHintsCoin");
const allHintsLife = document.getElementById("allHintsLife");
const savedCoins = parseInt(localStorage.getItem("coinCount")) || 0;
let soundState = localStorage.getItem("soundState") || "on";
// const savedHeartNum = parseInt(localStorage.getItem("heartNum")) || 0;
// heartText.textContent = savedHeartNum;
const heartNum = parseInt(localStorage.getItem("heartNum")) || 0;

// const heartAnsTime = document.getElementById("ansTimeHeart");
const coinAnsTime = document.getElementById("ansTimeCoin");
const disableTimer = localStorage.getItem("disableTimer");
const fiftyFiftyUsed = localStorage.getItem("fiftyFiftyUsed");
const expertUsed = localStorage.getItem("expertUsed");
const anotherQuestionUsed = localStorage.getItem("anotherQuestionUsed");
const getCoins = document.querySelectorAll(".getCoins");
const coinsMaxDisplay = document.querySelector(".coinMax-cont");
const heartMaxDisplay = document.querySelector(".heartMax-cont");
const heartButtons = document.querySelectorAll(".heartBtn");
const hintModalOptions = document.querySelectorAll(".hintModalOption");
const expertAns = document.querySelector(".expertAns");
const anotherQuestion = document.querySelector(".anotherQuestion");
const fiftyPercent = document.querySelector(".fifty-fifty");
const fiftyPercentText = document.querySelector(".fiftyPercentText");
const expertAnsText = document.querySelector(".expertAnsText");
const anotherQuestionText = document.querySelector(".anotherQuestionText");
const fiftyHintBought = localStorage.getItem("fiftyHintBought");
const expertAnsBought = localStorage.getItem("expertAnsBought");
const anotherQuestionBought = localStorage.getItem("anotherQuestionBought");
const getAHintBtns = document.querySelectorAll(".getAHintBtn");

console.log(getAHintBtns);
let lastAdBtnId = null;
let hintMode = null;

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

const isGithubPages = window.location.hostname.includes("github.io");
const base = isGithubPages ? "/quiz-app/" : "../";

const closeHintModal = document.querySelector(".modalCloseBtn");
let currentHeartNum = parseInt(localStorage.getItem("heartNum"));

if (currentHeartNum === null || isNaN(currentHeartNum)) {
  currentHeartNum = 5; // Set to 5 only if heartNum is not defined
  localStorage.setItem("heartNum", currentHeartNum);
}

heartText.textContent = currentHeartNum;
console.log(heartButtons);

if (
  fiftyFiftyUsed === "false" &&
  expertUsed === "false" &&
  anotherQuestionUsed === "false" &&
  fiftyHintBought === "true"
) {
  disableHints();
}

if (
  fiftyFiftyUsed === "false" &&
  expertUsed === "false" &&
  anotherQuestionUsed === "false" &&
  expertAnsBought === "true"
) {
  disableHints();
}
if (
  fiftyFiftyUsed === "false" &&
  expertUsed === "false" &&
  anotherQuestionUsed === "false" &&
  anotherQuestionBought === "true"
) {
  disableHints();
}
disableGetCoins();
// disableGetHearts();
function disableHints() {
  allHintsCoin.style.backgroundColor = "grey";
  allHintsCoin.style.opacity = "0.5";
  allHintsCoin.style.pointerEvents = "none";
  getaHintCoin.style.backgroundColor = "grey";
  getaHintCoin.style.opacity = "0.5";
  getaHintCoin.style.pointerEvents = "none";
  allHintsAdBtn.style.backgroundColor = "grey";
  allHintsAdBtn.style.opacity = "0.5";
  allHintsAdBtn.style.pointerEvents = "none";
}

if (fiftyHintBought === "true") {
  fiftyPercentText.textContent = "usedUp 🚫";
  fiftyPercentText.style.color = "red";
}
if (expertAnsBought === "true") {
  expertAnsText.textContent = "usedUp 🚫";
  expertAnsText.style.color = "red";
}
if (anotherQuestionBought === "true") {
  anotherQuestionText.textContent = "usedUp 🚫";
  anotherQuestionText.style.color = "red";
}

function allHintsUsedNow() {
  const fiftyFiftyUsedNow = localStorage.getItem("fiftyFiftyUsed");
  const expertUsedNow = localStorage.getItem("expertUsed");
  const anotherQuestionUsedNow = localStorage.getItem("anotherQuestionUsed");

  if (
    fiftyFiftyUsedNow === "false" &&
    expertUsedNow === "false" &&
    anotherQuestionUsedNow === "false"
  ) {
    disableHints();
  }
  if (
    fiftyHintBought === "true" &&
    expertAnsBought === "true" &&
    anotherQuestionBought === "true"
  ) {
    disableHints();
    return;
  }
}

allHintsUsedNow();
function disableExpertAns() {
  if (expertUsed === "false") {
    expertAns.style.backgroundColor = "grey";
    expertAns.style.opacity = "0.5";
    expertAns.style.pointerEvents = "none";
  }
}
disableExpertAns();

function disableFiftyPercent() {
  if (fiftyFiftyUsed === "false") {
    fiftyPercent.style.opacity = "0.5";
    fiftyPercent.style.pointerEvents = "none";
    fiftyPercent.style.backgroundColor = "grey";
  }
}

disableFiftyPercent();

function disableAnotherQuestion() {
  if (anotherQuestionUsed === "false") {
    anotherQuestion.style.opacity = "0.5";
    anotherQuestion.style.pointerEvents = "none";
    anotherQuestion.style.backgroundColor = "grey";
  }
}

disableAnotherQuestion();

function allHints() {
  const fiftyFiftyUsed = localStorage.getItem("fiftyFiftyUsed");
  const expertUsed = localStorage.getItem("expertUsed");
  const anotherQuestionUsed = localStorage.getItem("anotherQuestionUsed");
  if (
    fiftyFiftyUsed === "true" ||
    anotherQuestionUsed === "true" ||
    expertUsed === "true"
  ) {
    localStorage.setItem("fiftyFiftyUsed", "false");
    localStorage.setItem("expertUsed", "false");
    localStorage.setItem("anotherQuestionUsed", "false");
    disableHints();
    playCoinPurchaseSound();
  } else {
    disableHints();
  }
}

// resetHints();
if (disableTimer) {
  disableAnsTime();
}

function disableAnsTime() {
  coinAnsTime.style.backgroundColor = "grey";
  coinAnsTime.style.pointerEvents = "none";
  coinAnsTime.style.opacity = "0.5";
}

allHintsAdBtn.addEventListener("click", () => {
  hintMode = "ad";
  updateHintModalOptionsState();
});

coinAnsTime.addEventListener("click", () => {
  let savedCoins = parseInt(localStorage.getItem("coinCount")) || 0;
  let pauseTimeCount = parseInt(localStorage.getItem("pauseTimeCount")) || 0;

  if (savedCoins >= 3000) {
    savedCoins -= 3000;
    localStorage.setItem("coinCount", savedCoins);
    coinNum.textContent = savedCoins;
    pauseTimeCount += 5;
    if (pauseTimeCount > 5) pauseTimeCount = 5;
    localStorage.setItem("pauseTimeCount", pauseTimeCount);

    alert("5x pause time activated for this game! 🎉");
    coinsMaxDisplay.classList.remove("displayMax");
    playCoinPurchaseSound();
    window.scrollTo({ top: 0, behavior: "smooth" });
    disableAnsTime();
  } else {
    alert("Not Enough coins to get quiz Pauses, Dear");
    playPurchaseFailSound();
  }
});

coinNum.textContent = savedCoins;

function playCoinPurchaseSound() {
  if (soundState == "on") {
    setTimeout(() => {
      const coinSound = new Audio("../sounds/coinPurchase.wav"); // Replace with the actual path to your sound file
      coinSound.currentTime = 0; // Reset the sound to the beginning
      coinSound.play().catch((error) => {
        console.error("Error playing coin sound:", error);
      });
    }, 500);
  }
}
function playCoinPurchaseSoundAd() {
  setTimeout(() => {
    if (soundState == "on") {
      const coinSound = new Audio("../sounds/coinPurchase.wav"); // Replace with the actual path to your sound file
      coinSound.currentTime = 0; // Reset the sound to the beginning
      coinSound.play().catch((error) => {
        console.error("Error playing coin sound:", error);
      });
    }
  }, 200);
}
function playPurchaseFailSound() {
  if (soundState == "on") {
    setTimeout(() => {
      const coinSound = new Audio("../sounds/datsIncorrect.wav"); // Replace with the actual path to your sound file
      coinSound.currentTime = 0; // Reset the sound to the beginning
      coinSound.play().catch((error) => {
        console.error("Error playing coin sound:", error);
      });
    }, 300);
  }
}
function heartMaxDisplayer() {
  const currentHeartNum = parseInt(localStorage.getItem("heartNum"));
  if (currentHeartNum === null || isNaN(currentHeartNum)) {
    currentHeartNum = 5;
    localStorage.setItem("heartNum", currentHeartNum);
  }
  if (currentHeartNum >= 5) {
    heartMaxDisplay.classList.add("displayMax");
  } else {
    heartMaxDisplay.classList.remove("displayMax");
  }
}

heartMaxDisplayer();

function disableGetCoins() {
  const currentCoins = parseInt(localStorage.getItem("coinCount")) || 0;
  getCoins.forEach((getCoin) => {
    if (currentCoins >= 5000) {
      getCoin.style.pointerEvents = "none";
      getCoin.style.opacity = "0.5";
      getCoin.style.backgroundColor = "grey";
      coinsMaxDisplay.classList.add("displayMax");
    } else {
      getCoin.style.pointerEvents = "auto";
      getCoin.style.opacity = "1";
      getCoin.style.backgroundColor = ""; // Reset background color
      coinsMaxDisplay.classList.remove("displayMax");
    }
  });
}

console.log(coinsMaxDisplay);
closeHintModal.addEventListener("click", () => {
  getAHintModal.style.display = "none";
});

const coinOptions = document.querySelectorAll(".coins-option");
console.log(fiftyPercent);
console.log(getAHintModal);

getaHintCoin.addEventListener("click", () => {
  const expertAnsHintUsed = localStorage.getItem("expertAnsBought");
  const fiftyPercentHintUsed = localStorage.getItem("fiftyHintBought");
  const anotherQuestionsHintUsed = localStorage.getItem(
    "anotherQuestionBought"
  );

  if (expertAnsHintUsed === "true") {
    expertAns.style.backgroundColor = "grey";
    expertAns.style.pointerEvents = "none";
    expertAns.style.opacity = "0.5";
  } else if (anotherQuestionsHintUsed === "true") {
    anotherQuestion.style.backgroundColor = "grey";
    anotherQuestion.style.pointerEvents = "none";
    anotherQuestion.style.opacity = "0.5";
  } else if (fiftyPercentHintUsed === "true") {
    fiftyPercent.style.backgroundColor = "grey";
    fiftyPercent.style.pointerEvents = "none";
    fiftyPercent.style.opacity = "0.5";
  }
  getAHintModal.style.display = "block";
  hintMode = "coin";
  updateHintModalOptionsState();
});

function updateHintModalOptionsState() {
  // Remove all previous listeners by cloning each node
  const hintModalOptions = document.querySelectorAll(".hintModalOption");
  hintModalOptions.forEach((hintModalOption) => {
    const newOption = hintModalOption.cloneNode(true);
    hintModalOption.parentNode.replaceChild(newOption, hintModalOption);
  });

  // Re-select the options after cloning
  const updatedHintModalOptions = document.querySelectorAll(".hintModalOption");

  updatedHintModalOptions.forEach((hintModalOption) => {
    function disableHintModalOpt() {
      hintModalOption.style.backgroundColor = "grey";
      hintModalOption.style.opacity = "0.5";
      hintModalOption.style.pointerEvents = "none";
    }

    hintModalOption.addEventListener("click", () => {
      let savedCoins = parseInt(localStorage.getItem("coinCount")) || 0;

      // FIFTY-FIFTY
      if (hintModalOption.classList.contains("fifty-fifty")) {
        if (hintMode === "coin") {
          if (savedCoins >= 1000) {
            savedCoins -= 1000;
            localStorage.setItem("coinCount", savedCoins);
            coinNum.textContent = savedCoins;
            localStorage.setItem("fiftyFiftyUsed", false);
            fiftyPercentText.textContent = "usedUp 🚫";
            fiftyPercentText.style.color = "red";
            localStorage.setItem("fiftyHintBought", "true");
            coinNum.classList.add("coin-num1");
            coinsMaxDisplay.classList.remove("displayMax");
            disableHintModalOpt();
            window.scrollTo({ top: 0, behavior: "smooth" });
            setTimeout(() => {
              playCoinPurchaseSound();
            }, 1000);
            allHintsUsedNow();
            setTimeout(() => {
              getAHintModal.style.display = "none";
            }, 1000);
          } else {
            alert("Not Enough Coins to get a fifty Percent Hint 💔 ");
            playPurchaseFailSound();
          }
        } else if (hintMode === "ad") {
          localStorage.setItem("fiftyFiftyUsed", false);
          fiftyPercentText.textContent = "usedUp 🚫";
          fiftyPercentText.style.color = "red";
          localStorage.setItem("fiftyHintBought", "true");
          window.scrollTo({ top: 0, behavior: "smooth" });
          disableHintModalOpt();
          setTimeout(() => {
            playCoinPurchaseSound();
          }, 1000);
          allHintsUsedNow();
          setTimeout(() => {
            getAHintModal.style.display = "none";
          }, 1000);
        }
      }

      // EXPERT ANSWER
      if (hintModalOption.classList.contains("expertAns")) {
        if (hintMode === "coin") {
          if (savedCoins >= 1000) {
            savedCoins -= 1000;
            localStorage.setItem("coinCount", savedCoins);
            coinNum.textContent = savedCoins;
            localStorage.setItem("expertUsed", false);
            localStorage.setItem("expertAnsUsed", true);
            expertAnsText.textContent = "usedUp 🚫";
            expertAnsText.style.color = "red";
            localStorage.setItem("expertAnsBought", "true");
            coinNum.classList.add("coin-num1");
            coinsMaxDisplay.classList.remove("displayMax");
            window.scrollTo({ top: 0, behavior: "smooth" });
            disableHintModalOpt();
            setTimeout(() => {
              playCoinPurchaseSound();
            }, 1000);
            allHintsUsedNow();
            setTimeout(() => {
              getAHintModal.style.display = "none";
            }, 1000);
          } else {
            alert("Not Enough Coins to get an Expert answer 💔");
            playPurchaseFailSound();
          }
        } else if (hintMode === "ad") {
          localStorage.setItem("expertUsed", false);
          localStorage.setItem("expertAnsUsed", true);
          expertAnsText.textContent = "usedUp 🚫";
          expertAnsText.style.color = "red";
          window.scrollTo({ top: 0, behavior: "smooth" });
          localStorage.setItem("expertAnsBought", "true");
          disableHintModalOpt();
          setTimeout(() => {
            playCoinPurchaseSound();
          }, 1000);
          allHintsUsedNow();
          setTimeout(() => {
            getAHintModal.style.display = "none";
          }, 1000);
        }
      }

      // ANOTHER QUESTION
      if (hintModalOption.classList.contains("anotherQuestion")) {
        if (hintMode === "coin") {
          if (savedCoins >= 1000) {
            savedCoins -= 1000;
            localStorage.setItem("coinCount", savedCoins);
            coinNum.textContent = savedCoins;
            localStorage.setItem("anotherQuestionUsed", false);
            anotherQuestionText.textContent = "usedUp 🚫";
            anotherQuestionText.style.color = "red";
            localStorage.setItem("anotherQuestionBought", "true");
            coinNum.classList.add("coin-num1");
            coinsMaxDisplay.classList.remove("displayMax");
            window.scrollTo({ top: 0, behavior: "smooth" });
            disableHintModalOpt();
            setTimeout(() => {
              playCoinPurchaseSound();
            }, 1000);
            allHintsUsedNow();
            setTimeout(() => {
              getAHintModal.style.display = "none";
            }, 1000);
          } else {
            alert("Not Enough Coins to get another Question 💔");
            playPurchaseFailSound();
          }
        } else if (hintMode === "ad") {
          localStorage.setItem("anotherQuestionUsed", false);
          localStorage.setItem("anotherQuestionHintUsed", true);
          anotherQuestionText.textContent = "usedUp 🚫";
          anotherQuestionText.style.color = "red";
          localStorage.setItem("anotherQuestionBought", "true");
          window.scrollTo({ top: 0, behavior: "smooth" });
          disableHintModalOpt();
          setTimeout(() => {
            playCoinPurchaseSound();
          }, 1000);
          allHintsUsedNow();
          setTimeout(() => {
            getAHintModal.style.display = "none";
          }, 1000);
        }
      }
    });
  });
}

coinOptions.forEach((coinOpt) => {
  coinOpt.addEventListener("click", () => {
    coinNum.classList.add("coin-num1");
    void coinNum.offsetWidth;
    setTimeout(() => {
      coinNum.classList.remove("coin-num1");
    }, 2000);

    const currentCoins = parseInt(localStorage.getItem("coinCount")) || 0;
    let heartNum = parseInt(heartText.textContent);

    if (coinOpt.classList.contains("handful")) {
      if (heartNum > 0) {
        if (currentCoins >= 5000) {
          alert("coins at maximum!");
          playPurchaseFailSound();
        }

        const updatedCoins = currentCoins + 1000;
        window.scrollTo({ top: 0, behavior: "smooth" });
        localStorage.setItem("coinCount", updatedCoins);
        coinNum.textContent = updatedCoins;
        heartNum -= 1;
        heartText.textContent = heartNum;
        localStorage.setItem("heartNum", heartNum);
        disableGetCoins();

        heartMaxDisplayer();
        playCoinPurchaseSound();
      } else {
        alert("not Enough hearts to buy 1000 Coins");
        playPurchaseFailSound();
      }
    } else if (coinOpt.classList.contains("heap")) {
      if (heartNum >= 5) {
        if (currentCoins >= 5000) {
          alert("coins at maximum!");
          playPurchaseFailSound();
          console.log(currentCoins);
          return;
        }
        const amountToAdd = 5000;
        addCoins(amountToAdd);
        window.scrollTo({ top: 0, behavior: "smooth" });
        heartNum -= 5;
        heartText.textContent = heartNum;
        localStorage.setItem("heartNum", heartNum);
        heartMaxDisplayer();
        disableGetCoins();
        // disableGetHearts();
        playCoinPurchaseSound();
      } else {
        alert("not Enough hearts to buy 5000 coins");
        playPurchaseFailSound();
      }
    }
  });
});

let ads;
let totalAdTime = 0; // Total time ads have played
const maxAdTime = 60; // Maximum ad time in seconds
const cancelTime = 40; // Time after which the cancel button appears
let cancelButtonShown = false;

function handleLoadedMetadata() {
  console.log("Metadata loaded");
  const totalDuration = formatTime(adVideo.duration);
  totalDurationDisplay.textContent = totalDuration;
  progressBar.max = adVideo.duration; // Set the max value of the progress bar
}

// Update the current time and progress bar as the video plays
function handleTimeUpdate() {
  const currentTime = formatTime(adVideo.currentTime);
  currentTimeDisplay.textContent = currentTime;
  progressBar.value = adVideo.currentTime; // Update the progress bar value
}
function handleAdEnded() {
  let currentHeartNum = parseInt(localStorage.getItem("heartNum"));

  if (currentHeartNum === null || isNaN(currentHeartNum)) {
    currentHeartNum = 5;
    localStorage.setItem("heartNum", currentHeartNum);
  }
  if (totalAdTime < maxAdTime) {
    setTimeout(() => {
      showRandomAd(); // Play another random ad after 1 second
    }, 1000); // 1-second delay
  } else {
    adModal.style.display = "none";
    alert("Ad ended! Continue to game.");
    adVideo.style.display = "none"; // Hide the video
    cancelAdBtn.style.display = "none";
    window.scrollTo({ top: 0, behavior: "smooth" });
    disableGetCoins();
    if (lastAdBtnId === "few-coinsAdBtn") {
      playCoinPurchaseSoundAd();
    }
    function adCoinIncrease(watchAdBtnId) {
      if (watchAdBtnId === "few-coinsAdBtn") {
        let currentCoins = parseInt(coinNum.textContent) || 0;
        if (currentCoins >= 5000) {
          alert("coins at maximum!");
          playPurchaseFailSound();
          console.log(currentCoins);
          return;
        } else {
          currentCoins += 200;
          localStorage.setItem("coinCount", currentCoins);
          coinNum.textContent = currentCoins;
        }
        setTimeout(() => {
          window.location.reload();
        }, 1000);
      }
    }

    let lastAdBtnId = null;
    adCoinIncrease(lastAdBtnId);
    getHintAd(lastAdBtnId);

    modalFooter.style.display = "none";
    if (savedMusicState === "playing") {
      backgroundMusic.play();
    } else {
      backgroundMusic.pause();
    }
  }
}
function formatTime(seconds) {
  const minutes = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  return `${minutes}:${secs < 10 ? "0" : ""}${secs}`;
}
function showRandomAd() {
  let randomNumber = Math.floor(Math.random() * ads.length);
  const randomAd = ads[randomNumber];
  console.log(randomNumber);
  adVideo.style.display = "block";
  adVideo.src = randomAd.path; // Set the video source
  adVideo.load();
  adVideo.play(); // Play the video
}
function adCoinIncrease(watchAdBtnId) {
  if (watchAdBtnId === "few-coinsAdBtn") {
    let currentCoins = parseInt(coinNum.textContent) || 0;
    if (currentCoins >= 5000) {
      alert("coins at maximum!");
      playPurchaseFailSound();
      console.log(currentCoins);
      return;
    } else {
      currentCoins += 200;
      localStorage.setItem("coinCount", currentCoins);
      coinNum.textContent = currentCoins;
    }
    setTimeout(() => {
      window.location.reload();
    }, 1000);
  }
}

function getHintAd() {
  if (lastAdBtnId === "allHintsAdBtn") {
    getAHintModal.style.display = "block";
  }
}

watchAdBtns.forEach((watchAdBtn) => {
  watchAdBtn.addEventListener("click", () => {
    adVideo.removeEventListener("loadedmetadata", handleLoadedMetadata);
    adVideo.removeEventListener("timeupdate", handleTimeUpdate);
    adVideo.removeEventListener("ended", handleAdEnded);

    adModal.style.display = "block";

    lastAdBtnId = watchAdBtn.id;
    backgroundMusic.pause();
    fetch("../adLinks.json")
      .then((response) => response.json())
      .then((fetchedAds) => {
        // Function to show a random ad
        ads = fetchedAds;
        // Function to start the ad sequence
        function startAdSequence() {
          totalAdTime = 0;
          cancelButtonShown = false;
          cancelAdBtn.style.display = "none";
          showRandomAd();
        }

        adVideo.addEventListener("loadedmetadata", handleLoadedMetadata);
        adVideo.addEventListener("timeupdate", handleTimeUpdate);
        adVideo.addEventListener("ended", handleAdEnded);

        const adTimer = setInterval(() => {
          totalAdTime++;

          if (totalAdTime >= cancelTime && !cancelButtonShown) {
            cancelAdBtn.style.display = "block";
            cancelButtonShown = true;
            modalFooter.style.display = "block";
          }

          if (totalAdTime >= maxAdTime) {
            clearInterval(adTimer);
          }
        }, 1000);
        cancelAdBtn.addEventListener("click", () => {
          adModal.style.display = "none";
          adVideo.style.display = "none";
          cancelAdBtn.style.display = "none";
          adVideo.pause();
          // adVideo.src = "";
          modalFooter.style.display = "none";
          window.scrollTo({ top: 0, behavior: "smooth" });
          if (savedMusicState === "playing") {
            backgroundMusic.play();
          } else {
            backgroundMusic.pause();
          }

          adCoinIncrease(lastAdBtnId);
          getHintAd(lastAdBtnId);
          disableGetCoins();

          if (lastAdBtnId === "few-coinsAdBtn") {
            playCoinPurchaseSoundAd();
          }
          clearInterval(adTimer);
        });

        modalFooter.addEventListener("click", () => {
          adModal.style.display = "none";
          adVideo.style.display = "none";
          adVideo.pause();
          adVideo.src = "";
          window.scrollTo({ top: 0, behavior: "smooth" });
          if (savedMusicState === "playing") {
            backgroundMusic.play();
          } else {
            backgroundMusic.pause();
          }

          adCoinIncrease(lastAdBtnId);
          getHintAd(lastAdBtnId);
          disableGetCoins();

          if (lastAdBtnId === "few-coinsAdBtn") {
            playCoinPurchaseSoundAd();
          }
          clearInterval(adTimer);
        });

        startAdSequence();
      })
      .catch((error) => console.error("Error loading ads:", error));
  });
});
const playPauseOverlay = document.getElementById("play-pause-overlay");
const playPauseIcon = document.querySelector(".playPauseIcon");
const savedTheme = localStorage.getItem("theme") || "light";

playPauseIcon.addEventListener("click", togglePlayPause);
function togglePlayPause() {
  if (adVideo.paused || adVideo.ended) {
    adVideo.play();
    playPauseIcon.src = "../images/video-pause-button.png";
  } else {
    adVideo.pause();
    playPauseIcon.src = "../images/play-button-arrowhead.png";
  }
}

function toggleVideoElementShow() {
  if (playPauseOverlay.style.display === "none") {
    playPauseOverlay.style.display = "block";
    videoTimer.style.display = "block";
    setTimeout(() => {
      playPauseOverlay.style.display = "none";
      videoTimer.style.display = "none";
    }, 5000);
  } else {
    playPauseOverlay.style.display = "none";
    videoTimer.style.display = "none";
  }
}
adVideo.addEventListener("click", toggleVideoElementShow);
adVideo.addEventListener("dblclick", togglePlayPause);
const storeContainer = document.querySelector(".container");
const storeBtns = document.querySelectorAll(".storeBtn");

if (savedTheme === "dark") {
  storeContainer.classList.add("dark");
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

if (
  fiftyFiftyUsed === "false" ||
  expertUsed === "false" ||
  anotherQuestionUsed === "false"
) {
  allHintsCoin.style.pointerEvents = "none";
  allHintsCoin.style.backgroundColor = "grey";
  allHintsCoin.style.opacity = "0.5";
}
allHintsCoin.addEventListener("click", () => {
  const fiftyFiftyUsed = localStorage.getItem("fiftyFiftyUsed");
  const expertUsed = localStorage.getItem("expertUsed");
  const anotherQuestionUsed = localStorage.getItem("anotherQuestionUsed");
  const currentCoins = parseInt(localStorage.getItem("coinCount")) || 0;
  if (currentCoins >= 3000) {
    if (
      fiftyFiftyUsed === "true" &&
      expertUsed === "true" &&
      anotherQuestionUsed === "true"
    ) {
      const updatedCoins = currentCoins - 3000;
      localStorage.setItem("coinCount", updatedCoins);
      coinNum.textContent = updatedCoins;
      alert("All hints Activated 🎉");
      localStorage.setItem("fiftyFiftyUsed", "false");
      localStorage.setItem("expertUsed", "false");
      localStorage.setItem("anotherQuestionUsed", "false");
      // disableGetHearts();
      window.scrollTo({ top: 0, behavior: "smooth" });
      disableGetCoins();
      playCoinPurchaseSound();
      disableHints();
    } else {
      disableHints();
    }
  } else {
    alert("Not Enough coins to get All hints ");
    playPurchaseFailSound();
  }
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

function resetHeartNum() {
  localStorage.setItem("heartNum", 5); // Set heartNum to 5
  heartText.textContent = 5; // Update the displayed value
  console.log("Heart number reset to 5");
}
function resetCoinCount() {
  localStorage.setItem("coinCount", 0); // Reset coinCount to 0
  coinNum.textContent = 0; // Update the displayed value
  console.log("Coin count reset to 0");
}

function addCoins(amount) {
  const currentCoins = parseInt(localStorage.getItem("coinCount")) || 0;
  let updatedCoins = currentCoins + amount;

  // Cap the coin count at 5000
  if (updatedCoins > 5000) {
    updatedCoins = 5000;
  }

  // Update localStorage and the displayed value
  localStorage.setItem("coinCount", updatedCoins);
  coinNum.textContent = updatedCoins;

  console.log(`Coins updated: ${updatedCoins}`);
}
function resetTimer() {
  localStorage.removeItem("disableTimer");
}
function resetHints() {
  localStorage.removeItem("fiftyFiftyUsed");
  localStorage.removeItem("expertUsed");
  localStorage.removeItem("anotherQuestionUsed");
  localStorage.removeItem("fiftyPercentHintUsed");
  localStorage.removeItem("expertAnsUsed");
}

// resetCoinCount();
// resetHeartNum();
// resetTimer();
//
