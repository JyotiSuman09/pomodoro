const start = document.getElementById("start");
const time = document.getElementById("time");
const title = document.getElementById("title");

let remainTime = 1500;
let breakTime = 300;
let timeId;
let totalBreak = 4;

start.addEventListener("click", () => {
    start.style.display = "none";
    startTimer();
});

function startTimer() {
    title.innerHTML = "POMODORO";
    timeId = setInterval(() => {
        const min = Math.floor(remainTime / 60);
        const sec = remainTime % 60;

        time.innerHTML = `${min}:${sec}`;

        if (remainTime === 0) {
            reset();
            clearInterval(timeId);
            startBreak();
        } else remainTime--;
    }, 1000);
}

function startBreak() {
    title.innerHTML = "BREAK";
    playAudio();
    timeId = setInterval(() => {
        const min = Math.floor(breakTime / 60);
        const sec = breakTime % 60;

        time.innerHTML = `${min}:${sec}`;

        if (breakTime === 0) {
            resetBreak();
            clearInterval(timeId);
            startTimer();
        } else breakTime--;
    }, 1000);
}

function resetBreak() {
    totalBreak--;
    if (totalBreak === 0) (totalBreak = 4), (breakTime = 900);
    else breakTime = 300;
}

function reset() {
    remainTime = 1500;
}

function playAudio() {
    const audioSrc = "/assets/jaldi waha se hato meme template.m4a";
    const audioElement = new Audio(audioSrc);
    audioElement.play();
}
