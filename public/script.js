let audioContext;
let mediaStream;
let flameCount = 3;
let flamesBlownOut = 0;
let microphoneStopped = false; // Flag to track microphone status
const bdMsgEl = document.getElementById("bdMsg");
function setupAudio() {
  if (window.AudioContext || window.webkitAudioContext) {
    audioContext = new (window.AudioContext || window.webkitAudioContext)();
    navigator.mediaDevices
      .getUserMedia({ audio: true })
      .then(function (stream) {
        mediaStream = stream; // Store the media stream
        const source = audioContext.createMediaStreamSource(stream);
        const scriptNode = audioContext.createScriptProcessor(2048, 1, 1);
        source.connect(scriptNode);
        scriptNode.connect(audioContext.destination);
        scriptNode.onaudioprocess = function (event) {
          if (!microphoneStopped) {
            // Check if microphone is stopped
            const inputData = event.inputBuffer.getChannelData(0);
            let sum = 0;
            for (let i = 0; i < inputData.length; i++) {
              sum += Math.abs(inputData[i]);
            }
            const average = sum / inputData.length;
            const amp = Math.round(average * 10000);
            if (amp > 1000) {
              const randomFlameIndex =
                Math.floor(Math.random() * flameCount) + 1;
              const flame = document.getElementById("flame" + randomFlameIndex);
              if (flame.style.display !== "none") {
                flame.style.display = "none";
                flamesBlownOut++;
                if (flamesBlownOut === flameCount) {
                  let nameT = decodeURI(location.pathname);
                  nameT = nameT.charAt(1).toUpperCase() + nameT.slice(2);
                  console.log(nameT);
                  bdMsgEl.innerHTML = `Happy Birthday <br> ${nameT}`;
                  bdMsgEl.classList.add("changeColor");
                  bdMsgEl.style.fontFamily = "birthday";
                  const hbdaudio = new Audio("/hbd.mp3");
                  const cheeraudio = new Audio("/cheering.mp3");
                  cheeraudio.play();
                  hbdaudio.play();
                  stopMicrophone();
                  confetti({
                    particleCount: 500,
                    startVelocity: 30,
                    spread: 360,
                    origin: {
                      x: 0.5,
                      y: 0,
                    },
                  });

                  function frame() {
                    // launch a few confetti from the left edge
                    confetti({
                      colors: ["#ff00ff", "#ff0000"],
                      particleCount: 2,
                      angle: 60,
                      spread: 55,
                      origin: { x: 0 },
                    });
                    // and launch a few from the right edge
                    confetti({
                      colors: ["#ff00ff", "#ff0000"],
                      particleCount: 2,
                      angle: 120,
                      spread: 55,
                      origin: { x: 1 },
                    });

                    // keep going until we are out of time
                  }

                  setInterval(() => {
                    frame();
                  }, 100);
                  createBalloons(10);
                }
              }
            }
          }
        };
      })
      .catch(function (err) {
        console.error("Error accessing microphone:", err);
      });
  } else {
    console.error("AudioContext is not supported in this browser.");
  }
}

function stopMicrophone() {
  if (mediaStream) {
    mediaStream.getTracks()[0].stop(); // Stop the microphone track
    microphoneStopped = true; // Set flag to true
    console.log("Microphone access revoked.");
  }
}

document.getElementById("mainContainer").style.opacity = 0.5;
document.getElementById("micAccessBtn").style.opacity = 1;
11;
document.getElementById("micAccessBtn").addEventListener("click", function () {
  if (audioContext && audioContext.state === "suspended") {
    audioContext.resume().then(function () {
      console.log("AudioContext is resumed.");
      setupAudio(); // Start audio processing after the context is resumed
    });
  }
  setupAudio();
  document.getElementById("micAccessBtn").style.display = "none";
  document.getElementById("mainContainer").style.opacity = 1;
});

const balloonContainer = document.getElementById("balloon-container");

function random(num) {
  return Math.floor(Math.random() * num);
}

function getRandomStyles() {
  var r = random(255);
  var g = random(255);
  var b = random(255);
  var mt = random(200);
  var ml = random(50);
  var dur = random(5) + 5;
  return `
  background-color: rgba(${r},${g},${b},0.7);
  color: rgba(${r},${g},${b},0.7); 
  box-shadow: inset -7px -3px 10px rgba(${r - 10},${g - 10},${b - 10},0.7);
  margin: ${mt}px 0 0 ${ml}px;
  animation: float ${dur}s ease-in infinite
  `;
}

function createBalloons(num) {
  for (var i = num; i > 0; i--) {
    var balloon = document.createElement("div");
    balloon.className = "balloon";
    balloon.style.cssText = getRandomStyles();
    balloonContainer.append(balloon);
  }
}

function removeBalloons() {
  balloonContainer.style.opacity = 0;
  setTimeout(() => {
    balloonContainer.remove();
  }, 500);
}
