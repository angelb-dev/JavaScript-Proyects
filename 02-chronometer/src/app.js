// Get DOM elements
const timerDisplay = document.getElementById('timer');
const startButton = document.getElementById('start');
const stopButton = document.getElementById('stop');
const resetButton = document.getElementById('reset');
const editButton = document.getElementById('edit');
const editCancelButton = document.getElementById('edit-cancel');
const editSaveButton = document.getElementById('edit-save');
const editHoursInput = document.getElementById('edit-hours');
const editMinutesInput = document.getElementById('edit-minutes');
const editSecondsInput = document.getElementById('edit-seconds');
const editIncrementInput = document.getElementById('edit-increment');
const editSoundSelect = document.getElementById('edit-sound');
const editRepeatCheckbox = document.getElementById('edit-repeat');
const editMessageTextarea = document.getElementById('edit-message');
const editContainer = document.getElementById('edit-container');

// Set initial timer value
let hours = 0;
let minutes = 0;
let seconds = 60;
let increment = 1;
let sound = 'none';
let repeat = false;
let message = '';
let timerId;

// Define timer function
function updateTimer() {
  if (seconds > 0) {
    seconds--;
  } else if (minutes > 0) {
    seconds = 59;
    minutes--;
  } else if (hours > 0) {
    minutes = 59;
    seconds = 59;
    hours--;
  } else {
    playSound(sound);
    alert(message);
    if (repeat) {
      hours = parseInt(editHoursInput.value);
      minutes = parseInt(editMinutesInput.value);
      seconds = parseInt(editSecondsInput.value);
    }
  }
  timerDisplay.textContent = `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
}

// Play sound function
function playSound(sound) {
  const audio = new Audio();
  if (sound === 'xylophone') {
    audio.src = '../src/assets/sounds/xylophone.mp3';
  } else if (sound === 'title') {
    audio.src = '../src/assets/sounds/title.mp3';
  }
  audio.play();
}

// Start timer function
function startTimer() {
  timerId = setInterval(updateTimer, 1000);
}

// Stop timer function
function stopTimer() {
  clearInterval(timerId);
}

// Reset timer function
function resetTimer() {
  stopTimer();
  hours = 0;
  minutes = 0;
  seconds = 60;
  timerDisplay.textContent = '01:00';
}

// Event listeners
startButton.addEventListener('click', () => {
  startTimer();
});

stopButton.addEventListener('click', () => {
  stopTimer();
});

resetButton.addEventListener('click', () => {
  resetTimer();
});

editButton.addEventListener('click', () => {
  editContainer.style.display = 'block';
});

editCancelButton.addEventListener('click', () => {
  editContainer.style.display = 'none';
});

editSaveButton.addEventListener('click', () => {
  hours = parseInt(editHoursInput.value);
  minutes = parseInt(editMinutesInput.value);
  seconds = parseInt(editSecondsInput.value);
  increment = parseInt(editIncrementInput.value);
  sound = editSoundSelect.value;
  repeat = editRepeatCheckbox.checked;
  message = editMessageTextarea.value;
  editContainer.style.display = 'none';
});