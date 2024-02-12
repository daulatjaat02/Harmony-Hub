console.log("welcome");

// DOM
let songIndex = 0;
let progress;
let audioElement = new Audio("songList/0.mp3");
let masterPlay = document.getElementById("masterPlay");
let myProgressBar = document.getElementById("myProgressBar");
let masterSongName = document.getElementById("masterSongName");
let next = document.getElementById("next");
let previous = document.getElementById("previous");
const volumeProgress = document.getElementById("volumeProgress");
const muteIcon = document.getElementById("mute");

let songItem;

// Songs : Name, Song, cover
let songs = [
  {
    songName: "Arjun Velly - Gurdarsha Dhuri",
    filePath: "songList/0.mp3",
    coverPath: "coverList/0.jpg",
  },

  {
    songName: "Satranga - Arijit Singh",
    filePath: "songList/1.mp3",
    coverPath: "coverList/1.jpg",
  },
  {
    songName: "Phir Aur Kya Chahiye -Amitabh ",
    filePath: "songList/2.mp3",
    coverPath: "coverList/2.jpg",
  },
  {
    songName: "Sooraj Hi Chhaon Banke - Menuka",
    filePath: "songList/3.mp3",
    coverPath: "coverList/3.jpg",
  },
  {
    songName: "Badass - Anirudh Ravichander",
    filePath: "songList/4.mp3",
    coverPath: "coverList/4.jpg",
  },
  {
    songName: "Ordinary Man - Anirudh ",
    filePath: "songList/5.mp3",
    coverPath: "coverList/5.jpg",
  },
  {
    songName: "I'm Scared - Anirudh",
    filePath: "songList/6.mp3",
    coverPath: "coverList/6.jpg",
  },
  {
    songName: "Dil Galti Kar Baitha - Jubin",
    filePath: "songList/7.mp3",
    coverPath: "coverList/7.jpg",
  },

  {
    songName: "Guilty - Karan Aujla",
    filePath: "songList/8.mp3",
    coverPath: "coverList/8.jpg",
  },
  {
    songName: "Leke Prabhu Ka Naam - Tiger 3",
    filePath: "songList/9.mp3",
    coverPath: "coverList/9.jpg",
  },
  {
    songName: "Jhoome Jo Pathaan - Pathaan",
    filePath: "songList/10.mp3",
    coverPath: "coverList/10.jpg",
  },
];

// Initial data
function initialize() {
  songItem = Array.from(document.getElementsByClassName("songItem"));

  // load the cover and name of the songs
  songItem.forEach((element, i) => {
    element.getElementsByTagName("img")[0].src = songs[i].coverPath;
    element.getElementsByClassName("songNametitle")[0].innerText =
      songs[i].songName;
  });
  // load the total lenth of the current song at the beginning
  masterSongName.innerText = songs[0].songName;
  audioElement.addEventListener("loadedmetadata", function () {
    const durationMinutes = Math.floor(audioElement.duration / 60);
    const durationSeconds = Math.floor(audioElement.duration % 60);
    document.getElementById("duration").innerText =
      durationMinutes +
      ":" +
      (durationSeconds < 10 ? "0" : "") +
      durationSeconds;
  });
}

initialize();

// Update the songItemPlay button
function updateSongItemPlayButtonState(index) {
  const songItemPlayButtons = document.querySelectorAll(".songItemplay");
  const currentButton = songItemPlayButtons[index];

  if (
    !audioElement.paused &&
    audioElement.currentTime > 0 &&
    songIndex === index
  ) {
    // Update songItemPlay button
    currentButton.classList.remove("fa-circle-play");
    currentButton.classList.add("fa-circle-pause");
  } else {
    currentButton.classList.remove("fa-circle-pause");
    currentButton.classList.add("fa-circle-play");
  }
}

// The masterPlay button
function updateMasterPlayButton() {
  if (audioElement.paused || audioElement.currentTime <= 0) {
    audioElement.play();
    masterPlay.classList.remove("fa-circle-play");
    masterPlay.classList.add("fa-circle-pause");
    document.body.classList.add("playing"); // Add 'playing' class to body
  } else {
    audioElement.pause();
    masterPlay.classList.remove("fa-circle-pause");
    masterPlay.classList.add("fa-circle-play");
    document.body.classList.remove("playing");
  }
}

// masterPlay Event Handler
masterPlay.addEventListener("click", () => {
  if (audioElement.paused || audioElement.currentTime <= 0) {
    masterSongName.innerText = songs[songIndex].songName;
    masterPlay.setAttribute("title", "Pause(space)");
  } else {
    masterPlay.setAttribute("title", "Play");
  }
  updateMasterPlayButton();
  updateSongItemPlayButtonState(songIndex);
});

// Progress Bar and the time update
audioElement.addEventListener("timeupdate", () => {
  progress = (audioElement.currentTime / audioElement.duration) * 100;
  myProgressBar.value = progress;

  // Update the current time display
  const currentTimeMinutes = Math.floor(audioElement.currentTime / 60);
  const currentTimeSeconds = Math.floor(audioElement.currentTime % 60);
  document.getElementById("current-time").innerText =
    currentTimeMinutes +
    ":" +
    (currentTimeSeconds < 10 ? "0" : "") +
    currentTimeSeconds;

  // Update the total duration display
  if (!isNaN(audioElement.duration)) {
    const durationMinutes = Math.floor(audioElement.duration / 60);
    const durationSeconds = Math.floor(audioElement.duration % 60);
    document.getElementById("duration").innerText =
      durationMinutes +
      ":" +
      (durationSeconds < 10 ? "0" : "") +
      durationSeconds;
  }

  updateSongItemPlayButtonState(songIndex);
});

