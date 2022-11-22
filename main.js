const $ = document.querySelector.bind(document);

var listMusic = [
    {
        id: 1,
        name: 'Mây Đêm Chờ Mấy Đêm',
        artist: 'Nguyễn Hữu Kha',
        img: './img/maydemchomaydem.jpg',
        music: './musics/maydemchomaydem.mp3'
    },
    {
        id: 2,
        name: 'Đoạn Tuyệt Nàng Đi',
        artist: 'Phát Huy T4',
        img: './img/doantuyetnangdi.jpg',
        music: './musics/doantuyetnangdi.mp3'
    },
    {
        id: 3,
        name: 'Duyên Duyên Số Số',
        artist: 'Du Duyên',
        img: './img/duyenduyensoso.jpg',
        music: './musics/duyenduyensoso.mp3'
    },
    {
        id: 4,
        name: 'Chân Tình',
        artist: 'Anonymous Artist',
        img: './img/chantinh.jpg',
        music: './musics/chantinh.mp3'
    }
]


//Play Music

const playList = $('.playlist');
const image = $('.image');
const title = $('.title');
const artist = $('.artist');
const audio = document.createElement('audio');
const waveContainer = $('.wave-container');

const currentTime = $('.current-time');
const totalTime = $('.total-time');
const seekSlider = $('.seek-slider');
var timeInterval;

const playPauseBtn = $('.fa-circle-play');
var isPlaying = false;

const volumeSlider = $('.volume-slider');

const forward = $('.fa-forward-step');
const backward = $('.fa-backward-step');
const repeat = $('.fa-repeat');
var isRepeating = false;
const shuffle = $('.fa-shuffle');
var newListMusic = [...listMusic];
var isShuffling = false;
var index = 0;

function playMusic(index) {
    clearInterval(timeInterval);
    reset(index);
    playList.textContent = `Playing ${index + 1} of ${listMusic.length}`;
    image.style.backgroundImage = `url(${listMusic[index].img})`;
    title.textContent = listMusic[index].name;
    artist.textContent = listMusic[index].artist;
    audio.src = listMusic[index].music;

    timeInterval = setInterval(nowTime, 1000);

    audio.onended = () => {
        // isRepeating ? repeatMusic() : isShuffling ? randomMusic() : nextPlay(); 
        isRepeating ? repeatMusic() : nextPlay(); 
    }

}
playMusic(index)


function reset() {
    currentTime.textContent = '00:00';
    totalTime.textContent = '00:00';
    seekSlider.value = 0;
}


function nowTime() {
    seekSlider.value = (audio.currentTime * 100 / audio.duration)

    let nowMinute = Math.floor(audio.currentTime/60);
    let nowSecond = Math.floor(audio.currentTime - nowMinute*60);
    let durationMinute = Math.floor(audio.duration/60);
    let durationSecond = Math.floor(audio.duration - durationMinute*60);

    if (nowMinute < 10) nowMinute = '0' + nowMinute;
    if (nowSecond < 10) nowSecond = '0' + nowSecond;
    if (durationMinute < 10) durationMinute = '0' + durationMinute;
    if (durationSecond < 10) durationSecond = '0' + durationSecond;

    currentTime.textContent = nowMinute + ':' + nowSecond;
    totalTime.textContent = durationMinute + ':' + durationSecond;

}


playPauseBtn.onclick = playPauseFunc;

function playPauseFunc() {
    isPlaying ? pauseFunc() : playFunc();
}

function playFunc() {
    isPlaying = true;
    audio.play();
    playPauseBtn.classList.add('fa-circle-pause');
    playPauseBtn.classList.remove('fa-circle-play');
    image.classList.add('img-loader');
    waveContainer.classList.add('loader')
}

function pauseFunc() {
    isPlaying = false;
    audio.pause();
    playPauseBtn.classList.add('fa-circle-play');
    playPauseBtn.classList.remove('fa-circle-pause');
    image.classList.remove('img-loader');
    waveContainer.classList.remove('loader')
}

seekSlider.onchange = setTime;
function setTime() {
    audio.currentTime = seekSlider.value / 100 * audio.duration;
}

volumeSlider.onchange = setVolume;
function setVolume() {
    audio.volume = volumeSlider.value / 100;
}

function nextPlay() {
    if (index +1 === listMusic.length) index = 0;
    else index += 1;
    playMusic(index);
    playFunc();
}

forward.onclick = nextPlay;

backward.onclick = backPlay;
function backPlay() {
    if (index === 0) index = listMusic.length - 1;
    else index -= 1;
    playMusic(index);
    playFunc();
}

repeat.onclick = repeatFunc;
function repeatFunc() {
    isRepeating = !isRepeating;
    isRepeating ? repeat.style.color = 'rgb(58, 156, 237)' : repeat.style.color = 'whitesmoke';
}
function repeatMusic() {
    playMusic(index);
    playFunc();
}

shuffle.onclick = shuffleFunc;
function shuffleFunc() {
    isShuffling = !isShuffling;
    if (isShuffling) {
        shuffle.style.color = 'rgb(58, 156, 237)';
        listMusic.sort(() => (Math.random() - 0.5))  //xáo trộn mảng listMusic
    } else {
        shuffle.style.color = 'whitesmoke';
        listMusic = [...newListMusic];
    }
}
// function randomMusic() {
    // let indexRandom;
    // do {
    //     indexRandom = Math.floor(Math.random() * listMusic.length);
    // }
    // while (index === indexRandom)
    // index = indexRandom;

    // playMusic(index);
    // playFunc();
// }
