
const urlInput = document.getElementById("mediaUrl");
const downloadBtn = document.getElementById("downloadBtn");
const message = document.getElementById("message");

downloadBtn.addEventListener("click", async () => {
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
      document.createTextNode(
        "This platform requires its official download method. "
      ),
      link
    );
  }
});
