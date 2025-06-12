const okBtn = document.getElementById("okBtn");
const difficultySelect = document.getElementById("Difficulty");
const themeBtn = document.querySelector(".item2");
const container = document.querySelector(".container");
const settingTitle = document.querySelector(".setting-title");
const themeIcon = document.querySelector(".themeIcon");

const savedTheme = localStorage.getItem("theme") || "light";
const selectedDifficulty = localStorage.getItem("selectedDifficulty") || "easy";

difficultySelect.value = selectedDifficulty;
difficultySelect.addEventListener("change", () => {
  const selectedDifficulty = difficultySelect.value;
  localStorage.setItem("selectedDifficulty", selectedDifficulty);
  console.log("Difficulty set to:", selectedDifficulty);
});

if (savedTheme === "dark") {
  container.classList.add("dark");
  settingTitle.classList.add("head-color");
  themeIcon.src = "../images/light-mode.png";
} else {
  themeIcon.src = "../images/night-mode.png";
}

themeBtn.addEventListener("click", () => {
  container.classList.toggle("dark");
  settingTitle.classList.toggle("head-color");

  if (container.classList.contains("dark")) {
    themeIcon.src = "../images/light-mode.png";
    localStorage.setItem("theme", "dark");
  } else {
    themeIcon.src = "../images/night-mode.png";
    localStorage.setItem("theme", "light");
  }
});

const musicBtn = document.querySelector(".item4"); // Select the Music button
const backgroundMusic = document.getElementById("backgroundMusic"); // Select the audio element

const backgroundMusicIcon = document.querySelector(".background-music-icon");
const savedMusicState = localStorage.getItem("musicState") || "paused";
const savedMusicTime = parseFloat(localStorage.getItem("musicTime")) || 0;
backgroundMusic.currentTime = savedMusicTime;
backgroundMusic.addEventListener("timeupdate", () => {
  localStorage.setItem("musicTime", backgroundMusic.currentTime);
});

if (savedMusicState === "playing") {
  backgroundMusic.play();

  backgroundMusicIcon.src = "../images/mute.png";
} else {
  backgroundMusic.pause();

  backgroundMusicIcon.src = "../images/mute.png"; // Save the state as playing
}

// Add event listener to toggle music playback
musicBtn.addEventListener("click", () => {
  if (backgroundMusic.paused) {
    backgroundMusic.play();
    localStorage.setItem("musicState", "playing");
    backgroundMusicIcon.src = "../images/mute.png"; // Save the state as playing
    console.log("Music started");
  } else {
    backgroundMusic.pause();
    localStorage.setItem("musicState", "paused"); // Save the state as paused
    console.log("Music paused");
    backgroundMusicIcon.src = "../images/musical-note.png";
  }
});
const buttons = document.querySelectorAll(".btn");
// console.log(buttons);

const soundBtn = document.querySelector(".item3");
let soundState = localStorage.getItem("soundState") || "on";

const soundIcon = document.querySelector(".sound img");
if (soundState === "on") {
  soundIcon.src = "../images/volume.png"; // Sound is on
} else {
  soundIcon.src = "../images/mute.png"; // Sound is off
}

soundBtn.addEventListener("click", () => {
  if (soundState === "on") {
    soundState = "off";
    soundIcon.src = "../images/mute.png"; // Update icon to mute
    localStorage.setItem("soundState", "off"); // Save state
    console.log("Sound effects turned off");
  } else {
    soundState = "on";
    soundIcon.src = "../images/volume.png"; // Update icon to volume
    localStorage.setItem("soundState", "on"); // Save state
    console.log("Sound effects turned on");
  }
});

buttons.forEach((button) => {
  button.addEventListener("click", () => {
    console.log(soundState);
    if (soundState === "on") {
      soundEffect.currentTime = 0; // Reset sound to the beginning
      soundEffect.play(); // Play the sound effect
    }
  });
});

okBtn.addEventListener("click", () => {
  if (soundState === "on") {
    soundEffect.currentTime = 0;
    soundEffect.play().catch((error) => {
      console.error("Sound effect playback failed:", error);
    });
  }
  setTimeout(() => {
    history.back();
  }, 200);
});
