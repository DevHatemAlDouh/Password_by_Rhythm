let keylogger = [];
let rekeylogger = [];
let leaner = [];
let releaner = [];

// Function to log changes
function logger() {
  const inputField = document.getElementById("password");
  const currentTime = new Date().toISOString();

  keylogger.push([inputField.value, currentTime]);

  if (keylogger.length > 1) {
    const prevTime = new Date(keylogger[keylogger.length - 2][1]).getTime();
    const currTime = new Date(keylogger[keylogger.length - 1][1]).getTime();

    let sos = currTime - prevTime;

    leaner.push(sos);
  }
}

function save_password() {
  const inputField = document.getElementById("password");
  inputField.disabled = true;
}

function relogger() {
  const inputField = document.getElementById("rhythmInput");
  const currentTime = new Date().toISOString();

  rekeylogger.push([inputField.value, currentTime]);

  if (rekeylogger.length > 1) {
    const prevTime = new Date(rekeylogger[rekeylogger.length - 2][1]).getTime();
    const currTime = new Date(rekeylogger[rekeylogger.length - 1][1]).getTime();

    let sos = currTime - prevTime;

    releaner.push(sos);
  }
}

function compare() {
  if (keylogger.length !== rekeylogger.length) {
    console.log("Password lengths do not match!");
    return;
  }

  for (let i = 0; i < keylogger.length; i++) {
    if (keylogger[i][0] !== rekeylogger[i][0]) {
      console.log("Passwords do not match!");
      return;
    }
  }

  let rhythmMatch = true;
  for (let i = 0; i < leaner.length; i++) {
    if (Math.abs(leaner[i] - releaner[i]) > 200) {
      rhythmMatch = false;
      break;
    }
  }

  if (rhythmMatch) {
    console.log("Password and rhythm match! Access granted.");
  } else {
    console.log("Rhythm does not match! Access denied.");
  }
}

function resetFields() {
  const passwordField = document.getElementById("password");
  const rhythmInputField = document.getElementById("rhythmInput");

  // Clear logs
  keylogger = [];
  rekeylogger = [];
  leaner = [];
  releaner = [];

  // Clear values and enable input fields
  passwordField.value = "";
  rhythmInputField.value = "";
  passwordField.disabled = false;
  rhythmInputField.disabled = false;

  console.log("Fields have been reset");
}

// Attach event listener specifically to the input field
document.getElementById("password").addEventListener("input", logger);

document.getElementById("submitBtn").addEventListener("click", save_password);

document.getElementById("rhythmInput").addEventListener("input", relogger);

document.getElementById("rhythmInput").addEventListener("change", compare);

document.getElementById("resetBtn").addEventListener("click", resetFields);

// Clear the input field on page load
window.onload = function () {
  document.getElementById("password").value = "";
  document.getElementById("rhythmInput").value = "";
};
