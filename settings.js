const STORAGE_KEY = "pomodoroMinutes";
const MIN_MINUTES = 1;
const MAX_MINUTES = 60;

const minutesInput = document.getElementById("timer-minutes");
const saveButton = document.getElementById("save-button");

function isValidMinutes(value) {
  if (value === "") {
    return false;
  }

  const minutes = Number(value);
  return Number.isInteger(minutes) && minutes >= MIN_MINUTES && minutes <= MAX_MINUTES;
}

function updateSaveButtonState() {
  saveButton.disabled = !isValidMinutes(minutesInput.value);
}

function saveSettings() {
  if (!isValidMinutes(minutesInput.value)) {
    return;
  }

  localStorage.setItem(STORAGE_KEY, minutesInput.value);
}

function loadSettings() {
  const savedMinutes = localStorage.getItem(STORAGE_KEY);
  if (savedMinutes !== null) {
    minutesInput.value = savedMinutes;
  }
  updateSaveButtonState();
}

loadSettings();
