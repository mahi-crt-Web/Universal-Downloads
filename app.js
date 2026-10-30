
const urlInput = document.getElementById("mediaUrl");
const fileInput = document.getElementById("fileInput");
const downloadBtn = document.getElementById("downloadBtn");
const message = document.getElementById("message");

downloadBtn.addEventListener("click", () => {
  const url = urlInput.value.trim();

  if (!url) {
    message.textContent = "Please paste a direct media link.";
    return;
  }

  try {
    const parsedUrl = new URL(url);

    if (!["http:", "https:"].includes(parsedUrl.protocol)) {
      throw new Error("Invalid link");
    }

    const link = document.createElement("a");
    link.href = parsedUrl.href;
    link.textContent = "Open media link";
    link.target = "_blank";
    link.rel = "noopener noreferrer";

    message.replaceChildren(
      document.createTextNode(
        "Direct link ready. The source website controls whether downloading is allowed. "
      ),
      link
    );
  } catch {
    message.textContent = "Please enter a valid direct media URL.";
  }
});

fileInput.addEventListener("change", () => {
  const file = fileInput.files[0];

  if (!file) return;

  const allowed = ["audio/", "video/", "image/"];
  if (!allowed.some(type => file.type.startsWith(type))) {
    message.textContent = "Please select an audio, video or image file.";
    return;
  }

  const objectUrl = URL.createObjectURL(file);
  const link = document.createElement("a");

  link.href = objectUrl;
  link.download = file.name;
  link.textContent = "Download " + file.name;

  message.replaceChildren(link);
});
