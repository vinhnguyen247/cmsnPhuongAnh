// Hiệu ứng animation cho nội dung (index.html)
document.addEventListener("DOMContentLoaded", () => {
  const content = document.querySelector(".content");
  setTimeout(() => {
    content.classList.add("show");
  }, 1000); // Hiển thị nội dung sau 2 giây
});

// Tự động phát video khi chuyển trang
document.getElementById("playVideoButton").addEventListener("click", (event) => {
  event.preventDefault(); // Ngăn chuyển trang ngay

  // Lưu trạng thái để kích hoạt video
  sessionStorage.setItem("playVideo", "true");

  // Tạo một AudioContext để kích hoạt âm thanh
  const audioContext = new (window.AudioContext || window.webkitAudioContext)();
  if (audioContext.state === "suspended") {
    audioContext.resume();
  }

  // Chuyển đến trang video
  window.location.href = "video.html";
});

// Tự động phát video trong video.html
if (document.body.classList.contains("video-page")) {
  const videoElement = document.querySelector("video");
  const playVideo = sessionStorage.getItem("playVideo");

  if (playVideo === "true") {
    videoElement.muted = false; // Đảm bảo âm thanh được bật
    videoElement.autoplay = true; // Tự động phát video
    videoElement.play().then(() => {
      videoElement.volume = 1.0; // Đặt âm lượng tối đa
    }).catch((error) => {
      console.error("Lỗi khi phát video có âm thanh:", error);
    });

    sessionStorage.removeItem("playVideo"); // Xóa trạng thái
  }
}
