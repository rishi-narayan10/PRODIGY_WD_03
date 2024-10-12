let startTime = 0;
let currentTime = 0;
let lapTime = 0;
let intervalId = null;
let isRunning = false;
let laps = [];

document.getElementById('start-btn').addEventListener('click', start);
document.getElementById('pause-btn').addEventListener('click', pause);
document.getElementById('reset-btn').addEventListener('click', reset);
document.getElementById('restart-btn').addEventListener('click', restart);
document.getElementById('lap-btn').addEventListener('click', lap);

function start() {
    startTime = new Date().getTime();
    intervalId = setInterval(updateTime, 1000);
    isRunning = true;
    document.getElementById('start-btn').disabled = true;
    document.getElementById('pause-btn').disabled = false;
    document.getElementById('reset-btn').disabled = false;
    document.getElementById('restart-btn').disabled = false;
    document.getElementById('lap-btn').disabled = false;
}

function pause() {
    clearInterval(intervalId);
    isRunning = false;
    document.getElementById('start-btn').disabled = false;
    document.getElementById('pause-btn').disabled = true;
}

function reset() {
    startTime = 0;
    currentTime = 0;
    lapTime = 0;
    clearInterval(intervalId);
    isRunning = false;
    document.getElementById('time').innerHTML = '00:00:00';
    document.getElementById('laps').innerHTML = '';
    laps = [];
    document.getElementById('start-btn').disabled = false;
    document.getElementById('pause-btn').disabled = true;
    document.getElementById('reset-btn').disabled = true;
    document.getElementById('restart-btn').disabled = true;
    document.getElementById('lap-btn').disabled = true;
}

function restart() {
    startTime = new Date().getTime();
    intervalId = setInterval(updateTime, 1000);
    isRunning = true;
    document.getElementById('start-btn').disabled = true;
    document.getElementById('pause-btn').disabled = false;
    document.getElementById('reset-btn').disabled = false;
    document.getElementById('restart-btn').disabled = true;
    document.getElementById('lap-btn').disabled = false;
}

function lap() {
    lapTime = new Date().getTime() - startTime;
    const lapTimeString = formatTime(lapTime);
    const lapListItem = document.createElement('li');
    lapListItem.textContent = `Lap ${laps.length + 1}: ${lapTimeString}`;
    document.getElementById('laps').appendChild(lapListItem);
    laps.push(lapTimeString);
}

function updateTime() {
    currentTime = new Date().getTime() - startTime;
    const timeString = formatTime(currentTime);
    document.getElementById('time').innerHTML = timeString;
}

function formatTime(time) {
    const hours = Math.floor(time / 3600000);
    const minutes = Math.floor((time % 3600000) / 60000);
    const seconds = Math.floor((time % 60000) / 1000);
    return `${pad(hours)}:${pad(minutes)}:${pad(seconds)}`;
}

function pad(number) {
    return (number < 10? '0' : '') + number;
}