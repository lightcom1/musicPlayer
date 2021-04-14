const musicContainer = document.querySelector('.music-container');
const playBtn = document.querySelector('#play');
const prevBtn = document.querySelector('#prev');
const nextBtn = document.querySelector('#next');
const audio = document.querySelector('#audio');
const progress = document.querySelector('.progress');
const progressContainer = document.querySelector('.progress-container');
const title = document.querySelector('#title');

const songs = ['Billie Eilish - bury a friend', 'Billie Eilish - You Should See Me In A Crown', 'Dennis Lloyd - Snow White', 'Oliver Tree - Jerk', 'Oliver Tree - Miracle Man', 'Psycho!   MASE', 'Sub Urban - PATCHWERK', 'Toss A Coin To Your Witcher', 'Y2K, bbno$ - Lalala'];

let songIndex = 2;


const loadSong = (song) => {
	title.innerText = song;
	audio.src = `music/${song}.mp3`
}

loadSong(songs[songIndex]);

const playSong = () => {
	musicContainer.classList.add('play');
	playBtn.querySelector('i.fas').classList.remove('fa-play');
	playBtn.querySelector('i.fas').classList.add('fa-pause');
	audio.play();
}

const pauseSong = () => {
	musicContainer.classList.remove('play');
	playBtn.querySelector('i.fas').classList.add('fa-play');
	playBtn.querySelector('i.fas').classList.remove('fa-pause');
	audio.pause();
}

const prevSong = () => {
	songIndex--;
	songIndex < 0 ? songIndex = songs.length - 1 : songIndex;
	loadSong(songs[songIndex]);
	playSong();
}

const nextSong = () => {
	songIndex++;
	songIndex > songs.length - 1 ? songIndex = 0 : songIndex;
	loadSong(songs[songIndex]);
	playSong();
}

const updateProgress = (e) => {
	const {duration, currentTime} = e.srcElement;
	const progressPercent = (currentTime / duration) * 100;
	progress.style.width = `${progressPercent}%`
}

const setProgress = (e) => {
	const width = progressContainer.clientWidth;
	const clickX = e.offsetX;
	const duration = audio.duration;
	audio.currentTime = (clickX / width) * duration;
}

playBtn.addEventListener('click', () => {
	const isPlaying = musicContainer.classList.contains('play');
	isPlaying ? pauseSong() : playSong();
})

prevBtn.addEventListener('click', prevSong);
nextBtn.addEventListener('click', nextSong);

audio.addEventListener('timeupdate', updateProgress);

progressContainer.addEventListener('click', setProgress);

audio.addEventListener('ended', nextSong)