// #1 Get Elements
const player = document.querySelector('.player');
const video = player.querySelector('.viewer');
const progress = player.querySelector('.progress');
const progressBar = player.querySelector('.progress__filled');
const toggle = player.querySelector('.toggle');
const skipButtons = player.querySelectorAll('[data-skip]');
const ranges = player.querySelectorAll('.player__slider');
const button = player.querySelector('.player__button');

var percent = 0;
progressBar.style.flexBasis = `${0}%`;

// #2 Build function
function togglePlay(){
    video[video.paused ? 'play' : 'pause']();
}

function handleRangeUpdate(){
    // this.name = playbackRate or volume
    video[this.name] = this.value;
}

function skip(){
    video.currentTime += parseFloat(this.dataset.skip);
}

function handleProgress(){
    percent = (video.currentTime / video.duration) * 100;
    progressBar.style.flexBasis = `${percent}%`;
}

function scrub(e){
    const scrubTime = (e.offsetX / progress.offsetWidth) * video.duration;
    video.currentTime = scrubTime;
}

// #3 Add event listener
video.addEventListener('click',togglePlay);
video.addEventListener('play',() => toggle.textContent = '⏸');
video.addEventListener('pause', () => toggle.textContent = '▶️');
video.addEventListener('timeupdate',handleProgress);
toggle.addEventListener('click',togglePlay);
skipButtons.forEach(button => button.addEventListener('click',skip));
ranges.forEach(range => range.addEventListener('click',handleRangeUpdate));
ranges.forEach(range => range.addEventListener('mousemove',handleRangeUpdate));
progress.addEventListener('click',scrub)