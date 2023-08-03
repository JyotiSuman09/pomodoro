const start = document.getElementById("start");
const timerDisplay = document.getElementById("timer");
const title = document.getElementById("sessionStatus");

let workTIme = 25 * 60;
let breakTime = 5 * 60;
let remainWorkTime = workTIme;
let remainBreakTime = breakTime;
let timeId;
let totalBreak = 4;

function reset() {
    remainWorkTime = workTIme;
}

function resetBreak() {
    totalBreak--;
    if (totalBreak === 1) (totalBreak = 4), (remainBreakTime = breakTime * 3);
    else remainBreakTime = breakTime;
}

function updateTimerDisplay(currentDuration) {
    const minutes = Math.floor(currentDuration / 60)
        .toString()
        .padStart(2, "0");
    const seconds = (currentDuration % 60).toString().padStart(2, "0");
    timerDisplay.textContent = `${minutes}:${seconds}`;
}

function startTimer() {
    title.innerHTML = "WORK SESSION";
    timeId = setInterval(() => {
        updateTimerDisplay(remainWorkTime);

        if (remainWorkTime === 0) {
            reset();
            clearInterval(timeId);
            startBreak();
        } else remainWorkTime--;
    }, 1000);
}

function startBreak() {
    title.innerHTML = "BREAK";
    playAudio();
    timeId = setInterval(() => {
        updateTimerDisplay(remainBreakTime);

        if (remainBreakTime === 0) {
            resetBreak();
            clearInterval(timeId);
            startTimer();
        } else remainBreakTime--;
    }, 1000);
}

function playAudio() {
    const audioSrc = "/assets/warn.m4a";
    const audioElement = new Audio(audioSrc);
    audioElement.play();
}

function getRandomColor() {
    const red = Math.floor(Math.random() * 256);
    const green = Math.floor(Math.random() * 256);
    const blue = Math.floor(Math.random() * 256);
    return `rgb(${red}, ${green}, ${blue})`;
}

function changeBackgroundColor() {
    const randomColor = getRandomColor();
    document.body.style.backgroundColor = randomColor;
    start.style.backgroundColor = randomColor;
}

changeBackgroundColor();
start.addEventListener("click", () => {
    start.style.display = "none";
    startTimer();
});
