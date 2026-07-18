const STORAGE_KEY = "pomodoroMinutes";
const FALLBACK_MINUTES = 25;
const MIN_MINUTES = 1;
const MAX_MINUTES = 60;

function getSavedMinutes() {
  const savedMinutes = Number(localStorage.getItem(STORAGE_KEY));
  if (Number.isInteger(savedMinutes) && savedMinutes >= MIN_MINUTES && savedMinutes <= MAX_MINUTES) {
    return savedMinutes;
  }
  return FALLBACK_MINUTES;
}

const DEFAULT_SECONDS = getSavedMinutes() * 60;

let remainingSeconds = DEFAULT_SECONDS;
let intervalId = null;

const timeDisplay = document.getElementById("time-display");
updateDisplay();

function formatTime(totalSeconds) {
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;
  return `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;
}

function updateDisplay() {
  timeDisplay.textContent = formatTime(remainingSeconds);
}

function startTimer() {
  if (intervalId !== null) {
    return;
  }

  intervalId = setInterval(() => {
    if (remainingSeconds <= 0) {
      stopTimer();
      return;
    }

    remainingSeconds -= 1;
    updateDisplay();
  }, 1000);
}

function stopTimer() {
  clearInterval(intervalId);
  intervalId = null;
}

function resetTimer() {
  stopTimer();
  remainingSeconds = DEFAULT_SECONDS;
  updateDisplay();
}
