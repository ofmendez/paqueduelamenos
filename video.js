function setVH() {
  const vh = window.innerHeight * 0.01;
  document.documentElement.style.setProperty("--vh", `${vh}px`);
}

setVH();
window.addEventListener("resize", setVH);

const iframe = document.getElementById("youtubePlayer");
const audioToggle = document.getElementById("audioToggle");

function sendYouTubeCommand(func, args = []) {
  if (!iframe || !iframe.contentWindow) return;

  iframe.contentWindow.postMessage(
    JSON.stringify({
      event: "command",
      func,
      args
    }),
    "*"
  );
}

window.addEventListener("load", () => {
  setTimeout(() => {
    sendYouTubeCommand("mute");
    sendYouTubeCommand("playVideo");
  }, 1200);
});

audioToggle.addEventListener("click", () => {
  sendYouTubeCommand("unMute");
  sendYouTubeCommand("setVolume", [100]);
  sendYouTubeCommand("playVideo");
  audioToggle.classList.add("is-hidden");
});