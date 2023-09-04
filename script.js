// Cache frequently used DOM elements
const $hour = $("#hour");
const $min = $("#min");
const $sec = $("#sec");
const $ampm = $("#ampm");
const $otherAmpm = $("#other-ampm");

const $stopwatchBtn = $("#stopwatch-btn");
const $timerBtn = $("#timer-btn");
const $backBtns = $(".back-btn");

const $stopwatchHours = $("#stopwatch-hour");
const $stopwatchMin = $("#stopwatch-min");
const $stopwatchSec = $("#stopwatch-sec");
const $stopwatchMs = $("#stopwatch-ms");

const $startStopwatchBtn = $(".start-stopwatch");
const $lapStopwatchBtn = $(".lap-stopwatch");
const $resetStopwatchBtn = $(".reset-stopwatch");

const $timerHours = $("#timer-hour");
const $timerMin = $("#timer-min");
const $timerSec = $("#timer-sec");
const $timerMs = $("#timer-ms");

const $startTimerBtn = $(".start-timer");
const $stopTimerBtn = $(".stop-timer");
const $resetTimerBtn = $(".reset-timer");

// Clock Update
function updateTime() {
  const time = new Date();
  let hours = time.getHours();
  let minutes = time.getMinutes();
  let seconds = time.getSeconds();
  let ampm = hours >= 12 ? "PM" : "AM";
  let otherampm = hours >= 12 ? "AM" : "PM";

  hours = hours % 12 || 12;
  hours = addTrailingZero(hours);
  minutes = addTrailingZero(minutes);
  seconds = addTrailingZero(seconds);

  $hour.html(hours);
  $min.html(minutes);
  $sec.html(seconds);
  $ampm.html(ampm);
  $otherAmpm.html(otherampm);
}

updateTime();
setInterval(updateTime, 1000);

// Stopwatch
let stopwatchHours = 0,
  stopwatchMinutes = 0,
  stopwatchSeconds = 0,
  stopwatchMiliSeconds = 0,
  stopwatchRunning = false,
  laps = 0,
  stopwatchInterval;

function stopwatch() {
  stopwatchMiliSeconds++;
  if (stopwatchMiliSeconds === 100) {
    stopwatchMiliSeconds = 0;
    stopwatchSeconds++;
  }
  if (stopwatchSeconds === 60) {
    stopwatchSeconds = 0;
    stopwatchMinutes++;
  }
  if (stopwatchMinutes === 60) {
    stopwatchMinutes = 0;
    stopwatchHours++;
  }

  $stopwatchHours.html(addTrailingZero(stopwatchHours));
  $stopwatchMin.html(addTrailingZero(stopwatchMinutes));
  $stopwatchSec.html(addTrailingZero(stopwatchSeconds));
  $stopwatchMs.html(addTrailingZero(stopwatchMiliSeconds));
}

function startStopwatch() {
  if (!stopwatchRunning) {
    stopwatchInterval = setInterval(stopwatch, 10);
    stopwatchRunning = true;
  }
}

function stopStopwatch() {
  clearInterval(stopwatchInterval);
  stopwatchRunning = false;
}

function resetStopwatch() {
  clearInterval(stopwatchInterval);
  stopwatchRunning = false;
  stopwatchHours = 0;
  stopwatchMinutes = 0;
  stopwatchSeconds = 0;
  stopwatchMiliSeconds = 0;
  laps = 0;
  $stopwatchHours.html("00");
  $stopwatchMin.html("00");
  $stopwatchSec.html("00");
  $stopwatchMs.html("00");
}

$startStopwatchBtn.click(function () {
  startStopwatch();
  $startStopwatchBtn.hide();
  $lapStopwatchBtn.show();
});

$lapStopwatchBtn.click(function () {
  laps++;
  $(".lap").removeClass("active");
  $(".laps").prepend(
    `<div class="lap active">
      <p>Lap ${laps}</p>
      <p>${addTrailingZero(stopwatchHours)} : ${addTrailingZero(stopwatchMinutes)} : ${addTrailingZero(stopwatchSeconds)} : ${addTrailingZero(stopwatchMiliSeconds)}</p>
    </div>`
  );
});

$resetStopwatchBtn.click(function () {
  resetStopwatch();
  $startStopwatchBtn.show();
  $lapStopwatchBtn.hide();
  $(".laps").html("");
});

// Timer
let time = 0,
  timerHours = 0,
  timerMinutes = 0,
  timerSeconds = 0,
  timerMiliseconds = 0,
  timerRunning = false,
  timerInterval;

function getTime() {
  time = prompt("Enter time in minutes");
  time = time * 60;
  setTime();
}

function setTime() {
  timerHours = Math.floor(time / 3600);
  timerMinutes = Math.floor((time % 3600) / 60);
  timerSeconds = Math.floor(time % 60);
  timerMiliseconds = 0;

  $timerHours.html(addTrailingZero(timerHours));
  $timerMin.html(addTrailingZero(timerMinutes));
  $timerSec.html(addTrailingZero(timerSeconds));
  $timerMs.html(addTrailingZero(timerMiliseconds));
}

function timer() {
  timerMiliseconds--;
  if (timerMiliseconds === -1) {
    timerMiliseconds = 99;
    timerSeconds--;
  }
  if (timerSeconds === -1) {
    timerSeconds = 59;
    timerMinutes--;
  }
  if (timerMinutes === -1) {
    timerMinutes = 59;
    timerHours--;
  }

  $timerHours.html(addTrailingZero(timerHours));
  $timerMin.html(addTrailingZero(timerMinutes));
  $timerSec.html(addTrailingZero(timerSeconds));
  $timerMs.html(addTrailingZero(timerMiliseconds));

  timeUp();
}

function startTimer() {
  if (timerHours === 0 && timerMinutes === 0 && timerSeconds === 0) {
    getTime();
  } else {
    timerInterval = setInterval(timer, 10);
    timerRunning = true;
    $startTimerBtn.hide();
    $stopTimerBtn.show();
  }
}

function stopTimer() {
  clearInterval(timerInterval);
  timerRunning = false;
  $startTimerBtn.show();
  $stopTimerBtn.hide();
}

function resetTimer() {
  stopTimer();
  time = 0;
  setTime();
}

function timeUp() {
  if (timerHours === 0 && timerMinutes === 0 && timerSeconds === 0 && timerMiliseconds === 0) {
    stopTimer();
    alert("Time's up!");
    setTime();
  }
}

$startTimerBtn.click(startTimer);

$stopTimerBtn.click(stopTimer);

$resetTimerBtn.click(function () {
  resetTimer();
  if (!timerRunning) {
    $startTimerBtn.show();
    $stopTimerBtn.hide();
  }
});

// Event Listeners
$stopwatchBtn.click(function () {
  $(".main-container > div").slideUp();
  $(".stopwatch").slideDown();
  $(".type").html("Stopwatch");
});

$timerBtn.click(function () {
  $(".main-container > div").slideUp();
  $(".timer").slideDown();
  $(".type").html("Timer");
});

$backBtns.click(function () {
  $(".main-container > div").slideUp();
  $(".clock").slideDown();
  $(".type").html("Clock");
});

// Helper function to add trailing zeros to numbers
function addTrailingZero(number) {
  return number < 10 ? "0" + number : number;
}
