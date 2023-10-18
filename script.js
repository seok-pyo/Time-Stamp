// 밀리초 변환 (ms -> s)
function msTom(milsec) {
  let sec = parseInt(milsec / 1000);
  let hour = parseInt(sec / 3600);
  let min = parseInt((sec % 3600) / 60);
  let fsec = (sec % 3600) % 60;
  return `${hour}시간 ${min}분 ${fsec}초`;
}

function startTimer() {
  const startTime = Date.now();
  const start_ = new Date();
  return {
    startTime: startTime,
    startMessage: `<br>몰입 시작: [${start_.getFullYear()}.${
      start_.getMonth() + 1
    }.${start_.getDate()}] ${start_.getHours()} : ${start_.getMinutes()} : ${start_.getSeconds()}`,
  };
}

function stopTimer(startTime) {
  const endTime = Date.now();
  const diff = endTime - startTime;
  const result = msTom(diff);
  return {
    endTime: endTime,
    timeDifference: `몰입한 시간: ${result} `,
  };
}

// 클릭 이벤트 핸들러를 정의
const button = document.getElementById("myButton");
const clearButton = document.getElementById("clearButton");
const timeDiffDisplay = document.getElementById("timeDiff");
const timeArray = JSON.parse(localStorage.getItem("ts")) || [];
timeArray.forEach((v) => {
  timeDiffDisplay.innerHTML += `${v}<br>`;
});

let timer = JSON.parse(localStorage.getItem("timer")) || null; // 초기에 타이머를 null로 설정

localStorage.setItem("button", "몰입 시작하기");
let button_text = JSON.stringify(localStorage.getItem("button"));
button.innerHTML = button_text.replace(/"/g, "");

button.addEventListener("click", function () {
  // 클릭 시 토글 기능
  const check_storage = localStorage.getItem("tc") || null;

  if (!timer && !check_storage) {
    // 몰입 시작
    timer = startTimer();
    localStorage.setItem("timer", JSON.stringify(timer));
    const { startMessage } = JSON.parse(localStorage.getItem("timer"));
    const localData = JSON.parse(localStorage.getItem("ts")) || [];
    localData.push(startMessage);
    localStorage.setItem("ts", JSON.stringify(localData));
    // 몰입하기 버튼 클릭 시 토글 기능
    localStorage.setItem("tc", "check");
    // 몰입 시간 DOM 렌더링
    timeDiffDisplay.innerHTML = "";
    localData.forEach((v) => {
      timeDiffDisplay.innerHTML += `${v}<br>`;
    });
    // 버튼 텍스트 로컬스토리지에 저장
    localStorage.setItem("button", "몰입 마무리하기");
    let button_text = JSON.stringify(localStorage.getItem("button"));
    button.innerHTML = button_text.replace(/"/g, "");
  } else if (timer) {
    // 몰입 마무리, 몰입 시간 출력
    const { startTime } = timer;
    timer = null;
    const localData = JSON.parse(localStorage.getItem("ts")) || [];
    const { timeDifference } = stopTimer(startTime);
    localData.push(timeDifference);
    localStorage.setItem("ts", JSON.stringify(localData));
    timeDiffDisplay.innerHTML = "";
    // 몰입하기 버튼 클릭 시 토글 기능
    localStorage.removeItem("tc");
    // 몰입 시간 DOM 렌더링
    localData.forEach((v) => {
      timeDiffDisplay.innerHTML += `${v}<br>`;
    });

    // 버튼 텍스트 로컬스토리지에 저장
    localStorage.setItem("button", "몰입 시작하기");
    let button_text_2 = JSON.stringify(localStorage.getItem("button"));
    button.innerHTML = button_text_2.replace(/"/g, "");
  }
});

// 로컬 스토리지 지우고, 리로드
clearButton.addEventListener("click", () => {
  localStorage.removeItem("ts");
  localStorage.removeItem("tc");
  localStorage.removeItem("timer");
  timeDiffDisplay.innerHTML = "";
  location.reload(true);
});
