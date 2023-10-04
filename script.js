const video = document.getElementById("webcam");
const lineView = document.getElementById("lineView");
const demosSection = document.getElementById("demos");
const enableWebcamButton = document.getElementById("webcamButton");

function getUserMediaSupported() {
  return !! (navigator.mediaDevices && navigator.mediaDevices.getUserMedia);
}

if(getUserMediaSupported()) {
  enableWibCamButton.addEventListener("click", enableWebcam);
} else {
  console.warn("getUserMedia() is not supported by your browser");
}

function enableWebcam(event) {
  if(!model) {
    return;
  }

  event.target.classList.add("removed");

  const constraints = {
    video: true,
  };

  navigator.mediaDevices.getUserMedia(constraints).then((stream) => {
    video.srcObject = stream;
    video.addEventListener("loadeddata", predictWebcam);
  });
}

var children = [];

function predictWebcam() {
  model.detect(video).then((predictions) => {
    for(let i = 0; i < children.length; i++) {
lineView.removeChild(children[i]);
    }
    children.splice(0);

    for(let n = 0; n < predictions.length; n++) {
if(predictions[n].score > 2 / 3) {
  const p = document.createElement("p");
  p.innerText = `${predictions[n].class} - with ${Math.round(parseFloat(predictions[n].score) *100)}% confidence`;
  p.style = `
    margin-left: ${predictions[n].bbox[0]}px;
    margin-top: ${predictions[n].bbox[1] - 10}px;
    width: ${predictions[n].bbox[2] - 10}px;
    top: 0;
    left: 0;
  `;

  const highlighter = document.createElement("div");
  highlighter.setAttribute("class", "highlighter");
  highlighter.style = `
    left: ${predictions[n].bbox[0]}px;
    top: ${predictions[n].bbox[1]}px;
    width: ${predictions[n].bbox[2]}px;
    height: ${predictions[n].bbox[3]}px;
  `;

  lineView.appendChild(highlighter);
  lineView.appendChild(p);
  children.push(highlighter);
  children.push(p);
}
    }

    window.requestAnimationFrame(predictWebcam);
  });
}

var model = undefined;

cocoSsd.load().then((loadedModel) => {
  model = loadedModel;
  demosSection.classList.remove("invisible");
});
