// Fetch all MP3 files from the "Music" folder
async function loadSongs() {
    const songList = document.getElementById("song-list");

    try {
        const response = await fetch("/api/get-songs"); // API route to list MP3s
        const songs = await response.json();

        if (songs.length === 0) {
            songList.innerHTML = "<option>No songs found</option>";
            return;
        }

        // Add songs to dropdown
        songs.forEach(song => {
            let option = document.createElement("option");
            option.value = `/Music/${song}`;
            option.textContent = song;
            songList.appendChild(option);
        });
    } catch (error) {
        console.error("Error loading songs:", error);
    }
}

// Audio player controls
const audio = document.getElementById("audio-player");
const playButton = document.getElementById("play");
const pauseButton = document.getElementById("pause");
const stopButton = document.getElementById("stop");
const songList = document.getElementById("song-list");

// When a song is selected, load it into the audio player
songList.addEventListener("change", () => {
    if (songList.value) {
        audio.src = songList.value;
        audio.play();
    }
});

playButton.addEventListener("click", () => audio.play());
pauseButton.addEventListener("click", () => audio.pause());
stopButton.addEventListener("click", () => {
    audio.pause();
    audio.currentTime = 0;
});

// Load songs when the page loads
window.onload = loadSongs;
