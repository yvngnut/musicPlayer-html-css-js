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
background = document.getElementById('bg-img')

const music = new Audio();

const song = [
    {
        path: 'songs/skyfm.mp3',
        displayName: '104.5 sky fm',
        cover: 'images/skyfm.jpg',
        artist: 'skychaser',

    },
    {
        path: 'songs/sb.mp3',
        displayName: 'not even ghosts are this empty',
        cover: 'images/sb.jpg',
        artist: '$b',

    },
    {
        path: 'songs/nebula.mp3',
        displayName: 'nebula',
        cover: 'images/nebula.jpg',
        artist: 'ilyvirato',

    },
    {
        path: 'songs/baixo.mp3',
        displayName: 'baixo',
        cover: 'images/baixo.jpg',
        artist: 'xxanteria',

    },
    {
        path: 'songs/lovehate.mp3',
        displayName: 'lovehate thing',
        cover: 'images/lovehate.jpg',
        artist: 'wale ft.sam drew',

    },
    {
        path: 'songs/loft.mp3',
        displayName: 'loft music',
        cover: 'images/loft.jpg',
        artist: 'the weeknd',

    },
    {
        path: 'songs/urn.mp3',
        displayName: 'III.urn',
        cover: 'images/urn.jpg',
        artist: 'childish gambino',

    },
    {
        path: 'songs/thunderstorm.mp3',
        displayName: 'shes thunderstorms',
        cover: 'images/thunderstorm.jpg',
        artist: 'artic monkeys',

    },
    {
        path: 'songs/fluxwave.mp3',
        displayName: 'fluxxwave (slowed + reverb)',
        cover: 'images/fluxwave.jpg',
        artist: 'clovis reyes',

    }
];

let musicIndex = 0;
let isPlaying = false;

function togglePlay(){
    if(isPlaying){
        pauseMusic();
    }else{
        playMusic();
    }
}

function playMusic(){
    isPlaying = true;
    // change play button icon
    playBtn.classList.replace('fa-play', 'fa-pause');
    // set button hover title
    playBtn.setAttribute('title', 'Pause');
    music.play();
}
function pauseMusic(){
    isPlaying = false;
    // change pause button icon
    playBtn.classList.replace('fa-pause', 'fa-play');
    // set button hover title
    playBtn.setAttribute('title', 'Play');
    music.pause();
}

function loadMusic(song) {
    music.src = song.path;
    title.textContent = song.displayName;
    artist.textContent = song.artist;
    image.src = song.cover;
    background.src = song.cover;
}

function changeMusic(direction){
    musicIndex = (musicIndex + direction + song.length) %
    song.length;
    loadMusic(song[musicIndex]);
    playMusic();
}

function updateProgressBar() {
    const { duration, currentTime } = music;
    const progressPercent = (currentTime / duration) * 100;
    progress.style.width = `${progressPercent}%`;

    const formatTime = (time) => String(Math.floor(time)).padStart(2, '0');
    durationEl.textContent = `${formatTime(duration / 60)}:${formatTime(duration % 60)}`;
    currentTimeEl.textContent = `${formatTime(currentTime / 60)}:${formatTime(currentTime % 60)}`;
}


function setProgressBar(e) {
    const width = playerProgress.clientWidth;
    const clickX = e.offsetX;
    music.currentTime = (clickX / width) * music.duration;
}

playBtn.addEventListener('click', togglePlay);
prevBtn.addEventListener('click', () => changeMusic(-1));
nextBtn.addEventListener('click', () => changeMusic(1));
music.addEventListener('ended', () => changeMusic(1));
music.addEventListener('timeupdate', updateProgressBar);
playerProgress.addEventListener('click', setProgressBar);

loadMusic(songs[musicIndex]);