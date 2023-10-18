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
const stopButton = document.getElementById("stopButton");
const clearButton = document.getElementById("clearButton");
const timeDiffDisplay = document.getElementById("timeDiff");
const timeArray = JSON.parse(localStorage.getItem("ts")) || [];
timeArray.forEach((v) => {
  timeDiffDisplay.innerHTML += `${v}<br>`;
});

// const today = document.getElementById("today");
// const today_t = new Date();
// today.innerHTML = `${today_t.getFullYear()}. ${
//   today_t.getMonth() + 1
// }. ${today_t.getDate()}.`;

let timer = JSON.parse(localStorage.getItem("timer")) || null; // 초기에 타이머를 null로 설정

button.addEventListener("click", function () {
  const check_storage = localStorage.getItem("tc") || null;
  if (!timer && !check_storage) {
    timer = startTimer();
    localStorage.setItem("timer", JSON.stringify(timer));
    const { startMessage } = JSON.parse(localStorage.getItem("timer"));
    const localData = JSON.parse(localStorage.getItem("ts")) || [];
    localData.push(startMessage);
    localStorage.setItem("ts", JSON.stringify(localData));
    localStorage.setItem("tc", "check");
    timeDiffDisplay.innerHTML = "";
    localData.forEach((v) => {
      timeDiffDisplay.innerHTML += `${v}<br>`;
    });
  } else if (timer) {
    const { startTime } = timer;
    timer = null;
    const localData = JSON.parse(localStorage.getItem("ts")) || [];
    const { timeDifference } = stopTimer(startTime);
    localData.push(timeDifference);
    localStorage.setItem("ts", JSON.stringify(localData));
    timeDiffDisplay.innerHTML = "";
    localData.forEach((v) => {
      timeDiffDisplay.innerHTML += `${v}<br>`;
    });
    localStorage.removeItem("tc");
  }
});

// stopButton.addEventListener("click", () => {
//   localStorage.removeItem("tc");
//   if (timer) {
//     const { startTime } = timer;
//     timer = null;
//     // button.style.backgroundColor = "aqua";
//     // stopButton.style.backgroundColor = "white";
//     const { timeDifference } = stopTimer(startTime);
//     const localData = JSON.parse(localStorage.getItem("ts")) || [];
//     localData.push(timeDifference);
//     localStorage.setItem("ts", JSON.stringify(localData));
//     timeDiffDisplay.innerHTML = "";
//     localData.forEach((v) => {
//       timeDiffDisplay.innerHTML += `${v}<br>`;
//     });
//   }
// });

clearButton.addEventListener("click", () => {
  localStorage.clear();
  timeDiffDisplay.innerHTML = "";
  location.reload(true);
});
