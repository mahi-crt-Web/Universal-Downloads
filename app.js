const urlInput = document.getElementById("mediaUrl");
const downloadBtn = document.getElementById("downloadBtn");
const message = document.getElementById("message");

downloadBtn.addEventListener("click", () => {
  const url = urlInput.value.trim();

  if (!url) {
    message.textContent = "Please paste a video link.";
    return;
  }

  let parsedUrl;

  try {
    parsedUrl = new URL(url);
  } catch {
    message.textContent = "Please enter a valid video URL.";
    return;
  }

  if (!["https:", "http:"].includes(parsedUrl.protocol)) {
    message.textContent = "Invalid video link.";
    return;
  }

  const videoTypes = [".mp4", ".webm", ".mov", ".m4v"];
  const isDirectVideo = videoTypes.some(type =>
    parsedUrl.pathname.toLowerCase().endsWith(type)
  );

  if (isDirectVideo) {
    const link = document.createElement("a");
    link.href = parsedUrl.href;
    link.download = "";
    link.textContent = "Download Video";

    message.replaceChildren(
      document.createTextNode("Direct video link found: "),
      link
    );
  } else {
    const link = document.createElement("a");
    link.href = parsedUrl.href;
    link.target = "_blank";
    link.rel = "noopener noreferrer";
    link.textContent = "Open official video page";

    message.replaceChildren(
      document.createTextNode("Use the platform's official download method: "),
      link
    );
  }
});

// SONGS DOWNLOADER

const songUrlInput = document.getElementById("songUrl");
const songDownloadBtn = document.getElementById("songDownloadBtn");
const songMessage = document.getElementById("songMessage");

songDownloadBtn.addEventListener("click", () => {
  const url = songUrlInput.value.trim();

  if (!url) {
    songMessage.textContent = "Please paste a direct audio link.";
    return;
  }

  let parsedUrl;

  try {
    parsedUrl = new URL(url);
  } catch {
    songMessage.textContent = "Please enter a valid audio URL.";
    return;
  }

  if (!["https:", "http:"].includes(parsedUrl.protocol)) {
    songMessage.textContent = "Invalid audio link.";
    return;
  }

  const audioTypes = [".mp3", ".wav", ".ogg", ".m4a", ".aac"];

  const isDirectAudio = audioTypes.some(type =>
    parsedUrl.pathname.toLowerCase().endsWith(type)
  );

  if (!isDirectAudio) {
    const link = document.createElement("a");
    link.href = parsedUrl.href;
    link.target = "_blank";
    link.rel = "noopener noreferrer";
    link.textContent = "Open official audio page";

    songMessage.replaceChildren(
      document.createTextNode("Use the official download option: "),
      link
    );
    return;
  }

  const audio = document.createElement("audio");
  audio.controls = true;
  audio.src = parsedUrl.href;

  const downloadLink = document.createElement("a");
  downloadLink.href = parsedUrl.href;
  downloadLink.download = "";
  downloadLink.textContent = "Download Song";

  songMessage.replaceChildren(
    audio,
    document.createElement("br"),
    downloadLink
  );
});
