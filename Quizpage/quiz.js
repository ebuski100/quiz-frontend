const question = document.querySelector(".question");
const options = document.querySelectorAll(".option-text");
const storeBtns = document.querySelectorAll(".storeBtn");
const quitBtn = document.querySelector(".quit-btn");
const optionBoxes = document.querySelectorAll(".option");
const backgroundChange = document.querySelectorAll(".backgroundChange");
const hints = document.querySelectorAll(".hint");
const timerShow = document.querySelector(".timer-show");
const savedTheme = localStorage.getItem("theme") || "light";
const questNumColors = document.querySelectorAll(".questionNum");
const jubilationSound = document.querySelector(".jubilationSound");
const optionsFlyInSound = new Audio("../sounds/hit.wav");
const resultMessage = document.querySelector(".resultMessage");
const congratulationsModal = document.querySelector(".congratulationsModal");
const priceTag = document.querySelector(".price-tag");
const playPauseOverlay = document.getElementById("play-pause-overlay");
const playPauseIcon = document.querySelector(".playPauseIcon");
const timeUpCloseBtn = document.querySelector(".timeUpCloseBtn");
const timeUpModal = document.querySelector(".time-upModal");
const timeUpModalCont = document.querySelector(".time-upModalContainer");
const adModalFooter = document.querySelector(".adModal-footer");
// const titleEl = document.querySelector(".title");
const timeUpFooter = document.querySelector(".timeUpModalFooter");
const modalPriceWon = document.querySelector(".price-won");
const leaveBtns = document.querySelectorAll(".LeaveBtn");
const playAgains = document.querySelectorAll(".playAgain");
const adModal = document.querySelector(".adModal");
const adVideo = document.getElementById("ad-video");
const cancelAdBtn = document.getElementById("cancel-ad-btn");
const currentTimeDisplay = document.getElementById("currentTime");
const totalDurationDisplay = document.getElementById("totalDuration");
const progressBar = document.getElementById("progressBar");
const videoTimer = document.querySelector(".video-timer");
const watchAdBtns = document.querySelectorAll(".timeUpWatchAd");
const timeUpAdBtn = document.getElementById("timeUpAdBtn");
const secondChanceAdBtn = document.getElementById("secondChanceAdBtn");
const anotherQuestion = document.querySelector(".another-question");
const moreTimeOption = document.querySelector(".More-timeOption");
const pauseTimeNum = document.querySelector(".pauseTimeNum");
const pauseTimer = document.querySelector(".pauseTimer");
const shareBtn = document.querySelector(".quizinvite");
const disableTimer = localStorage.getItem("disableTimer");
const savedProfileImage = localStorage.getItem("profileImage");

const userProfile = document.querySelector(".userProfile");

const failedModal = document.querySelector(".failedModal");
const millionaire = document.querySelector(".millionaire");
const secondChanceAltOpt = document.querySelector(".secondChanceAltOpt");
const quitOption = document.querySelector(".quitOption");
const continueOption = document.querySelector(".continueOption");
const closeSecondChanceModal = document.querySelector(
  ".closeSecondChanceModal"
);
const savedUsername = localStorage.getItem("username") || "Player";
const quizSetting = document.getElementById("quizSetting");
// const savedQuestion = localStorage.getItem("currentQuestion");
// const savedOptions = localStorage.getItem("currentOptions");

const hasAnswered = localStorage.getItem("hasAnswered");
const priceAmounts = [
  "#0",
  "#500",
  "#1,000",
  "#2,000",
  "#3,000",
  "#5,000",
  "#7,500",
  "#10,000",
  "#12,500",
  "#15,000",
  "#25,000",
  "#50,000",
  "#100,000",
  "#250,000",
  "#500,000",
  "#1,000,000",
];

const failedUsername = document.querySelector(".failedUsername");
const congratsUsername = document.querySelector(".congratsUsername");
const timeupBlock = localStorage.getItem("timeupBlock");

let secondChanceCount =
  parseInt(localStorage.getItem("secondChanceCount")) || 0;
const maxSecondChances = 6;
function pickSecondChanceIndexes(totalQuestions, maxSecondChances) {
  const indexes = [];
  while (indexes.length < maxSecondChances) {
    const idx = Math.floor(Math.random() * totalQuestions);
    if (!indexes.includes(idx)) indexes.push(idx);
  }
  return indexes;
}

if (timeupBlock) {
  triggerTimeUpModal();
} else {
  timeUpModal.style.display = "none";
}
function shouldShowSecondChance(currentPrice, currentHeartNum) {
  const allowedPrices = [
    "#500",
    "#1,000",
    "#2,000",
    "#3,000",
    "#5,000",
    "#7,500",
    "#10,000",
    "#12,500",
    "#15,000",
    "#25,000",
    "#50,000",
    "#100,000",
    "#250,000",
  ];

  const secondChanceIndexes =
    JSON.parse(localStorage.getItem("secondChanceIndexes")) || [];
  return (
    allowedPrices.includes(currentPrice) &&
    secondChanceCount < maxSecondChances &&
    Math.random() < 0.5 &&
    currentHeartNum > 0 &&
    secondChanceIndexes.includes(currentQuestionIndex)
  );
}

