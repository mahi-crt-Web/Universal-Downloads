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
    link.download = parsedUrl.pathname.split("/").pop() || "video.mp4";
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
  downloadLink.download = parsedUrl.pathname.split("/").pop() || "song.mp3";
  downloadLink.textContent = "Download Song";

  songMessage.replaceChildren(
    audio,
    document.createElement("br"),
    downloadLink
  );
});
// IMAGES DOWNLOADER

const imageUrlInput = document.getElementById("imageUrl");
const imageDownloadBtn = document.getElementById("imageDownloadBtn");
const imageMessage = document.getElementById("imageMessage");

imageDownloadBtn.addEventListener("click", () => {
  const url = imageUrlInput.value.trim();

  if (!url) {
    imageMessage.textContent = "Please paste an image link.";
    return;
  }

  let parsedUrl;

  try {
    parsedUrl = new URL(url);
  } catch {
    imageMessage.textContent = "Please enter a valid image URL.";
    return;
  }

  if (!["https:", "http:"].includes(parsedUrl.protocol)) {
    imageMessage.textContent = "Invalid image link.";
    return;
  }

  const imageTypes = [".jpg", ".jpeg", ".png", ".webp", ".gif"];

  const isDirectImage = imageTypes.some(type =>
    parsedUrl.pathname.toLowerCase().endsWith(type)
  );

  if (!isDirectImage) {
    const link = document.createElement("a");
    link.href = parsedUrl.href;
    link.target = "_blank";
    link.rel = "noopener noreferrer";
    link.textContent = "Open image page";

    imageMessage.replaceChildren(
      document.createTextNode("Use a direct image link: "),
      link
    );
    return;
  }

  const preview = document.createElement("img");
  preview.src = parsedUrl.href;
  preview.alt = "Image preview";
  preview.style.maxWidth = "100%";
  preview.style.maxHeight = "300px";

  const downloadLink = document.createElement("a");
  downloadLink.href = parsedUrl.href;
  downloadLink.download = parsedUrl.pathname.split("/").pop() || "image.jpg";
  downloadLink.textContent = "Download Image";

  imageMessage.replaceChildren(
    preview,
    document.createElement("br"),
    downloadLink
  );
});
// CLOUDFLARE WORKER CONNECTION TEST

const backendStatus = document.createElement("p");
backendStatus.textContent = "Connecting to backend...";
document.body.appendChild(backendStatus);

fetch("https://universal-downloads.durgamaheswari335.workers.dev/")
  .then(response => response.json())
  .then(data => {
    backendStatus.textContent = "✅ Backend Connected: " + data.message;
  })
  .catch(error => {
    backendStatus.textContent = "❌ Backend connection failed.";
    console.error(error);
  });
// INSTAGRAM LINK HANDLER

const instagramUrlInput = document.getElementById("instagramUrl");
const instagramBtn = document.getElementById("instagramBtn");
const instagramMessage = document.getElementById("instagramMessage");

if (instagramUrlInput && instagramBtn && instagramMessage) {
  instagramBtn.addEventListener("click", () => {
    const rawUrl = instagramUrlInput.value.trim();

    if (!rawUrl) {
      instagramMessage.textContent = "Please paste an Instagram video or Reel link.";
      return;
    }

    let parsedUrl;

    try {
      parsedUrl = new URL(rawUrl);
    } catch {
      instagramMessage.textContent = "Please enter a valid URL.";
      return;
    }

    const host = parsedUrl.hostname.toLowerCase();

    if (host !== "instagram.com" && !host.endsWith(".instagram.com")) {
      instagramMessage.textContent = "Please enter an Instagram link.";
      return;
    }

    const link = document.createElement("a");
    link.href = parsedUrl.href;
    link.target = "_blank";
    link.rel = "noopener noreferrer";
    link.textContent = "Open Instagram video";

    instagramMessage.replaceChildren(
      document.createTextNode("Use Instagram's official options or creator-authorized content: "),
      link
    );
  });
}
