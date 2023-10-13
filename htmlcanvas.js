document.getElementById("captureButton").addEventListener("click", function () {
  html2canvas(document.getElementById("stamp")).then(function (canvas) {
    // 캡처된 스크린샷을 이미지로 변환
    var image = canvas.toDataURL("image/png");

    // 이미지를 다운로드할 링크를 생성
    var a = document.createElement("a");
    a.href = image;
    a.download = "stamp.png"; // 다운로드 파일 이름 설정
    a.style.display = "none";
    document.body.appendChild(a);
    a.click();
  });
});