myProgressBar.addEventListener("input", () => {
  const newTime = (myProgressBar.value * audioElement.duration) / 100;
  audioElement.currentTime = newTime;
  // updateSongItemPlayButtonState(songIndex);
});

// songItemPlay button for the current song
function makeAllPlaying() {
  songItem.forEach((element) => {
    element.querySelector(".songItemplay").classList.remove("fa-circle-pause");
    element.querySelector(".songItemplay").classList.add("fa-circle-play");
  });
}

// The songItemsPlay  Update
songItem.forEach((element, i) => {
  element.querySelector(".songItemplay").addEventListener("click", () => {
    if (songIndex === i) {
      if (audioElement.paused || audioElement.currentTime <= 0) {
        audioElement.play();
        updateMasterPlayButton();
      } else {
        audioElement.pause();
        updateMasterPlayButton();
      }
    } else {
      makeAllPlaying();
      masterSongName.innerText = songs[i].songName;
      songIndex = i;
      audioElement.src = songs[i].filePath;
      audioElement.play();
    }
    updateMasterPlayButton();
    updateSongItemPlayButtonState(i);
  });
});

// Update Master Play when clicked on forward and backward  buttons
let updateMasterPlayFB = function () {
  masterPlay.classList.remove("fa-circle-play");
  masterPlay.classList.add("fa-circle-pause");
  // document.body.classList.add("playing"); // Add 'playing' class to body
};

// next and previous buttons
let previousSong = () => {
  let prevIndex = songIndex;
  songIndex = (songIndex - 1 + songs.length) % songs.length;
  audioElement.src = songs[songIndex].filePath;
  audioElement.play();
  masterSongName.innerText = songs[songIndex].songName;
  updateMasterPlayFB();
  updateSongItemPlayButtonState(songIndex);
  updateSongItemPlayButtonState(prevIndex); // Update the previous song's button
};

previous.addEventListener("click", previousSong);

let nextSong = () => {
  let prevIndex = songIndex;
  songIndex = (songIndex + 1) % songs.length;
  audioElement.src = songs[songIndex].filePath;
  audioElement.play();
  masterSongName.innerText = songs[songIndex].songName;
  updateMasterPlayFB();
  updateSongItemPlayButtonState(songIndex);
  updateSongItemPlayButtonState(prevIndex); // Update the previous song's button
};
next.addEventListener("click", nextSong);

// Play the next song when the current song is end
audioElement.addEventListener("ended", () => {
  nextSong();
  updateSongItemPlayButtonState(songIndex);
});

// skip 10 second buttons
function skipBackward() {
  audioElement.currentTime -= 10;
}
function skipForward() {
  audioElement.currentTime += 10;
}
document.getElementById("previousSec").addEventListener("click", skipBackward);
document.getElementById("nextSec").addEventListener("click", skipForward);

// Keyboard event listener
document.addEventListener("keydown", (event) => {
  if (event.code === "Space") {
    event.preventDefault(); // Prevent the default behavior (scrolling down)
    updateMasterPlayButton();
    updateSongItemPlayButtonState(songIndex);

    if (audioElement.paused || audioElement.currentTime <= 0) {
      masterSongName.innerText = songs[songIndex].songName;
      masterPlay.setAttribute("title", "Pause(space)");
    } else {
      masterPlay.setAttribute("title", "Play(space)");
    }
  } else if (event.code === "ArrowRight") {
    nextSong();
  } else if (event.code === "ArrowLeft") {
    previousSong();
  }
});

/// Volume Control
function toggleMute() {
  if (volumeProgress.value == 0) {
    volumeProgress.value = 100;
  } else {
    volumeProgress.value = 0;
  }
  updateVolumeIcon();
  updateAudioVolume();
}

function increaseVolume() {
  volumeProgress.value = Math.min(100, parseInt(volumeProgress.value) + 10);
  updateVolumeIcon();
  updateAudioVolume();
}

function decreaseVolume() {
  volumeProgress.value = Math.max(0, parseInt(volumeProgress.value) - 10);
  updateVolumeIcon();
  updateAudioVolume();
}

function updateVolume() {
  updateVolumeIcon();
  updateAudioVolume();
}

function updateVolumeIcon() {
  if (volumeProgress.value == 0) {
    muteIcon.classList.remove("fa-volume-up", "fa-volume-down");
    muteIcon.classList.add("fa-volume-mute");
  } else if (volumeProgress.value < 66) {
    muteIcon.classList.remove("fa-volume-mute", "fa-volume-up");
    muteIcon.classList.add("fa-volume-down");
  } else {
    muteIcon.classList.remove("fa-volume-mute", "fa-volume-down");
    muteIcon.classList.add("fa-volume-up");
  }
}

function updateAudioVolume() {
  audioElement.volume = volumeProgress.value / 100;
}

muteIcon.addEventListener("click", function (event) {
  event.preventDefault();
  toggleMute();
});

volumeProgress.addEventListener("input", function (event) {
  event.preventDefault();
  updateVolume();
});

document.addEventListener("keydown", function (event) {
  if (event.code === "ArrowUp") {
    event.preventDefault();
    increaseVolume();
  } else if (event.code === "ArrowDown") {
    event.preventDefault();
    decreaseVolume();
  }
});

/////////////////////////////////////////////////////////////////////////////////////////////////////////////
