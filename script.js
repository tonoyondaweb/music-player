// Buttons and audio
const playBtn = document.getElementById('play');
const prev = document.getElementById('prev');
const next = document.getElementById('next');
const audio = document.querySelector('audio');

// Progress bar elements
const progressContainer = document.getElementById('progress-container');
const progressBar = document.getElementById('progress');
const currentTimeEl = document.getElementById('current-time');
const durationEl = document.getElementById('duration');

// Track details
const albumArt = document.querySelector('img');
const title = document.querySelector('h2');
const artist = document.querySelector('h3');
// Track list
const tracks = [
    {
        name: 'jacinto-1',
        displayName: 'Electric Chill Machine',
        artist: 'Jacinto Design',
      },
      {
        name: 'jacinto-2',
        displayName: 'Seven Nation Army (Remix)',
        artist: 'Jacinto Design',
      },
      {
        name: 'jacinto-3',
        displayName: 'Goodnight, Disco Queen',
        artist: 'Jacinto Design',
      },
      {
        name: 'metric-1',
        displayName: 'Front Row (Remix)',
        artist: 'Metric/Jacinto Design',
      },
];

// Music play boolean
let nowPlaying = false;

// Play fn
function playMusic(){
    nowPlaying = true;
    audio.play();
    playBtn.classList.replace('fa-play','fa-pause');
    playBtn.setAttribute('title','Pause');
}

// Pause fn
function pauseMusic(){
    nowPlaying = false;
    audio.pause();
    playBtn.classList.replace('fa-pause','fa-play');
    playBtn.setAttribute('title','Play');
}

// Play button event listener
playBtn.addEventListener('click',()=>{nowPlaying ? pauseMusic() : playMusic()})

let trackIndex = 0;

function loadTrack(track){
    title.textContent = track.displayName;
    artist.textContent = track.artist;
    audio.src = `music/${track.name}.mp3`
    albumArt.src = `img/${track.name}.jpg`
}

// Play next or previous track
function nextTrack(){
    trackIndex++;
    if(trackIndex > tracks.length - 1){
        trackIndex = 0;
    }
    loadTrack(tracks[trackIndex]);
    playMusic();
}

function prevTrack(){
    trackIndex--;
    if(trackIndex < 0){
        trackIndex = tracks.length - 1;
    }
    loadTrack(tracks[trackIndex]);
    playMusic();
}

// On load
loadTrack(tracks[trackIndex]);

function timeProgress(event){
    if(nowPlaying){
        const {duration,currentTime} = event.srcElement;
        const progressPercent = (currentTime/duration)*100;
        progressBar.style.width = `${progressPercent}%`;

        // Duration timestamp
        const durationMinutes = Math.floor(duration/60);
        let durationSeconds = Math.floor(duration%60);
        if(durationSeconds<10){
            durationSeconds = `0${durationSeconds}`;
        }
        if(durationSeconds){
            durationEl.textContent = `${durationMinutes}:${durationSeconds}`;
        }

        // Current timestamp
        const currentMinutes = Math.floor(currentTime/60);
        let currentSeconds = Math.floor(currentTime%60);
        if(currentSeconds<10){
            currentSeconds = `0${currentSeconds}`;
        }
        if (currentSeconds) {
            currentTimeEl.textContent = `${currentMinutes}:${currentSeconds}`;
        }
    } 
}

// Event listeners
next.addEventListener('click',nextTrack);
prev.addEventListener('click',prevTrack);
audio.addEventListener('ended',nextTrack);
audio.addEventListener('timeupdate', timeProgress);