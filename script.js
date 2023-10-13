// const btn1 = document.querySelector(".button1");
// const btn2 = document.querySelector(".button2");
// let t1;

// function d1() {
//   t1 = Date.now();
// }

// function d2(t1, t2) {
//   let sec = parseInt((t2 - t1) / 1000);
//   let hour = parseInt(sec / 3600);
//   let min = parseInt((sec % 3600) / 60);
//   let fsec = (sec % 3600) % 60;
//   return `${hour}시간, ${min}분, ${fsec}초`;
// }

// btn1.addEventListener("click", () => {
//   localStorage.setItem("t1", Date.now());
//   const t1 = localStorage.getItem("t1");
//   console.log(t1);
// });

// btn2.addEventListener("click", () => {
//   let t2 = Date.now();
//   console.log(d2(t1, t2));
// });

function msTom(milsec) {
  let sec = parseInt(milsec / 1000);
  let hour = parseInt(sec / 3600);
  let min = parseInt((sec % 3600) / 60);
  let fsec = (sec % 3600) % 60;
  return `${hour}시간, ${min}분, ${fsec}초`;
}

function createTimer() {
  let startTime = 0;
  return function () {
    if (startTime === 0) {
      startTime = Date.now();
      const start_ = new Date();
      return `몰입 시작: ${start_.getHours()} : ${start_.getMinutes()} : ${start_.getSeconds()}`;
    } else {
      const endTime = Date.now();
      const diff = endTime - startTime;
      const result = msTom(diff);
      startTime = 0; // 초기화

      return `몰입 시간: ${result} <br> `;
    }
  };
}

// 클릭 이벤트 핸들러를 정의
const button = document.getElementById("myButton");
const cButton = document.getElementById("clearButton");
const timeDiffDisplay = document.getElementById("timeDiff");
let timer = null; // 초기에 타이머를 null로 설정
const timeArray = JSON.parse(localStorage.getItem("ts")) || [];
timeArray.forEach((v) => {
  timeDiffDisplay.innerHTML += `${v}<br>`;
});
const today = document.getElementById("today");
const today_t = new Date();
today.innerHTML = `${today_t.getFullYear()}. ${
  today_t.getMonth() + 1
}. ${today_t.getDate()}.`;

button.addEventListener("click", function () {
  if (!timer) {
    timer = createTimer(); // 클릭 시 시간 측정 시작
  }
  const timeDifference = timer();

  const localData = JSON.parse(localStorage.getItem("ts")) || [];
  localData.push(timeDifference);
  localStorage.setItem("ts", JSON.stringify(localData));
  timeDiffDisplay.innerHTML = "";
  localData.forEach((v) => {
    timeDiffDisplay.innerHTML += `${v}<br>`;
  });
});

cButton.addEventListener("click", () => {
  localStorage.clear();
  timeDiffDisplay.innerHTML = "";
});