const isGithubPages = window.location.hostname.includes("github.io");
const base = isGithubPages ? "/quiz-app/" : "../";

const quitEarlyModal = document.querySelector(".quitEarlyModal");
const coinsMaxDisplay = document.querySelector(".coinMax-cont");

const heartMaxDisplay = document.querySelector(".heartMax-cont");
const coinNum = document.querySelector(".coin-num");
const heartText = document.querySelector(".heartnum");
console.log(heartText);
const secondChanceModal = document.querySelector(".secondChanceModal");
const currentCoins = parseInt(localStorage.getItem("coinCount")) || 0;
let currentHeartNum = parseInt(localStorage.getItem("heartNum"));

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
      alert("Quiz app link copied to clipboard!\n Share it with your friends.");
    });
  }
});

let pauseTimeCount = parseInt(localStorage.getItem("pauseTimeCount"));
if (isNaN(pauseTimeCount)) {
  pauseTimeCount = parseInt(pauseTimeNum.textContent) || 0;
}
pauseTimeNum.textContent = pauseTimeCount;

quizSetting.addEventListener("click", () => {
  localStorage.setItem("hasAnswered", "true");
  setTimeout(() => {
    location.href = base + "SettingsPage/setting.html";
  }, 200);
});
if (currentHeartNum === null || isNaN(currentHeartNum)) {
  currentHeartNum = 5; // Set to 5 only if heartNum is not defined
  localStorage.setItem("heartNum", currentHeartNum);
}
if (savedProfileImage) {
  userProfile.src = savedProfileImage;
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
if (priceTag.textContent === "#500,000") {
  quitEarlyModal.style.display = "block";
}
function decodeHTMLEntities(text) {
  const txt = document.createElement("textarea");
  txt.innerHTML = text;
  return txt.value;
}
function loadHints() {
  const fiftyFiftyUsed = localStorage.getItem("fiftyFiftyUsed");
  if (fiftyFiftyUsed === "true") {
    fiftyFiftyBtn.style.backgroundColor = "grey";
    fiftyFiftyBtn.style.pointerEvents = "none";
    fiftyFiftyBtn.style.opacity = "0.5";
  } else {
    fiftyFiftyBtn.style.pointerEvents = "none";
    fiftyFiftyBtn.style.opacity = "0.5";
  }
  const expertUsed = localStorage.getItem("expertUsed");
  if (expertUsed === "true") {
    expertAnsBtn.style.backgroundColor = "grey";
    expertAnsBtn.style.pointerEvents = "none";
    expertAnsBtn.style.opacity = "0.5";
  } else {
    expertAnsBtn.style.pointerEvents = "none";
    expertAnsBtn.style.opacity = "0.5";
  }
  const anotherQuestionUsed = localStorage.getItem("anotherQuestionUsed");
  if (anotherQuestionUsed === "true") {
    anotherQuestion.style.backgroundColor = "grey";
    anotherQuestion.style.pointerEvents = "none";
    anotherQuestion.style.opacity = "0.5";
  } else {
    anotherQuestion.style.pointerEvents = "none";
    anotherQuestion.style.opacity = "0.5";
  }
}

const difficulty = document.querySelector(".difficulty");

let shuffledAnswers = [];
let correctAnswer = "";
let attempts = 0;
let timerInterval;
const expertAnsBtn = document.querySelector(".call-an-expert");

const selectedDifficulty = localStorage.getItem("selectedDifficulty") || "easy";

anotherQuestion.addEventListener("click", () => {
  const anotherQuestionUsed =
    localStorage.getItem("anotherQuestionUsed") === "true";
  if (anotherQuestionUsed) return;

  window.location.reload();
  anotherQuestion.style.backgroundColor = "grey";
  anotherQuestion.style.pointerEvents = "none";
  localStorage.setItem("anotherQuestionUsed", "true");
});
userProfile.addEventListener("click", () => {
  localStorage.setItem("hasAnswered", "true");
  setTimeout(() => {
    location.href = base + "profilePage/user.html";
  }, 200);
});
moreTimeOption.addEventListener("click", () => {
  let pauseTimeCount = parseInt(pauseTimeNum.textContent);

  if (currentCoins >= 3000) {
    const updatedCoins = currentCoins - 3000;
    alert("5X pause Timer activated for this game");
    localStorage.setItem("coinCount", updatedCoins);
    coinNum.textContent = updatedCoins;
    timeUpModal.style.display = "none";
    localStorage.removeItem("timeupBlock");
    pauseTimeCount += 5;
    if (pauseTimeCount > 5) pauseTimeCount = 5;
    pauseTimeNum.textContent = pauseTimeCount;
    localStorage.setItem("pauseTimeCount", pauseTimeCount);
    enablePauseTimer();
    playCoinPurchaseSound();
    pauseTimeNum.classList.add("timePaused");
    pauseTimeNum.classList.add("hintNumDisplay");
    coinsMaxDisplay.classList.remove("displayMax");

    localStorage.setItem("disableTimer", "true");
    startTimer();
  } else {
    alert(
      "Not Enough coins to get Time Pauses... \n go store, use a heart to buy some coins "
    );
    playPurchaseFailSound();
  }
});

pauseTimer.addEventListener("click", () => {
  let pauseTimeCount = parseInt(pauseTimeNum.textContent);
  if (pauseTimeCount > 0) {
    pauseTimeCount -= 1;
    pauseTimeNum.textContent = pauseTimeCount;
    localStorage.setItem("pauseTimeCount", pauseTimeCount);
    pauseTimeNum.classList.add("timePaused");
    pauseTimeNum.classList.add("hintNumDisplay");
    pauseQuizTimer();

    disablePauseTimer();
  } else {
    disablePauseTimer();
  }
});

if (pauseTimeCount > 0) {
  enablePauseTimer();
  pauseTimeNum.classList.add("hintNumDisplay");
} else {
  disablePauseTimer();

  pauseTimeNum.classList.remove("hintNumDisplay");
}

function showCorrectAns() {
  const correctIndex = shuffledAnswers.indexOf(correctAnswer);
  const correctOption = options[correctIndex];
  correctOption.parentElement.classList.add("blink-green");
}

expertAnsBtn.addEventListener("click", () => {
  // Check if the button has already been used
  const expertUsed = localStorage.getItem("expertUsed") === "true";
  if (expertUsed) return; // Do nothing if already used

  // Find the correct answer index
  const correctIndex = shuffledAnswers.indexOf(correctAnswer);

  // Map the index to the corresponding option (A, B, C, D)
  const optionLabels = ["A", "B", "C", "D"];
  const correctOption = optionLabels[correctIndex];

  // Show the alert with the correct answer
  alert(`According to Experts\nThe correct answer is option ${correctOption}`);

  // Disable the button and save its state
  expertAnsBtn.style.backgroundColor = "grey";
  expertAnsBtn.style.pointerEvents = "none";
  localStorage.setItem("expertUsed", "true"); // Save the state in localStorage
});

const fiftyFiftyBtn = document.querySelector(".fifty-fifty"); // Select thfe button

fiftyFiftyBtn.addEventListener("click", () => {
  fiftyFifty();
  // Call the fiftyFifty function when the button is clicked
});

// Retrieve the current price and index from localStorage
let currentPriceIndex = parseInt(localStorage.getItem("currentPriceIndex"));
if (isNaN(currentPriceIndex)) currentPriceIndex = 0; // Start at #0

let currentPrice = localStorage.getItem("currentPrice");
if (!currentPrice) currentPrice = priceAmounts[currentPriceIndex];

let currentQuestionIndex = parseInt(
  localStorage.getItem("currentQuestionIndex")
);
if (isNaN(currentQuestionIndex)) currentQuestionIndex = 0;

priceTag.textContent = currentPrice;

if (!localStorage.getItem("questionStates")) {
  localStorage.setItem("questionStates", JSON.stringify([]));
}

function retainPriceOnAdSuccess(callback) {
  updateQuestionNumColors(currentQuestionIndex, false);

  if (callback) callback();
}

function checkForGameCompletion() {
  const currentPrice = localStorage.getItem("currentPrice") || "#0";
  if (currentQuestionIndex >= questNumColors.length) {
    modalPriceWon.textContent = currentPrice;
    setTimeout(() => {
      if (currentPrice === "#0") {
        failedUsername.textContent = savedUsername;
        failedModal.style.display = "block";
        if (soundState === "on") {
          const failSound = new Audio("../sounds/failedGameSound.mp3");
          failSound.currentTime = 0;
          failSound.play().catch((error) => {
            console.error("Result sound playback failed:", error);
          });
        }
      } else {
        // titleEl.textContent = title;
        congratsUsername.textContent = savedUsername;
        congratulationsModal.style.display = "block";
        if (currentPrice === "#1,000,000") {
          millionaire.style.display = "block";
        }
        if (soundState === "on") {
          const congratSound = new Audio("../sounds/jubilation.mp3");
          congratSound.currentTime = 0;
          congratSound.play().catch((error) => {
            console.error("Result sound playback failed:", error);
          });
        }
      }
    }, 500);

    clearInterval(timerInterval);
  }
}

closeSecondChanceModal.addEventListener("click", () => {
  secondChanceModal.style.display = "none";
  reducePriceOnFailure(() => {
    if (currentQuestionIndex >= questNumColors.length) {
      checkForGameCompletion();
      resetOnGameEnd();
    } else {
      window.location.reload();
    }
  });
});

function reducePriceOnFailure(callback) {
  priceTag.classList.add("blink-red");

  setTimeout(() => {
    priceTag.classList.remove("blink-red");

    if (currentQuestionIndex >= questNumColors.length) {
      checkForGameCompletion();
      resetOnGameEnd();
    } else {
      currentQuestionIndex += 1;
      localStorage.setItem("currentQuestionIndex", currentQuestionIndex);
    }

    // Handle price index logic
    if (currentPriceIndex > 0) {
      currentPriceIndex -= 1;
      localStorage.setItem("currentPriceIndex", currentPriceIndex);
      priceTag.textContent = priceAmounts[currentPriceIndex];
      localStorage.setItem("currentPrice", priceTag.textContent);
    } else {
      // Already at #0, stay there
      priceTag.textContent = priceAmounts[0];
      localStorage.setItem("currentPrice", priceTag.textContent);
      localStorage.setItem("currentPriceIndex", 0);
    }
    if (priceTag.textContent === "#500,000") {
      quitEarlyModal.style.display = "block";
    }
    setTimeout(() => {
      priceTag.classList.remove("slide-in");
      if (callback) callback(); // <-- Call the callback here
    }, 500);
  }, 1500);
}

function increasePriceOnSuccess() {
  localStorage.setItem("currentQuestionIndex", (currentQuestionIndex += 1));
  if (currentPriceIndex < priceAmounts.length - 1) {
    priceTag.classList.add("blink-green");
    setTimeout(() => {
      priceTag.classList.remove("blink-green");
      currentPriceIndex += 1;
      localStorage.setItem("currentPriceIndex", currentPriceIndex);
      priceTag.textContent = priceAmounts[currentPriceIndex];
      localStorage.setItem("currentPrice", priceTag.textContent);
      if (priceTag.textContent === "#500,000") {
        quitEarlyModal.style.display = "block";
      }
      setTimeout(() => {
        priceTag.classList.remove("slide-in");
      }, 500);
    }, 1500);
  }
}

if (hasAnswered === "false") {
  // currentQuestionIndex++;
  reducePriceOnFailure();
  // updateQuestionNumColors();
}
function updateQuestionNumColors(currentQuestionIndex, isCorrect) {
  let questionStates = JSON.parse(localStorage.getItem("questionStates")) || [];

  questionStates[currentQuestionIndex] = isCorrect ? "correct" : "incorrect";

  localStorage.setItem("questionStates", JSON.stringify(questionStates));

  questNumColors.forEach((questNumColor, index) => {
    if (index < currentQuestionIndex) {
      questNumColor.style.backgroundColor =
        questionStates[index] === "correct" ? "green" : "red";
    } else if (index === currentQuestionIndex) {
      questNumColor.style.backgroundColor = "orange";
    } else {
      questNumColor.style.backgroundColor = "white";
    }
  });
}

function restoreQuestionNumColors(currentQuestionIndex) {
  let questionStates = JSON.parse(localStorage.getItem("questionStates")) || [];

  questNumColors.forEach((questNumColor, index) => {
    if (index < currentQuestionIndex) {
      questNumColor.style.backgroundColor =
        questionStates[index] === "correct" ? "green" : "red";
    } else if (index === currentQuestionIndex) {
      questNumColor.style.backgroundColor = "orange";
    } else {
      questNumColor.style.backgroundColor = "white";
    }
  });
}

secondChanceAltOpt.addEventListener("click", () => {
  currentHeartNum = parseInt(localStorage.getItem("heartNum")) || 0;
  if (currentHeartNum > 0) {
    currentHeartNum -= 1;
    localStorage.setItem("heartNum", currentHeartNum);
    heartText.textContent = currentHeartNum;

    // Blink the heartNum to show reduction
    heartText.classList.add("blinked-red");
    setTimeout(() => {
      heartText.classList.remove("blinked-red");
    }, 1500);

    // Play the purchase sound
    playCoinPurchaseSound();

    // Close the modal
    secondChanceModal.style.display = "none";
    window.scrollTo({ top: 0, behavior: "smooth" });
    // Continue to next question or reload as needed
    currentQuestionIndex += 1;
    localStorage.setItem("currentQuestionIndex", currentQuestionIndex);
    setTimeout(() => {
      window.location.reload();
    }, 500);
  } else {
    alert("Not enough hearts!");
  }
});

restoreQuestionNumColors(currentQuestionIndex);

setTimeout(() => {
  // Clear the content first
  priceTag.textContent = "";

  // Animate the content character by character
  let index = 0;
  const interval = setInterval(() => {
    if (index < currentPrice.length) {
      priceTag.textContent += currentPrice[index];
      index++;
    } else {
      clearInterval(interval);
    }
  }, 100);
}, 500);

let url = `https://opentdb.com/api.php?amount=15&type=multiple&difficulty=${selectedDifficulty}`;

// if (savedQuestion && savedOptions) {
//   question.textContent = savedQuestion;
//   options.forEach((option, i) => {
//     option.textContent = shuffledAnswers[i];
//     localStorage.setItem("currentOptions", option.textContent);
//   });
// } else {
fetch(url)
  .then((res) => {
    if (!res.ok) {
      throw new Error(`HTTP error! Status: ${res.status}`);
    }
    return res.json();
  })
  .then((data) => {
    if (!data.results || !data.results.length) {
      question.innerHTML = `<div class="failureMessage">No questions found.<br>Please change your settings or try again later.</div>`;
      options.forEach((opt) => {
        opt.parentElement.style.pointerEvents = "none";
        opt.parentElement.style.opacity = "0.5";
      });
      return;
    }
    if (currentQuestionIndex > 0) {
      localStorage.setItem("hasAnswered", "false");
    }
    question.textContent = decodeHTMLEntities(data.results[0].question);
    console.log(question.textContent);

    // localStorage.setItem("currentQuestion", "true");
    const incorrectAnswers =
      data.results[0].incorrect_answers.map(decodeHTMLEntities);
    correctAnswer = decodeHTMLEntities(data.results[0].correct_answer);
    incorrectAnswers.push(correctAnswer);

    shuffledAnswers = incorrectAnswers.sort(() => Math.random() - 0.5);

    options.forEach((option, i) => {
      option.textContent = shuffledAnswers[i];
      // localStorage.setItem("currentOptions", option.textContent);

      option.parentElement.addEventListener("click", () => {
        const isCorrect = shuffledAnswers[i] === correctAnswer;
        // localStorage.removeItem("currentOptions", option.textContent);
        // localStorage.removeItem("currentQuestion", question.textContent);
        localStorage.setItem("hasAnswered", "true");
        if (isCorrect) {
          updateQuestionNumColors(currentQuestionIndex, true);
        } else {
          updateQuestionNumColors(currentQuestionIndex, false);
        }

        options.forEach((opt) => {
          opt.parentElement.style.pointerEvents = "none";
        });

        option.parentElement.classList.add("blink-orange");

        setTimeout(() => {
          option.parentElement.classList.remove("blink-orange");
          if (soundState === "on") {
            const resultSound = new Audio(
              isCorrect ? "../sounds/correct.mp3" : "../sounds/fail.wav"
            );
            resultSound.currentTime = 0; // Reset sound to the beginning
            resultSound.play().catch((error) => {
              console.error("Result sound playback failed:", error);
            });
          }

          fetch("../praise.json")
            .then((response) => response.json())
            .then((responseMessages) => {
              if (isCorrect) {
                option.parentElement.classList.add("correct-answer");
                increasePriceOnSuccess();

                const praises = responseMessages.praises;
                let randomNumber = Math.floor(Math.random() * praises.length);
                let randomMessage = praises[randomNumber];

                // Clear the question box and display the praise GIF
                question.innerHTML = "";
                const gifImage = document.createElement("img");
                gifImage.src = randomMessage.path;
                gifImage.alt = randomMessage.name;
                gifImage.style.maxWidth = "80%";
                gifImage.style.borderRadius = "1rem";
                question.appendChild(gifImage);
                resultMessage.textContent = randomMessage.message;

                updateQuestionNumColors(currentQuestionIndex, true);
                console.log(questNumColors.length);
                console.log(currentQuestionIndex);

                if (currentQuestionIndex >= questNumColors.length) {
                  setTimeout(() => {
                    checkForGameCompletion();
                    resetOnGameEnd();
                  }, 1600);
                } else {
                  setTimeout(() => {
                    window.location.reload();
                  }, 2000);
                }
              } else {
                priceTag.style.backgroundColor = "price-tag-failure";
                option.parentElement.disabled = "true";
                option.parentElement.classList.add("incorrect-answer");
                const failed = responseMessages.failed;
                let randomNumber = Math.floor(Math.random() * failed.length);
                let randomMessage = failed[randomNumber];

                question.innerHTML = "";
                const gifImage = document.createElement("img");
                gifImage.src = randomMessage.path;
                gifImage.alt = randomMessage.name;
                gifImage.style.maxWidth = "80%";
                gifImage.style.borderRadius = "1rem";
                question.appendChild(gifImage);
                resultMessage.textContent = randomMessage.message;
                console.log(questNumColors.length);
                console.log(currentQuestionIndex);
                showCorrectAns();
                if (
                  shouldShowSecondChance(priceTag.textContent, currentHeartNum)
                ) {
                  setTimeout(() => {
                    secondChanceModal.style.display = "block";
                    pauseQuizTimer();
                  }, 1000);
                  return;
                }

                updateQuestionNumColors(currentQuestionIndex, false);

                reducePriceOnFailure();
                if (currentQuestionIndex >= questNumColors.length) {
                  setTimeout(() => {
                    checkForGameCompletion();
                    resetOnGameEnd();
                  }, 1600);
                } else {
                  setTimeout(() => {
                    window.location.reload();
                  }, 2000);
                }
              }
            })
            .catch((error) => {
              console.error("Error fetching praise messages:", error);
            });
        }, 1500); // 1.5 seconds for the blinking animation
      });
    });

    gsap.from(".question", {
      x: 200,
      opacity: 0,
      duration: 0.2,
    });
    hints.forEach((hint) => {
      hint.style.backgroundColor = "";
      hint.style.pointerEvents = "auto";
      hint.style.opacity = "1";
    });
    const fiftyFiftyUsed = localStorage.getItem("fiftyFiftyUsed");
    if (fiftyFiftyUsed === "true") {
      fiftyFiftyBtn.style.backgroundColor = "grey";
      fiftyFiftyBtn.style.pointerEvents = "none";
      fiftyFiftyBtn.style.opacity = "0.5";
    } else {
      fiftyFiftyBtn.style.backgroundColor = "";
      fiftyFiftyBtn.style.pointerEvents = "auto";
      fiftyFiftyBtn.style.opacity = "1";
    }
    const expertUsed = localStorage.getItem("expertUsed");
    if (expertUsed === "true") {
      expertAnsBtn.style.backgroundColor = "grey";
      expertAnsBtn.style.pointerEvents = "none";
      expertAnsBtn.style.opacity = "0.5";
    } else {
      expertAnsBtn.style.backgroundColor = "";
      expertAnsBtn.style.pointerEvents = "auto";
      expertAnsBtn.style.opacity = "1";
    }

    const anotherQuestionUsed = localStorage.getItem("anotherQuestionUsed");
    if (anotherQuestionUsed === "true") {
      anotherQuestion.style.backgroundColor = "grey";
      anotherQuestion.style.pointerEvents = "none";
      anotherQuestion.style.opacity = "0.5";
    } else {
      anotherQuestion.style.backgroundColor = "";
      anotherQuestion.style.pointerEvents = "auto";
      anotherQuestion.style.opacity = "1";
    }

    startTimer();
  })
  .catch((error) => {
    hints.forEach((hint) => {
      hint.style.pointerEvents = "none";
      hint.style.opacity = "0.5";
    });
    disablePauseTimer();
    localStorage.setItem("hasAnswered", "true");
    question.innerHTML = `<div class="failureMessage">failed to load resource...<br>Refresh Page/ check Network </div>   `;
    console.error(error);
  });

quitBtn.addEventListener("click", () => {
  localStorage.setItem("hasAnswered", "true");
  setTimeout(() => {
    window.location.href = base + "homepage/home.html";
  }, 200);
});

storeBtns.forEach((storeBtn) => {
  storeBtn.addEventListener("click", () => {
    localStorage.setItem("hasAnswered", "true");
    setTimeout(() => {
      window.location.href = base + "StorePage/store.html";
    }, 200);
  });
});

function startTimer() {
  const currentQuestionIndex =
    parseInt(localStorage.getItem("currentQuestionIndex")) || 0;

  if (currentQuestionIndex >= 15) {
    localStorage.removeItem("disableTimer");
    console.log("Unlimited Answer Time has been reset after the game.");
  }

  let elapsedTime = 0;
  let timerDuration = 30;

  timerInterval = setInterval(() => {
    elapsedTime++;

    // Calculate the width percentage
    const widthPercentage =
      ((timerDuration - elapsedTime) / timerDuration) * 100;
    timerShow.style.width = `${widthPercentage}%`;

    // Trigger the modal when the timer ends
    if (elapsedTime >= timerDuration) {
      clearInterval(timerInterval); // Stop the timer
      triggerTimeUpModal(); // Trigger the modal
    }
  }, 1000); // Update every second
}

// Function to trigger the timeUpModal
function triggerTimeUpModal() {
  timeUpModal.style.display = "block";
  localStorage.setItem("timeupBlock", "true");
}

let ads = [];
let adTimer = null;
let totalAdTime = 0;
const maxAdTime = 60;
const cancelTime = 40;
let cancelButtonShown = false;

// Fetch ads once at startup
fetch("../adLinks.json")
  .then((response) => response.json())
  .then((data) => {
    ads = data;
  })
  .catch((error) => console.error("Error loading ads:", error));

// Format time in MM:SS format
function formatTime(seconds) {
  const minutes = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  return `${minutes}:${secs < 10 ? "0" : ""}${secs}`;
}

// Show a random ad
function showRandomAd() {
  if (!ads.length) return;
  let randomNumber = Math.floor(Math.random() * ads.length);
  const randomAd = ads[randomNumber];
  adVideo.src = randomAd.path;
  adVideo.load();
  adVideo.play();
}

// Start the ad sequence
function startAdSequence() {
  totalAdTime = 0;
  cancelButtonShown = false;
  cancelAdBtn.style.display = "none";
  adVideo.style.display = "block";
  adModalFooter.style.display = "none";
  showRandomAd();

  if (adTimer) clearInterval(adTimer);
  adTimer = setInterval(() => {
    totalAdTime++;
    // Show the cancel button after 40 seconds
    if (totalAdTime >= cancelTime && !cancelButtonShown) {
      cancelAdBtn.style.display = "block";
      cancelButtonShown = true;
      adModalFooter.style.display = "block";
    }
    // Stop the timer after 60 seconds
    if (totalAdTime >= maxAdTime) {
      clearInterval(adTimer);
    }
  }, 1000);
}

// --- Ad Video Event Listeners (set up ONCE) ---
let lastAdBtnId = null;
adVideo.addEventListener("loadedmetadata", () => {
  const totalDuration = formatTime(adVideo.duration);
  totalDurationDisplay.textContent = totalDuration;
  progressBar.max = adVideo.duration;
});

adVideo.addEventListener("timeupdate", () => {
  const currentTime = formatTime(adVideo.currentTime);
  currentTimeDisplay.textContent = currentTime;
  progressBar.value = adVideo.currentTime;
});
watchAdBtns.forEach((watchAdBtn) => {
  watchAdBtn.addEventListener("click", () => {
    backgroundMusic.pause();
    adModal.style.display = "block";
    lastAdBtnId = watchAdBtn.id;
    if (lastAdBtnId === "secondChanceAdBtn") {
      secondChanceModal.style.display = "none";
      clearInterval(timerInterval);
    }
    startAdSequence();
  });
});

// const navType = performance.getEntriesByType("navigation")[0].type;

adVideo.addEventListener("ended", () => {
  // if (navType === "reload") {
  //   alert("finish Ad video to continue game 🙏🏼");
  // }
  if (totalAdTime < maxAdTime) {
    setTimeout(showRandomAd, 500);
  } else {
    adModal.style.display = "none";
    alert("ad-ended! continue to game");
    adVideo.style.display = "none";
    cancelAdBtn.style.display = "none";
    adModalFooter.style.display = "none";
    if (lastAdBtnId === "timeUpAdbtn") {
      timeUpModal.style.display = "none";
      localStorage.removeItem("timeupBlock");
    }
    if (lastAdBtnId === "secondChanceAdBtn") {
      secondChanceModal.style.display = "none";

      retainPriceOnAdSuccess(() => {
        currentQuestionIndex += 1;
        localStorage.setItem("currentQuestionIndex", currentQuestionIndex);
        if (currentQuestionIndex >= questNumColors.length) {
          checkForGameCompletion();
          resetOnGameEnd();
        } else {
          window.location.reload();
        }
      });
    }

    if (adTimer) clearInterval(adTimer);
    startTimer();
    if (savedMusicState === "playing") backgroundMusic.play();
    else backgroundMusic.pause();
  }
});

cancelAdBtn.addEventListener("click", () => {
  adModal.style.display = "none";
  adVideo.style.display = "none";
  cancelAdBtn.style.display = "none";
  adVideo.pause();
  adVideo.src = "";
  adModalFooter.style.display = "none";
  if (savedMusicState === "playing") backgroundMusic.play();
  else backgroundMusic.pause();
  if (lastAdBtnId === "timeUpAdbtn") {
    timeUpModal.style.display = "none";
    localStorage.removeItem("timeupBlock");
  }
  if (lastAdBtnId === "secondChanceAdBtn") {
    secondChanceModal.style.display = "none";

    retainPriceOnAdSuccess(() => {
      currentQuestionIndex += 1;
      localStorage.setItem("currentQuestionIndex", currentQuestionIndex);
      if (currentQuestionIndex >= questNumColors.length) {
        checkForGameCompletion();
        resetOnGameEnd();
      } else {
        window.location.reload();
      }
    });
  }
  startTimer();
  if (adTimer) clearInterval(adTimer);
});

adModalFooter.addEventListener("click", () => {
  adModal.style.display = "none";
  adVideo.style.display = "none";
  adVideo.pause();
  adVideo.src = "";
  if (savedMusicState === "playing") backgroundMusic.play();
  else backgroundMusic.pause();
  if (lastAdBtnId === "timeUpAdbtn") {
    timeUpModal.style.display = "none";
    localStorage.removeItem("timeupBlock");
  }
  if (lastAdBtnId === "secondChanceAdBtn") {
    secondChanceModal.style.display = "none";

    retainPriceOnAdSuccess(() => {
      currentQuestionIndex += 1;
      localStorage.setItem("currentQuestionIndex", currentQuestionIndex);
      if (currentQuestionIndex >= questNumColors.length) {
        checkForGameCompletion();
        resetOnGameEnd();
      } else {
        window.location.reload();
      }
    });
  }

  startTimer();
  if (adTimer) clearInterval(adTimer);
});

// --- Watch Ad Button Handler ---

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

gsap.from(".option-text", {
  x: 200, // Fly in from the right
  opacity: 0,
  duration: 0.5,
  stagger: 0.5,
});
leaveBtns.forEach((leaveBtn) => {
  leaveBtn.addEventListener("click", () => {
    setTimeout(() => {
      window.location.href = base + "homepage/home.html";
    }, 200);
  });
});

playAgains.forEach((playAgain) => {
  playAgain.addEventListener("click", () => {
    resetOnGameEnd();
    setTimeout(() => {
      window.location.href = base + "Quizpage/quiz.html";
    }, 300);
  });
});

function resetOnGameEnd() {
  if (currentQuestionIndex >= 15) {
    localStorage.removeItem("disableTimer");
    const totalQuestions = questNumColors.length;
    const secondChanceIndexes = pickSecondChanceIndexes(
      totalQuestions,
      maxSecondChances
    );
    localStorage.setItem(
      "secondChanceIndexes",
      JSON.stringify(secondChanceIndexes)
    );
    localStorage.setItem("secondChanceCount", "0");

    localStorage.getItem("expertAnsUsed");
    localStorage.getItem("fiftyPercentHintUsed");
    localStorage.getItem("fiftyHintBought");
    localStorage.getItem("anotherQuestionBought");
    localStorage.getItem("expertAnsBought");

    localStorage.removeItem("currentPrice");
    localStorage.removeItem("currentQuestionIndex");
    localStorage.removeItem("currentPriceIndex");
    localStorage.removeItem("questionStates");
    localStorage.removeItem("fiftyFiftyUsed");
    localStorage.removeItem("expertUsed");
    localStorage.removeItem("anotherQuestionUsed");
    // localStorage.removeItem("anotherQuestionUsed");
    localStorage.removeItem("fiftyPercentHintUsed");
    localStorage.removeItem("expertAnsUsed");
    localStorage.removeItem("anotherQuestionHintUsed");
    localStorage.removeItem("fiftyHintBought");
    localStorage.removeItem("expertAnsBought");
    localStorage.removeItem("anotherQuestionBought");
    resetHeartNum();
    resetCoinCount();
    localStorage.setItem("pauseTimeCount", "0");
    pauseTimeNum.textContent = "0";
    pauseTimeNum.classList.remove("hintNumDisplay");

    localStorage.setItem("fiftyFiftyUsed", "false");
    localStorage.setItem("expertUsed", "false");
    localStorage.setItem("anotherQuestionUsed", "false");
    localStorage.setItem("currentPrice", "#0");
    localStorage.setItem("currentQuestionIndex", "0");
    localStorage.setItem("currentPriceIndex", "0");
    questNumColors.forEach((questNumColor) => {
      questNumColor.style.backgroundColor = "white";
    });
  }
}
function fiftyFifty() {
  // Find the indices of incorrect answers
  const incorrectIndices = [];
  shuffledAnswers.forEach((answer, index) => {
    if (answer !== correctAnswer) {
      incorrectIndices.push(index);
    }
  });

  const randomIndices = incorrectIndices
    .sort(() => Math.random() - 0.5)
    .slice(0, 2);

  // Grey out and disable the selected incorrect answers
  randomIndices.forEach((index) => {
    const option = options[index];
    option.parentElement.style.backgroundColor = "grey";
    option.parentElement.style.pointerEvents = "none"; // Disable click
  });

  fiftyFiftyBtn.style.backgroundColor = "grey";
  fiftyFiftyBtn.style.pointerEvents = "none";
  fiftyFiftyBtn.style.opacity = "0.5";
  localStorage.setItem("fiftyFiftyUsed", "true");
}
const GameContainer = document.querySelector(".game-container");

if (savedTheme === "dark") {
  GameContainer.classList.add("dark");
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
    if (
      soundState === "on" &&
      !(button === pauseTimer && pauseTimer.style.pointerEvents === "none")
    ) {
      soundEffect.currentTime = 0; // Reset sound to the beginning
      soundEffect.play(); // Play the sound effect
    }
  });
});

