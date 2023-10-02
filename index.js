const shuffleBtn = document.getElementById('shuffle');
const speed100Btn = document.getElementById('speed100');
const speed150Btn = document.getElementById('speed150');
const speed200Btn = document.getElementById('speed200');
const image = document.getElementById('cover'),
title = document.getElementById('music-title'),
artist = document.getElementById('music-artist'),
currentTimeEl = document.getElementById('current-time'),
durationEl = document.getElementById('duration'),
progress = document.getElementById('progress'),
playerProgress = document.getElementById('player-progress'),
prevBtn = document.getElementById('prev'),
nextBtn = document.getElementById('next'),
playBtn = document.getElementById('play'),
restartBtn = document.getElementById("restart"),
background = document.getElementById('bg-img');

const music = new Audio();

const songs = [
    {
        path: 'assets/1.mp3',
        displayName: 'Danse macabre',
        cover: 'assets/1.jpeg',
        artist: 'Camille Saint-Saëns',
    },
    {
        path: 'assets/2.mp3',
        displayName: 'Voices of Spring Waltz',
        cover: 'assets/2.jpeg',
        artist: 'Johann Strauss',
    },
    {
        path: 'assets/3.mp3',
        displayName: 'Experience',
        cover: 'assets/3.jpeg',
        artist: 'Ludovico Einaudi',
    },
    {
        path: 'assets/4.mp3',
        displayName: 'The 4 Seasons No.2 in G Minor',
        cover: 'assets/4.jpeg',
        artist: 'Antonio Vivaldi',
    },
    {
        path: 'assets/5.mp3',
        displayName: 'Cello Suite No.1 in G Major',
        cover: 'assets/5.jpeg',
        artist: 'Johann Sebastian Bach',
    },
    {
        path: 'assets/6.mp3',
        displayName: 'BWV 147 No. 10',
        cover: 'assets/6.jpeg',
        artist: 'Johann Sebastian Bach',
    },
    {
        path: 'assets/7.mp3',
        displayName: 'Nuvole Bianche',
        cover: 'assets/7.jpeg',
        artist: 'Ludovico Einaudi',
    },
    {
        path: 'assets/8.mp3',
        displayName: 'Divertissement',
        cover: 'assets/8.jpeg',
        artist: 'Saint Preux',
    },

    {
        path: 'assets/9.mp3',
        displayName: 'The 4 Seasons No.4 in F minor',
        cover: 'assets/9.jpeg',
        artist: 'Antonio Vivaldi',
    },
    {
        path: 'assets/10.mp3',
        displayName: 'Für Elise, WoO 59',
        cover: 'assets/10.jpeg',
        artist: 'Ludwig van Beethoven',
    },
    {
        path: 'assets/11.mp3',
        displayName: 'Orchestral Suite No. 3 in D Major',
        cover: 'assets/11.jpeg',
        artist: 'Johann Sebastian Bach',
    },
    {
        path: 'assets/12.mp3',
        displayName: 'Arrival of the Birds',
        cover: 'assets/12.jpeg',
        artist: 'The Cinematic Orchestra',
    },
    {
        path: 'assets/13.mp3',
        displayName: 'Now We Are Free',
        cover: 'assets/13.jpeg',
        artist: 'Hans Zimmer',
    },
    {
        path: 'assets/14.mp3',
        displayName: 'The Belt of Faith',
        cover: 'assets/14.jpeg',
        artist: 'Jung Jae-il',
    },
    {
        path: 'assets/15.mp3',
        displayName: 'Conquest of Paradise',
        cover: 'assets/15.jpeg',
        artist: 'Vangelis',
    },
    {
        path: 'assets/16.mp3',
        displayName: 'Cornfield Chase',
        cover: 'assets/16.jpeg',
        artist: 'Hans Zimmer',
    },
    {
        path: 'assets/17.mp3',
        displayName: 'Time',
        cover: 'assets/17.jpeg',
        artist: 'Hans Zimmer',
    },
];

let musicIndex = 0;
let isPlaying = false;
let isShuffled = false;

document.addEventListener('keydown', function(event) {
    if (event.keyCode === 32) {
        togglePlay();
        event.preventDefault();
    } else if (event.keyCode === 39) {
        changeMusic(1);
    } else if (event.keyCode === 37) {
        changeMusic(-1);
    } else if (event.keyCode === 38) {
        if (music.volume < 1) music.volume += 0.1;
    } else if (event.keyCode === 40) {
        if (music.volume > 0) music.volume -= 0.1;
    }
});

function togglePlay(){
    if(isPlaying){
        pauseMusic();
    }else{
        playMusic();
    }
}

function playMusic(){
    isPlaying = true;
    // Change play button icon
    playBtn.classList.replace('fa-play', 'fa-pause');
    // Set button hover title
    playBtn.setAttribute('title', 'Pause');
    music.play();   
}

function pauseMusic(){
    isPlaying = false;
    // Change pause button icon
    playBtn.classList.replace('fa-pause', 'fa-play');
    // Set button hover title
    playBtn.setAttribute('title', 'Play');
    music.pause();   
}

function restartMusic() {
    music.currentTime = 0;
    playMusic();
}

function loadMusic(song){
    music.src = song.path;
    title.textContent = song.displayName;
    artist.textContent = song.artist;
    image.src = song.cover;
    background.src = song.cover;
}

function changeMusic(direction){
    musicIndex = (musicIndex + direction + songs.length) % songs.length;
    loadMusic(songs[musicIndex]);
    playMusic();
}

function updateProgressBar(){
    const {duration, currentTime} = music;
    const progressPercent = (currentTime / duration) * 100;
    progress.style.width = `${progressPercent}%`;

    const formatTime = (time) => String(Math.floor(time)).padStart(2, '0');
    durationEl.textContent = `${formatTime( duration / 60)}:${formatTime(duration % 60)}`;
    currentTimeEl.textContent = `${formatTime( currentTime / 60)}:${formatTime(currentTime % 60)}`;
}

function setProgressBar (e) {
    const width = playerProgress.clientWidth;
    const clickX = e.offsetX;
    music.currentTime = (clickX / width) * music.duration;
}

shuffleBtn.addEventListener('click', toggleShuffle);

function toggleShuffle() {
    isShuffled = !isShuffled; 
    if (isShuffled) {
        shuffleBtn.style.color = 'green';
        shuffleSongs();
    } else {
        shuffleBtn.style.color = '';
    }
}

function shuffleSongs() {
    for (let i = songs.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [songs[i], songs[j]] = [songs[j], songs[i]];
    }

    if (isPlaying) {
        musicIndex = 0;
        loadMusic(songs[musicIndex]);
        playMusic();
    }
}

function changePlaybackSpeed(speed) {
    music.playbackRate = speed;
}

    music.playbackRate = 1.0; 

playBtn.addEventListener('click', togglePlay);
prevBtn.addEventListener('click', () => changeMusic(-1));
nextBtn.addEventListener('click', () => changeMusic(1));
restartBtn.addEventListener("click", restartMusic);
music.addEventListener('ended', () => changeMusic(1));
music.addEventListener('timeupdate', updateProgressBar);
playerProgress.addEventListener('click', setProgressBar);
speed100Btn.addEventListener('click', () => changePlaybackSpeed(1.00));
speed150Btn.addEventListener('click', () => changePlaybackSpeed(1.5));
speed200Btn.addEventListener('click', () => changePlaybackSpeed(2.0));


loadMusic(songs[musicIndex]);