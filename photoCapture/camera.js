const video = document.querySelector("#video");
const canvas = document.querySelector("#canvas");
const captureButton = document.querySelector("#capture-button");
const cancelButton = document.querySelector("#cancel-button");

const isGithubPages = window.location.hostname.includes("github.io");
const base = isGithubPages ? "/quiz-app/" : "../";
// Access the user's webcam
navigator.mediaDevices
  .getUserMedia({ video: true })
  .then((stream) => {
    video.srcObject = stream;
    video.play();
  })
  .catch((error) => {
    console.error("Error accessing webcam: ", error);
  });

// Capture the image when the button is clicked

cancelButton.addEventListener("click", () => {
  setTimeout(() => {
    window.location.href = base + "EditPage/edit.html";
  }, 200);
  // Redirect to edit page
});
captureButton.addEventListener("click", () => {
  const context = canvas.getContext("2d");

  // Check the capture mode
  const captureMode = localStorage.getItem("captureMode");

  if (captureMode === "bannerImage") {
    // Set larger canvas size for banner images
    canvas.width = 800; // Example width for banner
    canvas.height = 400; // Example height for banner
  } else {
    // Set default canvas size for profile images
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
  }

  // Draw the current video frame to the canvas
  context.drawImage(video, 0, 0, canvas.width, canvas.height);

  // Convert the canvas image to a data URL
  const imageData = canvas.toDataURL("image/png");

  // Save the image to localStorage based on the capture mode
  if (captureMode === "profileImage") {
    localStorage.setItem("profileImage", imageData); // Save as profile image
  } else if (captureMode === "bannerImage") {
    localStorage.setItem("bannerImage", imageData); // Save as banner image
  }

  // Redirect back to edit.html
  setTimeout(() => {
    window.location.href = base + "EditPage/edit.html";
  }, 200);
});
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