quitOption.addEventListener("click", () => {
  quitEarlyModal.style.display = "none";
  modalPriceWon.textContent = "#500,000";
  titleEl.textContent = title;
  congratulationsModal.style.display = "block";
  if (soundState === "on") {
    const congratSound = new Audio("../sounds/jubilation.mp3");
    congratSound.currentTime = 0;
    congratSound.play().catch((error) => {
      console.error("Result sound playback failed:", error);
    });

    clearInterval(timerInterval);
  }
});
const closeQuitEarlyModal = document.querySelector(".closeQuitEarlyModal");
console.log(closeQuitEarlyModal);
continueOption.addEventListener("click", () => {
  quitEarlyModal.style.display = "none";
});
closeQuitEarlyModal.addEventListener("click", () => {
  quitEarlyModal.style.display = "none";
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
function disablePauseTimer() {
  pauseTimer.style.pointerEvents = "none";
  setTimeout(() => {
    pauseTimer.style.backgroundColor = "grey";
    pauseTimer.style.opacity = "0.5";
  }, 2000);
}
function enablePauseTimer() {
  pauseTimer.style.pointerEvents = "auto";
  pauseTimer.style.backgroundColor = "";
  pauseTimer.style.opacity = "1";
}
function pauseQuizTimer() {
  if (timerInterval) {
    clearInterval(timerInterval);
    timerInterval = null;
  }

  if (timerShow) {
    timerShow.style.animationPlayState = "paused";
  }
}
function resumeQuizTimer() {
  if (timerShow) {
    timerShow.style.animationPlayState = "running";
  }
}

function playCoinPurchaseSound() {
  if (soundState == "on") {
    setTimeout(() => {
      const coinSound = new Audio("../sounds/coinPurchase.wav"); // Replace with the actual path to your sound file
      coinSound.currentTime = 0; // Reset the sound to the beginning
      coinSound.play().catch((error) => {
        console.error("Error playing coin sound:", error);
      });
    }, 1000);
  }
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
// disablePauseTimer();
resumeQuizTimer();
loadHints();
